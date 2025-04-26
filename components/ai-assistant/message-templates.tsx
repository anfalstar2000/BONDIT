"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Edit, Check } from "lucide-react"

type Template = {
  id: string
  title: string
  content: string
  category: string
}

const initialTemplates: Template[] = [
  {
    id: "1",
    title: "الترحيب بالعملاء الجدد",
    content:
      "مرحبًا [اسم العميل]! نحن سعداء بانضمامك إلى عائلة [اسم العلامة التجارية]. استعد لتجربة استثنائية معنا. لا تتردد في التواصل معنا إذا كان لديك أي استفسار.",
    category: "email",
  },
  {
    id: "2",
    title: "عرض خاص",
    content:
      "عرض حصري لك! استمتع بخصم [نسبة الخصم]% على جميع منتجاتنا لمدة [المدة]. استخدم الكود: [كود الخصم] عند الدفع. العرض ساري حتى [تاريخ الانتهاء].",
    category: "sms",
  },
  {
    id: "3",
    title: "تذكير بسلة التسوق",
    content:
      "مرحبًا [اسم العميل]، لقد لاحظنا أن لديك منتجات في سلة التسوق. هل ترغب في إكمال عملية الشراء؟ المنتجات قد تنفد قريبًا!",
    category: "email",
  },
  {
    id: "4",
    title: "إطلاق منتج جديد",
    content:
      "نحن متحمسون للإعلان عن إطلاق [اسم المنتج الجديد]! اكتشف كيف يمكن لهذا المنتج أن يحسن [الفائدة الرئيسية]. احصل عليه الآن بسعر خاص للإطلاق!",
    category: "social",
  },
  {
    id: "5",
    title: "استطلاع رضا العملاء",
    content:
      "مرحبًا [اسم العميل]، نود أن نسمع رأيك! يرجى تخصيص دقيقتين من وقتك لإكمال استطلاع الرضا الخاص بنا. ستساعدنا آراؤك في تحسين خدماتنا.",
    category: "email",
  },
  {
    id: "6",
    title: "تهنئة بالمناسبات",
    content:
      "كل عام وأنت بخير بمناسبة [المناسبة]! نتمنى لك يومًا سعيدًا مليئًا بالفرح والسعادة. استمتع بخصم [نسبة الخصم]% كهدية منا في هذه المناسبة الخاصة.",
    category: "sms",
  },
]

export function MessageTemplates() {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [editedContent, setEditedContent] = useState("")
  const [newTemplateTitle, setNewTemplateTitle] = useState("")
  const [newTemplateContent, setNewTemplateContent] = useState("")
  const [newTemplateCategory, setNewTemplateCategory] = useState("email")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template)
    setEditedContent(template.content)
  }

  const handleSaveEdit = () => {
    if (!selectedTemplate) return

    setTemplates((prev) => prev.map((t) => (t.id === selectedTemplate.id ? { ...t, content: editedContent } : t)))
    setSelectedTemplate(null)
    setEditedContent("")
  }

  const handleAddTemplate = () => {
    if (!newTemplateTitle.trim() || !newTemplateContent.trim()) return

    const newTemplate: Template = {
      id: Date.now().toString(),
      title: newTemplateTitle,
      content: newTemplateContent,
      category: newTemplateCategory,
    }

    setTemplates((prev) => [...prev, newTemplate])
    setNewTemplateTitle("")
    setNewTemplateContent("")
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="email" dir="rtl">
        <TabsList className="mb-4">
          <TabsTrigger value="email">البريد الإلكتروني</TabsTrigger>
          <TabsTrigger value="sms">الرسائل النصية</TabsTrigger>
          <TabsTrigger value="social">وسائل التواصل</TabsTrigger>
          <TabsTrigger value="add">إضافة قالب جديد</TabsTrigger>
        </TabsList>

        {["email", "sms", "social"].map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates
                .filter((t) => t.category === category)
                .map((template) => (
                  <Card key={template.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{template.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-gray-600 line-clamp-4">{template.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <Button variant="outline" size="sm" onClick={() => handleSelectTemplate(template)}>
                        <Edit className="h-4 w-4 ml-2" />
                        تعديل
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(template.content, template.id)}>
                        {copiedId === template.id ? (
                          <Check className="h-4 w-4 ml-2 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4 ml-2" />
                        )}
                        {copiedId === template.id ? "تم النسخ" : "نسخ"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}

        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>إضافة قالب جديد</CardTitle>
              <CardDescription>أنشئ قالب رسالة جديد لاستخدامه في حملاتك التسويقية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="templateTitle">عنوان القالب</Label>
                <Input
                  id="templateTitle"
                  placeholder="أدخل عنوان القالب"
                  value={newTemplateTitle}
                  onChange={(e) => setNewTemplateTitle(e.target.value)}
                  dir="rtl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="templateCategory">فئة القالب</Label>
                <select
                  id="templateCategory"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newTemplateCategory}
                  onChange={(e) => setNewTemplateCategory(e.target.value)}
                  dir="rtl"
                >
                  <option value="email">البريد الإلكتروني</option>
                  <option value="sms">الرسائل النصية</option>
                  <option value="social">وسائل التواصل الاجتماعي</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="templateContent">محتوى القالب</Label>
                <Textarea
                  id="templateContent"
                  placeholder="أدخل محتوى القالب"
                  value={newTemplateContent}
                  onChange={(e) => setNewTemplateContent(e.target.value)}
                  rows={6}
                  dir="rtl"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddTemplate}>إضافة القالب</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedTemplate && (
        <Card>
          <CardHeader>
            <CardTitle>تعديل القالب: {selectedTemplate.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} rows={6} dir="rtl" />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
              إلغاء
            </Button>
            <Button onClick={handleSaveEdit}>حفظ التغييرات</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
