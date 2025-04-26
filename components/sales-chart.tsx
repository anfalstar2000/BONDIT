"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

interface SalesChartProps {
  period: "weekly" | "monthly" | "yearly"
}

export function SalesChart({ period }: SalesChartProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // بيانات وهمية للرسم البياني
  const weeklyData = [
    { name: "يوليو 25", total: 1200 },
    { name: "يوليو 26", total: 2100 },
    { name: "يوليو 27", total: 1800 },
    { name: "يوليو 28", total: 2400 },
    { name: "يوليو 29", total: 1900 },
    { name: "يوليو 30", total: 2800 },
    { name: "يوليو 31", total: 2200 },
    { name: "أغسطس 1", total: 2500 },
    { name: "أغسطس 2", total: 2300 },
    { name: "أغسطس 3", total: 2900 },
  ]

  const monthlyData = [
    { name: "يناير", total: 15000 },
    { name: "فبراير", total: 18000 },
    { name: "مارس", total: 22000 },
    { name: "أبريل", total: 19000 },
    { name: "مايو", total: 25000 },
    { name: "يونيو", total: 28000 },
    { name: "يوليو", total: 32000 },
    { name: "أغسطس", total: 30000 },
    { name: "سبتمبر", total: 35000 },
    { name: "أكتوبر", total: 38000 },
    { name: "نوفمبر", total: 42000 },
    { name: "ديسمبر", total: 45000 },
  ]

  const yearlyData = [
    { name: "2020", total: 250000 },
    { name: "2021", total: 320000 },
    { name: "2022", total: 380000 },
    { name: "2023", total: 420000 },
    { name: "2024", total: 480000 },
    { name: "2025", total: 520000 },
  ]

  const data = period === "weekly" ? weeklyData : period === "monthly" ? monthlyData : yearlyData

  if (!isClient) {
    return <div className="h-[300px] flex items-center justify-center">جاري تحميل الرسم البياني...</div>
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          formatter={(value) => [`${value} ريال`, "المبيعات"]}
          labelFormatter={(label) => `${label}`}
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "0.375rem",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            textAlign: "right",
            direction: "rtl",
          }}
        />
        <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} animationDuration={1000} />
      </BarChart>
    </ResponsiveContainer>
  )
}
