import { Skeleton } from "@/components/ui/skeleton";

export const ProductCardSkeleton = () => (
  <div className="py-1">
    <div className="flex gap-2">
      <Skeleton className="min-w-32 h-32 rounded" /> {/* Image placeholder */}
      <div className="flex w-full flex-col justify-between">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-5 w-3/4" /> {/* Title */}
          <Skeleton className="h-4 w-full" /> {/* Description line 1 */}
          <Skeleton className="h-4 w-2/3" /> {/* Description line 2 */}
          <Skeleton className="h-4 w-2/3" /> {/* Description line 3 */}
        </div>
        <div className="flex justify-start">
          <Skeleton className="h-9 w-24" /> {/* Price button */}
        </div>
      </div>
    </div>
  </div>
);

export const CategorySkeleton = () => (
  <div className="flex flex-col gap-2">
    <Skeleton className="h-5 w-24 mt-2" />
    {[1, 2, 3].map((i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export const CatalogSkeleton = () => (
  <div className="gap-4 w-full flex flex-col pb-10 justify-start px-2">
    {[1, 2, 3].map((i) => (
      <CategorySkeleton key={i} />
    ))}
  </div>
);
