import express from 'express';
import * as AuthController from '../controllers/AuthController.js';

const router = express.Router();

// Endpoint untuk login
router.post('/login', AuthController.loginUser);
router.post('/register/email',AuthController.registerStepOne);
router.post('/register/data',AuthController.registerStepTwo)

export default router;
