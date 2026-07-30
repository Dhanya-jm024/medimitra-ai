# 🚢 MediMitra AI — Deployment Guide

This guide provides step-by-step instructions for deploying MediMitra AI to production infrastructure (Vercel, Render/Railway, Supabase).

---

## 1. Frontend Deployment (Vercel)

1. Fork or push the repository to GitHub: `https://github.com/Dhanya-jm024/medimitra-ai`.
2. Log in to [Vercel](https://vercel.com) and click **Import Project**.
3. Select `medimitra-ai` -> Set **Root Directory**: `frontend`.
4. Configure Environment Variables:
   - `GEMINI_API_KEY`: Your Google Gemini API Key.
   - `NEXT_PUBLIC_GEMINI_API_KEY`: Your Google Gemini API Key.
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key.
5. Click **Deploy**.

---

## 2. Backend Deployment (Render / Railway)

1. Log in to [Render Dashboard](https://dashboard.render.com).
2. Click **New Web Service** -> Connect `medimitra-ai` repo.
3. Configure settings:
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Add Environment Variable:
   - `GEMINI_API_KEY`: Your Google Gemini API Key.
5. Click **Create Web Service**.

---

## 3. Database Deployment (Supabase)

1. Go to [Supabase](https://supabase.com) and create project `medimitra-ai`.
2. Open **SQL Editor** -> Execute the schema from [docs/supabase_schema.sql](docs/supabase_schema.sql).
3. Enable Row Level Security (RLS) policies.
