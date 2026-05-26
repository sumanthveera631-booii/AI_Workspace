"use client";

export default function AuthInput({
  placeholder,
  type = "text",
}: {
  placeholder: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-white/[0.05] bg-white/[0.03] px-5 py-4 text-white outline-none backdrop-blur-xl transition placeholder:text-white/30 focus:border-violet-500/40"
    />
  );
}