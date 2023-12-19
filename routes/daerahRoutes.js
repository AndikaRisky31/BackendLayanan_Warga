import express from 'express';
import * as DaerahController from '../controllers/DaerahController.js';
import authenticateToken from '../middleware/authMiddleware.js'; 

const router = express.Router();

// Endpoint untuk menambahkan data (insert)
router.get('/provinsi/all', DaerahController.getAllProvinsi);
router.get('/kabupaten/:province_id',DaerahController.getKabupatenByIdProvinsi)
router.get('/kecamatan/:regency_id',DaerahController.getKecamatanByIdKabupaten)

export default router;