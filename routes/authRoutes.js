// routes/authRoutes.js
import express from 'express';
import authenticateToken from '../middleware/authMiddleware.js';
import { generateAccessToken } from '../utils/authUtils.js';
import * as UserController from '../controllers/UserController.js';
import multer from 'multer';


const upload = multer();

const router = express.Router();

router.post('/login', upload.none(), async (req, res) => {
  const { username, password } = req.body;

  // Verifikasi kredensial dan dapatkan userId
  const userId = await UserController.verifyCredentials(username, password);

  if (!userId) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Jika kredensial valid, generate token
  const accessToken = generateAccessToken(userId);

  res.json({ accessToken });
});

// Rute terlindungi sebagai contoh
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

export default router;
