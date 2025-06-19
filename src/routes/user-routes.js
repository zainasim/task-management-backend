import express from 'express';
import UserController from '../controller/user-controller.js';
import authorize from '../middleware/authorization.js';
import { validateUser } from '../middleware/validation.js';

const router = express.Router();

// Public routes with validation
router.post('/register', validateUser.register, UserController.register);
router.post('/login', validateUser.login, UserController.login);

// Protected routes
router.get('/profile', authorize, UserController.getProfile);

export default router; 