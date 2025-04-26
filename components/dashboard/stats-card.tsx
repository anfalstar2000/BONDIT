"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface StatsCardProps {
  title: string
  value: string | number
  icon: string
  iconAlt?: string
  trend?: number
  trendLabel?: string
  className?: string
  onClick?: () => void
}

export function StatsCard({
  title,
  value,
  icon,
  iconAlt = "icon",
  trend,
  trendLabel,
  className,
  onClick,
}: StatsCardProps) {
  return (
    <Card
      className={cn(
        "bg-white shadow-sm rounded-3xl border border-gray-100 hover:shadow-md transition-shadow cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-medium text-gray-500">{title}</h2>
            <p className="text-3xl font-bold mt-2">{value}</p>
            {trend && trendLabel && (
              <div className="flex items-center mt-2">
                <span className={`text-sm ${trend > 0 ? "text-blue-500" : "text-gray-500"}`}>
                  {trend > 0 ? "+" : ""}
                  {trend}%
                </span>
                <span className="text-sm text-gray-500 mr-1">{trendLabel}</span>
              </div>
            )}
          </div>
          <Image src={icon || "/placeholder.svg"} alt={iconAlt} width={24} height={24} className="text-[#C4C4C4]" />
        </div>
      </CardContent>
    </Card>
  )
}
