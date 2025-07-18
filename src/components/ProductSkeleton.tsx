import Container from "./Container";

export default function ProductSkeleton({ length = 8 }) {
  return (
    <Container>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6  mt-6 lg:mt-8">
        {Array.from({ length: length }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </Container>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="w-full max-w-xs overflow-hidden rounded-lg shadow-sm animate-pulse bg-white border border-gray-200">
      {/* Image Placeholder */}
      <div className="relative h-48 w-full bg-color-gray-50 rounded-t-lg" />

      {/* Content Placeholder */}
      <div className="p-4 space-y-3">
        <div className="h-6 bg-color-gray-50 rounded w-3/4" />
        <div className="h-4 bg-color-gray-50 rounded w-1/2" />
      </div>

      {/* Button Placeholder */}
      <div className="p-4 pt-0">
        <div className="h-10 bg-color-gray-50 rounded-md w-full" />
      </div>
    </div>
  );
}
