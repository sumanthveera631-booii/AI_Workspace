"use client";

import Link from "next/link";

import { motion } from "motion/react";

import {
  LayoutDashboard,
  Sparkles,
  FolderKanban,
  BrainCircuit,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  FileText,
  Users,
} from "lucide-react";

import { create } from "zustand";

type SidebarStore = {
  collapsed: boolean;
  toggle: () => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
  collapsed: false,

  toggle: () =>
    set((state) => ({
      collapsed: !state.collapsed,
    })),
}));

const items = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
  },

  {
    icon: FileText,
    label: "Editor",
    href: "/editor",
  },

  {
    icon: Sparkles,
    label: "AI Chat",
    href: "/ai",
  },

  {
    icon: Users,
    label: "Collaboration",
    href: "/collaboration",
  },

  {
    icon: FolderKanban,
    label: "Documents",
    href: "/documents",
  },

  

  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
];

export default function WorkspaceSidebar() {
  const { collapsed, toggle } = useSidebarStore();

  return (
    <motion.aside
      animate={{
        width: collapsed ? 90 : 260,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        transform-gpu
        will-change-transform
        hidden
        border-r
        border-white/[0.03]
        bg-black/30
        backdrop-blur-3xl
        md:flex
        md:flex-col
      "
    >
      {/* TOP */}
      <div className="flex items-center justify-between px-6 py-6">
        {!collapsed && (
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight"
          >
            Nexus AI
          </Link>
        )}

        <button
          onClick={toggle}
          aria-label="Toggle Sidebar"
          className="
            rounded-xl
            bg-white/[0.03]
            p-2
            transition
            hover:bg-white/[0.06]
            focus:outline-none
            focus:ring-2
            focus:ring-violet-500
          "
        >
          {collapsed ? (
            <PanelLeftOpen size={18} />
          ) : (
            <PanelLeftClose size={18} />
          )}
        </button>
      </div>

      {/* NAV */}
      <nav className="mt-4 flex flex-col gap-2 px-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className="
                group
                flex
                items-center
                gap-4
                rounded-2xl
                px-4
                py-4
                text-white/70
                transition
                hover:bg-white/[0.04]
                hover:text-white
                focus:outline-none
                focus:ring-2
                focus:ring-violet-500
              "
            >
              <Icon
                size={20}
                className="transition group-hover:scale-110"
              />

              {!collapsed && (
                <span className="text-sm font-medium">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* BOTTOM PANEL */}
      {!collapsed && (
        <div className="mt-auto p-4">
          <div
            className="
              rounded-3xl
              border
              border-white/[0.05]
              bg-gradient-to-br
              from-violet-500/10
              to-cyan-500/10
              p-5
            "
          >
            <p className="text-sm text-white/60">
              Upgrade to Nexus Pro
            </p>

            <h3 className="mt-2 text-lg font-semibold">
              Unlock AI Workflows
            </h3>

            <button
              className="
                mt-4
                w-full
                rounded-2xl
                bg-white
                px-4
                py-3
                text-sm
                font-medium
                text-black
                transition
                hover:scale-[1.02]
              "
            >
              Upgrade
            </button>
          </div>
        </div>
      )}
    </motion.aside>
  );
}