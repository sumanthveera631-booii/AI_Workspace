"use client";

export default function DashboardAurora() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute left-[10%] top-[10%] h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[140px] animate-pulse" />

      <div className="absolute right-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[140px] animate-pulse" />

      <div className="absolute bottom-[5%] left-[40%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[160px] animate-pulse" />
    </div>
  );
}