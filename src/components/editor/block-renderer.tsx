"use client";

export default function BlockRenderer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="group relative rounded-2xl transition hover:bg-white/[0.02]">
      <div className="absolute -left-10 top-2 opacity-0 transition group-hover:opacity-100">
        <button className="rounded-lg bg-white/[0.05] px-2 py-1 text-xs">
          ⋮⋮
        </button>
      </div>

      {children}
    </div>
  );
}