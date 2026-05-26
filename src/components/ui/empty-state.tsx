type Props = {
  title: string;
  description: string;
};

export default function EmptyState({
  title,
  description,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-white/[0.06] bg-white/[0.03] p-12 text-center">
      <div className="mb-4 text-5xl">
        ✨
      </div>

      <h2 className="text-2xl font-semibold">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-white/60">
        {description}
      </p>
    </div>
  );
}