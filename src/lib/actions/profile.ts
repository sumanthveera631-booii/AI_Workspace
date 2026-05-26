"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { profile: null };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return { profile };
}

export async function updateProfile(data: { name?: string; bio?: string; avatar_url?: string }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase.from("profiles").update(data).eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/profile");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function getNotifications() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { notifications: [] };
  }

  const { data: notifications } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  return { notifications: notifications || [] };
}

export async function markNotificationAsRead(notificationId: string) {
  const supabase = await createClient();

  await supabase.from("notifications").update({ is_read: true }).eq("id", notificationId);

  revalidatePath("/dashboard");
  return { success: true };
}

export async function getActivities(workspaceId?: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { activities: [] };
  }

  let query = supabase
    .from("activities")
    .select(
      `
      *,
      user:profiles(name, email, avatar_url)
    `
    )
    .order("created_at", { ascending: false })
    .limit(20);

  if (workspaceId) {
    query = query.eq("workspace_id", workspaceId);
  }

  const { data: activities } = await query;

  return { activities: activities || [] };
}
