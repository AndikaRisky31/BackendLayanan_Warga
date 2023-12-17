import express from 'express';
import * as DaerahController from '../controllers/DaerahController.js';

const router = express.Router();

// Endpoint untuk menambahkan data (insert)
router.get('/provinsi/all', DaerahController.getAllProvinsi);

export default router;