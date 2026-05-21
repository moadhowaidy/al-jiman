import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, FileText, Hash } from "lucide-react";
import { company, milestones } from "../../data";
import type { Language } from "../../data";

interface CompanyHistoryProps {
  lang: Language;
}

export default function CompanyHistory({ lang }: CompanyHistoryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isAr = lang === "ar";

  const credentials = [
    {
      icon: <Calendar size={16} />,
      labelEn: "Established",
      labelAr: "تاريخ التأسيس",
      value: company.established,
    },
    {
      icon: <FileText size={16} />,
      labelEn: "Commercial Register",
      labelAr: "السجل التجاري",
      value: company.commercialRegister,
    },
    {
      icon: <Hash size={16} />,
      labelEn: "License Number",
      labelAr: "رقم الترخيص",
      value: company.licenseNumber,
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* Left: Timeline */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-primary/8 text-blue-primary text-xs font-semibold uppercase tracking-widest mb-4">
                {isAr ? "مسيرتنا" : "Our Journey"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">
                {isAr ? "تاريخ الشركة" : "Company History"}
              </h2>
              <div className="section-divider max-w-[120px]" />
            </motion.div>

            <div className="relative">
              {/* Timeline vertical line */}
              <div
                className={[
                  "absolute top-0 bottom-0 w-px bg-gradient-to-b from-gold-primary/60 via-blue-primary/30 to-transparent",
                  isAr ? "right-[19px]" : "left-[19px]",
                ].join(" ")}
              />

              <div className="space-y-8">
                {milestones.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className={[
                      "flex items-start gap-5",
                      isAr ? "flex-row-reverse" : "",
                    ].join(" ")}
                  >
                    {/* Dot */}
                    <div className="shrink-0 w-10 h-10 rounded-full bg-white border-2 border-gold-primary flex items-center justify-center shadow-sm z-10">
                      <span className="text-[10px] font-bold text-gold-primary leading-none">
                        {m.year.slice(-2)}
                      </span>
                    </div>

                    <div
                      className={[
                        "flex-1 bg-white rounded-xl p-4 shadow-card border border-gray-50",
                        isAr ? "text-right" : "",
                      ].join(" ")}
                    >
                      <span className="text-gold-primary text-xs font-bold font-mono">
                        {m.year}
                      </span>
                      <p className="text-text-primary text-sm font-medium mt-1">
                        {isAr ? m.ar : m.en}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Credentials card */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? -40 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-full lg:w-auto lg:flex-1"
          >
            <div className="bg-[#0A1628] rounded-2xl p-8 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gold-primary/8 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-primary/20 rounded-full blur-2xl" />

              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-2">
                  {isAr ? "البيانات الرسمية" : "Official Credentials"}
                </h3>
                <p className="text-white/50 text-sm mb-8">
                  {isAr ? "مرخصة ومسجلة رسمياً في ليبيا" : "Officially licensed and registered in Libya"}
                </p>

                <div className="space-y-5">
                  {credentials.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/6 border border-white/10"
                    >
                      <div className="w-9 h-9 rounded-lg bg-gold-primary/15 flex items-center justify-center text-gold-primary shrink-0">
                        {c.icon}
                      </div>
                      <div>
                        <p className="text-white/50 text-xs">
                          {isAr ? c.labelAr : c.labelEn}
                        </p>
                        <p className="text-white font-semibold text-sm font-mono mt-0.5" dir="ltr">
                          {c.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-white/40 text-xs leading-relaxed">
                    {isAr
                      ? "شركة الجيحان للمقاولات العامة والاستثمار العقاري — معتمدة ومرخصة للعمل في جميع أنحاء ليبيا."
                      : "Jihan Company for General Contracting and Real Estate Investment — authorized to operate across Libya."}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
