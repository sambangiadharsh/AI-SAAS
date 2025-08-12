import express from "express";
import {auth} from "../middlewares/auth.js";
import { blogTitle, generateArticle, generateImage, removeImageBackground, removeObjectFromImage, resumeReview } from "../controllers/aiController.js";
import upload from "../config/multer.js"
const aiRouter=express.Router();

aiRouter.post('/generate-article',auth,generateArticle)
aiRouter.post('/blog-title',auth,blogTitle)
aiRouter.post('/generate-image',auth,generateImage)
aiRouter.post('/remove-image-background',upload.single('image'),auth,removeImageBackground)
aiRouter.post('/remove-object',upload.single('image'),auth,removeObjectFromImage)
aiRouter.post('/resume-review',upload.single('review'),auth,resumeReview)

export default aiRouter