"use client";

import { useRouter } from "next/navigation";

export default function ProfileAvatar({
  email,
}: {
  email?: string;
}) {
  const router = useRouter();

  const initial = email?.[0]?.toUpperCase() || "U";

  return (
    <button
      onClick={() => router.push("/profile")}
      className="
        flex h-11 w-11 items-center justify-center
        rounded-full bg-gradient-to-br from-violet-500 to-cyan-500
        text-white font-semibold
        cursor-pointer
      "
    >
      {initial}
    </button>
  );
}