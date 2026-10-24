export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink [contain:strict]">
      <div className="absolute -top-[30%] left-[10%] h-[70vmax] w-[70vmax] animate-aurora rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.075),rgba(255,255,255,0.025)_35%,transparent_65%)] will-change-transform" />
      <div className="absolute -bottom-[35%] -right-[15%] h-[60vmax] w-[60vmax] animate-aurora rounded-full bg-[radial-gradient(circle_at_center,rgba(160,170,190,0.07),rgba(160,170,190,0.02)_35%,transparent_65%)] will-change-transform [animation-delay:-11s]" />
      <div className="grid-bg mask-radial absolute inset-0 opacity-60" />
      <div className="noise absolute inset-0 opacity-[0.025]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink to-transparent" />
    </div>
  );
}
