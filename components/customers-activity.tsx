"use client"

import { useState } from "react"
import { Calendar, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"

const activities = [
  {
    id: "1",
    title: "عميل جديد قام بالتسجيل",
    date: "اليوم، 10:30 ص",
    icon: User,
    color: "bg-green-100 text-green-600",
  },
  {
    id: "2",
    title: "تحديث نظام النقاط",
    date: "غداً، 2:00 م",
    icon: Calendar,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "3",
    title: "إطلاق حملة تسويقية جديدة",
    date: "بعد غد، 11:00 ص",
    icon: Clock,
    color: "bg-purple-100 text-purple-600",
  },
]

export function CustomersActivity() {
  const [hoveredActivity, setHoveredActivity] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className={`flex items-center justify-between p-3 border rounded-md transition-all ${
            hoveredActivity === activity.id ? "border-blue-200 shadow-sm" : ""
          }`}
          onMouseEnter={() => setHoveredActivity(activity.id)}
          onMouseLeave={() => setHoveredActivity(null)}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${activity.color}`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div>
              <div className="font-medium">{activity.title}</div>
              <div className="text-sm text-gray-500">{activity.date}</div>
            </div>
          </div>
          {hoveredActivity === activity.id && (
            <Button variant="ghost" size="sm" className="text-blue-500 hover:bg-blue-50 transition-colors">
              عرض
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}
