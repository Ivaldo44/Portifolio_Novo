import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, memo } from "react";

const Preloader = memo(() => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const startLoading = () => {
      interval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => setLoading(false), 300);
            return 100;
          }
          const increment = Math.random() * 20;
          return Math.min(oldProgress + increment, 100);
        });
      }, 100);
    };

    startLoading();
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center pointer-events-auto"
        >
          <div className="relative flex flex-col items-center">
            {/* Logo with hardware acceleration */}
            <div className="mb-12 text-center will-change-opacity">
              <h1 className="font-headline text-2xl font-black text-white tracking-[0.2em] uppercase mb-2">
                Ivaldo Pontes Figueiredo
              </h1>
              <p className="font-mono text-[10px] text-accent tracking-widest uppercase opacity-60">
                Front-end Developer & WordPress Specialist
              </p>
            </div>

            {/* Optimized Progress Bar */}
            <div className="w-64 h-[1px] bg-white/5 relative overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-accent will-change-[width]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
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
});

Preloader.displayName = "Preloader";

export default Preloader;
