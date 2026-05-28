"use client";

import WorkspaceNavbar from "./workspace-navbar";
import WorkspaceSidebar, {
  useSidebarStore,
} from "./workspace-sidebar";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { collapsed } = useSidebarStore();

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <WorkspaceSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* HIDE NAVBAR WHEN COLLAPSED */}
        {!collapsed && <WorkspaceNavbar />}

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}