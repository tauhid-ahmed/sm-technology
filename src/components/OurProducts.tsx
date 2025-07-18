"use client";

import leafImage from "@/assets/leaf.png";
import {
  useGetAllCategoriesQuery,
  useGetProductsQuery,
} from "@/store/services/productApi";
import Image from "next/image";
import { useState } from "react";
import Badge from "./Badge";
import Button from "./Button";
import Container from "./Container";
import Heading from "./Heading";
import ProductCard from "./ProductCard";
import Section from "./Section";
import ProductSkeleton from "./ProductSkeleton";

const VISIBLE_PRODUCTS = 8;

const tabs = [
  {
    name: "All",
    query: "all",
  },
  {
    name: "Fruits",
    query: "fruits",
  },
  {
    name: "Vegetables",
    query: "vegetables",
  },
  {
    name: "Salad",
    query: "salad",
  },
];

export default function OurProducts() {
  const [activeTab, setActiveTab] = useState(tabs[0].query);
  const { data: products, isLoading } = useGetProductsQuery();
  const { data: categories } = useGetAllCategoriesQuery();
  const categoryMap = Object.fromEntries(
    (categories?.data ?? []).map((cat) => [cat.id, cat.categoryName])
  );
  const [visibleProducts, setVisibleProducts] = useState(VISIBLE_PRODUCTS);

  const productsData = (products?.data ?? [])
    .slice(0, visibleProducts)
    .map((product) => ({
      ...product,
      categoryName: categoryMap[product.categoryId] ?? "Unknown",
    }));

  const filteredProducts = productsData.filter((product) => {
    if (activeTab === "all") return product;
    return product.categoryName.toLowerCase() === activeTab;
  });

  const toggleVisibleProducts =
    visibleProducts === VISIBLE_PRODUCTS ? -1 : VISIBLE_PRODUCTS;

  return (
    <Section id="shop" className="z-10 relative">
      <Container className="py-10 lg:py-24 relative">
        <Image
          className="block w-16 h-auto absolute left-0 top-3/4"
          src={leafImage}
          alt="Leaf"
        />
        <Image
          className="block w-16 h-auto absolute right-0 top-1/4 -rotate-45"
          src={leafImage}
          alt="Leaf"
        />
      </Container>
      <Container size="xs">
        <div className="space-y-4 text-center">
          <Badge>Our Products</Badge>
          <Heading className="tracking-tight" as="h2" size="h2">
            Our Fresh Products
          </Heading>
          <p className="text-sm">
            We pride ourselves on offering a wide variety of fresh and flavorful
            fruits, vegetables, and salad ingredients.
          </p>
          <ul className="flex gap-1 justify-between">
            {tabs.map((tab) => (
              <li key={tab.name}>
                <Button
                  onClick={() => setActiveTab(tab.query)}
                  size="sm"
                  variant="success"
                  tone={activeTab === tab.query ? "default" : "outline"}
                >
                  {tab.name}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      {isLoading ? (
        <ProductSkeleton />
      ) : (
        <Container>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6  mt-6 lg:mt-8">
            {filteredProducts.length === 0
              ? "No products found"
              : filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
          <div className="text-center mt-6 lg:mt-8">
            <Button
              disabled={!productsData.length}
              onClick={() => setVisibleProducts(() => toggleVisibleProducts)}
              variant="primary"
              tone="outline"
            >
              {toggleVisibleProducts === VISIBLE_PRODUCTS
                ? "See less products"
                : "See all products"}
            </Button>
          </div>
        </Container>
      )}
    </Section>
  );
}
