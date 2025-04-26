"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Filter } from "lucide-react"
import { PointsRules } from "@/components/points-rules"
import { RewardsSettings } from "@/components/rewards-settings"
import { PointsHistory } from "@/components/points-history"
import { AddRewardForm } from "@/components/rewards/add-reward-form"
import { EditRewardForm } from "@/components/rewards/edit-reward-form"
import { useToast } from "@/components/ui/use-toast"
import { PointsReward } from "../api/points-rewards/route"

export default function PointsRewardsPage() {
  const [activeTab, setActiveTab] = useState("rules")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddRewardOpen, setIsAddRewardOpen] = useState(false)
  const [isEditRewardOpen, setIsEditRewardOpen] = useState(false)
  const [editRewardId, setEditRewardId] = useState("")
  const [pointsRewards, setPointsRewards] = useState<PointsReward[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Fetch data from API
  useEffect(() => {
    const fetchPointsRewards = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/points-rewards')
        
        if (!response.ok) {
          throw new Error('Failed to fetch points rewards data')
        }
        
        const data = await response.json()
        setPointsRewards(data)
      } catch (error) {
        console.error('Error fetching points rewards:', error)
        toast({
          title: "خطأ في التحميل",
          description: "حدث خطأ أثناء تحميل بيانات النقاط والمكافآت",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPointsRewards()
  }, [toast])

  const handleEditReward = (id: string) => {
    setEditRewardId(id)
    setIsEditRewardOpen(true)
  }

  const handleAddRewardSave = () => {
    setIsAddRewardOpen(false)
    toast({
      title: "تمت الإضافة بنجاح",
      description: "تمت إضافة المكافأة الجديدة بنجاح",
      variant: "default",
    })
  }

  const handleEditRewardSave = () => {
    setIsEditRewardOpen(false)
    toast({
      title: "تم التعديل بنجاح",
      description: "تم تعديل المكافأة بنجاح",
      variant: "default",
    })
  }

  return (
    <div className="container mx-auto py-6 rtl" dir="rtl">
      {/* Header with title and action buttons */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">النقاط والمكافآت</h1>
        <div className="flex gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="بحث..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-3 pl-10 py-2 border border-gray-200 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <Button variant="outline" className="rounded-full border-gray-200 flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>تصفية</span>
          </Button>
          <Button
            onClick={() => setIsAddRewardOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-full flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>إضافة مكافأة جديدة</span>
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-gray-500 text-sm mb-1">إجمالي النقاط</div>
          <div className="text-3xl font-bold mb-1">12,500</div>
          <div className="text-sm text-green-500">+12% مقارنة بالشهر السابق</div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-gray-500 text-sm mb-1">العملاء النشطين</div>
          <div className="text-3xl font-bold mb-1">856</div>
          <div className="text-sm text-green-500">+8% مقارنة بالشهر السابق</div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-gray-500 text-sm mb-1">معدل الاسترداد</div>
          <div className="text-3xl font-bold mb-1">68%</div>
          <div className="text-sm text-green-500">+5% مقارنة بالشهر السابق</div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-gray-500 text-sm mb-1">متوسط النقاط</div>
          <div className="text-3xl font-bold mb-1">145</div>
          <div className="text-sm text-green-500">+3% مقارنة بالشهر السابق</div>
        </div>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="text-gray-500">جاري التحميل...</div>
        </div>
      ) : (
        /* Tabs */
        <Tabs defaultValue="rules" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent border-b h-14 p-0 gap-8 mb-6 w-full justify-start">
            <TabsTrigger
              value="rules"
              className="text-gray-500 data-[state=active]:text-blue-500 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 h-14 px-0 pb-0 font-medium"
            >
              قواعد النقاط
            </TabsTrigger>
            <TabsTrigger
              value="rewards"
              className="text-gray-500 data-[state=active]:text-blue-500 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 h-14 px-0 pb-0 font-medium"
            >
              المكافآت
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="text-gray-500 data-[state=active]:text-blue-500 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 h-14 px-0 pb-0 font-medium"
            >
              سجل النقاط
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rules" className="mt-0">
            <PointsRules />
          </TabsContent>

          <TabsContent value="rewards" className="mt-0">
            <RewardsSettings 
              searchTerm={searchTerm} 
              onEditReward={handleEditReward}
              rewards={pointsRewards} 
            />
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <PointsHistory searchTerm={searchTerm} />
          </TabsContent>
        </Tabs>
      )}

      <AddRewardForm isOpen={isAddRewardOpen} onClose={() => setIsAddRewardOpen(false)} onSave={handleAddRewardSave} />

      <EditRewardForm
        isOpen={isEditRewardOpen}
        onClose={() => setIsEditRewardOpen(false)}
        onSave={handleEditRewardSave}
        rewardId={editRewardId}
      />
    </div>
  )
}
