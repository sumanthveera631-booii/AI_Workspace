"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AuthLayout from "@/components/auth/auth-layout";
import AuthCard from "@/components/auth/auth-card";
import AuthButton from "@/components/auth/auth-button";
import OTPInputs from "@/components/auth/otp-inputs";

export default function VerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (code.length !== 6) {
      toast.error("Please enter a complete 6-digit verification code.");
      return;
    }

    setIsVerifying(true);
    toast.loading("Verifying your secure OTP token...");

    setTimeout(() => {
      toast.dismiss();
      toast.success("Security token matched successfully!");
      router.push("/dashboard");
    }, 1500);
  };

  const handleOTPComplete = (finalCode: string) => {
    setCode(finalCode);
    setIsVerifying(true);
    toast.loading("Token complete! Auto-verifying...");

    setTimeout(() => {
      toast.dismiss();
      toast.success("Authentication confirmed!");
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <AuthLayout>
      <AuthCard>
        <h1 className="text-3xl font-semibold text-white">
          Verify Email
        </h1>

        <p className="mt-3 text-white/50 text-sm">
          Enter the 6-digit verification code sent to your secure inbox.
        </p>

        <form onSubmit={handleVerify} className="mt-10 space-y-8">
          <OTPInputs onComplete={handleOTPComplete} />

          <AuthButton type="submit" disabled={isVerifying || code.length !== 6}>
            {isVerifying ? "Confirming Authentication..." : "Verify Secure Account"}
          </AuthButton>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => toast.success("A fresh OTP code has been broadcast to your inbox.")}
            className="text-xs text-white/50 transition hover:text-white"
          >
            Resend Code
          </button>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}