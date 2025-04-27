"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Search, Download, Edit, Trash, Calendar, Trophy, Users } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CurrencySymbol } from "@/components/currency-symbol"
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
import { Challenge } from "@/app/api/challenges/route"
import { useToast } from "@/components/ui/use-toast"

// Datos de ejemplo para los desafíos como fallback
const defaultChallenges = [
  {
    id: "1",
    title: "تحدي الشراء الأول",
    description: "أكمل أول طلب واحصل على 100 نقطة إضافية",
    reward: "100 نقطة",
    participants: 450,
    completions: 320,
    startDate: "2025-07-01",
    endDate: "2025-07-31",
    status: "نشط",
    progress: 71,
  },
  {
    id: "2",
    title: "تحدي المراجعات",
    description: "اكتب 5 مراجعات للمنتجات واحصل على خصم 15%",
    reward: "خصم 15%",
    participants: 280,
    completions: 95,
    startDate: "2025-07-15",
    endDate: "2025-08-15",
    status: "نشط",
    progress: 34,
  },
  {
    id: "3",
    title: "تحدي الإحالة",
    description: "قم بدعوة 3 أصدقاء للتسجيل واحصل على 50 ﷼ خصم",
    reward: "50 ﷼ خصم",
    participants: 180,
    completions: 42,
    startDate: "2025-07-10",
    endDate: "2025-08-10",
    status: "نشط",
    progress: 23,
  },
  {
    id: "4",
    title: "تحدي المشتريات الكبيرة",
    description: "اشتر بقيمة 1000 ﷼ أو أكثر واحصل على هدية مجانية",
    reward: "هدية مجانية",
    participants: 120,
    completions: 35,
    startDate: "2025-06-01",
    endDate: "2025-06-30",
    status: "منتهي",
    progress: 100,
  },
]

// Update the UIChallenge interface to avoid extension conflicts
interface UIChallenge {
  id: string;
  title: string;
  description: string;
  reward?: string;
  participants?: number;
  completions?: number;
  startDate: string;
  endDate: string;
  status?: string;
  progress?: number;
  pointsReward?: number;
  requirements?: {
    type: string;
    target: number;
    current?: number;
  };
  badgeReward?: string;
  type?: string;
}

export default function ChallengesPage() {
  const [openDialog, setOpenDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [challenges, setChallenges] = useState<UIChallenge[]>([])
  const [filteredChallenges, setFilteredChallenges] = useState<UIChallenge[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Fetch challenges from API
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/challenges')
        
        if (!response.ok) {
          throw new Error('Failed to fetch challenges data')
        }
        
        const data: Challenge[] = await response.json()
        
        // Transform API data to UI data format
        const uiChallenges: UIChallenge[] = data.map((challenge) => {
          // Determine status based on API status
          let status = "قادم"
          if (challenge.status === "active") status = "نشط"
          else if (challenge.status === "completed") status = "منتهي"
          else if (challenge.status === "upcoming") status = "قادم"
          
          // Calculate progress if current value exists
          const progress = challenge.requirements.current 
            ? Math.round((challenge.requirements.current / challenge.requirements.target) * 100)
            : Math.floor(Math.random() * 100)
          
          return {
            id: challenge.id,
            title: challenge.title,
            description: challenge.description,
            reward: `${challenge.pointsReward} نقطة`,
            participants: Math.floor(Math.random() * 500) + 100,
            completions: Math.floor(Math.random() * 200) + 50,
            startDate: new Date(challenge.startDate).toISOString().split('T')[0],
            endDate: new Date(challenge.endDate).toISOString().split('T')[0],
            status,
            progress,
            pointsReward: challenge.pointsReward,
            requirements: challenge.requirements,
            badgeReward: challenge.badgeReward,
            type: challenge.type
          }
        })
        
        setChallenges(uiChallenges)
        setFilteredChallenges(uiChallenges)
      } catch (error) {
        console.error('Error fetching challenges:', error)
        toast({
          title: "خطأ في التحميل",
          description: "حدث خطأ أثناء تحميل بيانات التحديات",
          variant: "destructive",
        })
        // Use default data on error
        setChallenges(defaultChallenges)
        setFilteredChallenges(defaultChallenges)
      } finally {
        setIsLoading(false)
      }
    }

    fetchChallenges()
  }, [toast])

  // Filter challenges based on search term
  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (!term.trim()) {
      setFilteredChallenges(challenges)
      return
    }

    const filtered = challenges.filter(
      (challenge) =>
        challenge.title.toLowerCase().includes(term.toLowerCase()) || 
        challenge.description.toLowerCase().includes(term.toLowerCase()) || 
        (challenge.status && challenge.status.toLowerCase().includes(term.toLowerCase()))
    )
    setFilteredChallenges(filtered)
  }

  // Calculate stats from challenges data
  const activeChallenges = challenges.filter(c => c.status === "نشط").length
  const totalParticipants = challenges.reduce((sum, c) => sum + (c.participants || 0), 0)
  const completionRates = challenges.map(c => (c.completions || 0) / (c.participants || 1))
  const avgCompletionRate = Math.round(
    (completionRates.reduce((sum, rate) => sum + rate, 0) / (completionRates.length || 1)) * 100
  )
  const upcomingChallenges = challenges.filter(c => c.status === "قادم").length

  return (
    <div className="container mx-auto p-6" dir="rtl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">التحديات</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="بحث..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-10 py-2 border border-gray-200 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <Button variant="outline" className="border-gray-200 hover:bg-gray-50 transition-colors">
            <Download className="ml-2 h-4 w-4" />
            تصدير
          </Button>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 hover:bg-blue-600 transition-colors">
                <Plus className="ml-2 h-4 w-4" />
                إضافة تحدي جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>إضافة تحدي جديد</DialogTitle>
                <DialogDescription>قم بإدخال تفاصيل التحدي الجديد هنا. اضغط على حفظ عند الانتهاء.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="challenge-title">عنوان التحدي</Label>
                  <Input id="challenge-title" placeholder="مثال: تحدي التسوق الأسبوعي" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="challenge-description">وصف التحدي</Label>
                  <Textarea
                    id="challenge-description"
                    placeholder="مثال: اشتر 3 منتجات مختلفة خلال أسبوع واحصل على مكافأة"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="challenge-start">تاريخ البداية</Label>
                    <Input id="challenge-start" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="challenge-end">تاريخ النهاية</Label>
                    <Input id="challenge-end" type="date" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="challenge-reward">المكافأة</Label>
                  <div className="flex gap-4">
                    <select className="border rounded-md p-2 w-1/3">
                      <option value="points">نقاط</option>
                      <option value="discount">خصم</option>
                      <option value="gift">هدية</option>
                      <option value="free-shipping">شحن مجاني</option>
                    </select>
                    <Input id="challenge-reward-value" placeholder="مثال: 200" className="w-1/3" />
                    <div className="flex items-center w-1/3">
                      <CurrencySymbol />
                    </div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="challenge-condition">شرط إكمال التحدي</Label>
                  <Textarea
                    id="challenge-condition"
                    placeholder="مثال: شراء 3 منتجات مختلفة خلال أسبوع واحد"
                    rows={2}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenDialog(false)}>
                  إلغاء
                </Button>
                <Button
                  className="bg-blue-500 hover:bg-blue-600 transition-colors"
                  onClick={() => setOpenDialog(false)}
                >
                  حفظ التحدي
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-500">جاري التحميل...</div>
        </div>
      ) : (
        <>
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-3xl border border-gray-100">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-gray-500 text-right">التحديات النشطة</h3>
              <div className="bg-blue-50 p-2 rounded-full">
                <Trophy className="h-5 w-5 text-blue-500" />
              </div>
            </div>
                <p className="text-3xl font-bold mt-2 text-right">{activeChallenges}</p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-green-500">+1</span>
              <span className="text-sm text-gray-500 mr-1">مقارنة بالشهر السابق</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-3xl border border-gray-100">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-gray-500 text-right">إجمالي المشاركين</h3>
              <div className="bg-green-50 p-2 rounded-full">
                <Users className="h-5 w-5 text-green-500" />
              </div>
            </div>
                <p className="text-3xl font-bold mt-2 text-right">{totalParticipants}</p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-green-500">+15%</span>
              <span className="text-sm text-gray-500 mr-1">مقارنة بالشهر السابق</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-3xl border border-gray-100">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-gray-500 text-right">معدل الإكمال</h3>
              <div className="bg-purple-50 p-2 rounded-full">
                <Trophy className="h-5 w-5 text-purple-500" />
              </div>
            </div>
                <p className="text-3xl font-bold mt-2 text-right">{avgCompletionRate}%</p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-green-500">+5%</span>
              <span className="text-sm text-gray-500 mr-1">مقارنة بالشهر السابق</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-3xl border border-gray-100">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-gray-500 text-right">التحديات القادمة</h3>
              <div className="bg-amber-50 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-amber-500" />
              </div>
            </div>
                <p className="text-3xl font-bold mt-2 text-right">{upcomingChallenges}</p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-gray-500">سيتم إطلاقها قريباً</span>
            </div>
          </CardContent>
        </Card>
      </div>

          {/* Lista de desafíos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredChallenges.length > 0 ? (
              filteredChallenges.map((challenge) => (
                <Card
                  key={challenge.id}
                  className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-3xl border border-gray-100 overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium">{challenge.title}</h3>
                        <Badge
                          className={`${
                            challenge.status === "نشط"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : challenge.status === "منتهي"
                              ? "bg-gray-100 text-gray-800 hover:bg-gray-100"
                              : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                          } rounded-full px-3 py-1`}
                        >
                          {challenge.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">{challenge.description}</p>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">تاريخ البداية</p>
                          <p className="font-medium">{challenge.startDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">تاريخ النهاية</p>
                          <p className="font-medium">{challenge.endDate}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">المكافأة</p>
                          <p className="font-medium">{challenge.reward}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">المشاركين</p>
                          <p className="font-medium">{challenge.participants}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">الاكتمال</p>
                          <p className="font-medium">{challenge.completions}</p>
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-500">نسبة الإكمال</span>
                          <span className="text-sm font-medium">{challenge.progress}%</span>
                        </div>
                        <Progress value={challenge.progress} className="h-2" />
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 flex justify-end gap-2">
                      <Button variant="ghost" className="h-8 w-8 p-0" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" className="h-8 w-8 p-0 text-red-500" size="sm">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 text-gray-500">لا توجد تحديات مطابقة لبحثك</div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
