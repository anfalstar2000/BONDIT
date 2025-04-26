"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface MarketingCardProps {
  title: string
  icon: string
  iconAlt?: string
  className?: string
}

export function MarketingCard({ title, icon, iconAlt = "icon", className }: MarketingCardProps) {
  const router = useRouter()

  return (
    <Card
      className={cn(
        "bg-white shadow-sm rounded-3xl border border-gray-100 hover:shadow-md transition-shadow",
        className,
      )}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Image src={icon || "/placeholder.svg"} alt={iconAlt} width={20} height={20} className="text-[#C4C4C4]" />
            <h2 className="text-lg font-medium">{title}</h2>
          </div>
          <Button
            variant="ghost"
            className="text-blue-500 hover:bg-blue-50 transition-colors"
            onClick={() => router.push("/marketing")}
          >
            المزيد
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">رصيد الرسائل النصية</span>
              <span className="text-sm font-medium">500 / 1000</span>
            </div>
            <Progress value={50} className="h-2 bg-gray-100" indicatorClassName="bg-blue-500" />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">رصيد رسائل البريد الإلكتروني</span>
              <span className="text-sm font-medium">2500 / 5000</span>
            </div>
            <Progress value={50} className="h-2 bg-gray-100" indicatorClassName="bg-blue-500" />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">رصيد الإشعارات</span>
              <span className="text-sm font-medium">750 / 1000</span>
            </div>
            <Progress value={75} className="h-2 bg-gray-100" indicatorClassName="bg-blue-500" />
          </div>

          <div className="flex justify-center">
            <Button
              className="bg-blue-500 hover:bg-blue-600 transition-colors"
              onClick={() => router.push("/marketing")}
            >
              شراء رصيد إضافي
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
