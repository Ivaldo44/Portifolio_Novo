import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

export default function About() {
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  
  const resumeData = {
    experience: [
      {
        company: "Freelance",
        role: "Desenvolvedor Front-end & WordPress Specialist",
        period: "2021 - Presente",
        description: "Criação de sites institucionais e e-commerces de alto impacto utilizando WordPress e Elementor. Focado em customização técnica via HTML/CSS/JS e otimização de fluxo com IA."
      },
      {
        company: "Digital Solution",
        role: "Web Designer & Developer",
        period: "2019 - 2021",
        description: "Desenvolvimento de interfaces responsivas e manutenção de sistemas web, priorizando usabilidade e performance."
      }
    ],
    skills: ["HTML5", "CSS3 / Sass", "JavaScript", "WordPress", "Elementor", "AI Productivity"]
  };

  return (
    <section className="py-20 px-6 md:px-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative order-2 md:order-1"
      >
        <div className="aspect-square glass rounded-full overflow-hidden border border-accent/30 relative p-4">
          <img 
            alt="Ivaldo Pontes Figueiredo" 
            className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700 rounded-full" 
            src="https://github.com/Ivaldo44.png"
          />
        </div>
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-accent rounded-full" 
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-8 order-1 md:order-2"
      >
        <span className="text-[10px] text-accent tracking-[0.3em] uppercase font-bold">Sobre Mim</span>
        <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-white uppercase tracking-tighter">Quem sou eu?</h2>
        <p className="text-sm leading-relaxed text-muted max-w-prose uppercase tracking-wide font-medium">
          Sou Ivaldo Pontes Figueiredo, desenvolvedor front-end guiado pela conexão entre arte e tecnologia. Crio experiências digitais que unem estética marcante e execução técnica consistente.
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <button 
            onClick={() => setIsManifestoOpen(true)}
            className="bg-accent text-black px-10 py-3 font-sans text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-colors rounded-xl"
          >
            MANIFESTO
          </button>
          <button 
            onClick={() => setIsResumeOpen(true)}
            className="glass text-white px-10 py-3 font-sans text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all rounded-xl"
          >
            CURRÍCULO
          </button>
        </div>
      </motion.div>

      {/* Resume Modal */}
      <AnimatePresence>
        {isResumeOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsResumeOpen(false)}
              className="absolute inset-0 bg-void/95"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-black rounded-[2.5rem] overflow-hidden border border-accent/20 flex flex-col md:flex-row shadow-2xl will-change-transform"
            >
              {/* Left Side: Photo/Info */}
              <div className="w-full md:w-1/3 bg-accent/5 p-10 border-b md:border-b-0 md:border-r border-white/5">
                <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mb-8 border border-accent/30 mx-auto md:mx-0">
                  <span className="text-3xl font-black text-accent tracking-tighter">IF</span>
                </div>
                <h4 className="text-xl font-headline font-black text-white uppercase tracking-tighter mb-2 text-center md:text-left">Ivaldo Figueiredo</h4>
                <p className="text-[10px] text-accent font-black uppercase tracking-[0.3em] mb-10 text-center md:text-left">Dev Front-end</p>
                
                <div className="space-y-6">
                  <div>
                    <h5 className="text-[9px] text-muted font-bold uppercase tracking-[0.4em] mb-3">Skills</h5>
                    <div className="flex flex-wrap gap-2 text-[9px] font-bold text-white tracking-widest leading-none">
                      {resumeData.skills.map(skill => (
                        <span key={skill} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 uppercase">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-6">
                    <h5 className="text-[9px] text-muted font-bold uppercase tracking-[0.4em] mb-3">Links</h5>
                    <div className="space-y-2">
                       <a href="https://github.com/Ivaldo44" target="_blank" className="block text-[10px] text-white/60 hover:text-accent transition-colors font-bold uppercase tracking-widest px-2">Github</a>
                       <a href="https://www.linkedin.com/in/ivaldo-figueiredo/" target="_blank" className="block text-[10px] text-white/60 hover:text-accent transition-colors font-bold uppercase tracking-widest px-2">LinkedIn</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Content */}
              <div className="w-full md:w-2/3 p-10 md:p-16 overflow-y-auto custom-scrollbar bg-void/40">
                <button 
                  onClick={() => setIsResumeOpen(false)}
                  className="absolute top-8 right-8 text-muted hover:text-accent transition-colors"
                >
                  <X size={20} />
                </button>

                <h3 className="text-[10px] text-accent tracking-[0.5em] uppercase font-black mb-10 block">Trajetória</h3>
                
                <div className="space-y-12">
                  {resumeData.experience.map((exp, i) => (
                    <div key={i} className="relative pl-8 border-l border-accent/20">
                      <div className="absolute top-0 left-[-4.5px] w-2 h-2 rounded-full bg-accent" />
                      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                        <h4 className="text-lg font-headline font-black text-white uppercase tracking-tight">{exp.role}</h4>
                        <span className="text-[10px] text-accent font-black tracking-widest whitespace-nowrap">{exp.period}</span>
                      </div>
                      <p className="text-[10px] text-white font-bold opacity-40 uppercase tracking-[0.2em] mb-4">{exp.company}</p>
                      <p className="text-sm text-muted uppercase tracking-wide leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-20 pt-10 border-t border-white/5">
                  <button className="w-full py-4 border border-accent text-accent hover:bg-accent hover:text-black transition-all font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl">
                    Baixar PDF Completo
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Manifesto Modal */}
      <AnimatePresence>
        {isManifestoOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsManifestoOpen(false)}
              className="absolute inset-0 bg-void/95"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-2xl bg-black p-10 md:p-16 rounded-[3rem] border border-accent/20 shadow-2xl will-change-transform"
            >
              <button 
                onClick={() => setIsManifestoOpen(false)}
                className="absolute top-8 right-8 text-muted hover:text-accent transition-colors flex items-center gap-2"
              >
                <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">Fechar</span>
                <X size={20} />
              </button>

              <span className="text-[10px] text-accent tracking-[0.5em] uppercase font-black mb-8 block">Meu Manifesto</span>
              <h3 className="text-3xl md:text-5xl font-headline font-extrabold text-white uppercase tracking-tighter mb-10 leading-none">
                Estética é <span className="text-accent italic font-playfair lowercase">Função</span>.
              </h3>
              
              <div className="space-y-6 text-sm md:text-base leading-relaxed text-muted uppercase tracking-wide font-medium">
                <p>
                  Acredito que a tecnologia deve ser invisível, permitindo que a experiência humana brilhe. Cada pixel deve servir a um propósito e cada interação deve gerar valor real.
                </p>
                <p>
                  O código não é o objetivo final, mas o meio ritualístico para criar conexões entre pessoas e ideias. Busco a perfeição na simplicidade e a elegância na performance.
                </p>
                <p className="text-accent font-black">
                  Design moderno. Performance absoluta. Sem concessões.
                </p>
              </div>

              <div className="mt-12 pt-12 border-t border-white/5 flex justify-between items-center">
                <div className="text-[10px] text-muted font-bold tracking-[0.2em]">IVALDO FIGUEIREDO</div>
                <div className="text-[10px] text-accent font-bold tracking-[0.2em]">© 2024</div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
