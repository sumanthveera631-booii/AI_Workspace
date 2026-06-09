"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AuthLayout from "@/components/auth/auth-layout";
import AuthCard from "@/components/auth/auth-card";
import AuthButton from "@/components/auth/auth-button";
import { UserPlus, Sparkles, MailOpen } from "lucide-react";

export default function InvitePage() {
  const router = useRouter();
  const [isAccepting, setIsAccepting] = useState(false);

  const handleAccept = () => {
    setIsAccepting(true);
    toast.loading("Synchronizing secure team keys...");

    setTimeout(() => {
      toast.dismiss();
      toast.success("Successfully joined the Nexus AI workspace team!");
      router.push("/signup");
    }, 1500);
  };

  return (
    <AuthLayout>
      <AuthCard>
        <div className="mb-6 flex items-center gap-4 border-b border-white/[0.04] pb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 shadow-lg text-white font-bold text-lg animate-pulse">
            N
          </div>

          <div>
            <h2 className="text-base font-bold text-white">
              Nexus Alpha Team
            </h2>

            <p className="text-3xs uppercase tracking-[0.22em] text-cyan-400 mt-0.5">
              Workspace Invitation
            </p>
          </div>
        </div>

        <h1 className="text-3xl font-semibold text-white">
          You&apos;re Invited
        </h1>

        <p className="mt-3 text-white/50 text-sm leading-relaxed">
          Sarah has invited you to collaborate inside the premium Nexus AI neural operating system.
        </p>

        {/* TEAM MEMBER COUNT PREVIEW */}
        <div className="mt-6 flex items-center gap-2.5 rounded-2xl bg-white/[0.02] p-4 text-xs border border-white/[0.04]">
          <MailOpen className="h-5 w-5 text-violet-400 shrink-0" />
          <span className="text-white/60">
            Accepting will grant immediate access to 4 collaborative folders.
          </span>
        </div>

        <div className="mt-8">
          <AuthButton onClick={handleAccept} disabled={isAccepting}>
            {isAccepting ? "Configuring Access Profiles..." : "Accept Secure Invitation"}
          </AuthButton>
        </div>

        <div className="mt-6 text-center text-3xs uppercase tracking-[0.1em] text-white/30">
          Invitation expires in 7 days
        </div>
      </AuthCard>
    </AuthLayout>
  );
}