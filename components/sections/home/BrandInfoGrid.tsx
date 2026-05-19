"use client";


import Image from "next/image";

export default function BrandInfoGrid() {
	return (
		<section className="w-full bg-[#f5f3ef] py-15 flex justify-center items-center min-h-[480px]">
			<div className="w-full max-w-6xl flex flex-col md:flex-row h-full min-h-[480px]  overflow-hidden">
				{/* Djathtas: Fotoja */}
				<div className="flex-1 flex justify-center items-center relative min-h-[320px] p-8">
					<Image
						src="/individual photo.png"
						alt="Orivea Founder"
						width={600}
						height={420}
						className="rounded-xl shadow-xl object-cover max-h-[420px] w-[400px] z-10"
						priority
					/>
				</div>
				{/* Majtas: Teksti dhe përmbajtja ekzistuese */}
				<div className="flex-1 flex flex-col justify-center items-center md:items-start bg-[#f8f4f1] px-8 py-16 md:py-0">
					<h3 className="text-2xl font-serif text-[#7c6c5c] mb-4 font-semibold">About Orivea</h3>
					<p className="text-[#7c6c5c] text-lg font-light leading-relaxed mb-8 max-w-md text-center md:text-left">
						Orivea është një brand i dedikuar për kujdesin natyral të lëkurës, i frymëzuar nga natyra dhe traditat më të mira të përkujdesjes. Produktet tona janë të formuluara me përbërës organikë, pa parabene dhe të pa testuara në kafshë, për një rutinë të pastër, të sigurt dhe të qëndrueshme. Zbulo bukurinë natyrale me Orivea.
					</p>
				</div>
			</div>
		</section>
	);
}
