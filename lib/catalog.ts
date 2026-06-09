import catalogData from "@/assets/productes_data/catalog.json";

export type LanguageCode = "sq" | "en";

export type CatalogProduct = {
  id: string;
  name: string;
  description: string;
  fullDescription?: string;
  price: number;
  image: string;
  gallery?: string[];
  content?: string;
  usage?: string;
  benefits?: string;
  serviceIds: string[];
};

export type CatalogService = {
  id: string;
  name: string;
  description: string;
  image: string;
  productIds: string[];
};

type CatalogShape = {
  products: CatalogProduct[];
  services: CatalogService[];
  homeFeaturedProductIds: string[];
};

const catalog = catalogData as CatalogShape;

export const catalogProducts = catalog.products;
export const catalogServices = catalog.services;
export const homeFeaturedProductIds = catalog.homeFeaturedProductIds;

export const productById = new Map(catalogProducts.map((product) => [product.id, product]));

const serviceSqMap: Record<string, { name: string; description: string }> = {
  "svc-oils": {
    name: "Vajra",
    description: "Përzierje vajrash natyralë për ushqim të thellë të lëkurës dhe flokëve.",
  },
  "svc-powders": {
    name: "Pluhura",
    description: "Pluhura natyralë për ritualin e përditshëm të kujdesit të lëkurës.",
  },
  "svc-masks": {
    name: "Maska",
    description: "Maska natyrale për lëkurë të shëndetshme dhe me shkëlqim.",
  },
  "svc-scrubs": {
    name: "Eksfoliues",
    description: "Eksfolim i butë për një teksturë të pastër dhe të lëmuar.",
  },
  "svc-soaps": {
    name: "Sapunë",
    description: "Sapunë të pastër për lëkurë të butë dhe të shëndetshme.",
  },
  "svc-accessories": {
    name: "Aksesorë",
    description: "Aksesorë esencialë për pastrim më të thellë të lëkurës.",
  },
};

const productSqMap: Record<string, { name: string; description: string; fullDescription?: string; usage?: string; benefits?: string; }> = {
  "prd-argan-elixir-15": {
    name: "Vaj Argan i Pastër 15ml",
    description: "Madhësi udhëtimi, e pasur me vitaminë E. Ideale për përdorim të përditshëm në lëkurë dhe flokë.",
    fullDescription: "Vaji i arganit është një vaj kozmetik 100% natyral. I pasur me Vitaminë E, acide yndyrore dhe antioksidantë. Ky vaj eshte nje hidratues multifunksional që ndihmon në ushqimin dhe mbrojtjen e lëkurës, flokëve dhe thonjve.",
    benefits: "Ushqen dhe stimulon rigjenerimin e lëkurës. Ka veti anti-aging dhe permireson elasticitetin. Forcon fibrat e flokve dhe ndihmon në parandalimin te dyfishta. 100% natyral dhe i pasur me vitamine E (tokoferole).",
    usage: "Fytyra: Aplikoni 2-3 pika dhe masazhoni lehtë në lekurë në mbrëmje. Flokët: Aplikojeni në maja ose përdoreni si maske ushqyese para larjes. Trupi: Aplikojeni pas dushit në lëkurë të lagur për hidratim maksimal.",
  },
  "prd-argan-elixir-30": {
    name: "Vaj Argan i Pastër 30ml",
    description: "Sasi e mesme, e pasur me vitaminë E për hidratim të përditshëm të lëkurës dhe flokëve.",
    fullDescription: "Vaji i arganit është një vaj kozmetik 100% natyral. I pasur me Vitaminë E, acide yndyrore dhe antioksidantë. Ky vaj eshte nje hidratues multifunksional që ndihmon në ushqimin dhe mbrojtjen e lëkurës, flokëve dhe thonjve.",
    benefits: "Ushqen dhe stimulon rigjenerimin e lëkurës. Ka veti anti-aging dhe permireson elasticitetin. Forcon fibrat e flokve dhe ndihmon në parandalimin te dyfishta. 100% natyral dhe i pasur me vitamine E (tokoferole).",
    usage: "Fytyra: Aplikoni 2-3 pika dhe masazhoni lehtë në lekurë në mbrëmje. Flokët: Aplikojeni në maja ose përdoreni si maske ushqyese para larjes. Trupi: Aplikojeni pas dushit në lëkurë të lagur për hidratim maksimal.",
  },
  "prd-argan-elixir-50": {
    name: "Vaj Argan i Pastër 50ml",
    description: "Sasi e madhe për përdorim afatgjatë dhe hidratim intensiv të lëkurës dhe flokëve.",
    fullDescription: "Vaji i arganit është një vaj kozmetik 100% natyral. I pasur me Vitaminë E, acide yndyrore dhe antioksidantë. Ky vaj eshte nje hidratues multifunksional që ndihmon në ushqimin dhe mbrojtjen e lëkurës, flokëve dhe thonjve.",
    benefits: "Ushqen dhe stimulon rigjenerimin e lëkurës. Ka veti anti-aging dhe permireson elasticitetin. Forcon fibrat e flokve dhe ndihmon në parandalimin te dyfishta. 100% natyral dhe i pasur me vitamine E (tokoferole).",
    usage: "Fytyra: Aplikoni 2-3 pika dhe masazhoni lehtë në lekurë në mbrëmje. Flokët: Aplikojeni në maja ose përdoreni si maske ushqyese para larjes. Trupi: Aplikojeni pas dushit në lëkurë të lagur për hidratim maksimal.",
  },
  "prd-nila-powder": {
    name: "Pluhur NILA",
    description: "Maskë me minerale perdoret për ndricim, zbutje dhe hidratim të lëkurës.",
    fullDescription: "Pluhuri NILA është një pluhur natyral me origjinë minerale ose bimore tradiconalisht i përdorur ne kujdesin e lëkurës ne Afriken e Veriut.Perdoret per ndricim, zbutje dhe hidratim te lekures, vecanerisht ne zonat me te ashpra si gjunjte brrylat dhe sqetullat.",
    benefits: "Ndricon dhe permirson tonin e lekures. Redukton shfaqen e njollave te errta dhe hiperpigmentimit. Jep shkelqim natyral lekures. Ofron pastrim te thelle te poreve.",
    usage: "Perzjejeni me uje trendafili ose kos derisa te krijohet nje mas homogjene. Aplikojeni si maske per 10-15 minuta. Perdoreni 1-2 here ne jave.",
  },
  "prd-prickly-pear-seed-oil": {
    name: "Vaj nga Farat e Fikut të Indisë 30ml",
    description: "I njohur per efektin e tij anti-aging, i pasur me Vitaminë E, Vitaminë K dhe acide yndyrore esenciale. ",
    fullDescription: "Një vaj luksoz dhe shumë i lehtë, i përftuar nga farat e Opuntia Ficus-Indica. I njohur për përmbajtjen e lartë të Vitaminës E dhe acideve yndyrore esenciale, ky vaj konsiderohet një nga vajrat më të çmuar për kujdesin e lëkurës.Vaji nga farat e Fikut të Indisë eshtë një vaj luksoz dhe i lehtë, që perthithet shpejt dhe perftohet nga farat e kaktusit Opuntia ficus-indica.I njohur per efektin e tij anti-aging, ky vaj eshtë i pasur me Vitaminë E, Vitaminë K dhe acide yndyrore esenciale. Konsiderohet një nga vajrat më të gmuar per kujdesin e lëkurës, flokëve dhe thonjve.",
    benefits: "I pasur me antioksidantë me veti të fuqishme mbrojtëseHidraton thellësisht dhe forcon barrierën mbrojtëse te lëkurësPërmirëson elasticitetin dhe shkëlqimin natyral të lëkurësUshqen flokët dhe forcon thonjtë e brishtë",
    usage: "Fytyra: Aplikoni 2-3 pika në lëkurë të paster, preferohet në mbrëmje.Flokët: Vendosni një sasi të vogël ne maja ose përdoreni si trajtim para larjes.Thonjtë: Masazhoni l pikë në kutikula çdo ditë.",
  },
  "prd-nila-mask": {
    name: "NILA Maskë 200gr",
    description: "Ndihmojnë në ndriçimin, zbutjen dhe pastrimin e thellë të lëkurës, duke reduktuar pigmentimin dhe njollat e errëta.",
    fullDescription: "Produkte tradicionale marokene për kujdesin e lekurës, tẻ formuluara me pluhur indigo blu. Ndihmojnë në ndriçimin, zbutjen dhe pastrimin e thellë të lëkurës, duke reduktuar pigmentimin dhe njollat e errëta.",
    benefits: "Detoksifikon dhe pastron thellësisht lëkurën. Ndriçon dhe barazon tonin e lëkurës. Lë lëkurën të butë dhe të freskët",
    usage: "Aplikojeni në fytyrë dhe trup. Lëreni të veprojë për 10-20 minuta.Shpëlajeni me ujë dhe aplikoni kremhidratues.",
  },
  "prd-aker-fassi-powder": {
    name: "Pluhur Aker Fassi 100gr",
    description: "Përdoret si pigment natyral për buzët dhe faqet, duke ofruar një pamje të freskët dhe natyrale.",
    fullDescription: "Pluhuri Aker Fassi eshtë një produkt tradicional bukurie nga Maroku, i perftuar nga petalet e thata të lulëkuqes dhe lëkura e shegés. Përdoret si pigment natyral për buzët dhe faqet, duke ofruar një pamje të freskët dhe natyrale.",
    benefits: "Përmban veti antioksiduese dhe anti-aging. Thekson shkëlqimin natyral të fytyrës",
    usage: " Perziejeni me pak uje ose vaj argani.Aplikojeni si blush ose tint për buzët.",
  },
  "prd-tbrima-mask": {
    name: "Maskë Tbrima 200gr",
    description: "Perdoret në ritualet tradicionale të hammamit për pastrim të thellë dhe zbutje të lëkures.",
    fullDescription: "Tbrima eshtë një përzierje tradicionale marokene me bazë bimore dhe argjile, e përdorur si skrab ose maskë për trupin. Perdoret në ritualet tradicionale të hammamit për pastrim të thellë dhe zbutje të lëkures.",
    benefits: "Qeteson lëkurën e ndjeshme. Ndihmon ne lehtesimin e irritimeve.Ofron pastrim natyral dhe ndjesi freskie.Permirison teksturën e lekures.",
    usage: "Aplikoje në lëkurë të pastër dhe shpëlaje me ujë të vakët pas 10 minutash.",
  },
  "prd-aker-fassi-mask": {
    name: "Maskë Aker Fassi 200gr",
    description: "Maskë rigjallëruese për lëkurë të lodhur dhe pa shkëlqim.",
    fullDescription: "Maska Aker Fassi eshte nje trajtim tradicional maroken per kujdesin e lekures, injohur per vetite ndriguese dhe antioksiduese.",
    benefits: "Nxit rigjenerimin e lekures. Jep nje nuancë natyrale dhe te freskët. Pasuron lekurën me antioksidante",
    usage: "Aplikojeni ne fytyre per 10-15 minuta. Perdoreni l here ne jave"
  },
  "prd-nila-scrub": {
    name: "NILA Skrab 200gr",
    description: "Ndihmon në eksfolimin, ndriçimin dhe zbutjen e lëkurës, duke reduktuar ashpërsiné dhe pamjen e njollave te errëta.",
    fullDescription: "Nila Scrub eshtë një produkt natyral per kujdesin e lekurës, i frymëzuar nga tradita marokene dhe i formuluar me pluhur Nila blu.Ndihmon në eksfolimin, ndriçimin dhe zbutjen e lëkurës, duke reduktuar ashpërsiné dhe pamjen e njollave te errëta.",
    benefits: "Largon qelizat e vdekura të lëkurës. Zbut lëkurën dhe pastron poret. Përmirëson strukturën dhe teksturën e lëkurës",
    usage: "Aplikojeni në lëkurë të lagur. Masazhojeni me lëvizje rrethore për 2-3 minuta. Shpelajeni mirë me ujë të ngrohtë.",
  },
  "prd-black-soap": {
    name: "SAPUN I ZI AFRIKAN 200gr",
    description: "Sapun tradicional me bazë bimore, injohur per vetite pastruese dhe eksfoliuese.",
    fullDescription: "Sapuni i Zi Afrikan ishte nje sapun tradicional me bazë bimore, injohur per vetite pastruese dhe eksfoliuese.",
    benefits: "Pastron thellesisht lëkurën .Pergatit trupin per eksfolimZbut dhe detoksifikon lëkurën.Zbut dhe detoksifikon lëkurën",
    usage: "Aplikojeni gjate nje dushi tengrohte.Lëreni te veproje për 5-10minuta.Vazhdoni me eksfolim duke perdorur dorezën Kessa."
  },
  "prd-rose-water": {
    name: "Ujë Trëndafili 100ml",
    description: "Lëng aromatik dhe shumëfunksional, i përdorur gjerësisht në kujdesin natyral të lëkurës",
    fullDescription: "Uji i Trëndafilit eshtë një lëng aromatik dhe shumëfunksional, i përdorur gjerësisht në kujdesin natyral të lëkurës.",
    benefits: "Hidraton dhe freskon lëkurën. Funksionon si tonik natyral. Qetëson irritimet e lekurës. Përgatit lekurën për trajtime të tjera",
    usage: "Aplikojeni si tonik pas pastrimit të lekurës. Përdoreni si spërkatës freskues gjatë ditës. Përzieni në maska natyrale për efekt shtesë hidratues."
  },
  "prd-kessa-glove": {
    name: "Dorëzë Eksfoliuese Kessa",
    description: "Aksesor tradicional për eksfolim të thellë dhe largimin e qelizave të vdekura të lëkurës.",
    fullDescription: "Dorëza Kessa është një aksesor tradicional i përdorur në ritualet e hammamit maroken. Ndihmon në eksfolimin e thellë të lëkurës, largimin e qelizave të vdekura dhe përmirësimin e teksturës së saj.",
    benefits: "Largon qelizat e vdekura të lëkurës. Ndihmon në pastrimin e poreve. E lë lëkurën më të butë dhe të lëmuar.",
    usage: "Përdoreni me lëvizje rrethore të buta pas dushit të ngrohtë ose pas përdorimit të sapunit të zi."
  }
};

export function normalizePublicImagePath(path?: string) {
  if (!path) return "/placeholder.png";
  if (path.startsWith("/")) return path;
  if (path.startsWith("./")) return `/${path.slice(2)}`;
  return `/${path.replace(/^\/+/, "")}`;
}

export function resolveCatalogImage(path?: string): string {
  if (!path) return "/placeholder.png";
  return normalizePublicImagePath(path);
}

export function getLocalizedServiceName(service: CatalogService, lang: LanguageCode) {
  if (lang === "en") return service.name;
  return serviceSqMap[service.id]?.name ?? service.name;
}

export function getLocalizedServiceDescription(service: CatalogService, lang: LanguageCode) {
  if (lang === "en") return service.description;
  return serviceSqMap[service.id]?.description ?? service.description;
}

export function getLocalizedProductName(product: CatalogProduct, lang: LanguageCode) {
  if (lang === "en") return product.name;
  return productSqMap[product.id]?.name ?? product.name;
}

export function getLocalizedProductDescription(product: CatalogProduct, lang: LanguageCode) {
  if (lang === "en") return product.description;
  return productSqMap[product.id]?.description ?? product.description;
}

export function getLocalizedProductUsage(product: CatalogProduct, lang: LanguageCode) {
  if (lang === "en") return product.usage;
  return productSqMap[product.id]?.usage ?? product.usage;
}

export function getLocalizedProductBenefits(product: CatalogProduct, lang: LanguageCode) {
  if (lang === "en") return product.benefits ?? product.benefits;
  return productSqMap[product.id]?.benefits ?? product.benefits ?? product.benefits;
}

export function getLocalizedProductNameById(productId: string, fallbackName: string, lang: LanguageCode) {
  if (lang === "en") return fallbackName;
  return productSqMap[productId]?.name ?? fallbackName;
}

export function getLocalizedServiceNameById(serviceId: string, fallbackName: string, lang: LanguageCode) {
  if (lang === "en") return fallbackName;
  return serviceSqMap[serviceId]?.name ?? fallbackName;
}


export function getLocalizedProductFullDescriptionById(productId: string, fallbackFullDescription: string, lang: LanguageCode) {
  if (lang === "en") return fallbackFullDescription;
  return productSqMap[productId]?.fullDescription ?? fallbackFullDescription;
}

export function getServiceById(serviceId: string) {
  return catalogServices.find((service) => service.id === serviceId);
}

export function getProductsByServiceId(serviceId: string) {
  const service = getServiceById(serviceId);
  if (!service) return [];

  return service.productIds
    .map((productId) => productById.get(productId))
    .filter((product): product is CatalogProduct => Boolean(product));
}

export function getFeaturedHomeProducts() {
  return homeFeaturedProductIds
    .map((productId) => productById.get(productId))
    .filter((product): product is CatalogProduct => Boolean(product));
}
