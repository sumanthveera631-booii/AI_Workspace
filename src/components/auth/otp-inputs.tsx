"use client";
import { useEffect, useRef, useState } from "react";

interface OTPInputsProps {
  onComplete?: (code: string) => void;
}

export default function OTPInputs({ onComplete }: OTPInputsProps) {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return; // numerical only

    const newCode = [...code];
    newCode[index] = value.substring(value.length - 1);
    setCode(newCode);

    // Auto-advance
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    const finalCode = newCode.join("");
    if (finalCode.length === 6 && onComplete) {
      onComplete(finalCode);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      // Auto-revert on backspace
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (pastedData.length === 6 && !isNaN(Number(pastedData))) {
      const pasteCode = pastedData.split("");
      setCode(pasteCode);
      inputRefs.current[5]?.focus();
      if (onComplete) {
        onComplete(pastedData);
      }
    }
  };

  return (
    <div className="flex items-center justify-center gap-3.5">
      {code.map((num, i) => (
        <input
          key={i}
          ref={(el) => {
            inputRefs.current[i] = el;
          }}
          type="text"
          maxLength={1}
          value={num}
          onChange={(e) => handleChange(e.target.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          className="h-14 w-12 rounded-xl border border-white/[0.08] bg-white/[0.02] text-center text-lg font-bold text-white outline-none backdrop-blur-xl transition-all duration-300 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20"
        />
      ))}
    </div>
  );
}