# AGENTS.md

## 🧠 Project Overview

This is a monorepo for an open-source, AI-powered voice-based sales simulator. The app simulates live, back-and-forth sales conversations with AI personas of varying difficulty (Easy, Medium, Hard) using OpenAI APIs.

Users can interact via voice or chat. The AI responds in real-time, with memory and contextual awareness. Each conversation is scored and displayed on a leaderboard.

The app is deployed to **Render**, with:

* **Frontend**: Static Site (`/frontend`)
* **Backend**: Web Service (`/backend`)

---

## 🎯 Features & Requirements

### 💬 Interaction Modes

* Voice and text chat support
* Toggle between:

  * Simplistic voice-only view (microphone + audio output)
  * Standard chat interface (bubbles, chat history, audio)

### 🎭 Sales Personas (Difficulty Levels)

* Easy: Friendly, curious prospect
* Medium: Skeptical technical buyer
* Hard: Hostile executive (e.g., EU healthcare CISO)

### 🧠 AI Capabilities

* Uses OpenAI **Assistants API** with persistent threads
* Voice input via **Whisper API**
* Voice output via **Text-to-Speech API**
* Optional: Retrieval-based tool for product/industry knowledge

### 🏆 Leaderboard

* Tracks:

  * User name and picture (from Microsoft Entra login)
  * Attempts per persona
  * Ratings per difficulty
  * Average score

---

## 🗂 Folder Structure

```
/AGENTS.md                ← Codex instruction file
/.env.example             ← Backend environment template
/.gitignore
/frontend/                ← React + Tailwind UI (Vite)
/backend/                 ← Node.js + Express API (OpenAI, scoring)
/shared/ (optional)       ← Shared types or logic
```

---

## ⚙️ Technologies

| Layer    | Tech Stack                                                       |
| -------- | ---------------------------------------------------------------- |
| Frontend | React, Tailwind CSS, Vite, shadcn/ui, Framer Motion              |
| Backend  | Node.js, Express, OpenAI SDK, Microsoft OAuth, Prisma (optional) |
| AI       | OpenAI Assistants API, Whisper API, Text-to-Speech API           |
| Auth     | Microsoft Entra ID (OAuth2/OpenID Connect)                       |
| Hosting  | [Render](https://render.com)                                     |
| Database | Render-hosted PostgreSQL                                         |

---

## 🚀 Deployment Configuration (Render)

### 🔮 Frontend – Static Site

* **Root Directory**: `frontend`
* **Build Command**:

  ```bash
  npm install && npm run build
  ```
* **Publish Directory**:

  ```
  dist
  ```
* **Auto Deploy**: Enabled on `main`
* **Environment Variables**:

  ```env
  VITE_API_URL=https://voice-sales-backend.onrender.com/api
  ```

---

### 🧠 Backend – Web Service

* **Root Directory**: `backend`
* **Build Command**:

  ```bash
  npm install
  ```
* **Start Command**:

  ```bash
  npm start
  ```
* **Runtime**: Node 18+
* **Auto Deploy**: Enabled on `main`

#### ✅ Backend Environment Variables (`.env.example`)

```env
OPENAI_API_KEY=sk-...
ENCRA_CLIENT_ID=...
ENCRA_CLIENT_SECRET=...
ENCRA_TENANT_ID=...
DATABASE_URL=postgres://<user>:<password>@dpg-d0vo0hemcj7s73fqfol0-a/pperfect
FRONTEND_URL=https://voice-sales-frontend.onrender.com
SESSION_SECRET=some-random-secret
```

Set these in the Render UI under **Environment → Add Environment Variable**.

---

## 🧠 Development Notes for Codex

When contributing to this project:

* Scaffold React pages using **Tailwind + shadcn/ui + Framer Motion**
* Use **React Router** if routes are needed
* Use `fetch` or `axios` to communicate with the backend at `/api`
* Backend should expose endpoints for:

  * `/start-session`
  * `/submit-message`
  * `/leaderboard`
* Backend should handle:

  * Calling OpenAI APIs (Assistants, Whisper, TTS)
  * Caching or storing conversations
  * Returning scores + persona feedback
* Use `dotenv` for env vars
* Store user data and leaderboard stats in PostgreSQL (Prisma optional)
* Codex may propose `.env.example` updates, Prisma schema, or CI improvements
* All code should be **modular**, **typed (if TS)**, and **production-ready**

---

## 🧪 Testing & CI

* Tests (if added) should go in `/frontend/__tests__/` and `/backend/__tests__/`
* GitHub Actions may be added later for:

  * Linting
  * Backend unit tests
  * Type checks

---

## 📎 Misc

* Avoid writing to local disk during deploy unless using Render disk
* CORS should allow \`FRONTEND\_URL
