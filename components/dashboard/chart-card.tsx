"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SalesChart } from "@/components/sales-chart"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ChartCardProps {
  title: string
  icon: string
  iconAlt?: string
  className?: string
}

export function ChartCard({ title, icon, iconAlt = "icon", className }: ChartCardProps) {
  const [chartPeriod, setChartPeriod] = useState<"أسبوعي" | "شهري" | "سنوي">("أسبوعي")

  return (
    <Card className={cn("bg-white shadow-sm hover:shadow-md transition-shadow", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2 rounded-full">
              <Image src={icon || "/placeholder.svg"} alt={iconAlt} width={20} height={20} />
            </div>
            <h2 className="text-lg font-medium">{title}</h2>
          </div>
          <Tabs
            defaultValue="أسبوعي"
            value={chartPeriod}
            onValueChange={(value) => setChartPeriod(value as "أسبوعي" | "شهري" | "سنوي")}
          >
            <TabsList className="bg-gray-100">
              <TabsTrigger
                value="أسبوعي"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-colors"
              >
                أسبوعي
              </TabsTrigger>
              <TabsTrigger
                value="شهري"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-colors"
              >
                شهري
              </TabsTrigger>
              <TabsTrigger
                value="سنوي"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-colors"
              >
                سنوي
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <SalesChart period={chartPeriod === "أسبوعي" ? "weekly" : chartPeriod === "شهري" ? "monthly" : "yearly"} />
      </CardContent>
    </Card>
  )
}
