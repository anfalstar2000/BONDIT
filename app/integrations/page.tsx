"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus, Search, Download, Link, Check, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
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

// تحديث بيانات التكاملات
const integrations = [
  {
    id: "1",
    name: "سلة",
    description: "منصة التجارة الإلكترونية الأكثر شعبية في السعودية",
    category: "ecommerce",
    status: "مفعل",
    icon: "/placeholder.svg?height=48&width=48",
  },
  {
    id: "2",
    name: "زد",
    description: "منصة متكاملة لإدارة المتاجر الإلكترونية",
    category: "ecommerce",
    status: "غير مفعل",
    icon: "/placeholder.svg?height=48&width=48",
  },
  {
    id: "3",
    name: "واتساب",
    description: "منصة المراسلة الأكثر استخدامًا للتواصل مع العملاء",
    category: "marketing",
    status: "غير مفعل",
    icon: "/placeholder.svg?height=48&width=48",
  },
  {
    id: "4",
    name: "Apple Wallet",
    description: "إضافة بطاقات الولاء الرقمية إلى محفظة آبل",
    category: "marketing",
    status: "قريبًا",
    icon: "/placeholder.svg?height=48&width=48",
  },
  {
    id: "5",
    name: "Google",
    description: "تكامل مع خدمات Google مثل Google Analytics أو Google Ads لتحسين أداء البرنامج وتتبع العملاء",
    category: "marketing",
    status: "غير مفعل",
    icon: "/placeholder.svg?height=48&width=48",
  },
]

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState("ecommerce")
  const [searchTerm, setSearchTerm] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)
  const [connected, setConnected] = useState(false)

  // Filtrar integraciones según la categoría y el término de búsqueda
  const filteredIntegrations = integrations.filter(
    (integration) =>
      (activeTab === "all" || integration.category === activeTab) &&
      (integration.name.includes(searchTerm) || integration.description.includes(searchTerm)),
  )

  // تحديث وظيفة الاتصال
  const handleConnect = () => {
    if (!selectedIntegration) return

    setConnecting(true)
    setTimeout(() => {
      setConnecting(false)
      setConnected(true)
      setTimeout(() => {
        setOpenDialog(false)
        setConnected(false)
        // في تطبيق حقيقي، هذا سيتم من خلال استدعاء API
      }, 1500)
    }, 2000)
  }

  return (
    <div className="container mx-auto p-6" dir="rtl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">التكاملات</h1>
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
          <Button className="bg-blue-500 hover:bg-blue-600 transition-colors">
            <Plus className="ml-2 h-4 w-4" />
            إضافة تكامل جديد
          </Button>
        </div>
      </div>

      <Card className="bg-white shadow-sm rounded-3xl border border-gray-100">
        <CardContent className="p-0">
          <Tabs defaultValue="ecommerce" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b">
              <div className="px-6 flex justify-end">
                <TabsList className="bg-transparent border-b-0 h-14 p-0 gap-8 flex-row-reverse">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0 transition-colors"
                  >
                    جميع التكاملات
                  </TabsTrigger>
                  <TabsTrigger
                    value="ecommerce"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0 transition-colors"
                  >
                    منصات التجارة الإلكترونية
                  </TabsTrigger>
                  <TabsTrigger
                    value="marketing"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0 transition-colors"
                  >
                    أدوات التسويق
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 grid-flow-dense rtl:grid-flow-dense">
                {filteredIntegrations.length > 0 ? (
                  filteredIntegrations.map((integration) => (
                    <Card
                      key={integration.id}
                      className="bg-white shadow-sm border-2 border-dashed border-gray-200 hover:border-blue-500 transition-colors rounded-3xl"
                    >
                      <CardContent className="p-6 flex flex-col items-end justify-center text-right h-64">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <img
                            src={integration.icon || "/placeholder.svg"}
                            alt={integration.name}
                            className="w-8 h-8"
                          />
                        </div>
                        <h3 className="text-lg font-medium mb-2">{integration.name}</h3>
                        <p className="text-gray-500 mb-4">{integration.description}</p>
                        <Badge
                          className={
                            integration.status === "مفعل"
                              ? "bg-green-100 text-green-800 mb-4"
                              : integration.status === "قريبًا"
                                ? "bg-gray-100 text-gray-500 mb-4"
                                : "bg-gray-100 text-gray-800 mb-4"
                          }
                        >
                          {integration.status}
                        </Badge>
                        <Dialog
                          open={openDialog && selectedIntegration === integration.id}
                          onOpenChange={(open) => {
                            setOpenDialog(open)
                            if (!open) setSelectedIntegration(null)
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant={integration.status === "مفعل" ? "outline" : "default"}
                              className={
                                integration.status === "مفعل"
                                  ? "text-blue-500 border-blue-500 hover:bg-blue-50"
                                  : integration.status === "قريبًا"
                                    ? "bg-gray-300 hover:bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-500 hover:bg-blue-600"
                              }
                              onClick={() => {
                                if (integration.status !== "قريبًا") {
                                  setSelectedIntegration(integration.id)
                                  setOpenDialog(true)
                                }
                              }}
                              disabled={integration.status === "قريبًا"}
                            >
                              {integration.status === "مفعل"
                                ? "إعدادات الربط"
                                : integration.status === "قريبًا"
                                  ? "قريبًا"
                                  : "تفعيل"}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>
                                {integration.status === "مفعل" ? "إعدادات ربط" : "تفعيل تكامل"} {integration.name}
                              </DialogTitle>
                              <DialogDescription>
                                {integration.status === "مفعل"
                                  ? "يمكنك إدارة إعدادات التكامل أو إلغاء تفعيله."
                                  : "قم بإدخال بيانات الاعتماد الخاصة بك لتفعيل التكامل."}
                              </DialogDescription>
                            </DialogHeader>
                            {integration.status === "مفعل" ? (
                              <div className="space-y-4 py-4">
                                <div className="bg-green-50 p-4 rounded-md flex items-center gap-2">
                                  <Check className="h-5 w-5 text-green-500" />
                                  <span>تم الاتصال بنجاح</span>
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="integration-id">معرف التكامل</Label>
                                  <Input id="integration-id" value="int_12345" readOnly />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="integration-account">الحساب المرتبط</Label>
                                  <Input
                                    id="integration-account"
                                    value={integration.name === "Google" ? "example@gmail.com" : "user@example.com"}
                                    readOnly
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="integration-status">الحالة</Label>
                                  <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span>نشط</span>
                                  </div>
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="integration-last-sync">آخر مزامنة</Label>
                                  <div>2025-07-28 10:30:45</div>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-4 py-4">
                                {integration.name === "Google" ? (
                                  <>
                                    <div className="grid gap-2">
                                      <Label htmlFor="client-id">معرف العميل</Label>
                                      <Input id="client-id" placeholder="أدخل معرف العميل من Google Cloud Console" />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="client-secret">سر العميل</Label>
                                      <Input
                                        id="client-secret"
                                        type="password"
                                        placeholder="أدخل سر العميل من Google Cloud Console"
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="redirect-uri">عنوان إعادة التوجيه</Label>
                                      <Input
                                        id="redirect-uri"
                                        value="https://your-bondit-app.com/auth/callback"
                                        readOnly
                                      />
                                      <p className="text-xs text-gray-500">
                                        استخدم هذا العنوان في إعدادات OAuth في Google Cloud Console
                                      </p>
                                    </div>
                                  </>
                                ) : integration.name === "واتساب" ? (
                                  <>
                                    <div className="grid gap-2">
                                      <Label htmlFor="phone-number">رقم الهاتف</Label>
                                      <Input
                                        id="phone-number"
                                        placeholder="أدخل رقم الهاتف المرتبط بحساب واتساب الأعمال"
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="api-key">مفتاح API</Label>
                                      <Input
                                        id="api-key"
                                        type="password"
                                        placeholder="أدخل مفتاح API من حساب واتساب الأعمال"
                                      />
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="grid gap-2">
                                      <Label htmlFor="api-key">مفتاح API</Label>
                                      <Input id="api-key" placeholder="أدخل مفتاح API الخاص بك" />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="api-secret">كلمة سر API</Label>
                                      <Input id="api-secret" type="password" placeholder="أدخل كلمة سر API الخاصة بك" />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="store-url">رابط المتجر</Label>
                                      <Input id="store-url" placeholder="https://your-store.com" />
                                    </div>
                                  </>
                                )}
                                <div className="flex items-center gap-2">
                                  <ExternalLink className="h-4 w-4 text-blue-500" />
                                  <a
                                    href="#"
                                    className="text-blue-500 hover:underline text-sm"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    كيفية الحصول على بيانات الاعتماد
                                  </a>
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              {integration.status === "مفعل" ? (
                                <>
                                  <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50">
                                    إلغاء التفعيل
                                  </Button>
                                  <Button className="bg-blue-500 hover:bg-blue-600 transition-colors">
                                    تحديث الإعدادات
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button variant="outline" onClick={() => setOpenDialog(false)}>
                                    إلغاء
                                  </Button>
                                  <Button
                                    className="bg-blue-500 hover:bg-blue-600 transition-colors"
                                    onClick={handleConnect}
                                    disabled={connecting}
                                  >
                                    {connecting ? "جاري التفعيل..." : connected ? "تم التفعيل بنجاح!" : "تفعيل"}
                                    {!connecting && connected && <Check className="mr-2 h-4 w-4" />}
                                  </Button>
                                </>
                              )}
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-3 text-right py-12">
                    <Link className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">لا توجد تكاملات</h3>
                    <p className="text-gray-500 mb-6">لم يتم العثور على تكاملات تطابق معايير البحث</p>
                    <Button
                      className="bg-blue-500 hover:bg-blue-600 transition-colors"
                      onClick={() => setSearchTerm("")}
                    >
                      عرض جميع التكاملات
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
