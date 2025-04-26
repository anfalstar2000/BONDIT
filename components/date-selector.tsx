"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function DateSelector() {
  return (
    <Button
      variant="outline"
      className="w-[240px] justify-between text-left font-normal border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
    >
      <ChevronDown className="h-4 w-4 opacity-50" />
      <span>2025 يوليو 28 - 2025 يوليو 28</span>
    </Button>
  )
}
