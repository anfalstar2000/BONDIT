import type { Metadata } from "next"
import AiAssistantClientPage from "./AiAssistantClientPage"

export const metadata: Metadata = {
  title: "المساعد الذكي | BOND.IT",
  description: "المساعد الذكي المدعوم بالذكاء الاصطناعي لإنشاء وجدولة الرسائل التسويقية",
}

export default function AiAssistantPage() {
  return <AiAssistantClientPage />
}
