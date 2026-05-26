import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getWorkspaces } from "@/lib/actions/workspace";
import WorkspacesClient from "./workspaces-client";

export default async function WorkspacesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { workspaces } = await getWorkspaces();

  return <WorkspacesClient initialWorkspaces={workspaces || []} />;
}