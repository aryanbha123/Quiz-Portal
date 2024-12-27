import { Router } from "express";
import { getProfile, googleLogin, logout, signin, signup } from "../controllers/authController.js";
import firebaseAuth, { tokenVerify } from "../middlewares/firebaseMiddleware.js";

const AuthRouter = Router();

AuthRouter.get('/profile', firebaseAuth,getProfile);
AuthRouter.post('/signin' , signin);
AuthRouter.post('/signup' ,signup);
AuthRouter.post('/logout' ,logout);
AuthRouter.post('/google-login' , tokenVerify , googleLogin);

export default AuthRouter;