import express from 'express';
import * as DaerahController from '../controllers/DaerahController.js';
import authenticateToken from '../middleware/authMiddleware.js'; 

const router = express.Router();

// Endpoint untuk menambahkan data (insert)
router.get('/provinsi/all', authenticateToken, DaerahController.getAllProvinsi);

export default router;