"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DigitalCardPreview } from "@/components/digital-card-preview"
import { DigitalCardSettings } from "@/components/digital-card-settings"
import { DigitalCardAnalytics } from "@/components/digital-card-analytics"
import { Download, Share2, Loader2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { DigitalCard, CardActivity } from "@/app/api/digital-card/route"

export default function DigitalCardPage() {
  const [activeTab, setActiveTab] = useState("preview")
  const [digitalCard, setDigitalCard] = useState<DigitalCard | null>(null)
  const [cardActivity, setCardActivity] = useState<CardActivity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Fetch digital card data from the API
  useEffect(() => {
    const fetchDigitalCardData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/digital-card')
        
        if (!response.ok) {
          throw new Error('Failed to fetch digital card data')
        }
        
        const data = await response.json()
        
        if (data.card) {
          setDigitalCard(data.card)
        }
        
        if (data.activity) {
          setCardActivity(data.activity)
        }
      } catch (error) {
        console.error('Error fetching digital card data:', error)
        toast({
          title: "خطأ في التحميل",
          description: "حدث خطأ أثناء تحميل بيانات البطاقة الرقمية",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchDigitalCardData()
  }, [toast])

  return (
    <div className="container mx-auto p-6" dir="rtl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">البطاقة الرقمية</h1>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-gray-200 hover:bg-gray-50 transition-colors rounded-full">
                <Share2 className="ml-2 h-4 w-4" />
                مشاركة
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">مشاركة عبر البريد الإلكتروني</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">مشاركة عبر الرسائل النصية</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">نسخ رابط المشاركة</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-full">
            <Download className="ml-2 h-4 w-4" />
            تصدير البطاقة
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          <span className="mr-2 text-gray-500">جاري التحميل...</span>
        </div>
      ) : (
      <Card className="bg-white shadow-sm rounded-3xl border border-gray-100">
        <CardContent className="p-0">
          <Tabs defaultValue="preview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b">
              <div className="px-6 flex justify-end">
                <TabsList className="bg-transparent border-b-0 h-14 p-0 gap-8">
                  <TabsTrigger
                    value="preview"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0 transition-colors"
                  >
                    معاينة البطاقة
                  </TabsTrigger>
                  <TabsTrigger
                    value="settings"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0 transition-colors"
                  >
                    إعدادات البطاقة
                  </TabsTrigger>
                  <TabsTrigger
                    value="analytics"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0 transition-colors"
                  >
                    إحصائيات البطاقة
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            <div className="p-6">
              <TabsContent value="preview" className="mt-0">
                  <DigitalCardPreview cardData={digitalCard} />
              </TabsContent>
              <TabsContent value="settings" className="mt-0">
                  <DigitalCardSettings cardData={digitalCard} />
              </TabsContent>
              <TabsContent value="analytics" className="mt-0">
                  <DigitalCardAnalytics cardData={digitalCard} activityData={cardActivity} />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
      )}
    </div>
  )
}
