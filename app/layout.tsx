import type React from "react"
import type { Metadata } from "next"
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

export const metadata: Metadata = {
  title: "BOND.IT",
  description: "نظام الولاء الأمثل للمتاجر الإلكترونية",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} antialiased bg-gray-50`}>
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
