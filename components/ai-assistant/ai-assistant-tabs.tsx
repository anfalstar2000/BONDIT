"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatInterface } from "./chat-interface"
import { ProjectInfoForm } from "./project-info-form"
import { MessageTemplates } from "./message-templates"
import { MessageScheduler } from "./message-scheduler"
import { MessageHistory } from "./message-history"
import { AiSettings } from "./ai-settings"

export function AiAssistantTabs() {
  return (
    <Tabs defaultValue="chat" dir="rtl" className="w-full">
      <TabsList className="grid grid-cols-6 mb-8">
        <TabsTrigger value="chat">المحادثة</TabsTrigger>
        <TabsTrigger value="project-info">معلومات المشروع</TabsTrigger>
        <TabsTrigger value="templates">القوالب</TabsTrigger>
        <TabsTrigger value="scheduler">الجدولة</TabsTrigger>
        <TabsTrigger value="history">السجل</TabsTrigger>
        <TabsTrigger value="settings">الإعدادات</TabsTrigger>
      </TabsList>
      <TabsContent value="chat">
        <ChatInterface />
      </TabsContent>
      <TabsContent value="project-info">
        <ProjectInfoForm />
      </TabsContent>
      <TabsContent value="templates">
        <MessageTemplates />
      </TabsContent>
      <TabsContent value="scheduler">
        <MessageScheduler />
      </TabsContent>
      <TabsContent value="history">
        <MessageHistory />
      </TabsContent>
      <TabsContent value="settings">
        <AiSettings />
      </TabsContent>
    </Tabs>
  )
}
