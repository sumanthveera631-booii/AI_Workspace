"use client";
import { useEffect, useState } from "react";
import { Command } from "cmdk";
import {
  Search,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Plus,
  Play,
  RotateCcw,
  Sparkles,
  Settings,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

const pages = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, category: "Navigation" },
  { name: "Document Editor", href: "/editor", icon: FileText, category: "Navigation" },
  { name: "Nexus AI Chat", href: "/ai", icon: MessageSquare, category: "Navigation" },
  { name: "Workspace Settings", href: "/settings", icon: Settings, category: "Navigation" },
];

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const triggerAction = (actionName: string) => {
    alert(`Triggered workspace action: "${actionName}"`);
    setOpen(false);
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed left-1/2 top-24 z-[100] w-full max-w-2xl -translate-x-1/2 overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#070B14]/95 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-3xl animate-[scaleIn_0.2s_ease-out]"
    >
      <div className="flex items-center border-b border-white/[0.05] px-4.5 py-1">
        <Search className="h-5 w-5 text-white/30 shrink-0 mr-3" />
        <Command.Input
          placeholder="Search documents, commands, routes..."
          value={search}
          onValueChange={setSearch}
          className="h-16 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
        />
        <kbd className="hidden sm:inline-flex items-center gap-1 rounded bg-white/5 border border-white/10 px-2 py-1 text-4xs font-semibold text-white/40">
          ESC
        </kbd>
      </div>

      <Command.List className="max-h-[380px] overflow-y-auto p-2 space-y-1.5 scrollbar-thin">
        <Command.Empty className="p-8 text-center text-xs text-white/30 flex flex-col items-center gap-2">
          <span>No commands found matching "{search}"</span>
          <span className="text-3xs text-white/15">Try 'editor' or 'task'</span>
        </Command.Empty>

        {/* NAVIGATION CATEGORY */}
        <Command.Group heading="Navigation" className="text-3xs uppercase tracking-[0.2em] text-white/30 px-3.5 py-2">
          {pages
            .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
            .map((page) => {
              const Icon = page.icon;
              return (
                <Command.Item
                  key={page.name}
                  onSelect={() => {
                    router.push(page.href);
                    setOpen(false);
                  }}
                  className="flex cursor-pointer items-center justify-between gap-4 rounded-xl px-3.5 py-3 text-white/70 transition-all hover:bg-white/[0.04] hover:text-white border border-transparent aria-selected:bg-violet-600/10 aria-selected:border-violet-500/20 aria-selected:text-white"
                >
                  <span className="flex items-center gap-3 text-xs font-semibold">
                    <Icon size={16} className="text-violet-400" />
                    {page.name}
                  </span>
                  <span className="text-3xs text-white/30">Jump To</span>
                </Command.Item>
              );
            })}
        </Command.Group>

        {/* QUICK ACTIONS CATEGORY */}
        <Command.Group heading="Workspace Tools" className="text-3xs uppercase tracking-[0.2em] text-white/30 px-3.5 py-2 mt-2">
          <Command.Item
            onSelect={() => triggerAction("New Document")}
            className="flex cursor-pointer items-center justify-between gap-4 rounded-xl px-3.5 py-3 text-white/70 transition-all hover:bg-white/[0.04] hover:text-white border border-transparent aria-selected:bg-violet-600/10 aria-selected:border-violet-500/20 aria-selected:text-white"
          >
            <span className="flex items-center gap-3 text-xs font-semibold">
              <Plus size={16} className="text-cyan-400" />
              Create New AI Document
            </span>
            <kbd className="text-4xs font-semibold text-white/30 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">⌘N</kbd>
          </Command.Item>

          <Command.Item
            onSelect={() => triggerAction("Reset Dashboard Metrics")}
            className="flex cursor-pointer items-center justify-between gap-4 rounded-xl px-3.5 py-3 text-white/70 transition-all hover:bg-white/[0.04] hover:text-white border border-transparent aria-selected:bg-violet-600/10 aria-selected:border-violet-500/20 aria-selected:text-white"
          >
            <span className="flex items-center gap-3 text-xs font-semibold">
              <RotateCcw size={16} className="text-fuchsia-400" />
              Reset Dashboard Metrics
            </span>
            <kbd className="text-4xs font-semibold text-white/30 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">⌘R</kbd>
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}