"use client";

import LiveCursors from "./live-cursors";
import PresenceSystem from "./presence-system";
import SharedEditor from "./shared-editor";
import RealtimeComments from "./realtime-comments";
import ActivityStream from "./activity-stream";

export default function CollaborationShell() {
  return (
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
  );
}
