import CommandMenu from "@/components/command/command-menu";
import ShortcutHandler from "@/components/command/shortcut-handler";
import QuickNavigation from "@/components/command/quick-navigation";
import AIActions from "@/components/command/ai-actions";

export default function CommandPage() {
  return (
    <main className="min-h-screen bg-[#070B14] px-6 py-20 text-white">
      <ShortcutHandler />

      <CommandMenu />

      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <h1 className="text-6xl font-semibold tracking-tight">
            Command Center
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-white/60">
            Keyboard-first AI productivity engine inspired by Raycast and Linear.
          </p>
        </div>

        <div className="mb-12">
          <QuickNavigation />
        </div>

        <AIActions />
      </div>
    </main>
  );
}