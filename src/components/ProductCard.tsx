"use client";

import Image from "next/image";

import Link from "next/link";
import Button from "./Button";
import { Product } from "@/types/product";
import useAuthGuard from "@/hooks/useAuthGuard";
import { addToCart, showAuthForm } from "@/store/slices/appSlice";
import { useDispatch } from "react-redux";

export default function ProductCard({ product }: { product: Product }) {
  const { user } = useAuthGuard();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (!user) return dispatch(showAuthForm());
    dispatch(addToCart({ productId: product.id }));
  };

  return (
    <div className="pt-2.5 pb-5 px-4 shadow-lg/5 overflow-hidden rounded-[1.25rem] group relative space-y-3">
      <div className="bg-color-gray-20 mx-auto w-[258px] h-[208px] overflow-hidden rounded-2xl">
        <Image
          src={product.images[0]}
          alt={product.productName}
          width={258}
          height={208}
          className="size-full object-cover group-hover:scale-110 duration-300"
        />
      </div>
      <div className="text-center">
        <h3 className="text-body-2 font-rubik font-medium">
          <Link
            className="after:absolute after:inset-0"
            href={`/product/${product.id}`}
          >
            {product.productName}
          </Link>
        </h3>
        <span className="text-color-gray-100 text-body-2 block mt-2">
          ${product.price}/kg
        </span>
        <Button
          onClick={handleAddToCart}
          variant="primary"
          tone="outline"
          size="sm"
          className="w-full relative z-10 mt-3 border-color-gray-50 text-color-black"
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
}
