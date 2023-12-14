import express from 'express';
import * as UserController from '../controllers/UserController.js';

const router = express.Router();

// Endpoint untuk menambahkan data (insert)
router.post('/create', UserController.createUser);
router.get('/all', UserController.getAllUsers);
router.put('/update', UserController.updateUser);
router.post('/data', UserController.getUserById);

export default router;