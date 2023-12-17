import express from 'express';
import * as PengajuanController from '../controllers/PengajuanController.js';
import multer from 'multer';

const upload = multer();

const router = express.Router();

router.get('/api/pengajuan', PengajuanController.getAllPengajuan);
router.post('/api/pengajuan', upload.none(), PengajuanController.createPengajuan);
router.get('/api/pengajuan/user/:user_id', PengajuanController.getPengajuanByUserId);
router.patch('/api/pengajuan/pengantar/:pengajuan_id', PengajuanController.updateProsesSuratPengantar); 
// router.patch('/api/pengajuan/keluarga/:pengajuan_id', PengajuanController.updateProsesSuratKeluarga);
router.patch('/api/pengajuan/keluarga/:pengajuan_id', PengajuanController.updateProsesSuratKeluarga); 
router.patch('/api/pengajuan/keterangan/:pengajuan_id', PengajuanController.updateProsesSuratTidakMampu);
 

export default router;