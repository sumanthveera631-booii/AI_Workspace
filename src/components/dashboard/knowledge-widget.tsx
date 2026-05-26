"use client";
import { useState } from "react";
import WidgetCard from "./widget-card";
import { FileText, Share2, Plus, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Document {
  id: string;
  title: string;
  status: string;
  emoji: string | null;
}

interface KnowledgeWidgetProps {
  initialDocuments: Document[];
}

export default function KnowledgeWidget({ initialDocuments }: KnowledgeWidgetProps) {
  const [documents] = useState<Document[]>(initialDocuments);

  const getEmoji = (title: string, emoji: string | null) => {
    if (emoji) return emoji;
    const defaults = ["📄", "📝", "📑", "📋", "📊"];
    return defaults[Math.abs(title.split("").reduce((a, b) => a + b.charCodeAt(0), 0)) % defaults.length];
  };

  return (
    <WidgetCard title="Documents">
      <div className="flex h-full flex-col">
        <div className="mb-4 flex items-center justify-between text-2xs text-white/50">
          <span>
            Total: <strong className="text-cyan-300">{documents.length}</strong>
          </span>
          <span className="flex items-center gap-1">
            <Share2 size={10} className="text-cyan-400" />
            Synced
          </span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[180px] pr-1">
          {documents.length === 0 ? (
            <div className="flex h-20 items-center justify-center text-xs text-white/30">
              No documents yet
            </div>
          ) : (
            documents.slice(0, 5).map((doc) => (
              <Link
                key={doc.id}
                href={`/editor?doc=${doc.id}`}
                className="group flex items-center justify-between rounded-xl bg-white/[0.02] px-3.5 py-2.5 transition hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <span className="text-base">{getEmoji(doc.title, doc.emoji)}</span>
                  <span className="line-clamp-1">{doc.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded px-1.5 py-0.5 text-3xs font-medium ${
                      doc.status === "published"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : doc.status === "archived"
                        ? "bg-gray-500/10 text-gray-400"
                        : "bg-white/5 text-white/40"
                    }`}
                  >
                    {doc.status}
                  </span>
                  <ExternalLink size={12} className="text-white/20 group-hover:text-white/60" />
                </div>
              </Link>
            ))
          )}
        </div>

        <Link
          href="/editor"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/[0.03] py-3 text-xs text-white/80 hover:bg-white/[0.06] transition"
        >
          <Plus size={14} />
          Create New Document
        </Link>
      </div>
    </WidgetCard>
  );
}
