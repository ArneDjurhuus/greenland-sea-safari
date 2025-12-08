import { Skeleton } from "@/components/ui/Skeleton";

export default function TourLoading() {
    return (
        <div className="min-h-screen pt-20">
            {/* Hero Skeleton */}
            <div className="relative h-[60vh] w-full">
                <Skeleton className="absolute inset-0 rounded-none" />
                <div className="absolute inset-0 flex items-end p-8">
                    <div className="container mx-auto">
                        <Skeleton className="h-12 w-2/3 mb-4" />
                        <Skeleton className="h-6 w-1/2 mb-2" />
                        <Skeleton className="h-6 w-1/3" />
                    </div>
                </div>
            </div>

            {/* Content Skeleton */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="space-y-4">
                            <Skeleton className="h-8 w-48" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>

                        <div className="space-y-4">
                            <Skeleton className="h-8 w-40" />
                            <div className="grid grid-cols-2 gap-4">
                                {[...Array(4)].map((_, i) => (
                                    <Skeleton key={i} className="h-12 w-full" />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        <Skeleton className="h-64 w-full rounded-xl" />
                        <Skeleton className="h-12 w-full rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
}
