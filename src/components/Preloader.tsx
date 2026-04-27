import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Bloqueia o scroll enquanto carrega
    document.body.style.overflow = "hidden";

    const startTime = Date.now();
    const duration = 2000; // Tempo desejado de loading
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(calculatedProgress);

      if (calculatedProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = "auto";
        }, 500);
      }
    }, 50);

    // Timeout de segurança (Máximo 5 segundos)
    const safetyTimeout = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "auto";
      clearInterval(interval);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center pointer-events-auto"
        >
          <div className="relative flex flex-col items-center">
            <div className="mb-12 text-center">
              <h1 className="font-headline text-2xl font-black text-white tracking-[0.2em] uppercase mb-2">
                Ivaldo Pontes Figueiredo
              </h1>
              <p className="font-mono text-[10px] text-accent tracking-widest uppercase opacity-60">
                Front-end Developer & WordPress Specialist
              </p>
            </div>

            <div className="w-64 h-[1px] bg-white/5 relative overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <div className="mt-4 font-mono text-[10px] text-muted tracking-tighter opacity-40">
              {Math.round(progress)}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
