import Skeleton from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <Skeleton className="h-[280px]" />
      <Skeleton className="h-[280px]" />
      <Skeleton className="h-[280px]" />
      <Skeleton className="h-[280px]" />
      <Skeleton className="h-[280px]" />
      <Skeleton className="h-[280px]" />
    </div>
  );
}