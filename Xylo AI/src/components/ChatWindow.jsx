import React, { useState, useEffect } from 'react'

import ReactMarkdown from "react-markdown";




const getTimeString = () => {
  const now = new Date()
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const callChatApi = async (conversation) => {
  const lastUserMessage = [...conversation].reverse().find((m) => m.role === 'user')
  const question = lastUserMessage?.text || ''

  try {
    const res = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: question,
        mode: 'query',
      }),
    })

    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.status}`)
    }

    const data = await res.json()
   
    if (data && data.error) {
      throw new Error(data.error)
    }

    return data.answer || data.message || JSON.stringify(data)
  } catch (error) {
    console.error('Error calling backend:', error)
    throw error
  }
}

export default function ChatWindow({ resetCounter }) {
  const initialAssistantMessage = {
    id: 1,
    role: 'assistant',
    text: 'Hi, I am Xylo AI, your smart farming assistant. How can I help you today?',
    time: getTimeString(),
  }

  const [messages, setMessages] = useState([initialAssistantMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // When resetCounter changes (New Chat clicked), clear conversation.
  useEffect(() => {
    setMessages([{
      ...initialAssistantMessage,
      id: Date.now(),
      time: getTimeString(),
    }])
    setInput('')
    setIsLoading(false)
  }, [resetCounter])

  const handleSend = async (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: trimmed,
      time: getTimeString(),
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const aiReplyText = await callChatApi(nextMessages);
      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        text: aiReplyText,
        time: getTimeString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 2,
        role: "assistant",
        text: "Sorry, something went wrong while contacting the AI service.",
        time: getTimeString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex flex-col border-l border-slate-800/70">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/70">
        <div>
          <h2 className="text-lg font-semibold">Xylo AI</h2>
          <p className="text-xs text-slate-400">Your smart farming assistant</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-xs px-3 py-1 rounded-full border border-slate-700 bg-slate-900/70 text-slate-300">
            English
          </button>
          <div className="h-8 w-8 rounded-full bg-emerald-500/10 border border-emerald-500/60 flex items-center justify-center text-xs text-emerald-300">
            AI
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => {
          const isUser = message.role === "user";
          return (
            <div
              key={message.id}
              className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div className="h-8 w-8 rounded-full bg-emerald-500/10 border border-emerald-500/60 flex items-center justify-center text-xs text-emerald-300">
                  AI
                </div>
              )}
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                  isUser
                    ? "bg-emerald-600/90 text-white rounded-br-none"
                    : "bg-slate-800/90 text-slate-100 rounded-bl-none"
                }`}
              >
               <div style={{ whiteSpace: "pre-line" }}>
  {message.text.replace(/\\n/g, "\n")}
</div>
                <div className="mt-1 text-[10px] text-slate-400 text-right">
                  {message.time}
                </div>
              </div>
            </div>
          );
        })}
        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Xylo AI is thinking...
          </div>
        )}
      </div>

      <div className="px-6 pb-3 flex flex-wrap gap-3">
        {["Best crop", "Disease check", "Weather advice"].map((label) => (
          <button
            key={label}
            type="button"
            className="text-xs px-3 py-1.5 rounded-full border border-slate-700/80 bg-slate-900/70 text-slate-300 hover:border-emerald-500 hover:text-emerald-300 transition-colors"
            onClick={() => setInput(label)}
          >
            {label}
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSend}
        className="px-6 pb-6 pt-2 border-t border-slate-800/70 flex gap-3 items-center"
      >
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Type your message here..."
          className="flex-1 rounded-xl bg-slate-900/80 border border-slate-700 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-500/70"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-5 py-2 rounded-xl bg-emerald-600 text-sm font-medium text-white shadow-md shadow-emerald-900/50 disabled:opacity-60 disabled:cursor-not-allowed hover:bg-emerald-500 transition-colors"
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

