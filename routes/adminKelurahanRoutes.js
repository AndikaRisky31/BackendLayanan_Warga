// routes/adminKelurahanRoutes.js
import express from 'express';
import * as adminKelurahanController from '../controllers/AdminKelurahanController.js';

const router = express.Router();

router.post('/Kelurahan_id', adminKelurahanController.getAdminKelurahanByKelurahan);

export default router;
