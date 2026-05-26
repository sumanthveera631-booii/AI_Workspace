"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getTasks(workspaceId?: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { tasks: [] };
  }

  let query = supabase
    .from("tasks")
    .select(
      `
      *,
      user:profiles(name, email, avatar_url)
    `
    )
    .order("created_at", { ascending: false });

  if (workspaceId) {
    query = query.eq("workspace_id", workspaceId);
  } else {
    query = query.eq("user_id", user.id);
  }

  const { data: tasks } = await query;

  return { tasks: tasks || [] };
}

export async function createTask(data: {
  title: string;
  description?: string;
  workspaceId?: string;
  dueDate?: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const { data: task, error } = await supabase
    .from("tasks")
    .insert({
      title: data.title,
      description: data.description,
      workspace_id: data.workspaceId,
      user_id: user.id,
      due_date: data.dueDate,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { task };
}

export async function updateTask(
  taskId: string,
  data: {
    title?: string;
    description?: string;
    status?: "todo" | "in_progress" | "done";
    due_date?: string;
  }
) {
  const supabase = await createClient();

  const { error } = await supabase.from("tasks").update(data).eq("id", taskId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteTask(taskId: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("tasks").delete().eq("id", taskId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
