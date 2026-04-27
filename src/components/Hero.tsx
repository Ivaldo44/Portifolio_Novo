import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-10 pt-32 pb-20 max-w-7xl mx-auto relative overflow-hidden">
      <div className="w-full md:w-1/2 z-20 space-y-6">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1] mb-6 text-white uppercase flex flex-col">
            <span>IVALDO PONTES</span>
            <span className="text-accent">FIGUEIREDO</span>
          </h1>
          <p className="text-muted text-sm max-w-sm leading-relaxed uppercase tracking-wider font-semibold">
            Desenvolvendo interfaces limpas e eficientes, unindo design moderno e performance.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4 pt-4"
        >
          <div className="h-0.5 w-12 bg-accent mt-3"></div>
          <p className="font-sans text-[10px] text-white uppercase tracking-[0.2em] font-semibold">
            Arquiteto de experiências digitais &<br />Desenvolvedor front-end
          </p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="w-full md:w-1/2 mt-12 md:mt-0 relative z-20 flex justify-center"
      >
        <div className="relative group p-4 glass rounded-[2rem]">
          <img 
            alt="Surreal digital artwork" 
            className="w-full max-w-sm grayscale object-cover aspect-[4/5] brightness-75 group-hover:brightness-100 transition-all duration-700 rounded-[1.5rem]"
            src="https://github.com/Ivaldo44.png"
          />
          <div className="absolute top-8 right-8 w-12 h-12 rounded-full glass flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-accent rounded-sm animate-pulse"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
