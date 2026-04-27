import { useEffect, useState } from "react";

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Progress simulation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 40);

    // Fade out after 3.5 seconds anyway
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setShouldRender(false);
        document.body.style.overflow = "";
      }, 1000);
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="text-center px-6">
        <h1 className="font-headline text-xl md:text-2xl font-black text-white tracking-[0.2em] uppercase mb-4 animate-pulse">
          IVALDO PONTES FIGUEIREDO
        </h1>
        <div className="w-48 md:w-64 h-[2px] bg-white/10 relative overflow-hidden mx-auto mb-4">
          <div 
            className="absolute left-0 top-0 h-full bg-accent transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="font-mono text-[10px] text-accent tracking-tighter opacity-60">
          INITIALIZING CORE SYSTEMS...
        </div>
      </div>
    </div>
  );
};

export default Preloader;
