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
        const text = event.results[0][0].transcript;
        if (text) {
          onTranscript(text);
        }
      };

      recognition.onerror = (e: any) => {
        console.error("Speech Recognition Error:", e);
        setError(true);
        setIsListening(false);
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