import express from 'express';
import * as DaerahController from '../controllers/DaerahController.js';
import multer from 'multer';

const upload = multer();

const router = express.Router();

// Endpoint untuk menambahkan data (insert)
router.get('/api/provinsi/all', DaerahController.getAllProvinsi);
router.get('/api/kabupaten/:provinsi_id', DaerahController.getKabupatenByProvinsi);
router.get('/api/kecamatan/:kabupaten_id', DaerahController.getKecamatanByKabupaten);
router.get('/api/kabupaten/:kecamatan_id', DaerahController.getKelurahanByKecamatan);
router.post('/api/kelurahan/', upload.none(), DaerahController.createKelurahan);
router.get('/api/kelurahan/', DaerahController.getKelurahan);

export default router;