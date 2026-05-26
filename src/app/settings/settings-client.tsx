"use client";

import { useState } from "react";
import WorkspaceLayout from "@/components/workspace/workspace-layout";
import {
  Palette,
  BrainCog,
  ShieldCheck,
  Bell,
  Database,
  Keyboard,
  Globe,
  Save,
  Monitor,
  Moon,
  Sun,
} from "lucide-react";
import { updateProfile } from "@/lib/actions/profile";
import { toast } from "sonner";

interface SettingsClientProps {
  user: {
    id: string;
    email: string;
    name: string;
    avatar_url: string | null;
    bio: string | null;
  };
}

const tabs = [
  { id: "profile", label: "Profile", icon: Database },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "ai", label: "AI Preferences", icon: BrainCog },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "shortcuts", label: "Shortcuts", icon: Keyboard },
];

export default function SettingsClient({ user: initialUser }: SettingsClientProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(initialUser);
  const [saving, setSaving] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weekly: false,
  });

  const handleSaveProfile = async () => {
    setSaving(true);
    const result = await updateProfile({
      name: user.name,
      bio: user.bio || undefined,
      avatar_url: user.avatar_url || undefined,
    });

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Settings saved");
    }
    setSaving(false);
  };

  return (
    <WorkspaceLayout>
      <div className="min-h-screen bg-[#050816]">
        <div className="border-b border-white/[0.04] bg-black/20 backdrop-blur-3xl px-6 py-6 md:px-10">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Configuration</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white">Settings</h1>
          <p className="mt-3 max-w-2xl text-white/50">
            Manage your workspace preferences, AI settings, notifications, and security.
          </p>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden w-64 shrink-0 border-r border-white/[0.04] bg-black/10 md:block">
            <div className="p-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                      activeTab === tab.id
                        ? "bg-white/[0.06] text-white"
                        : "text-white/60 hover:bg-white/[0.03] hover:text-white"
                    }`}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 p-6 md:p-10">
            {activeTab === "profile" && (
              <div className="max-w-2xl space-y-6">
                <div className="rounded-[32px] border border-white/[0.05] bg-white/[0.03] p-6">
                  <h2 className="mb-6 text-lg font-semibold text-white">Profile Information</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="mb-2 block text-sm text-white/60">Name</label>
                      <input
                        type="text"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-white/60">Email</label>
                      <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-white/[0.01] px-4 py-3 text-white/40 outline-none"
                      />
                      <p className="mt-2 text-xs text-white/40">Email cannot be changed</p>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-white/60">Bio</label>
                      <textarea
                        value={user.bio || ""}
                        onChange={(e) => setUser({ ...user, bio: e.target.value })}
                        rows={4}
                        placeholder="Tell us about yourself..."
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-white/60">Avatar URL</label>
                      <input
                        type="url"
                        value={user.avatar_url || ""}
                        onChange={(e) => setUser({ ...user, avatar_url: e.target.value })}
                        placeholder="https://example.com/avatar.jpg"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition focus:border-cyan-500"
                      />
                    </div>

                    <button
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:scale-[1.02] disabled:opacity-50"
                    >
                      <Save size={18} />
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="max-w-2xl space-y-6">
                <div className="rounded-[32px] border border-white/[0.05] bg-white/[0.03] p-6">
                  <h2 className="mb-6 text-lg font-semibold text-white">Theme</h2>

                  <div className="grid gap-4 md:grid-cols-3">
                    <button
                      onClick={() => setTheme("light")}
                      className={`flex flex-col items-center gap-3 rounded-xl border p-6 transition ${
                        theme === "light"
                          ? "border-cyan-500 bg-cyan-500/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <Sun size={24} className="text-white" />
                      <span className="text-sm text-white">Light</span>
                    </button>

                    <button
                      onClick={() => setTheme("dark")}
                      className={`flex flex-col items-center gap-3 rounded-xl border p-6 transition ${
                        theme === "dark"
                          ? "border-cyan-500 bg-cyan-500/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <Moon size={24} className="text-white" />
                      <span className="text-sm text-white">Dark</span>
                    </button>

                    <button
                      onClick={() => setTheme("system")}
                      className={`flex flex-col items-center gap-3 rounded-xl border p-6 transition ${
                        theme === "system"
                          ? "border-cyan-500 bg-cyan-500/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <Monitor size={24} className="text-white" />
                      <span className="text-sm text-white">System</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "ai" && (
              <div className="max-w-2xl space-y-6">
                <div className="rounded-[32px] border border-white/[0.05] bg-white/[0.03] p-6">
                  <h2 className="mb-6 text-lg font-semibold text-white">AI Configuration</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="mb-2 block text-sm text-white/60">Default Model</label>
                      <select className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none">
                        <option>GPT-4 Turbo</option>
                        <option>GPT-4</option>
                        <option>Claude 3 Opus</option>
                        <option>Claude 3 Sonnet</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-white/60">Response Style</label>
                      <select className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none">
                        <option>Professional</option>
                        <option>Casual</option>
                        <option>Technical</option>
                        <option>Creative</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.01] px-4 py-4">
                      <div>
                        <p className="text-sm font-medium text-white">Enable Memory</p>
                        <p className="text-xs text-white/40">AI remembers past conversations</p>
                      </div>
                      <div className="h-6 w-11 rounded-full bg-cyan-500 p-0.5">
                        <div className="h-5 w-5 rounded-full bg-white shadow transition" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="max-w-2xl space-y-6">
                <div className="rounded-[32px] border border-white/[0.05] bg-white/[0.03] p-6">
                  <h2 className="mb-6 text-lg font-semibold text-white">Notification Preferences</h2>

                  <div className="space-y-4">
                    {[
                      { key: "email", label: "Email Notifications", desc: "Receive email updates" },
                      { key: "push", label: "Push Notifications", desc: "Browser push notifications" },
                      { key: "weekly", label: "Weekly Digest", desc: "Weekly summary of activity" },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.01] px-4 py-4"
                      >
                        <div>
                          <p className="text-sm font-medium text-white">{item.label}</p>
                          <p className="text-xs text-white/40">{item.desc}</p>
                        </div>
                        <button
                          onClick={() =>
                            setNotifications({
                              ...notifications,
                              [item.key]: !notifications[item.key as keyof typeof notifications],
                            })
                          }
                          className={`h-6 w-11 rounded-full p-0.5 transition ${
                            notifications[item.key as keyof typeof notifications]
                              ? "bg-cyan-500"
                              : "bg-white/10"
                          }`}
                        >
                          <div
                            className={`h-5 w-5 rounded-full bg-white shadow transition ${
                              notifications[item.key as keyof typeof notifications]
                                ? "translate-x-5"
                                : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="max-w-2xl space-y-6">
                <div className="rounded-[32px] border border-white/[0.05] bg-white/[0.03] p-6">
                  <h2 className="mb-6 text-lg font-semibold text-white">Two-Factor Authentication</h2>
                  <p className="text-sm text-white/60">
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </p>
                  <button className="mt-4 rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-cyan-500">
                    Enable 2FA
                  </button>
                </div>

                <div className="rounded-[32px] border border-white/[0.05] bg-white/[0.03] p-6">
                  <h2 className="mb-6 text-lg font-semibold text-white">Active Sessions</h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.01] px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Globe size={18} className="text-white/40" />
                        <div>
                          <p className="text-sm text-white">Current Session</p>
                          <p className="text-xs text-white/40">San Francisco, CA • Active now</p>
                        </div>
                      </div>
                      <span className="text-xs text-cyan-400">This device</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "shortcuts" && (
              <div className="max-w-2xl space-y-6">
                <div className="rounded-[32px] border border-white/[0.05] bg-white/[0.03] p-6">
                  <h2 className="mb-6 text-lg font-semibold text-white">Keyboard Shortcuts</h2>

                  <div className="space-y-3">
                    {[
                      { keys: ["⌘", "K"], action: "Open command palette" },
                      { keys: ["⌘", "N"], action: "Create new document" },
                      { keys: ["⌘", "/"], action: "Toggle slash commands" },
                      { keys: ["⌘", "E"], action: "Open editor" },
                      { keys: ["⌘", "I"], action: "Open AI chat" },
                    ].map((shortcut, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.01] px-4 py-3"
                      >
                        <span className="text-sm text-white/80">{shortcut.action}</span>
                        <div className="flex gap-1">
                          {shortcut.keys.map((key, i) => (
                            <kbd
                              key={i}
                              className="rounded border border-white/20 bg-white/5 px-2 py-1 text-xs text-white/60"
                            >
                              {key}
                            </kbd>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
