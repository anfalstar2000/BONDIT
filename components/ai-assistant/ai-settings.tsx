"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

export function AiSettings() {
  const [settings, setSettings] = useState({
    apiKey: "",
    model: "gpt-4",
    temperature: 0.7,
    maxTokens: 1000,
    saveHistory: true,
    defaultLanguage: "arabic",
  })

  const handleChange = (field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    // هنا يمكن حفظ الإعدادات في الخادم
    console.log("تم حفظ الإعدادات:", settings)
    toast({
      title: "تم حفظ الإعدادات",
      description: "تم حفظ إعدادات المساعد الذكي بنجاح",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>إعدادات المساعد الذكي</CardTitle>
          <CardDescription>تخصيص إعدادات المساعد الذكي وتكامل OpenAI</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="apiKey">مفتاح OpenAI API</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="أدخل مفتاح API الخاص بك"
              value={settings.apiKey}
              onChange={(e) => handleChange("apiKey", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              يمكنك الحصول على مفتاح API من لوحة تحكم OpenAI. سيتم تخزين المفتاح بشكل آمن.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">نموذج الذكاء الاصطناعي</Label>
            <Select value={settings.model} onValueChange={(value) => handleChange("model", value)}>
              <SelectTrigger id="model">
                <SelectValue placeholder="اختر نموذج الذكاء الاصطناعي" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4">GPT-4 (الأكثر تقدمًا)</SelectItem>
                <SelectItem value="gpt-4o">GPT-4o (الأحدث)</SelectItem>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (أسرع)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="temperature">درجة الإبداعية (Temperature)</Label>
                <span className="text-sm text-gray-500">{settings.temperature}</span>
              </div>
              <Slider
                id="temperature"
                min={0}
                max={1}
                step={0.1}
                value={[settings.temperature]}
                onValueChange={(value) => handleChange("temperature", value[0])}
              />
              <p className="text-xs text-gray-500">
                القيم المنخفضة تنتج إجابات أكثر تحديدًا، بينما القيم العالية تنتج إجابات أكثر إبداعًا.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="maxTokens">الحد الأقصى للرموز (Max Tokens)</Label>
                <span className="text-sm text-gray-500">{settings.maxTokens}</span>
              </div>
              <Slider
                id="maxTokens"
                min={100}
                max={4000}
                step={100}
                value={[settings.maxTokens]}
                onValueChange={(value) => handleChange("maxTokens", value[0])}
              />
              <p className="text-xs text-gray-500">الحد الأقصى لعدد الرموز التي سيتم إنشاؤها في الاستجابة.</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="saveHistory">حفظ سجل المحادثات</Label>
              <Switch
                id="saveHistory"
                checked={settings.saveHistory}
                onCheckedChange={(checked) => handleChange("saveHistory", checked)}
              />
            </div>
            <p className="text-xs text-gray-500">
              حفظ سجل المحادثات لتحسين تجربة المستخدم وتوفير سياق أفضل للمساعد الذكي.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="defaultLanguage">اللغة الافتراضية</Label>
            <Select value={settings.defaultLanguage} onValueChange={(value) => handleChange("defaultLanguage", value)}>
              <SelectTrigger id="defaultLanguage">
                <SelectValue placeholder="اختر اللغة الافتراضية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="arabic">العربية</SelectItem>
                <SelectItem value="english">الإنجليزية</SelectItem>
                <SelectItem value="auto">تلقائي (حسب لغة المستخدم)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSave}>حفظ الإعدادات</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
