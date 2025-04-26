"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function MessageScheduler() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    channel: "email",
    date: "",
    time: "",
    audience: "all",
    repeat: false,
    repeatFrequency: "weekly",
  })

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // هنا يمكن إرسال البيانات إلى الخادم لجدولة الرسالة
    console.log("تم جدولة الرسالة:", formData)
    toast({
      title: "تم جدولة الرسالة",
      description: "تم جدولة الرسالة بنجاح للإرسال في الوقت المحدد",
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>جدولة رسالة</CardTitle>
          <CardDescription>قم بإنشاء وجدولة رسالة تسويقية لإرسالها في وقت محدد</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">عنوان الرسالة</Label>
            <Input
              id="title"
              placeholder="أدخل عنوان الرسالة"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              dir="rtl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">محتوى الرسالة</Label>
            <Textarea
              id="content"
              placeholder="أدخل محتوى الرسالة"
              value={formData.content}
              onChange={(e) => handleChange("content", e.target.value)}
              rows={6}
              dir="rtl"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="channel">قناة الإرسال</Label>
              <Select value={formData.channel} onValueChange={(value) => handleChange("channel", value)}>
                <SelectTrigger id="channel">
                  <SelectValue placeholder="اختر قناة الإرسال" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">البريد الإلكتروني</SelectItem>
                  <SelectItem value="sms">الرسائل النصية</SelectItem>
                  <SelectItem value="push">إشعارات الدفع</SelectItem>
                  <SelectItem value="whatsapp">واتساب</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="audience">الجمهور المستهدف</Label>
              <Select value={formData.audience} onValueChange={(value) => handleChange("audience", value)}>
                <SelectTrigger id="audience">
                  <SelectValue placeholder="اختر الجمهور المستهدف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع العملاء</SelectItem>
                  <SelectItem value="new">العملاء الجدد</SelectItem>
                  <SelectItem value="active">العملاء النشطين</SelectItem>
                  <SelectItem value="inactive">العملاء غير النشطين</SelectItem>
                  <SelectItem value="vip">عملاء VIP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="date">تاريخ الإرسال</Label>
              <div className="relative">
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                />
                <Calendar
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={16}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">وقت الإرسال</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleChange("time", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="repeat"
                checked={formData.repeat}
                onCheckedChange={(checked) => handleChange("repeat", checked)}
              />
              <Label htmlFor="repeat">تكرار الإرسال</Label>
            </div>

            {formData.repeat && (
              <div className="ml-6 space-y-2">
                <Label htmlFor="repeatFrequency">تكرار كل</Label>
                <Select
                  value={formData.repeatFrequency}
                  onValueChange={(value) => handleChange("repeatFrequency", value)}
                >
                  <SelectTrigger id="repeatFrequency">
                    <SelectValue placeholder="اختر تكرار الإرسال" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">يوميًا</SelectItem>
                    <SelectItem value="weekly">أسبوعيًا</SelectItem>
                    <SelectItem value="biweekly">كل أسبوعين</SelectItem>
                    <SelectItem value="monthly">شهريًا</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">جدولة الرسالة</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
