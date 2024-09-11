import express, { Router } from 'express'
import {loginController, registerController} from "../controllers/auth.controller";
import userValidator from "../validators/user.validator";
import {authMiddleware} from "../middleware/auth.middleware";

const router: Router = express.Router()

// POST /auth/signup
router.post('/auth/signup', userValidator,  registerController);

// POST /auth/signup
router.post('/auth/login', userValidator,  loginController);

export default router;