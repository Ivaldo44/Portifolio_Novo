import { motion, AnimatePresence } from "motion/react";
import { Mail, Github, Twitter, Phone, Linkedin, Check, Copy } from "lucide-react";
import { useState } from "react";

const links = [
  { icon: Github, label: "github.com/Ivaldo44", href: "https://github.com/Ivaldo44", type: "link" },
  { icon: Twitter, label: "x.com/IvaldoF77627", href: "https://x.com/IvaldoF77627", type: "link" },
  { icon: Linkedin, label: "linkedin.com/in/ivaldo-figueiredo", href: "https://www.linkedin.com/in/ivaldo-figueiredo/", type: "link" },
  { icon: Mail, label: "ivaldopfg@gmail.com", value: "ivaldopfg@gmail.com", type: "copy" },
  { icon: Phone, label: "98 987884984", value: "98987884984", type: "copy" },
];

export default function Contact() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="py-24 px-6 md:px-10 border-t border-white/5" id="contact">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-headline font-extrabold text-white uppercase tracking-tighter mb-4">Contato</h2>
        <p className="text-accent text-[10px] font-black tracking-[0.5em] uppercase mb-16">Conexão Estabelecida</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {links.map((link, idx) => {
            const isCopy = link.type === "copy";
            const id = `contact-${idx}`;
            
            const content = (
              <motion.div
                whileHover={{ scale: 1.05, borderColor: "rgba(56, 176, 0, 0.4)" }}
                className={`glass p-10 group transition-all duration-500 rounded-3xl flex flex-col items-center gap-6 border border-white/5 relative overflow-hidden h-full ${isCopy ? "cursor-pointer" : ""}`}
                onClick={isCopy ? () => handleCopy(link.value!, id) : undefined}
              >
                <div className="relative">
                  <link.icon className="w-6 h-6 text-white group-hover:text-accent transition-colors" />
                  <AnimatePresence>
                    {copiedId === id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute inset-0 text-accent flex items-center justify-center bg-void"
                      >
                        <Check size={20} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <p className="font-sans text-[10px] font-black tracking-[0.2em] uppercase text-muted group-hover:text-white transition-colors break-all">
                  {link.label}
                </p>

                {isCopy && (
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-40 transition-opacity">
                    <Copy size={12} className="text-accent" />
                  </div>
                )}

                <AnimatePresence>
                  {copiedId === id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-4 text-[8px] font-black text-accent uppercase tracking-widest"
                    >
                      Copiado!
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );

            if (isCopy) {
              return <div key={idx} className="h-full">{content}</div>;
            }

            return (
              <a key={idx} href={link.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
