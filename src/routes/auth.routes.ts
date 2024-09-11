import express, { Router } from 'express'
import {loginController, registerController} from "../controllers/auth.controller";
import userValidator from "../validators/user.validator";
import {authMiddleware} from "../middleware/auth.middleware";

const router: Router = express.Router()

router.post('/auth/signup', userValidator,  registerController);
router.post('/auth/login', userValidator,  loginController);

export default router;