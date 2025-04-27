"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Download, Search, Edit, Trash } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { ColorPicker } from "@/components/color-picker"
import { Badge, Level } from "@/app/api/badges-levels/route"
import { useToast } from "@/components/ui/use-toast"

// Datos de ejemplo para los niveles como fallback
const defaultLevels = [
  {
    id: 1,
    name: "برونزي",
    pointsRequired: 0,
    benefits: ["خصم 5%", "شحن مجاني"],
    icon: "/images/levels/bronze.svg",
    customers: 450,
  },
  {
    id: 2,
    name: "فضي",
    pointsRequired: 1000,
    benefits: ["خصم 10%", "شحن مجاني", "هدية ترحيبية"],
    icon: "/images/levels/silver.svg",
    customers: 280,
  },
  {
    id: 3,
    name: "ذهبي",
    pointsRequired: 5000,
    benefits: ["خصم 15%", "شحن مجاني", "هدية ترحيبية", "خدمة عملاء VIP"],
    icon: "/images/levels/gold.svg",
    customers: 120,
  },
  {
    id: 4,
    name: "بلاتيني",
    pointsRequired: 10000,
    benefits: ["خصم 20%", "شحن مجاني", "هدية ترحيبية", "خدمة عملاء VIP", "دعوات لفعاليات خاصة"],
    icon: "/images/levels/platinum.svg",
    customers: 45,
  },
]

// Datos de ejemplo para las insignias como fallback
const defaultBadges = [
  {
    id: "b-001",
    name: "مستكشف جديد",
    description: "أكمل أول طلب",
    imageUrl: "/images/badges/first-purchase.svg",
    criteria: "أكمل أول طلب",
    rarity: "common" as const,
    isActive: true,
    customers: 850,
  },
  {
    id: "b-002",
    name: "متسوق منتظم",
    description: "أكمل 5 طلبات",
    imageUrl: "/images/badges/early-adopter.svg",
    criteria: "أكمل 5 طلبات",
    rarity: "rare" as const,
    isActive: true,
    customers: 420,
  },
  {
    id: "b-003",
    name: "ناقد خبير",
    description: "اكتب 10 مراجعات للمنتجات",
    imageUrl: "/images/badges/social-butterfly.svg",
    criteria: "اكتب 10 مراجعات للمنتجات",
    rarity: "common" as const,
    isActive: true,
    customers: 180,
  },
  {
    id: "b-004",
    name: "مسوق ماهر",
    description: "قم بدعوة 5 أصدقاء",
    imageUrl: "/images/badges/loyal-customer.svg",
    criteria: "قم بدعوة 5 أصدقاء",
    rarity: "epic" as const,
    isActive: true,
    customers: 95,
  },
]

// Add extended interfaces to handle the UI-specific fields
interface ExtendedBadge extends Badge {
  customers?: number;
}

interface ExtendedLevel extends Level {
  customers?: number;
}

export default function BadgesLevelsPage() {
  const [activeTab, setActiveTab] = useState("levels")
  const [openLevelDialog, setOpenLevelDialog] = useState(false)
  const [openBadgeDialog, setOpenBadgeDialog] = useState(false)
  const [selectedColor, setSelectedColor] = useState("#3B82F6")
  const [searchTerm, setSearchTerm] = useState("")
  const [levels, setLevels] = useState<ExtendedLevel[]>([])
  const [badges, setBadges] = useState<ExtendedBadge[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  
  // Fetch data from API
  useEffect(() => {
    const fetchBadgesAndLevels = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/badges-levels')
        
        if (!response.ok) {
          throw new Error('Failed to fetch badges and levels data')
        }
        
        const data = await response.json()
        // Add customers property to levels from API
        if (data.levels) {
          const levelsWithCustomers = data.levels.map((level: Level, index: number) => ({
            ...level,
            customers: defaultLevels[index]?.customers || Math.floor(Math.random() * 500)
          }))
          setLevels(levelsWithCustomers)
        }
        
        // Add customers property to badges from API
        if (data.badges) {
          const badgesWithCustomers = data.badges.map((badge: Badge, index: number) => ({
            ...badge,
            customers: defaultBadges[index]?.customers || Math.floor(Math.random() * 500)
          }))
          setBadges(badgesWithCustomers)
        }
      } catch (error) {
        console.error('Error fetching badges and levels:', error)
        toast({
          title: "خطأ في التحميل",
          description: "حدث خطأ أثناء تحميل بيانات الشارات والمستويات",
          variant: "destructive",
        })
        // Use default data on error
        setBadges(defaultBadges)
        setLevels(defaultLevels)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBadgesAndLevels()
  }, [toast])

  // Filter badges and levels based on search term
  const filteredBadges = badges.filter(badge => 
    badge.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    badge.description.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const filteredLevels = levels.filter(level => 
    level.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-6" dir="rtl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">الشارات والمستويات</h1>
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
          {activeTab === "levels" ? (
            <Dialog open={openLevelDialog} onOpenChange={setOpenLevelDialog}>
              <DialogTrigger asChild>
                <Button className="bg-blue-500 hover:bg-blue-600 transition-colors">
                  <Plus className="ml-2 h-4 w-4" />
                  إضافة مستوى جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>إضافة مستوى جديد</DialogTitle>
                  <DialogDescription>قم بإدخال تفاصيل المستوى الجديد هنا. اضغط على حفظ عند الانتهاء.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="level-name">اسم المستوى</Label>
                    <Input id="level-name" placeholder="مثال: ماسي" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="level-points">النقاط المطلوبة</Label>
                    <Input id="level-points" type="number" placeholder="مثال: 15000" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="level-benefits">المزايا</Label>
                    <Input id="level-benefits" placeholder="مثال: خصم 25%، شحن مجاني، هدية ترحيبية" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="level-color">لون المستوى</Label>
                    <ColorPicker defaultValue={selectedColor} onChange={setSelectedColor} />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenLevelDialog(false)}>
                    إلغاء
                  </Button>
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 transition-colors"
                    onClick={() => setOpenLevelDialog(false)}
                  >
                    حفظ المستوى
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <Dialog open={openBadgeDialog} onOpenChange={setOpenBadgeDialog}>
              <DialogTrigger asChild>
                <Button className="bg-blue-500 hover:bg-blue-600 transition-colors">
                  <Plus className="ml-2 h-4 w-4" />
                  إضافة شارة جديدة
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>إضافة شارة جديدة</DialogTitle>
                  <DialogDescription>قم بإدخال تفاصيل الشارة الجديدة هنا. اضغط على حفظ عند الانتهاء.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="badge-name">اسم الشارة</Label>
                    <Input id="badge-name" placeholder="مثال: عميل مميز" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="badge-description">وصف الشارة</Label>
                    <Input id="badge-description" placeholder="مثال: أكمل 20 طلب" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="badge-icon">الأيقونة</Label>
                    <div className="flex gap-2 flex-wrap">
                      {["🌟", "🏆", "🎖️", "🥇", "🎯", "💎", "👑", "🔥", "⭐", "🌈"].map((icon) => (
                        <button
                          key={icon}
                          className={`text-2xl p-2 border rounded-md hover:bg-gray-100 ${
                            icon === "🌟" ? "border-blue-500 bg-blue-50" : ""
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenBadgeDialog(false)}>
                    إلغاء
                  </Button>
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 transition-colors"
                    onClick={() => setOpenBadgeDialog(false)}
                  >
                    حفظ الشارة
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-500">جاري التحميل...</div>
        </div>
      ) : (
      <Card className="bg-white shadow-sm rounded-3xl border border-gray-100">
        <CardContent className="p-0">
          <Tabs defaultValue="levels" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b">
              <div className="px-6 flex justify-end">
                <TabsList className="bg-transparent border-b-0 h-14 p-0 gap-8">
                  <TabsTrigger
                    value="levels"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0"
                  >
                    المستويات
                  </TabsTrigger>
                  <TabsTrigger
                    value="badges"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0"
                  >
                    الشارات
                  </TabsTrigger>
                  <TabsTrigger
                    value="settings"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0"
                  >
                    الإعدادات
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            <div className="p-6 text-right" dir="rtl">
              <TabsContent value="levels" className="mt-0">
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="text-right font-medium">اسم المستوى</TableHead>
                        <TableHead className="text-right font-medium">النقاط المطلوبة</TableHead>
                        <TableHead className="text-right font-medium">المزايا</TableHead>
                        <TableHead className="text-right font-medium">عدد العملاء</TableHead>
                        <TableHead className="text-right font-medium">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredLevels.map((level) => (
                          <TableRow key={level.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-4 h-4 rounded-full"
                                  style={{ backgroundColor: level.id === 1 ? "#CD7F32" : level.id === 2 ? "#C0C0C0" : level.id === 3 ? "#FFD700" : "#E5E4E2" }}
                                ></div>
                                {level.name}
                            </div>
                          </TableCell>
                            <TableCell>{level.pointsRequired}</TableCell>
                            <TableCell>{level.benefits.join(', ')}</TableCell>
                            <TableCell>{level.customers || 0}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500">
                                <Edit className="h-4 w-4" />
                              </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
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
              <TabsContent value="badges" className="mt-0">
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="text-right font-medium">اسم الشارة</TableHead>
                        <TableHead className="text-right font-medium">الوصف</TableHead>
                          <TableHead className="text-right font-medium">الندرة</TableHead>
                          <TableHead className="text-right font-medium">الحالة</TableHead>
                        <TableHead className="text-right font-medium">عدد العملاء</TableHead>
                        <TableHead className="text-right font-medium">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredBadges.map((badge) => (
                          <TableRow key={badge.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <span className="text-xl">{badge.imageUrl ? "🏆" : "🏆"}</span>
                                {badge.name}
                              </div>
                            </TableCell>
                            <TableCell>{badge.description}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                badge.rarity === "legendary" ? "bg-purple-100 text-purple-700" : 
                                badge.rarity === "epic" ? "bg-orange-100 text-orange-700" : 
                                badge.rarity === "rare" ? "bg-blue-100 text-blue-700" : 
                                "bg-green-100 text-green-700"
                              }`}>
                                {badge.rarity === "legendary" ? "أسطوري" : 
                                 badge.rarity === "epic" ? "نادر جداً" : 
                                 badge.rarity === "rare" ? "نادر" : "شائع"}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${badge.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                                {badge.isActive ? "مفعّل" : "معطّل"}
                              </span>
                          </TableCell>
                            <TableCell>{badge.customers || 0}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500">
                                <Edit className="h-4 w-4" />
                              </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
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
              <TabsContent value="settings" className="mt-0">
                <div className="space-y-6">
                    <h3 className="text-lg font-medium">إعدادات المستويات والشارات</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">إعدادات المستويات</h4>
                        <div className="space-y-2">
                          <Label htmlFor="level-name-display">عرض اسم المستوى</Label>
                          <div className="flex items-center">
                            <input type="checkbox" id="level-name-display" className="ml-2" defaultChecked />
                            <label htmlFor="level-name-display">إظهار اسم المستوى للعميل</label>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="level-progress-display">عرض تقدم المستوى</Label>
                          <div className="flex items-center">
                            <input type="checkbox" id="level-progress-display" className="ml-2" defaultChecked />
                            <label htmlFor="level-progress-display">إظهار نسبة التقدم نحو المستوى التالي</label>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="level-email-notification">إشعارات البريد الإلكتروني</Label>
                          <div className="flex items-center">
                            <input type="checkbox" id="level-email-notification" className="ml-2" defaultChecked />
                            <label htmlFor="level-email-notification">إرسال إشعار عند ترقية المستوى</label>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-medium">إعدادات الشارات</h4>
                        <div className="space-y-2">
                          <Label htmlFor="badge-animation">تفعيل رسوم متحركة</Label>
                          <div className="flex items-center">
                            <input type="checkbox" id="badge-animation" className="ml-2" defaultChecked />
                            <label htmlFor="badge-animation">عرض رسوم متحركة عند الحصول على شارة جديدة</label>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="badge-showcase">عرض الشارات</Label>
                          <div className="flex items-center">
                            <input type="checkbox" id="badge-showcase" className="ml-2" defaultChecked />
                            <label htmlFor="badge-showcase">السماح للعملاء بعرض شاراتهم في ملفهم الشخصي</label>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="badge-hidden">الشارات المخفية</Label>
                          <div className="flex items-center">
                            <input type="checkbox" id="badge-hidden" className="ml-2" defaultChecked />
                            <label htmlFor="badge-hidden">عرض الشارات المخفية (التي لم يتم اكتسابها) في قائمة الشارات</label>
                          </div>
                        </div>
                      </div>
                        </div>
                    <div className="flex justify-end gap-2 mt-8">
                      <Button variant="outline">إعادة تعيين</Button>
                    <Button className="bg-blue-500 hover:bg-blue-600 transition-colors">حفظ الإعدادات</Button>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
      )}
    </div>
  )
}
