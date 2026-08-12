import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { AnimatedLogo } from "./AnimatedLogo";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after logo animation completes (3.5s)
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => {
        if (fadeOut) {
          onComplete();
        }
      }}
    >
      <AnimatedLogo />
    </motion.div>
  );
}
