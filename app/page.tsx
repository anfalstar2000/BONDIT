"use client"

import { useState, useEffect } from "react"
import { Search, ArrowUp, ArrowDown, AlertTriangle, Bell, Gift, Award, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
  // حالة الواجهة
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("weekly")
  const [salesChartPeriod, setSalesChartPeriod] = useState("weekly")
  const [currentKPIs, setCurrentKPIs] = useState(timePeriodsData.weekly)
  const [currentChartData, setCurrentChartData] = useState(chartData.weekly)

  // حالة الحوارات
  const [showActionDialog, setShowActionDialog] = useState(false)
  const [currentAction, setCurrentAction] = useState<any>(null)
  const [showCampaignDetails, setShowCampaignDetails] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // تحديث البيانات عند تغيير الفترة الزمنية
  useEffect(() => {
    setCurrentKPIs(timePeriodsData[selectedTimePeriod as keyof typeof timePeriodsData])
  }, [selectedTimePeriod])

  // تحديث بيانات الرسم البياني عند تغيير الفترة الزمنية
  useEffect(() => {
    setCurrentChartData(chartData[salesChartPeriod as keyof typeof chartData])
  }, [salesChartPeriod])

  // معالجة النقر على زر الإجراء في التنبيهات الذكية
  const handleAlertAction = (alert: any) => {
    setCurrentAction({
      title: `تنفيذ إجراء: ${alert.action}`,
      description: `معالجة التنبيه: ${alert.title}`,
      onSubmit: () => handleActionSubmit(),
    })
    setShowActionDialog(true)
  }

  // معالجة تقديم نموذج الإجراء
  const handleActionSubmit = () => {
    setIsSubmitting(true)

    // محاكاة طلب API
    setTimeout(() => {
      setIsSubmitting(false)
      setShowActionDialog(false)
      alert("تم تنفيذ الإجراء بنجاح")
    }, 1000)
  }

  // معالجة النقر على زر الإجراء السريع
  const handleQuickAction = (actionType: string) => {
    let actionTitle = ""
    let actionDescription = ""

    switch (actionType) {
      case "reward":
        actionTitle = "إنشاء مكافأة جديدة"
        actionDescription = "أضف مكافأة جديدة إلى برنامج الولاء"
        break
      case "campaign":
        actionTitle = "إطلاق حملة تسويقية"
        actionDescription = "إنشاء حملة تسويقية جديدة"
        break
      case "challenge":
        actionTitle = "إضافة تحدي"
        actionDescription = "إنشاء تحدي جديد للعملاء"
        break
      case "notification":
        actionTitle = "إرسال إشعار"
        actionDescription = "إرسال إشعار للعملاء"
        break
      default:
        return
    }

    setCurrentAction({
      title: actionTitle,
      description: actionDescription,
      onSubmit: () => handleActionSubmit(),
    })
    setShowActionDialog(true)
  }

  // معالجة النقر على حملة تسويقية
  const handleCampaignClick = (campaign: any) => {
    setSelectedCampaign(campaign)
    setShowCampaignDetails(true)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen rtl">
      <div className="mb-4">
        <div className="bg-white rounded-full p-2 inline-block border border-gray-200">
          <span className="text-sm text-gray-600">لوحة التحكم</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-normal text-gray-700">مرحباً بك أنفال التميمي</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="rounded-full">
            <Search className="h-4 w-4 text-gray-500" />
          </Button>
          <DateSelector />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6 rtl">
        <TabsList className="bg-white border border-gray-200 rounded-full">
          <TabsTrigger
            value="overview"
            className="rounded-full data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-gray-600"
          >
            نظرة عامة
          </TabsTrigger>
          <TabsTrigger
            value="points"
            className="rounded-full data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-gray-600"
          >
            النقاط
          </TabsTrigger>
          <TabsTrigger
            value="customers"
            className="rounded-full data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-gray-600"
          >
            العملاء
          </TabsTrigger>
          <TabsTrigger
            value="marketing"
            className="rounded-full data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-gray-600"
          >
            التسويق
          </TabsTrigger>
        </TabsList>

        <div className="flex justify-end mb-4">
          <Tabs value={selectedTimePeriod} onValueChange={setSelectedTimePeriod} className="rtl">
            <TabsList className="bg-white border border-gray-200 rounded-full">
              <TabsTrigger
                value="daily"
                className="rounded-full data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-gray-600"
              >
                يومي
              </TabsTrigger>
              <TabsTrigger
                value="weekly"
                className="rounded-full data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-gray-600"
              >
                أسبوعي
              </TabsTrigger>
              <TabsTrigger
                value="monthly"
                className="rounded-full data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-gray-600"
              >
                شهري
              </TabsTrigger>
              <TabsTrigger
                value="yearly"
                className="rounded-full data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-gray-600"
              >
                سنوي
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <TabsContent value="overview" className="mt-4">
          <div className="grid grid-cols-12 gap-4 rtl">
            {/* KPIs Row */}
            <div className="col-span-12 grid grid-cols-6 gap-4">
              <StatCard
                title="النقاط"
                value={currentKPIs.pointsDistributed}
                icon="/icons/points-rewards.svg"
                iconAlt="Points Icon"
                trend={currentKPIs.pointsDistributedTrend}
                trendLabel="مقارنة بالفترة السابقة"
                className="col-span-2"
              />
              <StatCard
                title="الاستبدال"
                value={currentKPIs.pointsRedeemed}
                icon="/icons/points-rewards.svg"
                iconAlt="Points Icon"
                trend={currentKPIs.pointsRedeemedTrend}
                trendLabel="مقارنة بالفترة السابقة"
                className="col-span-2"
              />
              <StatCard
                title="العملاء"
                value={currentKPIs.activeCustomers}
                icon="/icons/customers.svg"
                iconAlt="Customers Icon"
                trend={currentKPIs.activeCustomersTrend}
                trendLabel="مقارنة بالفترة السابقة"
                className="col-span-2"
              />
              <StatCard
                title="المبيعات"
                value={
                  <>
                    {currentKPIs.loyaltySales.toLocaleString()} <CurrencySymbol />
                  </>
                }
                icon="/icons/dashboard-icon.svg"
                iconAlt="Sales Icon"
                trend={currentKPIs.loyaltySalesTrend}
                trendLabel="مقارنة بالفترة السابقة"
                className="col-span-2"
              />
              <StatCard
                title="العودة"
                value={currentKPIs.repurchaseRate}
                icon="/icons/referral.svg"
                iconAlt="Repurchase Icon"
                trend={currentKPIs.repurchaseRateTrend}
                trendLabel="مقارنة بالفترة السابقة"
                className="col-span-2"
              />
              <StatCard
                title="التفاعل"
                value={currentKPIs.engagementRate}
                icon="/icons/engagement-icon.png"
                iconAlt="Engagement Icon"
                trend={currentKPIs.engagementRateTrend}
                trendLabel="مقارنة بالفترة السابقة"
                className="col-span-2"
              />
            </div>

            {/* Charts Row */}
            <div className="col-span-8 grid grid-cols-2 gap-4">
              <Card className="col-span-2 border border-gray-200 rounded-[24px]">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-base font-normal text-gray-700">المبيعات</h2>
                    <Tabs value={salesChartPeriod} onValueChange={setSalesChartPeriod} dir="rtl">
                      <TabsList className="bg-gray-100 rounded-full">
                        <TabsTrigger
                          value="daily"
                          className="rounded-full data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-600"
                        >
                          يومي
                        </TabsTrigger>
                        <TabsTrigger
                          value="weekly"
                          className="rounded-full data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-600"
                        >
                          أسبوعي
                        </TabsTrigger>
                        <TabsTrigger
                          value="monthly"
                          className="rounded-full data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-600"
                        >
                          شهري
                        </TabsTrigger>
                        <TabsTrigger
                          value="yearly"
                          className="rounded-full data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-600"
                        >
                          سنوي
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  <div className="h-80 rtl-chart">
                    <BarChart data={currentChartData.sales} />
                  </div>
                </CardContent>
              </Card>

              {/* Customer Stats Card */}
              <div className="col-span-1">
                <CustomersStatsCard title="العملاء" icon="/icons/customers.svg" />
              </div>

              <Card className="border border-gray-200 rounded-[24px]">
                <CardContent className="p-5">
                  <h2 className="text-base font-normal text-gray-700 mb-6">المكافآت</h2>
                  <div className="h-64 rtl-chart">
                    <BarChart data={currentChartData.rewards} horizontal />
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-2 border border-gray-200 rounded-[24px]">
                <CardContent className="p-5">
                  <h2 className="text-base font-normal text-gray-700 mb-6">النقاط</h2>
                  <div className="h-80 rtl-chart">
                    <DoubleBarChart data={currentChartData.points} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="col-span-4 space-y-4">
              {/* Smart Alerts */}
              <Card className="border border-gray-200 rounded-[24px]">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-base font-normal text-gray-700">التنبيهات</h2>
                    <Button variant="ghost" className="text-blue-500 hover:bg-gray-100 rounded-full">
                      عرض الكل
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {smartAlertsData.map((alert) => (
                      <Card key={alert.id} className="border border-gray-200 rounded-[24px]">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="mt-1">{alert.icon}</div>
                            <div className="flex-1">
                              <h3 className="font-normal text-gray-700">{alert.title}</h3>
                              <p className="text-sm text-gray-500 mt-1">{alert.description}</p>
                              <Button
                                className="mt-3 h-8 text-sm rounded-full"
                                variant="outline"
                                onClick={() => handleAlertAction(alert)}
                              >
                                {alert.action}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border border-gray-200 rounded-[24px]">
                <CardContent className="p-5">
                  <h2 className="text-base font-normal text-gray-700 mb-6">إجراءات سريعة</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      className="bg-blue-500 hover:bg-blue-600 rounded-full"
                      onClick={() => handleQuickAction("reward")}
                    >
                      <Gift className="h-4 w-4 mr-2" />
                      إنشاء مكافأة
                    </Button>
                    <Button
                      className="bg-blue-500 hover:bg-blue-600 rounded-full"
                      onClick={() => handleQuickAction("campaign")}
                    >
                      <Target className="h-4 w-4 mr-2" />
                      إنشاء حملة
                    </Button>
                    <Button
                      className="bg-blue-500 hover:bg-blue-600 rounded-full"
                      onClick={() => handleQuickAction("challenge")}
                    >
                      <Award className="h-4 w-4 mr-2" />
                      إضافة تحدي
                    </Button>
                    <Button
                      className="bg-blue-500 hover:bg-blue-600 rounded-full"
                      onClick={() => handleQuickAction("notification")}
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      إرسال إشعار
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Marketing Campaigns Summary */}
              <Card className="border border-gray-200 rounded-[24px]">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-base font-normal text-gray-700">الحملات</h2>
                    <Button variant="ghost" className="text-blue-500 hover:bg-gray-100 rounded-full">
                      عرض الكل
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {campaignSummaryData.map((campaign) => (
                      <div
                        key={campaign.id}
                        className="border-b border-gray-100 pb-4 last:border-0 last:pb-0 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                        onClick={() => handleCampaignClick(campaign)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-normal text-gray-700">{campaign.name}</h3>
                            <p className="text-sm text-gray-500">{campaign.type}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-normal text-gray-700">فتح: {campaign.openRate}</span>
                            <span className="text-sm text-gray-500 block">نقر: {campaign.clickRate}</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>تم الإرسال: {campaign.sent}</span>
                            <span>تم الفتح: {campaign.opened}</span>
                            <span>تم النقر: {campaign.clicked}</span>
                          </div>
                          <Progress
                            value={(campaign.clicked / campaign.sent) * 100}
                            className="h-1.5 bg-gray-100"
                            indicatorClassName="bg-blue-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="points" className="mt-4">
          <div className="grid grid-cols-1 gap-4">
            <Card className="border border-gray-200 rounded-[24px]">
              <CardContent className="p-5">
                <h2 className="text-lg font-normal text-gray-700 mb-6">النقاط</h2>
                {/* Content for Points & Rewards tab */}
                <p className="text-gray-500">محتوى تفصيلي عن النقاط والمكافآت سيظهر هنا...</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="mt-4">
          <div className="grid grid-cols-1 gap-4">
            <Card className="border border-gray-200 rounded-[24px]">
              <CardContent className="p-5">
                <h2 className="text-lg font-normal text-gray-700 mb-6">العملاء</h2>
                {/* Content for Customers tab */}
                <p className="text-gray-500">محتوى تفصيلي عن العملاء سيظهر هنا...</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="marketing" className="mt-4">
          <div className="grid grid-cols-1 gap-4">
            <Card className="border border-gray-200 rounded-[24px]">
              <CardContent className="p-5">
                <h2 className="text-lg font-normal text-gray-700 mb-6">التسويق</h2>
                {/* Content for Marketing tab */}
                <p className="text-gray-500">محتوى تفصيلي عن التسويق سيظهر هنا...</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Welcome Dialog */}
      <Dialog open={showWelcomeDialog} onOpenChange={setShowWelcomeDialog}>
        <DialogContent className="sm:max-w-[500px] border border-gray-200 shadow-none rounded-[24px]">
          <DialogHeader>
            <DialogTitle className="text-right text-gray-700 font-normal">مرحباً بك في BOND.IT</DialogTitle>
            <DialogDescription className="text-right">نظام الولاء الأمثل للمتاجر الإلكترونية</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-right text-sm text-gray-600">
              مرحباً بك في لوحة تحكم BOND.IT! يمكنك الآن استكشاف جميع الميزات المتاحة.
            </p>
            <p className="text-right text-sm text-gray-600">
              انقر على أي عنصر في اللوحة للحصول على مزيد من التفاصيل والإحصائيات.
            </p>
          </div>
          <div className="flex justify-end">
            <Button
              className="bg-blue-500 hover:bg-blue-600 transition-colors text-sm h-8 rounded-full"
              onClick={() => setShowWelcomeDialog(false)}
            >
              ابدأ الآن
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Action Dialog */}
      <Dialog open={showActionDialog} onOpenChange={setShowActionDialog}>
        <DialogContent className="sm:max-w-[500px] border border-gray-200 shadow-none rounded-[24px] rtl">
          <DialogHeader>
            <DialogTitle className="text-right text-gray-700 font-normal">{currentAction?.title}</DialogTitle>
            <DialogDescription className="text-right">{currentAction?.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-right block">
                الاسم
              </Label>
              <Input id="name" placeholder="أدخل الاسم" className="text-right" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-right block">
                الوصف
              </Label>
              <Textarea id="description" placeholder="أدخل الوصف" className="text-right" />
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="outline" onClick={() => setShowActionDialog(false)} className="rounded-full">
              إلغاء
            </Button>
            <Button
              className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-full"
              onClick={currentAction?.onSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "جاري التنفيذ..." : "تنفيذ"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Campaign Details Dialog */}
      <Dialog open={showCampaignDetails} onOpenChange={setShowCampaignDetails}>
        <DialogContent className="sm:max-w-[600px] border border-gray-200 shadow-none rounded-[24px] rtl">
          <DialogHeader>
            <DialogTitle className="text-right text-gray-700 font-normal">تفاصيل الحملة</DialogTitle>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">اسم الحملة</p>
                  <p className="font-medium">{selectedCampaign.name}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">نوع الحملة</p>
                  <p className="font-medium">{selectedCampaign.type}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">عنوان الرسالة</p>
                <p className="font-medium">{selectedCampaign.details.subject}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">محتوى الرسالة</p>
                <p className="font-medium">{selectedCampaign.details.content}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">الجمهور المستهدف</p>
                  <p className="font-medium">{selectedCampaign.details.audience}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">تاريخ الإرسال</p>
                  <p className="font-medium">{selectedCampaign.details.date}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">الإحصائيات</p>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="bg-white p-2 rounded-lg text-center">
                    <p className="text-xs text-gray-500">تم الإرسال</p>
                    <p className="font-medium">{selectedCampaign.sent}</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg text-center">
                    <p className="text-xs text-gray-500">تم الفتح</p>
                    <p className="font-medium">
                      {selectedCampaign.opened} ({selectedCampaign.openRate})
                    </p>
                  </div>
                  <div className="bg-white p-2 rounded-lg text-center">
                    <p className="text-xs text-gray-500">تم النقر</p>
                    <p className="font-medium">
                      {selectedCampaign.clicked} ({selectedCampaign.clickRate})
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-full"
              onClick={() => setShowCampaignDetails(false)}
            >
              إغلاق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
