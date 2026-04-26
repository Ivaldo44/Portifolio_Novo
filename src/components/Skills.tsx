import { motion } from "motion/react";
import { Layout, Boxes, Code, Figma } from "lucide-react";

const artifacts = [
  { icon: Layout, name: "WordPress" },
  { icon: Boxes, name: "Elementor" },
  { icon: Code, name: "VS Code" },
  { icon: Figma, name: "Figma" },
];

const dialects = [
  { name: "Front-End (HTML/CSS/JS)", level: "75%", label: "Intermediário" },
  { name: "WordPress & Elementor", level: "70%", label: "Intermediário" },
  { name: "Inglês", level: "65%", label: "Intermediário" },
];

export default function Skills() {
  return (
    <section className="py-24 px-6 md:px-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-24">
      {/* Artifacts Grid */}
      <div>
        <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-white uppercase tracking-tighter mb-12">Ferramentas</h2>
        <div className="grid grid-cols-2 gap-4">
          {artifacts.map((art, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5, backgroundColor: "rgba(255, 77, 0, 0.05)" }}
              className="glass p-8 rounded-2xl border-none flex flex-col items-center gap-4 transition-colors group cursor-default"
            >
              <art.icon className="w-10 h-10 text-accent group-hover:scale-110 transition-transform" />
              <p className="font-sans text-[10px] font-black tracking-[0.3em] uppercase text-white">{art.name}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dialects Proficiency */}
      <div>
        <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-white uppercase tracking-tighter mb-12">Especialidades</h2>
        <div className="space-y-10">
          {dialects.map((lang, idx) => (
            <div key={idx} className="space-y-3 font-sans">
              <div className="flex justify-between text-[10px] font-black tracking-[0.3em] uppercase">
                <span className="text-muted">{lang.name}</span>
                <span className="text-accent">{lang.label}</span>
              </div>
              <div className="h-1 w-full bg-glass-bg rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: lang.level }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full ${idx === 0 ? 'bg-white' : 'bg-accent'}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
