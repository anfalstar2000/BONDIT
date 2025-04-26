"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send, Copy, Bot, User, Loader2 } from "lucide-react"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "مرحبًا! أنا المساعد الذكي الخاص بك. كيف يمكنني مساعدتك في إنشاء رسائل تسويقية فعالة لعملك؟",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // إضافة رسالة المستخدم
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // محاكاة استجابة المساعد (في التطبيق الحقيقي، سيتم استبدال هذا بطلب API إلى OpenAI)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getSimulatedResponse(input),
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const getSimulatedResponse = (userInput: string): string => {
    if (userInput.includes("مرحبا") || userInput.includes("أهلا")) {
      return "أهلاً بك! كيف يمكنني مساعدتك اليوم في تحسين رسائلك التسويقية؟"
    } else if (userInput.includes("قالب") || userInput.includes("نموذج")) {
      return "لدينا العديد من القوالب التسويقية المتاحة. هل تبحث عن قالب لرسائل البريد الإلكتروني، أو وسائل التواصل الاجتماعي، أو الرسائل النصية؟"
    } else if (userInput.includes("جدولة") || userInput.includes("توقيت")) {
      return "يمكنك جدولة رسائلك من خلال قسم الجدولة. هل ترغب في إنشاء جدول زمني لحملتك التسويقية؟"
    } else {
      return "شكرًا لمشاركتك هذه المعلومات. هل ترغب في إنشاء رسالة تسويقية محددة أو الحصول على اقتراحات لتحسين استراتيجيتك التسويقية؟"
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // يمكن إضافة إشعار نجاح هنا
        console.log("تم نسخ النص بنجاح")
      })
      .catch((err) => {
        console.error("فشل في نسخ النص: ", err)
      })
  }

  return (
    <div className="flex flex-col h-[calc(100vh-250px)] gap-4">
      <Card className="flex-1 overflow-hidden">
        <CardContent className="p-4 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-2 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-start" : "justify-end"} mb-4`}
              >
                <div className={`flex max-w-[80%] ${message.role === "user" ? "flex-row" : "flex-row-reverse"}`}>
                  <div
                    className={`flex items-center justify-center h-8 w-8 rounded-full ${
                      message.role === "user" ? "bg-blue-100 ml-2" : "bg-green-100 mr-2"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Bot className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-lg relative ${
                      message.role === "user" ? "bg-blue-100 text-blue-900" : "bg-green-100 text-green-900"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div className="absolute bottom-1 right-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-gray-400 hover:text-gray-600"
                        onClick={() => copyToClipboard(message.content)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-end mb-4">
                <div className="flex flex-row-reverse">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100 mr-2">
                    <Bot className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="p-3 rounded-lg bg-green-100 text-green-900">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
      </Card>
      <div className="flex gap-2">
        <Input
          placeholder="اكتب رسالتك هنا..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage()
            }
          }}
          className="flex-1"
          dir="rtl"
        />
        <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
          <Send className="h-4 w-4 ml-2" />
          إرسال
        </Button>
      </div>
    </div>
  )
}
