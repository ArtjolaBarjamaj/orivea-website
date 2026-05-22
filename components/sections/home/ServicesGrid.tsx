"use client";
import Image from "next/image";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";
import Link from "next/link";
import { catalogServices, resolveCatalogImage } from "@/lib/catalog";

export default function ServicesGrid() {
    const services = catalogServices;
    const { ref, isVisible } = useRevealOnScroll<HTMLElement>(0.2);

    return (
        <section ref={ref} className={`reveal-section w-full bg-[#fff8f5] py-10 md:py-14 ${isVisible ? "is-visible" : ""}`}>
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10">
                <div className="mx-auto mb-7 md:mb-10 max-w-xl text-center">
                    <p className="anim-fade-up text-xs sm:text-[11px] uppercase tracking-[0.2em] text-[#8f6f52]">Our Services</p>
                    <h2 className="anim-fade-up anim-delay-1 mt-2 font-serif text-[2rem] sm:text-3xl md:text-4xl text-[#241d16]">Our Services</h2>
                </div>

                <div className="mx-auto grid max-w-[1020px] grid-cols-2 gap-5 sm:gap-7 md:grid-cols-3 md:gap-7">
                    {services.map((service, index) => (
                        <article
                            key={service.id}
                            className={`w-full bg-transparent pb-5 anim-fade-up ${index === 0 ? "anim-delay-1" : index === 1 ? "anim-delay-2" : "anim-delay-3"}`}
                        >
                            <Link href={`/services/${service.id}`} aria-label={`Open ${service.name} service`} className="block">
                                <div className="anim-hover-lift relative aspect-[3/3] w-full overflow-hidden bg-[#e8dfd7] md:aspect-[4/5]">
                                    <div className="relative w-[80%] h-[80%] mx-auto mt-[12.5%]">
                                        <Image
                                            src={resolveCatalogImage(service.image)}
                                            alt={service.name}
                                            fill
                                            sizes="(max-width: 768px) 80vw, 33vw"
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </Link>
                            <div className="pt-3">
                                <h3 className="font-serif text-[1.95rem] sm:text-[1.65rem] leading-[1.05] text-[#2f251d]">{service.name}</h3>
                                <p className="mt-2 text-[13px] sm:text-[11px] leading-[1.65] text-[#6f655b]">
                                    {service.description}
                                </p>
                                <Link
                                    href={`/services/${service.id}`}
                                    className="mt-3 inline-block text-[11px] sm:text-[10px] uppercase tracking-[0.12em] text-[#7e5e42] underline underline-offset-4 hover:text-[#5f432c]"
                                >
                                    View Products
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}