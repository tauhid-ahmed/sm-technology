import { ProductDetail } from "@/components";

type ProductDetailPageParams = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageParams) {
  const { id } = await params;
  return <ProductDetail productId={id} />;
}
