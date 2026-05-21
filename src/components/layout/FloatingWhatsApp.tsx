import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { contact } from "../../data";
import type { Language } from "../../data";

interface FloatingWhatsAppProps {
  lang: Language;
}

export default function FloatingWhatsApp({ lang }: FloatingWhatsAppProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const isAr = lang === "ar";

  return (
    <div
      className={[
        "fixed bottom-6 z-50",
        isAr ? "left-6" : "right-6",
      ].join(" ")}
    >
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={[
              "absolute bottom-16 bg-white rounded-xl shadow-lg p-3 min-w-max border border-gray-100",
              isAr ? "left-0" : "right-0",
            ].join(" ")}
          >
            <p className="text-xs font-semibold text-gray-dark">
              {isAr ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
            </p>
            <p className="text-[10px] text-gray-mid mt-0.5" dir="ltr">
              {contact.whatsappDisplay}
            </p>
            <div
              className={[
                "absolute bottom-[-6px] w-3 h-3 bg-white border-r border-b border-gray-100 rotate-45",
                isAr ? "left-4" : "right-4",
              ].join(" ")}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
          isAr
            ? "مرحباً، أود الاستفسار عن خدمات شركة الجيحان."
            : "Hello, I would like to inquire about Jihan's services."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 300, damping: 20 }}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#1DB954] transition-colors duration-200"
      >
        <MessageCircle size={26} fill="white" stroke="none" />
      </motion.a>
    </div>
  );
}
