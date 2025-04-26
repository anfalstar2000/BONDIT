"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ColorPicker } from "@/components/color-picker"
import { Switch } from "@/components/ui/switch"
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
import { AlertCircle, Save } from "lucide-react"

export function DigitalCardSettings() {
  const [activeTab, setActiveTab] = useState("general")
  const [showSaveSuccess, setShowSaveSuccess] = useState(false)
  const [formChanged, setFormChanged] = useState(false)

  const handleInputChange = () => {
    setFormChanged(true)
  }

  const handleSave = () => {
    setShowSaveSuccess(true)
    setFormChanged(false)
    setTimeout(() => {
      setShowSaveSuccess(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-100">
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-colors"
          >
            عام
          </TabsTrigger>
          <TabsTrigger
            value="design"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-colors"
          >
            التصميم
          </TabsTrigger>
          <TabsTrigger
            value="content"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-colors"
          >
            المحتوى
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4 pt-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="card-name">اسم البطاقة</Label>
              <Input
                id="card-name"
                defaultValue="BOND.IT"
                onChange={handleInputChange}
                className="focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="card-description">وصف البطاقة</Label>
              <Input
                id="card-description"
                defaultValue="برنامج الولاء"
                onChange={handleInputChange}
                className="focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="card-logo">شعار البطاقة</Label>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-md bg-gray-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-500">B</span>
                </div>
                <Button variant="outline" className="hover:bg-gray-50 transition-colors" onClick={handleInputChange}>
                  تغيير الشعار
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="design" className="space-y-4 pt-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>لون الخلفية الأساسي</Label>
              <ColorPicker defaultValue="#3b82f6" onChange={() => handleInputChange()} />
            </div>
            <div className="grid gap-2">
              <Label>لون الخلفية الثانوي</Label>
              <ColorPicker defaultValue="#1d4ed8" onChange={() => handleInputChange()} />
            </div>
            <div className="grid gap-2">
              <Label>لون النص</Label>
              <ColorPicker defaultValue="#ffffff" onChange={() => handleInputChange()} />
            </div>
            <Separator />
            <div className="grid gap-2">
              <Label>نمط البطاقة</Label>
              <div className="grid grid-cols-3 gap-4">
                <div
                  className="border rounded-md p-2 cursor-pointer bg-blue-500 h-20 hover:ring-2 hover:ring-blue-500 transition-all"
                  onClick={handleInputChange}
                ></div>
                <div
                  className="border rounded-md p-2 cursor-pointer bg-gradient-to-r from-blue-500 to-blue-700 h-20 hover:ring-2 hover:ring-blue-500 transition-all"
                  onClick={handleInputChange}
                ></div>
                <div
                  className="border rounded-md p-2 cursor-pointer bg-gradient-to-br from-blue-500 to-purple-600 h-20 hover:ring-2 hover:ring-blue-500 transition-all"
                  onClick={handleInputChange}
                ></div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="content" className="space-y-4 pt-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>معلومات العرض</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-points"
                    defaultChecked
                    onCheckedChange={handleInputChange}
                    className="data-[state=checked]:bg-blue-500"
                  />
                  <Label htmlFor="show-points" className="mr-2">
                    عرض النقاط
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-level"
                    defaultChecked
                    onCheckedChange={handleInputChange}
                    className="data-[state=checked]:bg-blue-500"
                  />
                  <Label htmlFor="show-level" className="mr-2">
                    عرض المستوى
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-qr"
                    defaultChecked
                    onCheckedChange={handleInputChange}
                    className="data-[state=checked]:bg-blue-500"
                  />
                  <Label htmlFor="show-qr" className="mr-2">
                    عرض رمز QR
                  </Label>
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="card-footer">نص التذييل</Label>
              <Input
                id="card-footer"
                defaultValue="امسح الرمز لاستخدام البطاقة"
                onChange={handleInputChange}
                className="focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="hover:bg-gray-50 transition-colors">
              إلغاء
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                تأكيد الإلغاء
              </AlertDialogTitle>
              <AlertDialogDescription>
                هل أنت متأكد من رغبتك في إلغاء التغييرات؟ سيتم فقدان جميع التعديلات التي قمت بها.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>تراجع</AlertDialogCancel>
              <AlertDialogAction className="bg-amber-500 hover:bg-amber-600 transition-colors">
                تأكيد الإلغاء
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button
          className={`${showSaveSuccess ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"} transition-colors`}
          onClick={handleSave}
          disabled={!formChanged && !showSaveSuccess}
        >
          {showSaveSuccess ? (
            <>
              <Save className="ml-2 h-4 w-4" />
              تم الحفظ
            </>
          ) : (
            "حفظ التغييرات"
          )}
        </Button>
      </div>
    </div>
  )
}
