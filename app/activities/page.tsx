"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Search, Plus, Calendar, Clock, User, Bell } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const activities = [
  {
    id: "1",
    title: "عميل جديد قام بالتسجيل",
    description: "قام أحمد محمد بالتسجيل في المتجر",
    date: "اليوم، 10:30 ص",
    type: "عملاء",
    icon: User,
    color: "bg-green-100 text-green-600",
  },
  {
    id: "2",
    title: "تحديث نظام النقاط",
    description: "سيتم تحديث نظام النقاط لإضافة ميزات جديدة",
    date: "غداً، 2:00 م",
    type: "نظام",
    icon: Calendar,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "3",
    title: "إطلاق حملة تسويقية جديدة",
    description: "سيتم إطلاق حملة تسويقية جديدة لمنتجات الصيف",
    date: "بعد غد، 11:00 ص",
    type: "تسويق",
    icon: Clock,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "4",
    title: "تذكير بتجديد الاشتراك",
    description: "تذكير بتجديد اشتراك الباقة الحالية",
    date: "2025-08-01، 9:00 ص",
    type: "تذكير",
    icon: Bell,
    color: "bg-amber-100 text-amber-600",
  },
]

export default function ActivitiesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [openDialog, setOpenDialog] = useState(false)
  const [hoveredActivity, setHoveredActivity] = useState<string | null>(null)

  return (
    <div className="container mx-auto p-6" dir="rtl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">النشاطات القادمة</h1>
        <div className="flex items-center gap-4">
          <DatePickerWithRange />
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-full">
                <Plus className="ml-2 h-4 w-4" />
                إضافة نشاط
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>إضافة نشاط جديد</DialogTitle>
                <DialogDescription>قم بإدخال تفاصيل النشاط الجديد هنا. اضغط على حفظ عند الانتهاء.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="activity-title">عنوان النشاط</Label>
                  <Input id="activity-title" placeholder="مثال: اجتماع مع العملاء" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="activity-description">وصف النشاط</Label>
                  <Input id="activity-description" placeholder="مثال: مناقشة احتياجات العملاء الجدد" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="activity-date">التاريخ والوقت</Label>
                  <Input id="activity-date" type="datetime-local" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="activity-type">نوع النشاط</Label>
                  <Select>
                    <SelectTrigger id="activity-type">
                      <SelectValue placeholder="اختر نوع النشاط" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="عملاء">عملاء</SelectItem>
                      <SelectItem value="نظام">نظام</SelectItem>
                      <SelectItem value="تسويق">تسويق</SelectItem>
                      <SelectItem value="تذكير">تذكير</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenDialog(false)} className="rounded-full">
                  إلغاء
                </Button>
                <Button
                  className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-full"
                  onClick={() => setOpenDialog(false)}
                >
                  حفظ النشاط
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                    جميع النشاطات
                  </TabsTrigger>
                  <TabsTrigger
                    value="customers"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0 transition-colors"
                  >
                    عملاء
                  </TabsTrigger>
                  <TabsTrigger
                    value="system"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0 transition-colors"
                  >
                    نظام
                  </TabsTrigger>
                  <TabsTrigger
                    value="marketing"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0 transition-colors"
                  >
                    تسويق
                  </TabsTrigger>
                  <TabsTrigger
                    value="reminder"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0 transition-colors"
                  >
                    تذكير
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
                    placeholder="بحث عن نشاط..."
                    className="pl-10 pr-10 py-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {activities
                  .filter((activity) => {
                    if (activeTab === "all") return true
                    if (activeTab === "customers") return activity.type === "عملاء"
                    if (activeTab === "system") return activity.type === "نظام"
                    if (activeTab === "marketing") return activity.type === "تسويق"
                    if (activeTab === "reminder") return activity.type === "تذكير"
                    return true
                  })
                  .map((activity) => (
                    <div
                      key={activity.id}
                      className={`flex items-center justify-between p-4 border rounded-md transition-all ${
                        hoveredActivity === activity.id ? "border-blue-200 shadow-sm" : ""
                      }`}
                      onMouseEnter={() => setHoveredActivity(activity.id)}
                      onMouseLeave={() => setHoveredActivity(null)}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${activity.color}`}>
                          <activity.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium text-lg">{activity.title}</div>
                          <div className="text-gray-500">{activity.description}</div>
                          <div className="text-sm text-gray-400 mt-1">{activity.date}</div>
                        </div>
                      </div>
                      {hoveredActivity === activity.id && (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-500 hover:bg-blue-50 transition-colors rounded-full"
                          >
                            تعديل
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:bg-red-50 transition-colors rounded-full"
                          >
                            حذف
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
