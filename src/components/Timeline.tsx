import { motion } from "motion/react";

interface TimelineEvent {
  period: string;
  title: string;
  location: string;
  bullets?: string[];
  description?: string;
  color: string;
}

const events: TimelineEvent[] = [
  {
    period: "2026 — PRESENTE",
    title: "Jovem Aprendiz em Desenvolvimento / Automação",
    location: "NIT LabCedro",
    bullets: [
      "Atuação no desenvolvimento de soluções internas, incluindo automação de processos com Python para organização de dados e documentos.",
      "Criação de aplicações para estruturar informações (como PDFs em tabelas), com foco em eficiência operacional e melhoria de fluxo de trabalho.",
      "Apoio em demandas técnicas e aprendizado prático em desenvolvimento de sistemas."
    ],
    color: "bg-accent"
  },
  {
    period: "2021 — 2025",
    title: "Desenvolvedor Front-end & WordPress Specialist",
    location: "FREELANCE",
    bullets: [
      "Desenvolvimento de projetos como Boca no Mundo Imóveis e MID – Minha Imobiliária Digital.",
      "Criação de plataformas imobiliárias com cadastro dinâmico, filtros personalizados e integração de mapas.",
      "Customização técnica via HTML/CSS/JS e estruturação de dados com Pods e ACF."
    ],
    color: "bg-accent"
  },
  {
    period: "2019 — 2021",
    title: "Web Designer & Developer",
    location: "DIGITAL SOLUTION",
    bullets: [
      "Desenvolvimento de interfaces responsivas e manutenção de sistemas web.",
      "Foco em usabilidade e performance em projetos institucionais.",
      "Implementação de soluções digitais focadas na experiência do usuário."
    ],
    color: "bg-muted"
  }
];

export default function Timeline() {
  return (
    <section className="py-20 border-y border-glass-border" id="timeline">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <h2 className="text-5xl font-headline font-extrabold text-white uppercase tracking-tighter mb-16">
          Minha<br /><span className="font-playfair italic text-accent lowercase">Jornada</span>
        </h2>
        
        <div className="relative border-l border-glass-border ml-4 md:ml-0 space-y-12">
          {events.map((event, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative pl-12"
            >
              <div className={`absolute -left-[9px] top-0 w-4 h-4 ${idx === 0 ? 'bg-accent' : 'bg-muted'} rounded-full`} />
              <div className="glass p-8 rounded-2xl hover:border-accent/40 transition-colors group">
                <span className="font-sans text-[10px] text-accent uppercase tracking-[0.3em] font-black">{event.period}</span>
                <h3 className="text-2xl font-headline font-extrabold mt-2 text-white">{event.title}</h3>
                <p className="font-sans text-muted mb-4 text-[10px] tracking-[0.2em] uppercase font-bold">{event.location}</p>
                
                {event.bullets ? (
                  <ul className="space-y-3">
                    {event.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-[11px] text-muted font-medium uppercase tracking-wide">
                        <span className="mt-1.5 w-8 h-1 bg-accent/20 flex-shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : event.description ? (
                  <p className="text-[11px] text-muted font-medium uppercase tracking-wide leading-relaxed">
                    {event.description}
                  </p>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
