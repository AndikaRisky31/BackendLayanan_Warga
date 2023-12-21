import express from 'express';
import * as adminKelurahanController from '../controllers/AdminKelurahanController.js';
import multer from 'multer';

const upload = multer();

const router = express.Router();

router.post('/api/admin', upload.none(), adminKelurahanController.createAdminKelurahanByKelurahan);
router.get('/api/admin', adminKelurahanController.getAdminKelurahanByKelurahan);
router.get('/api/admin/:id',adminKelurahanController.getAdminKelurahanByKelurahanId)
router.get('/api/admin/id/:id', adminKelurahanController.getAdminKelurahanById);
router.patch('/api/admin/:id', upload.none(), adminKelurahanController.updateAdminKelurahanByKelurahan);
router.delete('/api/admin/:id', adminKelurahanController.deleteAdminKelurahanByKelurahan);

export default router;
