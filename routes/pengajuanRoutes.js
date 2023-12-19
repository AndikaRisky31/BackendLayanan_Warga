import express from 'express';
import * as PengajuanController from '../controllers/PengajuanController.js';
import multer from 'multer';
import authenticateToken from '../middleware/authMiddleware.js';

const upload = multer();

const router = express.Router();

router.get('/api/pengajuan', authenticateToken, PengajuanController.getAllPengajuan);
router.post('/api/pengajuan', upload.none(), authenticateToken, PengajuanController.createPengajuan);
router.get('/api/pengajuan/user/:user_id', authenticateToken, PengajuanController.getPengajuanByUserId);
router.patch('/api/pengajuan/pengantar/:pengajuan_id', upload.none(), authenticateToken, PengajuanController.updateProsesSuratPengantar); 
// router.patch('/api/pengajuan/keluarga/:pengajuan_id', PengajuanController.updateProsesSuratKeluarga);
router.patch('/api/pengajuan/keluarga/:pengajuan_id', upload.none(), authenticateToken, PengajuanController.updateProsesSuratKeluarga); 
router.patch('/api/pengajuan/keterangan/:pengajuan_id', upload.none(), authenticateToken, PengajuanController.updateProsesSuratTidakMampu);
 

export default router;