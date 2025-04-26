"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Copy, Users, ShoppingBag, UserMinus, Star } from "lucide-react"

const templates = [
  {
    id: "welcome",
    title: "ترحيب العملاء الجدد",
    description: "سلسلة رسائل ترحيبية للعملاء الجدد لتعريفهم بمتجرك وخدماتك",
    category: "onboarding",
    steps: 4,
    icon: <Users className="h-10 w-10 text-blue-500" />,
  },
  {
    id: "abandoned-cart",
    title: "استعادة السلة المتروكة",
    description: "تذكير العملاء بالمنتجات المتروكة في سلة التسوق",
    category: "sales",
    steps: 3,
    icon: <ShoppingBag className="h-10 w-10 text-green-500" />,
  },
  {
    id: "win-back",
    title: "استعادة العملاء الخاملين",
    description: "استعادة العملاء الذين لم يتسوقوا منذ فترة طويلة",
    category: "retention",
    steps: 5,
    icon: <UserMinus className="h-10 w-10 text-purple-500" />,
  },
  {
    id: "review-request",
    title: "طلب تقييم المنتج",
    description: "طلب تقييمات المنتجات من العملاء بعد الشراء",
    category: "engagement",
    steps: 2,
    icon: <Star className="h-10 w-10 text-yellow-500" />,
  },
  {
    id: "birthday",
    title: "تهنئة عيد الميلاد",
    description: "إرسال تهنئة وعرض خاص للعملاء في عيد ميلادهم",
    category: "engagement",
    steps: 2,
    icon: <Clock className="h-10 w-10 text-red-500" />,
  },
  {
    id: "loyalty-reminder",
    title: "تذكير بنقاط الولاء",
    description: "تذكير العملاء بنقاط الولاء المتراكمة وكيفية استخدامها",
    category: "loyalty",
    steps: 3,
    icon: <Star className="h-10 w-10 text-blue-500" />,
  },
]

export function FlowTemplates() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <Card key={template.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{template.title}</CardTitle>
                <CardDescription className="mt-1">{template.description}</CardDescription>
              </div>
              <div>{template.icon}</div>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">
                {template.category === "onboarding" && "استقبال العملاء"}
                {template.category === "sales" && "المبيعات"}
                {template.category === "retention" && "الاحتفاظ بالعملاء"}
                {template.category === "engagement" && "تفاعل العملاء"}
                {template.category === "loyalty" && "برنامج الولاء"}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {template.steps} خطوات
              </Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="default" className="w-full">
              <Copy className="ml-2 h-4 w-4" />
              استخدام القالب
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
