"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Camera, ShoppingCart, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const NAV_ITEMS = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/productes", label: "Productes" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function Topbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navRef = useRef<HTMLElement | null>(null);
    const pathname = usePathname();
    const { totalItems } = useCart();
    const isHome = pathname === "/";
    const isTransparent = isHome && !isScrolled && !isOpen;

    const isActivePath = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const navClassName = (href: string, mobile = false) => {
        const sizeClass = mobile ? "text-sm sm:text-base" : "text-lg";
        const colorClass = isTransparent
            ? "text-white decoration-white"
            : "text-[#3b3129] decoration-[#8e6f50]";
        const hoverClass = isTransparent ? "hover:text-white/90" : "hover:text-[#5c4531]";
        return `${colorClass} ${hoverClass} ${sizeClass} font-light underline-offset-8 decoration-2 ${isActivePath(href)
            ? "underline"
            : "hover:underline"
            }`;
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 12);
        };

        handleScroll();

        const updateTopbarHeight = () => {
            if (!navRef.current) return;
            const height = Math.ceil(navRef.current.getBoundingClientRect().height);
            document.documentElement.style.setProperty("--topbar-height", `${height}px`);
        };

        updateTopbarHeight();

        const resizeObserver = new ResizeObserver(updateTopbarHeight);
        if (navRef.current) {
            resizeObserver.observe(navRef.current);
        }

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", updateTopbarHeight);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", updateTopbarHeight);
        };
    }, []);

    return (
        <nav
            ref={navRef}
            className={`topbar-sticky topbar-custom w-full border-b transition-all duration-300 ${isTransparent
                ? "border-transparent bg-transparent shadow-none"
                : "border-[#d9cdbf] bg-[#ece1d6]/95 shadow-[0_8px_24px_rgba(92,69,49,0.12)] backdrop-blur"
                }`}
        >
            <div className="w-full flex items-center justify-between bg-transparent px-4 py-4 sm:px-8 sm:py-4">
                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className={`topbar-menu-toggle ${isTransparent ? "!bg-transparent !border-white/60 !shadow-none" : ""}`}
                    aria-expanded={isOpen}
                    aria-controls="mobile-menu"
                    aria-label="Toggle navigation menu"
                >
                    {isOpen ? (
                        <X className={`topbar-menu-close h-5 w-5 ${isTransparent ? "text-white" : "text-[#4f4439]"}`} aria-hidden="true" />
                    ) : (
                        <>
                            <span className="topbar-menu-line" style={{ backgroundColor: isTransparent ? "#ffffff" : "#4f4439" }} />
                            <span className="topbar-menu-line" style={{ backgroundColor: isTransparent ? "#ffffff" : "#4f4439" }} />
                            <span className="topbar-menu-line" style={{ backgroundColor: isTransparent ? "#ffffff" : "#4f4439" }} />
                        </>
                    )}
                </button>
                <div className="flex items-center gap-0 min-[640px]:gap-4">
                    <Image
                        className="topbar-logo"
                        src={isTransparent ? "/white_main_logo.svg" : "/black_logo.png"}
                        alt="Orivea Logo"
                        width={90}
                        height={90}
                    />
                    <span className={`topbar-title text-3xl font-light italic tracking-widest font-serif ${isTransparent ? "text-white drop-shadow-sm" : "text-[#2f251d]"}`}>Orivea Glow</span>
                </div>
                <div className="flex items-center gap-4 sm:hidden">
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Instagram"
                            className={`${isTransparent ? "text-white/90 hover:text-white" : "text-[#4f4439] hover:text-[#2f251d]"} transition-colors`}
                        >
                            <Camera className="h-5 w-5" aria-hidden="true" />
                        </a>
                        <Link
                            href="/shporta"
                            aria-label="Shporta"
                            className={`${isTransparent ? "text-white/90 hover:text-white" : "text-[#4f4439] hover:text-[#2f251d]"} relative transition-colors`}
                        >
                            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                            {totalItems > 0 && (
                                <span className="absolute -right-2 -top-2 inline-flex min-w-4 items-center justify-center rounded-full bg-[#8e6f50] px-1 text-[9px] text-white">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                </div>

                <div className="topbar-links topbar-links-desktop px-8 gap-12 items-center self-center">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={navClassName(item.href)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="topbar-links topbar-links-desktop px-8 gap-5 items-center self-center">
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Instagram"
                        className={`${isTransparent ? "text-white/90 hover:text-white" : "text-[#4f4439] hover:text-[#2f251d]"} transition-colors`}
                    >
                        <Camera className="h-5 w-5" aria-hidden="true" />
                    </a>
                    <Link
                        href="/shporta"
                        aria-label="Shporta"
                        className={`${isTransparent ? "text-white/90 hover:text-white" : "text-[#4f4439] hover:text-[#2f251d]"} relative transition-colors`}
                    >
                        <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                        {totalItems > 0 && (
                            <span className="absolute -right-2 -top-2 inline-flex min-w-4 items-center justify-center rounded-full bg-[#8e6f50] px-1 text-[9px] text-white">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {isOpen && (
                <div id="mobile-menu" className="w-full border-t border-[#d9cdbf] bg-[#ece1d6] topbar-links topbar-links-mobile !flex-row !items-center !justify-between px-4 pb-4 pt-3">
                    <div className="flex flex-col gap-3 sm:gap-4">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                onClick={() => setIsOpen(false)}
                                href={item.href}
                                className={navClassName(item.href, true)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                </div>
            )}
        </nav>
    );
}