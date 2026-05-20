import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import LeadForm from "../components/connect/LeadForm";
import LocationMap from "../components/connect/LocationMap";
import { contact, company } from "../data";
import type { Language } from "../data";

interface ConnectProps {
  lang: Language;
}

export default function Connect({ lang }: ConnectProps) {
  const isAr = lang === "ar";

  const contactCards = [
    {
      icon: <Phone size={28} />,
      labelEn: "Phone",
      labelAr: "الهاتف",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, "")}`,
      dir: "ltr" as const,
    },
    {
      icon: <Mail size={28} />,
      labelEn: "Email",
      labelAr: "البريد الإلكتروني",
      value: contact.emails[0],
      href: `mailto:${contact.emails[0]}`,
      dir: "ltr" as const,
    },
    {
      icon: <MessageCircle size={28} />,
      labelEn: "WhatsApp",
      labelAr: "واتساب",
      value: contact.whatsappDisplay,
      href: `https://wa.me/${contact.whatsapp}`,
      dir: "ltr" as const,
    },
    {
      icon: <MapPin size={28} />,
      labelEn: "Headquarters",
      labelAr: "المقر الرئيسي",
      value: isAr ? company.headquartersAr : company.headquartersEn,
      href: "https://maps.google.com/?q=Tarhuna,Libya",
      dir: isAr ? "rtl" : "ltr" as const,
    },
  ];

  return (
    <main>
      {/* Page hero */}
      <section className="relative bg-[#0A1628] pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(0,90,156,0.5),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/70 text-xs font-semibold uppercase tracking-widest mb-6"
          >
            {isAr ? "تواصل معنا" : "Get In Touch"}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] tracking-tight text-white mb-6"
          >
            {isAr ? (
              <>لنبدأ <span style={{ color: "#C5A059" }}>مشروعك</span></>
            ) : (
              <>Let's Start Your <span style={{ color: "#C5A059" }}>Project</span></>
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white/70 text-lg sm:text-xl font-normal max-w-2xl mx-auto"
          >
            {isAr
              ? "فريقنا جاهز للإجابة على استفساراتك وتحويل رؤيتك إلى واقع."
              : "Our team is ready to answer your inquiries and turn your vision into reality."}
          </motion.p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((card, i) => (
              <motion.a
                key={i}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-white p-10 rounded-xl shadow-2xl border-t-4 border-[#005A9C] flex flex-col items-center gap-4 text-center hover:shadow-gold hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className="w-14 h-14 text-[#005A9C] flex items-center justify-center group-hover:text-[#C5A059] transition-colors duration-200">
                  {card.icon}
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
                  {isAr ? card.labelAr : card.labelEn}
                </p>
                <p
                  className="text-gray-800 text-sm sm:text-base font-bold leading-snug"
                  dir={card.dir}
                >
                  {card.value}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, x: isAr ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <LeadForm lang={lang} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: isAr ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              <LocationMap lang={lang} />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
