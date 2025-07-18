import Container from "../shared/Container";

export default function ProductDetailSkeleton() {
  return (
    <Container>
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Image Placeholder */}
        <div className="relative h-[400px] w-full bg-color-gray-50 rounded-lg" />

        {/* Product Details Placeholder */}
        <div className="space-y-6">
          {/* Category Tag */}
          <div className="h-6 w-24 bg-color-gray-50 rounded-md" />
          {/* Product Name */}
          <div className="h-10 w-3/4 bg-color-gray-50 rounded-md" />
          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="h-5 w-24 bg-color-gray-50 rounded-md" />
            <div className="h-5 w-20 bg-color-gray-50 rounded-md" />
          </div>
          {/* Price */}
          <div className="h-8 w-1/3 bg-color-gray-50 rounded-md" />
          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 bg-color-gray-50 rounded-md w-full" />
            <div className="h-4 bg-color-gray-50 rounded-md w-full" />
            <div className="h-4 bg-color-gray-50 rounded-md w-5/6" />
            <div className="h-4 bg-color-gray-50 rounded-md w-full" />
            <div className="h-4 bg-color-gray-50 rounded-md w-3/4" />
          </div>
          {/* Quantity Selector */}
          <div className="flex items-center space-x-2">
            <div className="h-10 w-24 bg-color-gray-50 rounded-md" />
            <div className="h-10 w-16 bg-color-gray-50 rounded-md" />
            <div className="h-10 w-10 bg-color-gray-50 rounded-md" />
          </div>
          {/* Buttons */}
          <div className="flex space-x-4">
            <div className="h-12 w-40 bg-color-gray-50 rounded-md" />
            <div className="h-12 w-40 bg-color-gray-50 rounded-md" />
          </div>
        </div>
      </div>

      {/* Tabs and Description/Reviews Placeholder */}
      <div className="mt-12">
        <div className="flex space-x-4 border-b border-gray-200 pb-2">
          <div className="h-8 w-28 bg-color-gray-50 rounded-md" />
          <div className="h-8 w-28 bg-color-gray-50 rounded-md" />
        </div>
        <div className="mt-6 space-y-2">
          <div className="h-4 bg-color-gray-50 rounded-md w-full" />
          <div className="h-4 bg-color-gray-50 rounded-md w-full" />
          <div className="h-4 bg-color-gray-50 rounded-md w-5/6" />
          <div className="h-4 bg-color-gray-50 rounded-md w-full" />
          <div className="h-4 bg-color-gray-50 rounded-md w-3/4" />
        </div>
      </div>
    </Container>
  );
}
