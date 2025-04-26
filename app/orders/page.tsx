"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Search, Download, Filter } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/stat-card"
// Importar el componente CurrencySymbol
import { CurrencySymbol } from "@/components/currency-symbol"

const ordersData = [
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
    status: "قيد التجهيز",
  },
  {
    id: "3",
    orderNumber: "#12347",
    customer: "محمد خالد",
    date: "2025-07-26",
    amount: 780,
    status: "قيد الشحن",
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

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مكتمل":
        return "bg-green-100 text-green-800"
      case "قيد التجهيز":
        return "bg-blue-100 text-blue-800"
      case "قيد الشحن":
        return "bg-purple-100 text-purple-800"
      case "ملغي":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto p-6" dir="rtl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">الطلبات</h1>
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
          title="الطلبات"
          value="000"
          subtitle="عدد الطلبات"
          secondValue={
            <>
              00.000 <CurrencySymbol />
            </>
          }
          secondSubtitle="إجمالي المبيعات"
          showChart={true}
          progress={35}
        />

        <div className="grid grid-cols-2 gap-6">
          <StatCard title="الطلبات المكتملة" value="650" subtitle="زيادة بنسبة 8%" />
          <StatCard title="الطلبات الملغاة" value="86" subtitle="زيادة بنسبة 2%" />
        </div>
      </div>

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
                    جميع الطلبات
                  </TabsTrigger>
                  <TabsTrigger
                    value="completed"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0 transition-colors"
                  >
                    مكتملة
                  </TabsTrigger>
                  <TabsTrigger
                    value="processing"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0 transition-colors"
                  >
                    قيد التجهيز
                  </TabsTrigger>
                  <TabsTrigger
                    value="shipping"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0 transition-colors"
                  >
                    قيد الشحن
                  </TabsTrigger>
                  <TabsTrigger
                    value="cancelled"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0 transition-colors"
                  >
                    ملغاة
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
                    placeholder="بحث عن طلب..."
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
                    {ordersData
                      .filter((order) => {
                        if (activeTab === "all") return true
                        if (activeTab === "completed") return order.status === "مكتمل"
                        if (activeTab === "processing") return order.status === "قيد التجهيز"
                        if (activeTab === "shipping") return order.status === "قيد الشحن"
                        if (activeTab === "cancelled") return order.status === "ملغي"
                        return true
                      })
                      .map((order) => (
                        <TableRow key={order.id} className="hover:bg-gray-50 transition-colors">
                          <TableCell className="font-medium">{order.orderNumber}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            {order.amount} <CurrencySymbol />
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
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
