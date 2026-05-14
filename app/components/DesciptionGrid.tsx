"use client";


import Image from "next/image";
export default function DesciptionGrid() {
	return (
		<section className="w-full bg-[#b1aaa0] py-14 flex flex-col items-center">
			<h2 className="text-3xl md:text-2xl font-serif text-white mb-2 text-center font-semibold">Discover Your Natural Glow</h2>
			<p className="text-white text-lg md:text-base mb-6 text-center font-light">Transform your skincare routine with our pure, eco-friendly ingredients.</p>
			<div className="w-full max-w-3xl flex flex-col items-center">
				<div className="w-full border-t border-[#cfc7bb] mb-8"></div>
				<div className="w-full flex flex-row justify-center items-start gap-8 md:gap-4">
					{/* Organic Ingredients */}
					<div className="flex flex-col items-center flex-1 min-w-[100px]">
						<svg width="48" height="48" fill="none" viewBox="0 0 48 48" className="mb-2" aria-label="natural-ingredients" role="img">
							<title>Natural Ingredients</title>
							<path d="M12 36c0-13.255 10.745-24 24-24v0c0 13.255-10.745 24-24 24z" stroke="white" strokeWidth="2"/>
							<path d="M18 34c0-7.732 6.268-14 14-14" stroke="white" strokeWidth="2"/>
						</svg>
						<span className="text-white text-base font-medium mt-1">Organic Ingredients</span>
					</div>
					<div className="h-16 w-px bg-[#cfc7bb] mx-2 hidden sm:block"></div>
					{/* Paraben Free */}
					<div className="flex flex-col items-center flex-1 min-w-[100px]">
						<svg width="48" height="48" fill="none" viewBox="0 0 48 48" className="mb-2"><ellipse cx="24" cy="24" rx="12" ry="18" stroke="white" strokeWidth="2"/><circle cx="24" cy="32" r="2" fill="white"/></svg>
						<span className="text-white text-base font-medium mt-1">Paraben Free</span>
					</div>
					<div className="h-16 w-px bg-[#cfc7bb] mx-2 hidden sm:block"></div>
					{/* Cruelty Free */}
					<div className="flex flex-col items-center flex-1 min-w-[100px]">
						<svg width="48" height="48" fill="none" viewBox="0 0 48 48" className="mb-2"><path d="M38 34c2-2 2-6-2-8-2-1-4-1-6 0-2 1-4 3-4 6v2" stroke="white" strokeWidth="2"/><ellipse cx="16" cy="34" rx="4" ry="2" stroke="white" strokeWidth="2"/><ellipse cx="32" cy="18" rx="6" ry="4" stroke="white" strokeWidth="2"/><circle cx="36" cy="16" r="1" fill="white"/></svg>
						<span className="text-white text-base font-medium mt-1">Cruelty Free</span>
					</div>
				</div>
			</div>
		</section>
	);
}
