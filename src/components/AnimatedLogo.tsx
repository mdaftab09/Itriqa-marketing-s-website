import { motion } from 'framer-motion';

export function AnimatedLogo() {
  const goldColor = "var(--accent)";
  const darkColor = "#0B0B0B";
  const letters = ["i", "r", "t", "i", "q", "a"];

  // Different starting positions for each letter
  const startPositions = [
    { x: -200, y: -150, rotate: -45 },
    { x: 150, y: -200, rotate: 90 },
    { x: -180, y: 180, rotate: -90 },
    { x: 200, y: 150, rotate: 45 },
    { x: -150, y: -180, rotate: 135 },
    { x: 180, y: 200, rotate: -135 },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-1 justify-center">
        <div className="flex items-end relative">
          {letters.map((letter, index) => {
            const delay = index * 0.2;
            const startPos = startPositions[index];

            return (
              <motion.div
                key={index}
                className="relative"
                initial={{
                  x: startPos.x,
                  y: startPos.y,
                  rotate: startPos.rotate,
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  delay: delay,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontWeight: 700,
                  fontSize: "112px",
                  lineHeight: 0.8,
                  color: goldColor,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {letter}

                {/* Decorative gold particles on the "q" letter */}
                {index === 4 && (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={`particle-${i}`}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          background: goldColor,
                          left: "50%",
                          top: "50%",
                          marginLeft: "-4px",
                        }}
                        initial={{
                          x: 0,
                          y: 0,
                          scale: 0,
                          opacity: 0,
                        }}
                        animate={{
                          x: Math.cos(i * 45 * (Math.PI / 180)) * 40,
                          y: Math.sin(i * 45 * (Math.PI / 180)) * 40,
                          scale: [0, 1.5, 0.5],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          delay: delay + 0.9,
                          duration: 0.6,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: letters.length * 0.1 + 1.5,
            duration: 0.6,
            type: "spring",
            stiffness: 150,
          }}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 300,
            fontSize: "36px",
            color: darkColor,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}
        >
          marketing
        </motion.div>

        {/* Gold line accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            delay: letters.length * 0.1 + 2,
            duration: 0.8,
            ease: "easeOut",
          }}
          className="w-24 h-0.5 mt-2"
          style={{ background: goldColor }}
        />
      </div>
    </div>
  );
}
