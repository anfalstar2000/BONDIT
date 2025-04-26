"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Download, Filter, Plus, Star, MoreHorizontal, ChevronDown, ArrowUpDown, UserPlus, FileText, Mail, Phone } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

const customers = [
  {
    id: "1",
    name: "وفاء سعود",
    phone: "1864243803",
    email: "Evwlen16780@gmail.com",
    level: "المستوى 1",
    levelNote: "موافقتنا نوبي",
    totalSpent: "0 ريال",
    points: "300 نقطة",
    createdAt: "Apr 06, 2025",
    createdAtTime: "At 11:58:50",
    status: "active",
    tags: "عميل جديد",
    lastActivity: "منذ 3 أيام",
  },
  {
    id: "2",
    name: "أحمد علي",
    phone: "1050076408",
    email: "ahmed@example.com",
    level: "المستوى 2",
    levelNote: "موافقتنا نوبي",
    totalSpent: "1,250 ريال",
    points: "450 نقطة",
    createdAt: "Apr 06, 2025",
    createdAtTime: "At 11:14:25",
    status: "active",
    tags: "عميل مميز",
    lastActivity: "منذ يوم واحد",
  },
  {
    id: "3",
    name: "سارة الحارثي",
    phone: "672105340",
    email: "sarah@example.com",
    level: "المستوى 3",
    levelNote: "موافقتنا نوبي",
    totalSpent: "3,500 ريال",
    points: "780 نقطة",
    createdAt: "Apr 06, 2025",
    createdAtTime: "At 11:03:23",
    status: "active",
    tags: "عميل ذهبي",
    lastActivity: "اليوم",
  },
  {
    id: "4",
    name: "روان سلطان",
    phone: "1786777578",
    email: "Sajaalrasheed9@gmail.com",
    level: "المستوى 1",
    levelNote: "موافقتنا نوبي",
    totalSpent: "750 ريال",
    points: "200 نقطة",
    createdAt: "Apr 06, 2025",
    createdAtTime: "At 10:43:15",
    status: "active",
    tags: "",
    lastActivity: "منذ أسبوع",
  },
  {
    id: "5",
    name: "ريم السبيعي",
    phone: "1403953955",
    email: "S6354091@estg.moe.gov.sa",
    level: "المستوى 2",
    levelNote: "موافقتنا نوبي",
    totalSpent: "2,100 ريال",
    points: "520 نقطة",
    createdAt: "Apr 06, 2025",
    createdAtTime: "At 10:38:02",
    status: "active",
    tags: "عميل مميز",
    lastActivity: "منذ 5 أيام",
  },
  {
    id: "6",
    name: "مريم حمزة",
    phone: "848085987",
    email: "mariam@example.com",
    level: "المستوى 1",
    levelNote: "موافقتنا نوبي",
    totalSpent: "450 ريال",
    points: "120 نقطة",
    createdAt: "Apr 06, 2025",
    createdAtTime: "At 09:58:37",
    status: "inactive",
    tags: "",
    lastActivity: "منذ شهر",
  },
  {
    id: "7",
    name: "سارة سعد",
    phone: "1336608356",
    email: "sarahs@example.com",
    level: "المستوى 3",
    levelNote: "موافقتنا نوبي",
    totalSpent: "4,200 ريال",
    points: "950 نقطة",
    createdAt: "Apr 06, 2025",
    createdAtTime: "At 08:42:26",
    status: "active",
    tags: "عميل بلاتيني",
    lastActivity: "اليوم",
  },
  {
    id: "8",
    name: "نجاة محمد يحي",
    phone: "1973361829",
    email: "Myshw7399@gmail.com",
    level: "المستوى 2",
    levelNote: "موافقتنا نوبي",
    totalSpent: "1,800 ريال",
    points: "420 نقطة",
    createdAt: "Apr 06, 2025",
    createdAtTime: "At 07:37:32",
    status: "active",
    tags: "عميل مميز",
    lastActivity: "منذ يومين",
  },
  {
    id: "9",
    name: "سلمى الحرشي",
    phone: "442067499",
    email: "Salmaalhrish@gmail.com",
    level: "المستوى 1",
    levelNote: "موافقتنا نوبي",
    totalSpent: "650 ريال",
    points: "180 نقطة",
    createdAt: "Apr 06, 2025",
    createdAtTime: "At 06:53:56",
    status: "active",
    tags: "",
    lastActivity: "منذ أسبوعين",
  },
  {
    id: "10",
    name: "جنى نايف",
    phone: "91402101",
    email: "Jananaifoo@icloud.com",
    level: "المستوى 1",
    levelNote: "موافقتنا نوبي",
    totalSpent: "320 ريال",
    points: "90 نقطة",
    createdAt: "Apr 06, 2025",
    createdAtTime: "At 06:25:19",
    status: "inactive",
    tags: "",
    lastActivity: "منذ شهرين",
  },
]

export default function CustomersPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")

  return (
    <div className="container mx-auto p-6 text-right" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3 mr-auto">
          <div className="bg-blue-50 p-2 rounded-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 7.16C17.94 7.15 17.87 7.15 17.81 7.16C16.43 7.11 15.33 5.98 15.33 4.58C15.33 3.15 16.48 2 17.91 2C19.34 2 20.49 3.16 20.49 4.58C20.48 5.98 19.38 7.11 18 7.16Z" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.9699 14.44C18.3399 14.67 19.8499 14.43 20.9099 13.72C22.3199 12.78 22.3199 11.24 20.9099 10.3C19.8399 9.59004 18.3099 9.35003 16.9399 9.59003" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5.96998 7.16C6.02998 7.15 6.09998 7.15 6.15998 7.16C7.53998 7.11 8.63998 5.98 8.63998 4.58C8.63998 3.15 7.48998 2 6.05998 2C4.62998 2 3.47998 3.16 3.47998 4.58C3.48998 5.98 4.58998 7.11 5.96998 7.16Z" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.99994 14.44C5.62994 14.67 4.11994 14.43 3.05994 13.72C1.64994 12.78 1.64994 11.24 3.05994 10.3C4.12994 9.59004 5.65994 9.35003 7.02994 9.59003" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 14.63C11.94 14.62 11.87 14.62 11.81 14.63C10.43 14.58 9.32996 13.45 9.32996 12.05C9.32996 10.62 10.48 9.47 11.91 9.47C13.34 9.47 14.49 10.63 14.49 12.05C14.48 13.45 13.38 14.59 12 14.63Z" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.08997 17.78C7.67997 18.72 7.67997 20.26 9.08997 21.2C10.69 22.27 13.31 22.27 14.91 21.2C16.32 20.26 16.32 18.72 14.91 17.78C13.32 16.72 10.69 16.72 9.08997 17.78Z" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold">العملاء</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-full">
            <UserPlus className="ml-2 h-4 w-4" />
            إضافة عميل
          </Button>
          <Button variant="outline" className="text-gray-600 border-gray-200 hover:bg-gray-50 transition-colors rounded-full">
            <span className="ml-2">أخرى أكثر</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white shadow-sm rounded-3xl border border-gray-100">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="bg-blue-50 p-3 rounded-full mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 7.16C17.94 7.15 17.87 7.15 17.81 7.16C16.43 7.11 15.33 5.98 15.33 4.58C15.33 3.15 16.48 2 17.91 2C19.34 2 20.49 3.16 20.49 4.58C20.48 5.98 19.38 7.11 18 7.16Z" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.9699 14.44C18.3399 14.67 19.8499 14.43 20.9099 13.72C22.3199 12.78 22.3199 11.24 20.9099 10.3C19.8399 9.59004 18.3099 9.35003 16.9399 9.59003" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.96998 7.16C6.02998 7.15 6.09998 7.15 6.15998 7.16C7.53998 7.11 8.63998 5.98 8.63998 4.58C8.63998 3.15 7.48998 2 6.05998 2C4.62998 2 3.47998 3.16 3.47998 4.58C3.48998 5.98 4.58998 7.11 5.96998 7.16Z" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.99994 14.44C5.62994 14.67 4.11994 14.43 3.05994 13.72C1.64994 12.78 1.64994 11.24 3.05994 10.3C4.12994 9.59004 5.65994 9.35003 7.02994 9.59003" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 14.63C11.94 14.62 11.87 14.62 11.81 14.63C10.43 14.58 9.32996 13.45 9.32996 12.05C9.32996 10.62 10.48 9.47 11.91 9.47C13.34 9.47 14.49 10.63 14.49 12.05C14.48 13.45 13.38 14.59 12 14.63Z" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.08997 17.78C7.67997 18.72 7.67997 20.26 9.08997 21.2C10.69 22.27 13.31 22.27 14.91 21.2C16.32 20.26 16.32 18.72 14.91 17.78C13.32 16.72 10.69 16.72 9.08997 17.78Z" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="text-2xl font-bold">11,991</div>
            <div className="text-sm text-gray-500">إجمالي العملاء</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm rounded-3xl border border-gray-100">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="bg-green-50 p-3 rounded-full mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.75 12L10.58 14.83L16.25 9.17" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="text-2xl font-bold">8,450</div>
            <div className="text-sm text-gray-500">عملاء نشطين</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm rounded-3xl border border-gray-100">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="bg-red-50 p-3 rounded-full mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.17 14.83L14.83 9.17" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14.83 14.83L9.17 9.17" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="text-2xl font-bold">3,541</div>
            <div className="text-sm text-gray-500">عملاء غير نشطين</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm rounded-3xl border border-gray-100">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="bg-yellow-50 p-3 rounded-full mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.75 2.44995C11.44 1.85995 12.57 1.85995 13.27 2.44995L14.85 3.81005C15.15 4.07005 15.71 4.28005 16.11 4.28005H17.81C18.87 4.28005 19.74 5.14995 19.74 6.20995V7.91005C19.74 8.30005 19.95 8.87005 20.21 9.17005L21.57 10.75C22.16 11.44 22.16 12.57 21.57 13.27L20.21 14.85C19.95 15.15 19.74 15.71 19.74 16.11V17.8101C19.74 18.8701 18.87 19.7401 17.81 19.7401H16.11C15.72 19.7401 15.15 19.9501 14.85 20.2101L13.27 21.5701C12.58 22.1601 11.45 22.1601 10.75 21.5701L9.17 20.2101C8.87 19.9501 8.31 19.7401 7.91 19.7401H6.18C5.12 19.7401 4.25 18.8701 4.25 17.8101V16.1001C4.25 15.7101 4.04 15.1501 3.79 14.8501L2.44 13.2601C1.86 12.5701 1.86 11.4501 2.44 10.7601L3.79 9.17005C4.04 8.87005 4.25 8.31005 4.25 7.92005V6.20995C4.25 5.14995 5.12 4.28005 6.18 4.28005H7.91C8.3 4.28005 8.87 4.07005 9.17 3.81005L10.75 2.44995Z" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="text-2xl font-bold">4,250</div>
            <div className="text-sm text-gray-500">عملاء مميزين</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2 mb-6">
        <Button variant="outline" className="border-gray-200 hover:bg-gray-50 transition-colors rounded-full">
          <Plus className="ml-2 h-4 w-4" />
          إضافة \ خصم نقاط
        </Button>
        <Button variant="outline" className="border-gray-200 hover:bg-gray-50 transition-colors rounded-full">
          <Star className="ml-2 h-4 w-4" />
          منح حملة
        </Button>
        <Button variant="outline" className="border-gray-200 hover:bg-gray-50 transition-colors rounded-full">
          <FileText className="ml-2 h-4 w-4" />
          تصدير التقرير
        </Button>
      </div>

      <Card className="bg-white shadow-sm rounded-3xl border border-gray-100 mb-6">
        <CardContent className="p-0">
          <Tabs defaultValue="all" className="w-full">
            <div className="border-b">
              <div className="px-6">
                <TabsList className="bg-transparent border-b-0 h-14 p-0 gap-8">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0"
                  >
                    جميع العملاء
                  </TabsTrigger>
                  <TabsTrigger
                    value="active"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0"
                  >
                    العملاء النشطين
                  </TabsTrigger>
                  <TabsTrigger
                    value="vip"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0"
                  >
                    العملاء المميزين
                  </TabsTrigger>
                  <TabsTrigger
                    value="new"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0"
                  >
                    العملاء الجدد
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                  <Button variant="outline" className="border-gray-200 hover:bg-gray-50 transition-colors rounded-full">
                    <Download className="ml-2 h-4 w-4" />
                    تصدير
                  </Button>
                  <Button variant="outline" className="border-gray-200 hover:bg-gray-50 transition-colors rounded-full">
                    <Filter className="ml-2 h-4 w-4" />
                    تصفية
                  </Button>
                </div>
                <div className="flex gap-2">
                  <div className="relative w-64">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      type="text"
                      placeholder="بحث عن عميل..."
                      className="pl-10 pr-10 py-2 border border-gray-200 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <TabsContent value="all" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="text-right font-medium w-10"></TableHead>
                      <TableHead className="text-right font-medium">آخر نشاط</TableHead>
                      <TableHead className="text-right font-medium">
                        <div className="flex items-center gap-1">
                          رصيد النقاط
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right font-medium">
                        <div className="flex items-center gap-1">
                          إجمالي المشتريات
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right font-medium">
                        <div className="flex items-center gap-1">
                          المستوى
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right font-medium">معلومات الاتصال</TableHead>
                      <TableHead className="text-right font-medium">
                        <div className="flex items-center gap-1">
                          العميل
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right font-medium py-4">
                        <div className="flex items-center gap-1">
                          تاريخ التسجيل
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow key={customer.id} className="hover:bg-gray-50 relative">
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Link href={`/customers/${customer.id}`} className="flex w-full">
                                  عرض التفاصيل
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>إضافة نقاط</DropdownMenuItem>
                              <DropdownMenuItem>خصم نقاط</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>تعديل البيانات</DropdownMenuItem>
                              <DropdownMenuItem>إرسال رسالة</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-500">حذف العميل</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <div className={`absolute right-0 top-0 bottom-0 w-1 ${customer.status === 'active' ? 'bg-green-500' : 'bg-gray-300'} rounded-full`}></div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{customer.lastActivity}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{customer.points}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{customer.totalSpent}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              customer.level.includes('1') ? 'bg-blue-500' : 
                              customer.level.includes('2') ? 'bg-green-500' : 
                              'bg-yellow-500'
                            }`}></div>
                            <div>
                              <div>{customer.level}</div>
                              <div className="text-xs text-gray-500">{customer.levelNote}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{customer.phone}</span>
                            </div>
                            {customer.email && (
                              <div className="flex items-center gap-2 mt-1">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">{customer.email}</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Link href={`/customers/${customer.id}`} className="group flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${customer.status === 'active' ? 'bg-blue-500' : 'bg-gray-400'}`}>
                              {customer.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium group-hover:text-blue-500 transition-colors">{customer.name}</div>
                              {customer.tags && (
                                <Badge variant="outline" className="bg-blue-50 text-blue-500 border-blue-200 rounded-full mt-1">
                                  {customer.tags}
                                </Badge>
                              )}
                            </div>
                          </Link>
                        </TableCell>
                        <TableCell className="font-medium">
                          <div>{customer.createdAt}</div>
                          <div className="text-xs text-gray-500">{customer.createdAtTime}</div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="active" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="text-right font-medium w-10"></TableHead>
                      <TableHead className="text-right font-medium">آخر نشاط</TableHead>
                      <TableHead className="text-right font-medium">رصيد النقاط</TableHead>
                      <TableHead className="text-right font-medium">إجمالي المشتريات</TableHead>
                      <TableHead className="text-right font-medium">المستوى</TableHead>
                      <TableHead className="text-right font-medium">معلومات الاتصال</TableHead>
                      <TableHead className="text-right font-medium">العميل</TableHead>
                      <TableHead className="text-right font-medium">تاريخ التسجيل</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.filter(c => c.status === 'active').map((customer) => (
                      <TableRow key={customer.id} className="hover:bg-gray-50 relative">
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Link href={`/customers/${customer.id}`} className="flex w-full">
                                  عرض التفاصيل
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>إضافة نقاط</DropdownMenuItem>
                              <DropdownMenuItem>خصم نقاط</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>تعديل البيانات</DropdownMenuItem>
                              <DropdownMenuItem>إرسال رسالة</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-500">حذف العميل</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <div className="absolute right-0 top-0 bottom-0 w-1 bg-green-500 rounded-full"></div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{customer.lastActivity}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{customer.points}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{customer.totalSpent}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              customer.level.includes('1') ? 'bg-blue-500' : 
                              customer.level.includes('2') ? 'bg-green-500' : 
                              'bg-yellow-500'
                            }`}></div>
                            <div>
                              <div>{customer.level}</div>
                              <div className="text-xs text-gray-500">{customer.levelNote}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{customer.phone}</span>
                            </div>
                            {customer.email && (
                              <div className="flex items-center gap-2 mt-1">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">{customer.email}</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Link href={`/customers/${customer.id}`} className="group flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                              {customer.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium group-hover:text-blue-500 transition-colors">{customer.name}</div>
                              {customer.tags && (
                                <Badge variant="outline" className="bg-blue-50 text-blue-500 border-blue-200 rounded-full mt-1">
                                  {customer.tags}
                                </Badge>
                              )}
                            </div>
                          </Link>
                        </TableCell>
                        <TableCell className="font-medium">
                          <div>{customer.createdAt}</div>
                          <div className="text-xs text-gray-500">{customer.createdAtTime}</div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="vip" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="text-right font-medium w-10"></TableHead>
                      <TableHead className="text-right font-medium">آخر نشاط</TableHead>
                      <TableHead className="text-right font-medium">رصيد النقاط</TableHead>
                      <TableHead className="text-right font-medium">إجمالي المشتريات</TableHead>
                      <TableHead className="text-right font-medium">المستوى</TableHead>
                      <TableHead className="text-right font-medium">معلومات الاتصال</TableHead>
                      <TableHead className="text-right font-medium">العميل</TableHead>
                      <TableHead className="text-right font-medium">تاريخ التسجيل</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.filter(c => c.tags.includes('مميز') || c.tags.includes('ذهبي') || c.tags.includes('بلاتيني')).map((customer) => (
                      <TableRow key={customer.id} className="hover:bg-gray-50 relative">
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Link href={`/customers/${customer.id}`} className="flex w-full">
                                  عرض التفاصيل
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>إضافة نقاط</DropdownMenuItem>
                              <DropdownMenuItem>خصم نقاط</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>تعديل البيانات</DropdownMenuItem>
                              <DropdownMenuItem>إرسال رسالة</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-500">حذف العميل</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <div className={`absolute right-0 top-0 bottom-0 w-1 ${customer.status === 'active' ? 'bg-green-500' : 'bg-gray-300'} rounded-full`}></div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{customer.lastActivity}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{customer.points}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{customer.totalSpent}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              customer.level.includes('1') ? 'bg-blue-500' : 
                              customer.level.includes('2') ? 'bg-green-500' : 
                              'bg-yellow-500'
                            }`}></div>
                            <div>
                              <div>{customer.level}</div>
                              <div className="text-xs text-gray-500">{customer.levelNote}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{customer.phone}</span>
                            </div>
                            {customer.email && (
                              <div className="flex items-center gap-2 mt-1">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">{customer.email}</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Link href={`/customers/${customer.id}`} className="group flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${customer.status === 'active' ? 'bg-blue-500' : 'bg-gray-400'}`}>
                              {customer.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium group-hover:text-blue-500 transition-colors">{customer.name}</div>
                              {customer.tags && (
                                <Badge variant="outline" className="bg-blue-50 text-blue-500 border-blue-200 rounded-full mt-1">
                                  {customer.tags}
                                </Badge>
                              )}
                            </div>
                          </Link>
                        </TableCell>
                        <TableCell className="font-medium">
                          <div>{customer.createdAt}</div>
                          <div className="text-xs text-gray-500">{customer.createdAtTime}</div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="new" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="text-right font-medium w-10"></TableHead>
                      <TableHead className="text-right font-medium">آخر نشاط</TableHead>
                      <TableHead className="text-right font-medium">رصيد النقاط</TableHead>
                      <TableHead className="text-right font-medium">إجمالي المشتريات</TableHead>
                      <TableHead className="text-right font-medium">المستوى</TableHead>
                      <TableHead className="text-right font-medium">معلومات الاتصال</TableHead>
                      <TableHead className="text-right font-medium">العميل</TableHead>
                      <TableHead className="text-right font-medium">تاريخ التسجيل</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.filter(c => c.tags.includes('جديد')).map((customer) => (
                      <TableRow key={customer.id} className="hover:bg-gray-50 relative">
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Link href={`/customers/${customer.id}`} className="flex w-full">
                                  عرض التفاصيل
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>إضافة نقاط</DropdownMenuItem>
                              <DropdownMenuItem>خصم نقاط</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>تعديل البيانات</DropdownMenuItem>
                              <DropdownMenuItem>إرسال رسالة</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-500">حذف العميل</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <div className={`absolute right-0 top-0 bottom-0 w-1 ${customer.status === 'active' ? 'bg-green-500' : 'bg-gray-300'} rounded-full`}></div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{customer.lastActivity}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{customer.points}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{customer.totalSpent}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              customer.level.includes('1') ? 'bg-blue-500' : 
                              customer.level.includes('2') ? 'bg-green-500' : 
                              'bg-yellow-500'
                            }`}></div>
                            <div>
                              <div>{customer.level}</div>
                              <div className="text-xs text-gray-500">{customer.levelNote}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{customer.phone}</span>
                            </div>
                            {customer.email && (
                              <div className="flex items-center gap-2 mt-1">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">{customer.email}</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Link href={`/customers/${customer.id}`} className="group flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${customer.status === 'active' ? 'bg-blue-500' : 'bg-gray-400'}`}>
                              {customer.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium group-hover:text-blue-500 transition-colors">{customer.name}</div>
                              {customer.tags && (
                                <Badge variant="outline" className="bg-blue-50 text-blue-500 border-blue-200 rounded-full mt-1">
                                  {customer.tags}
                                </Badge>
                              )}
                            </div>
                          </Link>
                        </TableCell>
                        <TableCell className="font-medium">
                          <div>{customer.createdAt}</div>
                          <div className="text-xs text-gray-500">{customer.createdAtTime}</div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
