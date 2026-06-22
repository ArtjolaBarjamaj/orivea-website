export type LanguageCode = "sq" | "en";

export type LocalizedEntry = {
  sq: string;
  en: string;
};

export function t(lang: LanguageCode, entry: LocalizedEntry): string {
  return lang === "sq" ? entry.sq : entry.en;
}

export const i18n = {
  nav: {
    home: { sq: "Kreu", en: "Home" },
    services: { sq: "Shërbimet", en: "Services" },
    products: { sq: "Produktet", en: "Products" },
    // about: { sq: "Rreth Nesh", en: "About" },
    // contact: { sq: "Kontakt", en: "Contact" },
    changeLanguage: { sq: "Ndrysho gjuhën", en: "Change language" },
    cartAria: { sq: "Shporta", en: "Cart" },
  },
  footer: {
    joinCircle: { sq: "Bashkohu me Rrethin Tonë", en: "Join the Inner Circle" },
    newsletterCopy: {
      sq: "Merr qasje ekskluzive në lançimet e para, seritë e limituara dhe historitë pas përbërësve tanë.",
      en: "Receive exclusive access to first launches, limited batch releases, and the stories behind our harvests.",
    },
    emailPlaceholder: { sq: "Adresa juaj e emailit", en: "Your email address" },
    goToShop: { sq: "Shko te Dyqani", en: "Go To Shop" },
    subscribeNote: {
      sq: "Duke u abonuar, pranoni politikën tonë të privatësisë",
      en: "By subscribing, you agree to our privacy policy",
    },
    brandCopy: {
      sq: "Duke ngritur ritualet e përditshme përmes alkimisë së natyrës marokene dhe dizajnit modern.",
      en: "Elevating daily rituals through the alchemy of Moroccan nature and modern design.",
    },
    bornInMorocco: { sq: "Lindur në Marok", en: "Born in Morocco" },
    explore: { sq: "Eksploro", en: "Explore" },
    privacy: { sq: "Politika e Privatësisë", en: "Privacy Policy" },
    terms: { sq: "Kushtet e Shërbimit", en: "Terms of Service" },
    shipping: { sq: "Transporti", en: "Shipping" },
    connect: { sq: "Lidhu", en: "Connect" },
    locations: { sq: "Lokacionet", en: "Locations" },
    locationName: { sq: "Shqipëri, Tiranë", en: "Albania, Tirana" },
    backToTop: { sq: "Kthehu Sipër ↑", en: "Back To Top ↑" },
  },
  seo: {
    homeTitle: { sq: "Orivea Body Care", en: "Orivea Body Care" },
    homeDescription: {
      sq: "Kozmetikë dhe produkte për kujdesin e trupit",
      en: "Cosmetics and body care products",
    },
    routes: {
      "/": {
        title: { sq: "Kreu | Orivea Glow", en: "Home | Orivea Glow" },
        description: {
          sq: "Zbulo rituale natyrale për kujdesin e lëkurës me Orivea.",
          en: "Discover natural skincare rituals with Orivea.",
        },
      },
      "/services": {
        title: { sq: "Shërbimet | Orivea Glow", en: "Services | Orivea Glow" },
        description: {
          sq: "Shfleto shërbimet dhe koleksionet e kujdesit të lëkurës.",
          en: "Browse skincare services and collections.",
        },
      },
      "/productes": {
        title: { sq: "Produktet | Orivea Glow", en: "Products | Orivea Glow" },
        description: {
          sq: "Shiko të gjitha produktet Orivea për ritualin tënd.",
          en: "See all Orivea products for your ritual.",
        },
      },
      // "/about": {
      //   title: { sq: "Rreth Nesh | Orivea Glow", en: "About | Orivea Glow" },
      //   description: {
      //     sq: "Historia dhe filozofia pas Orivea Glow.",
      //     en: "The story and philosophy behind Orivea Glow.",
      //   },
      // },
      // "/contact": {
      //   title: { sq: "Kontakt | Orivea Glow", en: "Contact | Orivea Glow" },
      //   description: {
      //     sq: "Na kontakto për pyetje rreth produkteve dhe porosive.",
      //     en: "Contact us for product and order questions.",
      //   },
      // },
      "/shporta": {
        title: { sq: "Shporta | Orivea Glow", en: "Cart | Orivea Glow" },
        description: {
          sq: "Përfundo porosinë tënde në Orivea Glow.",
          en: "Complete your order at Orivea Glow.",
        },
      },
    },
  },
} as const;
