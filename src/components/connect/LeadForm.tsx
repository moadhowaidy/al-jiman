import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { contact } from "../../data";
import type { Language } from "../../data";

interface LeadFormProps {
  lang: Language;
}

type Status = "idle" | "loading" | "success" | "error";

export default function LeadForm({ lang }: LeadFormProps) {
  const isAr = lang === "ar";
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const serviceOptions = isAr
    ? [
        { value: "", label: "اختر نوع الخدمة *" },
        { value: "roads", label: "الطرق والبنية التحتية" },
        { value: "buildings", label: "الإنشاءات التجارية" },
        { value: "realestate", label: "الاستثمار العقاري" },
        { value: "maintenance", label: "الصيانة وإعادة التأهيل" },
        { value: "other", label: "أخرى" },
      ]
    : [
        { value: "", label: "Select Service Type *" },
        { value: "roads", label: "Road & Infrastructure" },
        { value: "buildings", label: "Commercial Construction" },
        { value: "realestate", label: "Real Estate Investment" },
        { value: "maintenance", label: "Maintenance & Rehabilitation" },
        { value: "other", label: "Other" },
      ];

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.service) return;

    setStatus("loading");

    const waMessage = encodeURIComponent(
      isAr
        ? `مرحباً، أودّ الاستفسار عن خدمات شركة الجيحان.\n\nالاسم: ${form.name}\nالهاتف: ${form.phone}\nالبريد: ${form.email || "—"}\nالخدمة: ${form.service}\nرسالة: ${form.message || "—"}`
        : `Hello, I'd like to inquire about Jihan's services.\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email || "—"}\nService: ${form.service}\nMessage: ${form.message || "—"}`
    );

    setTimeout(() => {
      window.open(`https://wa.me/${contact.whatsapp}?text=${waMessage}`, "_blank");
      setStatus("success");
      setForm({ name: "", phone: "", email: "", service: "", message: "" });
    }, 600);
  }

  const isDisabled = status === "loading" || !form.name || !form.phone || !form.service;

  const inputClass = [
    "w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm",
    "bg-white placeholder-gray-400 focus:outline-none focus:border-[#005A9C]",
    "focus:ring-2 focus:ring-[#005A9C]/10 transition-all duration-200",
  ].join(" ");

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 sm:p-10">
      <h3 className="text-2xl font-bold text-gray-900 mb-1">
        {isAr ? "أرسل استفساراً" : "Send an Inquiry"}
      </h3>
      <p className="text-gray-500 text-base mb-8">
        {isAr
          ? "سيتواصل معك فريقنا خلال 24 ساعة."
          : "Our team will reach out within 24 hours."}
      </p>

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
            <CheckCircle size={32} className="text-green-500" />
          </div>
          <h4 className="font-bold text-gray-900 text-lg mb-2">
            {isAr ? "تم الإرسال بنجاح!" : "Message Sent!"}
          </h4>
          <p className="text-gray-500 text-sm">
            {isAr
              ? "جاري فتح واتساب لإكمال التواصل..."
              : "Opening WhatsApp to continue the conversation..."}
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-6 text-[#005A9C] text-sm font-medium hover:underline cursor-pointer"
          >
            {isAr ? "إرسال استفسار آخر" : "Send another inquiry"}
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {isAr ? "الاسم الكامل *" : "Full Name *"}
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder={isAr ? "أدخل اسمك الكامل" : "Enter your full name"}
                className={inputClass}
                autoComplete="name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {isAr ? "رقم الهاتف *" : "Phone Number *"}
              </label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="+218 XX XXX XXXX"
                className={inputClass}
                autoComplete="tel"
                dir="ltr"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {isAr ? "البريد الإلكتروني" : "Email Address"}
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@domain.com"
              className={inputClass}
              autoComplete="email"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {isAr ? "نوع الخدمة *" : "Service Type *"}
            </label>
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              required
              className={inputClass}
            >
              {serviceOptions.map((o) => (
                <option key={o.value} value={o.value} disabled={o.value === ""}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {isAr ? "تفاصيل إضافية" : "Additional Details"}
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder={
                isAr
                  ? "صف مشروعك أو استفساراتك..."
                  : "Describe your project or inquiry..."
              }
              className={[inputClass, "resize-none"].join(" ")}
            />
          </div>

          {status === "error" && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              <AlertCircle size={16} />
              {isAr ? "حدث خطأ. يرجى المحاولة مرة أخرى." : "Something went wrong. Please try again."}
            </div>
          )}

          <button
            type="submit"
            disabled={isDisabled}
            className="w-full bg-[#C5A059] text-[#0A1628] font-extrabold text-lg py-5 rounded-md hover:bg-[#D4AF37] transition-colors duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {status === "loading" ? (
              isAr ? "جارٍ الإرسال..." : "Sending..."
            ) : (
              <>
                {isAr ? "أرسل عبر واتساب" : "Send via WhatsApp"}
                <Send size={18} />
              </>
            )}
          </button>

          <p className="text-xs text-gray-400 text-center">
            {isAr
              ? "* سيتم توجيهك إلى واتساب لإتمام الرسالة."
              : "* You will be redirected to WhatsApp to complete the message."}
          </p>
        </form>
      )}
    </div>
  );
}
