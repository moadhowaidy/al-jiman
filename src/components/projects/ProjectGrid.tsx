import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FileText, Calendar, Truck, Building2, Home, Wrench } from "lucide-react";
import { projects } from "../../data";
import type { Language } from "../../data";

interface ProjectGridProps {
  lang: Language;
}

const categoryIcons: Record<string, React.ElementType> = {
  roads: Truck,
  buildings: Building2,
  realestate: Home,
  maintenance: Wrench,
};

const categoryColors: Record<string, string> = {
  roads: "bg-blue-50 text-blue-700 border-blue-200",
  buildings: "bg-amber-50 text-amber-700 border-amber-200",
  realestate: "bg-emerald-50 text-emerald-700 border-emerald-200",
  maintenance: "bg-orange-50 text-orange-700 border-orange-200",
};

export default function ProjectGrid({ lang }: ProjectGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isAr = lang === "ar";
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filters = isAr
    ? [
        { key: "all", label: "الكل" },
        { key: "roads", label: "الطرق" },
        { key: "buildings", label: "المباني" },
        { key: "realestate", label: "العقارات" },
        { key: "maintenance", label: "الصيانة" },
      ]
    : [
        { key: "all", label: "All" },
        { key: "roads", label: "Roads" },
        { key: "buildings", label: "Buildings" },
        { key: "realestate", label: "Real Estate" },
        { key: "maintenance", label: "Maintenance" },
      ];

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={
                activeFilter === f.key
                  ? "shrink-0 bg-[#C5A059] text-[#0A1628] px-6 py-2 rounded-full text-lg font-bold shadow-md cursor-pointer transition-all duration-200"
                  : "shrink-0 bg-transparent border-2 border-gray-300 text-gray-500 hover:border-[#C5A059] hover:text-[#C5A059] px-6 py-2 rounded-full text-lg font-medium transition-all duration-200 cursor-pointer"
              }
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const Icon = categoryIcons[project.category] || Building2;
              const colorClass = categoryColors[project.category];

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: "easeOut" }}
                  className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-[#C5A059]/40 hover:shadow-xl transition-all duration-300"
                >
                  {/* Card visual band */}
                  <div className="relative w-full h-56 overflow-hidden rounded-t-xl shrink-0">
                    <img
                      src={project.imageUrl}
                      alt={isAr ? project.titleAr : project.titleEn}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#0A1628]/50 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/95 via-[#0A1628]/40 to-transparent"></div>
                    <div className="absolute top-3 end-3 z-10">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-[10px] font-mono">
                        <FileText size={9} />
                        {project.contractNumber}
                      </span>
                    </div>
                    <div className="absolute bottom-3 start-3 z-10">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#C5A059]/90 text-white text-[10px] font-semibold">
                        <Calendar size={9} />
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="p-6">
                    <span
                      className={[
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border mb-3",
                        colorClass,
                      ].join(" ")}
                    >
                      <Icon size={10} />
                      {filters.find((f) => f.key === project.category)?.label}
                    </span>

                    <h3 className="font-bold text-gray-900 text-base leading-snug mb-2">
                      {isAr ? project.titleAr : project.titleEn}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                      {isAr ? project.descAr : project.descEn}
                    </p>

                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                        {isAr ? "الجهة المُوَكِّلة" : "Client"}
                      </p>
                      <p className="text-sm font-semibold text-[#005A9C] mt-0.5">
                        {isAr ? project.contractorAr : project.contractorEn}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-base">
              {isAr ? "لا توجد مشاريع في هذه الفئة." : "No projects in this category."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
