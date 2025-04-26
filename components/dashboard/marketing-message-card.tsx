"use client"

import { useState, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function MarketingMessageCard() {
  const [messageCount, setMessageCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showSendDialog, setShowSendDialog] = useState(false)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [progress, setProgress] = useState(3)
  const [messageType, setMessageType] = useState("sms")
  const [messageText, setMessageText] = useState("")
  const [messageTitle, setMessageTitle] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [sendSuccess, setSendSuccess] = useState(false)

  // Animación de contador
  useEffect(() => {
    setIsAnimating(true)
    let start = 0
    const end = 150
    const duration = 2000
    const interval = 20
    const steps = duration / interval
    const increment = end / steps

    const timer = setInterval(() => {
      start += increment

      if (start >= end) {
        setMessageCount(end)
        setIsAnimating(false)
        clearInterval(timer)
      } else {
        setMessageCount(Math.floor(start))
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  const handleSendMessage = () => {
    if (!messageText) return

    setIsSending(true)

    // Simulación de envío
    setTimeout(() => {
      setIsSending(false)
      setSendSuccess(true)

      // Resetear después de mostrar éxito
      setTimeout(() => {
        setShowSendDialog(false)
        setSendSuccess(false)
        setMessageText("")
        setMessageTitle("")
      }, 1500)
    }, 2000)
  }

  return (
    <Card className="bg-white shadow-sm rounded-3xl border border-gray-100">
      <CardContent className="p-3">
        <div className="flex justify-center mb-3">
          <Button
            className="bg-blue-500 hover:bg-blue-600 transition-colors text-xs rounded-full h-7 px-3"
            onClick={() => setShowSendDialog(true)}
          >
            إرسال رسالة
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center mb-3">
          <svg
            width="40"
            height="40"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-2"
          >
            <path
              d="M14.5375 29.7959L4.33973 23.9972C3.437 23.4838 3.56824 22.144 4.55342 21.8156L58.7233 3.75895C59.6614 3.44625 60.5539 4.33873 60.2412 5.27684L42.1846 59.4468C41.8562 60.4319 40.5163 60.5632 40.003 59.6605L27.4828 37.6422C27.2159 37.1728 26.8272 36.7841 26.3578 36.5172L23.9406 35.1427"
              stroke="#3B82F6"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M33.8179 30.1824L27.9179 36.0824"
              stroke="#3B82F6"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="text-xl font-bold mb-1">{messageCount}</div>
          <p className="text-xs text-gray-500 text-center">ما تبقى من رصيد الرسائل</p>
        </div>

        <div className="relative w-full">
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div
              className="bg-blue-500 h-1.5 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>

        {/* Dialog para enviar mensaje */}
        <Dialog open={showSendDialog} onOpenChange={setShowSendDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-right text-base">إرسال رسالة تسويقية</DialogTitle>
              <DialogDescription className="text-right text-xs">
                قم بإنشاء وإرسال رسالة تسويقية لعملائك
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <Tabs defaultValue="sms" className="w-full" onValueChange={setMessageType}>
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="sms" className="text-xs">
                    رسالة نصية
                  </TabsTrigger>
                  <TabsTrigger value="email" className="text-xs">
                    بريد إلكتروني
                  </TabsTrigger>
                  <TabsTrigger value="push" className="text-xs">
                    إشعار
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {messageType === "email" && (
                <div className="space-y-1">
                  <Label htmlFor="message-title" className="text-xs">
                    عنوان الرسالة
                  </Label>
                  <Input
                    id="message-title"
                    value={messageTitle}
                    onChange={(e) => setMessageTitle(e.target.value)}
                    placeholder="أدخل عنوان الرسالة"
                    className="text-xs h-8"
                  />
                </div>
              )}

              <div className="space-y-1">
                <Label htmlFor="message-text" className="text-xs">
                  نص الرسالة
                </Label>
                <Textarea
                  id="message-text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="أدخل نص الرسالة هنا..."
                  rows={4}
                  className="text-xs"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs">الجمهور المستهدف</Label>
                <div className="flex flex-wrap gap-1">
                  <Button variant="outline" className="rounded-full text-xs h-7">
                    جميع العملاء
                  </Button>
                  <Button variant="outline" className="rounded-full text-xs h-7">
                    العملاء الجدد
                  </Button>
                  <Button variant="outline" className="rounded-full text-xs h-7">
                    العملاء النشطين
                  </Button>
                  <Button variant="outline" className="rounded-full text-xs h-7">
                    العملاء غير النشطين
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowSendDialog(false)} className="text-xs h-7">
                إلغاء
              </Button>
              <Button
                className="bg-blue-500 hover:bg-blue-600 transition-colors text-xs h-7"
                onClick={handleSendMessage}
                disabled={!messageText || isSending}
              >
                {isSending ? "جاري الإرسال..." : sendSuccess ? "تم الإرسال بنجاح!" : "إرسال"}
                {!isSending && !sendSuccess && <Send className="mr-1 h-3 w-3" />}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog para detalles */}
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-right text-base">تفاصيل الرسائل التسويقية</DialogTitle>
              <DialogDescription className="text-right text-xs">إحصائيات مفصلة للرسائل التسويقية</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white border border-gray-100 p-2 rounded-lg">
                  <div className="text-xs text-gray-500">رصيد الرسائل</div>
                  <div className="text-base font-bold text-blue-500">{messageCount}</div>
                </div>
                <div className="bg-white border border-gray-100 p-2 rounded-lg">
                  <div className="text-xs text-gray-500">الرسائل المرسلة</div>
                  <div className="text-base font-bold">48</div>
                </div>
                <div className="bg-white border border-gray-100 p-2 rounded-lg">
                  <div className="text-xs text-gray-500">معدل الفتح</div>
                  <div className="text-base font-bold">32%</div>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-3">
                <h3 className="font-medium text-sm mb-2">آخر الحملات</h3>
                <div className="space-y-1">
                  <div className="flex justify-between items-center p-1.5 hover:bg-gray-50 rounded-md">
                    <div className="text-xs font-medium">عروض نهاية الأسبوع</div>
                    <div className="text-xs text-gray-500">قبل 3 أيام</div>
                  </div>
                  <div className="flex justify-between items-center p-1.5 hover:bg-gray-50 rounded-md">
                    <div className="text-xs font-medium">تخفيضات الصيف</div>
                    <div className="text-xs text-gray-500">قبل أسبوع</div>
                  </div>
                  <div className="flex justify-between items-center p-1.5 hover:bg-gray-50 rounded-md">
                    <div className="text-xs font-medium">منتجات جديدة</div>
                    <div className="text-xs text-gray-500">قبل أسبوعين</div>
                  </div>
                </div>
                <Button className="w-full mt-3 bg-blue-500 hover:bg-blue-600 transition-colors text-xs h-7">
                  شراء رصيد إضافي
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
