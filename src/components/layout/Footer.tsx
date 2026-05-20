import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { company, contact } from "../../data";
import type { Language } from "../../data";

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const isAr = lang === "ar";

  const navLinks = isAr
    ? [
        { label: "الرئيسية", path: "/" },
        { label: "عن الشركة", path: "/about" },
        { label: "مشاريعنا", path: "/projects" },
        { label: "تواصل معنا", path: "/connect" },
      ]
    : [
        { label: "Home", path: "/" },
        { label: "About", path: "/about" },
        { label: "Projects", path: "/projects" },
        { label: "Contact", path: "/connect" },
      ];

  return (
    <footer className="bg-[#0A1628] text-white">
      {/* Gold top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-primary to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-blue-primary flex items-center justify-center shadow-blue">
                <span className="text-white font-bold text-xl leading-none">
                  {isAr ? "ج" : "J"}
                </span>
              </div>
              <div>
                <p className="font-bold text-white text-base">
                  {isAr ? company.shortNameAr : company.shortNameEn}
                </p>
                <p className="text-[10px] text-gold-primary font-medium tracking-wider uppercase">
                  {isAr ? "مقاولات • عقارات" : "Contracting • Real Estate"}
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              {isAr
                ? "نحن لا نبني مجرد هياكل؛ بل نؤسس معالم حضارية في مدينة ترهونة وليبيا."
                : "We don't just build structures; we establish landmarks across Tarhuna and Libya."}
            </p>
            <div className="flex flex-wrap gap-3 text-[10px] text-gray-500 font-mono">
              <span>CR: {company.commercialRegister}</span>
              <span>•</span>
              <span>Lic: {company.licenseNumber}</span>
              <span>•</span>
              <span>{isAr ? "تأسست" : "Est."} {company.established}</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-gold-primary font-semibold text-sm uppercase tracking-widest mb-5">
              {isAr ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-primary/50 group-hover:bg-gold-primary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold-primary font-semibold text-sm uppercase tracking-widest mb-5">
              {isAr ? "تواصل معنا" : "Contact"}
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors duration-200 group"
                >
                  <Phone size={15} className="mt-0.5 text-gold-primary shrink-0" />
                  <span className="text-sm" dir="ltr">{contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.emails[0]}`}
                  className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <Mail size={15} className="mt-0.5 text-gold-primary shrink-0" />
                  <span className="text-sm break-all">{contact.emails[0]}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={15} className="mt-0.5 text-gold-primary shrink-0" />
                <span className="text-sm">
                  {isAr ? company.headquartersAr : company.headquartersEn}
                </span>
              </li>
              <li>
                <a
                  href={`https://wa.me/${contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors duration-200 text-sm"
                >
                  <ExternalLink size={13} />
                  WhatsApp: {contact.whatsappDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()}{" "}
            {isAr ? company.shortNameAr : company.shortNameEn}.{" "}
            {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
          <p className="text-gray-600 text-xs">
            {isAr ? "ترهونة، ليبيا" : "Tarhuna, Libya"}
          </p>
        </div>
      </div>
    </footer>
  );
}
