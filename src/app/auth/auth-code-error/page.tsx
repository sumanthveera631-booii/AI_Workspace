"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AlertCircle, Settings, MessageSquare } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AuthCodeErrorPage() {
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [errorDescription, setErrorDescription] = useState<string | null>(null);
  const [origin, setOrigin] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setError(params.get("error"));
    setErrorCode(params.get("error_code"));
    setErrorDescription(params.get("error_description"));
    setOrigin(window.location.origin);
  }, []);

  const getErrorMessage = () => {
    if (errorCode === "provider_disabled" || errorDescription?.includes("not enabled")) {
      return {
        title: "Provider Not Configured",
        message:
          "This sign-in method hasn't been enabled yet. Your administrator needs to set up Google or GitHub authentication in the dashboard.",
        action: "Contact your administrator or try email sign-in",
        code: "PROVIDER_DISABLED",
      };
    }

    if (errorCode === "otp_expired" || errorDescription?.includes("expired")) {
      return {
        title: "Link Expired",
        message: "This authentication link has expired. Please request a new one.",
        action: "Try signing in again",
        code: "OTP_EXPIRED",
      };
    }

    if (error === "access_denied") {
      return {
        title: "Access Denied",
        message: "You cancelled the authentication process or denied the necessary permissions.",
        action: "Try again when you're ready",
        code: "ACCESS_DENIED",
      };
    }

    return {
      title: "Authentication Error",
      message: errorDescription || "Something went wrong during authentication. Please try again.",
      action: "Return to login and try again",
      code: errorCode || "UNKNOWN_ERROR",
    };
  };

  const { title, message, action, code } = getErrorMessage();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_40%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-border bg-popover/70 p-8 backdrop-blur-2xl"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="rounded-full bg-red-500/20 border border-red-500/30 p-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-foreground mb-3">{title}</h1>
          <p className="text-muted text-sm leading-relaxed mb-4">{message}</p>

          {code === "PROVIDER_DISABLED" && (
            <div className="mt-6 rounded-xl bg-blue-500/10 border border-blue-500/20 p-4 text-left">
              <h3 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Setup Required in Supabase
              </h3>
              <ol className="space-y-2 text-xs text-blue-300">
                <li>1. Go to your Supabase project dashboard</li>
                <li>2. Navigate to Authentication → Providers</li>
                <li>3. Enable Google or GitHub provider</li>
                <li>4. Add your OAuth credentials (Client ID & Secret)</li>
                <li>5. Set the Redirect URL to: <code className="bg-black/30 px-2 py-1 rounded">{origin ? `${origin}/auth/callback` : "https://your-domain.com/auth/callback"}</code></li>
              </ol>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <button
            onClick={() => window.history.back()}
            className="w-full rounded-2xl bg-foreground/10 border border-border hover:bg-foreground/20 py-3 font-medium text-foreground transition-all duration-300"
          >
            ← Go Back
          </button>

          <Link
            href="/login"
            className="block w-full rounded-2xl bg-primary py-3 font-medium text-primary-foreground text-center transition-all duration-300 hover:scale-[1.02]"
          >
            Try Email Sign-In
          </Link>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-foreground/5 border border-border">
          <p className="text-xs text-muted mb-2 flex items-center gap-2">
            <MessageSquare className="h-3 w-3" />
            Error Code: {code}
          </p>
          {errorDescription && (
            <p className="text-xs text-muted/70 break-words">{errorDescription}</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
