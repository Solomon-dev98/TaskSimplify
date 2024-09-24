import express from 'express';
import { signup, signin } from '../controllers/authController.js';

const router = express.Router();

// Signup route
router.post('/signup', signup);

// sign-in route
router.post('/signin', signin);

export default router;