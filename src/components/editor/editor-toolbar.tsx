"use client";

import { Editor } from "@tiptap/react";

import {
  Bold,
  Italic,
  Heading1,
  List,
  Code2,
} from "lucide-react";

export default function EditorToolbar({
  editor,
}: {
  editor: Editor;
}) {
  const buttons = [
    {
      icon: Bold,
      action: () =>
        editor.chain().focus().toggleBold().run(),
    },
    {
      icon: Italic,
      action: () =>
        editor.chain().focus().toggleItalic().run(),
    },
    {
      icon: Heading1,
      action: () =>
        editor.chain().focus().toggleHeading({
          level: 1,
        }).run(),
    },
    {
      icon: List,
      action: () =>
        editor.chain().focus().toggleBulletList().run(),
    },
    {
      icon: Code2,
      action: () =>
        editor.chain().focus().toggleCodeBlock().run(),
    },
  ];

  return (
    <div className="flex items-center gap-2 border-b border-white/[0.04] bg-black/20 px-6 py-4 backdrop-blur-3xl">
      {buttons.map((button, index) => {
        const Icon = button.icon;

        return (
          <button
            key={index}
            onClick={button.action}
            className="rounded-xl bg-white/[0.03] p-3 transition hover:bg-white/[0.08]"
          >
            <Icon size={18} />
          </button>
        );
      })}
    </div>
  );
}