"use client";
import { memo } from "react";
import ReactMarkdown from "react-markdown";

function StreamRenderer({
  text,
}: {
  text: string;
}) {
  return (
    <div className="text-white/80 prose prose-invert max-w-none text-xs sm:text-sm">
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
}

export default memo(StreamRenderer);