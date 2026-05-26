import { ReactNode } from "react";

interface DashboardShellProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export default function DashboardShell({
  sidebar,
  children,
}: DashboardShellProps) {
  return (
    <div className="flex min-h-screen">
      {sidebar}

      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}