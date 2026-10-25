"use client";

import { AnimatePresence, motion } from "motion/react";
import { startTransition, useActionState, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, Loader2, Send } from "lucide-react";
import { sendMessage, type ContactState } from "@/app/actions";
import { budgets, type Budget } from "@/content/contact";
import { profile } from "@/content/profile";
import { fill } from "@/i18n/config";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";
import { SectionHeading } from "../ui/section-heading";
import { Reveal } from "../ui/reveal";
import { GlassCard } from "../ui/glass-card";
import { BrandIcon } from "../ui/brand-icon";

const initial: ContactState = { status: "idle" };

const fieldClass =
  "peer block w-full rounded-2xl border border-line bg-white/[0.02] px-4 text-base leading-6 text-fg outline-none transition-[border-color,background-color,box-shadow] duration-300 placeholder:text-transparent hover:border-line-strong focus:border-white/30 focus:bg-white/[0.04] focus:shadow-[0_0_0_4px_rgba(255,255,255,0.04)] focus-visible:outline-none sm:text-sm";

const inputClass = "h-14 pb-1.5 pt-5";

const textareaClass = "min-h-36 resize-none pb-3 pt-7";

const labelBase =
  "pointer-events-none absolute left-4 origin-left text-sm leading-5 text-subtle transition-[top,transform,font-size,color] duration-300 ease-out-expo peer-focus:text-[11px] peer-focus:text-muted peer-[:not(:placeholder-shown)]:text-[11px]";

const inputLabel = `${labelBase} top-1/2 -translate-y-1/2 peer-focus:top-2 peer-focus:translate-y-0 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0`;

const textareaLabel = `${labelBase} top-[1.05rem] peer-focus:top-2.5 peer-[:not(:placeholder-shown)]:top-2.5`;

function Field({ name, label, type = "text", error, textarea, grow }: { name: string; label: string; type?: string; error?: string; textarea?: boolean; grow?: boolean }) {
  return (
    <div className={cn(grow && "flex flex-1 flex-col")}>
      <div className={cn("relative", grow && "flex flex-1 flex-col")}>
        {textarea ? (
          <textarea id={name} name={name} placeholder={label} rows={5} aria-invalid={!!error} className={cn(fieldClass, textareaClass, grow && "flex-1", error && "border-red-400/50")} />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            placeholder={label}
            aria-invalid={!!error}
            className={cn(fieldClass, inputClass, error && "border-red-400/50")}
            autoComplete={name === "email" ? "email" : name === "name" ? "name" : "off"}
          />
        )}
        <label htmlFor={name} className={textarea ? textareaLabel : inputLabel}>
          {label}
        </label>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-1.5 pl-1 text-xs text-red-300/90">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Contact() {
  const { locale, t, profile: p } = useI18n();
  const [budget, setBudget] = useState<Budget>("unsure");
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(async (prev: ContactState, data: FormData): Promise<ContactState> => {
    let result: ContactState;
    try {
      result = await sendMessage(prev, data);
    } catch {
      return { status: "error", message: t.contact.errors.generic };
    }
    if (result.status === "success") {
      formRef.current?.reset();
      setBudget("unsure");
    }
    return result;
  }, initial);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => action(data));
  }

  async function copy() {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section id="contact" className="container-page scroll-mt-24 py-24 md:py-32 lg:py-40">
      <SectionHeading index="06" eyebrow={t.contact.eyebrow} title={t.contact.title} description={t.contact.description} />

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="flex h-full flex-col gap-4 sm:gap-6">
            <GlassCard strong className="p-6 sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">{t.contact.email}</p>
              <a href={`mailto:${profile.email}`} className="selectable mt-3 block select-text break-all text-2xl font-semibold tracking-[-0.03em] text-fg transition-opacity hover:opacity-80 md:text-3xl">
                {profile.email}
              </a>
              <button onClick={copy} className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs text-muted transition-colors hover:border-line-strong hover:text-fg">
                {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                {copied ? t.contact.copied : t.contact.copy}
              </button>
            </GlassCard>

            <GlassCard className="p-6 sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">{t.contact.phone}</p>
              <ul className="mt-3 divide-y divide-line">
                {profile.phones.map((ph) => (
                  <li key={ph.href}>
                    <a href={ph.href} aria-label={`${t.contact.call}: ${ph.number}`} className="group flex items-center justify-between gap-4 py-3.5 last:pb-0">
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="shrink-0 rounded-full border border-line px-2.5 py-1 font-mono text-[10px] leading-none tracking-[0.15em] text-subtle transition-colors group-hover:border-line-strong group-hover:text-muted">
                          {ph.country}
                        </span>
                        <span className="select-text truncate text-lg font-semibold tabular-nums tracking-[-0.02em] text-fg transition-opacity group-hover:opacity-80 md:text-xl">{ph.number}</span>
                      </span>
                      <ArrowUpRight className="size-4 shrink-0 text-subtle transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:text-fg" />
                    </a>
                  </li>
                ))}
              </ul>
            </GlassCard>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {profile.socials.map((s, i) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className={cn("group", i === profile.socials.length - 1 && profile.socials.length % 2 === 1 && "col-span-2")}>
                  <GlassCard className="flex items-center justify-between gap-2 p-4 transition-colors group-hover:bg-white/[0.05] sm:p-5">
                    <span className="flex min-w-0 items-center gap-2.5 text-sm text-muted transition-colors group-hover:text-fg sm:gap-3">
                      <BrandIcon name={s.icon} className="size-4 shrink-0" />
                      <span className="truncate">{s.name}</span>
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 text-subtle transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:text-fg" />
                  </GlassCard>
                </a>
              ))}
            </div>

            <GlassCard className="flex flex-1 items-center gap-4 p-5 sm:p-6">
              <span className="size-2 shrink-0 rounded-full bg-emerald-300 animate-pulse-dot" />
              <p className="text-sm text-muted">
                <span className="text-fg">{p.availability}.</span> {fill(t.contact.worldwide, { location: p.location })}
              </p>
            </GlassCard>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <GlassCard strong className="flex h-full flex-col p-5 sm:p-8 md:p-10">
            <form ref={formRef} onSubmit={onSubmit} className="flex flex-1 flex-col gap-4" noValidate>
              <input type="hidden" name="locale" value={locale} />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="name" label={t.contact.name} error={state.errors?.name} />
                <Field name="email" label={t.contact.emailField} type="email" error={state.errors?.email} />
              </div>

              <fieldset className="mt-2">
                <legend className="mb-3 pl-1 text-sm text-subtle">{t.contact.budget}</legend>
                <input type="hidden" name="budget" value={budget} />
                <div className="flex flex-wrap gap-2">
                  {budgets.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudget(b)}
                      aria-pressed={budget === b}
                      className={cn(
                        "relative rounded-full border px-4 py-2 text-xs transition-colors duration-300",
                        budget === b ? "border-transparent text-ink" : "border-line text-muted hover:border-line-strong hover:text-fg",
                      )}
                    >
                      {budget === b && (
                        <motion.span layoutId="budget-pill" className="absolute inset-0 rounded-full bg-fg" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                      )}
                      <span className="relative">{t.contact.budgets[b]}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <Field name="message" label={t.contact.message} textarea grow error={state.errors?.message} />

              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
                <label htmlFor="company">Company</label>
                <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="mt-4 flex flex-col-reverse items-stretch justify-between gap-4 sm:flex-row sm:items-center">
                <AnimatePresence mode="wait">
                  {state.message && (
                    <motion.p
                      key={state.message}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      role="status"
                      className={cn("text-sm", state.status === "success" ? "text-emerald-300" : "text-red-300/90")}
                    >
                      {state.message}
                    </motion.p>
                  )}
                </AnimatePresence>
                <button
                  type="submit"
                  disabled={pending}
                  className="group inline-flex h-14 items-center justify-between gap-3 rounded-full bg-fg pl-7 pr-2 text-sm font-medium text-ink shadow-[0_10px_50px_-12px_rgba(255,255,255,0.5)] transition-all duration-500 ease-out-expo hover:shadow-[0_10px_60px_-8px_rgba(255,255,255,0.6)] active:scale-[0.97] disabled:opacity-60 sm:ml-auto"
                >
                  {pending ? t.contact.sending : t.contact.send}
                  <span className="grid size-10 place-items-center rounded-full bg-ink text-fg transition-transform duration-500 ease-out-expo group-hover:rotate-[-20deg]">
                    {pending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                  </span>
                </button>
              </div>
            </form>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
