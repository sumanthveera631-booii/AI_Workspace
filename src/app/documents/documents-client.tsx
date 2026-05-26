"use client";

import { useState } from "react";
import WorkspaceLayout from "@/components/workspace/workspace-layout";
import { FileText, Plus, Search, ListFilter as Filter, Grid2x2 as Grid, List, MoveVertical as MoreVertical, Archive, Star, Trash2 } from "lucide-react";
import Link from "next/link";
import { createDocument, deleteDocument, updateDocument } from "@/lib/actions/documents";
import { toast } from "sonner";

interface Document {
  id: string;
  title: string;
  content: string | null;
  status: string;
  emoji: string | null;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
  author: { name: string } | null;
}

interface DocumentsClientProps {
  initialDocuments: Document[];
}

export default function DocumentsClient({ initialDocuments }: DocumentsClientProps) {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState<"all" | "draft" | "published" | "archived">("all");
  const [isCreating, setIsCreating] = useState(false);

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || doc.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleCreateDocument = async () => {
    setIsCreating(true);
    const result = await createDocument({ title: "Untitled Document" });

    if (result.document) {
      setDocuments([result.document as Document, ...documents]);
      toast.success("Document created");
      window.location.href = `/editor?doc=${result.document.id}`;
    } else if (result.error) {
      toast.error(result.error);
    }

    setIsCreating(false);
  };

  const handleToggleFavorite = async (id: string, currentStatus: boolean) => {
    setDocuments(
      documents.map((doc) =>
        doc.id === id ? { ...doc, is_favorite: !currentStatus } : doc
      )
    );

    const result = await updateDocument(id, { is_favorite: !currentStatus });
    if (result.error) {
      toast.error(result.error);
    }
  };

  const handleDeleteDocument = async (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
    const result = await deleteDocument(id);
    if (result.error) {
      toast.error(result.error);
    }
  };

  const getEmoji = (title: string, emoji: string | null) => {
    if (emoji) return emoji;
    const defaults = ["📄", "📝", "📋", "📊", "📑"];
    return defaults[Math.abs(title.split("").reduce((a, b) => a + b.charCodeAt(0), 0)) % defaults.length];
  };

  return (
    <WorkspaceLayout>
      <div className="min-h-screen bg-[#050816] p-6 md:p-10">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Knowledge</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white">Documents</h1>
          <p className="mt-3 max-w-2xl text-white/50">
            All your notes, AI-generated content, and workspace files in one place.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white outline-none transition focus:border-cyan-500"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none"
            >
              <option value="all">All Documents</option>
              <option value="draft">Drafts</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="flex gap-3">
            <div className="flex rounded-xl border border-white/10 bg-white/[0.03] p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded-lg p-2 transition ${
                  viewMode === "grid" ? "bg-white/10 text-white" : "text-white/40"
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`rounded-lg p-2 transition ${
                  viewMode === "list" ? "bg-white/10 text-white" : "text-white/40"
                }`}
              >
                <List size={18} />
              </button>
            </div>

            <button
              onClick={handleCreateDocument}
              disabled={isCreating}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:scale-[1.02] disabled:opacity-50"
            >
              <Plus size={18} />
              <span className="hidden md:inline">New Document</span>
            </button>
          </div>
        </div>

        {filteredDocuments.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03] py-20">
            <FileText size={48} className="text-white/20" />
            <p className="mt-4 text-lg text-white/40">
              {searchQuery ? "No documents found" : "No documents yet"}
            </p>
            <button
              onClick={handleCreateDocument}
              className="mt-6 rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-[1.02]"
            >
              Create your first document
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredDocuments.map((doc) => (
              <Link
                key={doc.id}
                href={`/editor?doc=${doc.id}`}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-cyan-500/40 hover:bg-white/[0.06]"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] text-2xl">
                      {getEmoji(doc.title, doc.emoji)}
                    </div>
                    <div>
                      <h3 className="font-medium text-white line-clamp-1">{doc.title}</h3>
                      <p className="text-xs text-white/40">
                        {doc.author?.name || "You"} • {new Date(doc.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleToggleFavorite(doc.id, doc.is_favorite);
                      }}
                      className="rounded-lg p-1.5 text-white/40 hover:bg-white/10 hover:text-white"
                    >
                      <Star size={16} className={doc.is_favorite ? "fill-yellow-400 text-yellow-400" : ""} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteDocument(doc.id);
                      }}
                      className="rounded-lg p-1.5 text-white/40 hover:bg-white/10 hover:text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-white/50 line-clamp-2">
                  {doc.content || "No content yet..."}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <span
                    className={`rounded-lg px-2 py-1 text-xs font-medium ${
                      doc.status === "published"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : doc.status === "archived"
                        ? "bg-gray-500/10 text-gray-400"
                        : "bg-white/5 text-white/40"
                    }`}
                  >
                    {doc.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredDocuments.map((doc) => (
              <Link
                key={doc.id}
                href={`/editor?doc=${doc.id}`}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-cyan-500/40 hover:bg-white/[0.06]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] text-xl">
                    {getEmoji(doc.title, doc.emoji)}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{doc.title}</h3>
                    <p className="text-xs text-white/40">
                      {doc.author?.name || "You"} • {new Date(doc.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`rounded-lg px-2 py-1 text-xs font-medium ${
                      doc.status === "published"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : doc.status === "archived"
                        ? "bg-gray-500/10 text-gray-400"
                        : "bg-white/5 text-white/40"
                    }`}
                  >
                    {doc.status}
                  </span>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleToggleFavorite(doc.id, doc.is_favorite);
                    }}
                    className="rounded-lg p-1.5 text-white/40 hover:bg-white/10 hover:text-white"
                  >
                    <Star size={16} className={doc.is_favorite ? "fill-yellow-400 text-yellow-400" : ""} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteDocument(doc.id);
                    }}
                    className="rounded-lg p-1.5 text-white/40 hover:bg-white/10 hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </WorkspaceLayout>
  );
}
