"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

const cardUsageData = [
  { name: "يناير", apple: 65, google: 35 },
  { name: "فبراير", apple: 70, google: 40 },
  { name: "مارس", apple: 75, google: 45 },
  { name: "أبريل", apple: 80, google: 50 },
  { name: "مايو", apple: 85, google: 55 },
  { name: "يونيو", apple: 90, google: 60 },
  { name: "يوليو", apple: 95, google: 65 },
]

const cardActivationsData = [
  { name: "يناير", activations: 120 },
  { name: "فبراير", activations: 150 },
  { name: "مارس", activations: 180 },
  { name: "أبريل", activations: 220 },
  { name: "مايو", activations: 250 },
  { name: "يونيو", activations: 280 },
  { name: "يوليو", activations: 320 },
]

export function DigitalCardAnalytics() {
  const [isClient, setIsClient] = useState(false)
  const [period, setPeriod] = useState<"شهري" | "ربع سنوي" | "سنوي">("شهري")
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  if (!isClient) {
    return <div className="h-[600px] flex items-center justify-center">جاري تحميل الإحصائيات...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs
          defaultValue="شهري"
          value={period}
          onValueChange={(value) => setPeriod(value as "شهري" | "ربع سنوي" | "سنوي")}
        >
          <TabsList className="bg-gray-100">
            <TabsTrigger
              value="شهري"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-colors"
            >
              شهري
            </TabsTrigger>
            <TabsTrigger
              value="ربع سنوي"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-colors"
            >
              ربع سنوي
            </TabsTrigger>
            <TabsTrigger
              value="سنوي"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-colors"
            >
              سنوي
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex gap-2 justify-start">
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-gray-50 transition-colors"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`ml-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "جاري التحديث..." : "تحديث"}
          </Button>
          <Button variant="outline" size="sm" className="hover:bg-gray-50 transition-colors">
            <Download className="ml-2 h-4 w-4" />
            تصدير
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-3xl border border-gray-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-right">إجمالي البطاقات النشطة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-right">1,245</div>
            <CardDescription className="flex items-center text-green-500 text-right">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 01-1 1H9a1 1 0 01-1-1V6a1 1 0 011-1h2a1 1 0 011 1v1zm-1 4a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1v-1a1 1 0 00-1-1h-2z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V5z"
                  clipRule="evenodd"
                />
              </svg>
              زيادة بنسبة 12% عن الشهر الماضي
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-3xl border border-gray-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-right">بطاقات Apple Wallet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-right">875</div>
            <CardDescription className="text-right">70% من إجمالي البطاقات</CardDescription>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-3xl border border-gray-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-right">بطاقات Google Pay</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-right">370</div>
            <CardDescription className="text-right">30% من إجمالي البطاقات</CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-3xl border border-gray-100">
          <CardHeader>
            <CardTitle className="text-right">استخدام البطاقة حسب النوع</CardTitle>
            <CardDescription className="text-right">مقارنة بين استخدام بطاقات Apple Wallet وGoogle Pay</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cardUsageData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  formatter={(value) => [`${value}`, ""]}
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
                <Legend />
                <Bar
                  dataKey="apple"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  name="Apple Wallet"
                  animationDuration={1000}
                />
                <Bar dataKey="google" fill="#4ade80" radius={[4, 4, 0, 0]} name="Google Pay" animationDuration={1000} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-3xl border border-gray-100">
          <CardHeader>
            <CardTitle className="text-right">تفعيل البطاقات الجديدة</CardTitle>
            <CardDescription className="text-right">عدد البطاقات الجديدة التي تم تفعيلها شهرياً</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={cardActivationsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  formatter={(value) => [`${value}`, "التفعيلات"]}
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
                <Line
                  type="monotone"
                  dataKey="activations"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2, fill: "#fff" }}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
