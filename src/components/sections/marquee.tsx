import { marquee } from "@/content/stack";
import { PauseOffscreen } from "../ui/pause-offscreen";

export function Marquee() {
  const items = [...marquee, ...marquee];

  return (
    <PauseOffscreen className="relative border-y border-line py-6">
      <div className="mask-fade-x flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-12 pr-12 hover:[animation-play-state:paused]">
          {items.map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-12 whitespace-nowrap text-2xl font-medium tracking-[-0.03em] text-subtle transition-colors hover:text-fg md:text-3xl">
              {item}
              <span className="size-1.5 rounded-full bg-dim" />
            </span>
          ))}
        </div>
      </div>
    </PauseOffscreen>
  );
}
