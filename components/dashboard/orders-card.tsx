"use client"

import { useState, useEffect } from "react"
import { MoreHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Importar el componente CurrencySymbol
import { CurrencySymbol } from "@/components/currency-symbol"

// Datos de ejemplo para órdenes
const ordersData = [
  { id: "1", customer: "أحمد محمد", date: "2025-07-28", amount: 450, status: "مكتمل" },
  { id: "2", customer: "سارة علي", date: "2025-07-27", amount: 320, status: "قيد التجهيز" },
  { id: "3", customer: "محمد خالد", date: "2025-07-26", amount: 780, status: "قيد الشحن" },
  { id: "4", customer: "فاطمة أحمد", date: "2025-07-25", amount: 150, status: "ملغي" },
  { id: "5", customer: "عمر حسن", date: "2025-07-24", amount: 560, status: "مكتمل" },
]

export function OrdersCard() {
  const [orderCount, setOrderCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [progress, setProgress] = useState(11)
  const [target, setTarget] = useState(100)

  // Animación de contador
  useEffect(() => {
    setIsAnimating(true)
    let start = 0
    const end = 856
    const duration = 2000
    const interval = 20
    const steps = duration / interval
    const increment = end / steps

    const timer = setInterval(() => {
      start += increment

      if (start >= end) {
        setOrderCount(end)
        setIsAnimating(false)
        clearInterval(timer)
      } else {
        setOrderCount(Math.floor(start))
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="bg-white shadow-sm rounded-3xl border border-gray-100">
      <CardContent className="p-3">
        <div className="flex justify-between items-center mb-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowDetails(true)}>عرض التفاصيل</DropdownMenuItem>
              <DropdownMenuItem>تعديل الهدف</DropdownMenuItem>
              <DropdownMenuItem>تصدير البيانات</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="text-gray-400 text-xs">الطلبات</div>
        </div>

        <div className="flex flex-col items-center justify-center mb-3">
          <svg
            width="40"
            height="40"
            viewBox="0 0 68 76"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-2"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M33.838 0C35.5258 0 37.1839 0.444034 38.6459 1.28752L62.8676 15.2729C64.3295 16.1169 65.5435 17.3309 66.3875 18.7928C67.2316 20.2547 67.676 21.9132 67.676 23.6013V51.5676C67.676 55.0046 65.8441 58.1793 62.8665 59.8967L38.6459 73.8849C37.2528 74.6886 35.6817 75.1296 34.0764 75.1694C33.9979 75.1765 33.9183 75.1801 33.8379 75.1801C33.7575 75.1801 33.6779 75.1765 33.5993 75.1694C31.9941 75.1296 30.4224 74.6881 29.0294 73.8844L4.80853 59.8996C3.34658 59.0555 2.13257 57.8415 1.28851 56.3796C0.444435 54.9177 3.8147e-05 53.2593 0 51.5711V23.6013C0 20.1647 1.83259 16.9897 4.80957 15.2722L29.0301 1.28752C30.4921 0.444034 32.1502 0 33.838 0ZM7.43142 55.3567L31.2151 69.0892V39.1004L5.24566 24.106V51.5711C5.24568 52.3384 5.44768 53.0922 5.83135 53.7567C6.21502 54.4212 6.76691 54.9731 7.43142 55.3567ZM36.4608 69.0892V39.1004L50.2429 31.1428C50.2773 31.124 50.3113 31.1043 50.3449 31.0839L62.4304 24.106V51.5676C62.4304 53.1315 61.5975 54.573 60.2457 55.3526L36.4608 69.0892ZM43.7325 28.8446L17.7479 13.8591L7.86865 19.5632L33.838 34.5575L43.7325 28.8446ZM48.9795 25.8151L59.8073 19.5632L36.0244 5.83115C35.3597 5.44785 34.6053 5.24566 33.838 5.24566C33.0708 5.24566 32.3163 5.44785 31.6517 5.83115L22.9948 10.8295L48.9795 25.8151Z"
              fill="#3B82F6"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M56.6397 38.1323C55.9008 36.8053 54.2691 36.3535 52.9952 37.1231L42.3291 43.5671C41.0552 44.3367 40.6215 46.0364 41.3603 47.3633C42.0992 48.6903 43.7309 49.1421 45.0048 48.3725L55.6709 41.9285C56.9448 41.1589 57.3785 39.4592 56.6397 38.1323Z"
              fill="#3B82F6"
            />
          </svg>
          <div className="text-xl font-bold mb-1">{orderCount}</div>
          <p className="text-xs text-gray-500 text-center">كفو لقد حققت {progress}% من الهدف</p>
        </div>

        <div className="relative w-full">
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div
              className="bg-blue-500 h-1.5 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>

        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-right text-base">تفاصيل الطلبات</DialogTitle>
              <DialogDescription className="text-right text-xs">إحصائيات مفصلة للطلبات والأهداف</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border border-gray-100 p-3 rounded-lg">
                  <div className="text-xs text-gray-500">إجمالي الطلبات</div>
                  <div className="text-base font-bold text-blue-500">{orderCount}</div>
                </div>
                <div className="bg-white border border-gray-100 p-3 rounded-lg">
                  <div className="text-xs text-gray-500">الهدف</div>
                  <div className="text-base font-bold">{target}</div>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-3">
                <h3 className="font-medium text-sm mb-2">آخر الطلبات</h3>
                <div className="space-y-1">
                  {ordersData.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex justify-between items-center p-1.5 hover:bg-gray-50 rounded-md">
                      <div className="text-xs font-medium">{order.customer}</div>
                      <div className="text-xs text-gray-500">
                        {order.amount} <CurrencySymbol size="small" />
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-3 bg-blue-500 hover:bg-blue-600 transition-colors text-xs h-7">
                  عرض جميع الطلبات
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
