import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, ChevronDown, Award, Shield, Building2 } from "lucide-react";
import { company } from "../../data";
import type { Language } from "../../data";

interface HeroProps {
  lang: Language;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
} as any;

export default function Hero({ lang }: HeroProps) {
  const isAr = lang === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const badges = isAr
    ? [
        { icon: <Award size={14} />, label: "15+ سنة خبرة" },
        { icon: <Shield size={14} />, label: "جودة معتمدة" },
        { icon: <Building2 size={14} />, label: "50+ مشروع" },
      ]
    : [
        { icon: <Award size={14} />, label: "15+ Years Experience" },
        { icon: <Shield size={14} />, label: "Certified Quality" },
        { icon: <Building2 size={14} />, label: "50+ Projects" },
      ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0A1628]">
      {/* Background geometry */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,90,156,0.5),transparent)]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/8 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#005A9C]/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/4" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* STRUCTURAL CHANGE: centered flex column, max-w-5xl */}
        <div className="max-w-5xl mx-auto flex flex-col gap-8 items-center text-center">

          {/* Trust badges */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap justify-center gap-3"
          >
            {badges.map((b, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/15 text-white/80 text-sm font-medium backdrop-blur-sm"
              >
                <span className="text-[#C5A059]">{b.icon}</span>
                {b.label}
              </span>
            ))}
          </motion.div>

          {/* STRUCTURAL CHANGE: display-scale headline with tight optical tracking */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-snug tracking-tight text-white"
          >
            {isAr ? (
              <>
                نُؤسِّس{" "}
                <span className="text-[#C5A059]">المعالم</span>
                <br />
                <span className="text-white/50">لا نبني مجرد هياكل</span>
              </>
            ) : (
              <>
                We Establish{" "}
                <span className="text-[#C5A059]">Landmarks</span>
                <br />
                <span className="text-white/50">Not Just Structures</span>
              </>
            )}
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-white/70 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl"
          >
            {isAr
              ? "شركة الجيحان للمقاولات العامة والاستثمار العقاري — رائدة في تنفيذ الطرق والبنية التحتية والمشاريع الإنشائية في ليبيا منذ 2010."
              : `${company.nameEn} — leading Libya's infrastructure, road construction, and real estate development since 2010.`}
          </motion.p>

          {/* STRUCTURAL CHANGE: stacked on mobile, row on sm+, gap-6 */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-col sm:flex-row items-center gap-6 mt-8"
          >
            {/* STRUCTURAL CHANGE: hardcoded gold CTA — dark navy text, px-10 py-5 */}
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 shrink-0 bg-[#C5A059] text-[#0A1628] hover:bg-[#D4AF37] px-8 py-4 text-lg font-bold rounded-lg shadow-xl transition-all duration-200 group"
            >
              {isAr ? "استعرض مشاريعنا" : "View Our Projects"}
              <Arrow size={18} className="group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
            </Link>
            <Link
              to="/connect"
              className="inline-flex items-center justify-center gap-2 shrink-0 px-8 py-4 text-lg font-semibold text-white bg-transparent border-2 border-white/35 rounded-lg hover:border-white/70 hover:bg-white/8 transition-all duration-200"
            >
              {isAr ? "تواصل معنا" : "Contact Us"}
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-white/40 text-[10px] uppercase tracking-widest font-medium">
          {isAr ? "اكتشف" : "Scroll"}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown size={18} className="text-[#C5A059]/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
