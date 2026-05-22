"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { i18n, t } from "@/lib/i18n";

export default function LanguageHeadSync() {
  const pathname = usePathname();
  const { lang } = useLanguage();

  useEffect(() => {
    const routeMap = i18n.seo.routes as Record<
      string,
      { title: { sq: string; en: string }; description: { sq: string; en: string } }
    >;

    const route =
      routeMap[pathname] ??
      (pathname.startsWith("/productes/")
        ? {
            title: { sq: "Detajet e Produktit | Orivea Glow", en: "Product Details | Orivea Glow" },
            description: {
              sq: "Shiko përbërjen, përdorimin dhe detajet e produktit.",
              en: "View ingredients, usage, and product details.",
            },
          }
        : pathname.startsWith("/services/")
          ? {
              title: { sq: "Detajet e Shërbimit | Orivea Glow", en: "Service Details | Orivea Glow" },
              description: {
                sq: "Shiko produktet e lidhura me këtë shërbim.",
                en: "See products related to this service.",
              },
            }
          : {
              title: i18n.seo.homeTitle,
              description: i18n.seo.homeDescription,
            });

    document.title = t(lang, route.title);

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", t(lang, route.description));
    }
  }, [lang, pathname]);

  return null;
}
