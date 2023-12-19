// AuthController.js
import * as AuthModel from '../models/AuthModel.js';

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await AuthModel.getUserByEmail(email);

    if (user) {
      // Periksa password secara sederhana (tidak aman)
      if (password === user.password) {
        res.json({ message: 'Login berhasil', data: user });
      } else {
        res.status(401).json({ message: 'Password salah' });
      }
    } else {
      res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};
