"use client";
import { useEffect, useState } from "react";
import { Users, Wifi, UserCheck, Shield } from "lucide-react";

interface Collaborator {
  name: string;
  status: string;
  ping: number;
  role: string;
  color: string;
}

const initialUsers: Collaborator[] = [
  { name: "Alex", status: "Refactoring Editor", ping: 14, role: "Lead Dev", color: "from-violet-500 to-fuchsia-500" },
  { name: "Sarah", status: "Viewing Dashboard", ping: 22, role: "Product Manager", color: "from-cyan-400 to-blue-500" },
  { name: "John", status: "Commenting", ping: 48, role: "Designer", color: "from-pink-500 to-rose-500" },
];

export default function PresenceSystem() {
  const [presence, setPresence] = useState<Collaborator[]>(initialUsers);

  useEffect(() => {
    const timer = setInterval(() => {
      setPresence((prev) =>
        prev.map((user) => ({
          ...user,
          // Random ping drift
          ping: Math.max(8, Math.min(120, user.ping + Math.floor(Math.random() * 10) - 5)),
        }))
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const handleStatusToggle = (name: string) => {
    const statuses = ["Editing Notes", "Analyzing Logs", "Syncing Graph", "Commenting", "Idle"];
    setPresence((prev) =>
      prev.map((user) => {
        if (user.name === name) {
          const nextStatus = statuses[Math.floor(Math.random() * statuses.length)];
          return { ...user, status: nextStatus };
        }
        return user;
      })
    );
  };

  return (
    <div className="fixed right-6 top-24 z-40 rounded-[28px] border border-white/[0.06] bg-[#070B14]/90 p-5 shadow-2xl backdrop-blur-3xl w-72 animate-[scaleIn_0.3s_ease-out]">
      <div className="mb-4 border-b border-white/[0.04] pb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <Users size={14} className="text-cyan-400" />
            Live Presence
          </h3>
          <p className="text-3xs text-white/40 mt-0.5">Active workspace collaborators</p>
        </div>
        <div className="flex items-center gap-1 rounded bg-emerald-500/10 px-1.5 py-0.5 text-4xs font-bold text-emerald-400 animate-pulse">
          <Wifi size={10} />
          ONLINE
        </div>
      </div>

      <div className="space-y-2">
        {presence.map((user) => (
          <div
            key={user.name}
            onClick={() => handleStatusToggle(user.name)}
            className="group flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-white/[0.04] bg-white/[0.01] px-3.5 py-3 hover:bg-white/[0.04] transition-all"
            title="Click to randomize activity status"
          >
            <div className="flex items-center gap-3">
              {/* Custom Initial Avatar */}
              <div className={`flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br text-white text-xs font-bold ${user.color} shadow-md`}>
                {user.name.charAt(0)}
              </div>

              <div>
                <span className="text-xs font-semibold text-white/90 group-hover:text-white transition-all flex items-center gap-1">
                  {user.name}
                  {user.name === "Alex" && <Shield size={10} className="text-yellow-400" />}
                </span>
                <span className="block text-3xs text-white/40 line-clamp-1">{user.status}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="block text-4xs font-medium text-white/30">{user.role}</span>
              <span className="block text-4xs font-semibold text-emerald-400 mt-0.5">
                {user.ping}ms
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}