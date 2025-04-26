"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePicker } from "@/components/date-picker"

const pointsHistory = [
  {
    id: "1",
    customer: {
      name: "أحمد محمد",
      email: "ahmed@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "اكتساب",
    points: 120,
    description: "شراء منتج",
    date: "2025-07-28",
  },
  {
    id: "2",
    customer: {
      name: "سارة علي",
      email: "sara@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "استبدال",
    points: 500,
    description: "خصم 10%",
    date: "2025-07-27",
  },
  {
    id: "3",
    customer: {
      name: "محمد خالد",
      email: "mohamed@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "اكتساب",
    points: 50,
    description: "كتابة مراجعة",
    date: "2025-07-26",
  },
  {
    id: "4",
    customer: {
      name: "فاطمة أحمد",
      email: "fatima@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "اكتساب",
    points: 100,
    description: "تسجيل جديد",
    date: "2025-07-25",
  },
  {
    id: "5",
    customer: {
      name: "عمر حسن",
      email: "omar@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "استبدال",
    points: 300,
    description: "شحن مجاني",
    date: "2025-07-24",
  },
]

interface PointsHistoryProps {
  searchTerm: string
}

export function PointsHistory({ searchTerm }: PointsHistoryProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState("")
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    actionType: {
      acquisition: true,
      redemption: true,
    },
    dateRange: {
      from: null as Date | null,
      to: null as Date | null,
    },
    pointsRange: {
      min: "",
      max: "",
    },
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const itemsPerPage = 5

  // تحديث البحث المحلي عند تغيير البحث الرئيسي
  useEffect(() => {
    setLocalSearchTerm(searchTerm)
  }, [searchTerm])

  // تطبيق الفلاتر
  const filteredHistory = pointsHistory.filter((history) => {
    // فلتر البحث
    const searchMatch =
      history.customer.name.includes(localSearchTerm) ||
      history.customer.email.includes(localSearchTerm) ||
      history.description.includes(localSearchTerm)

    // فلتر نوع الإجراء
    const actionMatch =
      (filters.actionType.acquisition && history.action === "اكتساب") ||
      (filters.actionType.redemption && history.action === "استبدال")

    // فلتر النطاق الزمني
    let dateMatch = true
    if (filters.dateRange.from) {
      const historyDate = new Date(history.date)
      const fromDate = filters.dateRange.from
      dateMatch = dateMatch && historyDate >= fromDate
    }
    if (filters.dateRange.to) {
      const historyDate = new Date(history.date)
      const toDate = filters.dateRange.to
      dateMatch = dateMatch && historyDate <= toDate
    }

    // فلتر نطاق النقاط
    let pointsMatch = true
    if (filters.pointsRange.min !== "") {
      pointsMatch = pointsMatch && history.points >= Number.parseInt(filters.pointsRange.min)
    }
    if (filters.pointsRange.max !== "") {
      pointsMatch = pointsMatch && history.points <= Number.parseInt(filters.pointsRange.max)
    }

    return searchMatch && actionMatch && dateMatch && pointsMatch
  })

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedHistory = filteredHistory.slice(startIndex, startIndex + itemsPerPage)

  // إعادة ضبط الفلاتر
  const resetFilters = () => {
    setFilters({
      actionType: {
        acquisition: true,
        redemption: true,
      },
      dateRange: {
        from: null,
        to: null,
      },
      pointsRange: {
        min: "",
        max: "",
      },
    })
  }

  // التحقق من وجود فلاتر نشطة
  const hasActiveFilters = () => {
    return (
      !filters.actionType.acquisition ||
      !filters.actionType.redemption ||
      filters.dateRange.from !== null ||
      filters.dateRange.to !== null ||
      filters.pointsRange.min !== "" ||
      filters.pointsRange.max !== ""
    )
  }

  return (
    <div className="space-y-4" dir="rtl">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          {hasActiveFilters() && (
            <Button variant="outline" size="sm" onClick={resetFilters} className="rounded-full">
              <X className="h-4 w-4 mr-1" />
              مسح الفلاتر
            </Button>
          )}
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="border-gray-200 hover:bg-gray-50 transition-colors rounded-full">
                <Filter className="mr-2 h-4 w-4" />
                تصفية
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 rounded-[16px]" align="start">
              <div className="space-y-4">
                <h4 className="font-medium">تصفية سجل النقاط</h4>

                <div className="space-y-2">
                  <Label className="block">نوع الإجراء</Label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-0 space-x-reverse space-x-2">
                      <Checkbox
                        id="acquisition"
                        checked={filters.actionType.acquisition}
                        onCheckedChange={(checked) =>
                          setFilters({
                            ...filters,
                            actionType: {
                              ...filters.actionType,
                              acquisition: checked as boolean,
                            },
                          })
                        }
                      />
                      <Label htmlFor="acquisition" className="mr-2">
                        اكتساب
                      </Label>
                    </div>
                    <div className="flex items-center space-x-0 space-x-reverse space-x-2">
                      <Checkbox
                        id="redemption"
                        checked={filters.actionType.redemption}
                        onCheckedChange={(checked) =>
                          setFilters({
                            ...filters,
                            actionType: {
                              ...filters.actionType,
                              redemption: checked as boolean,
                            },
                          })
                        }
                      />
                      <Label htmlFor="redemption" className="mr-2">
                        استبدال
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="block">نطاق التاريخ</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs text-gray-500 block">من</Label>
                      <DatePicker
                        date={filters.dateRange.from}
                        setDate={(date) =>
                          setFilters({
                            ...filters,
                            dateRange: {
                              ...filters.dateRange,
                              from: date,
                            },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 block">إلى</Label>
                      <DatePicker
                        date={filters.dateRange.to}
                        setDate={(date) =>
                          setFilters({
                            ...filters,
                            dateRange: {
                              ...filters.dateRange,
                              to: date,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="block">نطاق النقاط</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs text-gray-500 block">الحد الأدنى</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={filters.pointsRange.min}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            pointsRange: {
                              ...filters.pointsRange,
                              min: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 block">الحد الأقصى</Label>
                      <Input
                        type="number"
                        placeholder="1000"
                        value={filters.pointsRange.max}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            pointsRange: {
                              ...filters.pointsRange,
                              max: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <Button variant="outline" size="sm" onClick={resetFilters} className="rounded-full">
                    إعادة ضبط
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setIsFilterOpen(false)}
                    className="bg-blue-500 hover:bg-blue-600 rounded-full"
                  >
                    تطبيق
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="بحث..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            className="pr-3 pl-10 py-2 border border-gray-200 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden border border-gray-100">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-medium text-right">العميل</TableHead>
              <TableHead className="font-medium text-right">الإجراء</TableHead>
              <TableHead className="font-medium text-right">النقاط</TableHead>
              <TableHead className="font-medium text-right">الوصف</TableHead>
              <TableHead className="font-medium text-right">التاريخ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedHistory.length > 0 ? (
              paginatedHistory.map((history) => (
                <TableRow
                  key={history.id}
                  className="hover:bg-gray-50 transition-colors"
                  onMouseEnter={() => setHoveredRow(history.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2 justify-start">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={history.customer.avatar} alt={history.customer.name} />
                        <AvatarFallback>{history.customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{history.customer.name}</div>
                        <div className="text-sm text-gray-500">{history.customer.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={history.action === "اكتساب" ? "default" : "secondary"}
                      className={
                        history.action === "اكتساب"
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }
                    >
                      {history.action}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={`font-medium text-right ${history.action === "اكتساب" ? "text-green-600" : "text-red-600"}`}
                  >
                    {history.action === "اكتساب" ? "+" : "-"}
                    {history.points}
                  </TableCell>
                  <TableCell className="text-right">{history.description}</TableCell>
                  <TableCell className="text-right">{history.date}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  لا توجد نتائج مطابقة للبحث أو الفلاتر المحددة
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center gap-2 mt-4 justify-start">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="h-8 w-8 rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-500">
            صفحة {currentPage} من {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="h-8 w-8 rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
