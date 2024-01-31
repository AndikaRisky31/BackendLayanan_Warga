import express from 'express';
import * as UserController from '../controllers/UserController.js';
import multer from 'multer';
import passport from 'passport';

const upload = multer();

const router = express.Router();

router.post('/create', upload.none(), UserController.createUser);
router.get('/all', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.get('/kel_id/:kelurahan_id', UserController.getUserByKelurahan);
router.patch('/:id', upload.none(), UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

// Tambahkan rute untuk login
// router.post('/api/users/login', UserController.login);
router.post('/api/users/login', UserController.login, passport.authenticate);

export default router;
