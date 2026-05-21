import { motion } from "framer-motion";
import MissionVision from "../components/about/MissionVision";
import CompanyHistory from "../components/about/CompanyHistory";
import type { Language } from "../data";

interface AboutProps {
  lang: Language;
}

export default function About({ lang }: AboutProps) {
  const isAr = lang === "ar";

  return (
    <main>
      {/* Page hero */}
      <section className="relative w-full bg-[#0A1628] pt-32 pb-16 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(0,90,156,0.5),transparent)]" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-gold-primary/8 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col gap-4 px-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/70 text-xs font-semibold uppercase tracking-widest"
          >
            {isAr ? "عن الشركة" : "About Us"}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-5xl font-bold text-white"
          >
            {isAr ? (
              <>نحن <span className="gold-gradient">الجيمان</span></>
            ) : (
              <>We Are <span className="gold-gradient">Al-Jiman</span></>
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto"
          >
            {isAr
              ? "أكثر من 15 عاماً من الخبرة في المقاولات العامة والاستثمار العقاري في ليبيا."
              : "Over 15 years of expertise in general contracting and real estate investment across Libya."}
          </motion.p>
        </div>
      </section>

      <MissionVision lang={lang} />
      <CompanyHistory lang={lang} />
    </main>
  );
}
