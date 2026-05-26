import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SettingsClient from "./settings-client";

export default async function SettingsPage() {
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

  return (
    <SettingsClient
      user={{
        id: user.id,
        email: user.email || "",
        name: profile?.name || user.user_metadata?.name || "",
        avatar_url: profile?.avatar_url || user.user_metadata?.avatar_url || "",
        bio: profile?.bio || "",
      }}
    />
  );
}
