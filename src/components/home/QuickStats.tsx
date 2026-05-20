import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "../../data";
import type { Language } from "../../data";

interface QuickStatsProps {
  lang: Language;
}

export default function QuickStats({ lang }: QuickStatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isAr = lang === "ar";

  return (
    <section ref={ref} className="relative py-20 bg-[#005A9C] overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center justify-center gap-2 p-8 text-center"
            >
              <span
                className="text-5xl md:text-6xl font-extrabold text-[#C5A059]"
                style={{ direction: "ltr" }}
              >
                {isAr ? stat.valueAr : stat.valueEn}
              </span>
              <span className="text-xl md:text-2xl font-semibold text-white tracking-wide uppercase">
                {isAr ? stat.labelAr : stat.labelEn}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
