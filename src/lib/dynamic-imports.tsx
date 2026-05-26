
"use client";
import dynamic from "next/dynamic";

import DashboardSkeleton from "@/components/dashboard/dashboard-skeleton";

export const DynamicDashboard = dynamic(
  () =>
    import(
      "@/components/dashboard/dashboard-grid"
    ),
  {
    ssr: false,

    loading: () => (
      <DashboardSkeleton/>
    ),
  }
);

export const DynamicEditor = dynamic(
  () =>
    import(
      "@/components/editor/editor-shell"
    ),
  {
    ssr: false,
  }
);

export const DynamicAIChat = dynamic(
  () =>
    import("@/components/ai/ai-chat"),
  {
    ssr: false,
  }
);