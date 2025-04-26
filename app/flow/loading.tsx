import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto p-6 space-y-6 rtl">
      <Skeleton className="h-10 w-[250px]" />

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-[250px] mb-2" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent>
          <div className="h-[600px] w-full bg-gray-100 rounded-md flex items-center justify-center">
            <div className="text-gray-400">جاري تحميل منشئ المسارات...</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
