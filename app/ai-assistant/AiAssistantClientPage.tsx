"use client"

import { AiAssistantTabs } from "@/components/ai-assistant/ai-assistant-tabs"

export default function AiAssistantClientPage() {
  return (
    <div className="flex flex-col gap-6 p-6 w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">المساعد الذكي</h1>
        <p className="text-muted-foreground">
          استخدم المساعد الذكي لإنشاء وجدولة الرسائل التسويقية باستخدام تقنية الذكاء الاصطناعي
        </p>
      </div>

      <AiAssistantTabs />
    </div>
  )
}
