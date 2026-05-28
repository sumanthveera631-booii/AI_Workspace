import { redirect } from "next/navigation";
import { getWorkspace, getWorkspaceMembers } from "@/lib/actions/workspace";
import { getDocuments } from "@/lib/actions/documents";
import { getTasks } from "@/lib/actions/tasks";
import WorkspaceLayout from "@/components/workspace/workspace-layout";
import Link from "next/link";
import {
  FolderKanban,
  FileText,
  CheckSquare,
  Users,
  Plus,
  ArrowLeft,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";

interface WorkspacePageProps {
  params: any;
}

export default async function WorkspaceDetailPage({ params }: WorkspacePageProps) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  if (!id) {
    redirect("/workspaces");
  }

  // Fetch workspace details
  const { workspace, error } = await getWorkspace(id);

  if (error || !workspace) {
    redirect("/workspaces");
  }

  // Fetch workspace-specific data
  const [documentsResult, tasksResult, membersResult] = await Promise.all([
    getDocuments(id),
    getTasks(id),
    getWorkspaceMembers(id),
  ]);

  const documents = documentsResult.documents || [];
  const tasks = tasksResult.tasks || [];
  const members = membersResult.members || [];

  return (
    <WorkspaceLayout>
      <div className="relative min-h-screen overflow-hidden bg-[#050816] p-6 md:p-10">
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.08),transparent_50%)]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Back link */}
          <Link
            href="/workspaces"
            className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white mb-8 group"
          >
            <ArrowLeft size={16} className="transition group-hover:-translate-x-1" />
            Back to Workspaces
          </Link>

          {/* Header section */}
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-white/[0.04] pb-10">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30 text-4xl shadow-[0_0_30px_rgba(99,102,241,0.15)] animate-[pulse_3s_infinite]">
                {workspace.icon || "📁"}
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
                  Workspace
                </p>
                <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white">
                  {workspace.name}
                </h1>
                <p className="mt-2 text-white/60">
                  {workspace.description || "AI Collaborative Workspace"}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/editor?workspaceId=${id}`}
                className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              >
                <Plus size={16} />
                New Document
              </Link>
            </div>
          </div>

          {/* Dashboard grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Documents column */}
            <div className="rounded-[32px] border border-white/10 bg-white/[0.02] p-6 backdrop-blur-3xl">
              <div className="mb-6 flex items-center justify-between border-b border-white/[0.05] pb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-cyan-500/10 p-2 text-cyan-400">
                    <FileText size={20} />
                  </div>
                  <h2 className="text-lg font-medium text-white">Documents</h2>
                </div>
                <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-white/40">
                  {documents.length}
                </span>
              </div>

              {documents.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <FileText size={32} className="text-white/10 mb-3" />
                  <p className="text-sm text-white/40">No documents yet</p>
                  <p className="mt-1 text-xs text-white/30">Create a document to start writing</p>
                  <Link
                    href={`/editor?workspaceId=${id}`}
                    className="mt-4 text-xs font-semibold text-cyan-400 hover:underline"
                  >
                    Create first document
                  </Link>
                </div>
              ) : (
                <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
                  {documents.map((doc: any) => (
                    <Link
                      key={doc.id}
                      href={`/editor?doc=${doc.id}`}
                      className="group flex items-center justify-between rounded-2xl bg-white/[0.02] p-4 border border-white/[0.03] transition hover:border-cyan-500/30 hover:bg-white/[0.04]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{doc.emoji || "📝"}</span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-white truncate group-hover:text-cyan-300 transition">
                            {doc.title}
                          </p>
                          <p className="mt-0.5 text-2xs text-white/40">
                            By {doc.author?.name || "Member"}
                          </p>
                        </div>
                      </div>
                      <span className="rounded-lg bg-white/5 px-2 py-0.5 text-3xs font-medium text-white/50 uppercase">
                        {doc.status}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Tasks column */}
            <div className="rounded-[32px] border border-white/10 bg-white/[0.02] p-6 backdrop-blur-3xl">
              <div className="mb-6 flex items-center justify-between border-b border-white/[0.05] pb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-violet-500/10 p-2 text-violet-400">
                    <CheckSquare size={20} />
                  </div>
                  <h2 className="text-lg font-medium text-white">Tasks</h2>
                </div>
                <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-white/40">
                  {tasks.length}
                </span>
              </div>

              {tasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckSquare size={32} className="text-white/10 mb-3" />
                  <p className="text-sm text-white/40">All caught up!</p>
                  <p className="mt-1 text-xs text-white/30">No tasks currently defined</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
                  {tasks.map((task: any) => (
                    <div
                      key={task.id}
                      className="group flex flex-col rounded-2xl bg-white/[0.02] p-4 border border-white/[0.03] transition hover:border-violet-500/30 hover:bg-white/[0.04]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-white line-clamp-2">
                          {task.title}
                        </p>
                        <span
                          className={`rounded-lg px-2 py-0.5 text-3xs font-medium uppercase ${
                            task.status === "done"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : task.status === "in_progress"
                              ? "bg-amber-500/10 text-amber-400"
                              : "bg-white/5 text-white/40"
                          }`}
                        >
                          {task.status.replace("_", " ")}
                        </span>
                      </div>

                      {task.due_date && (
                        <div className="mt-3 flex items-center gap-1.5 text-3xs text-white/40">
                          <Calendar size={12} />
                          <span>
                            Due {new Date(task.due_date).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Team Members column */}
            <div className="rounded-[32px] border border-white/10 bg-white/[0.02] p-6 backdrop-blur-3xl">
              <div className="mb-6 flex items-center justify-between border-b border-white/[0.05] pb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-pink-500/10 p-2 text-pink-400">
                    <Users size={20} />
                  </div>
                  <h2 className="text-lg font-medium text-white">Team</h2>
                </div>
                <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-white/40">
                  {members.length}
                </span>
              </div>

              <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
                {members.map((member: any) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between rounded-2xl bg-white/[0.01] p-3 border border-white/[0.02]"
                  >
                    <div className="flex items-center gap-3">
                      {member.user?.avatar_url ? (
                        <img
                          src={member.user.avatar_url}
                          alt={member.user.name || "Member"}
                          loading="lazy"
                          decoding="async"
                          className="h-9 w-9 rounded-full border border-white/10"
                        />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 text-xs font-bold text-white uppercase">
                          {(member.user?.name || "M").charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {member.user?.name || "Team Member"}
                        </p>
                        <p className="text-3xs text-white/40 truncate max-w-[150px]">
                          {member.user?.email}
                        </p>
                      </div>
                    </div>

                    <span className="rounded-lg bg-pink-500/10 px-2.5 py-1 text-3xs font-medium text-pink-400 capitalize">
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
