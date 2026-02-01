
import 'dotenv/config'
import express from "express"
import cors from "cors"
import { clerkMiddleware, requireAuth } from '@clerk/express'

import aiRouter from "./routes/aiRoutes.js"
import userRouter from './routes/userRoutes.js'

const app = express()

app.use(cors({
  origin: [
    "http://localhost:5173",
   
    "https://ai-saas-jr6l.vercel.app"
    "https://ai-saas-frontend-k1as.onrender.com"
  ],
  credentials: true
}))

app.use(express.json())
app.use(clerkMiddleware())

app.get('/', (req, res) => res.send('server is live'))

app.use('/api/ai', requireAuth(), aiRouter)
app.use('/api/user', requireAuth(), userRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('server is running')
})
