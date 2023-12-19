import express from 'express';
import * as UserController from '../controllers/UserController.js';
import multer from 'multer';
import authenticateToken from '../middleware/authMiddleware.js'; // Import middleware

const upload = multer();
const router = express.Router();

// Endpoint untuk menambahkan data (insert), tambahkan authenticateToken di sini jika diperlukan
router.post('/api/users', upload.none(), authenticateToken, UserController.createUser);

// Endpoint untuk mendapatkan semua pengguna, tambahkan authenticateToken di sini jika diperlukan
router.get('/api/users', authenticateToken, UserController.getAllUsers);

// Endpoint untuk mendapatkan pengguna berdasarkan ID, tambahkan authenticateToken di sini jika diperlukan
router.get('/api/users/:id', authenticateToken, UserController.getUserById);

// Endpoint untuk mendapatkan pengguna berdasarkan kelurahan_id, tambahkan authenticateToken di sini jika diperlukan
router.get('/api/users/kel_id/:kelurahan_id', authenticateToken, UserController.getUserByKelurahan);

// Endpoint untuk memperbarui data pengguna, tambahkan authenticateToken di sini jika diperlukan
router.patch('/api/users/:id', upload.none(), authenticateToken, UserController.updateUser);

// Endpoint untuk menghapus data pengguna, tambahkan authenticateToken di sini jika diperlukan
router.delete('/api/users/:id', authenticateToken, UserController.deleteUser);

export default router;
