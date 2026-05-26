import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getWorkspaces } from "@/lib/actions/workspace";
import { getTasks } from "@/lib/actions/tasks";
import { getDocuments } from "@/lib/actions/documents";
import { getActivities } from "@/lib/actions/profile";
import DashboardClient from "@/components/dashboard/dashboard-client";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  // Fetch initial data
  const [workspacesResult, tasksResult, documentsResult, activitiesResult] = await Promise.all([
    getWorkspaces(),
    getTasks(),
    getDocuments(),
    getActivities(),
  ]);

  return (
    <DashboardClient
      user={{
        id: user.id,
        name: profile?.name || user.user_metadata?.name || "User",
        email: profile?.email || user.email || "",
        image: profile?.avatar_url || user.user_metadata?.avatar_url || "",
      }}
      initialWorkspaces={workspacesResult.workspaces}
      initialTasks={tasksResult.tasks}
      initialDocuments={documentsResult.documents}
      initialActivities={activitiesResult.activities}
    />
  );
}