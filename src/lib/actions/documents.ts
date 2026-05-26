"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getDocuments(workspaceId?: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { documents: [] };
  }

  let query = supabase
    .from("documents")
    .select(
      `
      *,
      author:profiles(name, email, avatar_url),
      workspace:workspaces(name)
    `
    )
    .order("updated_at", { ascending: false });

  if (workspaceId) {
    query = query.eq("workspace_id", workspaceId);
  }

  const { data: documents } = await query;

  return { documents: documents || [] };
}

export async function getDocument(documentId: string) {
  const supabase = await createClient();

  const { data: document } = await supabase
    .from("documents")
    .select(
      `
      *,
      author:profiles(name, email, avatar_url),
      workspace:workspaces(name),
      blocks:document_blocks(*)
    `
    )
    .eq("id", documentId)
    .single();

  return { document };
}

export async function createDocument(data: {
  title: string;
  content?: string;
  workspaceId?: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const { data: document, error } = await supabase
    .from("documents")
    .insert({
      title: data.title,
      content: data.content || "",
      workspace_id: data.workspaceId,
      author_id: user.id,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/documents");
  revalidatePath("/editor");
  return { document };
}

export async function updateDocument(
  documentId: string,
  data: {
    title?: string;
    content?: string;
    status?: "draft" | "published" | "archived";
    is_favorite?: boolean;
  }
) {
  const supabase = await createClient();

  const { error } = await supabase.from("documents").update(data).eq("id", documentId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/documents");
  revalidatePath("/editor");
  return { success: true };
}

export async function deleteDocument(documentId: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("documents").delete().eq("id", documentId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/documents");
  revalidatePath("/editor");
  return { success: true };
}
