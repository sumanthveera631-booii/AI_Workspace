"use client";

import { useEffect, useState } from "react";
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
  const [theme, setTheme] = useState<"dark" | "light" | "system">("system");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weekly: false,
  });

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as
      | "dark"
      | "light"
      | "system"
      | null;

    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = (value: "dark" | "light" | "system") => {
      root.classList.remove("dark");

      if (value === "dark") {
        root.classList.add("dark");
      } else if (value === "system") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (prefersDark) {
          root.classList.add("dark");
        }
      }
    };

    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

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
      <div className="min-h-screen bg-background text-foreground">
        <div className="border-b border-border bg-popover/70 backdrop-blur-3xl px-6 py-6 md:px-10">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Configuration</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground">Settings</h1>
          <p className="mt-3 max-w-2xl text-muted">
            Manage your workspace preferences, AI settings, notifications, and security.
          </p>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden w-64 shrink-0 border-r border-border bg-popover/50 md:block">
            <div className="p-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                      activeTab === tab.id
                        ? "bg-popover/60 text-foreground"
                        : "text-muted hover:bg-popover/80 hover:text-foreground"
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
                <div className="rounded-[32px] border border-border bg-popover/70 p-6">
                  <h2 className="mb-6 text-lg font-semibold text-foreground">Profile Information</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="mb-2 block text-sm text-muted">Name</label>
                      <input
                        type="text"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        className="w-full rounded-xl border border-border bg-popover/60 px-4 py-3 text-foreground outline-none transition focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-muted">Email</label>
                      <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full cursor-not-allowed rounded-xl border border-border bg-popover/50 px-4 py-3 text-muted outline-none"
                      />
                      <p className="mt-2 text-xs text-muted">Email cannot be changed</p>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-muted">Bio</label>
                      <textarea
                        value={user.bio || ""}
                        onChange={(e) => setUser({ ...user, bio: e.target.value })}
                        rows={4}
                        placeholder="Tell us about yourself..."
                        className="w-full rounded-xl border border-border bg-popover/60 px-4 py-3 text-foreground outline-none transition focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-muted">Avatar URL</label>
                      <input
                        type="url"
                        value={user.avatar_url || ""}
                        onChange={(e) => setUser({ ...user, avatar_url: e.target.value })}
                        placeholder="https://example.com/avatar.jpg"
                        className="w-full rounded-xl border border-border bg-popover/60 px-4 py-3 text-foreground outline-none transition focus:border-cyan-500"
                      />
                    </div>

                    <button
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:scale-[1.02] disabled:opacity-50"
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
                <div className="rounded-[32px] border border-border bg-popover/70 p-6">
                  <h2 className="mb-6 text-lg font-semibold text-foreground">Theme</h2>

                  <div className="grid gap-4 md:grid-cols-3">
                    <button
                      onClick={() => setTheme("light")}
                      className={`flex flex-col items-center gap-3 rounded-xl border p-6 transition ${
                        theme === "light"
                          ? "border-cyan-500 bg-cyan-500/10"
                          : "border-border hover:border-foreground/50"
                      }`}
                    >
                      <Sun size={24} className="text-foreground" />
                      <span className="text-sm text-foreground">Light</span>
                    </button>

                    <button
                      onClick={() => setTheme("dark")}
                      className={`flex flex-col items-center gap-3 rounded-xl border p-6 transition ${
                        theme === "dark"
                          ? "border-cyan-500 bg-cyan-500/10"
                          : "border-border hover:border-foreground/50"
                      }`}
                    >
                      <Moon size={24} className="text-foreground" />
                      <span className="text-sm text-foreground">Dark</span>
                    </button>

                    <button
                      onClick={() => setTheme("system")}
                      className={`flex flex-col items-center gap-3 rounded-xl border p-6 transition ${
                        theme === "system"
                          ? "border-cyan-500 bg-cyan-500/10"
                          : "border-border hover:border-foreground/50"
                      }`}
                    >
                      <Monitor size={24} className="text-foreground" />
                      <span className="text-sm text-foreground">System</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "ai" && (
              <div className="max-w-2xl space-y-6">
                <div className="rounded-[32px] border border-border bg-popover/70 p-6">
                  <h2 className="mb-6 text-lg font-semibold text-foreground">AI Configuration</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="mb-2 block text-sm text-muted">Default Model</label>
                      <select className="w-full rounded-xl border border-border bg-popover/60 px-4 py-3 text-foreground outline-none">
                        <option>GPT-4 Turbo</option>
                        <option>GPT-4</option>
                        <option>Claude 3 Opus</option>
                        <option>Claude 3 Sonnet</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-muted">Response Style</label>
                      <select className="w-full rounded-xl border border-border bg-popover/60 px-4 py-3 text-foreground outline-none">
                        <option>Professional</option>
                        <option>Casual</option>
                        <option>Technical</option>
                        <option>Creative</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-border bg-popover/50 px-4 py-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">Enable Memory</p>
                        <p className="text-xs text-muted">AI remembers past conversations</p>
                      </div>
                      <div className="h-6 w-11 rounded-full bg-cyan-500 p-0.5">
                        <div className="h-5 w-5 rounded-full bg-foreground/90 shadow transition" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="max-w-2xl space-y-6">
                <div className="rounded-[32px] border border-border bg-popover/70 p-6">
                  <h2 className="mb-6 text-lg font-semibold text-foreground">Notification Preferences</h2>

                  <div className="space-y-4">
                    {[
                      { key: "email", label: "Email Notifications", desc: "Receive email updates" },
                      { key: "push", label: "Push Notifications", desc: "Browser push notifications" },
                      { key: "weekly", label: "Weekly Digest", desc: "Weekly summary of activity" },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between rounded-xl border border-border bg-popover/50 px-4 py-4"
                      >
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.label}</p>
                          <p className="text-xs text-muted">{item.desc}</p>
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
                              : "bg-popover/40"
                          }`}
                        >
                          <div
                            className={`h-5 w-5 rounded-full bg-foreground/90 shadow transition ${
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
                <div className="rounded-[32px] border border-border bg-popover/70 p-6">
                  <h2 className="mb-6 text-lg font-semibold text-foreground">Two-Factor Authentication</h2>
                  <p className="text-sm text-muted">
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </p>
                  <button className="mt-4 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/80">
                    Enable 2FA
                  </button>
                </div>

                <div className="rounded-[32px] border border-border bg-popover/70 p-6">
                  <h2 className="mb-6 text-lg font-semibold text-foreground">Active Sessions</h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-xl border border-border bg-popover/50 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Globe size={18} className="text-muted" />
                        <div>
                          <p className="text-sm text-foreground">Current Session</p>
                          <p className="text-xs text-muted">San Francisco, CA • Active now</p>
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
                <div className="rounded-[32px] border border-border bg-popover/70 p-6">
                  <h2 className="mb-6 text-lg font-semibold text-foreground">Keyboard Shortcuts</h2>

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
                        className="flex items-center justify-between rounded-xl border border-border bg-popover/50 px-4 py-3"
                      >
                        <span className="text-sm text-muted">{shortcut.action}</span>
                        <div className="flex gap-1">
                          {shortcut.keys.map((key, i) => (
                            <kbd
                              key={i}
                              className="rounded border border-border bg-popover/30 px-2 py-1 text-xs text-muted"
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
