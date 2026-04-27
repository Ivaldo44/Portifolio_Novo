import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { name: "GitHub", href: "https://github.com/Ivaldo44", isExternal: true },
    { name: "Twitter", href: "https://x.com/IvaldoF77627", isExternal: true },
    { name: "Portfólio", href: "#projects" },
    { name: "Contato", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full bg-transparent">
      <nav className="flex justify-between items-center w-full px-6 md:px-10 py-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 1, x: 0 }}
          className="text-xl md:text-2xl font-headline font-extrabold tracking-tighter text-white uppercase"
        >
          Ivaldo<span className="text-accent"> Figueiredo</span>
        </motion.div>
        
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.2em] font-black text-muted">
            {links.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
                className="hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden text-white hover:text-accent transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-void flex flex-col p-10 md:hidden"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="text-xl font-headline font-extrabold tracking-tighter text-white uppercase">
                Ivaldo<span className="text-accent"> F.</span>
              </span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-accent"
              >
                <X size={32} />
              </button>
            </div>
            
            <nav className="flex flex-col gap-8">
              {links.map((link, idx) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                  className="text-4xl font-headline font-extrabold text-white uppercase tracking-tighter hover:text-accent transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
            
            <div className="mt-auto">
              <p className="text-[10px] text-muted font-bold uppercase tracking-[0.3em] mb-4">Conecte-se</p>
              <div className="h-0.5 w-12 bg-accent"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
