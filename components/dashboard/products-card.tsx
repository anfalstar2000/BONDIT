"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Edit, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface ProductsCardProps {
  title: string
  icon: string
  iconAlt?: string
  className?: string
}

const products = [
  {
    id: "1",
    name: "سماعات بلوتوث لاسلكية",
    sales: 1250,
    stock: 45,
  },
  {
    id: "2",
    name: "حقيبة ظهر للكمبيوتر المحمول",
    sales: 980,
    stock: 32,
  },
  {
    id: "3",
    name: "ساعة ذكية متعددة الوظائف",
    sales: 1120,
    stock: 28,
  },
]

export function ProductsCard({ title, icon, iconAlt = "icon", className }: ProductsCardProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)
  const router = useRouter()

  return (
    <Card
      className={cn(
        "bg-white shadow-sm rounded-3xl border border-gray-100 hover:shadow-md transition-shadow",
        className,
      )}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <Image src={icon || "/placeholder.svg"} alt={iconAlt} width={20} height={20} className="text-[#C4C4C4]" />
            <h2 className="text-lg font-medium">{title}</h2>
          </div>
          <Button
            variant="ghost"
            className="text-blue-500 hover:bg-blue-50 transition-colors"
            onClick={() => router.push("/products")}
          >
            المزيد
          </Button>
        </div>
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-right font-medium">اسم المنتج</TableHead>
                <TableHead className="text-center font-medium">المبيعات</TableHead>
                <TableHead className="text-center font-medium">المخزون</TableHead>
                <TableHead className="text-center font-medium">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors"
                  onMouseEnter={() => setHoveredRow(product.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-center text-blue-500 font-medium">{product.sales}</TableCell>
                  <TableCell className="text-center">{product.stock}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                            <Eye className="h-4 w-4" />
                            <span>عرض</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                            <Edit className="h-4 w-4" />
                            <span>تعديل</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
