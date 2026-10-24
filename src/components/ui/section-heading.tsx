import { Reveal } from "./reveal";
import { SplitText } from "./split-text";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({ index, eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 grid gap-6 md:mb-16 lg:mb-20 lg:grid-cols-12 lg:items-end", className)}>
      <div className="lg:col-span-7">
        <Reveal>
          <div className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-subtle">
            <span className="text-muted">{index}</span>
            <span className="h-px w-8 bg-line-strong" />
            <span>{eyebrow}</span>
          </div>
        </Reveal>
        <h2 className="max-w-3xl text-[2.1rem] font-semibold leading-[1.04] tracking-[-0.04em] text-balance text-fg sm:text-5xl lg:text-6xl">
          <SplitText text={title} />
        </h2>
      </div>
      {description && (
        <Reveal delay={0.15} className="lg:col-span-5">
          <p className="max-w-xl text-base leading-relaxed text-muted lg:ml-auto lg:max-w-md">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
