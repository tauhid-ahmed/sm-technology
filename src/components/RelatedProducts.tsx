"use client";

import { useGetProductsQuery } from "@/store/services/productApi";
import { Product } from "@/types/product";
import Badge from "./Badge";
import Container from "./Container";
import Heading from "./Heading";
import ProductCard from "./ProductCard";
import Section from "./Section";
import ProductSkeleton from "./ProductSkeleton";

export default function RelatedProducts() {
  const { data: products, isLoading } = useGetProductsQuery();

  const productsData: Product[] = products?.data ?? [];

  const randomFourProducts = getFourRandomProducts(productsData);

  return (
    <Section>
      <Container size="xs">
        <div className="space-y-4 text-center">
          <Badge>Our Products</Badge>
          <Heading className="tracking-tight" as="h2" size="h2">
            Related Products
          </Heading>
          <p className="text-color-gray-100 text-sm">
            We pride ourselves on offering a wide variety of fresh and flavorful
            fruits, vegetables, and salad ingredients.
          </p>
        </div>
      </Container>
      {isLoading ? (
        <ProductSkeleton length={4} />
      ) : (
        <Container>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6  mt-6 lg:mt-8">
            {randomFourProducts.length === 0
              ? "No products found"
              : randomFourProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
        </Container>
      )}
    </Section>
  );
}

function getFourRandomProducts(products: Product[]): Product[] {
  if (products.length <= 4) return products;

  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4);
}
