import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A'
      );
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Unified custom cursor that follows the mouse instantly */}
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
          backgroundColor: isPointer ? "rgba(56, 176, 0, 0.2)" : "transparent",
          borderColor: isPointer ? "rgba(56, 176, 0, 1)" : "rgba(56, 176, 0, 0.6)",
          borderWidth: isPointer ? 1 : 2,
        }}
      >
        <motion.div 
          className="w-1 h-1 bg-accent rounded-full"
          animate={{
            scale: isPointer ? 0 : 1,
          }}
        />
      </motion.div>
    </div>
  );
}
