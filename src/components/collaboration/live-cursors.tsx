"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MousePointer } from "lucide-react";

interface Cursor {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
}

// Fallback bots if no other tabs are open
const botCursors: Cursor[] = [
  { id: "bot-1", name: "Alex (AI Partner)", x: 250, y: 300, color: "#7C3AED" },
  { id: "bot-2", name: "Sarah (Product)", x: 650, y: 180, color: "#00E5FF" },
];

export default function LiveCursors() {
  const [remoteCursors, setRemoteCursors] = useState<Record<string, Cursor>>({});
  const [myId] = useState(() => "user-" + Math.random().toString(36).substring(2, 7));

  useEffect(() => {
    const channel = new BroadcastChannel("nexus-live-cursors");

    const handleMouseMove = (e: MouseEvent) => {
      channel.postMessage({
        id: myId,
        name: "Collaborator (You in other tab)",
        x: e.clientX,
        y: e.clientY + window.scrollY,
        color: "#F43F5E",
      });
    };

    const handleMessage = (event: MessageEvent) => {
      const { id, name, x, y, color } = event.data;
      if (id === myId) return;

      setRemoteCursors((prev) => ({
        ...prev,
        [id]: { id, name, x, y, color },
      }));
    };

    window.addEventListener("mousemove", handleMouseMove);
    channel.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      channel.removeEventListener("message", handleMessage);
      channel.close();
    };
  }, [myId]);

  const activeRemote = Object.values(remoteCursors);

  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
      {/* 1. REAL REMOTE CURSORS FROM OTHER TABS */}
      {activeRemote.map((cursor) => (
        <div
          key={cursor.id}
          className="absolute transition-all duration-75 ease-out"
          style={{
            left: cursor.x,
            top: cursor.y,
          }}
        >
          <MousePointer size={18} style={{ color: cursor.color, fill: cursor.color }} />
          <div
            className="mt-1 rounded-xl px-2.5 py-1 text-4xs font-bold text-white shadow-lg backdrop-blur-md"
            style={{
              backgroundColor: cursor.color,
            }}
          >
            {cursor.name}
          </div>
        </div>
      ))}

      {/* 2. LIVE BOT CURSORS (ALWAYS WANDERING SO SCREEN FEELS LIVE) */}
      {activeRemote.length === 0 &&
        botCursors.map((bot) => (
          <motion.div
            key={bot.id}
            animate={{
              x: [bot.x, bot.x + 120, bot.x - 70, bot.x],
              y: [bot.y, bot.y - 80, bot.y + 110, bot.y],
            }}
            transition={{
              duration: 8 + (bot.id === "bot-2" ? 3 : 0),
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute"
          >
            <MousePointer size={18} style={{ color: bot.color, fill: bot.color }} />
            <div
              className="mt-1 rounded-xl px-2.5 py-1 text-4xs font-bold text-white shadow-lg"
              style={{
                backgroundColor: bot.color,
              }}
            >
              {bot.name}
            </div>
          </motion.div>
        ))}
    </div>
  );
}