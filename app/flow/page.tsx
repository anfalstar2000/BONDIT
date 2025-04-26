"use client"

import { Suspense, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FlowBuilder } from "@/components/flow-builder"
import { FlowTemplates } from "@/components/flow-templates"
import { FlowAnalytics } from "@/components/flow-analytics"

export default function FlowPage() {
  const [activeTab, setActiveTab] = useState("builder")

  return (
    <div className="container mx-auto p-6 space-y-6 rtl" dir="rtl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Bond It Flow</h1>
      </div>

      <Tabs defaultValue="builder" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="builder">منشئ المسارات</TabsTrigger>
          <TabsTrigger value="templates">القوالب الجاهزة</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>منشئ المسارات</CardTitle>
              <CardDescription>قم بإنشاء مسارات تسويقية مؤتمتة باستخدام السحب والإفلات</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>جاري التحميل...</div>}>
                <FlowBuilder />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>القوالب الجاهزة</CardTitle>
              <CardDescription>استخدم قوالب جاهزة لبدء مسارات تسويقية بسرعة</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>جاري التحميل...</div>}>
                <FlowTemplates />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تحليلات المسارات</CardTitle>
              <CardDescription>تتبع أداء مساراتك التسويقية</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>جاري التحميل...</div>}>
                <FlowAnalytics />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
