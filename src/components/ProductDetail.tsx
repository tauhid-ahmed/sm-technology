"use client";
import {
  useGetCategoryQuery,
  useGetProductQuery,
} from "@/store/services/productApi";
import { Product } from "@/types/product";
import Container from "./Container";
import Section from "./Section";
import Image from "next/image";
import Button from "./Button";
import {
  LucideShoppingCart,
  LucideHeart,
  LucideStar,
  LucideMinus,
  LucidePlus,
} from "lucide-react";
import Badge from "./Badge";
import Heading from "./Heading";
import { useState } from "react";
import RelatedProducts from "./RelatedProducts";
import { useDispatch } from "react-redux";
import { addToCart, showAuthForm } from "@/store/slices/appSlice";
import useAuthGuard from "@/hooks/useAuthGuard";

export default function ProductDetail({ productId }: { productId: string }) {
  const { data: product, isLoading } = useGetProductQuery(productId);
  const [quantity, setQuantity] = useState(1);
  const productData: Product = product?.data ?? ({} as Product);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Section className="py-8">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12">
          <ImageGallery productData={productData} />
          <div className="flex flex-col justify-between h-full">
            <ProductInfo productData={productData} />
            <div className="mt-10">
              <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
              <AddToCart
                productId={productData.id}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            </div>
          </div>
        </div>
        <ProductExtraInfo productData={productData} />
      </Container>
      <div className="py-16 lg:py-[7.5rem]">
        <RelatedProducts />
      </div>
    </Section>
  );
}

function ImageGallery({ productData }: { productData: Product }) {
  return (
    <div className="bg-color-gray-20 max-h-96 lg:min-h-[550px] lg:max-h-[570px] h-full w-full max-w-2xl mx-auto border border-color-gray-50 rounded overflow-hidden">
      <Image
        src={productData.images[0]}
        alt={productData.productName}
        width={500}
        height={500}
        className="size-full object-contain"
      />
    </div>
  );
}

function ProductQuantity({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: (quantity: number) => void;
}) {
  return (
    <div className="flex items-center">
      <span className="mr-4 font-rubik text-body-2 font-semibold text-color-black">
        Quantity
      </span>
      <div className="inline-flex border border-color-gray-50 rounded mr-2">
        <Button
          className="focus:ring-transparent [&>svg]:size-3.5"
          variant="secondary"
          tone="link"
          size="icon"
          onClick={() => {
            if (quantity > 1) {
              setQuantity(quantity - 1);
            }
          }}
        >
          <LucideMinus />
        </Button>
        <span className="flex border-r border-l border-color-gray-50 items-center justify-center size-[2.6875rem] font-rubik font-semibold text-[#343434] ">
          {quantity}
        </span>
        <Button
          className="focus:ring-transparent [&>svg]:size-3.5"
          variant="secondary"
          tone="link"
          size="icon"
          onClick={() => {
            setQuantity(quantity + 1);
          }}
        >
          <LucidePlus />
        </Button>
      </div>
      /kg
    </div>
  );
}

function ProductInfo({ productData }: { productData: Product }) {
  const { data: category } = useGetCategoryQuery(productData.categoryId);
  const categoryName = category?.data?.categoryName ?? ".....";

  return (
    <div className="space-y-4">
      <Badge className="capitalize">{categoryName}</Badge>
      <Heading as="h2" size="h2">
        {productData.productName}
      </Heading>
      <ProductRating />
      <span className="inline-block font-semibold font-rubik text-color-primary text-heading-4">
        ${productData.price}/kg
      </span>
      <p className="text-color-gray-100 text-body-2 leading-snug">
        {productData.description}
      </p>
    </div>
  );
}

function AddToCart({
  productId,
  quantity,
  setQuantity,
}: {
  productId: string;
  quantity: number;
  setQuantity: (quantity: number) => void;
}) {
  const dispatch = useDispatch();
  const { user } = useAuthGuard();

  const handleAddToCart = () => {
    if (!user) return dispatch(showAuthForm());

    dispatch(addToCart({ productId, quantity }));
    setQuantity(1);
  };

  return (
    <div className="mt-10 flex flex-col md:flex-row gap-5.5 [&>*]:flex-1">
      <Button variant="secondary">
        <LucideHeart
          className="fill-color-gray-50! stroke-color-gray-50!"
          size={20}
        />
        Save as favorite
      </Button>
      <Button onClick={handleAddToCart}>
        <LucideShoppingCart /> Add to cart
      </Button>
    </div>
  );
}

function ProductRating() {
  return (
    <div className="flex gap-2 items-center">
      <span className="flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <LucideStar
            className="fill-yellow-500 stroke-yellow-500"
            size={14}
            key={i}
          />
        ))}
      </span>
      <span className="ml-2 text-color-gray-100 font-rubik font-medium text-body-2">
        5.0 (1 review)
      </span>
    </div>
  );
}

function ProductExtraInfo({ productData }: { productData: Product }) {
  const [tab, setTab] = useState("description");
  return (
    <div className="mt-16 max-w-[57.3rem]">
      <div className="space-x-6">
        <Button
          size="sm"
          variant="success"
          tone={tab === "description" ? "default" : "outline"}
          onClick={() => setTab("description")}
        >
          Description
        </Button>
        <Button
          size="sm"
          variant="success"
          tone={tab === "reviews" ? "default" : "outline"}
          onClick={() => setTab("reviews")}
        >
          Reviews (1)
        </Button>
      </div>
      <div className="bg-color-gray-20 rounded-[24px] px-8 py-10 mt-6 text-body-2 leading-snug">
        {tab === "description" && <p>{productData.description}</p>}
        {tab === "reviews" && <p>Reviews</p>}
      </div>
    </div>
  );
}
