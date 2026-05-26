export default function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`
        animate-pulse
        rounded-3xl
        bg-white/[0.05]
        ${className}
      `}
    />
  );
}