"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import { budgets, type Budget } from "@/content/contact";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getContent } from "@/i18n/content";
import { profile } from "@/content/profile";

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

function env(name: string) {
  return process.env[name]?.replace(/^﻿/, "").replace(/^"|"$/g, "").trim() || undefined;
}

function escape(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

const budgetLabels: Record<Budget, string> = {
  lt300: "до €300",
  "300to800": "€300 – 800",
  "800to2k": "€800 – 2 000",
  gt2k: "от €2 000",
  unsure: "Не определён",
};

const languageLabels: Record<Locale, string> = { en: "Английский", bg: "Болгарский", uk: "Украинский", ru: "Русский" };

type Inquiry = { name: string; email: string; budget: string; language: string; message: string; date: string };

function row(label: string, value: string, last = false) {
  return `<tr>
    <td style="padding:14px 0;${last ? "" : "border-bottom:1px solid #1f1f23;"}font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#71717a;width:130px;vertical-align:middle">${label}</td>
    <td style="padding:14px 0;${last ? "" : "border-bottom:1px solid #1f1f23;"}font-size:15px;color:#f5f5f4;vertical-align:middle">${value}</td>
  </tr>`;
}

function renderEmail({ name, email, budget, language, message, date }: Inquiry) {
  const safeEmail = escape(email);
  const reply = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: заявка с ${profile.brand}`)}`;
  return `<!doctype html>
<html lang="ru">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><meta name="supported-color-schemes" content="dark"><title>Новая заявка</title></head>
<body style="margin:0;padding:0;background:#050505;-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${escape(name)} · ${escape(budget)} — ${escape(message.slice(0, 120))}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#050505" style="background:#050505">
<tr><td align="center" style="padding:40px 16px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
    <tr><td style="padding:0 4px 24px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="vertical-align:middle">
          <span style="display:inline-block;width:36px;height:36px;line-height:36px;border-radius:999px;background:#f5f5f4;color:#050505;text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-weight:700;font-size:17px;vertical-align:middle">f.</span>
          <span style="display:inline-block;margin-left:10px;font-size:17px;font-weight:600;letter-spacing:-0.02em;color:#f5f5f4;vertical-align:middle">${profile.brand}</span>
        </td>
        <td align="right" style="vertical-align:middle;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#71717a">${escape(date)}</td>
      </tr></table>
    </td></tr>
    <tr><td bgcolor="#0e0e10" style="background:#0e0e10;border:1px solid #1f1f23;border-radius:24px;padding:36px 32px">
      <p style="margin:0 0 14px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#71717a"><span style="display:inline-block;width:7px;height:7px;border-radius:999px;background:#6ee7b7;margin-right:8px;vertical-align:middle"></span>Новая заявка с сайта</p>
      <h1 style="margin:0;font-size:30px;line-height:1.15;font-weight:600;letter-spacing:-0.035em;color:#f5f5f4">${escape(name)}</h1>
      <p style="margin:8px 0 0;font-size:15px;color:#a1a1aa"><a href="mailto:${safeEmail}" style="color:#a1a1aa;text-decoration:none">${safeEmail}</a></p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;border-top:1px solid #1f1f23">
        ${row("Почта", `<a href="mailto:${safeEmail}" style="color:#f5f5f4;text-decoration:none">${safeEmail}</a>`)}
        ${row("Бюджет", escape(budget))}
        ${row("Язык сайта", escape(language), true)}
      </table>
      <p style="margin:28px 0 12px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#71717a">Сообщение</p>
      <div style="background:#141417;border:1px solid #1f1f23;border-radius:16px;padding:20px 22px;font-size:15px;line-height:1.65;color:#e4e4e7;white-space:pre-wrap;word-break:break-word">${escape(message)}</div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px"><tr>
        <td bgcolor="#f5f5f4" style="border-radius:999px;background:#f5f5f4"><a href="${reply}" style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:600;color:#050505;text-decoration:none;border-radius:999px">Ответить клиенту →</a></td>
      </tr></table>
    </td></tr>
    <tr><td style="padding:20px 4px 0;font-size:12px;line-height:1.6;color:#52525b">Письмо отправлено формой обратной связи ${profile.brand}. Нажмите «Ответить» в почте, чтобы написать клиенту напрямую.</td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
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
  const budgetLabel = budgetLabels[budget];
  const language = languageLabels[locale];
  const date = new Intl.DateTimeFormat("ru-RU", { timeZone: profile.timezone, day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }).format(new Date());
  const apiKey = env("RESEND_API_KEY");
  const to = env("CONTACT_TO_EMAIL");

  if (!apiKey || !to) {
    console.warn("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set", { name, email, budget, locale });
    return { status: "error", message: t.contact.errors.config };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: env("CONTACT_FROM_EMAIL") ?? "fomzzer.dev <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `Новая заявка: ${name} · ${budgetLabel}`,
    text: `Новая заявка с сайта ${profile.brand}\n\nИмя: ${name}\nПочта: ${email}\nБюджет: ${budgetLabel}\nЯзык сайта: ${language}\nДата: ${date}\n\nСообщение:\n${message}`,
    html: renderEmail({ name, email, budget: budgetLabel, language, message, date }),
  });

  if (error) {
    console.error("Contact form: Resend error", error);
    return { status: "error", message: t.contact.errors.generic };
  }

  return { status: "success", message: t.contact.success };
}
