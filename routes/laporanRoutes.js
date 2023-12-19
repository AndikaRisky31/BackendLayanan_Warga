import express from 'express';
import * as LaporanController from '../controllers/LaporanController.js'
import multer from 'multer';
import authenticateToken from '../middleware/authMiddleware.js'; 

const upload = multer();

const router = express.Router();

router.post('/api/laporan', upload.none(), authenticateToken, LaporanController.createLaporan);
router.get('/api/laporan', upload.none(), authenticateToken, LaporanController.getAllLaporan);
router.get('/api/Laporan/user/:user_id', authenticateToken, LaporanController.getLaporanByUserId);
router.get('/api/laporan/ekonomi', authenticateToken, LaporanController.getEkonomiLaporan);
router.get('/api/laporan/keamanan', authenticateToken, LaporanController.getKeamananLaporan);
router.get('/api/laporan/lingkungan', authenticateToken, LaporanController.getLingkunganLaporan);
router.get('/api/laporan/kesehatan', authenticateToken, LaporanController.getKesehatanLaporan);


export default router;