"use client";
import { useState, useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

import EditorToolbar from "./editor-toolbar";
import EditorSidebar from "./editor-sidebar";
import SlashCommandMenu from "./slash-command-menu";
import AIToolbar from "./ai-toolbar";

export default function EditorShell() {
  const [showSlashMenu, setShowSlashMenu] = useState(false);

  const editor = useEditor({
    immediatelyRender: true,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Press '/' for commands or type to write with AI...",
      }),
    ],
    content: `
      <h1>Nexus AI Workspace</h1>
      <p>This is your cinematic collaborative editor. Highlight any text here to run AI actions, or type '/' on a new line to access command blocks instantly!</p>
    `,
  });

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      // Get the last text typed at selection
      const { from } = editor.state.selection;
      const textBefore = editor.state.doc.textBetween(Math.max(0, from - 1), from);

      if (textBefore === "/") {
        setShowSlashMenu(true);
      } else {
        // If they backspace or type something else, close the menu
        if (textBefore !== "/") {
          setShowSlashMenu(false);
        }
      }
    };

    editor.on("selectionUpdate", handleUpdate);
    editor.on("update", handleUpdate);

    return () => {
      editor.off("selectionUpdate", handleUpdate);
      editor.off("update", handleUpdate);
    };
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-[#070B14] text-white">
      <EditorSidebar />

      <div className="flex flex-1 flex-col">
        <EditorToolbar editor={editor} />

        <AIToolbar editor={editor} />

        <div className="relative flex-1 overflow-y-auto">
          {showSlashMenu && (
            <SlashCommandMenu editor={editor} onClose={() => setShowSlashMenu(false)} />
          )}

          <div className="mx-auto max-w-4xl px-10 py-20">
            <div className="rounded-[32px] border border-white/[0.04] bg-white/[0.02] p-10 backdrop-blur-3xl">
              <EditorContent
                editor={editor}
                className="prose prose-invert max-w-none outline-none focus:outline-none min-h-[350px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}