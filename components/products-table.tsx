"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, Edit, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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

export function ProductsTable() {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  return (
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
  )
}
