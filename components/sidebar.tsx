"use client"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import {
  LayoutGrid,
  Gift,
  Award,
  Target,
  Users,
  CreditCard,
  MessageSquare,
  Bot,
  Link as LinkIcon,
  UserRound,
  ArrowLeftRight,
  Settings,
  BadgePlus
} from "lucide-react"

// Define sidebar menu items
const menuItems = [
  {
    name: "لوحة التحكم",
    path: "/",
    icon: <LayoutGrid size={20} />,
  },
  {
    name: "النقاط والمكافآت",
    path: "/points-rewards",
    icon: <Gift size={20} />,
  },
  {
    name: "الشارات والمستويات",
    path: "/badges-levels",
    icon: <Award size={20} />,
  },
  {
    name: "التحديات",
    path: "/challenges",
    icon: <Target size={20} />,
  },
  {
    name: "برنامج الإحالة",
    path: "/referral",
    icon: <BadgePlus size={20} />,
  },
  {
    name: "البطاقة الرقمية",
    path: "/digital-card",
    icon: <CreditCard size={20} />,
  },
  {
    name: "الرسائل التسويقية",
    path: "/marketing",
    icon: <MessageSquare size={20} />,
  },
  {
    name: "المساعد الذكي",
    path: "/ai-assistant",
    icon: <Bot size={20} />,
  },
  {
    name: "التكاملات",
    path: "/integrations",
    icon: <LinkIcon size={20} />,
  },
  {
    name: "العملاء",
    path: "/customers",
    icon: <Users size={20} />,
  },
  {
    name: "Bond It Flow",
    path: "/flow",
    icon: <ArrowLeftRight size={20} />,
  },
  {
    name: "الإعدادات",
    path: "/settings",
    icon: <Settings size={20} />,
  },
]

export function Sidebar() {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <TooltipProvider>
      <div className="fixed right-0 top-0 h-full w-[70px] bg-white shadow-sm z-50 flex flex-col items-center py-6">
        <div className="mb-8">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-blue-500 text-xl font-bold text-white">
            B.
          </div>
        </div>
        
        <div className="flex flex-col items-center space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.path
            return (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.path}
                    className={`flex h-10 w-10 items-center justify-center rounded-md ${
                      isActive
                        ? "bg-blue-100 text-blue-500"
                        : "text-gray-400 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>

        <div className="mt-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="flex h-10 w-10 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100">
                <UserRound size={20} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>الملف الشخصي</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}
