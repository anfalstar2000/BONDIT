"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Paintbrush } from "lucide-react"

interface ColorPickerProps {
  defaultValue?: string
  onChange?: (color: string) => void
}

export function ColorPicker({ defaultValue = "#000000", onChange }: ColorPickerProps) {
  const [color, setColor] = useState(defaultValue)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleChange = (newColor: string) => {
    setColor(newColor)
    onChange?.(newColor)
  }

  if (!isClient) {
    return <div className="h-10 flex items-center">جاري التحميل...</div>
  }

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <div
            className="h-10 w-10 rounded-md border cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all flex items-center justify-center"
            style={{ backgroundColor: color }}
          >
            <Paintbrush className="h-4 w-4 text-white drop-shadow-sm" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3">
          <div className="grid gap-2">
            <div className="grid grid-cols-5 gap-1">
              {[
                "#f44336",
                "#e91e63",
                "#9c27b0",
                "#673ab7",
                "#3f51b5",
                "#2196f3",
                "#03a9f4",
                "#00bcd4",
                "#009688",
                "#4caf50",
                "#8bc34a",
                "#cddc39",
                "#ffeb3b",
                "#ffc107",
                "#ff9800",
              ].map((presetColor) => (
                <div
                  key={presetColor}
                  className="h-6 w-6 rounded-md cursor-pointer hover:scale-110 transition-transform"
                  style={{ backgroundColor: presetColor }}
                  onClick={() => handleChange(presetColor)}
                />
              ))}
            </div>
            <Input
              type="color"
              value={color}
              onChange={(e) => handleChange(e.target.value)}
              className="w-full h-10 p-1 cursor-pointer"
            />
          </div>
        </PopoverContent>
      </Popover>
      <Input
        type="text"
        value={color}
        onChange={(e) => handleChange(e.target.value)}
        className="w-32 focus:ring-2 focus:ring-blue-500 transition-all"
      />
    </div>
  )
}
