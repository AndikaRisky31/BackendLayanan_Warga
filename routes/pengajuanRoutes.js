import express from 'express';
import * as PengajuanController from '../controllers/PengajuanController.js';
import uploadMiddleware from '../config/uploadMiddleware.js';

const router = express.Router();

router.post('/api/pengajuan/create', uploadMiddleware, PengajuanController.createPengajuan);
router.get('/api/pengajuan', PengajuanController.getAllPengajuan);
router.get('/api/pengajuan/user/:user_id', PengajuanController.getPengajuanByUserId);
//router.patch('/api/pengajuan/pengantar/:pengajuan_id', upload.none(), PengajuanController.updateProsesSuratPengantar); 
// router.patch('/api/pengajuan/keluarga/:pengajuan_id', PengajuanController.updateProsesSuratKeluarga);
//router.patch('/api/pengajuan/keluarga/:pengajuan_id', upload.none(), PengajuanController.updateProsesSuratKeluarga); 
//router.patch('/api/pengajuan/keterangan/:pengajuan_id', upload.none(), PengajuanController.updateProsesSuratTidakMampu);
 
export default router;
