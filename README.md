# Abhinav Chaurasia – Developer Portfolio & Stats Service

A Google Search-themed developer portfolio and full-stack system built with **React, TypeScript, Tailwind CSS**, and a dedicated **Node.js/Express backend service** that automatically aggregates and syncs live coding profile statistics from **LeetCode**, **CodeChef**, and **Codeforces**.

**Live Demo:** [https://abhinavv.xyz](https://abhinavv.xyz)

---

## Repository Structure

```
portfolio/
├── frontend/             # Google Search-styled React 19 + Vite web app
│   ├── src/              # Components, pages, hooks, mock data, design system
│   ├── public/           # Favicon, assets, and latest downloadable Resume (PDF)
│   └── package.json
│
├── backend/              # Automated stats synchronization API service
│   ├── src/              # Express server, scrapers/GraphQL APIs, cache manager
│   ├── data/             # Persistent JSON cache for zero-downtime cold starts
│   └── package.json
│
└── README.md
```

---

## 1. Frontend (`frontend/`)

- **Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Lucide Icons.
- **Features:**
  - Google Search aesthetic with interactive search bar, search suggestions, tabs (All, Projects, Profiles, Skills, About, Contact).
  - One-click **Resume Download (PDF)** accessible from header, footer, search results, and knowledge panel.
  - Showcases projects including **IntervueX**, **ReviewBoxd**, and **Consoled**.
  - **Live Coding Profile Integration:** Connects to the backend API (`/api/stats`) to display real-time contest ratings, solved problem counts, and ranks, with seamless zero-flicker offline fallback.

### Running Frontend Locally
```bash
cd frontend
npm install
npm run dev
# Running on http://localhost:5173
```

---

## 2. Backend Stats Service (`backend/`)

- **Tech Stack:** Node.js, Express, TypeScript, `node-cron`.
- **Features:**
  - **Scheduled Auto-Sync:** Refreshes stats from external servers every 15 minutes in the background.
  - **Fail-Safe Caching:** In-memory caching persisted to `data/cache.json` to prevent downtime even if external APIs rate-limit.
  - **Endpoints:**
    - `GET /api/stats`: Returns full stats object across all 3 platforms.
    - `GET /api/stats/:platform`: Returns single platform data (`leetcode`, `codechef`, `codeforces`).
    - `POST /api/stats/refresh`: Forces an immediate re-fetch.
    - `GET /api/health`: Health check endpoint.

### Running Backend Locally
```bash
cd backend
npm install
npm run dev
# Running on http://localhost:5001
```

---

## Deployment Guide

### Frontend Deployment (Vercel)
1. Push to GitHub (`origin main`).
2. In your Vercel Dashboard:
   - Go to **Project Settings** > **General**.
   - Set **Root Directory** to `frontend`.
   - In **Environment Variables**, add:
     - `VITE_API_URL` = `https://your-backend-service.onrender.com` (or your deployed backend URL).
3. Trigger a redeployment.

### Backend Deployment (Render / Railway / Koyeb)
1. In [Render.com](https://render.com), create a **New Web Service** and connect this repository.
2. Configure settings:
   - **Root Directory:** `backend`
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
3. Copy the generated service URL (e.g., `https://portfolio-backend.onrender.com`) and paste it as `VITE_API_URL` in your Vercel project settings.

---

## Author
**Abhinav Chaurasia**
- Website: [abhinavv.xyz](https://abhinavv.xyz)
- GitHub: [@abhinavv016](https://github.com/abhinavv016)
- LinkedIn: [@abhinavv016](https://linkedin.com/in/abhinavv016)
- Email: [abhichaurasia016@gmail.com](mailto:abhichaurasia016@gmail.com)
