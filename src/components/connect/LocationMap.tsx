import { MapPin, ExternalLink } from "lucide-react";
import { company, contact } from "../../data";
import type { Language } from "../../data";

interface LocationMapProps {
  lang: Language;
}

export default function LocationMap({ lang }: LocationMapProps) {
  const isAr = lang === "ar";

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
        {/* Map header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-primary/8 flex items-center justify-center">
              <MapPin size={15} className="text-blue-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">
                {isAr ? "موقعنا" : "Our Location"}
              </p>
              <p className="text-xs text-text-secondary">
                {isAr ? company.headquartersAr : company.headquartersEn}
              </p>
            </div>
          </div>
          <a
            href="https://maps.google.com/?q=Tarhuna,Libya"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-blue-primary hover:text-blue-dark transition-colors font-medium"
          >
            <ExternalLink size={12} />
            {isAr ? "افتح في الخرائط" : "Open in Maps"}
          </a>
        </div>

        {/* Embedded map */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={contact.mapEmbedUrl}
            title={isAr ? "موقع شركة الجيحان — ترهونة" : "Jihan Company Location — Tarhuna"}
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Address card */}
      <div className="bg-[#0A1628] rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-primary/8 rounded-full blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-gold-primary/15 flex items-center justify-center shrink-0 mt-0.5">
              <MapPin size={15} className="text-gold-primary" />
            </div>
            <div>
              <p className="text-white/50 text-xs uppercase tracking-widest mb-1">
                {isAr ? "المقر الرئيسي" : "Headquarters"}
              </p>
              <p className="font-semibold text-white text-sm">
                {isAr ? company.headquartersAr : company.headquartersEn}
              </p>
              <p className="text-white/40 text-xs mt-1">
                {isAr ? "ليبيا" : "Libya"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
