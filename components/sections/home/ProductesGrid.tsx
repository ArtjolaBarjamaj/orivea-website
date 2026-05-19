import React from "react";

const bestSellers = [
  {
    title: "Elixora Hydra-Serum",
    price: "$48.00",
    image: "/Fassi_Powder.png", // Replace with your actual image paths
    rating: 5,
  },
  {
    title: "Luxe Glow Cream",
    price: "$55.00",
    image: "/Tbrima_Mask.png",
    rating: 5,
  },
  {
    title: "Lip Tint",
    price: "$24.00",
    image: "/Aker_Fassi_Mask.png",
    rating: 5,
  },
  {
    title: "Lip Tint Rec Cream",
    price: "$24.00",
    image: "/Nila_Mask.png",
    rating: 5,
  },
];

const BestSellersGrid = () => {
  return (
    <section className="py-20 px-8 bg-[#b1aaa0] shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-8 text-white">Our Productes</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 justify-items-center py-8">
        {bestSellers.map((product, idx) => (
          <div
            key={product.title}
            className="bg-[#eeebe5] rounded-2xl shadow-lg px-4 md:px-10 py-3 w-full max-w-[170px] md:max-w-[240px] flex flex-col items-center border border-gray-100 hover:shadow-xl transition-shadow relative"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-24 h-24 md:w-40 md:h-40 object-cover rounded-lg mb-4 mt-6"
            />
            <div className="text-center">
              <h3 className="text-sm md:text-lg font-medium text-gray-700 mb-1">{product.title}</h3>
              <div className="text-primary text-sm md:text-base font-semibold mb-1">{product.price}</div>
              <button
                className="bg-[#b1aaa0] text-[#4b3f2d] px-3 md:px-5 py-2 rounded-full text-xs md:text-sm font-semibold shadow-md hover:bg-[#a89e91] hover:text-[#2d261a] transition-colors duration-200 border border-[#d6d1c7] mt-2"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <button
          className="bg-white text-[#4b3f2d] px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-[#e5e1db] hover:text-[#2d261a] transition-colors duration-200 border border-[#d6d1c7]"
          // TODO: Add navigation logic here if needed
        >
          View All Productes
        </button>
      </div>
    </section>
  );
};

export default BestSellersGrid;