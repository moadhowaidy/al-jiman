import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { company } from "../../data";
import type { Language } from "../../data";

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
}

const navLinks = {
  en: [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Projects", path: "/projects" },
    { label: "Contact", path: "/connect" },
  ],
  ar: [
    { label: "الرئيسية", path: "/" },
    { label: "عن الشركة", path: "/about" },
    { label: "مشاريعنا", path: "/projects" },
    { label: "تواصل معنا", path: "/connect" },
  ],
};

export default function Navbar({ lang, onToggleLang }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const links = navLinks[lang];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={[
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-3">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <img src="/al-jiman-logo.png" alt="Al-Jiman Company Logo" className="h-12 sm:h-14 w-auto object-contain shrink-0" />
              <div className="hidden sm:block">
                <p className={[
                  "font-bold leading-tight transition-colors duration-200",
                  scrolled ? "text-blue-primary" : "text-blue-primary",
                  lang === "ar" ? "text-base" : "text-sm",
                ].join(" ")}>
                  {lang === "ar" ? company.shortNameAr : company.shortNameEn}
                </p>
                <p className="text-[10px] text-gold-primary font-medium tracking-wider uppercase">
                  {lang === "ar" ? "مقاولات • عقارات" : "Contracting • Real Estate"}
                </p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {links.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={[
                      "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                      isActive
                        ? "text-blue-primary"
                        : "text-gray-dark hover:text-blue-primary hover:bg-blue-primary/5",
                    ].join(" ")}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 inset-x-3 h-0.5 bg-gold-primary rounded-full"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Language toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onToggleLang}
                aria-label="Toggle language"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gold-primary/40 text-gold-primary hover:bg-gold-primary/10 hover:border-gold-primary transition-all duration-200 text-sm font-semibold cursor-pointer"
              >
                <Globe size={14} />
                <span>{lang === "en" ? "عربي" : "EN"}</span>
              </motion.button>

              {/* CTA button (desktop) */}
              <Link
                to="/connect"
                className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-blue-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-dark transition-all duration-200 shadow-sm"
              >
                {lang === "ar" ? "تواصل معنا" : "Get In Touch"}
              </Link>

              {/* Hamburger (mobile) */}
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Toggle menu"
                className="lg:hidden p-2 rounded-lg text-blue-primary hover:bg-blue-primary/10 transition-colors duration-200 cursor-pointer"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: lang === "ar" ? "-100%" : "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: lang === "ar" ? "-100%" : "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={[
                "fixed top-0 bottom-0 z-50 w-72 bg-white shadow-2xl lg:hidden",
                "flex flex-col overflow-y-auto",
                lang === "ar" ? "left-0" : "right-0",
              ].join(" ")}
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <img src="/al-jiman-logo.png" alt="Al-Jiman Company Logo" className="h-10 w-auto object-contain shrink-0" />
                  <div>
                    <p className="font-bold text-blue-primary">
                      {lang === "ar" ? company.shortNameAr : company.shortNameEn}
                    </p>
                    <p className="text-[10px] text-gold-primary font-medium uppercase tracking-wider">
                      {lang === "ar" ? "مقاولات • عقارات" : "Contracting • Real Estate"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  <X size={20} className="text-gray-mid" />
                </button>
              </div>

              <nav className="flex flex-col p-4 gap-1 flex-1">
                {links.map((link, i) => {
                  const isActive = pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        className={[
                          "flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200",
                          isActive
                            ? "bg-blue-primary text-white"
                            : "text-gray-dark hover:bg-off-white hover:text-blue-primary",
                        ].join(" ")}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="p-5 border-t border-gray-100">
                <Link
                  to="/connect"
                  className="flex items-center justify-center w-full px-5 py-3 bg-blue-primary text-white text-sm font-semibold rounded-xl hover:bg-blue-dark transition-all duration-200"
                >
                  {lang === "ar" ? "تواصل معنا" : "Get In Touch"}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
