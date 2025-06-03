# AGENTS.md

## 🧠 Project Overview

This project is a voice-based sales simulation web app that uses OpenAI APIs to create lifelike, dynamic sales training scenarios. It includes:

- React frontend with Tailwind CSS, Framer Motion, shadcn/ui
- Voice chat via Whisper and Text-to-Speech APIs
- Persistent threads, memory, and tool use via the OpenAI Assistants API
- Microsoft Entra login for user authentication
- Leaderboard with ratings per user attempt

## 🎯 Goals for Codex

When working on this repo, Codex should:

- Prioritize clean, modular React components
- Use Tailwind and shadcn/ui for all UI elements
- Keep all OpenAI API integration logic organized in `lib/openai.ts`
- Use `Whisper` for speech-to-text and `TTS` for text-to-speech
- Scaffold API endpoints in Express or Fastify with separation of concerns
- Use Prisma ORM for database access
- Use OAuth 2.0 via Microsoft Entra ID (Azure AD) for login

## 🗂️ Folder Structure

/frontend → React UI
/backend → Node.js API server
/lib → API utilities (OpenAI, Whisper, TTS, etc.)
/db → Prisma schema & migrations
/public → Static files


## 🔧 OpenAI Usage Summary

- **Whisper API** → Voice input → transcript
- **Assistants API** → Core agent, tool calling, memory
- **TTS API** → Agent reply → audio output
- Optional: `chat/completions` with `stream=true` for fast text fallback

## 🧱 Key Features to Maintain

- Toggle between "simplistic" voice-only view and standard chat+voice view
- Real-time interaction cycle:
  1. User speaks
  2. Whisper → text
  3. Assistant → response
  4. TTS → reply audio
- Leaderboard aggregates average ratings per difficulty/persona
- Microsoft Entra login used to personalize sessions and ratings

## 📌 Notes

- All assistants should be persona-driven: Easy, Medium, Hard (CISO, IT Manager, etc.)
- Tool calling must allow dynamic product info lookup and post-call feedback
- Track metadata for every attempt: difficulty, user, persona, rating, transcript

