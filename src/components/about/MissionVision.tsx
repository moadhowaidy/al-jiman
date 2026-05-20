import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Eye } from "lucide-react";
import { mission, vision, about } from "../../data";
import type { Language } from "../../data";

interface MissionVisionProps {
  lang: Language;
}

export default function MissionVision({ lang }: MissionVisionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isAr = lang === "ar";

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-primary/8 text-blue-primary text-xs font-semibold uppercase tracking-widest mb-4">
            {isAr ? "هويتنا" : "Our Identity"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            {isAr ? "من نحن" : "Who We Are"}
          </h2>
          <div className="section-divider max-w-xs mx-auto mb-8" />
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            {isAr ? about.ar : about.en}
          </p>
        </motion.div>

        {/* Mission & Vision cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? 30 : -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="group relative bg-[#0A1628] rounded-2xl p-8 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-primary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold-primary/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gold-primary/15 flex items-center justify-center mb-6">
                <Target size={22} className="text-gold-primary" />
              </div>
              <h3 className="font-bold text-xl text-white mb-4">
                {isAr ? mission.titleAr : mission.titleEn}
              </h3>
              <div className="w-10 h-0.5 bg-gradient-to-r from-gold-primary to-gold-rich rounded-full mb-5" />
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                {isAr ? mission.textAr : mission.textEn}
              </p>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? -30 : 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="group relative border-2 border-blue-primary/15 rounded-2xl p-8 overflow-hidden bg-gradient-to-br from-off-white to-white hover:border-gold-primary/30 transition-colors duration-300"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold-primary/5 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-blue-primary/8 flex items-center justify-center mb-6 group-hover:bg-blue-primary/15 transition-colors duration-300">
                <Eye size={22} className="text-blue-primary" />
              </div>
              <h3 className="font-bold text-xl text-text-primary mb-4">
                {isAr ? vision.titleAr : vision.titleEn}
              </h3>
              <div className="w-10 h-0.5 bg-gradient-to-r from-blue-primary to-blue-light rounded-full mb-5" />
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                {isAr ? vision.textAr : vision.textEn}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
