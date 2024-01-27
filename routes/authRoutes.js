import express from 'express';
import * as AuthController from '../controllers/AuthController.js';

const router = express.Router();

// Endpoint untuk login
router.post('/login', AuthController.loginUser);
router.post('/registerEmail',AuthController.registerStepOne);
router.post('/registerDetail',AuthController.registerStepTwo)

export default router;
