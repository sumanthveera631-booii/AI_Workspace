"use client";

import BackgroundBlobs from "./background-blobs";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070B14] px-6">
      <BackgroundBlobs />

      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  );
}