"use client";
import { useState } from "react";
import { Mic, MicOff, RefreshCw } from "lucide-react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface VoiceAssistantProps {
  onTranscript: (text: string) => void;
}

export default function VoiceAssistant({ onTranscript }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Browser Speech Recognition is not supported. Please use Chrome/Safari/Edge.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        setError(false);
      };

      recognition.onresult = (event: any) => {
        const results = event?.results;
        if (!results || results.length === 0) return;

        let finalTranscript = "";
        for (let i = results.length - 1; i >= 0; i--) {
          const result = results[i];
          if (result.isFinal) {
            finalTranscript = result[0]?.transcript?.trim() || "";
            break;
          }
        }

        if (!finalTranscript) {
          finalTranscript = results[results.length - 1]?.[0]?.transcript?.trim() || "";
        }

        if (finalTranscript) {
          const words = finalTranscript.split(/\s+/);
          const seen = new Set<string>();
          const uniqueWords = words.filter((word) => {
            if (seen.has(word.toLowerCase())) return false;
            seen.add(word.toLowerCase());
            return true;
          });
          onTranscript(uniqueWords.join(" "));
        }
      };

      recognition.onerror = (e: any) => {
        const errorType = e?.error || "unknown";
        const errorMessages: Record<string, string> = {
          "no-speech": "No speech detected. Try again.",
          "audio-capture": "Microphone not available. Check permissions.",
          "not-allowed": "Microphone access denied. Enable in browser settings.",
          network: "Network error. Check your connection.",
          aborted: "Recognition was cancelled.",
          "language-not-supported": "Language not supported.",
          "service-not-allowed": "Speech service not allowed.",
          unknown: "An error occurred. Please try again.",
        };
        const message = errorMessages[errorType] || errorMessages.unknown;
        console.warn("Speech Recognition:", errorType, message);
        setError(true);
        setIsListening(false);
        recognition.abort();
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      setError(true);
      setIsListening(false);
    }
  };

  return (
    <button
      type="button"
      onClick={startListening}
      className={`relative flex items-center justify-center p-3 rounded-full transition-all duration-300 ${
        isListening
          ? "bg-cyan-500/20 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          : "bg-white/[0.03] text-white/50 hover:bg-white/10 hover:text-white"
      }`}
      title="Voice Workspace Assistant"
    >
      {isListening && (
        <span className="absolute inset-0 rounded-full border border-cyan-400 animate-ping opacity-60" />
      )}
      
      {isListening ? (
        <Mic className="h-5 w-5 animate-pulse text-cyan-400" />
      ) : error ? (
        <MicOff className="h-5 w-5 text-red-400" />
      ) : (
        <Mic className="h-5 w-5" />
      )}
    </button>
  );
}