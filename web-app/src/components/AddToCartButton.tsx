"use client";

import { useCart } from "@/context/CartContext";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string; // Add image prop
};

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="flex-1 px-6 py-3 bg-[var(--color-primary)] text-white rounded-full transition-all duration-300 hover:bg-[#b5952f] hover:-translate-y-1 shadow-md inline-flex items-center gap-2 cursor-pointer justify-center py-4 text-lg"
    >
      <i className="fas fa-cart-plus ml-2"></i> إضافة للسلة
    </button>
  );
}
