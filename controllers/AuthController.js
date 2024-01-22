// AuthController.js
import * as AuthModel from '../models/AuthModel.js';
import { comparePasswords,hashPassword } from '../config/bcrypt-utils.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { createUser } from './UserController.js' // Import createUserLocal dari file userController

export const register = async (req, res) => {
  const {password, email} = req.body;
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user
    await user.sendEmailVerification();
    const idToken = await user.getIdToken();
    console.log('ID Token:', idToken);
    await createUser(req, res);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Email sudah Terdaftar' });
    return; // Pastikan untuk menghentikan eksekusi setelah mengirim respons
  }
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

export const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await AuthModel.getUserByEmail(email);

    if (existingUser) {
      res.status(409).json({ message: 'Email sudah terdaftar' });
    } else {
      res.status(200).json({ message: 'Email tersedia' });
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};