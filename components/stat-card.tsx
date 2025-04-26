"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ArrowUp, ArrowDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number | React.ReactNode
  icon: string
  iconAlt?: string
  trend?: number
  trendLabel?: string
  className?: string
  onClick?: () => void
}

export function StatCard({
  title,
  value,
  icon,
  iconAlt = "icon",
  trend,
  trendLabel,
  className,
  onClick,
}: StatCardProps) {
  return (
    <Card className={cn("border border-gray-200 bg-white cursor-pointer rounded-[24px]", className)} onClick={onClick}>
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div className="text-right">
            <h2 className="text-sm font-normal text-gray-500 mb-1">{title}</h2>
            <p className="text-2xl font-normal text-gray-700">{value}</p>
            {trend !== undefined && trendLabel && (
              <div className="flex items-center mt-2 justify-end">
                {trend > 0 ? (
                  <ArrowUp className="h-3 w-3 text-blue-500 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 text-gray-500 mr-1" />
                )}
                <span className={`text-xs ${trend > 0 ? "text-blue-500" : "text-gray-500"}`}>
                  {trend > 0 ? "+" : ""}
                  {trend}%
                </span>
                <span className="text-xs text-gray-500 mr-1">{trendLabel}</span>
              </div>
            )}
          </div>
          <div className="bg-gray-100 p-2 rounded-full">
            <Image
              src={icon || "/icons/engagement-icon.png"}
              alt={iconAlt}
              width={20}
              height={20}
              className="text-gray-400"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
