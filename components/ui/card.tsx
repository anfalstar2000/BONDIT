import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div className={cn("rounded-3xl border border-gray-200 bg-white", className)} ref={ref} {...props} />
  ),
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div className={cn("flex flex-col space-y-1.5 p-5", className)} ref={ref} {...props} />
  ),
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<React.ElementRef<"p">, React.ComponentPropsWithoutRef<"p">>(
  ({ className, ...props }, ref) => (
    <p className={cn("text-base font-medium text-gray-700", className)} ref={ref} {...props} />
  ),
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<React.ElementRef<"p">, React.ComponentPropsWithoutRef<"p">>(
  ({ className, ...props }, ref) => <p className={cn("text-sm text-gray-500", className)} ref={ref} {...props} />,
)
CardDescription.displayName = "CardDescription"

// تم حذف مكون CardContent

const CardFooter = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div className={cn("flex items-center p-5 pt-0", className)} ref={ref} {...props} />
  ),
)
CardFooter.displayName = "CardFooter"

// إضافة بديل لـ CardContent لتجنب أخطاء الاستيراد
const CardContent = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={className} {...props}>
    {children}
  </div>
)
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
