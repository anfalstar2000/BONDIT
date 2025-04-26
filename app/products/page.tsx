"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Search, Download, Filter, Plus, Eye, Edit, Trash } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Importar el componente CurrencySymbol
import { CurrencySymbol } from "@/components/currency-symbol"

const products = [
  {
    id: "1",
    name: "سماعات بلوتوث لاسلكية",
    category: "إلكترونيات",
    price: 250,
    stock: 45,
    status: "متوفر",
  },
  {
    id: "2",
    name: "حقيبة ظهر للكمبيوتر المحمول",
    category: "حقائب",
    price: 180,
    stock: 32,
    status: "متوفر",
  },
  {
    id: "3",
    name: "ساعة ذكية متعددة الوظائف",
    category: "إلكترونيات",
    price: 450,
    stock: 28,
    status: "متوفر",
  },
  {
    id: "4",
    name: "قميص قطني بأكمام طويلة",
    category: "ملابس",
    price: 120,
    stock: 0,
    status: "غير متوفر",
  },
  {
    id: "5",
    name: "حذاء رياضي خفيف الوزن",
    category: "أحذية",
    price: 220,
    stock: 15,
    status: "متوفر",
  },
]

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  return (
    <div className="container mx-auto p-6" dir="rtl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">المنتجات</h1>
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
          <Button className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-full">
            <Plus className="ml-2 h-4 w-4" />
            إضافة منتج
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-3xl border border-gray-100">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500">إجمالي المنتجات</h3>
            <p className="text-3xl font-bold mt-2">120</p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-green-500">+5%</span>
              <span className="text-sm text-gray-500 mr-1">مقارنة بالفترة السابقة</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-3xl border border-gray-100">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500">المنتجات المتوفرة</h3>
            <p className="text-3xl font-bold mt-2">98</p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-green-500">+3%</span>
              <span className="text-sm text-gray-500 mr-1">مقارنة بالفترة السابقة</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-3xl border border-gray-100">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500">المنتجات غير المتوفرة</h3>
            <p className="text-3xl font-bold mt-2">22</p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-red-500">+2%</span>
              <span className="text-sm text-gray-500 mr-1">مقارنة بالفترة السابقة</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-3xl border border-gray-100">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500">متوسط سعر المنتج</h3>
            <p className="text-3xl font-bold mt-2">
              185 <CurrencySymbol />
            </p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-green-500">+1.5%</span>
              <span className="text-sm text-gray-500 mr-1">مقارنة بالفترة السابقة</span>
            </div>
          </CardContent>
        </Card>
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
                    جميع المنتجات
                  </TabsTrigger>
                  <TabsTrigger
                    value="available"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0 transition-colors"
                  >
                    متوفرة
                  </TabsTrigger>
                  <TabsTrigger
                    value="unavailable"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0 transition-colors"
                  >
                    غير متوفرة
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
                    placeholder="بحث عن منتج..."
                    className="pl-10 pr-10 py-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-gray-200 hover:bg-gray-50 transition-colors rounded-full">
                    <Filter className="ml-2 h-4 w-4" />
                    تصفية
                  </Button>
                  <Button variant="outline" className="border-gray-200 hover:bg-gray-50 transition-colors rounded-full">
                    <Download className="ml-2 h-4 w-4" />
                    تصدير
                  </Button>
                </div>
              </div>

              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="text-right font-medium">اسم المنتج</TableHead>
                      <TableHead className="text-right font-medium">التصنيف</TableHead>
                      <TableHead className="text-right font-medium">السعر</TableHead>
                      <TableHead className="text-right font-medium">المخزون</TableHead>
                      <TableHead className="text-right font-medium">الحالة</TableHead>
                      <TableHead className="text-right font-medium">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products
                      .filter((product) => {
                        if (activeTab === "all") return true
                        if (activeTab === "available") return product.status === "متوفر"
                        if (activeTab === "unavailable") return product.status === "غير متوفر"
                        return true
                      })
                      .map((product) => (
                        <TableRow
                          key={product.id}
                          className="hover:bg-gray-50 transition-colors"
                          onMouseEnter={() => setHoveredRow(product.id)}
                          onMouseLeave={() => setHoveredRow(null)}
                        >
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>
                            {product.price} <CurrencySymbol />
                          </TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                product.status === "متوفر" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }
                            >
                              {product.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-end">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 15 15"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                      ></path>
                                    </svg>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                    <Eye className="h-4 w-4" />
                                    <span>عرض</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                    <Edit className="h-4 w-4" />
                                    <span>تعديل</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-500 focus:text-red-500">
                                    <Trash className="h-4 w-4" />
                                    <span>حذف</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
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
