"use client";
import { useEffect, useState } from "react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { Users, FileCode, CheckCircle, RefreshCw } from "lucide-react";

export default function SharedEditor() {
  const [value, setValue] = useState("");
  const [peers, setPeers] = useState<string[]>([]);
  const [syncStatus, setSyncStatus] = useState("Connecting");
  const [sharedText, setSharedText] = useState<any>(null);
  const [yDoc, setYDoc] = useState<any>(null);

  useEffect(() => {
    const doc = new Y.Doc();
    const provider = new WebrtcProvider("nexus-ai-room", doc, {
      signaling: ["wss://signaling.yjs.dev"],
    });

    const yText = doc.getText("shared-content");
    setSharedText(yText);
    setYDoc(doc);

    // Sync state to local component
    const handleUpdate = () => {
      setValue(yText.toString());
    };
    yText.observe(handleUpdate);

    provider.on("status", (event: any) => {
      setSyncStatus(event.status === "connected" ? "Synchronized" : "Connecting");
    });

    provider.on("peers", (event: any) => {
      setPeers(event.webrtcPeers || []);
    });

    return () => {
      yText.unobserve(handleUpdate);
      provider.destroy();
      doc.destroy();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setValue(val);

    if (sharedText && yDoc) {
      yDoc.transact(() => {
        sharedText.delete(0, sharedText.length);
        sharedText.insert(0, val);
      });
    }
  };

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div className="rounded-[32px] border border-white/[0.05] bg-white/[0.03] p-8 backdrop-blur-3xl animate-[fadeIn_0.5s_ease-out]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/[0.04] pb-5 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <FileCode size={22} className="text-cyan-400" />
            Shared Collaborative Editor
          </h2>
          <p className="mt-1 text-xs text-white/50">
            Real-time peer-to-peer editing synched directly in your browser.
          </p>
        </div>

        {/* METADATA WRAPPERS */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1.5 text-2xs font-semibold text-cyan-300">
            <Users size={12} />
            <span>{peers.length + 1} Active</span>
          </div>

          <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-2xs font-semibold ${
            syncStatus === "Synchronized"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 animate-pulse"
          }`}>
            <RefreshCw size={10} className={syncStatus !== "Synchronized" ? "animate-spin" : ""} />
            <span>{syncStatus}</span>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/[0.05] bg-black/20 p-6 relative focus-within:border-violet-500/30 transition-all">
        <textarea
          value={value}
          onChange={handleChange}
          placeholder="Start typing multiplayer logs side-by-side with another browser window..."
          className="h-72 w-full resize-none bg-transparent text-sm text-white placeholder:text-white/20 outline-none focus:outline-none scrollbar-thin"
        />

        {/* BOTTOM METADATA BAR */}
        <div className="absolute bottom-4 right-6 flex items-center gap-3 text-3xs text-white/30 font-medium">
          <span>{value.length} characters</span>
          <span>•</span>
          <span>{wordCount} words</span>
        </div>
      </div>
    </div>
  );
}