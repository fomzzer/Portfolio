import Image from "next/image";
import type { Project } from "@/i18n/content";
import { Reveal } from "./ui/reveal";

type Labels = { desktop: string; mobile: string };

export function ProjectGallery({ project, labels }: { project: Project; labels: Labels }) {
  const host = project.url ? project.url.replace(/^https?:\/\//, "").replace(/\/$/, "") : project.slug;
  const [hero, ...rest] = project.gallery.desktop;

  return (
    <div className="space-y-6 md:space-y-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">{labels.desktop}</p>
      {hero && (
        <Reveal>
          <BrowserFrame host={host}>
            <Image src={hero.src} alt={`${project.title} — ${labels.desktop} 1`} width={hero.width} height={hero.height} sizes="(min-width: 1240px) 1180px, 100vw" quality={82} className="h-auto w-full" />
          </BrowserFrame>
        </Reveal>
      )}
      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        {rest.map((shot, i) => (
          <Reveal key={shot.src} delay={i * 0.08}>
            <BrowserFrame host={host}>
              <Image src={shot.src} alt={`${project.title} — ${labels.desktop} ${i + 2}`} width={shot.width} height={shot.height} sizes="(min-width: 768px) 600px, 100vw" quality={80} className="h-auto w-full" />
            </BrowserFrame>
          </Reveal>
        ))}
      </div>

      <p className="pt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle md:pt-12">{labels.mobile}</p>
      <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 md:pb-0">
        {project.gallery.mobile.map((shot, i) => (
          <Reveal key={shot.src} delay={i * 0.08} className="w-[68vw] max-w-[300px] shrink-0 snap-center md:w-auto md:max-w-none">
            <PhoneFrame>
              <Image src={shot.src} alt={`${project.title} — ${labels.mobile} ${i + 1}`} width={shot.width} height={shot.height} sizes="(min-width: 768px) 360px, 68vw" quality={80} className="h-auto w-full" />
            </PhoneFrame>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function BrowserFrame({ host, children }: { host: string; children: React.ReactNode }) {
  return (
    <div className="glass glass-edge overflow-hidden rounded-2xl p-1.5 sm:p-2">
      <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-ink-3">
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-2.5">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/5" />
          <span className="ml-3 h-5 flex-1 truncate rounded-md bg-white/[0.04] px-3 font-mono text-[10px] leading-5 text-subtle">{host}</span>
        </div>
        {children}
      </div>
    </div>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="glass glass-edge mx-auto rounded-[2.6rem] p-2 shadow-[0_40px_100px_-40px_rgba(0,0,0,1)]">
      <div className="relative overflow-hidden rounded-[2.1rem] border border-white/[0.08] bg-white pt-9">
        <span className="absolute inset-x-0 top-0 h-9 bg-white" />
        <span className="absolute left-1/2 top-[7px] z-10 aspect-[3.4/1] w-[31%] -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  );
}
