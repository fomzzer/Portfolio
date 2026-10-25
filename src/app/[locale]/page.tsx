import { isLocale } from "@/i18n/config";
import { getContent } from "@/i18n/content";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Projects } from "@/components/sections/projects";
import { About } from "@/components/sections/about";
import { Stack } from "@/components/sections/stack";
import { Experience } from "@/components/sections/experience";
import { Services } from "@/components/sections/services";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);

  return (
    <>
      <Hero />
      <Marquee />
      <Projects content={content} />
      <About content={content} />
      <Stack content={content} />
      <Experience />
      <Services content={content} />
      <Faq content={content} />
      <Contact />
    </>
  );
}
