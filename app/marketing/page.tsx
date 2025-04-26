"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Download, Filter, Edit, Trash, Mail, MessageSquare, Bell, Send } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
import { Textarea } from "@/components/ui/textarea"

// Datos de ejemplo para las campañas
const campaigns = [
  {
    id: "1",
    name: "عروض نهاية الأسبوع",
    type: "بريد إلكتروني",
    audience: "جميع العملاء",
    sent: 1250,
    opened: 680,
    clicked: 320,
    date: "2025-07-28",
    status: "مكتمل",
  },
  {
    id: "2",
    name: "تخفيضات الصيف",
    type: "رسالة نصية",
    audience: "العملاء النشطين",
    sent: 950,
    opened: 820,
    clicked: 450,
    date: "2025-07-25",
    status: "مكتمل",
  },
  {
    id: "3",
    name: "منتجات جديدة",
    type: "إشعار",
    audience: "العملاء المميزين",
    sent: 580,
    opened: 420,
    clicked: 210,
    date: "2025-07-22",
    status: "مكتمل",
  },
  {
    id: "4",
    name: "تذكير بالسلة المتروكة",
    type: "بريد إلكتروني",
    audience: "العملاء ذوي السلات المتروكة",
    sent: 320,
    opened: 180,
    clicked: 95,
    date: "2025-07-20",
    status: "مكتمل",
  },
  {
    id: "5",
    name: "عيد ميلاد سعيد",
    type: "رسالة نصية",
    audience: "عملاء أعياد الميلاد",
    sent: 0,
    opened: 0,
    clicked: 0,
    date: "2025-08-01",
    status: "مجدول",
  },
]

// Datos de ejemplo para las plantillas
const templates = [
  {
    id: "1",
    name: "ترحيب بالعملاء الجدد",
    type: "بريد إلكتروني",
    subject: "مرحباً بك في متجرنا!",
    usage: 450,
  },
  {
    id: "2",
    name: "تأكيد الطلب",
    type: "بريد إلكتروني",
    subject: "تم تأكيد طلبك بنجاح",
    usage: 1250,
  },
  {
    id: "3",
    name: "إشعار الشحن",
    type: "رسالة نصية",
    subject: "تم شحن طلبك",
    usage: 980,
  },
  {
    id: "4",
    name: "تذكير بالسلة المتروكة",
    type: "بريد إلكتروني",
    subject: "هل نسيت شيئاً في سلتك؟",
    usage: 320,
  },
  {
    id: "5",
    name: "عيد ميلاد سعيد",
    type: "رسالة نصية",
    subject: "عيد ميلاد سعيد! هدية خاصة بانتظارك",
    usage: 180,
  },
]

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState("campaigns")
  const [searchTerm, setSearchTerm] = useState("")
  const [openCampaignDialog, setOpenCampaignDialog] = useState(false)
  const [openTemplateDialog, setOpenTemplateDialog] = useState(false)
  const [messageType, setMessageType] = useState("email")
  const [isSending, setIsSending] = useState(false)
  const [sendSuccess, setSendSuccess] = useState(false)

  // Filtrar campañas según el término de búsqueda
  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.includes(searchTerm) ||
      campaign.type.includes(searchTerm) ||
      campaign.audience.includes(searchTerm) ||
      campaign.status.includes(searchTerm),
  )

  // Filtrar plantillas según el término de búsqueda
  const filteredTemplates = templates.filter(
    (template) =>
      template.name.includes(searchTerm) || template.type.includes(searchTerm) || template.subject.includes(searchTerm),
  )

  // Función para simular el envío de una حملة
  const handleSendCampaign = () => {
    setIsSending(true)
    setTimeout(() => {
      setIsSending(false)
      setSendSuccess(true)
      setTimeout(() => {
        setOpenCampaignDialog(false)
        setSendSuccess(false)
      }, 1500)
    }, 2000)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">الرسائل التسويقية</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="بحث..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10 py-2 border border-gray-200 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <Button variant="outline" className="border-gray-200 hover:bg-gray-50 transition-colors">
            <Download className="ml-2 h-4 w-4" />
            تصدير
          </Button>
          {activeTab === "campaigns" ? (
            <Dialog open={openCampaignDialog} onOpenChange={setOpenCampaignDialog}>
              <DialogTrigger asChild>
                <Button className="bg-blue-500 hover:bg-blue-600 transition-colors">
                  <Plus className="ml-2 h-4 w-4" />
                  إنشاء حملة جديدة
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>إنشاء حملة جديدة</DialogTitle>
                  <DialogDescription>
                    قم بإدخال تفاصيل الحملة الجديدة هنا. اضغط على إرسال عند الانتهاء.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="campaign-name">اسم الحملة</Label>
                    <Input id="campaign-name" placeholder="مثال: عروض العيد" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="campaign-type">نوع الرسالة</Label>
                    <select
                      id="campaign-type"
                      className="border rounded-md p-2"
                      value={messageType}
                      onChange={(e) => setMessageType(e.target.value)}
                    >
                      <option value="email">بريد إلكتروني</option>
                      <option value="sms">رسالة نصية</option>
                      <option value="notification">إشعار</option>
                    </select>
                  </div>
                  {messageType === "email" && (
                    <div className="grid gap-2">
                      <Label htmlFor="campaign-subject">عنوان الرسالة</Label>
                      <Input id="campaign-subject" placeholder="مثال: عروض حصرية لك!" />
                    </div>
                  )}
                  <div className="grid gap-2">
                    <Label htmlFor="campaign-content">محتوى الرسالة</Label>
                    <Textarea id="campaign-content" placeholder="أدخل محتوى الرسالة هنا..." rows={5} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="campaign-audience">الجمهور المستهدف</Label>
                    <select id="campaign-audience" className="border rounded-md p-2">
                      <option value="all">جميع العملاء</option>
                      <option value="active">العملاء النشطين</option>
                      <option value="inactive">العملاء غير النشطين</option>
                      <option value="vip">العملاء المميزين</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="campaign-date">تاريخ الإرسال</Label>
                    <Input id="campaign-date" type="datetime-local" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenCampaignDialog(false)}>
                    إلغاء
                  </Button>
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 transition-colors"
                    onClick={handleSendCampaign}
                    disabled={isSending}
                  >
                    {isSending ? "جاري الإرسال..." : sendSuccess ? "تم الإرسال بنجاح!" : "إرسال"}
                    {!isSending && !sendSuccess && <Send className="mr-2 h-4 w-4" />}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <Dialog open={openTemplateDialog} onOpenChange={setOpenTemplateDialog}>
              <DialogTrigger asChild>
                <Button className="bg-blue-500 hover:bg-blue-600 transition-colors">
                  <Plus className="ml-2 h-4 w-4" />
                  إنشاء قالب جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>إنشاء قالب جديد</DialogTitle>
                  <DialogDescription>قم بإدخال تفاصيل القالب الجديد هنا. اضغط على حفظ عند الانتهاء.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="template-name">اسم القالب</Label>
                    <Input id="template-name" placeholder="مثال: ترحيب بالعملاء" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="template-type">نوع الرسالة</Label>
                    <select
                      id="template-type"
                      className="border rounded-md p-2"
                      value={messageType}
                      onChange={(e) => setMessageType(e.target.value)}
                    >
                      <option value="email">بريد إلكتروني</option>
                      <option value="sms">رسالة نصية</option>
                      <option value="notification">إشعار</option>
                    </select>
                  </div>
                  {messageType === "email" && (
                    <div className="grid gap-2">
                      <Label htmlFor="template-subject">عنوان الرسالة</Label>
                      <Input id="template-subject" placeholder="مثال: مرحباً بك في متجرنا!" />
                    </div>
                  )}
                  <div className="grid gap-2">
                    <Label htmlFor="template-content">محتوى القالب</Label>
                    <Textarea id="template-content" placeholder="أدخل محتوى القالب هنا..." rows={5} />
                  </div>
                  <div className="grid gap-2">
                    <Label>المتغيرات المتاحة</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">{"{{name}}"}</Badge>
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">{"{{email}}"}</Badge>
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">{"{{phone}}"}</Badge>
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">{"{{points}}"}</Badge>
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">{"{{level}}"}</Badge>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenTemplateDialog(false)}>
                    إلغاء
                  </Button>
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 transition-colors"
                    onClick={() => setOpenTemplateDialog(false)}
                  >
                    حفظ القالب
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-3xl border border-gray-100">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-gray-500">رصيد البريد الإلكتروني</h3>
              <div className="bg-blue-50 p-2 rounded-full">
                <Mail className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <p className="text-3xl font-bold mt-2">2,500 / 5,000</p>
            <div className="mt-2">
              <Progress value={50} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-3xl border border-gray-100">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-gray-500">رصيد الرسائل النصية</h3>
              <div className="bg-green-50 p-2 rounded-full">
                <MessageSquare className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <p className="text-3xl font-bold mt-2">500 / 1,000</p>
            <div className="mt-2">
              <Progress value={50} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-3xl border border-gray-100">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-gray-500">رصيد الإشعارات</h3>
              <div className="bg-purple-50 p-2 rounded-full">
                <Bell className="h-5 w-5 text-purple-500" />
              </div>
            </div>
            <p className="text-3xl font-bold mt-2">750 / 1,000</p>
            <div className="mt-2">
              <Progress value={75} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white shadow-sm rounded-3xl border border-gray-100">
        <CardContent className="p-0">
          <Tabs defaultValue="campaigns" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b">
              <div className="px-6 flex justify-end">
                <TabsList className="bg-transparent border-b-0 h-14 p-0 gap-8">
                  <TabsTrigger
                    value="campaigns"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0 transition-colors"
                  >
                    الحملات
                  </TabsTrigger>
                  <TabsTrigger
                    value="templates"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0 transition-colors"
                  >
                    القوالب
                  </TabsTrigger>
                  <TabsTrigger
                    value="statistics"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0 transition-colors"
                  >
                    الإحصائيات
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            <div className="p-6 text-right">
              <TabsContent value="campaigns" className="mt-0">
                <div className="flex flex-row-reverse justify-between items-center mb-4">
                  <div className="relative w-64">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="بحث عن حملة..."
                      className="pl-10 pr-10 py-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <Button variant="outline" className="border-gray-200 hover:bg-gray-50 transition-colors">
                    <Filter className="ml-2 h-4 w-4" />
                    تصفية
                  </Button>
                </div>

                <div className="border rounded-md overflow-hidden text-right">
                  <Table dir="rtl">
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="text-right font-medium">اسم الحملة</TableHead>
                        <TableHead className="text-right font-medium">نوع الرسالة</TableHead>
                        <TableHead className="text-right font-medium">الجمهور</TableHead>
                        <TableHead className="text-right font-medium">تم الإرسال</TableHead>
                        <TableHead className="text-right font-medium">معدل الفتح</TableHead>
                        <TableHead className="text-right font-medium">التاريخ</TableHead>
                        <TableHead className="text-right font-medium">الحالة</TableHead>
                        <TableHead className="text-right font-medium">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCampaigns.map((campaign) => (
                        <TableRow key={campaign.id} className="hover:bg-gray-50 transition-colors">
                          <TableCell className="font-medium">{campaign.name}</TableCell>
                          <TableCell className="text-right">{campaign.type}</TableCell>
                          <TableCell className="text-right">{campaign.audience}</TableCell>
                          <TableCell className="text-right">{campaign.sent}</TableCell>
                          <TableCell className="text-right">
                            {campaign.sent > 0 ? `${Math.round((campaign.opened / campaign.sent) * 100)}%` : "-"}
                          </TableCell>
                          <TableCell className="text-right">{campaign.date}</TableCell>
                          <TableCell className="text-right">
                            <Badge
                              className={
                                campaign.status === "مكتمل"
                                  ? "bg-green-100 text-green-800"
                                  : campaign.status === "مجدول"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-blue-100 text-blue-800"
                              }
                            >
                              {campaign.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-blue-500 hover:bg-blue-50 transition-colors"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500 hover:bg-red-50 transition-colors"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="templates" className="mt-0">
                <div className="flex flex-row-reverse justify-between items-center mb-4">
                  <div className="relative w-64">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="بحث عن قالب..."
                      className="pl-10 pr-10 py-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <Button variant="outline" className="border-gray-200 hover:bg-gray-50 transition-colors">
                    <Filter className="ml-2 h-4 w-4" />
                    تصفية
                  </Button>
                </div>

                <div className="border rounded-md overflow-hidden text-right">
                  <Table dir="rtl">
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="text-right font-medium">اسم القالب</TableHead>
                        <TableHead className="text-right font-medium">نوع الرسالة</TableHead>
                        <TableHead className="text-right font-medium">عنوان الرسالة</TableHead>
                        <TableHead className="text-right font-medium">عدد الاستخدامات</TableHead>
                        <TableHead className="text-right font-medium">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTemplates.map((template) => (
                        <TableRow key={template.id} className="hover:bg-gray-50 transition-colors">
                          <TableCell className="font-medium">{template.name}</TableCell>
                          <TableCell className="text-right">{template.type}</TableCell>
                          <TableCell>{template.subject}</TableCell>
                          <TableCell className="text-right">{template.usage}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-blue-500 hover:bg-blue-50 transition-colors"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500 hover:bg-red-50 transition-colors"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="statistics" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Gráfico de rendimiento de campañas */}
                  <Card className="bg-white shadow-sm rounded-3xl border border-gray-100">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium mb-4">أداء الحملات</h3>
                      <div className="h-64 flex items-center justify-center">
                        <div className="w-full h-full flex items-end justify-between">
                          {campaigns.slice(0, 5).map((campaign, index) => (
                            <div key={index} className="flex flex-col items-center">
                              <div className="flex flex-col items-center gap-1">
                                <div
                                  className="w-8 bg-blue-500 rounded-t-md"
                                  style={{
                                    height: `${Math.round((campaign.opened / (campaign.sent || 1)) * 100)}px`,
                                  }}
                                ></div>
                                <div
                                  className="w-8 bg-green-500 rounded-t-md"
                                  style={{
                                    height: `${Math.round((campaign.clicked / (campaign.sent || 1)) * 100)}px`,
                                  }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-2 max-w-[80px] truncate text-center">
                                {campaign.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-sm">معدل الفتح</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm">معدل النقر</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Estadísticas por tipo de mensaje */}
                  <Card className="bg-white shadow-sm rounded-3xl border border-gray-100">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium mb-4">الإحصائيات حسب نوع الرسالة</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">بريد إلكتروني</span>
                            <span className="text-sm font-medium">65%</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">رسالة نصية</span>
                            <span className="text-sm font-medium">25%</span>
                          </div>
                          <Progress value={25} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">إشعار</span>
                            <span className="text-sm font-medium">10%</span>
                          </div>
                          <Progress value={10} className="h-2" />
                        </div>
                      </div>
                      <div className="mt-6">
                        <h4 className="text-sm font-medium mb-2">إجمالي الرسائل المرسلة</h4>
                        <p className="text-3xl font-bold">3,100</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Mejores campañas */}
                  <Card className="bg-white shadow-sm rounded-3xl border border-gray-100">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium mb-4">أفضل الحملات أداءً</h3>
                      <div className="space-y-4">
                        {campaigns
                          .filter((campaign) => campaign.sent > 0)
                          .sort((a, b) => b.clicked / b.sent - a.clicked / a.sent)
                          .slice(0, 3)
                          .map((campaign, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50 transition-colors"
                            >
                              <div>
                                <div className="font-medium">{campaign.name}</div>
                                <div className="text-sm text-gray-500">{campaign.type}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">
                                  {Math.round((campaign.clicked / campaign.sent) * 100)}%
                                </div>
                                <div className="text-sm text-gray-500">معدل النقر</div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Audiencia */}
                  <Card className="bg-white shadow-sm rounded-3xl border border-gray-100">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium mb-4">توزيع الجمهور</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">جميع العملاء</span>
                            <span className="text-sm font-medium">40%</span>
                          </div>
                          <Progress value={40} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">العملاء النشطين</span>
                            <span className="text-sm font-medium">30%</span>
                          </div>
                          <Progress value={30} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">العملاء المميزين</span>
                            <span className="text-sm font-medium">20%</span>
                          </div>
                          <Progress value={20} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">أخرى</span>
                            <span className="text-sm font-medium">10%</span>
                          </div>
                          <Progress value={10} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
