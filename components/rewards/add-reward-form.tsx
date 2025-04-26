"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/date-picker"
import { CurrencySymbol } from "@/components/currency-symbol"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

interface AddRewardFormProps {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
}

export function AddRewardForm({ isOpen, onClose, onSave }: AddRewardFormProps) {
  const [activeTab, setActiveTab] = useState("general")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    pointsCost: "",
    minOrderValue: "0",
    usageLimit: "1",
    validFrom: null as Date | null,
    validTo: null as Date | null,
    includedProducts: "",
    excludedProducts: "",
    isActive: true,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()

  const handleChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    })

    // مسح الخطأ عند تغيير القيمة
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "يرجى إدخال اسم المكافأة"
    }

    if (!formData.type) {
      newErrors.type = "يرجى اختيار نوع المكافأة"
    }

    if (!formData.pointsCost || Number.parseInt(formData.pointsCost) <= 0) {
      newErrors.pointsCost = "يرجى إدخال عدد نقاط صالح"
    }

    if (formData.validFrom && formData.validTo && formData.validFrom > formData.validTo) {
      newErrors.validTo = "يجب أن يكون تاريخ الانتهاء بعد تاريخ البدء"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      // هنا يمكن إرسال البيانات إلى الخادم
      console.log("Form data:", formData)
      onSave()
    } else {
      // عرض إشعار بوجود أخطاء
      toast({
        title: "يرجى تصحيح الأخطاء",
        description: "هناك بعض الحقول المطلوبة أو غير صالحة",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] rounded-[16px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right">إضافة مكافأة جديدة</DialogTitle>
          <DialogDescription className="text-right">
            قم بإدخال تفاصيل المكافأة الجديدة هنا. يمكنك التنقل بين الأقسام المختلفة لإدخال جميع المعلومات.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="general" className="rounded-full">
              تفاصيل عامة
            </TabsTrigger>
            <TabsTrigger value="conditions" className="rounded-full">
              شروط الاستخدام
            </TabsTrigger>
            <TabsTrigger value="products" className="rounded-full">
              المنتجات
            </TabsTrigger>
            <TabsTrigger value="activation" className="rounded-full">
              التفعيل
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="grid gap-4 text-right">
              <div className="grid gap-2">
                <Label htmlFor="name" className={errors.name ? "text-red-500" : ""}>
                  اسم المكافأة *
                </Label>
                <Input
                  id="name"
                  placeholder="مثال: خصم 10%"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={`text-right ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">وصف المكافأة</Label>
                <Textarea
                  id="description"
                  placeholder="مثال: خصم 10% على طلبك التالي"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="text-right min-h-[80px]"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="type" className={errors.type ? "text-red-500" : ""}>
                  نوع المكافأة *
                </Label>
                <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                  <SelectTrigger className={`text-right ${errors.type ? "border-red-500" : ""}`}>
                    <SelectValue placeholder="اختر نوع المكافأة" />
                  </SelectTrigger>
                  <SelectContent align="end">
                    <SelectItem value="percentage_discount">خصم نسبة</SelectItem>
                    <SelectItem value="fixed_discount">خصم مبلغ ثابت</SelectItem>
                    <SelectItem value="free_shipping">شحن مجاني</SelectItem>
                    <SelectItem value="free_product">منتج مجاني</SelectItem>
                    <SelectItem value="voucher">قسيمة شرائية رقمية</SelectItem>
                    <SelectItem value="special_offer">عرض خاص</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="points-cost" className={errors.pointsCost ? "text-red-500" : ""}>
                  تكلفة النقاط *
                </Label>
                <Input
                  id="points-cost"
                  type="number"
                  placeholder="مثال: 500"
                  value={formData.pointsCost}
                  onChange={(e) => handleChange("pointsCost", e.target.value)}
                  className={`text-right ${errors.pointsCost ? "border-red-500" : ""}`}
                />
                {errors.pointsCost && <p className="text-red-500 text-sm">{errors.pointsCost}</p>}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="conditions" className="space-y-4">
            <div className="grid gap-4 text-right">
              <div className="grid gap-2">
                <Label htmlFor="min-order-value">الحد الأدنى لقيمة الطلب</Label>
                <div className="flex items-center gap-2 flex-row-reverse">
                  <Input
                    id="min-order-value"
                    type="number"
                    placeholder="0"
                    value={formData.minOrderValue}
                    onChange={(e) => handleChange("minOrderValue", e.target.value)}
                    className="text-right"
                  />
                  <CurrencySymbol />
                </div>
                <p className="text-sm text-gray-500">اترك القيمة 0 إذا لم يكن هناك حد أدنى للطلب</p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="usage-limit">عدد مرات الاستخدام لكل عميل</Label>
                <Input
                  id="usage-limit"
                  type="number"
                  placeholder="1"
                  value={formData.usageLimit}
                  onChange={(e) => handleChange("usageLimit", e.target.value)}
                  className="text-right"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <div className="grid gap-4 text-right">
              <div className="grid gap-2">
                <Label htmlFor="included-products">المنتجات أو الفئات المشمولة</Label>
                <Textarea
                  id="included-products"
                  placeholder="أدخل المنتجات أو الفئات المشمولة، مفصولة بفواصل"
                  value={formData.includedProducts}
                  onChange={(e) => handleChange("includedProducts", e.target.value)}
                  className="text-right min-h-[80px]"
                />
                <p className="text-sm text-gray-500">اترك هذا الحقل فارغًا لتطبيق المكافأة على جميع المنتجات</p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="excluded-products">المنتجات أو الفئات المستثناة</Label>
                <Textarea
                  id="excluded-products"
                  placeholder="أدخل المنتجات أو الفئات المستثناة، مفصولة بفواصل"
                  value={formData.excludedProducts}
                  onChange={(e) => handleChange("excludedProducts", e.target.value)}
                  className="text-right min-h-[80px]"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activation" className="space-y-4">
            <div className="grid gap-4 text-right">
              <div className="grid gap-2">
                <Label htmlFor="valid-from">تاريخ بداية الصلاحية</Label>
                <DatePicker date={formData.validFrom} setDate={(date) => handleChange("validFrom", date)} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="valid-to" className={errors.validTo ? "text-red-500" : ""}>
                  تاريخ نهاية الصلاحية
                </Label>
                <DatePicker date={formData.validTo} setDate={(date) => handleChange("validTo", date)} />
                {errors.validTo && <p className="text-red-500 text-sm">{errors.validTo}</p>}
              </div>

              <div className="flex items-center justify-between flex-row-reverse">
                <Label htmlFor="is-active">تفعيل المكافأة</Label>
                <div
                  className="relative inline-block w-12 h-6 cursor-pointer"
                  onClick={() => handleChange("isActive", !formData.isActive)}
                >
                  <div
                    className={`block w-12 h-6 rounded-full transition-colors duration-200 ${
                      formData.isActive ? "bg-blue-500" : "bg-gray-200"
                    }`}
                  ></div>
                  <div
                    className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-200 transform ${
                      formData.isActive ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-row-reverse justify-between mt-4">
          <div className="flex gap-2">
            {activeTab === "activation" && (
              <Button type="button" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 rounded-full">
                حفظ
              </Button>
            )}
            <Button type="button" variant="outline" onClick={onClose} className="rounded-full">
              إلغاء
            </Button>
          </div>
          <div className="flex gap-2">
            {activeTab !== "activation" && (
              <Button
                type="button"
                onClick={() => {
                  const tabs = ["general", "conditions", "products", "activation"]
                  const currentIndex = tabs.indexOf(activeTab)
                  setActiveTab(tabs[currentIndex + 1])
                }}
                className="bg-blue-500 hover:bg-blue-600 rounded-full"
              >
                التالي
              </Button>
            )}
            {activeTab !== "general" && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const tabs = ["general", "conditions", "products", "activation"]
                  const currentIndex = tabs.indexOf(activeTab)
                  setActiveTab(tabs[currentIndex - 1])
                }}
                className="rounded-full"
              >
                السابق
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
