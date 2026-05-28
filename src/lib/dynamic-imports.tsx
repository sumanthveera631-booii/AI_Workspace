import dynamic from "next/dynamic";

import DashboardSkeleton from "../components/dashboard/dashboard-skeleton";

export const DynamicDashboard = dynamic(
  () =>
    import(
      "../components/dashboard/dashboard-grid"
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
      "../components/editor/editor-shell"
    ),
  {
    ssr: false,
  }
);

export const DynamicAIChat = dynamic(
  () =>
    import("../components/ai/ai-chat"),
  {
    ssr: false,
  }
);

export const DynamicClientBackgroundEffects = dynamic(
  () => import("../components/effects/client-background-effects"),
  {
    ssr: false,
  }
);

export const DynamicCommandMenu = dynamic(
  () => import("../components/command/command-menu"),
  {
    ssr: false,
  }
);

export const DynamicShortcutHandler = dynamic(
  () => import("../components/command/shortcut-handler"),
  {
    ssr: false,
  }
);

export const DynamicCollaborationShell = dynamic(
  () => import("../components/collaboration/collaboration-shell"),
  {
    ssr: false,
  }
);