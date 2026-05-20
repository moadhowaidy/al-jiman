import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Truck, Building2, Home, Wrench } from "lucide-react";
import { services } from "../../data";
import type { Language } from "../../data";

interface ServicesSplitProps {
  lang: Language;
}

const iconMap: Record<string, React.ElementType> = {
  Road: Truck,
  Building2,
  Home,
  Wrench,
};

export default function ServicesSplit({ lang }: ServicesSplitProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
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
            {isAr ? "خدماتنا" : "Our Services"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            {isAr ? "مجالات تخصصنا" : "Our Areas of Expertise"}
          </h2>
          <div className="section-divider max-w-xs mx-auto" />
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Building2;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                className="group relative bg-white border border-gray-100 rounded-2xl p-7 hover:border-gold-primary/40 hover:shadow-gold transition-all duration-300 overflow-hidden cursor-default"
              >
                {/* Hover gradient bg */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-primary/3 to-gold-primary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                {/* Icon */}
                <div className="relative z-10 w-12 h-12 rounded-xl bg-blue-primary/8 flex items-center justify-center mb-5 group-hover:bg-blue-primary/15 transition-colors duration-300">
                  <Icon size={22} className="text-blue-primary" />
                </div>

                {/* Gold accent line */}
                <div className="relative z-10 w-8 h-0.5 bg-gradient-to-r from-gold-primary to-gold-rich rounded-full mb-4 group-hover:w-12 transition-all duration-300" />

                <h3 className="relative z-10 font-bold text-text-primary text-base mb-3">
                  {isAr ? service.titleAr : service.titleEn}
                </h3>
                <p className="relative z-10 text-text-secondary text-sm leading-relaxed">
                  {isAr ? service.descAr : service.descEn}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
