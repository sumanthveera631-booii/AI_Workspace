"use client";

import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";

import WorkspaceTabs from "./workspace-tabs";
import WorkspaceContent from "./workspace-content";

export default function WorkspacePanels() {
  return (
    <PanelGroup
      direction="horizontal"
      className="flex-1"
    >
      {/* LEFT PANEL */}
      <Panel defaultSize={70} minSize={40}>
        <div className="flex h-full flex-col">
          <WorkspaceTabs />

          <WorkspaceContent />
        </div>
      </Panel>

      {/* RESIZE HANDLE */}
      <PanelResizeHandle className="w-[1px] bg-white/[0.05]" />

      {/* RIGHT PANEL */}
      <Panel defaultSize={30} minSize={20}>
        <div className="flex h-full flex-col border-l border-white/[0.04] bg-black/20 p-6 backdrop-blur-3xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">
              AI Assistant
            </h2>

            <p className="mt-2 text-sm text-white/50">
              Floating contextual intelligence
            </p>
          </div>

          <div className="flex-1 rounded-3xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 p-6">
            <div className="space-y-4">
              <div className="rounded-2xl bg-white/[0.04] p-4 text-sm text-white/70">
                Generate workspace insights
              </div>

              <div className="rounded-2xl bg-white/[0.04] p-4 text-sm text-white/70">
                Summarize documents
              </div>

              <div className="rounded-2xl bg-white/[0.04] p-4 text-sm text-white/70">
                Build AI workflows
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </PanelGroup>
  );
}