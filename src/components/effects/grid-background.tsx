export default function GridBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070B14]/40 to-[#070B14]" />
    </div>
  );
}