"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WalletIcon as AppleWallet, CreditCard, QrCode, Check, Smartphone } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DigitalCardPreview() {
  const [cardType, setCardType] = useState<"apple" | "google">("apple")
  const [isClient, setIsClient] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [openQRDialog, setOpenQRDialog] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleAddToWallet = () => {
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  if (!isClient) {
    return <div className="h-[400px] flex items-center justify-center">جاري تحميل البطاقة...</div>
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col items-center space-y-6">
        <Tabs defaultValue="apple" value={cardType} onValueChange={(value) => setCardType(value as "apple" | "google")}>
          <TabsList className="bg-gray-100">
            <TabsTrigger
              value="apple"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-colors"
            >
              Apple Wallet
            </TabsTrigger>
            <TabsTrigger
              value="google"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-colors"
            >
              Google Pay
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="w-full max-w-md mx-auto">
          <Card
            className={`w-full aspect-[1.586/1] relative overflow-hidden transform transition-all duration-500 hover:shadow-lg ${
              cardType === "apple"
                ? "bg-gradient-to-br from-gray-800 to-gray-900"
                : "bg-gradient-to-br from-blue-500 to-blue-700"
            }`}
          >
            <CardContent className="flex flex-col h-full p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">BOND.IT</h3>
                  <p className="text-sm opacity-80">برنامج الولاء</p>
                </div>
                {cardType === "apple" ? <AppleWallet className="h-8 w-8" /> : <CreditCard className="h-8 w-8" />}
              </div>

              <div className="flex-1 flex flex-col justify-center items-center">
                <Dialog open={openQRDialog} onOpenChange={setOpenQRDialog}>
                  <DialogTrigger asChild>
                    <button className="group relative">
                      <QrCode className="h-24 w-24 mb-4 cursor-pointer hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-md transition-all flex items-center justify-center">
                        <Smartphone className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>مسح رمز QR</DialogTitle>
                      <DialogDescription>
                        قم بمسح رمز QR باستخدام كاميرا هاتفك لإضافة البطاقة الرقمية.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center py-6">
                      <QrCode className="h-48 w-48" />
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={() => setOpenQRDialog(false)}
                        className="bg-blue-500 hover:bg-blue-600 transition-colors"
                      >
                        إغلاق
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <p className="text-sm opacity-80">امسح الرمز لاستخدام البطاقة</p>
              </div>

              <div className="mt-auto">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm opacity-80">المستوى</p>
                    <p className="text-lg font-bold">ذهبي</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">النقاط</p>
                    <p className="text-lg font-bold">1,250</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex space-x-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className={`bg-blue-500 hover:bg-blue-600 transition-colors ${showSuccess ? "bg-green-500 hover:bg-green-600" : ""}`}
                onClick={handleAddToWallet}
                disabled={showSuccess}
              >
                {showSuccess ? (
                  <>
                    <Check className="ml-2 h-4 w-4" />
                    تمت الإضافة
                  </>
                ) : (
                  <>
                    <AppleWallet className="ml-2 h-4 w-4" />
                    إضافة إلى Apple Wallet
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>إضافة البطاقة الرقمية إلى Apple Wallet</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors">
                <CreditCard className="ml-2 h-4 w-4" />
                إضافة إلى Google Pay
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>إضافة البطاقة الرقمية إلى Google Pay</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}
