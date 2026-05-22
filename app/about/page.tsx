"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutPage() {
  const { lang } = useLanguage();
  const isSq = lang === "sq";

  return (
    <section className="min-h-screen bg-[#f6f0eb] px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-[11px] uppercase tracking-[0.16em] text-[#8f6f52]">{isSq ? "Rreth Nesh" : "About Us"}</p>
        <h1 className="mt-2 font-serif text-3xl text-[#2f251d] md:text-5xl">{isSq ? "Historia e Orivea" : "The Orivea Story"}</h1>
        <p className="mx-auto mt-4 max-w-[70ch] text-sm leading-7 text-[#6f655b] md:text-base">
          {isSq
            ? "Orivea ndërthur traditat marokene të kujdesit të lëkurës me formulime moderne dhe të pastra. Çdo produkt është krijuar për të respektuar lëkurën dhe për të sjellë një ritual të qetë e të përditshëm."
            : "Orivea blends Moroccan skincare traditions with modern clean formulations. Every product is designed to respect your skin and create a calm daily ritual."}
        </p>
      </div>
    </section>
  );
}