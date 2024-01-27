// AuthController.js
import * as AuthModel from '../models/AuthModel.js';
import * as UserModel from '../models/UserModel.js';
import { comparePasswords,hashPassword } from '../config/bcrypt-utils.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseAdmin from 'firebase-admin';
import {serviceAccount} from '../config/firebaseConfig.js';

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

export const registerStepOne = async (req, res) => {
  try {
    const { email, password } = req.body;

    try {
      // Cek apakah pengguna sudah terdaftar di Firebase
      const userRecord = await firebaseAdmin.auth().getUserByEmail(email);

      // Jika pengguna sudah terdaftar, cek status emailVerified
      if (userRecord.emailVerified) {
        res.status(201).json({ 
          message: 'Email telah diverifikasi, silahkan lengkapi data',
          data:{email,password} });
      } else {
        // Email belum diverifikasi di Firebase
        res.status(200).json({ message: 'Email belum diverifikasi, verifikasi email.',
        data:{user,password} });
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        // Create user in Firebase Authentication
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Send email verification
        await sendVerificationEmail(user);

        res.status(200).json({ 
          message: 'Registrasi tahap 1 berhasil. Periksa email Anda untuk verifikasi.',
          data:{email,password}});
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
    await UserModel.createUser(userData);
    delete userData.password;

    res.status(200).json({
      success: true,
      message: 'Registrasi tahap 2 berhasil. Data pengguna disimpan.',
      data: userData,
    });
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
    const existingUser = await AuthModel.getUserByEmail(email);

    if (existingUser) {
      const user = await firebase.auth().getUserByEmail(email);
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
    const { email, password } = req.body;

    const user = await AuthModel.getUserByEmail(email);

    if (user) {
      // Ensure both password and user.password are defined before comparison
      console.log(password,user.password);
      if (password && user.password) {
        // Use bcrypt to compare passwords
        const passwordMatch = await comparePasswords(password, user.password);

        if (passwordMatch) {
          res.json({ message: 'Login berhasil', data: user });
        } else {
          res.status(401).json({ message: 'Password salah' });
        }
      } else {
        res.status(400).json({ message: 'Format data pengguna tidak valid' });
      }
    } else {
      res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};
