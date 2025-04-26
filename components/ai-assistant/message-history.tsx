"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Eye, Search, ArrowUpDown } from "lucide-react"

type Message = {
  id: string
  title: string
  content: string
  channel: "email" | "sms" | "push" | "whatsapp"
  status: "scheduled" | "sent" | "failed"
  date: string
  audience: string
  stats: {
    delivered: number
    opened: number
    clicked: number
  }
}

const mockMessages: Message[] = [
  {
    id: "1",
    title: "عرض خاص للعملاء الجدد",
    content: "استمتع بخصم 20% على أول طلب لك. استخدم الكود: WELCOME20",
    channel: "email",
    status: "sent",
    date: "2023-04-15",
    audience: "new",
    stats: {
      delivered: 120,
      opened: 85,
      clicked: 42,
    },
  },
  {
    id: "2",
    title: "تذكير بسلة التسوق",
    content: "لديك منتجات في سلة التسوق. أكمل عملية الشراء الآن!",
    channel: "sms",
    status: "sent",
    date: "2023-04-18",
    audience: "all",
    stats: {
      delivered: 75,
      opened: 70,
      clicked: 35,
    },
  },
  {
    id: "3",
    title: "إطلاق منتج جديد",
    content: "نحن متحمسون للإعلان عن إطلاق منتجنا الجديد! اكتشفه الآن.",
    channel: "email",
    status: "scheduled",
    date: "2023-05-01",
    audience: "all",
    stats: {
      delivered: 0,
      opened: 0,
      clicked: 0,
    },
  },
  {
    id: "4",
    title: "استطلاع رضا العملاء",
    content: "نود أن نسمع رأيك! يرجى إكمال استطلاع الرضا الخاص بنا.",
    channel: "email",
    status: "failed",
    date: "2023-04-20",
    audience: "active",
    stats: {
      delivered: 0,
      opened: 0,
      clicked: 0,
    },
  },
]

export function MessageHistory() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [channelFilter, setChannelFilter] = useState<string>("all")
  const [sortField, setSortField] = useState<keyof Message>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (field: keyof Message) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const filteredMessages = messages
    .filter((message) => {
      const matchesSearch =
        message.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.content.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || message.status === statusFilter
      const matchesChannel = channelFilter === "all" || message.channel === channelFilter
      return matchesSearch && matchesStatus && matchesChannel
    })
    .sort((a, b) => {
      if (sortField === "date") {
        return sortDirection === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      } else {
        const aValue = a[sortField]
        const bValue = b[sortField]
        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
        }
        return 0
      }
    })

  const getChannelLabel = (channel: string) => {
    switch (channel) {
      case "email":
        return "البريد الإلكتروني"
      case "sms":
        return "الرسائل النصية"
      case "push":
        return "إشعارات الدفع"
      case "whatsapp":
        return "واتساب"
      default:
        return channel
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge className="bg-green-500">تم الإرسال</Badge>
      case "scheduled":
        return <Badge className="bg-blue-500">مجدول</Badge>
      case "failed":
        return <Badge className="bg-red-500">فشل</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>سجل الرسائل</CardTitle>
          <CardDescription>عرض وتحليل الرسائل المرسلة والمجدولة</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="بحث في الرسائل..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-3 pr-10"
                  dir="rtl"
                />
              </div>
              <div className="flex gap-4">
                <div className="w-40">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الحالات</SelectItem>
                      <SelectItem value="sent">تم الإرسال</SelectItem>
                      <SelectItem value="scheduled">مجدول</SelectItem>
                      <SelectItem value="failed">فشل</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-40">
                  <Select value={channelFilter} onValueChange={setChannelFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="القناة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع القنوات</SelectItem>
                      <SelectItem value="email">البريد الإلكتروني</SelectItem>
                      <SelectItem value="sms">الرسائل النصية</SelectItem>
                      <SelectItem value="push">إشعارات الدفع</SelectItem>
                      <SelectItem value="whatsapp">واتساب</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="rounded-md border overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("title")}
                    >
                      <div className="flex items-center justify-end">
                        <span>العنوان</span>
                        {sortField === "title" && <ArrowUpDown className="ml-1 h-4 w-4" />}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("channel")}
                    >
                      <div className="flex items-center justify-end">
                        <span>القناة</span>
                        {sortField === "channel" && <ArrowUpDown className="ml-1 h-4 w-4" />}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("status")}
                    >
                      <div className="flex items-center justify-end">
                        <span>الحالة</span>
                        {sortField === "status" && <ArrowUpDown className="ml-1 h-4 w-4" />}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("date")}
                    >
                      <div className="flex items-center justify-end">
                        <span>التاريخ</span>
                        {sortField === "date" && <ArrowUpDown className="ml-1 h-4 w-4" />}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      الإحصائيات
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMessages.map((message) => (
                    <tr key={message.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-medium text-gray-900">{message.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{message.content}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                        {getChannelLabel(message.channel)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">{getStatusBadge(message.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                        {new Date(message.date).toLocaleDateString("ar-SA")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                        {message.status === "sent" ? (
                          <div className="flex flex-col">
                            <span>تم التسليم: {message.stats.delivered}</span>
                            <span>تم الفتح: {message.stats.opened}</span>
                            <span>تم النقر: {message.stats.clicked}</span>
                          </div>
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 ml-1" />
                          عرض
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
