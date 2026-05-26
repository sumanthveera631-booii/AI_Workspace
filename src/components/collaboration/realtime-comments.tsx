"use client";
import { useEffect, useState } from "react";
import { MessageSquare, Plus, Trash2, Send } from "lucide-react";

interface CommentItem {
  id: string;
  user: string;
  text: string;
  timestamp: string;
}

const defaultComments: CommentItem[] = [
  { id: "c1", user: "Alex", text: "This dashboard layout has Apple-level grid spacing. Beautiful!", timestamp: "10m ago" },
  { id: "c2", user: "Sarah", text: "Inline AI translation features are synched and ready to ship.", timestamp: "2m ago" },
];

export default function RealtimeComments() {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [newComment, setNewComment] = useState("");
  const [activeUser, setActiveUser] = useState("You (Lead Dev)");

  useEffect(() => {
    const saved = localStorage.getItem("nexus-comments");
    if (saved) {
      try {
        setComments(JSON.parse(saved));
      } catch (e) {
        setComments(defaultComments);
      }
    } else {
      setComments(defaultComments);
    }
  }, []);

  const saveComments = (updated: CommentItem[]) => {
    setComments(updated);
    localStorage.setItem("nexus-comments", JSON.stringify(updated));
  };

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const item: CommentItem = {
      id: crypto.randomUUID(),
      user: activeUser,
      text: newComment.trim(),
      timestamp: "Just now",
    };

    saveComments([...comments, item]);
    setNewComment("");
  };

  const deleteComment = (id: string) => {
    saveComments(comments.filter((c) => c.id !== id));
  };

  return (
    <div className="rounded-[32px] border border-white/[0.05] bg-white/[0.03] p-6 backdrop-blur-3xl flex flex-col justify-between h-full min-h-[350px]">
      <div>
        <div className="mb-6 border-b border-white/[0.04] pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <MessageSquare size={18} className="text-violet-400" />
              Realtime Comments
            </h2>
            <p className="text-xs text-white/50 mt-0.5">Multiplayer team discussion feed</p>
          </div>
          
          <select
            value={activeUser}
            onChange={(e) => setActiveUser(e.target.value)}
            className="rounded bg-white/5 border border-white/10 px-2 py-1 text-3xs text-white outline-none"
          >
            <option>You (Lead Dev)</option>
            <option>Sarah (Product)</option>
            <option>Alex (Lead Dev)</option>
          </select>
        </div>

        {/* COMMENT SCROLL */}
        <div className="space-y-3 max-h-[170px] overflow-y-auto pr-1">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="group rounded-2xl bg-black/20 p-4 border border-white/[0.02] hover:border-white/[0.06] transition-all flex items-start justify-between gap-3"
            >
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-xs font-semibold text-white/80">{comment.user}</span>
                  <span className="text-4xs text-white/30">{comment.timestamp}</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">{comment.text}</p>
              </div>

              <button
                onClick={() => deleteComment(comment.id)}
                className="text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all shrink-0"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* INPUT FORM */}
      <form onSubmit={handlePost} className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Join discussion thread..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-xs text-white placeholder:text-white/30 outline-none focus:border-violet-500/50"
        />
        <button
          type="submit"
          className="flex items-center justify-center rounded-xl bg-violet-600 px-3 hover:bg-violet-500 transition"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}