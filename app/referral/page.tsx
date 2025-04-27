"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Users, Link, Download, Search, Edit, Trash } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Referral, ReferralHistory } from "@/app/api/referral/route"
import { useToast } from "@/components/ui/use-toast"

// Datos de ejemplo para las referencias como fallback
const defaultReferrals = [
  {
    id: "1",
    referrer: {
      name: "أحمد محمد",
      email: "ahmed@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    referred: {
      name: "محمد علي",
      email: "mohamed@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2025-07-28",
    status: "مكتمل",
    reward: "100 نقطة",
  },
  {
    id: "2",
    referrer: {
      name: "سارة أحمد",
      email: "sara@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    referred: {
      name: "فاطمة خالد",
      email: "fatima@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2025-07-25",
    status: "مكتمل",
    reward: "100 نقطة",
  },
  {
    id: "3",
    referrer: {
      name: "خالد عمر",
      email: "khaled@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    referred: {
      name: "عمر حسن",
      email: "omar@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2025-07-22",
    status: "معلق",
    reward: "معلق",
  },
  {
    id: "4",
    referrer: {
      name: "نورة سعيد",
      email: "noura@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    referred: {
      name: "سعاد محمد",
      email: "souad@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2025-07-20",
    status: "مكتمل",
    reward: "100 نقطة",
  },
  {
    id: "5",
    referrer: {
      name: "محمد سالم",
      email: "msalem@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    referred: {
      name: "سالم عبدالله",
      email: "salem@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2025-07-18",
    status: "ملغي",
    reward: "0 نقطة",
  },
]

// Interface for UI referral representation
interface UIReferral {
  id: string;
  referrer: {
    name: string;
    email: string;
    avatar: string;
  };
  referred: {
    name: string;
    email: string;
    avatar: string;
  };
  date: string;
  status: string;
  reward: string;
}

export default function ReferralPage() {
  const [activeTab, setActiveTab] = useState("statistics")
  const [searchTerm, setSearchTerm] = useState("")
  const [referralProgram, setReferralProgram] = useState<Referral | null>(null)
  const [referralHistory, setReferralHistory] = useState<ReferralHistory[]>([])
  const [uiReferrals, setUiReferrals] = useState<UIReferral[]>([])
  const [filteredReferrals, setFilteredReferrals] = useState<UIReferral[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Fetch referral data from the API
  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/referral')
        
        if (!response.ok) {
          throw new Error('Failed to fetch referral data')
        }
        
        const data = await response.json()
        
        if (data.program) {
          setReferralProgram(data.program)
        }
        
        if (data.history) {
          setReferralHistory(data.history)
          
          // Convert API history to UI referrals format
          const mappedReferrals: UIReferral[] = data.history.map((item: ReferralHistory) => {
            // Determine status in Arabic
            let status = "معلق"
            if (item.status === "completed") status = "مكتمل"
            else if (item.status === "expired") status = "منتهي"
            
            // Convert dates to readable format
            const date = new Date(item.dateReferred).toISOString().split('T')[0]
            
            // Get initials for avatar fallback
            const getInitials = (email: string) => {
              return email.substring(0, 2).toUpperCase()
            }
            
            return {
              id: item.id,
              referrer: {
                name: `User ${item.referrerUserId.split('-')[1]}`,
                email: "user@example.com",
                avatar: "/placeholder.svg?height=32&width=32",
              },
              referred: {
                name: item.refereeEmail.split('@')[0],
                email: item.refereeEmail,
                avatar: "/placeholder.svg?height=32&width=32",
              },
              date,
              status,
              reward: item.rewardClaimed 
                ? `${data.program.referrerReward.value} ${data.program.referrerReward.type === 'points' ? 'نقطة' : '%'}`
                : "معلق",
            }
          })
          
          setUiReferrals(mappedReferrals)
          setFilteredReferrals(mappedReferrals)
        }
      } catch (error) {
        console.error('Error fetching referral data:', error)
        toast({
          title: "خطأ في التحميل",
          description: "حدث خطأ أثناء تحميل بيانات برنامج الإحالة",
          variant: "destructive",
        })
        // Use default data on error
        setUiReferrals(defaultReferrals)
        setFilteredReferrals(defaultReferrals)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReferralData()
  }, [toast])

  // Filter referrals based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredReferrals(uiReferrals)
      return
    }

    const filtered = uiReferrals.filter(
    (referral) =>
        referral.referrer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        referral.referrer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        referral.referred.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        referral.referred.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        referral.status.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredReferrals(filtered)
  }, [searchTerm, uiReferrals])

  // Calculate statistics
  const completedReferrals = referralHistory.filter(r => r.status === "completed").length
  const pendingReferrals = referralHistory.filter(r => r.status === "pending").length
  const totalReferrals = referralHistory.length
  const totalRewardPoints = referralHistory
    .filter(r => r.rewardClaimed && r.status === "completed")
    .length * (referralProgram?.referrerReward.type === 'points' ? Number(referralProgram.referrerReward.value) : 0)

  return (
    <div className="container mx-auto p-6" dir="rtl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">برنامج الإحالة</h1>
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
            <Settings className="ml-2 h-4 w-4" />
            إعدادات البرنامج
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-500">جاري التحميل...</div>
        </div>
      ) : (
      <Card className="bg-white shadow-sm rounded-3xl border border-gray-100">
        <CardContent className="p-0">
          <Tabs defaultValue="statistics" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b">
              <div className="px-6 flex justify-end">
                <TabsList className="bg-transparent border-b-0 h-14 p-0 gap-8">
                  <TabsTrigger
                    value="statistics"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0"
                  >
                    الإحصائيات
                  </TabsTrigger>
                  <TabsTrigger
                    value="referrals"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0"
                  >
                    الإحالات
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
              <TabsContent value="statistics" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card className="bg-white shadow-sm rounded-3xl border border-gray-100">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium text-gray-500 text-right">إجمالي الإحالات</h3>
                        <div className="bg-blue-50 p-2 rounded-full">
                          <Link className="h-5 w-5 text-blue-500" />
                        </div>
                      </div>
                        <p className="text-3xl font-bold mt-2">{totalReferrals}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-sm text-green-500">+12%</span>
                        <span className="text-sm text-gray-500 mr-1">مقارنة بالشهر السابق</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white shadow-sm rounded-3xl border border-gray-100">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium text-gray-500 text-right">العملاء الجدد</h3>
                        <div className="bg-green-50 p-2 rounded-full">
                          <Users className="h-5 w-5 text-green-500" />
                        </div>
                      </div>
                        <p className="text-3xl font-bold mt-2">{completedReferrals}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-sm text-green-500">+8%</span>
                        <span className="text-sm text-gray-500 mr-1">مقارنة بالشهر السابق</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white shadow-sm rounded-3xl border border-gray-100">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium text-gray-500 text-right">النقاط الممنوحة</h3>
                        <div className="bg-purple-50 p-2 rounded-full">
                          <svg
                            className="h-5 w-5 text-purple-500"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                            <line x1="9" x2="9.01" y1="9" y2="9" />
                            <line x1="15" x2="15.01" y1="9" y2="9" />
                          </svg>
                        </div>
                      </div>
                        <p className="text-3xl font-bold mt-2">{totalRewardPoints || 0}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-sm text-green-500">+15%</span>
                        <span className="text-sm text-gray-500 mr-1">مقارنة بالشهر السابق</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                  {/* Referral Program Info */}
                  {referralProgram && (
                    <div className="bg-white border rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-medium mb-4 text-right">معلومات برنامج الإحالة</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-2">رمز الإحالة</h4>
                          <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-md">
                            <span className="text-lg font-bold">{referralProgram.referrerCode}</span>
                            <Button variant="ghost" size="sm" className="ml-auto">
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <rect height="13" rx="2" ry="2" width="13" x="9" y="9" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                              </svg>
                            </Button>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">حالة البرنامج</h4>
                          <Badge className={`${
                            referralProgram.status === "active" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}>
                            {referralProgram.status === "active" ? "مفعّل" : "غير مفعّل"}
                          </Badge>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">مكافأة المُحيل</h4>
                          <p>{referralProgram.referrerReward.description}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">مكافأة المُحال</h4>
                          <p>{referralProgram.refereeReward.description}</p>
                        </div>
                      </div>
                    </div>
                  )}

                {/* Gráfico o visualización de estadísticas */}
                <div className="bg-white border rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-medium mb-4 text-right">تطور الإحالات</h3>
                  <div className="h-64 flex items-center justify-center">
                    <div className="w-full h-full flex items-end justify-between">
                      {Array.from({ length: 12 }).map((_, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div
                            className="w-8 bg-blue-500 rounded-t-md"
                            style={{
                              height: `${Math.floor(Math.random() * 150) + 20}px`,
                            }}
                          ></div>
                          <div className="text-xs text-gray-500 mt-2">
                            {
                              [
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
                              ][index]
                            }
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

                <TabsContent value="referrals" className="mt-0">
                  <div className="bg-white border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                          <TableHead className="text-right">المُحيل</TableHead>
                          <TableHead className="text-right">المُحال</TableHead>
                          <TableHead className="text-right">التاريخ</TableHead>
                          <TableHead className="text-right">الحالة</TableHead>
                          <TableHead className="text-right">المكافأة</TableHead>
                          <TableHead className="text-right">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredReferrals.length > 0 ? (
                          filteredReferrals.map((referral) => (
                            <TableRow key={referral.id} className="hover:bg-gray-50">
                          <TableCell>
                                <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                    <AvatarImage src={referral.referrer.avatar} />
                                <AvatarFallback>{referral.referrer.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{referral.referrer.name}</div>
                                <div className="text-sm text-gray-500">{referral.referrer.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                                <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                    <AvatarImage src={referral.referred.avatar} />
                                <AvatarFallback>{referral.referred.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{referral.referred.name}</div>
                                <div className="text-sm text-gray-500">{referral.referred.email}</div>
                              </div>
                            </div>
                          </TableCell>
                              <TableCell>{referral.date}</TableCell>
                              <TableCell>
                            <Badge
                                  className={`${
                                referral.status === "مكتمل"
                                  ? "bg-green-100 text-green-800"
                                  : referral.status === "معلق"
                                      ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                  }`}
                            >
                              {referral.status}
                            </Badge>
                          </TableCell>
                              <TableCell>{referral.reward}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit className="h-4 w-4" />
                              </Button>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                              لا توجد إحالات مطابقة للبحث
                            </TableCell>
                          </TableRow>
                        )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

                <TabsContent value="settings" className="mt-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">إعدادات البرنامج</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="program-enabled">تفعيل برنامج الإحالة</Label>
                            <Switch id="program-enabled" defaultChecked />
                        </div>
                        <div className="flex justify-between items-center">
                          <Label htmlFor="auto-reward">منح المكافآت تلقائياً</Label>
                          <Switch id="auto-reward" defaultChecked />
                        </div>
                          <div className="flex justify-between items-center">
                            <Label htmlFor="notifications">إرسال إشعارات للإحالات الجديدة</Label>
                            <Switch id="notifications" defaultChecked />
                      </div>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="referrer-code">رمز الإحالة</Label>
                            <Input id="referrer-code" defaultValue={referralProgram?.referrerCode || "FRIEND2023"} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="referee-discount">خصم للعميل المُحال</Label>
                            <div className="flex gap-2">
                              <Input id="referee-discount" type="number" defaultValue="15" className="w-1/3" />
                              <div className="flex items-center">%</div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="referrer-points">نقاط للمُحيل</Label>
                            <div className="flex gap-2">
                              <Input 
                                id="referrer-points" 
                                type="number" 
                                defaultValue={
                                  referralProgram?.referrerReward.type === 'points' 
                                    ? referralProgram.referrerReward.value.toString() 
                                    : "500"
                                } 
                                className="w-1/3" 
                              />
                              <div className="flex items-center">نقطة</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
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
