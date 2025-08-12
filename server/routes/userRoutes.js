import express from "express";
import {auth} from "../middlewares/auth.js";
import { getUserCreations, toggleLikeCreations } from "../controllers/userController.js";

const userRouter=express.Router();

userRouter.get("/get-user-creations",auth,getUserCreations);
userRouter.get("/togglelike-creations",auth,toggleLikeCreations);
export default userRouter;



