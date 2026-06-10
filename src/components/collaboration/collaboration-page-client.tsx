"use client";

import dynamic from "next/dynamic";

// Force the entire collaboration shell to load strictly on the client side,
// completely bypassing the server build pre-rendering phase.
const CollaborationShell = dynamic(
  () => import("./collaboration-shell"),
  { ssr: false }
);

export default function CollaborationPageClient() {
  return <CollaborationShell />;
}
