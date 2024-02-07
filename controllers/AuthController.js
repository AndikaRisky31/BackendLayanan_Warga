// AuthController.js
import * as AuthModel from '../models/AuthModel.js';
import * as UserModel from '../models/UserModel.js';
import {auth, firestore, firebaseAdmin,firebaseAuth} from '../config/firebaseConfig.js';
export const registerStepOne = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await firebaseAdmin.auth().getUserByEmail(email);
    const UserId = userRecord.uid;

    if (userRecord.emailVerified) {
      const userLocal = await UserModel.getUserById(UserId);
      console.log(userLocal);

      if (userLocal) {
        return res.status(409).json({ 
          message: 'Email telah Terdaftar',
          UserId
        });
      } else {
        return res.status(201).json({ 
          message: 'Email telah diverifikasi, silahkan lengkapi data',
          UserId 
        });
      }
    } else {
      // Email belum diverifikasi di Firebase
      return res.status(200).json({ 
        message: 'Email belum diverifikasi, verifikasi email.',
        UserId 
      });
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);

    let errorMessage = 'Terjadi kesalahan server.';

    if (error.code === 'auth/user-not-found') {
      // Create user in Firebase Authentication
      const userCredential = await firebaseAuth.createUserWithEmailAndPassword(auth,email, password);
      const user = userCredential.user;
      const UserId = user.uid;

      // Send email verification
      await sendVerificationEmail(user);

      return res.status(201).json({ 
        message: 'Registrasi tahap 1 berhasil. Periksa email Anda untuk verifikasi.',
        UserId 
      });
    }

    return res.status(500).json({ message: errorMessage });
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
    const existingUser = await firebaseAuth.getUserByEmail(email);
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
  await user.sendEmailVerification(auth);
};

export const loginUser = async (req, res) => {
  try {
    const {email,password,tokenFCM} = req.body;
    const userRecord = await firebaseAuth.signInWithEmailAndPassword(auth,email, password);
    const user_id = userRecord.user.uid;
    
    await AuthModel.updateToken(user_id,tokenFCM);
    const user = await AuthModel.getUserById(user_id);
    user.email = email;
    user.token = await userRecord.user.getIdToken();

    delete user.tokenFCM;
    res.status(200).json({ success: true,data:user });
  } catch (error) {
    console.error('Gagal melakukan login:', error.message);
    res.status(401).json({ success: false, error: error.message });
  }
};
