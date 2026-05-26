import { ReactNode } from "react";

interface WorkspaceShellProps {
  navbar: ReactNode;
  children: ReactNode;
}

export default function WorkspaceShell({
  navbar,
  children,
}: WorkspaceShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {navbar}

      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
}