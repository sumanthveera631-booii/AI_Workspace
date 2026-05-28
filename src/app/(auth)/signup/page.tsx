"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signUp } from "@/lib/supabase/auth-actions";
import { createClient } from "@/lib/supabase/client";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";
  const passwordParam = searchParams.get("password") || "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState(emailParam);
  const [password, setPassword] = useState(passwordParam);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [signedOut, setSignedOut] = useState(false);

  useEffect(() => {
    if (emailParam) setEmail(emailParam);
    if (passwordParam) setPassword(passwordParam);
  }, [emailParam, passwordParam]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const result = await signUp(email, password, name);

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      if (result.session) {
        router.push("/dashboard");
        router.refresh();
      } else {
        router.push("/login?message=Account created successfully! Please sign in.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
      setLoading(false);
    }
  }

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session || null);
    });
  }, [signedOut]);

  const handleGoogleSignIn = async () => {
    setError("");
    const supabase = createClient();
    await supabase.auth.signOut();
    setSignedOut(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            prompt: "select_account",
            access_type: "offline",
          },
        },
      });

      if (error) {
        if (error.message.toLowerCase().includes("not enabled") || error.message.toLowerCase().includes("unsupported")) {
          setError(
            "Google Sign-In isn't enabled yet. Your administrator needs to set it up. Try creating an account with email instead."
          );
        } else {
          setError(error.message || "Unable to sign in with Google. Please try again.");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Unable to sign in with Google. Please check your connection and try again.");
    }
  };

  const handleGitHubSignIn = async () => {
    setError("");
    const supabase = createClient();
    await supabase.auth.signOut();
    setSignedOut(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            allow_signup: "true",
          },
        },
      });

      if (error) {
        if (error.message.toLowerCase().includes("not enabled") || error.message.toLowerCase().includes("unsupported")) {
          setError(
            "GitHub Sign-In isn't enabled yet. Your administrator needs to set it up. Try creating an account with email instead."
          );
        } else {
          setError(error.message || "Unable to sign in with GitHub. Please try again.");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Unable to sign in with GitHub. Please check your connection and try again.");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_40%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl"
      >
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            AI Workspace
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-white">
            Create account
          </h1>
          <p className="mt-2 text-white/40">Join AI Workspace</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition focus:border-cyan-500"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition focus:border-cyan-500"
            required
          />

          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition focus:border-cyan-500"
            required
            minLength={6}
          />

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {session?.user && (
            <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-100">
              <p>
                You are currently signed in as <strong>{session.user.email}</strong>.
                Please log out if you want to create a different account.
              </p>
              <button
                type="button"
                onClick={async () => {
                  const supabase = createClient();
                  await supabase.auth.signOut();
                  setSession(null);
                  setSignedOut(true);
                }}
                className="mt-3 inline-flex rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-white/90"
              >
                Log out current session
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-white py-3 font-medium text-black transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-white/30">OR CONTINUE WITH</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] py-3 text-white transition-all duration-300 hover:bg-white/[0.06]"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.27H2.18C1.43 8.99 1 10.85 1 13s.43 4.01 1.18 5.73l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.27l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <button
            type="button"
            onClick={handleGitHubSignIn}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] py-3 text-white transition-all duration-300 hover:bg-white/[0.06]"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Continue with GitHub
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-white/40">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-400 transition hover:text-cyan-300">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#050816]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        </div>
      }
    >
      <SignupForm />
    </Suspense>
  );
}