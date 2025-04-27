"use client"

import { useState, useEffect } from "react"
import {
  MoreHorizontal,
  ChevronRight,
  ChevronLeft,
  Search,
  BarChart3,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  Bell,
  Gift,
  Award,
  Target
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { DateSelector } from "@/components/date-selector"
import { StatCard } from "@/components/stat-card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { CurrencySymbol } from "@/components/currency-symbol"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart } from "@/components/bar-chart"
import { DoubleBarChart } from "@/components/double-bar-chart"
import { CustomersStatsCard } from "@/components/dashboard/customers-stats-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// بيانات وهمية للفترات الزمنية المختلفة
const timePeriodsData = {
  daily: {
    pointsDistributed: "15,230",
    pointsRedeemed: "8,450",
    activeCustomers: "1,245",
    loyaltySales: 5678,
    repurchaseRate: "28%",
    engagementRate: "52%",
    pointsDistributedTrend: 5,
    pointsRedeemedTrend: -2,
    activeCustomersTrend: 3,
    loyaltySalesTrend: 7,
    repurchaseRateTrend: 1,
    engagementRateTrend: 4,
  },
  weekly: {
    pointsDistributed: "125,450",
    pointsRedeemed: "78,320",
    activeCustomers: "3,245",
    loyaltySales: 45678,
    repurchaseRate: "32%",
    engagementRate: "58%",
    pointsDistributedTrend: 12,
    pointsRedeemedTrend: -5,
    activeCustomersTrend: 8,
    loyaltySalesTrend: 15,
    repurchaseRateTrend: 3,
    engagementRateTrend: 7,
  },
  monthly: {
    pointsDistributed: "580,120",
    pointsRedeemed: "320,450",
    activeCustomers: "8,750",
    loyaltySales: 185000,
    repurchaseRate: "35%",
    engagementRate: "62%",
    pointsDistributedTrend: 18,
    pointsRedeemedTrend: 10,
    activeCustomersTrend: 12,
    loyaltySalesTrend: 20,
    repurchaseRateTrend: 5,
    engagementRateTrend: 9,
  },
  yearly: {
    pointsDistributed: "2,450,780",
    pointsRedeemed: "1,850,320",
    activeCustomers: "25,450",
    loyaltySales: 1250000,
    repurchaseRate: "40%",
    engagementRate: "65%",
    pointsDistributedTrend: 25,
    pointsRedeemedTrend: 18,
    activeCustomersTrend: 15,
    loyaltySalesTrend: 30,
    repurchaseRateTrend: 8,
    engagementRateTrend: 12,
  },
}

// بيانات وهمية للرسوم البيانية
const chartData = {
  daily: {
    sales: [
      { name: "8:00", total: 450 },
      { name: "10:00", total: 750 },
      { name: "12:00", total: 1200 },
      { name: "14:00", total: 850 },
      { name: "16:00", total: 1500 },
      { name: "18:00", total: 1800 },
      { name: "20:00", total: 1200 },
    ],
    rewards: [
      { name: "خصم نقدي", value: 35 },
      { name: "شحن مجاني", value: 28 },
      { name: "منتج مجاني", value: 22 },
      { name: "قسيمة هدية", value: 15 },
    ],
    points: {
      labels: ["8:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"],
      datasets: [
        {
          label: "النقاط الموزعة",
          data: [1200, 1900, 1500, 2500, 2200, 3000, 2500],
          backgroundColor: "rgba(59, 130, 246, 0.5)",
        },
        {
          label: "النقاط المستبدلة",
          data: [800, 1200, 1000, 1500, 1800, 2000, 1700],
          backgroundColor: "rgba(16, 185, 129, 0.5)",
        },
      ],
    },
  },
  weekly: {
    sales: [
      { name: "السبت", total: 3200 },
      { name: "الأحد", total: 4500 },
      { name: "الإثنين", total: 3800 },
      { name: "الثلاثاء", total: 4200 },
      { name: "الأربعاء", total: 3900 },
      { name: "الخميس", total: 5200 },
      { name: "الجمعة", total: 6100 },
    ],
    rewards: [
      { name: "خصم نقدي", value: 40 },
      { name: "شحن مجاني", value: 25 },
      { name: "منتج مجاني", value: 20 },
      { name: "قسيمة هدية", value: 15 },
    ],
    points: {
      labels: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"],
      datasets: [
        {
          label: "النقاط الموزعة",
          data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
          backgroundColor: "rgba(59, 130, 246, 0.5)",
        },
        {
          label: "النقاط المستبدلة",
          data: [8000, 12000, 10000, 15000, 18000, 20000, 17000],
          backgroundColor: "rgba(16, 185, 129, 0.5)",
        },
      ],
    },
  },
  monthly: {
    sales: [
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
    ],
    rewards: [
      { name: "خصم نقدي", value: 38 },
      { name: "شحن مجاني", value: 27 },
      { name: "منتج مجاني", value: 22 },
      { name: "قسيمة هدية", value: 13 },
    ],
    points: {
      labels: [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
      ],
      datasets: [
        {
          label: "النقاط الموزعة",
          data: [120000, 190000, 150000, 250000, 220000, 300000, 280000, 320000, 350000, 380000, 420000, 450000],
          backgroundColor: "rgba(59, 130, 246, 0.5)",
        },
        {
          label: "النقاط المستبدلة",
          data: [80000, 120000, 100000, 150000, 180000, 200000, 170000, 210000, 230000, 250000, 280000, 300000],
          backgroundColor: "rgba(16, 185, 129, 0.5)",
        },
      ],
    },
  },
  yearly: {
    sales: [
      { name: "2020", total: 250000 },
      { name: "2021", total: 320000 },
      { name: "2022", total: 380000 },
      { name: "2023", total: 420000 },
      { name: "2024", total: 480000 },
      { name: "2025", total: 520000 },
    ],
    rewards: [
      { name: "خصم نقدي", value: 42 },
      { name: "شحن مجاني", value: 23 },
      { name: "منتج مجاني", value: 18 },
      { name: "قسيمة هدية", value: 17 },
    ],
    points: {
      labels: ["2020", "2021", "2022", "2023", "2024", "2025"],
      datasets: [
        {
          label: "النقاط الموزعة",
          data: [1200000, 1900000, 1500000, 2500000, 2200000, 3000000],
          backgroundColor: "rgba(59, 130, 246, 0.5)",
        },
        {
          label: "النقاط المستبدلة",
          data: [800000, 1200000, 1000000, 1500000, 1800000, 2000000],
          backgroundColor: "rgba(16, 185, 129, 0.5)",
        },
      ],
    },
  },
}

// بيانات وهمية للتنبيهات الذكية
const smartAlertsData = [
  {
    id: 1,
    title: "انخفاض معدل استبدال النقاط",
    description: "انخفض معدل استبدال النقاط بنسبة 15% مقارنة بالشهر الماضي",
    action: "تفعيل حملة",
    severity: "warning",
    icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
  },
  {
    id: 2,
    title: "ارتفاع استخدام مكافأة الخصم النقدي",
    description: "ارتفع استخدام مكافأة الخصم النقدي بنسبة 25% هذا الأسبوع",
    action: "مراجعة",
    severity: "info",
    icon: <ArrowUp className="h-5 w-5 text-blue-500" />,
  },
  {
    id: 3,
    title: "انخفاض عدد العملاء الجدد",
    description: "انخفض عدد العملاء الجدد المنضمين للبرنامج بنسبة 10%",
    action: "حملة جذب",
    severity: "danger",
    icon: <ArrowDown className="h-5 w-5 text-red-500" />,
  },
]

// بيانات وهمية للحملات التسويقية
const campaignSummaryData = [
  {
    id: 1,
    name: "حملة العودة للمدارس",
    type: "بريد إلكتروني",
    sent: 1250,
    opened: 625,
    clicked: 312,
    openRate: "50%",
    clickRate: "25%",
    details: {
      subject: "استعد للعودة إلى المدارس مع عروضنا الحصرية",
      content: "استعد للعام الدراسي الجديد مع تشكيلة واسعة من المنتجات بأسعار تنافسية",
      audience: "أولياء الأمور",
      date: "2025-08-15",
      status: "مكتملة",
    },
  },
  {
    id: 2,
    name: "عروض نهاية الأسبوع",
    type: "SMS",
    sent: 2500,
    opened: 2000,
    clicked: 750,
    openRate: "80%",
    clickRate: "30%",
    details: {
      subject: "عروض حصرية لنهاية الأسبوع",
      content: "استفد من خصومات تصل إلى 50% على منتجات مختارة لفترة محدودة",
      audience: "جميع العملاء",
      date: "2025-08-20",
      status: "مكتملة",
    },
  },
  {
    id: 3,
    name: "تذكير بالنقاط المتراكمة",
    type: "إشعار",
    sent: 3500,
    opened: 2100,
    clicked: 1050,
    openRate: "60%",
    clickRate: "30%",
    details: {
      subject: "نقاطك على وشك الانتهاء!",
      content: "لديك نقاط غير مستخدمة ستنتهي صلاحيتها قريبًا. استبدلها الآن!",
      audience: "العملاء ذوو النقاط المتراكمة",
      date: "2025-08-25",
      status: "مكتملة",
    },
  },
]

export default function Dashboard() {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: new Date(2025, 6, 20),
    to: new Date(2025, 6, 28),
  })

  // Dummy data for the dashboard
  const stats = {
    totalPoints: "00,000",
    activeUsers: "000",
    totalRevenue: "00,000",
    completedChallenges: "000"
  }

  // Dummy data for chart
  const chartData = [
    { day: "يوليو 28", value: 70 },
    { day: "يوليو 27", value: 95 },
    { day: "يوليو 26", value: 60 },
    { day: "يوليو 25", value: 75 },
    { day: "يوليو 24", value: 65 },
    { day: "يوليو 23", value: 80 },
    { day: "يوليو 22", value: 65 },
    { day: "يوليو 21", value: 75 },
    { day: "يوليو 20", value: 60 },
    { day: "يوليو 7", value: 50 },
    { day: "يوليو 6", value: 65 },
    { day: "يوليو 5", value: 55 },
    { day: "يوليو 4", value: 70 },
    { day: "يوليو 3", value: 60 },
    { day: "يوليو 2", value: 75 },
    { day: "يوليو 1", value: 50 },
  ]

  return (
    <div className="container mx-auto p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-right">مرحباً بك</h1>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="relative">
            <DatePickerWithRange
              value={dateRange}
              onChange={setDateRange}
              className="w-64 rtl"
            />
          </div>
          <Button variant="outline" size="icon" className="rounded-full bg-white">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left/Stats Section */}
        <div className="col-span-3">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">التسجيلات</CardTitle>
            </CardHeader>
            <CardContent className="py-0">
              <div className="space-y-8">
                {/* Empty state for registrations */}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Section */}
        <div className="col-span-6">
          {/* Growth Section */}
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center justify-between w-full">
                <CardTitle className="text-lg font-medium">النمو</CardTitle>
                <MoreHorizontal className="h-5 w-5 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100">شهرية</Badge>
                <div className="mt-4 text-sm text-gray-500">التحديث الأخير ٢٨ يوليو ٢٠٢٥</div>
              </div>
            </CardContent>
          </Card>

          {/* Product Section */}
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center justify-between w-full">
                <CardTitle className="text-lg font-medium">المنتج الأفضل مبيعاً</CardTitle>
                <div className="flex">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center py-4">
                <div>
                  <h3 className="text-xl font-bold">اسم المنتج</h3>
                </div>
                <div className="flex text-center">
                  <div className="px-4">
                    <p className="text-gray-500 mb-1">المبيعات</p>
                    <p className="text-3xl font-bold text-blue-500">000</p>
                  </div>
                  <div className="px-4">
                    <p className="text-gray-500 mb-1">المخزون</p>
                    <p className="text-3xl font-bold">000</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Section */}
        <div className="col-span-3">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">المبيعات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">قيمة المبيعات</div>
                    <div className="text-2xl font-bold mt-1">{stats.totalRevenue} ريال</div>
                  </div>
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">الطلبات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">عدد الطلبات</div>
                    <div className="text-2xl font-bold mt-1">000</div>
                  </div>
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-8 text-blue-500">
                      <path fill="currentColor" d="M12 1.5l-8 4.5v6c0 5.5 3.3 10.4 8 12.5 4.7-2.1 8-7 8-12.5v-6l-8-4.5zM12 10.5v9c-3.6-1.8-6-5.8-6-9.5v-4.7l6-3.3 6 3.3v4.7h-6"/>
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Analytics Chart Section - Full Width */}
        <div className="col-span-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">إحصائيات</CardTitle>
              <div className="flex space-x-2 space-x-reverse">
                <Badge className="bg-blue-500 text-white">أسبوعي</Badge>
                <Badge className="bg-gray-200 text-gray-500">شهري</Badge>
                <Badge className="bg-gray-200 text-gray-500">سنوي</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="w-full aspect-[3/1]">
                <div className="flex items-end justify-between h-64">
                  {chartData.slice(0, 10).map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="w-4 bg-blue-500 rounded-t-sm" 
                        style={{ height: `${item.value * 0.6}%` }}
                      />
                      <span className="text-xs mt-2 text-gray-500">{item.day.split(' ')[1]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex mt-8 justify-between">
                <div>
                  <span className="text-sm text-gray-500">الربح</span>
                  <div className="flex items-center mt-1">
                    <span className="text-xl font-bold">0000</span>
                    <span className="flex items-center text-green-500 text-sm mr-2">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      10%
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">الدخل</span>
                  <div className="flex items-center mt-1">
                    <span className="text-xl font-bold">0000</span>
                    <span className="flex items-center text-red-500 text-sm mr-2">
                      <ArrowDown className="h-4 w-4 mr-1" />
                      5%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Campaigns Section */}
        <div className="col-span-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">الحملات النشطة</CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-500">
                المزيد
              </Button>
            </CardHeader>
            <CardContent>
              {/* Empty state or campaign list would go here */}
              <div className="py-8 text-center text-gray-500">
                لا توجد حملات نشطة حالياً
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
