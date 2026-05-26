"use client";

import { useEffect, useState } from "react";
import WorkspaceLayout from "@/components/workspace/workspace-layout";
import DashboardGrid from "@/components/dashboard/dashboard-grid";
import DashboardAurora from "@/components/effects/dashboard-aurora";
import { createWorkspace, getWorkspaces } from "@/lib/actions/workspace";
import { toast } from "sonner";
import Link from "next/link";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

interface Workspace {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  created_at: string;
}

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  due_date: string | null;
}

interface Document {
  id: string;
  title: string;
  status: string;
  emoji: string | null;
}

interface Activity {
  id: string;
  action: string;
  created_at: string;
  user: { name: string } | null;
}

interface DashboardClientProps {
  user: User;
  initialWorkspaces: Workspace[];
  initialTasks: Task[];
  initialDocuments: Document[];
  initialActivities: Activity[];
}

export default function DashboardClient({
  user,
  initialWorkspaces,
  initialTasks,
  initialDocuments,
  initialActivities,
}: DashboardClientProps) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(initialWorkspaces);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    // Refresh workspaces on mount
    refreshWorkspaces();
  }, []);

  const refreshWorkspaces = async () => {
    const result = await getWorkspaces();
    if (result.workspaces) {
      setWorkspaces(result.workspaces as Workspace[]);
    }
  };

  const handleCreateWorkspace = async () => {
    setIsCreating(true);
    const result = await createWorkspace(
      `Workspace ${workspaces.length + 1}`,
      "AI Collaborative Workspace"
    );

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Workspace created successfully");
      await refreshWorkspaces();
    }

    setIsCreating(false);
  };

  return (
    <WorkspaceLayout>
      <div className="relative min-h-screen overflow-hidden bg-[#050816]">
        <DashboardAurora />

        <div className="relative z-10 p-6 md:p-10">
          {/* HEADER */}
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
                Workspace
              </p>

              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white">
                Welcome back, {user.name}
              </h1>

              <p className="mt-3 max-w-2xl text-white/50">
                Manage AI workflows, productivity systems, analytics, collaboration, and
                research from one unified cinematic workspace.
              </p>

              <div className="mt-4 flex items-center gap-3">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-10 w-10 rounded-full border border-white/20"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-sm font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}

                <div>
                  <p className="text-sm text-white">{user.name}</p>
                  <p className="text-xs text-white/40">{user.email}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleCreateWorkspace}
              disabled={isCreating}
              className="rounded-2xl bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreating ? "Creating..." : "Create Workspace"}
            </button>
          </div>

          {/* WORKSPACES */}
          {workspaces.length > 0 && (
            <div className="mb-10">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-white">Your Workspaces</h2>
                <span className="text-sm text-white/40">{workspaces.length} total</span>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {workspaces.map((ws) => (
                  <Link
                    key={ws.id}
                    href={`/workspaces/${ws.id}`}
                    className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 hover:bg-white/[0.06]"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-lg font-medium text-white">{ws.name}</p>
                        <p className="mt-1 text-sm text-white/40">
                          {ws.description || "AI Collaborative Workspace"}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-cyan-300">
                        Active
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        <div className="h-8 w-8 rounded-full bg-cyan-500" />
                        <div className="h-8 w-8 rounded-full bg-blue-500" />
                        <div className="h-8 w-8 rounded-full bg-pink-500" />
                      </div>

                      <span className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition group-hover:bg-white/10">
                        Open
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* DASHBOARD GRID */}
          <DashboardGrid
            initialTasks={initialTasks}
            initialDocuments={initialDocuments}
            initialActivities={initialActivities}
          />
        </div>
      </div>
    </WorkspaceLayout>
  );
}
