import { Skeleton } from "../ui/skeleton";


export default function SkeletonLoader() {
  return (
    <div className="flex flex-col space-y-3 bg-muted px-4 md:px-6 py-3 md:py-4">
      <div className="flex justify-start items-center gap-2">
        <Skeleton className="w-6 h-6 rounded-full inline-block" />

        <div className="space-y-1 flex-1">
          <Skeleton className="h-3 max-w-44" />
          <Skeleton className="h-2 max-w-24" />
        </div>
      </div>
      <div className="space-y-1">
        <Skeleton className="h-1 max-w-lg" />
        <Skeleton className="h-1 max-w-28" />
      </div>
    </div>
  );
}


