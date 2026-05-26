import { ReactNode } from "react";

interface MaxWidthWrapperProps {
  children: ReactNode;
}

export default function MaxWidthWrapper({
  children,
}: MaxWidthWrapperProps) {
  return (
    <div className="mx-auto w-full max-w-7xl px-6">
      {children}
    </div>
  );
}