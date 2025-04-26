"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PackageCardProps {
  title: string
  description?: string
  icon?: string
  iconAlt?: string
  buttonText: string
  className?: string
  onClick?: () => void
}

export function PackageCard({
  title,
  description,
  icon,
  iconAlt = "icon",
  buttonText,
  className,
  onClick,
}: PackageCardProps) {
  return (
    <Card
      className={cn(
        "bg-white shadow-md border-2 border-gray-200 hover:shadow-lg transition-shadow overflow-hidden",
        className,
      )}
    >
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="text-sm font-medium text-gray-700 mb-6 self-end">{title}</div>

        <h2 className="text-3xl font-bold mb-4">النمو</h2>

        <div className="text-sm text-gray-500 mb-8">التجديد القادم 28 يونيو 2025</div>

        <Button
          className="bg-blue-600 hover:bg-blue-700 transition-colors px-8 py-2 rounded-full w-3/4 font-medium text-white"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  )
}
