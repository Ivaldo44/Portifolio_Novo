import { Github, Linkedin, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-void py-20 border-t border-glass-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex flex-col gap-4">
          <div className="font-headline font-black text-white/20 tracking-[0.3em] uppercase text-[10px]">
            © 2026 IVALDO PONTES FIGUEIREDO <span className="text-accent ml-2">•</span>
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/Ivaldo44" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
              <Github size={16} />
            </a>
            <a href="https://x.com/IvaldoF77627" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
              <Twitter size={16} />
            </a>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {[
            { label: "Projetos", href: "#projects" },
            { label: "Rede", href: "#contact" },
            { label: "Arquivo", href: "#timeline" }
          ].map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="font-headline text-[10px] tracking-[0.4em] uppercase text-muted hover:text-accent transition-colors font-black"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
