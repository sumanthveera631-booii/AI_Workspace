"use client";
import { useEffect, useState, useRef } from "react";
import { Editor } from "@tiptap/react";
import { Heading1, List, Code, Sparkles, Table2, ShieldAlert } from "lucide-react";

interface CommandItem {
  name: string;
  description: string;
  icon: any;
  action: (editor: Editor) => void;
}

const commands: CommandItem[] = [
  {
    name: "Heading 1",
    description: "Large section header",
    icon: Heading1,
    action: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    name: "Bullet List",
    description: "Create a simple bulleted list",
    icon: List,
    action: (editor) => editor.chain().focus().toggleBulletList().run(),
  },
  {
    name: "Code Block",
    description: "Inject formatted code block",
    icon: Code,
    action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
  },
  {
    name: "AI Rewrite Selection",
    description: "Let Nexus AI refine selected text",
    icon: Sparkles,
    action: (editor) => {
      const selected = editor.state.doc.textBetween(
        editor.state.selection.from,
        editor.state.selection.to,
        " "
      );
      if (!selected) {
        editor.chain().focus().insertContent("Generating AI research memo... ").run();
      } else {
        editor.chain().focus().insertContent(`Nexus AI: Optimized version of "${selected}" `).run();
      }
    },
  },
  {
    name: "Synched Block",
    description: "Checklist widget block",
    icon: Table2,
    action: (editor) => editor.chain().focus().insertContent("<ul data-type='taskList'><li data-checked='false'>Synchronized task action...</li></ul>").run(),
  },
];

interface SlashCommandMenuProps {
  editor: Editor;
  onClose: () => void;
}

export default function SlashCommandMenu({ editor, onClose }: SlashCommandMenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % commands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + commands.length) % commands.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        triggerCommand(selectedIndex);
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [selectedIndex, onClose]);

  const triggerCommand = (index: number) => {
    // Delete the slash character '/' typed
    const { from } = editor.state.selection;
    editor.chain().focus().deleteRange({ from: from - 1, to: from }).run();

    // Execute the action
    commands[index].action(editor);
    onClose();
  };

  return (
    <div
      ref={containerRef}
      className="absolute left-[10%] top-20 z-50 w-80 rounded-2xl border border-white/[0.08] bg-[#0B1120]/95 p-2 shadow-2xl backdrop-blur-3xl animate-[scaleIn_0.2s_ease-out]"
    >
      <div className="px-3.5 py-2 text-2xs uppercase tracking-[0.2em] text-white/30 border-b border-white/[0.04] mb-1.5 flex justify-between items-center">
        <span>Slash Commands</span>
        <span className="text-3xs font-medium bg-white/5 px-1 py-0.5 rounded text-white/50">↑↓ Nav</span>
      </div>

      <div className="space-y-1">
        {commands.map((command, idx) => {
          const Icon = command.icon;
          const isSelected = idx === selectedIndex;

          return (
            <button
              key={command.name}
              onClick={() => triggerCommand(idx)}
              className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left transition-all ${
                isSelected
                  ? "bg-violet-600/20 text-white border border-violet-500/30 shadow-[0_0_15px_rgba(124,58,237,0.15)]"
                  : "text-white/60 hover:bg-white/[0.03] hover:text-white border border-transparent"
              }`}
            >
              <div
                className={`rounded-lg p-2 ${
                  isSelected ? "bg-violet-500 text-white" : "bg-white/5 text-white/40"
                }`}
              >
                <Icon size={14} />
              </div>

              <div className="flex-1">
                <p className="text-xs font-semibold">{command.name}</p>
                <p className="text-3xs text-white/40 mt-0.5">{command.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}