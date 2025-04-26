"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

// Datos de ejemplo para el gráfico
const chartData = [
  { date: "مايو 25", value: 70 },
  { date: "مايو 27", value: 85 },
  { date: "مايو 30", value: 60 },
  { date: "يوليو 1", value: 55 },
  { date: "يوليو 2", value: 50 },
  { date: "يوليو 3", value: 45 },
  { date: "يوليو 4", value: 65 },
  { date: "يوليو 5", value: 55 },
  { date: "يوليو 6", value: 50 },
  { date: "يوليو 7", value: 75 },
]

export function ImprovedStatisticsCard() {
  const [period, setPeriod] = useState<"أسبوعي" | "شهري" | "سنوي">("أسبوعي")

  return (
    <Card className="bg-white shadow-sm rounded-3xl border border-gray-100 h-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 19L8 12L15 5"
                  stroke="#858585"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 5L16 12L9 19"
                  stroke="#858585"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <h2 className="text-lg font-medium">إحصائيات</h2>
        </div>

        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col gap-2">
            <button
              className={`px-4 py-1.5 rounded-full text-sm ${period === "أسبوعي" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500"}`}
              onClick={() => setPeriod("أسبوعي")}
            >
              أسبوعي
            </button>
            <button
              className={`px-4 py-1.5 rounded-full text-sm ${period === "شهري" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500"}`}
              onClick={() => setPeriod("شهري")}
            >
              شهري
            </button>
            <button
              className={`px-4 py-1.5 rounded-full text-sm ${period === "سنوي" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500"}`}
              onClick={() => setPeriod("سنوي")}
            >
              سنوي
            </button>
          </div>

          <div className="flex flex-col items-end gap-4">
            <div className="text-right">
              <div className="text-blue-500 text-sm mb-1">الربح</div>
              <div className="text-3xl font-bold text-blue-500">0000</div>
            </div>
            <div className="text-right">
              <div className="text-gray-500 text-sm mb-1">الدخل</div>
              <div className="text-3xl font-bold">0000</div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="mt-4">
          <div className="flex items-end justify-between h-32">
            {chartData.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-2 bg-blue-500 rounded-full"
                  style={{
                    height: `${item.value}%`,
                    maxHeight: "100%",
                  }}
                ></div>
                <div className="text-xs text-gray-400 mt-2">{item.date}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
