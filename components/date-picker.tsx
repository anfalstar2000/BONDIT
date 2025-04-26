"use client"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { ar } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps {
  date: Date | null
  setDate: (date: Date | null) => void
}

export function DatePicker({ date, setDate }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-full justify-between font-normal rounded-[8px]", !date && "text-muted-foreground")}
        >
          {date ? format(date, "yyyy/MM/dd", { locale: ar }) : "اختر تاريخ"}
          <CalendarIcon className="h-4 w-4 opacity-50 mr-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="single"
          selected={date || undefined}
          onSelect={setDate}
          initialFocus
          locale={ar}
          dir="rtl"
          className="rtl"
        />
      </PopoverContent>
    </Popover>
  )
}
