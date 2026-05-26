import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getWorkspaces } from "@/lib/actions/workspace";
import { getDocuments } from "@/lib/actions/documents";
import { getTasks } from "@/lib/actions/tasks";
import ProfileClient from "./profile-client";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const [workspacesResult, documentsResult, tasksResult] = await Promise.all([
    getWorkspaces(),
    getDocuments(),
    getTasks(),
  ]);

  return (
    <ProfileClient
      user={{
        id: user.id,
        email: user.email || "",
        name: profile?.name || user.user_metadata?.name || "",
        avatar_url: profile?.avatar_url || user.user_metadata?.avatar_url || "",
        bio: profile?.bio || "",
        created_at: profile?.created_at || user.created_at || "",
      }}
      stats={{
        workspaces: workspacesResult.workspaces.length,
        documents: documentsResult.documents.length,
        tasks: tasksResult.tasks.filter((t: any) => t.status !== "done").length,
      }}
    />
  );
}