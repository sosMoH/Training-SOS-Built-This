import { Skeleton } from "../ui/skeleton";

export default function ProductSkeleton() {
  return (
    <section className="py-20">
      <div className="wrapper space-y-12">
        
        {/* --- SECTION HEADER SKELETON --- */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Skeleton className="size-8" /> {/* Leaf Icon */}
            <Skeleton className="h-9 w-64" /> {/* "Recently Launched" */}
          </div>
          <Skeleton className="h-5 w-96 max-w-full" /> {/* Subtitle */}
        </div>

        {/* --- CARDS GRID SKELETON --- */}
        <div className="grid-wrapper">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="border rounded-xl p-6 flex flex-col justify-between min-h-[200px]">
              
              <div className="flex items-start justify-between gap-4">
                {/* Left Side: Title, Badge, and Description */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Skeleton className="h-7 w-40" /> {/* Product Name */}
                    <Skeleton className="h-6 w-24 rounded-full" /> {/* Featured Badge */}
                  </div>
                  <Skeleton className="h-4 w-3/4 max-w-[280px]" /> {/* Description */}
                </div>

                {/* Right Side: Upvote Widget Stack */}
                <div className="flex flex-col items-center gap-2">
                  <Skeleton className="size-4" /> {/* Caret Up */}
                  <Skeleton className="h-4 w-7" /> {/* Number */}
                  <Skeleton className="size-4" /> {/* Caret Down */}
                </div>
              </div>

              {/* Bottom Side: Tags */}
              <div className="flex items-center gap-2 mt-8">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>

            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}