"use client";

import { Command } from "cmdk";
import { AnimatePresence, motion } from "motion/react";
import { useRouter, usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { ArrowUpRight, Check, Copy, FileText, FolderGit2, Hash, Languages, LayoutGrid, Mail, Search } from "lucide-react";
import { useLenis } from "lenis/react";
import { profile } from "@/content/profile";
import { localeMeta, locales } from "@/i18n/config";
import { useI18n } from "@/i18n/provider";
import { BrandIcon } from "./ui/brand-icon";
import { useScrollToSection } from "./anchor-link";
import { useSwitchLocale } from "./language-switcher";

type CommandContextValue = { open: boolean; setOpen: (v: boolean) => void; toggle: () => void };

const CommandContext = createContext<CommandContextValue | null>(null);

export function useCommandMenu() {
  const ctx = useContext(CommandContext);
  if (!ctx) throw new Error("useCommandMenu must be used inside CommandProvider");
  return ctx;
}

export function CommandProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((v) => !v), []);
  const value = useMemo(() => ({ open, setOpen, toggle }), [open, toggle]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  return (
    <CommandContext.Provider value={value}>
      {children}
      <CommandMenu />
    </CommandContext.Provider>
  );
}

const itemClass =
  "group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted transition-colors data-[selected=true]:bg-white/[0.07] data-[selected=true]:text-fg";

const groupClass =
  "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-2 [&_[cmdk-group-heading]]:pt-4 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:text-subtle";

function CommandMenu() {
  const { open, setOpen } = useCommandMenu();
  const { locale, t, sections, projects } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const scrollTo = useScrollToSection();
  const switchLocale = useSwitchLocale();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  function run(fn: () => void) {
    setOpen(false);
    setTimeout(fn, 200);
  }

  function goSection(id: string) {
    run(() => {
      if (pathname === `/${locale}`) scrollTo(id);
      else router.push(`/${locale}#${id}`);
    });
  }

  async function copyEmail() {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <AnimatePresence>
      {open && (
        <div key="command" className="fixed inset-0 z-[90] flex items-start justify-center px-3 pt-[10vh] sm:px-4 sm:pt-[14vh]">
          <motion.div
            className="absolute inset-0 bg-black/75"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.35, ease: "easeOut" } }}
            exit={{ opacity: 0, transition: { duration: 0.25, ease: "easeIn" } }}
          />
          <motion.div
            className="glass-strong glass-edge relative w-full max-w-xl origin-top overflow-hidden rounded-3xl will-change-transform"
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 320, damping: 30, mass: 0.8, opacity: { duration: 0.25 } } }}
            exit={{ opacity: 0, scale: 0.97, y: 10, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } }}
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.openCommand}
          >
            <Command
              loop
              className="flex flex-col"
              onKeyDown={(e) => {
                if (e.key === "Escape") setOpen(false);
              }}
            >
              <div className="flex items-center gap-3 border-b border-line px-5">
                <Search className="size-4 shrink-0 text-subtle" />
                <Command.Input
                  autoFocus
                  placeholder={t.command.placeholder}
                  className="h-14 w-full bg-transparent text-sm text-fg outline-none placeholder:text-subtle focus-visible:outline-none"
                />
                <kbd className="hidden rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-subtle sm:block">ESC</kbd>
              </div>
              <Command.List data-lenis-prevent className="max-h-[min(60vh,420px)] overflow-y-auto overscroll-contain p-2">
                <Command.Empty className="px-3 py-10 text-center text-sm text-subtle">{t.command.empty}</Command.Empty>

                <Command.Group heading={t.command.navigate} className={groupClass}>
                  <Command.Item value={`cases ${t.nav.cases}`} onSelect={() => run(() => router.push(`/${locale}/projects`))} className={itemClass}>
                    <LayoutGrid className="size-4" />
                    {t.nav.cases}
                  </Command.Item>
                  <Command.Item value={`work latest ${t.work.eyebrow}`} onSelect={() => goSection("work")} className={itemClass}>
                    <Hash className="size-4" />
                    {t.work.eyebrow}
                  </Command.Item>
                  {sections.map((s) => (
                    <Command.Item key={s.id} value={`section ${s.id} ${s.label}`} onSelect={() => goSection(s.id)} className={itemClass}>
                      <Hash className="size-4" />
                      {s.label}
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading={t.command.projects} className={groupClass}>
                  {projects.map((p) => (
                    <Command.Item
                      key={p.slug}
                      value={`project ${p.slug} ${p.title} ${p.stack.join(" ")}`}
                      onSelect={() => run(() => router.push(`/${locale}/projects/${p.slug}`))}
                      className={itemClass}
                    >
                      <FolderGit2 className="size-4" />
                      <span className="flex-1">{p.title}</span>
                      <span className="font-mono text-[11px] text-subtle">{p.year}</span>
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading={t.command.actions} className={groupClass}>
                  <Command.Item value={`copy email ${t.command.copyEmail}`} onSelect={copyEmail} className={itemClass}>
                    <Copy className="size-4" />
                    <span className="flex-1">{copied ? t.command.copied : t.command.copyEmail}</span>
                    <span className="hidden font-mono text-[11px] text-subtle sm:block">{profile.email}</span>
                  </Command.Item>
                  <Command.Item value={`send email ${t.command.sendEmail}`} onSelect={() => run(() => (window.location.href = `mailto:${profile.email}`))} className={itemClass}>
                    <Mail className="size-4" />
                    {t.command.sendEmail}
                  </Command.Item>
                  {profile.resume && (
                    <Command.Item value={`resume cv ${t.command.downloadCv}`} onSelect={() => run(() => window.open(profile.resume ?? "", "_blank"))} className={itemClass}>
                      <FileText className="size-4" />
                      {t.command.downloadCv}
                    </Command.Item>
                  )}
                </Command.Group>

                <Command.Group heading={t.command.language} className={groupClass}>
                  {locales.map((l) => (
                    <Command.Item
                      key={l}
                      value={`language ${l} ${localeMeta[l].label} ${localeMeta[l].name}`}
                      onSelect={() =>
                        run(() => switchLocale(l))
                      }
                      className={itemClass}
                    >
                      <Languages className="size-4" />
                      <span className="flex-1">{localeMeta[l].name}</span>
                      {l === locale ? <Check className="size-3.5" /> : <span className="font-mono text-[11px] text-subtle">{localeMeta[l].label}</span>}
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading={t.command.socials} className={groupClass}>
                  {profile.socials.map((s) => (
                    <Command.Item
                      key={s.name}
                      value={`social ${s.name}`}
                      onSelect={() => run(() => window.open(s.href, "_blank", "noopener,noreferrer"))}
                      className={itemClass}
                    >
                      <BrandIcon name={s.icon} className="size-4" />
                      <span className="flex-1">{s.name}</span>
                      <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-data-[selected=true]:opacity-100" />
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
              <div className="flex items-center justify-between border-t border-line px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-subtle">
                <span>{profile.handle}</span>
                <span className="hidden items-center gap-3 sm:flex">
                  <span>↑↓ {t.command.hintNavigate}</span>
                  <span>↵ {t.command.hintSelect}</span>
                </span>
              </div>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
