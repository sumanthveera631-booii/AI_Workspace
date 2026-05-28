"use client";
import { useEffect, useState } from "react";
import { Activity, Clock, FileText, CheckCircle, MessageSquare, Terminal } from "lucide-react";
import { useLowEndDevice } from "@/hooks/use-low-end-device";

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  type: "edit" | "task" | "comment" | "system";
  time: string;
}

const initialActivities: ActivityItem[] = [
  { id: "a1", user: "Alex", action: "edited AI Roadmap", type: "edit", time: "2m ago" },
  { id: "a2", user: "Sarah", action: "checked off 'Connect socket listeners'", type: "task", time: "8m ago" },
  { id: "a3", user: "John", action: "commented on SaaS design", type: "comment", time: "15m ago" },
  { id: "a4", user: "Nexus Core", action: "optimized 3D particle scene to 98fps", type: "system", time: "30m ago" },
];

export default function ActivityStream() {
  const lowEnd = useLowEndDevice();
  const [items, setItems] = useState<ActivityItem[]>(initialActivities);

  useEffect(() => {
    const actions = [
      { user: "Sarah", action: "synchronized 14 connected graph nodes", type: "system" },
      { user: "Alex", action: "completed 'Set up automatic OTP auth'", type: "task" },
      { user: "John", action: "commented on document block translation", type: "comment" },
      { user: "Alex", action: "rewrote marketing hooks with AI", type: "edit" },
    ];

    const interval = setInterval(() => {
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const newItem: ActivityItem = {
        id: crypto.randomUUID(),
        user: randomAction.user,
        action: randomAction.action,
        type: randomAction.type as any,
        time: "Just now",
      };

      setItems((prev) => [newItem, ...prev.slice(0, 5)]);
    }, lowEnd ? 9000 : 6000);

    return () => clearInterval(interval);
  }, [lowEnd]);

  const getIcon = (type: string) => {
    switch (type) {
      case "edit":
        return <FileText size={12} className="text-violet-400" />;
      case "task":
        return <CheckCircle size={12} className="text-emerald-400" />;
      case "comment":
        return <MessageSquare size={12} className="text-pink-400" />;
      default:
        return <Terminal size={12} className="text-cyan-400" />;
    }
  };

  return (
    <div className="rounded-[32px] border border-white/[0.05] bg-white/[0.03] p-6 backdrop-blur-3xl h-full min-h-[350px]">
      <div className="mb-6 border-b border-white/[0.04] pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity size={18} className="text-cyan-400" />
            Activity Stream
          </h2>
          <p className="text-xs text-white/50 mt-0.5">Realtime updates from teammates</p>
        </div>
      </div>

      <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 rounded-2xl bg-black/20 p-3.5 border border-white/[0.01] hover:border-white/[0.04] transition-all animate-[fadeIn_0.4s_ease-out]"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/5 p-2 shrink-0">
                {getIcon(item.type)}
              </div>
              <div>
                <p className="text-xs text-white/80">
                  <strong className="text-white font-semibold">{item.user}</strong> {item.action}
                </p>
              </div>
            </div>

            <span className="flex items-center gap-1 text-3xs text-white/30 shrink-0">
              <Clock size={10} />
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}