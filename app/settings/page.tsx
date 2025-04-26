"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Settings,
  Database,
  Users,
  UserCircle,
  Tag,
  MessageCircle,
  Mail,
  Link2,
  Calendar,
  Globe,
  Briefcase,
  User,
} from "lucide-react"

// تعريف أنواع المحتوى
type SettingSection =
  | "general"
  | "reset-data"
  | "program-participation"
  | "account-attributes"
  | "customer-tag"
  | "contact-limit"
  | "email-unsubscribe"
  | "account-connections"
  | "events"
  | "domain-config"
  | "domains"
  | "accounts"

export default function SettingsPage() {
  // حالة لتتبع القسم المحدد حاليًا
  const [activeSection, setActiveSection] = useState<SettingSection>("contact-limit")

  // وظيفة لتغيير القسم النشط
  const handleSectionChange = (section: SettingSection) => {
    setActiveSection(section)
  }

  // تحديد ما إذا كان القسم نشطًا
  const isActive = (section: SettingSection) => activeSection === section

  return (
    <div className="flex h-full" dir="rtl">
      {/* Sidebar */}
      <div className="w-80 border-l bg-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">الإعدادات</h1>

          {/* General Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-500 mb-4">العام</h2>
            <div className="space-y-2">
              <div
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${isActive("general") ? "bg-blue-50" : "hover:bg-gray-50"}`}
                onClick={() => handleSectionChange("general")}
              >
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">العام</span>
                </div>
              </div>
              <div
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${isActive("reset-data") ? "bg-blue-50" : "hover:bg-gray-50"}`}
                onClick={() => handleSectionChange("reset-data")}
              >
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">إعادة تعيين البيانات</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customers Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-500 mb-4">عملاء</h2>
            <div className="space-y-2">
              <div
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${isActive("program-participation") ? "bg-blue-50" : "hover:bg-gray-50"}`}
                onClick={() => handleSectionChange("program-participation")}
              >
                <div className="flex items-center gap-3">
                  <UserCircle className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">المشاركة في البرامج</span>
                </div>
              </div>
              <div
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${isActive("account-attributes") ? "bg-blue-50" : "hover:bg-gray-50"}`}
                onClick={() => handleSectionChange("account-attributes")}
              >
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">سمات الحساب الشخصي</span>
                </div>
              </div>
              <div
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${isActive("customer-tag") ? "bg-blue-50" : "hover:bg-gray-50"}`}
                onClick={() => handleSectionChange("customer-tag")}
              >
                <div className="flex items-center gap-3">
                  <Tag className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">علامة العميل</span>
                </div>
              </div>
            </div>
          </div>

          {/* Communication Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-500 mb-4">التواصل</h2>
            <div className="space-y-2">
              <div
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${isActive("contact-limit") ? "bg-blue-50" : "hover:bg-gray-50"}`}
                onClick={() => handleSectionChange("contact-limit")}
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">حد تكرار الاتصال</span>
                </div>
              </div>
              <div
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${isActive("email-unsubscribe") ? "bg-blue-50" : "hover:bg-gray-50"}`}
                onClick={() => handleSectionChange("email-unsubscribe")}
              >
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">علامة إلغاء الاشتراك من البريد الإلكتروني</span>
                </div>
              </div>
            </div>
          </div>

          {/* Integration Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-500 mb-4">التكامل</h2>
            <div className="space-y-2">
              <div
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${isActive("account-connections") ? "bg-blue-50" : "hover:bg-gray-50"}`}
                onClick={() => handleSectionChange("account-connections")}
              >
                <div className="flex items-center gap-3">
                  <Link2 className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">ارتباطات الحساب</span>
                </div>
              </div>
              <div
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${isActive("events") ? "bg-blue-50" : "hover:bg-gray-50"}`}
                onClick={() => handleSectionChange("events")}
              >
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">الأحداث</span>
                </div>
              </div>
              <div
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${isActive("domain-config") ? "bg-blue-50" : "hover:bg-gray-50"}`}
                onClick={() => handleSectionChange("domain-config")}
              >
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">تكوين النطاق</span>
                </div>
              </div>
              <div
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${isActive("domains") ? "bg-blue-50" : "hover:bg-gray-50"}`}
                onClick={() => handleSectionChange("domains")}
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">المجالات</span>
                </div>
              </div>
            </div>
          </div>

          {/* Users Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-500 mb-4">المستخدمين</h2>
            <div className="space-y-2">
              <div
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${isActive("accounts") ? "bg-blue-50" : "hover:bg-gray-50"}`}
                onClick={() => handleSectionChange("accounts")}
              >
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">الحسابات</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 bg-gray-50">
        {/* حد تكرار الاتصال */}
        {activeSection === "contact-limit" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">حد تكرار الاتصال</h2>
              <Button className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-full">حفظ التغييرات</Button>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <h3 className="font-medium">الحد الأقصى للرسائل اليومية</h3>
                    <p className="text-sm text-gray-500">
                      الحد الأقصى لعدد الرسائل التي يمكن إرسالها للعميل في اليوم الواحد
                    </p>
                  </div>
                  <div className="w-24">
                    <Input type="number" defaultValue="3" className="text-center rounded-full" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <h3 className="font-medium">الحد الأقصى للرسائل الأسبوعية</h3>
                    <p className="text-sm text-gray-500">
                      الحد الأقصى لعدد الرسائل التي يمكن إرسالها للعميل في الأسبوع
                    </p>
                  </div>
                  <div className="w-24">
                    <Input type="number" defaultValue="10" className="text-center rounded-full" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <h3 className="font-medium">الحد الأقصى للرسائل الشهرية</h3>
                    <p className="text-sm text-gray-500">الحد الأقصى لعدد الرسائل التي يمكن إرسالها للعميل في الشهر</p>
                  </div>
                  <div className="w-24">
                    <Input type="number" defaultValue="30" className="text-center rounded-full" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">إعدادات متقدمة</h3>

                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <h4 className="font-medium">تجاهل الحدود للرسائل المهمة</h4>
                    <p className="text-sm text-gray-500">السماح بإرسال الرسائل المهمة بغض النظر عن الحدود المعينة</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <h4 className="font-medium">إعادة ضبط العدادات تلقائيًا</h4>
                    <p className="text-sm text-gray-500">إعادة ضبط عدادات الرسائل تلقائيًا في بداية كل فترة</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <h4 className="font-medium">تنبيه العميل عند الوصول للحد</h4>
                    <p className="text-sm text-gray-500">إرسال تنبيه للعميل عند الوصول للحد الأقصى من الرسائل</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* العام */}
        {activeSection === "general" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">الإعدادات العامة</h2>
              <Button className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-full">حفظ التغييرات</Button>
            </div>

            <div className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="store-name">اسم المتجر</Label>
                  <Input id="store-name" defaultValue="متجر BOND.IT" className="rounded-full" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="store-email">البريد الإلكتروني</Label>
                  <Input id="store-email" type="email" defaultValue="info@bondit.com" className="rounded-full" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="store-phone">رقم الهاتف</Label>
                  <Input id="store-phone" defaultValue="+966512345678" className="rounded-full" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="store-currency">العملة</Label>
                  <select id="store-currency" className="border rounded-full p-2 px-4 h-10">
                    <option value="SAR">ريال سعودي (SAR)</option>
                    <option value="AED">درهم إماراتي (AED)</option>
                    <option value="KWD">دينار كويتي (KWD)</option>
                    <option value="QAR">ريال قطري (QAR)</option>
                    <option value="BHD">دينار بحريني (BHD)</option>
                    <option value="OMR">ريال عماني (OMR)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* إعادة تعيين البيانات */}
        {activeSection === "reset-data" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">إعادة تعيين البيانات</h2>
              <Button className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-full">حفظ التغييرات</Button>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <h3 className="font-medium text-yellow-800 mb-2">تحذير</h3>
                <p className="text-sm text-yellow-700">
                  إعادة تعيين البيانات ستؤدي إلى حذف جميع البيانات المخزنة في النظام. هذه العملية لا يمكن التراجع عنها.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <h4 className="font-medium">إعادة تعيين بيانات العملاء</h4>
                    <p className="text-sm text-gray-500">حذف جميع بيانات العملاء والمعاملات المرتبطة بهم</p>
                  </div>
                  <Button variant="destructive" className="rounded-full">
                    إعادة تعيين
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <h4 className="font-medium">إعادة تعيين بيانات المنتجات</h4>
                    <p className="text-sm text-gray-500">حذف جميع بيانات المنتجات والمخزون</p>
                  </div>
                  <Button variant="destructive" className="rounded-full">
                    إعادة تعيين
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <h4 className="font-medium">إعادة تعيين بيانات الطلبات</h4>
                    <p className="text-sm text-gray-500">حذف جميع بيانات الطلبات وسجلات المبيعات</p>
                  </div>
                  <Button variant="destructive" className="rounded-full">
                    إعادة تعيين
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <h4 className="font-medium">إعادة تعيين جميع البيانات</h4>
                    <p className="text-sm text-gray-500">حذف جميع البيانات وإعادة تعيين النظام بالكامل</p>
                  </div>
                  <Button variant="destructive" className="rounded-full">
                    إعادة تعيين الكل
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* المشاركة في البرامج */}
        {activeSection === "program-participation" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">المشاركة في البرامج</h2>
              <Button className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-full">حفظ التغييرات</Button>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <h3 className="font-medium">برنامج النقاط والمكافآت</h3>
                    <p className="text-sm text-gray-500">تفعيل برنامج النقاط والمكافآت للعملاء</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <h3 className="font-medium">برنامج الإحالة</h3>
                    <p className="text-sm text-gray-500">تفعيل برنامج الإحالة للعملاء</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <h3 className="font-medium">برنامج التحديات</h3>
                    <p className="text-sm text-gray-500">تفعيل برنامج التحديات للعملاء</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <h3 className="font-medium">برنامج الشارات والمستويات</h3>
                    <p className="text-sm text-gray-500">تفعيل برنامج الشارات والمستويات للعملاء</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* عرض محتوى افتراضي للأقسام الأخرى */}
        {!["contact-limit", "general", "reset-data", "program-participation"].includes(activeSection) && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">
                {activeSection === "account-attributes" && "سمات الحساب الشخصي"}
                {activeSection === "customer-tag" && "علامة العميل"}
                {activeSection === "email-unsubscribe" && "علامة إلغاء الاشتراك من البريد الإلكتروني"}
                {activeSection === "account-connections" && "ارتباطات الحساب"}
                {activeSection === "events" && "الأحداث"}
                {activeSection === "domain-config" && "تكوين النطاق"}
                {activeSection === "domains" && "المجالات"}
                {activeSection === "accounts" && "الحسابات"}
              </h2>
              <Button className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-full">حفظ التغييرات</Button>
            </div>

            <div className="p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                {activeSection === "account-attributes" && <User className="h-8 w-8 text-blue-500" />}
                {activeSection === "customer-tag" && <Tag className="h-8 w-8 text-blue-500" />}
                {activeSection === "email-unsubscribe" && <Mail className="h-8 w-8 text-blue-500" />}
                {activeSection === "account-connections" && <Link2 className="h-8 w-8 text-blue-500" />}
                {activeSection === "events" && <Calendar className="h-8 w-8 text-blue-500" />}
                {activeSection === "domain-config" && <Globe className="h-8 w-8 text-blue-500" />}
                {activeSection === "domains" && <Briefcase className="h-8 w-8 text-blue-500" />}
                {activeSection === "accounts" && <Users className="h-8 w-8 text-blue-500" />}
              </div>
              <h3 className="text-lg font-medium mb-2">
                إعدادات{" "}
                {activeSection === "account-attributes"
                  ? "سمات الحساب الشخصي"
                  : activeSection === "customer-tag"
                    ? "علامة العميل"
                    : activeSection === "email-unsubscribe"
                      ? "علامة إلغاء الاشتراك من البريد الإلكتروني"
                      : activeSection === "account-connections"
                        ? "ارتباطات الحساب"
                        : activeSection === "events"
                          ? "الأحداث"
                          : activeSection === "domain-config"
                            ? "تكوين النطاق"
                            : activeSection === "domains"
                              ? "المجالات"
                              : "الحسابات"}
              </h3>
              <p className="text-gray-500 mb-6">يمكنك تخصيص إعدادات هذا القسم حسب احتياجاتك</p>
              <Button className="rounded-full">بدء الإعداد</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
