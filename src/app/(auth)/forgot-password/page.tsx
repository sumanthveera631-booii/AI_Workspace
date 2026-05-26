"use client";

import { useState } from "react";
import Link from "next/link";
import { resetPassword } from "@/lib/supabase/auth-actions";
import AuthLayout from "@/components/auth/auth-layout";
import AuthCard from "@/components/auth/auth-card";
import AuthButton from "@/components/auth/auth-button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    const result = await resetPassword(email);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <h1 className="text-4xl font-semibold text-white">Reset Password</h1>

        <p className="mt-3 text-white/50">We&apos;ll send you a reset link</p>

        {success ? (
          <div className="mt-8 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-4 text-sm text-emerald-400">
            Check your email for a password reset link
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-white/[0.05] bg-white/[0.03] px-5 py-4 text-white outline-none backdrop-blur-xl transition placeholder:text-white/30 focus:border-cyan-500/40"
              required
            />

            {error && (
              <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-white py-4 font-medium text-black transition hover:scale-[1.02] disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm text-white/50 transition hover:text-white"
          >
            Back to login
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}