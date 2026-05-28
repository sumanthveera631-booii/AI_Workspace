"use client";
import { useState, useEffect, useRef } from "react";
import AIMessage from "./ai-message";
import AIInput from "./ai-input";
import AIToolbar from "./ai-toolbar";
import { MessageSquare, Sparkles, Plus, Trash2, Cpu, Circle as HelpCircle } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatThread {
  id: string;
  title: string;
  messages: ChatMessage[];
}

const defaultThreads: ChatThread[] = [
  {
    id: "thread-1",
    title: "Workspace Setup & Architecture",
    messages: [
      { role: "assistant", content: "Welcome to Nexus AI! I can help you analyze metrics, format documents, write marketing summaries, or organize database setups. Ask me anything!" },
    ],
  },
  {
    id: "thread-2",
    title: "Cinematic UI Transition Tokens",
    messages: [
      { role: "assistant", content: "I analyzed the motion tokens inside your design layout. Let's optimize Framer Motion config for premium feels." },
    ],
  },
];

const suggestionPrompts = [
  { text: "Draft a startup product roadmap for 2026", icon: "🚀" },
  { text: "Simulate WebRTC coordination cursors logic", icon: "🌐" },
  { text: "Rewrite marketing hooks with Apple-level spacing", icon: "🎨" },
  { text: "Summarize active database tables from Prisma schema", icon: "📊" },
];

export default function AIChat() {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState("thread-1");
  const [isThinking, setIsThinking] = useState(false);
  const [activeModel, setActiveModel] = useState("gpt-4o-mini");

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("nexus-chat-threads");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setThreads(parsed);
        if (parsed.length > 0) {
          setActiveThreadId(parsed[0].id);
        }
      } catch (e) {
        setThreads(defaultThreads);
      }
    } else {
      setThreads(defaultThreads);
    }
  }, []);

  const saveThreads = (updatedThreads: ChatThread[]) => {
    setThreads(updatedThreads);
    localStorage.setItem("nexus-chat-threads", JSON.stringify(updatedThreads));
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [threads, isThinking]);

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0] || defaultThreads[0];
  const messages = activeThread?.messages || [];

  const handleSend = async (text: string) => {
    const userMsg: ChatMessage = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];

    const updatedThreads = threads.map((thread) => {
      if (thread.id === activeThreadId) {
        const newTitle = thread.title.startsWith("New Chat") || thread.title === "Workspace Setup & Architecture"
          ? text.slice(0, 30) + (text.length > 30 ? "..." : "")
          : thread.title;
        return { ...thread, title: newTitle, messages: updatedMessages };
      }
      return thread;
    });

    saveThreads(updatedThreads);
    setIsThinking(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
          model: activeModel,
        }),
      });

      const data = await response.json();
      const replyContent = data?.text || "Nexus AI could not generate a response. Please try again.";

      const assistMsg: ChatMessage = { role: "assistant", content: replyContent };
      const finishedThreads = updatedThreads.map((t) => {
        if (t.id === activeThreadId) {
          return { ...t, messages: [...t.messages, assistMsg] };
        }
        return t;
      });

      saveThreads(finishedThreads);
    } catch (error) {
      const assistMsg: ChatMessage = {
        role: "assistant",
        content: "Nexus AI is temporarily unavailable. Please check your API configuration or try again later.",
      };
      const finishedThreads = updatedThreads.map((t) => {
        if (t.id === activeThreadId) {
          return { ...t, messages: [...t.messages, assistMsg] };
        }
        return t;
      });
      saveThreads(finishedThreads);
    } finally {
      setIsThinking(false);
    }
  };

  const createNewThread = () => {
    const newThread: ChatThread = {
      id: crypto.randomUUID(),
      title: `New Chat Thread ${threads.length + 1}`,
      messages: [{ role: "assistant", content: "Ask me workspace queries. I am calibrated to analyze systems in real time." }],
    };
    const updated = [newThread, ...threads];
    saveThreads(updated);
    setActiveThreadId(newThread.id);
  };

  const deleteThread = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = threads.filter((t) => t.id !== id);
    saveThreads(updated);
    if (activeThreadId === id && updated.length > 0) {
      setActiveThreadId(updated[0].id);
    }
  };

  return (
    <div className="flex h-[calc(100vh-72px)] overflow-hidden bg-[#070B14] text-white">
      {/* THREADS SIDEBAR */}
      <aside className="w-80 border-r border-white/[0.04] bg-black/10 p-5 flex flex-col justify-between hidden md:flex shrink-0">
        <div className="space-y-6">
          <button
            onClick={createNewThread}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 py-3 text-sm font-semibold transition hover:scale-[1.02] shadow-[0_0_20px_rgba(124,58,237,0.15)]"
          >
            <Plus size={16} />
            New Chat
          </button>

          <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
            <p className="text-3xs uppercase tracking-[0.2em] text-white/30 px-3">Recent Chats</p>
            {threads.map((thread) => {
              const isActive = thread.id === activeThreadId;
              return (
                <div
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={`group flex cursor-pointer items-center justify-between gap-3 rounded-2xl px-4 py-3.5 border transition-all ${
                    isActive
                      ? "bg-white/[0.04] border-white/10 text-white"
                      : "border-transparent text-white/50 hover:bg-white/[0.02] hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2 text-xs font-medium truncate">
                    <MessageSquare size={14} className="shrink-0 text-violet-400" />
                    {thread.title}
                  </span>
                  {threads.length > 1 && (
                    <button
                      onClick={(e) => deleteThread(thread.id, e)}
                      className="text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM METADATA OVERLAY */}
        <div className="rounded-3xl border border-white/[0.04] bg-white/[0.02] p-4.5">
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-white/80">
            <Cpu size={14} className="text-cyan-400" />
            <span>Calibrated Core</span>
          </div>
          <select
            value={activeModel}
            onChange={(e) => setActiveModel(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0B1120] px-3 py-2 text-3xs text-white/80 outline-none"
          >
            <option value="gpt-4o-mini">ChatGPT-o1-Mini</option>
            <option value="gpt-4">GPT-4</option>
            <option value="gpt-3.5-turbo">GPT-3.5-Turbo</option>
            <option value="gemini-1.5-pro">Gemini-1.5-Pro</option>
          </select>
        </div>
      </aside>

      {/* CHAT INTERFACE */}
      <div className="flex flex-1 flex-col justify-between">
        <AIToolbar />

        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="mx-auto max-w-4xl space-y-6">
            {messages.map((message, index) => (
              <AIMessage key={index} role={message.role} content={message.content} />
            ))}

            {isThinking && (
              <div className="flex justify-start">
                <div className="max-w-2xl rounded-[28px] border border-white/[0.05] bg-white/[0.03] px-6 py-5 flex items-center gap-2 text-xs text-white/40">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.2s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-fuchsia-400 [animation-delay:0.4s]" />
                  Nexus AI is assembling code synthesis...
                </div>
              </div>
            )}

            {/* EMPTY STATE SUGGESTIONS */}
            {messages.length <= 1 && !isThinking && (
              <div className="pt-8">
                <div className="text-center mb-8">
                  <div className="inline-flex rounded-full bg-violet-500/10 p-4 text-violet-400 mb-4 animate-pulse">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">How can I assist your team today?</h3>
                  <p className="text-xs text-white/40 mt-1.5">Select a quick prompt to test neural workspace integration</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {suggestionPrompts.map((card) => (
                    <button
                      key={card.text}
                      onClick={() => handleSend(card.text)}
                      className="group flex items-start gap-3 rounded-2xl border border-white/[0.05] bg-white/[0.01] p-4 text-left transition hover:border-violet-500/30 hover:bg-white/[0.03]"
                    >
                      <span className="text-base">{card.icon}</span>
                      <div>
                        <h4 className="text-xs font-semibold text-white/80 group-hover:text-white transition-all">{card.text}</h4>
                        <p className="text-3xs text-white/30 mt-1">Prompt suggestion</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>
        </div>

        <AIInput onSend={handleSend} />
      </div>
    </div>
  );
}