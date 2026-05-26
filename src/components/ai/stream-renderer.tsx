"use client";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function StreamRenderer({
  text,
}: {
  text: string;
}) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, index));
      index += 2; // Speed up streaming slightly for premium feel

      if (index > text.length) {
        setDisplayed(text);
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="text-white/80 prose prose-invert max-w-none text-xs sm:text-sm">
      <ReactMarkdown>{displayed}</ReactMarkdown>
    </div>
  );
}