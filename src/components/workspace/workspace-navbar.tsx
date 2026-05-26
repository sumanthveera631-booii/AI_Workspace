"use client";
import ProfileAvatar from "@/components/ui/profile-avatar";
import {
  Bell,
  Search,
  Command,
} from "lucide-react";

export default function WorkspaceNavbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex h-[72px] items-center justify-between border-b border-white/[0.04] bg-black/20 px-6 backdrop-blur-3xl">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 rounded-2xl bg-white/[0.03] px-4 py-3">
          <Search className="h-4 w-4 text-white/40" />

          <input
            placeholder="Search workspace..."
            className="bg-transparent text-sm outline-none placeholder:text-white/30"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        

        

        <ProfileAvatar email="user@example.com" />
      </div>
    </header>
  );
}