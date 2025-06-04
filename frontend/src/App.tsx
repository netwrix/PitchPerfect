import { useState } from 'react';

export default function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);

  const ensureSession = async () => {
    if (sessionId) return sessionId;
    const res = await fetch('/api/start-session', { method: 'POST' });
    const data = await res.json();
    setSessionId(data.sessionId);
    return data.sessionId as string;
  };

  const sendMessage = async () => {
    const id = await ensureSession();
    const res = await fetch('/api/submit-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: id, message: input }),
    });
    const data = await res.json();
    setMessages((prev) => [...prev, `You: ${input}`, `Bot: ${data.reply}`]);
    setInput('');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Pitch Perfect</h1>
      <div className="space-y-2 min-h-[200px]">
        {messages.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          className="border p-2 flex-grow"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
