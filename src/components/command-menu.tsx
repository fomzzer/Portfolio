"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const load = () => import("./command-dialog");

const CommandMenu = dynamic(load, { ssr: false });

type CommandContextValue = { open: boolean; setOpen: (v: boolean) => void; toggle: () => void };

const CommandContext = createContext<CommandContextValue | null>(null);

export function useCommandMenu() {
  const ctx = useContext(CommandContext);
  if (!ctx) throw new Error("useCommandMenu must be used inside CommandProvider");
  return ctx;
}

export function CommandProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const toggle = useCallback(() => setOpen((v) => !v), []);
  const value = useMemo(() => ({ open, setOpen, toggle }), [open, toggle]);

  if (open && !mounted) setMounted(true);

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

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const id = window.setTimeout(load, 4000);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <CommandContext.Provider value={value}>
      {children}
      {mounted && <CommandMenu />}
    </CommandContext.Provider>
  );
}
