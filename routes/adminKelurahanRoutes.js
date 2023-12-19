import express from 'express';
import * as adminKelurahanController from '../controllers/AdminKelurahanController.js';
import multer from 'multer';
import authenticateToken from '../middleware/authMiddleware.js';

const upload = multer();

const router = express.Router();

router.post('/api/admin', upload.none(), authenticateToken, adminKelurahanController.createAdminKelurahanByKelurahan);
router.get('/api/admin', authenticateToken, adminKelurahanController.getAdminKelurahanByKelurahan);
router.get('/api/admin/:id', authenticateToken, adminKelurahanController.getAdminKelurahanByKelurahanId);
router.patch('/api/admin/:id', authenticateToken, adminKelurahanController.updateAdminKelurahanByKelurahan);
router.delete('/api/admin/:id', authenticateToken, adminKelurahanController.deleteAdminKelurahanByKelurahan);

export default router;
