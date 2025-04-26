"use client"

import { useEffect, useState } from "react"
import type React from "react"
import { Cairo } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { Toaster } from "@/components/ui/toaster"

const cairo = Cairo({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-cairo",
})

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <html lang="ar" dir="rtl">
        <body className={`${cairo.className} antialiased bg-[#f9f9f9]`}>
          <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
              <div className="inline-block w-16 h-16 text-4xl font-bold text-white bg-blue-500 rounded-md flex items-center justify-center mb-4">
                B
              </div>
              <h1 className="text-2xl font-bold">جاري تحميل BOND.IT</h1>
            </div>
          </div>
        </body>
      </html>
    )
  }

  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} antialiased bg-[#f9f9f9]`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex min-h-screen">
            <main className="flex-1 pr-[70px]">{children}</main>
            <Sidebar />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
