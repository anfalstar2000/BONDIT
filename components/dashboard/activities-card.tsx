"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, RefreshCw, Mail, Calendar, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CurrencySymbol } from "@/components/currency-symbol"

interface ActivitiesCardProps {
  title: string
  icon: string
  iconAlt?: string
  className?: string
}

const activities = [
  {
    id: "1",
    title: "تنبيه انتهاء صلاحية باقة",
    date: "بعد 3 أيام",
    icon: Bell,
    type: "package_expiry",
    details: {
      customerName: "محمد العنزي",
      packageName: "الباقة الفضية",
      expiryDate: "15/05/2023",
    },
  },
  {
    id: "2",
    title: "تجديد باقة",
    date: "اليوم، 2:00 م",
    icon: RefreshCw,
    type: "package_renewal",
    details: {
      customerName: "سارة عبدالله",
      packageName: "الباقة الذهبية",
      amount: 499,
      duration: "سنة",
    },
  },
  {
    id: "3",
    title: "رسالة تسويقية مجدولة",
    date: "غداً، 9:00 ص",
    icon: Mail,
    type: "scheduled_marketing",
    details: {
      campaignName: "عروض نهاية الأسبوع",
      audience: "جميع العملاء",
      scheduledTime: "غداً، 9:00 ص",
    },
  },
  {
    id: "4",
    title: "تحديث نظام الولاء",
    date: "اليوم، 3:45 م",
    icon: RefreshCw,
    type: "system_update",
    details: {
      updateType: "تحديث قواعد النقاط",
      affectedUsers: "جميع العملاء",
      scheduledTime: "اليوم، 3:45 م",
    },
  },
  {
    id: "5",
    title: "إطلاق تحدي جديد",
    date: "غداً، 8:00 ص",
    icon: Calendar,
    type: "new_challenge",
    details: {
      challengeName: "تحدي التسوق الأسبوعي",
      duration: "7 أيام",
      reward: "500 نقطة",
    },
  },
  {
    id: "6",
    title: "صيانة مجدولة للنظام",
    date: "الأحد القادم، 12:00 ص",
    icon: Clock,
    type: "system_maintenance",
    details: {
      maintenanceType: "تحديث قاعدة البيانات",
      duration: "ساعتين",
      impact: "توقف مؤقت للخدمة",
    },
  },
]

export function ActivitiesCard({ title, icon, iconAlt = "icon", className }: ActivitiesCardProps) {
  const [hoveredActivity, setHoveredActivity] = useState<string | null>(null)
  const [selectedActivity, setSelectedActivity] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()

  const renderActivityDetails = (activity: any) => {
    switch (activity.type) {
      case "package_expiry":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 p-2 rounded-lg">
                <p className="text-xs text-gray-500">اسم العميل</p>
                <p className="text-sm font-medium">{activity.details.customerName}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded-lg">
                <p className="text-xs text-gray-500">اسم الباقة</p>
                <p className="text-sm font-medium">{activity.details.packageName}</p>
              </div>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg">
              <p className="text-xs text-gray-500">تاريخ الانتهاء</p>
              <p className="text-sm font-medium">{activity.details.expiryDate}</p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="text-xs h-7">
                تجاهل
              </Button>
              <Button onClick={() => router.push("/customers")} className="text-xs h-7">
                إرسال تذكير
              </Button>
            </div>
          </div>
        )
      case "package_renewal":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 p-2 rounded-lg">
                <p className="text-xs text-gray-500">اسم العميل</p>
                <p className="text-sm font-medium">{activity.details.customerName}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded-lg">
                <p className="text-xs text-gray-500">اسم الباقة</p>
                <p className="text-sm font-medium">{activity.details.packageName}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 p-2 rounded-lg">
                <p className="text-xs text-gray-500">المبلغ</p>
                <p className="text-sm font-medium flex items-center">
                  {activity.details.amount}
                  <CurrencySymbol size="small" className="mr-1" />
                </p>
              </div>
              <div className="bg-gray-50 p-2 rounded-lg">
                <p className="text-xs text-gray-500">المدة</p>
                <p className="text-sm font-medium">{activity.details.duration}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => router.push("/customers")} className="text-xs h-7">
                عرض تفاصيل الباقة
              </Button>
            </div>
          </div>
        )
      case "scheduled_marketing":
        return (
          <div className="space-y-3">
            <div className="bg-gray-50 p-2 rounded-lg">
              <p className="text-xs text-gray-500">اسم الحملة</p>
              <p className="text-sm font-medium">{activity.details.campaignName}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 p-2 rounded-lg">
                <p className="text-xs text-gray-500">الجمهور المستهدف</p>
                <p className="text-sm font-medium">{activity.details.audience}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded-lg">
                <p className="text-xs text-gray-500">وقت الإرسال</p>
                <p className="text-sm font-medium">{activity.details.scheduledTime}</p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="text-xs h-7">
                إلغاء الجدولة
              </Button>
              <Button onClick={() => router.push("/marketing")} className="text-xs h-7">
                تعديل الحملة
              </Button>
            </div>
          </div>
        )
      case "system_update":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 p-2 rounded-lg">
                <p className="text-xs text-gray-500">نوع التحديث</p>
                <p className="text-sm font-medium">{activity.details.updateType}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded-lg">
                <p className="text-xs text-gray-500">المستخدمين المتأثرين</p>
                <p className="text-sm font-medium">{activity.details.affectedUsers}</p>
              </div>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg">
              <p className="text-xs text-gray-500">وقت التحديث</p>
              <p className="text-sm font-medium">{activity.details.scheduledTime}</p>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => router.push("/settings")} className="text-xs h-7">
                عرض تفاصيل التحديث
              </Button>
            </div>
          </div>
        )
      case "new_challenge":
        return (
          <div className="space-y-3">
            <div className="bg-gray-50 p-2 rounded-lg">
              <p className="text-xs text-gray-500">اسم التحدي</p>
              <p className="text-sm font-medium">{activity.details.challengeName}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 p-2 rounded-lg">
                <p className="text-xs text-gray-500">المدة</p>
                <p className="text-sm font-medium">{activity.details.duration}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded-lg">
                <p className="text-xs text-gray-500">المكافأة</p>
                <p className="text-sm font-medium">{activity.details.reward}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => router.push("/challenges")} className="text-xs h-7">
                عرض تفاصيل التحدي
              </Button>
            </div>
          </div>
        )
      case "system_maintenance":
        return (
          <div className="space-y-3">
            <div className="bg-gray-50 p-2 rounded-lg">
              <p className="text-xs text-gray-500">نوع الصيانة</p>
              <p className="text-sm font-medium">{activity.details.maintenanceType}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 p-2 rounded-lg">
                <p className="text-xs text-gray-500">المدة المتوقعة</p>
                <p className="text-sm font-medium">{activity.details.duration}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded-lg">
                <p className="text-xs text-gray-500">التأثير</p>
                <p className="text-sm font-medium">{activity.details.impact}</p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="text-xs h-7">
                تجاهل
              </Button>
              <Button onClick={() => router.push("/settings")} className="text-xs h-7">
                عرض تفاصيل الصيانة
              </Button>
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
      <CardContent className="p-3">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Image src={icon || "/placeholder.svg"} alt={iconAlt} width={16} height={16} className="text-[#C4C4C4]" />
            <h2 className="text-base">{title}</h2>
          </div>
          <Button
            variant="ghost"
            className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md hover:bg-gray-200 h-6"
            onClick={() => router.push("/activities")}
          >
            المزيد
          </Button>
        </div>
        <div className="space-y-2">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={`flex items-center justify-between p-2 border rounded-md transition-all ${
                hoveredActivity === activity.id ? "border-blue-200 shadow-sm" : ""
              }`}
              onMouseEnter={() => setHoveredActivity(activity.id)}
              onMouseLeave={() => setHoveredActivity(null)}
            >
              <div className="flex items-center gap-2">
                <activity.icon className="h-4 w-4 text-[#C4C4C4]" />
                <div>
                  <div className="font-medium text-xs">{activity.title}</div>
                  <div className="text-xs text-gray-500">{activity.date}</div>
                </div>
              </div>
              <Dialog
                open={isDialogOpen && selectedActivity?.id === activity.id}
                onOpenChange={(open) => {
                  setIsDialogOpen(open)
                  if (!open) setSelectedActivity(null)
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-blue-500 hover:bg-blue-50 transition-colors text-xs h-6 ${
                      hoveredActivity === activity.id ? "opacity-100" : "opacity-0 md:opacity-0 group-hover:opacity-100"
                    }`}
                    onClick={() => {
                      setSelectedActivity(activity)
                      setIsDialogOpen(true)
                    }}
                  >
                    عرض
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] rtl">
                  <DialogHeader>
                    <DialogTitle className="text-right flex items-center gap-2 text-base">
                      <activity.icon className="h-4 w-4 text-[#C4C4C4]" />
                      {activity.title}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="py-3">{selectedActivity && renderActivityDetails(selectedActivity)}</div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
