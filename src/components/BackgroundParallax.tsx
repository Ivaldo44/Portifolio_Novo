import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function BackgroundParallax() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] opacity-[0.03] grayscale bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]"
      />
    </div>
  );
}
