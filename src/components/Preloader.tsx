import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Safety: ensure preloader is removed after a set time even if logic fails
    const safetyTimer = setTimeout(() => {
      setLoading(false);
      document.body.classList.remove('preloader-active');
    }, 4500);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            document.body.classList.remove('preloader-active');
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    document.body.classList.add('preloader-active');

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimer);
      document.body.classList.remove('preloader-active');
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center"
        >
          <div className="text-center px-6">
            <h1 className="font-headline text-xl md:text-2xl font-black text-white tracking-[0.2em] uppercase mb-4">
              IVALDO PONTES FIGUEIREDO
            </h1>
            <div className="w-48 md:w-64 h-[2px] bg-white/10 relative overflow-hidden mx-auto mb-4">
              <motion.div 
                className="absolute left-0 top-0 h-full bg-accent"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="font-mono text-[10px] text-accent tracking-tighter opacity-60">
              LOGGING SYSTEMS: {Math.round(progress)}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
