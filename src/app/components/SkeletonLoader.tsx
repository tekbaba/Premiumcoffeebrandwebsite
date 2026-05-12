import { motion } from "motion/react";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string;
  height?: string;
}

export function Skeleton({
  className = "",
  variant = "rectangular",
  width = "100%",
  height = "20px"
}: SkeletonProps) {
  const baseClasses = "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer";

  const variantClasses = {
    text: "rounded",
    circular: "rounded-full",
    rectangular: "rounded-lg"
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{ width, height }}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-[var(--radius-2xl)] overflow-hidden border border-[var(--border)] p-4">
      <Skeleton height="240px" className="mb-4" />
      <div className="space-y-3">
        <Skeleton height="12px" width="60%" />
        <Skeleton height="20px" width="80%" />
        <Skeleton height="16px" width="40%" />
        <div className="flex gap-2 mt-4">
          <Skeleton height="28px" width="60px" />
          <Skeleton height="28px" width="60px" />
          <Skeleton height="28px" width="60px" />
        </div>
        <div className="flex justify-between items-center mt-4">
          <Skeleton height="24px" width="80px" />
          <Skeleton variant="circular" width="40px" height="40px" />
        </div>
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen px-5 md:px-20" style={{ paddingTop: "calc(var(--navbar-height) + var(--spacing-8))" }}>
      <div className="max-w-[var(--container-max)] mx-auto">
        <Skeleton height="20px" width="120px" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Skeleton */}
          <Skeleton height="600px" />

          {/* Details Skeleton */}
          <div className="space-y-6">
            <div className="flex gap-3">
              <Skeleton height="28px" width="100px" />
              <Skeleton height="28px" width="100px" />
            </div>
            <Skeleton height="48px" width="70%" />
            <Skeleton height="60px" width="40%" />
            <div className="space-y-2">
              <Skeleton height="20px" width="30%" />
              <div className="flex gap-2">
                <Skeleton height="36px" width="80px" />
                <Skeleton height="36px" width="80px" />
                <Skeleton height="36px" width="80px" />
              </div>
            </div>
            <Skeleton height="100px" />
            <Skeleton height="56px" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShopSkeleton() {
  return (
    <div className="min-h-screen px-5 md:px-20" style={{ paddingTop: "calc(var(--navbar-height) + var(--spacing-12))" }}>
      <div className="max-w-[var(--container-max)] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Skeleton height="48px" width="300px" className="mx-auto mb-4" />
          <Skeleton height="20px" width="500px" className="mx-auto" />
        </div>

        {/* Filters */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Skeleton height="20px" width="80px" className="mb-3" />
            <div className="flex gap-2">
              <Skeleton height="36px" width="80px" />
              <Skeleton height="36px" width="100px" />
              <Skeleton height="36px" width="90px" />
            </div>
          </div>
          <div>
            <Skeleton height="20px" width="120px" className="mb-3" />
            <div className="flex gap-2">
              <Skeleton height="36px" width="70px" />
              <Skeleton height="36px" width="90px" />
              <Skeleton height="36px" width="80px" />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
