"use client"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

// تعريف عناصر القائمة
const menuItems = [
  {
    name: "لوحة التحكم",
    path: "/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="7" height="7" rx="2.5" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
        <rect x="4" y="14" width="7" height="7" rx="2.5" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
        <rect x="14" y="4" width="7" height="7" rx="2.5" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="2.5" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "النقاط والمكافآت",
    path: "/points-rewards",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M19.5 6H4.5C3.67157 6 3 6.67157 3 7.5V9.5C3 10.3284 3.67157 11 4.5 11H7.5H16.5H19.5C20.3284 11 21 10.3284 21 9.5V7.5C21 6.67157 20.3284 6 19.5 6Z"
          fill="currentColor"
        />
        <path
          d="M12 4.5C12 3.11929 13.1193 2 14.5 2H15C16.1046 2 17 2.89543 17 4V4C17 5.10457 16.1046 6 15 6H12V4.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M12 4.5C12 3.11929 10.8807 2 9.5 2H9C7.89543 2 7 2.89543 7 4V4C7 5.10457 7.89543 6 9 6H12V4.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 12.5V18C4 20.2091 5.79086 22 8 22H11.2L11.2 12.5H4ZM12.7 12.5L12.7 22H16C18.2091 22 20 20.2091 20 18V12.5H12.7Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "الشارات والمستويات",
    path: "/badges-levels",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4 3.5C4 2.67157 4.67157 2 5.5 2H10.5C11.3284 2 12 2.67157 12 3.5V11.5C12 12.3284 11.3284 13 10.5 13H4V3.5Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M11 4H18.0362C18.8535 4 19.3257 4.9272 18.845 5.58817L16.8555 8.32366C16.3455 9.02496 16.3455 9.97504 16.8555 10.6763L18.845 13.4118C19.3257 14.0728 18.8535 15 18.0362 15H12C11.4477 15 11 14.5523 11 14V4Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M4 22L4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "التحديات",
    path: "/challenges",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.7524 3.17228C13.7502 3.09606 13.6671 3.04643 13.6016 3.08553C10.1363 5.1558 10.2004 10.3491 10.2418 11.2901C10.2449 11.3611 10.1778 11.4112 10.1135 11.3809C9.71316 11.1924 8.5661 10.4823 8.50273 8.51535C8.50028 8.43902 8.41792 8.38995 8.35223 8.42888C6.34578 9.61807 5 11.8144 5 14.25C5 17.978 8.134 21 12 21C15.866 21 19 17.978 19 14.25C19 8.83416 13.8803 7.66943 13.7524 3.17228Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    name: "برنامج الإحالة",
    path: "/referral",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="17.5" cy="4.5" r="2.5" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="5.5" cy="11.5" r="2.5" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15 6L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M7.5 13.5L15 18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="17.5" cy="19.5" r="2.5" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "البطاقة الرقمية",
    path: "/digital-card",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.25534 8.75C1.38623 5.69035 3.90813 3.25 7 3.25H17C20.0919 3.25 22.6138 5.69035 22.7447 8.75H1.25534Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.75 10.25V15C22.75 18.1756 20.1756 20.75 17 20.75H7C3.82436 20.75 1.25 18.1756 1.25 15V10.25H22.75ZM6 14.75C5.58579 14.75 5.25 15.0858 5.25 15.5C5.25 15.9142 5.58579 16.25 6 16.25H11C11.4142 16.25 11.75 15.9142 11.75 15.5C11.75 15.0858 11.4142 14.75 11 14.75H6Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "الرسائل التسويقية",
    path: "/marketing",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7 2.25C3.82436 2.25 1.25 4.82436 1.25 8V20.9194C1.25 22.3868 2.94738 23.2026 4.09322 22.2859L6.92069 20.0239C7.14233 19.8466 7.41772 19.75 7.70156 19.75H17C20.1756 19.75 22.75 17.1756 22.75 14V8C22.75 4.82436 20.1756 2.25 17 2.25H7ZM7.0498 12.2998C7.74016 12.2998 8.2998 11.7402 8.2998 11.0498C8.2998 10.3594 7.74016 9.7998 7.0498 9.7998C6.35945 9.7998 5.7998 10.3594 5.7998 11.0498C5.7998 11.7402 6.35945 12.2998 7.0498 12.2998ZM13.2998 11.0498C13.2998 11.7402 12.7402 12.2998 12.0498 12.2998C11.3594 12.2998 10.7998 11.7402 10.7998 11.0498C10.7998 10.3594 11.3594 9.7998 12.0498 9.7998C12.7402 9.7998 13.2998 10.3594 13.2998 11.0498ZM17.0498 12.2998C17.7402 12.2998 18.2998 11.7402 18.2998 11.0498C18.2998 10.3594 17.7402 9.7998 17.0498 9.7998C16.3594 9.7998 15.7998 10.3594 15.7998 11.0498C15.7998 11.7402 16.3594 12.2998 17.0498 12.2998Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "المساعد الذكي",
    path: "/ai-assistant",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 21.5c-.9.3-1.5 1.1-1.5 2.1v.3h11.3v-2.8c-1.4-.1-2.8-.6-3.9-1.4L1.5 21.5z" fill="currentColor" />
        <path d="M22.5 21.5l-5.9-1.9c-1.1.8-2.4 1.3-3.9 1.4v2.8H24v-.3c0-1-.6-1.8-1.5-2.1z" fill="currentColor" />
        <path
          d="M4.1 11.6v-1.5c0-4.3 3.5-7.9 7.9-7.9s7.9 3.5 7.9 7.9v1.5c.6-.5 1.1-1 1.6-1.7.6-1 1-2.2 1-3.4 0-3.6-2.9-6.5-6.5-6.5h-7.9c-3.6 0-6.5 2.9-6.5 6.5 0 1.2.3 2.4 1 3.4.4.7 1 1.2 1.5 1.7z"
          fill="currentColor"
        />
        <path
          d="M12 3.7c-2.3 0-4.3 1.2-5.4 2.9.5.4 1.3 1 2.5 1.5 3.1 1.3 6.6 1.1 9.2.6-.6-2.9-3.2-5-6.3-5z"
          fill="currentColor"
        />
        <path
          d="M18.5 13.3v-3.1c-1.4.2-2.8.4-4 .4-.6 0-1.1 0-1.6-.1-1.6-.1-3.1-.5-4.4-1-1.2-.5-2-1.1-2.5-1.5-.3.7-.4 1.4-.4 2.2v3.2c0 1.2.3 2.3.9 3.3h7.2v1.4h-6.1c1.2 1.1 2.7 1.8 4.5 1.8 3.6 0 6.4-2.9 6.4-6.5z"
          fill="currentColor"
        />
        <path d="M6.4 16.6H4.1v-3.7H2.7v5.1h4.8c-.4-.4-.8-.9-1.1-1.4z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "التكاملات",
    path: "/integrations",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16.4142 13.728L18.5355 11.6067C20.4882 9.65407 20.4882 6.48825 18.5355 4.53563V4.53563C16.5829 2.583 13.4171 2.583 11.4645 4.53563L9.34315 6.65695M13.5858 16.5564L11.4645 18.6778C9.51184 20.6304 6.34602 20.6304 4.3934 18.6778V18.6778C2.44078 16.7251 2.44078 13.5593 4.3934 11.6067L6.51472 9.48537"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M13.5858 9.48537L9.34314 13.728"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "العملاء",
    path: "/customers",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.307 18.9194C20.3614 18.9266 20.4159 18.934 20.4703 18.9417L20.7438 18.9801C21.9346 19.1472 23 18.2395 23 17.0579V16.1562C23 15.3111 22.4592 14.5573 21.649 14.2731C20.7129 13.9447 19.7466 13.7309 18.7711 13.6316C19.789 14.3675 20.4203 15.5592 20.4203 16.8594V17.979C20.4203 18.3041 20.3809 18.619 20.307 18.9194ZM16.1811 12.432C16.5868 12.5995 17.0324 12.692 17.5 12.692C19.3813 12.692 20.9064 11.1939 20.9064 9.34597C20.9064 7.49801 19.3813 5.99994 17.5 5.99994C17.4443 5.99994 17.3889 6.00125 17.3338 6.00385C17.6759 6.73246 17.8671 7.546 17.8671 8.40419C17.8671 9.9807 17.2219 11.4065 16.1811 12.432Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.07387 18.9194C4.01942 18.9266 3.96499 18.934 3.91058 18.9417L3.63707 18.9801C2.44625 19.1472 1.38084 18.2395 1.38084 17.0579V16.1562C1.38084 15.3111 1.92166 14.5573 2.73185 14.2731C3.66791 13.9447 4.63427 13.7309 5.60979 13.6316C4.59191 14.3675 3.96057 15.5592 3.96057 16.8594V17.979C3.96057 18.3041 3.99992 18.619 4.07387 18.9194ZM8.19971 12.432C7.79406 12.5995 7.34845 12.692 6.88084 12.692C4.99952 12.692 3.47442 11.1939 3.47442 9.34597C3.47442 7.49801 4.99952 5.99994 6.88084 5.99994C6.93657 5.99994 6.992 6.00125 7.04707 6.00385C6.70496 6.73246 6.51377 7.546 6.51377 8.40419C6.51377 9.9807 7.15896 11.4065 8.19971 12.432Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.3671 8.40419C16.3671 6.10986 14.5071 4.24994 12.2128 4.24994C9.91848 4.24994 8.05856 6.10986 8.05856 8.40419C8.05856 10.6985 9.91848 12.5584 12.2128 12.5584C14.5071 12.5584 16.3671 10.6985 16.3671 8.40419Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.15298 14.5214C10.425 13.3528 14.0006 13.3528 17.2727 14.5214C18.2607 14.8743 18.9203 15.8102 18.9203 16.8594V17.979C18.9203 19.4459 17.621 20.5728 16.1687 20.3654L15.8351 20.3177C13.4325 19.9745 10.9932 19.9745 8.59049 20.3177L8.25693 20.3654C6.80468 20.5728 5.50537 19.4459 5.50537 17.979V16.8594C5.50537 15.8102 6.16492 14.8743 7.15298 14.5214Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "Bond It Flow",
    path: "/flow",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14 7L17 10M17 10L14 13M17 10H3M10 17L7 20M7 20L10 23M7 20H21"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "الإعدادات",
    path: "/settings",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.35526 1.57796C10.2021 1.36366 11.0884 1.25 12.0001 1.25C12.9118 1.25 13.7981 1.36368 14.645 1.578C15.3362 1.75292 15.6931 2.34983 15.8079 2.84603C15.9439 3.43381 16.3128 3.96329 16.8752 4.28798C17.3922 4.5865 17.9768 4.65663 18.5159 4.52952C19.0115 4.41269 19.7033 4.46835 20.1663 5.00871C21.0272 6.01337 21.7063 7.17937 22.1519 8.45569C22.4179 9.21767 22.0057 9.90381 21.5705 10.2624C21.0682 10.6762 20.75 11.3006 20.75 12C20.75 12.6994 21.0682 13.3238 21.5705 13.7376C22.0057 14.0962 22.4179 14.7823 22.1519 15.5443C21.7063 16.8205 21.0273 17.9864 20.1666 18.991C19.7036 19.5314 19.0116 19.587 18.5161 19.4702C17.9769 19.343 17.3922 19.4131 16.8751 19.7117C16.3127 20.0364 15.9438 20.566 15.8078 21.1538C15.693 21.6501 15.3361 22.2471 14.6449 22.422C13.798 22.6363 12.9118 22.75 12.0001 22.75C11.0884 22.75 10.2022 22.6363 9.35534 22.4221C8.66407 22.2471 8.30716 21.6501 8.19238 21.1538C8.05642 20.566 7.68754 20.0364 7.12509 19.7117C6.60798 19.4131 6.02332 19.343 5.48411 19.4702C4.98854 19.5871 4.29657 19.5314 3.83351 18.991C2.97278 17.9864 2.29379 16.8205 1.84827 15.5443C1.58225 14.7823 1.99441 14.0962 2.42958 13.7376C2.93189 13.3238 3.25009 12.6994 3.25009 12C3.25009 11.3006 2.93189 10.6762 2.42958 10.2623C1.99441 9.9038 1.58225 9.21766 1.84827 8.45567C2.29384 7.17934 2.97293 6.01334 3.8338 5.00867C4.29683 4.4683 4.98872 4.41265 5.48425 4.5295C6.02342 4.65664 6.60802 4.58651 7.1251 4.28798C7.68748 3.96329 8.05634 3.43379 8.19234 2.84601C8.30715 2.3498 8.66406 1.75286 9.35526 1.57796ZM12 15C10.3432 15 9.00003 13.6569 9.00003 12C9.00003 10.3431 10.3432 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
]

export function Sidebar() {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div className="fixed top-0 right-0 z-40 h-screen bg-white shadow-sm flex flex-col items-center py-4 px-2 w-[70px] border-l border-[#F1F1F1]">
        <div className="mb-4">
          <div className="w-10 h-10 flex items-center justify-center">
            <Image src="/icons/logo.svg" alt="BOND.IT" width={28} height={24} />
          </div>
        </div>

        <div className="flex flex-col gap-1 items-center flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.path

            return (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.path}
                    className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors ${
                      isActive ? "bg-blue-50 text-blue-500" : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
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
      </div>
    </TooltipProvider>
  )
}
