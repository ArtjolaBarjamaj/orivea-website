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

const productSqMap: Record<string, { name: string; description: string; usage?: string }> = {
  "prd-argan-elixir-15": {
    name: "Eliksir Argan i Pastër 15ml",
    description: "Vaj argani i ftohtë për ushqim të thellë dhe shkëlqim natyral.",
    usage: "Ngroh tri pika në pëllëmbë. Aplikoje me prekje të buta në lëkurë të njomë. Lëre të përthithet natyrshëm.",
  },
  "prd-argan-elixir-30": {
    name: "Eliksir Argan i Pastër 30ml",
    description: "Format më i madh i eliksirit tonë për ritualin e përditshëm.",
    usage: "Aplikoje mëngjes dhe mbrëmje në lëkurë të pastër me masazh të lehtë.",
  },
  "prd-rhassoul-clay-mask": {
    name: "Maskë me Baltë Rhassoul",
    description: "Maskë me minerale që pastron poret dhe lëmon teksturën e lëkurës.",
    usage: "Përzieje me ujë, apliko një shtresë të hollë dhe shpëlaje pas 10 minutash.",
  },
  "prd-damask-rose-mist": {
    name: "Spray Trëndafili Damask",
    description: "Spray hidratues floral që freskon dhe qetëson gjatë gjithë ditës.",
    usage: "Spërkate fytyrën nga distanca dhe preke lehtë për përthithje.",
  },
  "prd-nilotica-shea-balm": {
    name: "Balsam Nilotica Shea",
    description: "Balsam i pasur që mbyll hidratimin dhe zbut zonat e thata.",
    usage: "Shkri një sasi të vogël me gishta dhe aplikoje aty ku ke nevojë.",
  },
  "prd-aker-fassi-powder": {
    name: "Pluhur Aker Fassi",
    description: "Pluhur botanik tradicional për ton të njëtrajtshëm dhe shkëlqim.",
    usage: "Përzieje me ujë trëndafili dhe aplikoje për 8-10 minuta.",
  },
  "prd-tbrima-mask": {
    name: "Maskë Tbrima",
    description: "Maskë balancuese që qetëson dhe përmirëson pamjen e lëkurës.",
    usage: "Aplikoje në lëkurë të pastër dhe shpëlaje me ujë të vakët pas 10 minutash.",
  },
  "prd-aker-fassi-mask": {
    name: "Maskë Aker Fassi",
    description: "Maskë rigjallëruese për lëkurë të lodhur dhe pa shkëlqim.",
    usage: "Përdore 2-3 herë në javë si pjesë e ritualit të mbrëmjes.",
  },
  "prd-nila-mask": {
    name: "Maskë NILA",
    description: "Maskë minerale kremoze që rrit butësinë dhe shkëlqimin.",
    usage: "Aplikoje në mënyrë të barabartë dhe hiqe pas 8-12 minutash.",
  },
  "prd-black-soap": {
    name: "Sapun i Zi",
    description: "Sapun maroken pastrues për lëkurë të butë dhe të pastër.",
    usage: "Aplikoje në lëkurë të njomë, lëre pak dhe pastaj shpëlaje.",
  },
  "prd-kessa-glove": {
    name: "Dorëzë Eksfoliuese Kessa",
    description: "Aksesor esencial për eksfolim të thellë gjatë dushit.",
    usage: "Përdore me lëvizje rrethore të buta pas dushit të ngrohtë.",
  },
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

export function getLocalizedProductNameById(productId: string, fallbackName: string, lang: LanguageCode) {
  if (lang === "en") return fallbackName;
  return productSqMap[productId]?.name ?? fallbackName;
}

export function getLocalizedServiceNameById(serviceId: string, fallbackName: string, lang: LanguageCode) {
  if (lang === "en") return fallbackName;
  return serviceSqMap[serviceId]?.name ?? fallbackName;
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
