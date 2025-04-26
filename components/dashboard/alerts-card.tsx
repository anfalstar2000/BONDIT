"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingBag, User, CreditCard, Award, BadgeCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CurrencySymbol } from "@/components/currency-symbol"
import { Badge } from "@/components/ui/badge"

interface AlertsCardProps {
  title: string
  icon: string
  iconAlt?: string
  className?: string
}

const alerts = [
  {
    id: "1",
    title: "عميل جديد قام بالتسجيل",
    date: "اليوم، 10:30 ص",
    icon: User,
    color: "bg-green-100 text-green-600",
    type: "new_customer",
    details: {
      customerName: "أحمد محمد",
      email: "ahmed@example.com",
      source: "إعلان فيسبوك",
    },
  },
  {
    id: "2",
    title: "عملية شراء جديدة",
    date: "اليوم، 1:15 م",
    icon: ShoppingBag,
    color: "bg-blue-100 text-blue-600",
    type: "new_purchase",
    details: {
      customerName: "نورة الشمري",
      amount: 750,
      items: 3,
      orderID: "#ORD-7845",
    },
  },
  {
    id: "3",
    title: "تسجيل دخول عميل",
    date: "اليوم، 3:45 م",
    icon: User,
    color: "bg-yellow-100 text-yellow-600",
    type: "customer_login",
    details: {
      customerName: "خالد العتيبي",
      device: "iPhone 13",
      location: "الرياض، السعودية",
    },
  },
  {
    id: "4",
    title: "عميل وصل لمستوى جديد",
    date: "اليوم، 11:20 ص",
    icon: Award,
    color: "bg-purple-100 text-purple-600",
    type: "level_up",
    details: {
      customerName: "فاطمة الزهراني",
      newLevel: "المستوى الذهبي",
      points: 5000,
    },
  },
  {
    id: "5",
    title: "استبدال نقاط بمكافأة",
    date: "اليوم، 4:30 م",
    icon: CreditCard,
    color: "bg-green-100 text-green-600",
    type: "points_redemption",
    details: {
      customerName: "عبدالله القحطاني",
      reward: "قسيمة شراء",
      pointsUsed: 2000,
      value: 200,
    },
  },
  {
    id: "6",
    title: "عميل حصل على شارة جديدة",
    date: "اليوم، 12:15 م",
    icon: BadgeCheck,
    color: "bg-orange-100 text-orange-600",
    type: "badge_earned",
    details: {
      customerName: "منى السالم",
      badgeName: "متسوق مخلص",
      achievement: "10 عمليات شراء متتالية",
    },
  },
]

export function AlertsCard({ title, icon, iconAlt = "icon", className }: AlertsCardProps) {
  const [hoveredAlert, setHoveredAlert] = useState<string | null>(null)
  const [selectedAlert, setSelectedAlert] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()

  const renderAlertDetails = (alert: any) => {
    switch (alert.type) {
      case "new_customer":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">اسم العميل</p>
                <p className="font-medium">{alert.details.customerName}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                <p className="font-medium">{alert.details.email}</p>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">مصدر التسجيل</p>
              <p className="font-medium">{alert.details.source}</p>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => router.push("/customers")}>عرض صفحة العميل</Button>
            </div>
          </div>
        )
      case "new_purchase":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">اسم العميل</p>
                <p className="font-medium">{alert.details.customerName}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">رقم الطلب</p>
                <p className="font-medium">{alert.details.orderID}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">المبلغ</p>
                <p className="font-medium flex items-center">
                  {alert.details.amount}
                  <CurrencySymbol size="small" className="mr-1" />
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">عدد المنتجات</p>
                <p className="font-medium">{alert.details.items}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => router.push("/orders")}>عرض تفاصيل الطلب</Button>
            </div>
          </div>
        )
      case "customer_login":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">اسم العميل</p>
                <p className="font-medium">{alert.details.customerName}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">الجهاز</p>
                <p className="font-medium">{alert.details.device}</p>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">الموقع</p>
              <p className="font-medium">{alert.details.location}</p>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => router.push("/customers")}>عرض نشاط العميل</Button>
            </div>
          </div>
        )
      case "level_up":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">اسم العميل</p>
                <p className="font-medium">{alert.details.customerName}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">المستوى الجديد</p>
                <p className="font-medium">{alert.details.newLevel}</p>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">النقاط المكتسبة</p>
              <p className="font-medium">{alert.details.points} نقطة</p>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => router.push("/badges-levels")}>عرض تفاصيل المستوى</Button>
            </div>
          </div>
        )
      case "points_redemption":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">اسم العميل</p>
                <p className="font-medium">{alert.details.customerName}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">المكافأة</p>
                <p className="font-medium">{alert.details.reward}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">النقاط المستخدمة</p>
                <p className="font-medium">{alert.details.pointsUsed} نقطة</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">القيمة</p>
                <p className="font-medium flex items-center">
                  {alert.details.value}
                  <CurrencySymbol size="small" className="mr-1" />
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => router.push("/points-rewards")}>عرض تفاصيل المكافأة</Button>
            </div>
          </div>
        )
      case "badge_earned":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">اسم العميل</p>
                <p className="font-medium">{alert.details.customerName}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">اسم الشارة</p>
                <p className="font-medium">{alert.details.badgeName}</p>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">الإنجاز</p>
              <p className="font-medium">{alert.details.achievement}</p>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => router.push("/badges-levels")}>عرض تفاصيل الشارة</Button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card
      className={cn(
        "bg-white shadow-sm rounded-3xl border border-gray-100 hover:shadow-md transition-shadow",
        className,
      )}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-50 p-2 rounded-full">
              <Image src={icon || "/placeholder.svg"} alt={iconAlt} width={20} height={20} />
            </div>
            <h2 className="text-lg">{title}</h2>
          </div>
          <Button
            variant="ghost"
            className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md hover:bg-gray-200"
            onClick={() => router.push("/alerts")}
          >
            المزيد
          </Button>
        </div>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-center justify-between p-3 border rounded-md transition-all ${
                hoveredAlert === alert.id ? "border-blue-200 shadow-sm" : ""
              }`}
              onMouseEnter={() => setHoveredAlert(alert.id)}
              onMouseLeave={() => setHoveredAlert(null)}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${alert.color}`}>
                  <alert.icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium">{alert.title}</div>
                  <div className="text-sm text-gray-500">{alert.date}</div>
                </div>
              </div>
              <Dialog
                open={isDialogOpen && selectedAlert?.id === alert.id}
                onOpenChange={(open) => {
                  setIsDialogOpen(open)
                  if (!open) setSelectedAlert(null)
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-blue-500 hover:bg-blue-50 transition-colors ${
                      hoveredAlert === alert.id ? "opacity-100" : "opacity-0 md:opacity-0 group-hover:opacity-100"
                    }`}
                    onClick={() => {
                      setSelectedAlert(alert)
                      setIsDialogOpen(true)
                    }}
                  >
                    عرض
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] rtl">
                  <DialogHeader>
                    <DialogTitle className="text-right flex items-center gap-2">
                      <div className={`p-1.5 rounded-full ${alert.color}`}>
                        <alert.icon className="h-4 w-4" />
                      </div>
                      {alert.title}
                      {alert.type === "new_customer" && (
                        <Badge variant="success" className="mr-2">
                          جديد
                        </Badge>
                      )}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="py-4">{selectedAlert && renderAlertDetails(selectedAlert)}</div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
