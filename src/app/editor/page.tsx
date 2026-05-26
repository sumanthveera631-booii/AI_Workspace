import WorkspaceLayout from "@/components/workspace/workspace-layout";

import EditorShell from "@/components/editor/editor-shell";

export default function EditorPage() {
  return (
    <WorkspaceLayout>
      <div className="min-h-screen bg-[#050816]">
        {/* HEADER */}
        <div
          className="
            border-b
            border-white/[0.04]
            px-6
            py-5
            backdrop-blur-3xl
            md:px-10
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
                Knowledge Editor
              </p>

              <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                AI Document Workspace
              </h1>
            </div>

            <button
              className="
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.04]
                px-5
                py-2
                text-sm
                text-white/70
                transition
                hover:bg-white/[0.08]
              "
            >
              Share Document
            </button>
          </div>
        </div>

        {/* EDITOR */}
        <div className="p-4 md:p-8">
          <EditorShell />
        </div>
      </div>
    </WorkspaceLayout>
  );
}