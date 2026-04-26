import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, ExternalLink, X, Star, GitFork, Folder } from "lucide-react";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

export default function Repositories() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("https://api.github.com/users/Ivaldo44/repos?sort=updated&per_page=10")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
      })
      .catch(err => console.error("Erro ao buscar repositórios:", err));
  }, []);

  return (
    <section className="py-24 overflow-hidden border-b border-glass-border" id="projects">
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-12 flex justify-between items-end">
        <div>
          <span className="text-[10px] text-accent tracking-[0.3em] uppercase font-bold mb-2 block">Códice Aberto</span>
          <h2 className="text-4xl md:text-6xl font-headline font-extrabold text-white uppercase tracking-tighter">
            Meus <span className="font-playfair italic text-accent lowercase">Projetos</span>
          </h2>
        </div>
        <div className="flex gap-2 mb-2">
          <div className="h-1 w-12 bg-accent/20 rounded-full overflow-hidden">
             <motion.div 
               animate={{ x: ["-100%", "100%"] }}
               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               className="h-full w-1/2 bg-accent"
             />
          </div>
        </div>
      </div>

      {/* Repository Carousel */}
      <div className="relative group">
        <motion.div 
          ref={scrollRef}
          className="flex gap-6 px-6 md:px-10 overflow-x-auto no-scrollbar py-8"
          drag="x"
          dragConstraints={{ right: 0, left: -2000 }}
        >
          {repos.map((repo) => (
            <motion.div
              key={repo.id}
              whileHover={{ y: -10, borderColor: "rgba(56, 176, 0, 0.4)" }}
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.setAttribute('data-rect', JSON.stringify({
                  left: rect.left,
                  top: rect.top,
                  width: rect.width,
                  height: rect.height
                }));
              }}
              onMouseMove={(e) => {
                const el = e.currentTarget;
                const rectStr = el.getAttribute('data-rect');
                if (!rectStr) return;
                const rect = JSON.parse(rectStr);
                
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const xPercent = (x / rect.width - 0.5) * 15;
                const yPercent = (y / rect.height - 0.5) * -15;
                
                // Use requestAnimationFrame for smoother updates
                requestAnimationFrame(() => {
                  el.style.transform = `perspective(1000px) rotateX(${yPercent}deg) rotateY(${xPercent}deg) translateY(-10px)`;
                });
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
              }}
              onClick={() => setSelectedRepo(repo)}
              className="min-w-[300px] md:min-w-[400px] glass p-8 rounded-3xl cursor-pointer transition-transform duration-200 ease-out border-transparent group/card"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-accent">
                  <Folder size={24} />
                </div>
                <Github size={20} className="text-muted group-hover/card:text-accent transition-colors" />
              </div>
              <h3 className="text-2xl font-headline font-extrabold text-white mb-2 line-clamp-1 uppercase tracking-tight">
                {repo.name}
              </h3>
              <p className="text-muted text-[11px] font-medium uppercase tracking-wide mb-8 line-clamp-2 min-h-[32px]">
                {repo.description || "Sem descrição disponível para este repositório."}
              </p>
              
              <div className="flex justify-between items-center pt-6 border-t border-glass-border">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-[10px] font-black text-muted">
                    <Star size={12} className="text-accent" />
                    {repo.stargazers_count}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-black text-muted">
                    <GitFork size={12} className="text-accent" />
                    {repo.forks_count}
                  </div>
                </div>
                {repo.language && (
                  <span className="text-[9px] font-black uppercase tracking-widest text-accent glass px-3 py-1 rounded-full">
                    {repo.language}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal / Popup */}
      <AnimatePresence>
        {selectedRepo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-void/95"
            onClick={() => setSelectedRepo(null)}
          >
            <motion.div 
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full bg-black p-10 md:p-16 rounded-[2.5rem] relative shadow-2xl border border-accent/20 will-change-transform"
            >
              <button 
                onClick={() => setSelectedRepo(null)}
                className="absolute top-8 right-8 text-muted hover:text-accent transition-colors"
              >
                <X size={24} />
              </button>
              
              <span className="text-accent text-[10px] font-black tracking-[0.5em] uppercase mb-4 block">Repositório GitHub</span>
              <h2 className="text-5xl font-headline font-extrabold text-white uppercase tracking-tighter mb-6">
                {selectedRepo.name}
              </h2>
              
              <p className="text-sm text-muted uppercase tracking-wider font-medium leading-relaxed mb-12">
                {selectedRepo.description || "Nenhuma descrição adicional foi fornecida pelo autor para este projeto."}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                <div className="space-y-1">
                  <span className="text-[10px] text-muted font-bold uppercase tracking-widest">Linguagem</span>
                  <p className="text-white text-xs font-black uppercase">{selectedRepo.language || "N/A"}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-muted font-bold uppercase tracking-widest">Stars</span>
                  <p className="text-white text-xs font-black uppercase">{selectedRepo.stargazers_count}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-muted font-bold uppercase tracking-widest">Forks</span>
                  <p className="text-white text-xs font-black uppercase">{selectedRepo.forks_count}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-muted font-bold uppercase tracking-widest">Status</span>
                  <p className="text-accent text-xs font-black uppercase">Online</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <a 
                  href={selectedRepo.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-accent text-black px-10 py-4 font-sans text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all rounded-2xl flex items-center gap-3"
                >
                  <Github size={16} /> Ver no GitHub
                </a>
                <button 
                  onClick={() => setSelectedRepo(null)}
                  className="bg-white/5 text-white border border-white/10 px-10 py-4 font-sans text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all rounded-2xl flex items-center gap-3"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
