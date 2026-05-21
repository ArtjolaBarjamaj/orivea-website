"use client";
import Image, { type StaticImageData } from "next/image";
import servicesData from "../../../assets/productes_data/services.json";
import oilImage from "../../../assets/public/oil.png";
import powderImage from "../../../assets/public/powder_service.png";
import masksImage from "../../../assets/public/masks_service.png";
import scrubImage from "../../../assets/public/scrub_service.png";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";

type SubProduct = {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
};

type ServiceProduct = {
    id: number;
    name: string;
    description: string;
    image: string;
    productes?: SubProduct[];
};

const serviceImageMap: Record<string, StaticImageData> = {
    "oil.png": oilImage,
    "powder_service.png": powderImage,
    "masks_service.png": masksImage,
    "scrub_service.png": scrubImage,
    "soap.jpg": powderImage,
};

function resolveServiceImage(imagePath: string): StaticImageData {
    const key = imagePath.replace(/^(\.\/|\/)+/, "").toLowerCase();
    return serviceImageMap[key] ?? oilImage;
}

export default function ServicesGrid() {
    const services = servicesData.services as ServiceProduct[];
    const { ref, isVisible } = useRevealOnScroll<HTMLElement>(0.2);

    return (
        <section ref={ref} className={`reveal-section w-full bg-[#fff8f5] py-10 md:py-14 ${isVisible ? "is-visible" : ""}`}>
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10">
                <div className="mx-auto mb-7 md:mb-10 max-w-xl text-center">
                    <p className="anim-fade-up text-xs sm:text-[11px] uppercase tracking-[0.2em] text-[#8f6f52]">Our Services</p>
                    <h2 className="anim-fade-up anim-delay-1 mt-2 font-serif text-[2rem] sm:text-3xl md:text-4xl text-[#241d16]">Our Services</h2>
                </div>

                <div className="mx-auto grid max-w-[1020px] grid-cols-1 gap-7 md:grid-cols-3 md:gap-7">
                    {services.slice(0, 3).map((service, index) => (
                        <article
                            key={service.id}
                            className={`w-full bg-transparent anim-fade-up ${index === 0 ? "anim-delay-1" : index === 1 ? "anim-delay-2" : "anim-delay-3"}`}
                        >
                            <div className="anim-hover-lift relative aspect-[3/3] w-full overflow-hidden bg-[#e8dfd7] md:aspect-[4/5]">                                <div className="relative w-[80%] h-[80%] mx-auto mt-[12.5%]">
                                <Image
                                    src={resolveServiceImage(service.image)}
                                    alt={service.name}
                                    fill
                                    sizes="(max-width: 768px) 80vw, 33vw"
                                    className="object-cover"
                                />
                            </div>
                            </div>
                            <div className="pt-3">
                                <h3 className="font-serif text-[1.95rem] sm:text-[1.65rem] leading-[1.05] text-[#2f251d]">{service.name}</h3>
                                <p className="mt-2 text-[13px] sm:text-[11px] leading-[1.65] text-[#6f655b]">
                                    {service.description}
                                </p>
                                <button
                                    type="button"
                                    className="mt-3 text-[11px] sm:text-[10px] uppercase tracking-[0.12em] text-[#7e5e42] underline underline-offset-4 hover:text-[#5f432c]"
                                >
                                    View Products
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}