"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getWorkspaces() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { workspaces: [] };
  }

  const { data: workspaces } = await supabase
    .from("workspaces")
    .select(
      `
      *,
      owner:profiles!workspaces_owner_id_fkey(name, email, avatar_url)
    `
    )
    .or(`owner_id.eq.${user.id},id.in.(select workspace_id from workspace_members where user_id=${user.id})`)
    .order("created_at", { ascending: false });

  return { workspaces: workspaces || [] };
}

export async function createWorkspace(name: string, description?: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const { data: workspace, error } = await supabase
    .from("workspaces")
    .insert({
      name,
      description,
      owner_id: user.id,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  // Add owner as a member
  await supabase.from("workspace_members").insert({
    workspace_id: workspace.id,
    user_id: user.id,
    role: "owner",
  });

  // Create activity
  await supabase.from("activities").insert({
    user_id: user.id,
    workspace_id: workspace.id,
    action: `created workspace "${name}"`,
    entity_type: "workspace",
    entity_id: workspace.id,
  });

  revalidatePath("/dashboard");
  revalidatePath("/workspaces");
  return { workspace };
}

export async function updateWorkspace(
  workspaceId: string,
  data: { name?: string; description?: string }
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("workspaces")
    .update(data)
    .eq("id", workspaceId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  revalidatePath("/workspaces");
  return { success: true };
}

export async function deleteWorkspace(workspaceId: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("workspaces").delete().eq("id", workspaceId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  revalidatePath("/workspaces");
  return { success: true };
}

export async function getWorkspaceMembers(workspaceId: string) {
  const supabase = await createClient();

  const { data: members } = await supabase
    .from("workspace_members")
    .select(
      `
      *,
      user:profiles(name, email, avatar_url)
    `
    )
    .eq("workspace_id", workspaceId);

  return { members: members || [] };
}

export async function addWorkspaceMember(
  workspaceId: string,
  email: string,
  role: "admin" | "member" = "member"
) {
  const supabase = await createClient();

  // Find user by email
  const { data: profile } = await supabase
    .from("profiles")
    .select("user_id")
    .eq("email", email)
    .single();

  if (!profile) {
    return { error: "User not found" };
  }

  const { error } = await supabase.from("workspace_members").insert({
    workspace_id: workspaceId,
    user_id: profile.user_id,
    role,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/workspaces");
  return { success: true };
}
