
import express from 'express';
import * as AgendaController from '../controllers/AgendaController.js';

import multer from 'multer';

const upload = multer();

const router = express.Router();

router.post('/kelurahan_id', upload.none(), AgendaController.getAgendaByKelurahan);

export default router;
