"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Plus,
  Download,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Star,
  Gift,
  Clock,
  FileText,
  Edit,
  Send,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

export default function CustomerProfilePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("info")

  // هذه بيانات تجريبية - في التطبيق الحقيقي ستأتي من قاعدة البيانات
  const customer = {
    id: params.id,
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
    country: "السعودية",
    postalCode: "-",
    preferredLanguage: "Ar",
    notes: "-",
    idNumber: "-",
    referralLink: "https://mo-matcha.com/ar/?ReferralCode=nAChECC78BFTgk",
    referredBy: "لم يتم توصية من قبل",
    bloodType: "لا يوجد",
    birthDate: "لم يتم إضافة أي عيد ميلاد بعد",
    pointsToNextLevel: 200,
    totalPointsForNextLevel: 500,
    lastActivity: "منذ 3 أيام",
    activities: [
      {
        id: "1",
        type: "purchase",
        title: "عملية شراء",
        date: "Apr 03, 2025",
        time: "10:45 AM",
        amount: "0 ريال",
        points: "+100 نقطة",
        status: "completed",
      },
    ],
  }

  return (
    <div className="container mx-auto p-4 md:p-6 text-right" dir="rtl">
      {/* رأس الصفحة - معلومات العميل */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <Link href="/customers">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl">
              {customer.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{customer.name}</h1>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="bg-blue-50 text-blue-500 border-blue-200 rounded-full">
                  {customer.tags || "عميل عادي"}
                </Badge>
                <span className="text-sm text-gray-500">آخر نشاط: {customer.lastActivity}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap mt-4 md:mt-0 w-full md:w-auto justify-end">
          <Button className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-full">
            <Plus className="ml-2 h-4 w-4" />
            إضافة نشاط
          </Button>
          <Button variant="outline" className="border-gray-200 hover:bg-gray-50 transition-colors rounded-full">
            <Send className="ml-2 h-4 w-4" />
            إرسال رسالة
          </Button>
          <Button variant="outline" className="border-gray-200 hover:bg-gray-50 transition-colors rounded-full">
            <Edit className="ml-2 h-4 w-4" />
            تعديل
          </Button>
        </div>
      </div>

      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white shadow-sm rounded-2xl border border-gray-100">
          <CardContent className="p-4">
            <div className="flex flex-col items-center justify-center">
              <div className="bg-blue-50 p-3 rounded-full mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z"
                    stroke="#3B82F6"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 7V21C2 21.83 2.94 22.3 3.6 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.29 22.29C8.68 22.68 9.32 22.68 9.71 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z"
                    stroke="#3B82F6"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 13.01H12"
                    stroke="#3B82F6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 9.01H12"
                    stroke="#3B82F6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.99561 13H6.00459"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.99561 9H6.00459"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-xl font-bold">{customer.totalSpent}</div>
              <div className="text-sm text-gray-500">إجمالي المشتريات</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm rounded-2xl border border-gray-100">
          <CardContent className="p-4">
            <div className="flex flex-col items-center justify-center">
              <div className="bg-green-50 p-3 rounded-full mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    stroke="#22C55E"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12.88V11.12C2 10.08 2.85 9.22 3.9 9.22C5.71 9.22 6.45 7.94 5.54 6.37C5.02 5.47 5.33 4.3 6.24 3.78L7.97 2.79C8.76 2.32 9.78 2.6 10.25 3.39L10.36 3.58C11.26 5.15 12.74 5.15 13.65 3.58L13.76 3.39C14.23 2.6 15.25 2.32 16.04 2.79L17.77 3.78C18.68 4.3 18.99 5.47 18.47 6.37C17.56 7.94 18.3 9.22 20.11 9.22C21.15 9.22 22.01 10.07 22.01 11.12V12.88C22.01 13.92 21.16 14.78 20.11 14.78C18.3 14.78 17.56 16.06 18.47 17.63C18.99 18.54 18.68 19.7 17.77 20.22L16.04 21.21C15.25 21.68 14.23 21.4 13.76 20.61L13.65 20.42C12.75 18.85 11.27 18.85 10.36 20.42L10.25 20.61C9.78 21.4 8.76 21.68 7.97 21.21L6.24 20.22C5.33 19.7 5.02 18.53 5.54 17.63C6.45 16.06 5.71 14.78 3.9 14.78C2.85 14.78 2 13.92 2 12.88Z"
                    stroke="#22C55E"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-xl font-bold">{customer.level}</div>
              <div className="text-sm text-gray-500">المستوى الحالي</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm rounded-2xl border border-gray-100">
          <CardContent className="p-4">
            <div className="flex flex-col items-center justify-center">
              <div className="bg-yellow-50 p-3 rounded-full mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                    stroke="#F59E0B"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.5 9.75C16.3284 9.75 17 9.07843 17 8.25C17 7.42157 16.3284 6.75 15.5 6.75C14.6716 6.75 14 7.42157 14 8.25C14 9.07843 14.6716 9.75 15.5 9.75Z"
                    stroke="#F59E0B"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.5 9.75C9.32843 9.75 10 9.07843 10 8.25C10 7.42157 9.32843 6.75 8.5 6.75C7.67157 6.75 7 7.42157 7 8.25C7 9.07843 7.67157 9.75 8.5 9.75Z"
                    stroke="#F59E0B"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.4 13.3H15.6C16.1 13.3 16.5 13.7 16.5 14.2C16.5 16.69 14.49 18.7 12 18.7C9.51 18.7 7.5 16.69 7.5 14.2C7.5 13.7 7.9 13.3 8.4 13.3Z"
                    stroke="#F59E0B"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-xl font-bold">{customer.points}</div>
              <div className="text-sm text-gray-500">رصيد النقاط</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm rounded-2xl border border-gray-100">
          <CardContent className="p-4">
            <div className="flex flex-col items-center justify-center">
              <div className="bg-purple-50 p-3 rounded-full mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 2V5"
                    stroke="#8B5CF6"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 2V5"
                    stroke="#8B5CF6"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.5 9.09H20.5"
                    stroke="#8B5CF6"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                    stroke="#8B5CF6"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.6947 13.7H15.7037"
                    stroke="#8B5CF6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.6947 16.7H15.7037"
                    stroke="#8B5CF6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.9955 13.7H12.0045"
                    stroke="#8B5CF6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.9955 16.7H12.0045"
                    stroke="#8B5CF6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.29431 13.7H8.30329"
                    stroke="#8B5CF6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.29431 16.7H8.30329"
                    stroke="#8B5CF6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-xl font-bold">{customer.createdAt}</div>
              <div className="text-sm text-gray-500">تاريخ التسجيل</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* القسم الرئيسي - يحتوي على التبويبات والبطاقات */}
        <div className="lg:col-span-2">
          <Card className="bg-white shadow-sm rounded-2xl border border-gray-100 mb-4 lg:mb-6">
            <CardContent className="p-0">
              <Tabs defaultValue="info" className="w-full" onValueChange={setActiveTab}>
                <div className="border-b">
                  <div className="px-4 md:px-6">
                    <TabsList className="bg-transparent border-b-0 h-14 p-0 gap-4 md:gap-8 justify-start">
                      <TabsTrigger
                        value="info"
                        className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0"
                      >
                        نبذة
                      </TabsTrigger>
                      <TabsTrigger
                        value="history"
                        className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0"
                      >
                        سجل العميل
                      </TabsTrigger>
                      <TabsTrigger
                        value="points"
                        className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-transparent h-14 px-0"
                      >
                        النقاط والمكافآت
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </div>

                {/* تبويب النبذة */}
                <TabsContent value="info" className="p-4 md:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                            stroke="#3B82F6"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"
                            stroke="#3B82F6"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        المعلومات الشخصية
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-gray-100 p-2 rounded-full">
                            <Phone className="h-4 w-4 text-gray-500" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">رقم الهاتف</div>
                            <div>{customer.phone}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-gray-100 p-2 rounded-full">
                            <Mail className="h-4 w-4 text-gray-500" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">البريد الإلكتروني</div>
                            <div>{customer.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-gray-100 p-2 rounded-full">
                            <MapPin className="h-4 w-4 text-gray-500" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">الدولة</div>
                            <div>{customer.country}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-gray-100 p-2 rounded-full">
                            <Calendar className="h-4 w-4 text-gray-500" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">تاريخ الميلاد</div>
                            <div>{customer.birthDate}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M9.5 13.75C9.5 14.72 10.25 15.5 11.17 15.5H13.05C13.85 15.5 14.5 14.82 14.5 13.97C14.5 13.06 14.1 12.73 13.51 12.52L10.5 11.47C9.91 11.26 9.51001 10.94 9.51001 10.02C9.51001 9.18 10.16 8.49001 10.96 8.49001H12.84C13.76 8.49001 14.51 9.27001 14.51 10.24"
                            stroke="#3B82F6"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 7.5V16.5"
                            stroke="#3B82F6"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2"
                            stroke="#3B82F6"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17 3V7H21"
                            stroke="#3B82F6"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 2L17 7"
                            stroke="#3B82F6"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        معلومات الترشيح
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-500">رابط الترشيح</div>
                          <div className="text-blue-500 text-sm break-all">{customer.referralLink}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">توصية من قبل</div>
                          <div>{customer.referredBy}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">فصيل الدم</div>
                          <div>{customer.bloodType}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">اللغة المفضلة</div>
                          <div>{customer.preferredLanguage}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* تبويب سجل العميل */}
                <TabsContent value="history" className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-500" />
                      سجل نشاطات العميل
                    </h3>
                    <Button className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-full">
                      <Download className="ml-2 h-4 w-4" />
                      تصدير السجل
                    </Button>
                  </div>

                  {customer.activities && customer.activities.length > 0 ? (
                    <div className="space-y-4">
                      {customer.activities.map((activity) => (
                        <Card key={activity.id} className="bg-white shadow-sm rounded-xl border border-gray-100">
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                              <div className="flex items-center gap-3">
                                <div className="bg-blue-50 p-2 rounded-full">
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M3.9889 14.6604L2.46891 13.1404C1.84891 12.5204 1.84891 11.5004 2.46891 10.8804L3.9889 9.36039C4.2489 9.10039 4.4589 8.59038 4.4589 8.22038V6.08036C4.4589 5.20036 5.1789 4.48038 6.0589 4.48038H8.1989C8.5689 4.48038 9.0789 4.27041 9.3389 4.01041L10.8589 2.49039C11.4789 1.87039 12.4989 1.87039 13.1189 2.49039L14.6389 4.01041C14.8989 4.27041 15.4089 4.48038 15.7789 4.48038H17.9189C18.7989 4.48038 19.5189 5.20036 19.5189 6.08036V8.22038C19.5189 8.59038 19.7289 9.10039 19.9889 9.36039L21.5089 10.8804C22.1289 11.5004 22.1289 12.5204 21.5089 13.1404L19.9889 14.6604C19.7289 14.9204 19.5189 15.4304 19.5189 15.8004V17.9403C19.5189 18.8203 18.7989 19.5404 17.9189 19.5404H15.7789C15.4089 19.5404 14.8989 19.7504 14.6389 20.0104L13.1189 21.5304C12.4989 22.1504 11.4789 22.1504 10.8589 21.5304L9.3389 20.0104C9.0789 19.7504 8.5689 19.5404 8.1989 19.5404H6.0589C5.1789 19.5404 4.4589 18.8203 4.4589 17.9403V15.8004C4.4589 15.4204 4.2489 14.9204 3.9889 14.6604Z"
                                      stroke="#3B82F6"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M9 15L15 9"
                                      stroke="#3B82F6"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M14.4945 14.5H14.5035"
                                      stroke="#3B82F6"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M9.49451 9.5H9.50349"
                                      stroke="#3B82F6"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <div className="font-medium">{activity.title}</div>
                                  <div className="text-sm text-gray-500">
                                    {activity.date} - {activity.time}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">{activity.amount}</div>
                                <div className="text-sm text-green-500">{activity.points}</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-xl">
                      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-xl font-medium mb-2">لا توجد أنشطة</h3>
                      <p className="text-gray-500 mb-4">لم يقم هذا العميل بأي نشاط حتى الآن</p>
                      <Button className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-full">
                        <Plus className="ml-2 h-4 w-4" />
                        إضافة نشاط
                      </Button>
                    </div>
                  )}
                </TabsContent>

                {/* تبويب النقاط والمكافآت */}
                <TabsContent value="points" className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Gift className="h-5 w-5 text-blue-500" />
                      النقاط والمكافآت
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        variant="outline"
                        className="border-gray-200 hover:bg-gray-50 transition-colors rounded-full"
                      >
                        <Star className="ml-2 h-4 w-4" />
                        منح مكافأة
                      </Button>
                      <Button className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-full">
                        <Plus className="ml-2 h-4 w-4" />
                        إضافة نقاط
                      </Button>
                    </div>
                  </div>

                  <Card className="bg-white shadow-sm rounded-xl border border-gray-100 mb-6">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">التقدم نحو المستوى التالي</div>
                        <div className="text-sm text-gray-500">
                          {customer.points} / {customer.totalPointsForNextLevel} نقطة
                        </div>
                      </div>
                      <Progress
                        value={(Number.parseInt(customer.points) / customer.totalPointsForNextLevel) * 100}
                        className="h-2 mb-2"
                      />
                      <div className="text-sm text-gray-500">
                        متبقي {customer.pointsToNextLevel} نقطة للوصول إلى المستوى التالي
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Card className="bg-white shadow-sm rounded-xl border border-gray-100">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-50 p-3 rounded-full">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.5 13.75C9.5 14.72 10.25 15.5 11.17 15.5H13.05C13.85 15.5 14.5 14.82 14.5 13.97C14.5 13.06 14.1 12.73 13.51 12.52L10.5 11.47C9.91 11.26 9.51001 10.94 9.51001 10.02C9.51001 9.18 10.16 8.49001 10.96 8.49001H12.84C13.76 8.49001 14.51 9.27001 14.51 10.24"
                                stroke="#22C55E"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12 7.5V16.5"
                                stroke="#22C55E"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2"
                                stroke="#22C55E"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M17 3V7H21"
                                stroke="#22C55E"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M22 2L17 7"
                                stroke="#22C55E"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">إجمالي النقاط المكتسبة</div>
                            <div className="text-xl font-bold">450 نقطة</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white shadow-sm rounded-xl border border-gray-100">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-red-50 p-3 rounded-full">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.5 13.75C9.5 14.72 10.25 15.5 11.17 15.5H13.05C13.85 15.5 14.5 14.82 14.5 13.97C14.5 13.06 14.1 12.73 13.51 12.52L10.5 11.47C9.91 11.26 9.51001 10.94 9.51001 10.02C9.51001 9.18 10.16 8.49001 10.96 8.49001H12.84C13.76 8.49001 14.51 9.27001 14.51 10.24"
                                stroke="#EF4444"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12 7.5V16.5"
                                stroke="#EF4444"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2"
                                stroke="#EF4444"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M17 3V7H21"
                                stroke="#EF4444"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M22 2L17 7"
                                stroke="#EF4444"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">إجمالي النقاط المستخدمة</div>
                            <div className="text-xl font-bold">150 نقطة</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-white shadow-sm rounded-xl border border-gray-100">
                    <CardHeader>
                      <CardTitle className="text-lg">سجل النقاط</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <p className="text-gray-500">لا يوجد سجل للنقاط</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* البطاقات الإضافية في تبويب النبذة */}
          {activeTab === "info" && (
            <>
              <Card className="bg-white shadow-sm rounded-2xl border border-gray-100 mb-4 lg:mb-6">
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M2 9V7C2 4 4 2 7 2H17C20 2 22 4 22 7V9"
                        stroke="#3B82F6"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 15V17C2 20 4 22 7 22H17C20 22 22 20 22 17V15"
                        stroke="#3B82F6"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 12H22"
                        stroke="#3B82F6"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    الشرائح
                  </h3>
                  <div className="text-center py-8">
                    <p className="text-gray-500">لا يوجد شرائح</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm rounded-2xl border border-gray-100 mb-4 lg:mb-6">
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M17.5401 8.81C19.1801 8.81 20.5101 7.48 20.5101 5.84C20.5101 4.2 19.1801 2.87 17.5401 2.87"
                        stroke="#3B82F6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19.9399 12.93C20.4099 13.01 20.8599 13.15 21.2899 13.36C22.1299 13.78 22.1299 14.47 21.2899 14.89C19.6499 15.74 17.2899 15.74 15.6499 14.89C14.8099 14.47 14.8099 13.78 15.6499 13.36C16.0799 13.15 16.5399 13.01 16.9999 12.93"
                        stroke="#3B82F6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.45999 8.81C4.81999 8.81 3.48999 7.48 3.48999 5.84C3.48999 4.2 4.81999 2.87 6.45999 2.87"
                        stroke="#3B82F6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.06 12.93C3.59 13.01 3.14 13.15 2.71 13.36C1.87 13.78 1.87 14.47 2.71 14.89C4.35 15.74 6.71 15.74 8.35 14.89C9.19 14.47 9.19 13.78 8.35 13.36C7.92 13.15 7.46 13.01 7 12.93"
                        stroke="#3B82F6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 16.93C11.53 16.85 11.08 16.71 10.65 16.5C9.81 16.08 9.81 15.39 10.65 14.97C12.29 14.12 14.65 14.12 16.29 14.97C17.13 15.39 17.13 16.08 16.29 16.5C15.86 16.71 15.4 16.85 14.94 16.93"
                        stroke="#3B82F6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 21.97C11.53 21.89 11.08 21.75 10.65 21.54C9.81 21.12 9.81 20.43 10.65 20.01C12.29 19.16 14.65 19.16 16.29 20.01C17.13 20.43 17.13 21.12 16.29 21.54C15.86 21.75 15.4 21.89 14.94 21.97"
                        stroke="#3B82F6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    العلامات
                  </h3>
                  <div className="text-center py-8">
                    <p className="text-gray-500">players.h1_no_tags</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm rounded-2xl border border-gray-100 mb-4 lg:mb-6">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10.75 2.44995C11.44 1.85995 12.57 1.85995 13.27 2.44995L14.85 3.81005C15.15 4.07005 15.71 4.28005 16.11 4.28005H17.81C18.87 4.28005 19.74 5.14995 19.74 6.20995V7.91005C19.74 8.30005 19.95 8.87005 20.21 9.17005L21.57 10.75C22.16 11.44 22.16 12.57 21.57 13.27L20.21 14.85C19.95 15.15 19.74 15.71 19.74 16.11V17.8101C19.74 18.8701 18.87 19.7401 17.81 19.7401H16.11C15.72 19.7401 15.15 19.9501 14.85 20.2101L13.27 21.5701C12.58 22.1601 11.45 22.1601 10.75 21.5701L9.17 20.2101C8.87 19.9501 8.31 19.7401 7.91 19.7401H6.18C5.12 19.7401 4.25 18.8701 4.25 17.8101V16.1001C4.25 15.7101 4.04 15.1501 3.79 14.8501L2.44 13.2601C1.86 12.5701 1.86 11.4501 2.44 10.7601L3.79 9.17005C4.04 8.87005 4.25 8.31005 4.25 7.92005V6.20995C4.25 5.14995 5.12 4.28005 6.18 4.28005H7.91C8.3 4.28005 8.87 4.07005 9.17 3.81005L10.75 2.44995Z"
                          stroke="#3B82F6"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                          stroke="#3B82F6"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      سجل حملات المكافآت
                    </h3>
                    <Button variant="outline" className="rounded-full">
                      <Plus className="ml-2 h-4 w-4" />
                      إضافة
                    </Button>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="bg-white p-2 rounded-lg">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                            stroke="#1E293B"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 12L11 14L15 10"
                            stroke="#1E293B"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">درس/زيارة</div>
                        <div className="text-sm text-gray-500">x1</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm rounded-2xl border border-gray-100 mb-4 lg:mb-6">
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M2 8.5H14.5"
                        stroke="#3B82F6"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 16.5H8"
                        stroke="#3B82F6"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.5 16.5H14.5"
                        stroke="#3B82F6"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 14.03V16.11C22 19.62 21.11 20.5 17.56 20.5H6.44C2.89 20.5 2 19.62 2 16.11V7.89C2 4.38 2.89 3.5 6.44 3.5H14.5"
                        stroke="#3B82F6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20 3.5V9.5L22 7.5"
                        stroke="#3B82F6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20 9.5L18 7.5"
                        stroke="#3B82F6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    شرائح حسب التكلفة المستهدفة
                  </h3>
                  <div className="text-center py-8">
                    <p className="text-gray-500">لا يوجد شرائح RFM</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm rounded-2xl border border-gray-100">
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M18 7.16C17.94 7.15 17.87 7.15 17.81 7.16C16.43 7.11 15.33 5.98 15.33 4.58C15.33 3.15 16.48 2 17.91 2C19.34 2 20.49 3.16 20.49 4.58C20.48 5.98 19.38 7.11 18 7.16Z"
                        stroke="#3B82F6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.9699 14.44C18.3399 14.67 19.8499 14.43 20.9099 13.72C22.3199 12.78 22.3199 11.24 20.9099 10.3C19.8399 9.59004 18.3099 9.35003 16.9399 9.59003"
                        stroke="#3B82F6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.96998 7.16C6.02998 7.15 6.09998 7.15 6.15998 7.16C7.53998 7.11 8.63998 5.98 8.63998 4.58C8.63998 3.15 7.48998 2 6.05998 2C4.62998 2 3.47998 3.16 3.47998 4.58C3.48998 5.98 4.58998 7.11 5.96998 7.16Z"
                        stroke="#3B82F6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.99994 14.44C5.62994 14.67 4.11994 14.43 3.05994 13.72C1.64994 12.78 1.64994 11.24 3.05994 10.3C4.12994 9.59004 5.65994 9.35003 7.02994 9.59003"
                        stroke="#3B82F6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 14.63C11.94 14.62 11.87 14.62 11.81 14.63C10.43 14.58 9.32996 13.45 9.32996 12.05C9.32996 10.62 10.48 9.47 11.91 9.47C13.34 9.47 14.49 10.63 14.49 12.05C14.48 13.45 13.38 14.59 12 14.63Z"
                        stroke="#3B82F6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.08997 17.78C7.67997 18.72 7.67997 20.26 9.08997 21.2C10.69 22.27 13.31 22.27 14.91 21.2C16.32 20.26 16.32 18.72 14.91 17.78C13.32 16.72 10.69 16.72 9.08997 17.78Z"
                        stroke="#3B82F6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    محفظة العائلة
                  </h3>
                  <div className="text-center py-8">
                    <p className="text-gray-500">لا يوجد محفظة عائلة</p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* بطاقة معلومات الاتصال */}
        <div className="lg:col-span-1">
          <Card className="bg-white shadow-sm rounded-2xl border border-gray-100 mb-6 sticky top-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">معلومات الاتصال</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  <Phone className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">رقم الهاتف</div>
                  <div>{customer.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  <Mail className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">البريد الإلكتروني</div>
                  <div>{customer.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  <MapPin className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">الدولة</div>
                  <div>{customer.country}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
