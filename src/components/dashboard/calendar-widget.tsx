"use client";
import { useEffect, useState } from "react";
import WidgetCard from "./widget-card";
import { Calendar, Plus, X, Clock } from "lucide-react";

interface EventItem {
  id: string;
  title: string;
  time: string;
}

const defaultEvents: EventItem[] = [
  { id: "1", title: "Design Review / Figma Sync", time: "10:00 AM" },
  { id: "2", title: "Nexus AI Core Sync", time: "01:30 PM" },
  { id: "3", title: "Product Strategy & Architecture", time: "04:00 PM" },
];

export default function CalendarWidget() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("nexus-events");
    if (saved) {
      try {
        setEvents(JSON.parse(saved));
      } catch (e) {
        setEvents(defaultEvents);
      }
    } else {
      setEvents(defaultEvents);
    }
  }, []);

  const saveEvents = (newEvents: EventItem[]) => {
    setEvents(newEvents);
    localStorage.setItem("nexus-events", JSON.stringify(newEvents));
  };

  const addEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTime.trim()) return;
    const newEvent: EventItem = {
      id: crypto.randomUUID(),
      title: newTitle.trim(),
      time: newTime.trim(),
    };
    saveEvents([...events, newEvent]);
    setNewTitle("");
    setNewTime("");
    setShowModal(false);
  };

  const removeEvent = (id: string) => {
    saveEvents(events.filter((ev) => ev.id !== id));
  };

  return (
    <WidgetCard title="Team Syncs">
      <div className="flex h-full flex-col relative">
        {/* EVENT LIST */}
        <div className="flex-1 overflow-y-auto space-y-3 max-h-[220px] pr-1">
          {events.map((event) => (
            <div
              key={event.id}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-white/[0.04] bg-white/[0.02] p-4 transition-all hover:bg-white/[0.05]"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-violet-500/10 p-2.5 text-violet-300">
                  <Calendar size={14} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white/90 group-hover:text-white transition-all line-clamp-1">
                    {event.title}
                  </h4>
                  <p className="mt-1 flex items-center gap-1 text-2xs text-white/40">
                    <Clock size={10} />
                    {event.time}
                  </p>
                </div>
              </div>

              <button
                onClick={() => removeEvent(event.id)}
                className="text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* BOTTOM QUICK ADD */}
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-white/10 py-3 text-xs text-white/60 transition hover:border-white/20 hover:text-white"
        >
          <Plus size={14} />
          Schedule Event
        </button>

        {/* MODAL LIGHT DIALOG */}
        {showModal && (
          <div className="absolute inset-0 z-50 rounded-[28px] bg-black/90 p-5 backdrop-blur-md flex flex-col justify-center">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-white">Schedule Sync</h4>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={addEvent} className="space-y-3">
              <input
                type="text"
                placeholder="Event Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none focus:border-violet-500"
                required
              />
              <input
                type="text"
                placeholder="e.g. 10:00 AM, 3:30 PM"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none focus:border-violet-500"
                required
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-violet-600 py-2 text-xs font-semibold hover:bg-violet-500 transition"
              >
                Confirm Scheduling
              </button>
            </form>
          </div>
        )}
      </div>
    </WidgetCard>
  );
}