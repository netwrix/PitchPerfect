import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));

interface Session {
  id: string;
  messages: { user: string; bot: string }[];
}

const sessions = new Map<string, Session>();

app.post('/api/start-session', (_req, res) => {
  const id = uuid();
  sessions.set(id, { id, messages: [] });
  res.json({ sessionId: id });
});

app.post('/api/submit-message', (req, res) => {
  const { sessionId, message } = req.body as { sessionId: string; message: string };
  if (!sessionId || !message || !sessions.has(sessionId)) {
    return res.status(400).json({ error: 'Invalid session or message' });
  }

  const session = sessions.get(sessionId)!;
  const reply = `Echo: ${message}`; // placeholder for OpenAI response
  session.messages.push({ user: message, bot: reply });

  res.json({ reply, score: 0 });
});

app.get('/api/leaderboard', (_req, res) => {
  // placeholder leaderboard data
  const leaderboard = Array.from(sessions.values()).map((s) => ({
    sessionId: s.id,
    messages: s.messages.length,
  }));
  res.json(leaderboard);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
