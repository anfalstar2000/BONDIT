"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash, AlertCircle } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import { PointsReward } from "@/app/api/points-rewards/route"

// Fallback mock data in case API fails
const defaultRewards = [
  {
    id: "1",
    name: "خصم 10%",
    pointsRequired: 500,
    description: "خصم 10% على طلبك التالي",
    type: "discount" as const,
    isActive: true,
  },
  {
    id: "2",
    name: "شحن مجاني",
    pointsRequired: 300,
    description: "شحن مجاني على طلبك التالي",
    type: "discount" as const,
    isActive: true,
  },
  {
    id: "3",
    name: "منتج مجاني",
    pointsRequired: 800,
    description: "احصل على منتج مجاني مع طلبك التالي",
    type: "product" as const,
    isActive: false,
  },
]

interface RewardsSettingsProps {
  searchTerm: string
  onEditReward: (id: string) => void
  rewards?: PointsReward[]
}

export function RewardsSettings({ searchTerm, onEditReward, rewards = [] }: RewardsSettingsProps) {
  const [rewardsList, setRewardsList] = useState<PointsReward[]>([])
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)
  const { toast } = useToast()

  // Initialize state with API data when available
  useEffect(() => {
    if (rewards && rewards.length > 0) {
      setRewardsList(rewards)
    } else {
      setRewardsList(defaultRewards)
    }
  }, [rewards])

  const handleToggleActive = (id: string) => {
    setRewardsList(rewardsList.map((reward) => (reward.id === id ? { ...reward, isActive: !reward.isActive } : reward)))

    // إظهار إشعار بتغيير الحالة
    const reward = rewardsList.find((r) => r.id === id)
    const newStatus = !reward?.isActive

    toast({
      title: newStatus ? "تم تفعيل المكافأة" : "تم إيقاف المكافأة",
      description: `تم ${newStatus ? "تفعيل" : "إيقاف"} مكافأة "${reward?.name}"`,
      variant: "default",
    })
  }

  const handleDelete = () => {
    if (deleteId) {
      const rewardToDelete = rewardsList.find((r) => r.id === deleteId)
      setRewardsList(rewardsList.filter((reward) => reward.id !== deleteId))
      setDeleteId(null)

      // إظهار إشعار بالحذف
      toast({
        title: "تم الحذف بنجاح",
        description: `تم حذف مكافأة "${rewardToDelete?.name}" بنجاح`,
        variant: "default",
      })
    }
  }

  // تطبيق البحث على قائمة المكافآت
  const filteredRewards = rewardsList.filter((reward) => {
    return (
      reward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reward.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <TooltipProvider>
      <div className="space-y-4 rtl" dir="rtl">
        <div className="bg-white rounded-lg overflow-hidden border border-gray-100">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-medium text-right">اسم المكافأة</TableHead>
                <TableHead className="font-medium text-right">تكلفة النقاط</TableHead>
                <TableHead className="font-medium text-right">الوصف</TableHead>
                <TableHead className="font-medium text-right">الحالة</TableHead>
                <TableHead className="font-medium text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRewards.length > 0 ? (
                filteredRewards.map((reward) => (
                  <TableRow
                    key={reward.id}
                    className="hover:bg-gray-50 transition-colors"
                    onMouseEnter={() => setHoveredRow(reward.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <TableCell className="font-medium text-right">{reward.name}</TableCell>
                    <TableCell className="text-right">{reward.pointsRequired}</TableCell>
                    <TableCell className="text-right">{reward.description}</TableCell>
                    <TableCell className="text-center">
                      <div
                        className="relative inline-block w-12 h-6 cursor-pointer"
                        onClick={() => handleToggleActive(reward.id)}
                      >
                        <div
                          className={`block w-12 h-6 rounded-full transition-colors duration-200 ${
                            reward.isActive ? "bg-blue-500" : "bg-gray-200"
                          }`}
                        ></div>
                        <div
                          className={`absolute top-0.5 right-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-200 transform ${
                            reward.isActive ? "-translate-x-6" : "translate-x-0"
                          }`}
                        ></div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-0 space-x-reverse space-x-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-colors rounded-full"
                              onClick={() => onEditReward(reward.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>تعديل</p>
                          </TooltipContent>
                        </Tooltip>

                        <AlertDialog>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors rounded-full"
                                  onClick={() => setDeleteId(reward.id)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>حذف</p>
                            </TooltipContent>
                          </Tooltip>
                          <AlertDialogContent dir="rtl">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-red-500" />
                                تأكيد الحذف
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                هل أنت متأكد من رغبتك في حذف مكافأة "{rewardsList.find((r) => r.id === deleteId)?.name}
                                "؟ لا يمكن التراجع عن هذا الإجراء.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex-row justify-start gap-2">
                              <AlertDialogAction
                                onClick={handleDelete}
                                className="bg-red-500 hover:bg-red-600 transition-colors rounded-full"
                              >
                                حذف
                              </AlertDialogAction>
                              <AlertDialogCancel className="rounded-full">إلغاء</AlertDialogCancel>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    لا توجد نتائج مطابقة للبحث
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </TooltipProvider>
  )
}
