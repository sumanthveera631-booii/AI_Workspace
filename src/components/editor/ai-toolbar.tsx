"use client";
import { useState } from "react";
import { Editor } from "@tiptap/react";
import { Sparkles, Wand2, RefreshCw, Languages, FileText } from "lucide-react";

interface AIToolbarProps {
  editor: Editor;
}

export default function AIToolbar({ editor }: AIToolbarProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAIAction = (actionType: string) => {
    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to, " ");

    if (!selectedText) {
      alert("Please highlight or select text in the document first to trigger AI tools!");
      return;
    }

    setIsProcessing(true);

    // AI Simulation response
    setTimeout(() => {
      let result = "";
      if (actionType === "Rewrite") {
        result = `💡 *Nexus AI Refined Version*:\n"${selectedText.trim()} - Optimized for maximum team alignment and technical precision."`;
      } else if (actionType === "Summarize") {
        result = `📝 *AI Summary*:\n- Key Focus: ${selectedText.slice(0, 50)}...\n- Implication: Enhances modern collaborative speed.`;
      } else if (actionType === "Translate") {
        result = `🌐 *AI Translated (Global)*:\n"${selectedText.trim()} [Synchronized across distributed team logs]"`;
      }

      editor.chain().focus().insertContentAt({ from, to }, result).run();
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="flex items-center gap-3 border-b border-white/[0.04] bg-white/[0.02] px-6 py-3">
      <div className="flex items-center gap-2 rounded-2xl bg-violet-500/10 px-4 py-2 text-violet-300">
        <Sparkles size={16} className={isProcessing ? "animate-pulse" : ""} />
        <span className="text-xs font-semibold">AI Assistant</span>
      </div>

      <button
        onClick={() => handleAIAction("Rewrite")}
        disabled={isProcessing}
        className="flex items-center gap-1.5 rounded-2xl bg-white/[0.03] px-4 py-2 text-xs transition hover:bg-white/[0.06] hover:text-white disabled:opacity-50"
      >
        <Wand2 size={12} />
        Rewrite
      </button>

      <button
        onClick={() => handleAIAction("Summarize")}
        disabled={isProcessing}
        className="flex items-center gap-1.5 rounded-2xl bg-white/[0.03] px-4 py-2 text-xs transition hover:bg-white/[0.06] hover:text-white disabled:opacity-50"
      >
        <FileText size={12} />
        Summarize
      </button>

      <button
        onClick={() => handleAIAction("Translate")}
        disabled={isProcessing}
        className="flex items-center gap-1.5 rounded-2xl bg-white/[0.03] px-4 py-2 text-xs transition hover:bg-white/[0.06] hover:text-white disabled:opacity-50"
      >
        <Languages size={12} />
        Translate SaaS
      </button>

      {isProcessing && (
        <span className="text-2xs text-white/40 animate-pulse">
          Nexus LLM is optimizing document...
        </span>
      )}
    </div>
  );
}