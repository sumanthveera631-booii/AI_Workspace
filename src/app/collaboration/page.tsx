import WorkspaceLayout from "@/components/workspace/workspace-layout";
import LiveCursors from "@/components/collaboration/live-cursors";
import PresenceSystem from "@/components/collaboration/presence-system";
import SharedEditor from "@/components/collaboration/shared-editor";
import RealtimeComments from "@/components/collaboration/realtime-comments";
import ActivityStream from "@/components/collaboration/activity-stream";

export default function CollaborationPage() {
  return (
    <WorkspaceLayout>
      <main className="relative min-h-screen overflow-hidden bg-[#050816] px-6 pt-24 pb-20 text-white">
        <LiveCursors />

        <PresenceSystem />

        <div className="mx-auto max-w-7xl space-y-8">
          <SharedEditor />

          <div className="grid gap-8 lg:grid-cols-2">
            <RealtimeComments />

            <ActivityStream />
          </div>
        </div>
      </main>
    </WorkspaceLayout>
  );
}