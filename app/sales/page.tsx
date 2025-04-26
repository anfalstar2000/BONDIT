"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { SalesChart } from "@/components/sales-chart"
import { Search, Download, Filter } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatCard } from "@/components/stat-card"
// Importar el componente CurrencySymbol
import { CurrencySymbol } from "@/components/currency-symbol"

const salesData = [
  {
    id: "1",
    orderNumber: "#12345",
    customer: "أحمد محمد",
    date: "2025-07-28",
    amount: 450,
    status: "مكتمل",
  },
  {
    id: "2",
    orderNumber: "#12346",
    customer: "سارة علي",
    date: "2025-07-27",
    amount: 320,
    status: "مكتمل",
  },
  {
    id: "3",
    orderNumber: "#12347",
    customer: "محمد خالد",
    date: "2025-07-26",
    amount: 780,
    status: "مكتمل",
  },
  {
    id: "4",
    orderNumber: "#12348",
    customer: "فاطمة أحمد",
    date: "2025-07-25",
    amount: 150,
    status: "ملغي",
  },
  {
    id: "5",
    orderNumber: "#12349",
    customer: "عمر حسن",
    date: "2025-07-24",
    amount: 560,
    status: "مكتمل",
  },
]

export default function SalesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [chartPeriod, setChartPeriod] = useState<"أسبوعي" | "شهري" | "سنوي">("أسبوعي")

  return (
    <div className="container mx-auto p-6" dir="rtl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">المبيعات</h1>
        <div className="flex items-center gap-4">
          <DatePickerWithRange />
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="بحث..."
              className="pl-10 pr-10 py-2 border border-gray-200 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <Button variant="outline" className="border-gray-200 hover:bg-gray-50 transition-colors rounded-full">
            <Download className="ml-2 h-4 w-4" />
            تصدير
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <StatCard
          title="المبيعات"
          value={
            <>
              00.000 <CurrencySymbol />
            </>
          }
          subtitle="إجمالي المبيعات"
          secondValue="000"
          secondSubtitle="عدد الطلبات"
          showChart={true}
          progress={25}
        />

        <StatCard title="معدل التحويل" value="3.2%" subtitle="زيادة بنسبة 0.5% مقارنة بالفترة السابقة" />
      </div>

      <Card className="bg-white shadow-sm mb-6 rounded-3xl border border-gray-100">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">إحصائيات المبيعات</h2>
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

      <Card className="bg-white shadow-sm rounded-3xl border border-gray-100">
        <CardContent className="p-0">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b">
              <div className="px-6">
                <TabsList className="bg-transparent border-b-0 h-14 p-0 gap-8">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0 transition-colors"
                  >
                    جميع المبيعات
                  </TabsTrigger>
                  <TabsTrigger
                    value="completed"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0 transition-colors"
                  >
                    المبيعات المكتملة
                  </TabsTrigger>
                  <TabsTrigger
                    value="cancelled"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0 transition-colors"
                  >
                    المبيعات الملغاة
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-64">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="بحث عن مبيعات..."
                    className="pl-10 pr-10 py-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <Button variant="outline" className="border-gray-200 hover:bg-gray-50 transition-colors rounded-full">
                  <Filter className="ml-2 h-4 w-4" />
                  تصفية
                </Button>
              </div>

              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="text-right font-medium">رقم الطلب</TableHead>
                      <TableHead className="text-right font-medium">العميل</TableHead>
                      <TableHead className="text-right font-medium">التاريخ</TableHead>
                      <TableHead className="text-right font-medium">المبلغ</TableHead>
                      <TableHead className="text-right font-medium">الحالة</TableHead>
                      <TableHead className="text-right font-medium">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesData
                      .filter((sale) => {
                        if (activeTab === "all") return true
                        if (activeTab === "completed") return sale.status === "مكتمل"
                        if (activeTab === "cancelled") return sale.status === "ملغي"
                        return true
                      })
                      .map((sale) => (
                        <TableRow key={sale.id} className="hover:bg-gray-50 transition-colors">
                          <TableCell className="font-medium">{sale.orderNumber}</TableCell>
                          <TableCell>{sale.customer}</TableCell>
                          <TableCell>{sale.date}</TableCell>
                          <TableCell>
                            {sale.amount} <CurrencySymbol />
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                sale.status === "مكتمل" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}
                            >
                              {sale.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-500 hover:bg-blue-50 transition-colors rounded-full"
                            >
                              عرض
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
