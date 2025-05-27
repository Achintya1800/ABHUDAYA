import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <div className="w-24">
              <Skeleton className="h-10" />
            </div>
            <div className="flex-1">
              <Skeleton className="h-10" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="p-4">
                  <Skeleton className="h-6 w-full mb-2" />
                  <div className="space-y-2">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <Skeleton key={j} className="h-4 w-full" />
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-10 w-[180px]" />
            </div>

            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Card key={i} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <div className="flex gap-2 pt-2">
                        {Array.from({ length: 4 }).map((_, j) => (
                          <Skeleton key={j} className="h-6 w-16" />
                        ))}
                      </div>
                    </div>
                    <Skeleton className="h-8 w-8" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

