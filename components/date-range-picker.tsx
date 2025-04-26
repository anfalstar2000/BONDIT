"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { format } from "date-fns"
import { ar } from "date-fns/locale"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function DatePickerWithRange({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2025, 6, 28),
    to: new Date(2025, 6, 28),
  })
  const [open, setOpen] = React.useState(false)

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[240px] justify-between text-right font-normal border border-gray-200 rounded-full hover:bg-gray-50 transition-colors",
              !date && "text-muted-foreground",
              open && "ring-2 ring-blue-500 ring-opacity-50",
            )}
          >
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "yyyy يوليو dd", { locale: ar })} -{" "}
                  {format(date.to, "yyyy يوليو dd", { locale: ar })}
                </>
              ) : (
                format(date.from, "yyyy يوليو dd", { locale: ar })
              )
            ) : (
              <span>اختر تاريخ</span>
            )}
            <ChevronDown className={`h-4 w-4 opacity-50 transition-transform ${open ? "rotate-180" : ""}`} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={ar}
            className="rounded-md border"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
