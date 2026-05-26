"use client";

export default function WorkspaceContent() {
  return (
    <div className="flex h-full flex-col overflow-auto p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold tracking-tight">
          AI Workspace
        </h1>

        <p className="mt-3 text-white/50">
          Manage agents, projects, workflows, and research.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-3xl bg-white/[0.03] p-6 backdrop-blur-3xl xl:col-span-2">
          <div className="h-[400px] rounded-2xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10" />
        </div>

        <div className="rounded-3xl bg-white/[0.03] p-6 backdrop-blur-3xl">
          <div className="h-[400px] rounded-2xl bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10" />
        </div>
      </div>
    </div>
  );
}