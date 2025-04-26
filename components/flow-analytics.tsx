"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, BarChart, Bar } from "recharts"

// بيانات تجريبية للرسوم البيانية
const flowPerformanceData = [
  { date: "01/04", opened: 120, clicked: 80, converted: 40 },
  { date: "02/04", opened: 130, clicked: 90, converted: 45 },
  { date: "03/04", opened: 100, clicked: 70, converted: 35 },
  { date: "04/04", opened: 140, clicked: 95, converted: 50 },
  { date: "05/04", opened: 150, clicked: 100, converted: 55 },
  { date: "06/04", opened: 160, clicked: 110, converted: 60 },
  { date: "07/04", opened: 170, clicked: 120, converted: 65 },
]

const channelPerformanceData = [
  { name: "البريد الإلكتروني", value: 65 },
  { name: "الرسائل النصية", value: 45 },
  { name: "الإشعارات", value: 80 },
  { name: "iMessage", value: 30 },
]

const audienceData = [
  { name: "عملاء جدد", value: 40 },
  { name: "عملاء حاليون", value: 30 },
  { name: "عملاء خاملون", value: 20 },
  { name: "عملاء VIP", value: 10 },
]

export function FlowAnalytics() {
  return (
    <Tabs defaultValue="performance" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="performance">أداء المسارات</TabsTrigger>
        <TabsTrigger value="channels">أداء القنوات</TabsTrigger>
        <TabsTrigger value="audience">تحليل الجمهور</TabsTrigger>
      </TabsList>

      <TabsContent value="performance">
        <Card>
          <CardHeader>
            <CardTitle>أداء المسارات</CardTitle>
            <CardDescription>تحليل أداء المسارات التسويقية خلال الأسبوع الماضي</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ChartContainer
                config={{
                  opened: {
                    label: "تم الفتح",
                    color: "hsl(var(--chart-1))",
                  },
                  clicked: {
                    label: "تم النقر",
                    color: "hsl(var(--chart-2))",
                  },
                  converted: {
                    label: "تم التحويل",
                    color: "hsl(var(--chart-3))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={flowPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="opened" stroke="var(--color-opened)" strokeWidth={2} />
                    <Line type="monotone" dataKey="clicked" stroke="var(--color-clicked)" strokeWidth={2} />
                    <Line type="monotone" dataKey="converted" stroke="var(--color-converted)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="channels">
        <Card>
          <CardHeader>
            <CardTitle>أداء القنوات</CardTitle>
            <CardDescription>مقارنة أداء القنوات المختلفة في المسارات التسويقية</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ChartContainer
                config={{
                  value: {
                    label: "معدل التفاعل %",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={channelPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="value" fill="var(--color-value)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="audience">
        <Card>
          <CardHeader>
            <CardTitle>تحليل الجمهور</CardTitle>
            <CardDescription>توزيع الجمهور المستهدف في المسارات التسويقية</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ChartContainer
                config={{
                  value: {
                    label: "النسبة %",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={audienceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="value" fill="var(--color-value)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
