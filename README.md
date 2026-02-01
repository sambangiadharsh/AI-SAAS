# 🚀 AI SaaS Platform
-Demo link:  https://ai-saas-jr6l.vercel.app

-A full-stack AI SaaS application that provides multiple AI-powered tools such as blog title generation, article writing, image generation, background removal, resume review, and more — with authentication, dashboards, and premium features.

---

## 🧩 Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS
- Axios
- Framer Motion
- Clerk Authentication
- Render (Static Site)

### Backend
- Node.js
- Express.js
- Neon PostgreSQL
- Clerk Auth Middleware
- Render (Web Service)

---

## ✨ Features

- 🔐 Authentication with Clerk
- 🧠 AI tools:
  - Blog Title Generator
  - Article Writer
  - Image Generator
  - Background Removal
  - Object Removal
  - Resume Review
- 📊 User Dashboard
- 💎 Premium feature support
- 🌍 Community section
- 📱 Fully responsive UI
- ⚡ SPA routing with refresh support

---
Project structure
```
root/
├── frontend/
│   ├── src/                  # Components, hooks, and logic
│   ├── public/
│   │   └── _redirects        # Netlify SPA routing
│   ├── package.json          # Client-side dependencies
│   └── README.md             # Frontend-specific docs
│
├── server/
│   ├── routes/               # API endpoints
│   ├── controllers/          # Route logic
│   ├── db/                   # DB connection & schemas
│   ├── index.js              # Server entry point
│   └── package.json          # Server dependencies
│
├── .gitignore                # Ignored files
└── README.md                 # Main project documentation

```
## 🔧 Environment Variables

### Frontend (`.env`)


VITE_BASE_URL=https://your-backend.onrender.com


---

### Backend (`.env`)
```

PORT=3000
DB_URL=postgresql://user:password@host/dbname?sslmode=require
FRONTEND_URL=https://your-frontend.onrender.com

CLERK_SECRET_KEY=your_clerk_secret_key
```

---

## 🔐 CORS Configuration (Backend)

```js
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));



▶️ Running Locally
Frontend
cd frontend
npm install
npm run dev

Backend
cd server
npm install
npm start


🧪 API Example
POST /api/ai/blog-title
Authorization: Bearer <token>

{
  "prompt": "AI tools for startups"
}

🚀 Deployment
Frontend (Render – Static Site)

Build Command: npm run build

Publish Directory: dist

Backend (Render – Web Service)

Start Command: node index.js




🛡️ Security

Token-based authentication

Restricted CORS origins

SSL-enabled database connection

Environment variables for secrets
