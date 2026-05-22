import catalogData from "@/assets/productes_data/catalog.json";

export type CatalogProduct = {
  id: string;
  name: string;
  description: string;
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
