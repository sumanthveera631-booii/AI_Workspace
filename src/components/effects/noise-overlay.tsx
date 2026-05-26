export default function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[2] opacity-[0.04]"
      style={{
        backgroundImage:
          "url('https://grainy-gradients.vercel.app/noise.svg')",
      }}
    />
  );
}