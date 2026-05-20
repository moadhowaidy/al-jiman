import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import FloatingWhatsApp from "./components/layout/FloatingWhatsApp";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Connect from "./pages/Connect";
import type { Language } from "./data";

// ─── Liquid Sweep Overlay ──────────────────────────────────────────────────
function LiquidSweep({ dir }: { dir: "ltr" | "rtl" }) {
  return (
    <motion.div
      key={dir + Date.now()}
      initial={
        dir === "ltr"
          ? { clipPath: "inset(0 100% 0 0)", opacity: 1 }
          : { clipPath: "inset(0 0 0 100%)", opacity: 1 }
      }
      animate={{ clipPath: "inset(0 0% 0 0%)", opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[200] pointer-events-none"
      style={{
        background:
          "linear-gradient(135deg, #005A9C 0%, #003F6E 40%, #C5A059 80%, #D4AF37 100%)",
      }}
    />
  );
}

// ─── Scroll-to-top on route change ────────────────────────────────────────
function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

// ─── Page transition wrapper ───────────────────────────────────────────────
function PageTransition({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main app shell ────────────────────────────────────────────────────────
function AppShell() {
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem("aljiman-lang") as Language) || "ar";
  });
  const [sweeping, setSweeping] = useState(false);
  const [sweepDir, setSweepDir] = useState<"ltr" | "rtl">("rtl");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Apply dir/lang to html element
  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("aljiman-lang", lang);
  }, [lang]);

  function handleToggleLang() {
    const nextLang: Language = lang === "en" ? "ar" : "en";
    const nextDir = nextLang === "ar" ? "rtl" : "ltr";

    // Clear any pending timers
    timers.current.forEach(clearTimeout);
    timers.current = [];

    setSweepDir(nextDir);
    setSweeping(true);

    // Switch language mid-sweep so content flips under the overlay
    timers.current.push(
      setTimeout(() => {
        setLang(nextLang);
      }, 300)
    );

    // Remove sweep overlay after animation completes
    timers.current.push(
      setTimeout(() => {
        setSweeping(false);
      }, 750)
    );
  }

  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      {/* Liquid sweep overlay */}
      <AnimatePresence>{sweeping && <LiquidSweep dir={sweepDir} />}</AnimatePresence>

      <ScrollReset />
      <Navbar lang={lang} onToggleLang={handleToggleLang} />

      <PageTransition>
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/about" element={<About lang={lang} />} />
          <Route path="/projects" element={<Projects lang={lang} />} />
          <Route path="/connect" element={<Connect lang={lang} />} />
          <Route path="*" element={<Home lang={lang} />} />
        </Routes>
      </PageTransition>

      <Footer lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
