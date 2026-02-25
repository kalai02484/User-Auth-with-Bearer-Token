import express from "express";
import { userAuthRegister,userAuthLogin } from "../controllers/userAuthController.js";

const userAuthRouter = express.Router();

userAuthRouter.post("/register", userAuthRegister);
userAuthRouter.post("/login", userAuthLogin);

export default userAuthRouter;