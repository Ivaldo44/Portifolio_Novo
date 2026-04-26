import { useEffect, useState } from "react";
import { motion, useMotionValue } from "motion/react";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
      
      const target = e.target as HTMLElement;
      // Faster target check instead of getComputedStyle
      const isClickable = target.closest('button, a, .cursor-pointer') !== null;
      if (isPointer !== isClickable) setIsPointer(isClickable);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isPointer, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-accent flex items-center justify-center -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          width: 20,
          height: 20,
        }}
        animate={{
          scale: isClicked ? 0.8 : (isPointer ? 2.5 : 1),
          backgroundColor: isPointer ? "rgba(56, 176, 0, 0.1)" : "rgba(255, 255, 255, 0)",
          borderColor: isPointer ? "rgba(56, 176, 0, 1)" : "rgba(56, 176, 0, 0.4)",
        }}
        transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.5 }}
      >
        <div className={`w-1 h-1 bg-accent rounded-full transition-transform duration-200 ${isPointer ? 'scale-0' : 'scale-100'}`} />
      </motion.div>
    </div>
  );
}
