"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import { budgets } from "@/content/contact";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getContent } from "@/i18n/content";
import { en } from "@/i18n/dictionaries/en";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().max(120),
  budget: z.enum(budgets).catch("unsure"),
  message: z.string().trim().min(10).max(4000),
  company: z.string().max(0).optional(),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
};

const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > 5;
}

function escape(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

export async function sendMessage(_: ContactState, formData: FormData): Promise<ContactState> {
  const rawLocale = formData.get("locale");
  const locale = typeof rawLocale === "string" && isLocale(rawLocale) ? rawLocale : defaultLocale;
  const { t } = getContent(locale);
  const parsed = schema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    if (formData.get("company")) return { status: "success", message: t.contact.success };
    const fieldErrors = z.flattenError(parsed.error).fieldErrors;
    return {
      status: "error",
      message: t.contact.errors.fields,
      errors: {
        name: fieldErrors.name && t.contact.errors.name,
        email: fieldErrors.email && t.contact.errors.email,
        message: fieldErrors.message && t.contact.errors.message,
      },
    };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) return { status: "error", message: t.contact.errors.rate };

  const { name, email, budget, message } = parsed.data;
  const budgetLabel = en.contact.budgets[budget];
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    console.warn("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set", { name, email, budget, locale });
    return { status: "error", message: t.contact.errors.config };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `New inquiry from ${name} · ${budgetLabel} · ${locale.toUpperCase()}`,
    text: `Name: ${name}\nEmail: ${email}\nBudget: ${budgetLabel}\nLanguage: ${locale}\n\n${message}`,
    html: `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#111">
      <p><strong>Name:</strong> ${escape(name)}<br/><strong>Email:</strong> ${escape(email)}<br/><strong>Budget:</strong> ${escape(budgetLabel)}<br/><strong>Language:</strong> ${locale}</p>
      <p style="white-space:pre-wrap">${escape(message)}</p>
    </div>`,
  });

  if (error) {
    console.error("Contact form: Resend error", error);
    return { status: "error", message: t.contact.errors.generic };
  }

  return { status: "success", message: t.contact.success };
}
