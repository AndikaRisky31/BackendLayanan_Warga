
import express from 'express';
import * as AgendaController from '../controllers/AgendaController.js';

const router = express.Router();

router.post('/api/agenda', AgendaController.getAgendaByKelurahan);

export default router;
