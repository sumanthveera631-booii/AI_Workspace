"use client";
import { useState, useCallback, memo } from "react";
import { Send, FileUp, Sparkles } from "lucide-react";
import VoiceAssistant from "./voice-assistant";

interface AIInputProps {
  onSend: (message: string) => void;
}

function AIInput({ onSend }: AIInputProps) {
  const [value, setValue] = useState("");
  const [fileAttached, setFileAttached] = useState(false);

  const handleSend = useCallback(() => {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
    setFileAttached(false);
  }, [onSend, value]);

  const handleTranscript = useCallback((transcriptText: string) => {
    setValue((prev) => (prev ? prev + " " + transcriptText : transcriptText));
  }, []);

  const handleFileUploadSim = () => {
    setFileAttached(true);
    alert("Simulated: File loaded into Nexus AI Context (PDF/Markdown support enabled).");
  };

  return (
    <div className="border-t border-white/[0.05] bg-[#070B14]/80 p-6 backdrop-blur-3xl shrink-0">
      <div className="mx-auto flex max-w-4xl items-center gap-4 rounded-[28px] border border-white/[0.05] bg-white/[0.03] px-6 py-4 transition focus-within:border-violet-500/50 focus-within:ring-1 focus-within:ring-violet-500/20">
        
        {/* VOICE INPUT */}
        <VoiceAssistant onTranscript={handleTranscript} />

        {/* ATTACHMENT SIMULATOR */}
        <button
          type="button"
          onClick={handleFileUploadSim}
          className={`p-3 rounded-full transition-all ${
            fileAttached ? "bg-cyan-500/20 text-cyan-400" : "text-white/50 hover:bg-white/5 hover:text-white"
          }`}
          title="Attach Workspace File"
        >
          <FileUp size={18} />
        </button>

        {/* TEXT INPUT */}
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Ask Nexus AI... (Try: 'Draft a roadmap' or toggle Mic)"
          className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/30"
        />

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleSend}
          disabled={!value.trim()}
          className="rounded-full bg-violet-600 p-3 text-white transition hover:scale-105 hover:bg-violet-500 active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
        >
          <Send size={18} />
        </button>
      </div>

      {fileAttached && (
        <div className="mx-auto max-w-4xl mt-3 px-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-2.5 py-1 text-3xs font-medium text-cyan-300">
            <Sparkles size={10} />
            Context attachment synched (Prisma schema or metrics sheet)
          </span>
        </div>
      )}
    </div>
  );
}

export default memo(AIInput);