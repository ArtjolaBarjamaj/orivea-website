"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { i18n, t } from "@/lib/i18n";

export default function Footer() {
  const { lang } = useLanguage();
  const isSq = lang === "sq";

  return (
    <footer className="w-full bg-[#ECE1D6] text-[#2f251d]">
      <div className="mx-auto w-full max-w-sm px-6 py-12 sm:max-w-6xl sm:px-8 md:px-10">
        <div className="border-b border-[#dfd6cc] pb-10">
          <h3 className="text-center font-serif italic text-[2rem] leading-tight sm:text-4xl">
            {t(lang, i18n.footer.joinCircle)}
          </h3>
          <p className="mx-auto mt-4 max-w-md text-center text-[13px] leading-6 text-[#5f5347]">
            {t(lang, i18n.footer.newsletterCopy)}
          </p>

          <div className="mx-auto mt-6 max-w-md">
            <input
              type="email"
              placeholder={t(lang, i18n.footer.emailPlaceholder)}
              className="w-full border-b border-[#d4c8bb] bg-transparent px-1 py-3 text-[13px] text-[#3b3129] placeholder:text-[#aa9b8b] outline-none"
            />
            <Link
              href="/shporta"
              className="mt-3 block w-full bg-[#0f1218] px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#1a2230]"
            >
              {t(lang, i18n.footer.goToShop)}
            </Link>
            <p className="mt-3 text-center text-[9px] uppercase tracking-[0.12em] text-[#9c8d7d]">
              {t(lang, i18n.footer.subscribeNote)}
            </p>
          </div>
        </div>

        <div className="pt-10">
          <h4 className="font-serif italic text-[2rem] leading-tight sm:text-4xl">Orivea Glow</h4>
          <p className="mt-4 max-w-sm text-[13px] leading-6 text-[#5f5347]">
            {t(lang, i18n.footer.brandCopy)}
          </p>
          <p className="mt-6 text-[11px] uppercase tracking-[0.08em] text-[#8c7b69]">
            © {new Date().getFullYear()} Orivea Glow {t(lang, i18n.footer.bornInMorocco)}
          </p>

          <div className="mt-8 grid grid-cols-3 gap-6 text-[12px] leading-6">
            <div>
              <h5 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b7765]">{t(lang, i18n.footer.explore)}</h5>
              <a href="#" className="block text-[#4f4439] hover:text-[#2f251d]">{t(lang, i18n.footer.privacy)}</a>
              <a href="#" className="block text-[#4f4439] hover:text-[#2f251d]">{t(lang, i18n.footer.terms)}</a>
              <a href="#" className="block text-[#4f4439] hover:text-[#2f251d]">{t(lang, i18n.footer.shipping)}</a>
            </div>
            <div>
              <h5 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b7765]">{t(lang, i18n.footer.connect)}</h5>
              <a href="#" className="block text-[#4f4439] hover:text-[#2f251d]">WhatsApp</a>
              <a href="#" className="block text-[#4f4439] hover:text-[#2f251d]">Instagram</a>
            </div>
            <div>
              <h5 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b7765]">{t(lang, i18n.footer.locations)}</h5>
              <p className="text-[#4f4439]">{t(lang, i18n.footer.locationName)}</p>
            </div>
          </div>

          <div className="mt-10 border-t border-[#dfd6cc] pt-4">
            <a href="#top" className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7d6a58] hover:text-[#2f251d]">
              {t(lang, i18n.footer.backToTop)}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}