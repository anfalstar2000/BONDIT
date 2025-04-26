"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"

export function ProjectInfoForm() {
  const [formData, setFormData] = useState({
    brandName: "",
    industry: "",
    targetAudience: "",
    brandDescription: "",
    tonePreference: "professional",
    language: "arabic",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // هنا يمكن إرسال البيانات إلى الخادم أو تخزينها محليًا
    console.log("تم حفظ معلومات المشروع:", formData)
    toast({
      title: "تم حفظ المعلومات",
      description: "تم حفظ معلومات المشروع بنجاح",
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>معلومات المشروع</CardTitle>
          <CardDescription>
            أدخل معلومات عن مشروعك أو علامتك التجارية لمساعدة المساعد الذكي على إنشاء رسائل مخصصة
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="brandName">اسم العلامة التجارية</Label>
              <Input
                id="brandName"
                placeholder="أدخل اسم العلامة التجارية"
                value={formData.brandName}
                onChange={(e) => handleChange("brandName", e.target.value)}
                dir="rtl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">المجال أو الصناعة</Label>
              <Select value={formData.industry} onValueChange={(value) => handleChange("industry", value)}>
                <SelectTrigger id="industry">
                  <SelectValue placeholder="اختر المجال" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retail">تجارة التجزئة</SelectItem>
                  <SelectItem value="ecommerce">التجارة الإلكترونية</SelectItem>
                  <SelectItem value="technology">التكنولوجيا</SelectItem>
                  <SelectItem value="food">الطعام والمشروبات</SelectItem>
                  <SelectItem value="health">الصحة والعافية</SelectItem>
                  <SelectItem value="education">التعليم</SelectItem>
                  <SelectItem value="finance">المالية والمصرفية</SelectItem>
                  <SelectItem value="other">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAudience">الجمهور المستهدف</Label>
            <Input
              id="targetAudience"
              placeholder="وصف الجمهور المستهدف (العمر، الاهتمامات، الموقع الجغرافي، إلخ)"
              value={formData.targetAudience}
              onChange={(e) => handleChange("targetAudience", e.target.value)}
              dir="rtl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="brandDescription">وصف العلامة التجارية</Label>
            <Textarea
              id="brandDescription"
              placeholder="اكتب وصفًا موجزًا لعلامتك التجارية، قيمها، ورسالتها"
              value={formData.brandDescription}
              onChange={(e) => handleChange("brandDescription", e.target.value)}
              rows={4}
              dir="rtl"
            />
          </div>

          <div className="space-y-2">
            <Label>نبرة الرسائل المفضلة</Label>
            <RadioGroup
              value={formData.tonePreference}
              onValueChange={(value) => handleChange("tonePreference", value)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="professional" id="professional" />
                <Label htmlFor="professional">رسمية ومهنية</Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="friendly" id="friendly" />
                <Label htmlFor="friendly">ودية وغير رسمية</Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="enthusiastic" id="enthusiastic" />
                <Label htmlFor="enthusiastic">حماسية ومشجعة</Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="humorous" id="humorous" />
                <Label htmlFor="humorous">مرحة وفكاهية</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>اللغة المفضلة</Label>
            <RadioGroup
              value={formData.language}
              onValueChange={(value) => handleChange("language", value)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="arabic" id="arabic" />
                <Label htmlFor="arabic">العربية</Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="english" id="english" />
                <Label htmlFor="english">الإنجليزية</Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="both" id="both" />
                <Label htmlFor="both">كلاهما</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">حفظ المعلومات</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
