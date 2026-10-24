export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div className="absolute -top-[30%] left-[10%] h-[70vmax] w-[70vmax] animate-aurora rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.09),transparent_60%)] blur-3xl" />
      <div className="absolute -bottom-[35%] -right-[15%] h-[60vmax] w-[60vmax] animate-aurora rounded-full bg-[radial-gradient(circle_at_center,rgba(160,170,190,0.08),transparent_60%)] blur-3xl [animation-delay:-8s]" />
      <div className="absolute top-[35%] -left-[20%] h-[45vmax] w-[45vmax] animate-aurora rounded-full bg-[radial-gradient(circle_at_center,rgba(120,120,140,0.07),transparent_60%)] blur-3xl [animation-delay:-14s]" />
      <div className="grid-bg mask-radial absolute inset-0 opacity-60" />
      <div className="noise absolute inset-0 opacity-[0.035] mix-blend-overlay" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink to-transparent" />
    </div>
  );
}
