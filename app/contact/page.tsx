"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactPage() {
  const { lang } = useLanguage();
  const isSq = lang === "sq";

  return (
    <section className="min-h-screen bg-[#f6f0eb] px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-[11px] uppercase tracking-[0.16em] text-[#8f6f52]">{isSq ? "Kontakt" : "Contact"}</p>
        <h1 className="mt-2 font-serif text-3xl text-[#2f251d] md:text-5xl">{isSq ? "Na Kontakto" : "Get in Touch"}</h1>
        <p className="mx-auto mt-4 max-w-[70ch] text-sm leading-7 text-[#6f655b] md:text-base">
          {isSq
            ? "Për pyetje rreth produkteve, porosive ose bashkëpunimeve, na shkruani në Instagram ose WhatsApp. Ekipi ynë do t'ju përgjigjet sa më shpejt."
            : "For questions about products, orders, or collaborations, message us on Instagram or WhatsApp. Our team will reply as soon as possible."}
        </p>
      </div>
    </section>
  );
}