import { Router } from "express";
import { signUp } from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post('/cadastro', signUp);

export default authRouter;