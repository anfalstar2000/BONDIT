"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const pointsRules = [
  {
    id: "1",
    name: "نقاط الشراء",
    description: "اكسب نقاط مقابل كل ريال تنفقه",
    points: 1,
    condition: "لكل 10 ريال",
    isActive: true,
  },
  {
    id: "2",
    name: "نقاط التسجيل",
    description: "اكسب نقاط عند إنشاء حساب جديد",
    points: 100,
    condition: "لمرة واحدة",
    isActive: true,
  },
  {
    id: "3",
    name: "نقاط المراجعة",
    description: "اكسب نقاط عند كتابة مراجعة للمنتج",
    points: 50,
    condition: "لكل مراجعة",
    isActive: true,
  },
  {
    id: "4",
    name: "نقاط عيد الميلاد",
    description: "اكسب نقاط إضافية في عيد ميلادك",
    points: 200,
    condition: "سنوياً",
    isActive: false,
  },
  {
    id: "5",
    name: "نقاط مضاعفة",
    description: "اكسب نقاط مضاعفة خلال العروض الخاصة",
    points: 2,
    condition: "مضاعف",
    isActive: false,
  },
]

export function PointsRules() {
  const [rules, setRules] = useState(pointsRules)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)
  const { toast } = useToast()

  const handleToggleActive = (id: string) => {
    setRules(rules.map((rule) => (rule.id === id ? { ...rule, isActive: !rule.isActive } : rule)))

    // إظهار إشعار بتغيير الحالة
    const rule = rules.find((r) => r.id === id)
    const newStatus = !rule?.isActive

    toast({
      title: newStatus ? "تم تفعيل القاعدة" : "تم إيقاف القاعدة",
      description: `تم ${newStatus ? "تفعيل" : "إيقاف"} قاعدة "${rule?.name}"`,
      variant: "default",
    })
  }

  return (
    <div className="space-y-4 rtl" dir="rtl">
      {/* Button removed as requested */}
      <div className="mb-4"></div>
      <div className="bg-white rounded-lg overflow-hidden border border-gray-100">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-medium text-right">اسم القاعدة</TableHead>
              <TableHead className="font-medium text-right">الوصف</TableHead>
              <TableHead className="font-medium text-right">النقاط</TableHead>
              <TableHead className="font-medium text-right">الشرط</TableHead>
              <TableHead className="font-medium text-right">الحالة</TableHead>
              <TableHead className="font-medium text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map((rule) => (
              <TableRow
                key={rule.id}
                className="hover:bg-gray-50 transition-colors"
                onMouseEnter={() => setHoveredRow(rule.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <TableCell className="font-medium text-right">{rule.name}</TableCell>
                <TableCell className="text-right">{rule.description}</TableCell>
                <TableCell className="text-right">{rule.points}</TableCell>
                <TableCell className="text-right">{rule.condition}</TableCell>
                <TableCell className="text-center">
                  <div
                    className="relative inline-block w-12 h-6 cursor-pointer"
                    onClick={() => handleToggleActive(rule.id)}
                  >
                    <div
                      className={`block w-12 h-6 rounded-full transition-colors duration-200 ${
                        rule.isActive ? "bg-blue-500" : "bg-gray-200"
                      }`}
                    ></div>
                    <div
                      className={`absolute top-0.5 right-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-200 transform ${
                        rule.isActive ? "-translate-x-6" : "translate-x-0"
                      }`}
                    ></div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-colors rounded-full"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
