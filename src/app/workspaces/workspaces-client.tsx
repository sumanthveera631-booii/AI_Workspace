"use client";

import { useState } from "react";
import WorkspaceLayout from "@/components/workspace/workspace-layout";
import { Plus, FolderKanban, Users, MoveVertical as MoreVertical, Settings, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { createWorkspace, deleteWorkspace, updateWorkspace } from "@/lib/actions/workspace";
import { toast } from "sonner";

interface Workspace {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  owner_id: string;
  created_at: string;
}

interface WorkspacesClientProps {
  initialWorkspaces: Workspace[];
}

export default function WorkspacesClient({ initialWorkspaces }: WorkspacesClientProps) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(initialWorkspaces);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    if (!newName.trim()) {
      toast.error("Workspace name is required");
      return;
    }

    setCreating(true);
    const result = await createWorkspace(newName.trim(), newDescription.trim());

    if (result.workspace) {
      setWorkspaces([result.workspace as Workspace, ...workspaces]);
      setShowCreateModal(false);
      setNewName("");
      setNewDescription("");
      toast.success("Workspace created successfully");
    } else if (result.error) {
      toast.error(result.error);
    }

    setCreating(false);
  };

  const handleDelete = async (id: string) => {
    setWorkspaces(workspaces.filter((w) => w.id !== id));
    const result = await deleteWorkspace(id);
    if (result.error) {
      toast.error(result.error);
    }
  };

  return (
    <WorkspaceLayout>
      <div className="min-h-screen bg-[#050816] p-6 md:p-10">
        <div className="mb-10 flex items-start justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Organization</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white">Workspaces</h1>
            <p className="mt-3 max-w-2xl text-white/50">
              Create and manage teams, projects, and shared environments for collaboration.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-[1.02]"
          >
            <Plus size={18} />
            New Workspace
          </button>
        </div>

        {workspaces.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03] py-20">
            <FolderKanban size={48} className="text-white/20" />
            <p className="mt-4 text-lg text-white/40">No workspaces yet</p>
            <p className="mt-2 text-sm text-white/30">
              Create your first workspace to start collaborating
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="mt-6 rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-[1.02]"
            >
              Create Your First Workspace
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {workspaces.map((ws) => (
              <div
                key={ws.id}
                className="group relative rounded-[32px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-3xl transition hover:border-cyan-500/40 hover:bg-white/[0.06]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-2xl">
                      {ws.icon || "📁"}
                    </div>
                    <div>
                      <Link
                        href={`/workspaces/${ws.id}`}
                        className="text-lg font-semibold text-white hover:text-cyan-300 transition"
                      >
                        {ws.name}
                      </Link>
                      <p className="mt-1 text-sm text-white/50">
                        {ws.description || "AI Collaborative Workspace"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                    <Link
                      href={`/workspaces/${ws.id}`}
                      className="rounded-lg p-2 text-white/40 hover:bg-white/10 hover:text-white"
                    >
                      <Settings size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(ws.id)}
                      className="rounded-lg p-2 text-white/40 hover:bg-white/10 hover:text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-white/40" />
                    <span className="text-sm text-white/60">
                      {ws.owner_id === "current" ? "1 member" : "Team workspace"}
                    </span>
                  </div>

                  <span className="rounded-lg bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400">
                    Active
                  </span>
                </div>
              </div>
            ))}

            {/* Create New Card */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="group flex flex-col items-center justify-center rounded-[32px] border border-dashed border-white/20 bg-white/[0.01] p-6 transition hover:border-cyan-500/40 hover:bg-white/[0.03]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-2xl">
                <Plus size={32} className="text-white/40 group-hover:text-white/60" />
              </div>
              <p className="mt-4 text-lg font-semibold text-white/60 group-hover:text-white">
                New Workspace
              </p>
              <p className="mt-2 text-sm text-white/40">Create a new environment</p>
            </button>
          </div>
        )}

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0B1120] p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-white">Create Workspace</h2>
                <p className="mt-2 text-sm text-white/60">
                  Workspaces are home for your team's projects and documents
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-white/60">Name</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="My Awesome Workspace"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-cyan-500"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/60">
                    Description (optional)
                  </label>
                  <textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="What's this workspace about?"
                    rows={3}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-medium text-white transition hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  disabled={creating || !newName.trim()}
                  className="flex-1 rounded-xl bg-white px-4 py-3 font-medium text-black transition hover:scale-[1.02] disabled:opacity-50"
                >
                  {creating ? "Creating..." : "Create Workspace"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </WorkspaceLayout>
  );
}
