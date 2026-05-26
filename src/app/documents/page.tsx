import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getDocuments } from "@/lib/actions/documents";
import DocumentsClient from "./documents-client";

export default async function DocumentsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { documents } = await getDocuments();

  return <DocumentsClient initialDocuments={documents || []} />;
}