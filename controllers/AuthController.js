// AuthController.js
import * as AuthModel from '../models/AuthModel.js';
import * as UserModel from '../models/UserModel.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebaseAdmin from 'firebase-admin';
import {serviceAccount} from '../config/firebaseConfig.js';


// Inisialisasi Firebase Admin SDK
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

export const registerStepOne = async (req, res) => {
  try {
    const { email, password } = req.body;

    try {
      // Cek apakah pengguna sudah terdaftar di Firebase
      const userRecord = await firebaseAdmin.auth().getUserByEmail(email);
      const UserId = userRecord.uid;
      if (userRecord.emailVerified) {
        res.status(201).json({ 
          message: 'Email telah diverifikasi, silahkan lengkapi data',
          UserId:UserId });
      } else {
        // Email belum diverifikasi di Firebase
        res.status(200).json({ 
          message: 'Email belum diverifikasi, verifikasi email.',
          UserId:UserId});
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        // Create user in Firebase Authentication
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        const UserId = user.uid;

        // Send email verification
        await sendVerificationEmail(user);

        res.status(200).json({ 
          message: 'Registrasi tahap 1 berhasil. Periksa email Anda untuk verifikasi.',
          UserId:UserId});
      } else {
        console.error('Terjadi kesalahan:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server.' });
      }
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
};


export const registerStepTwo = async (req, res) => {
  try {
    const userData = req.body;
    const existingUser = await AuthModel.getUserById(userData.user_id);
    
    if (!existingUser) {
      await UserModel.createUser(userData);
      res.status(200).json({
        success: true,
        message: 'Registrasi tahap 2 berhasil. Data pengguna disimpan.',
        data: userData,
      });
    } else {
      // If the email is already registered, return an appropriate response
      res.status(400).json({
        success: false,
        message: 'Email sudah terdaftar. Gunakan email lain untuk registrasi.',
      });
    }
  } catch (error) {
    console.error("Error in registerStepTwo: ", error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat registrasi tahap 2.',
      serverMessage: error.message || error,
    });
  }
};

export const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await firebase.auth().getUserByEmail(email);
    if (existingUser) { 
      await sendVerificationEmail(user);
      res.status(200).json({ message: 'Email verifikasi dikirim ulang. Periksa email Anda.' });
    } else {
      res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};

// Function to send verification email
const sendVerificationEmail = async (user) => {
  await user.sendEmailVerification();
};

export const loginUser = async (req, res) => {
  try {
    const {email,password} = req.body;
    const userRecord = await firebase.auth().signInWithEmailAndPassword(email, password);
    const user_id = userRecord.user.uid;
    const idToken = await userRecord.user.getIdToken();
    await AuthModel.updateToken(idToken,user_id);
    res.status(200).json({ success: true, user_id, idToken });
  } catch (error) {
    console.error('Gagal melakukan login:', error.message);
    res.status(401).json({ success: false, error: error.message });
  }
};
