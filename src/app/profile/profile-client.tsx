"use client";

import { useState } from "react";
import WorkspaceLayout from "@/components/workspace/workspace-layout";
import { Calendar, FileText, FolderKanban, CircleCheck as CheckCircle2, CreditCard as Edit3 } from "lucide-react";
import Link from "next/link";
import { updateProfile } from "@/lib/actions/profile";
import { toast } from "sonner";

interface ProfileClientProps {
  user: {
    id: string;
    email: string;
    name: string;
    avatar_url: string | null;
    bio: string | null;
    created_at: string;
  };
  stats: {
    workspaces: number;
    documents: number;
    tasks: number;
  };
}

export default function ProfileClient({ user: initialUser, stats }: ProfileClientProps) {
  const [user, setUser] = useState(initialUser);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const result = await updateProfile({
      name: user.name,
      bio: user.bio || undefined,
    });

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Profile updated");
      setEditing(false);
    }
    setSaving(false);
  };

  return (
    <WorkspaceLayout>
      <div className="min-h-screen bg-[#050816] p-6 md:p-10">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Account</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white">Profile</h1>
          </div>

          {/* Profile Card */}
          <div className="rounded-[32px] border border-white/[0.05] bg-white/[0.03] p-8 backdrop-blur-3xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-6">
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.name}
                    className="h-24 w-24 rounded-2xl border border-white/20"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-3xl font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="flex-1">
                  {editing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-lg font-semibold text-white outline-none"
                      />
                      <textarea
                        value={user.bio || ""}
                        onChange={(e) => setUser({ ...user, bio: e.target.value })}
                        placeholder="Add a bio..."
                        rows={2}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white outline-none"
                      />
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-semibold text-white">{user.name}</h2>
                      <p className="mt-1 text-white/50">{user.email}</p>
                      {user.bio && <p className="mt-2 text-sm text-white/70">{user.bio}</p>}
                    </>
                  )}
                </div>
              </div>

              {editing ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(false)}
                    className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:bg-white/[0.05]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:scale-[1.02] disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:bg-white/[0.05]"
                >
                  <Edit3 size={16} />
                  Edit
                </button>
              )}
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-6">
              <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-cyan-500/10 p-3">
                    <FolderKanban size={20} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.workspaces}</p>
                    <p className="text-xs text-white/50">Workspaces</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-500/10 p-3">
                    <FileText size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.documents}</p>
                    <p className="text-xs text-white/50">Documents</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-pink-500/10 p-3">
                    <CheckCircle2 size={20} className="text-pink-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.tasks}</p>
                    <p className="text-xs text-white/50">Active Tasks</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="mt-8 space-y-4 border-t border-white/[0.05] pt-8">
              <div className="flex items-center gap-3 text-sm">
                <Calendar size={16} className="text-white/40" />
                <span className="text-white/60">Member since</span>
                <span className="text-white">
                  {new Date(user.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Link
              href="/settings"
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-500/40 hover:bg-white/[0.06]"
            >
              <h3 className="font-semibold text-white group-hover:text-cyan-300 transition">
                Account Settings
              </h3>
              <p className="mt-2 text-sm text-white/50">Manage email, password, and preferences</p>
            </Link>

            <Link
              href="/documents"
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-blue-500/40 hover:bg-white/[0.06]"
            >
              <h3 className="font-semibold text-white group-hover:text-blue-300 transition">
                My Documents
              </h3>
              <p className="mt-2 text-sm text-white/50">View and manage all your documents</p>
            </Link>

            <Link
              href="/workspaces"
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-pink-500/40 hover:bg-white/[0.06]"
            >
              <h3 className="font-semibold text-white group-hover:text-pink-300 transition">
                Workspaces
              </h3>
              <p className="mt-2 text-sm text-white/50">Manage your workspaces and teams</p>
            </Link>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
