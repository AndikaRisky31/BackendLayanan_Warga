import express from 'express';
import * as UserController from '../controllers/UserController.js';
import multer from 'multer';
import authenticateToken from '../middleware/authMiddleware.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1000 * 1000 // 5 MB
  }
});

const router = express.Router();

// Endpoint untuk menambahkan data (insert)
router.post('/api/users', upload.fields(), upload.single('image'), authenticateToken, (req, res) => {
  try {
    UserController.createUser(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
});

// Endpoint untuk mendapatkan semua pengguna
router.get('/api/users', authenticateToken, (req, res) => {
  try {
    UserController.getAllUsers(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
});

// Endpoint untuk mendapatkan pengguna berdasarkan ID
router.get('/api/users/:id', authenticateToken, (req, res) => {
  try {
    UserController.getUserById(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
});

// Endpoint untuk mendapatkan pengguna berdasarkan kelurahan_id
router.get('/api/users/kel_id/:kelurahan_id', authenticateToken, (req, res) => {
  try {
    UserController.getUserByKelurahan(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
});

// Endpoint untuk memperbarui data pengguna
router.patch('/api/users/:id', upload.single('image'), authenticateToken, (req, res) => {
  try {
    UserController.updateUser(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
});

// Endpoint untuk menghapus data pengguna
router.delete('/api/users/:id', authenticateToken, (req, res) => {
  try {
    UserController.deleteUser(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
});

export default router;
