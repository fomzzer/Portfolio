import { isLocale } from "@/i18n/config";
import { getContent } from "@/i18n/content";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Projects } from "@/components/sections/projects";
import { BusinessPackages, BusinessServices } from "@/components/sections/business";
import { About } from "@/components/sections/about";
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
      <BusinessServices content={content} index="02" id="services" />
      <BusinessPackages content={content} index="03" id="pricing" />
      <About content={content} />
      <Faq content={content} />
      <Contact />
    </>
  );
}
