import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Hero from "../components/home/Hero";
import QuickStats from "../components/home/QuickStats";
import ServicesSplit from "../components/home/ServicesSplit";
import type { Language } from "../data";

interface HomeProps {
  lang: Language;
}

export default function Home({ lang }: HomeProps) {
  const isAr = lang === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <main>
      <Hero lang={lang} />
      <QuickStats lang={lang} />
      <ServicesSplit lang={lang} />

      {/* Full-width landmark CTA banner */}
      <section className="relative bg-[#0A1628] py-24 overflow-hidden">
        {/* Background accents */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,rgba(0,90,156,0.35),transparent)] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-primary/50 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-primary/50 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="text-gold-primary text-sm font-semibold uppercase tracking-widest mb-5"
          >
            {isAr ? "ابدأ رحلتك معنا" : "Start Your Journey With Us"}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6 max-w-2xl mx-auto"
          >
            {isAr ? (
              <>هل أنت مستعد لبناء{" "}<span style={{ color: "#D4AF37" }}>معلَمك</span> التالي؟</>
            ) : (
              <>Ready to Build Your{" "}<span style={{ color: "#D4AF37" }}>Next Landmark?</span></>
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-white/65 text-lg font-normal leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            {isAr
              ? "فريق الجيحان جاهز للاستماع إليك. سواء كان مشروعاً طرقياً أو إنشائياً أو عقارياً — نحن شريكك الاستراتيجي."
              : "The Jihan team is ready to listen. Whether a road, building, or real estate project — we are your strategic partner."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link
              to="/connect"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#C5A059] text-[#0A1628] text-lg font-bold rounded-md hover:bg-[#D4AF37] transition-all duration-200 shadow-gold group"
            >
              {isAr ? "تواصل معنا اليوم" : "Contact Us Today"}
              <Arrow size={20} className="group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
