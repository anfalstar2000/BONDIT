"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"

// بيانات توزيع العملاء حسب الجنس
const genderData = [
  { name: "ذكور", value: 65, color: "#3B82F6" },
  { name: "إناث", value: 35, color: "#93C5FD" },
]

// بيانات توزيع العملاء حسب العمر
const ageData = [
  { name: "18-24", value: 15, color: "#3B82F6" },
  { name: "25-34", value: 35, color: "#60A5FA" },
  { name: "35-44", value: 25, color: "#93C5FD" },
  { name: "45-54", value: 15, color: "#BFDBFE" },
  { name: "55+", value: 10, color: "#DBEAFE" },
]

// بيانات توزيع العملاء حسب البلد
const countryData = [
  { name: "السعودية", value: 60, color: "#3B82F6" },
  { name: "الإمارات", value: 15, color: "#60A5FA" },
  { name: "الكويت", value: 10, color: "#93C5FD" },
  { name: "قطر", value: 8, color: "#BFDBFE" },
  { name: "البحرين", value: 7, color: "#DBEAFE" },
]

// بيانات توزيع العملاء حسب الولاء
const loyaltyData = [
  { name: "عملاء جدد", value: 25, color: "#3B82F6" },
  { name: "عملاء متكررون", value: 45, color: "#60A5FA" },
  { name: "عملاء دائمون", value: 30, color: "#93C5FD" },
]

interface CustomersStatsCardProps {
  title?: string
  icon?: string
  iconAlt?: string
  className?: string
}

export function CustomersStatsCard({
  title = "العملاء",
  icon = "/icons/customers.svg",
  iconAlt = "icon",
  className,
}: CustomersStatsCardProps) {
  const [activeTab, setActiveTab] = useState("gender")

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={10}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  const totalCustomers = 1250
  const newCustomersThisMonth = 78
  const growthRate = 12.5

  return (
    <Card className="bg-white rounded-[24px] border border-gray-100 hover:border-gray-200 transition-all">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Image src={icon || "/placeholder.svg"} alt={iconAlt} width={20} height={20} className="text-[#C4C4C4]" />
            <h2 className="text-base font-medium">{title}</h2>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="text-xs text-gray-500 rounded-full h-7 px-3 border-gray-200 hover:bg-gray-50 hover:text-gray-700"
              >
                المزيد
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] rtl rounded-[24px] border-gray-100">
              <DialogHeader>
                <DialogTitle className="text-right text-base font-medium">تحليل بيانات العملاء</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white border border-gray-100 p-4 rounded-2xl">
                    <h3 className="font-medium text-sm text-gray-700 mb-1">إجمالي العملاء</h3>
                    <p className="text-xl font-bold">{totalCustomers}</p>
                  </div>
                  <div className="bg-white border border-gray-100 p-4 rounded-2xl">
                    <h3 className="font-medium text-sm text-gray-700 mb-1">عملاء جدد هذا الشهر</h3>
                    <p className="text-xl font-bold">{newCustomersThisMonth}</p>
                  </div>
                </div>
                <div className="bg-white border border-gray-100 p-4 rounded-2xl">
                  <h3 className="font-medium text-sm text-gray-700 mb-1">معدل النمو</h3>
                  <div className="flex items-center">
                    <p className="text-xl font-bold">{growthRate}%</p>
                    <ChevronLeft className="h-4 w-4 text-blue-500 mr-1" />
                  </div>
                </div>
                <div className="h-[250px]">
                  <h3 className="font-medium text-sm mb-2">توزيع العملاء حسب البلد</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={countryData} layout="vertical">
                      <XAxis type="number" tick={{ fontSize: 10 }} />
                      <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={70} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white border border-gray-100 p-3 rounded-2xl">
            <p className="text-xs text-gray-500 mb-1">إجمالي العملاء</p>
            <p className="text-lg font-bold">{totalCustomers}</p>
          </div>
          <div className="bg-white border border-gray-100 p-3 rounded-2xl">
            <p className="text-xs text-gray-500 mb-1">عملاء جدد</p>
            <div className="flex items-center">
              <p className="text-lg font-bold">{newCustomersThisMonth}</p>
              <span className="text-blue-500 text-xs mr-1 flex items-center">
                <ChevronLeft className="h-3 w-3" />
                {growthRate}%
              </span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="gender" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-3 bg-gray-50 p-1 rounded-full">
            <TabsTrigger
              value="gender"
              className="text-xs rounded-full data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-none"
            >
              الجنس
            </TabsTrigger>
            <TabsTrigger
              value="age"
              className="text-xs rounded-full data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-none"
            >
              العمر
            </TabsTrigger>
            <TabsTrigger
              value="country"
              className="text-xs rounded-full data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-none"
            >
              البلد
            </TabsTrigger>
            <TabsTrigger
              value="loyalty"
              className="text-xs rounded-full data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-none"
            >
              الولاء
            </TabsTrigger>
          </TabsList>
          <TabsContent value="gender" className="h-[180px] mt-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="age" className="h-[180px] mt-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={50} />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="country" className="h-[180px] mt-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={countryData} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={60} />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="loyalty" className="h-[180px] mt-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={loyaltyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {loyaltyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
