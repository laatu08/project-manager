import express from 'express';
import { loginAdmin, registerAdmin } from '../controllers/auth.controller.js';
import { body } from 'express-validator';

const router = express.Router();

router.post('/register',
    [body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')],
    registerAdmin
);

router.post('/login',
    [body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required')],
    loginAdmin
);


export default router;