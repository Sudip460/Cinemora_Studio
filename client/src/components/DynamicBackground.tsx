import { motion } from "framer-motion";

export function DynamicBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Grid Background */}
      <svg className="absolute inset-0 w-full h-full opacity-70 dark:opacity-20" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="hsl(var(--primary) / 0.3)" strokeWidth="0.5"/>
          </pattern>
          <pattern id="grid-lg" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="hsl(var(--secondary) / 0.2)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#grid-lg)" />
      </svg>

      {/* Animated Timeline Elements */}
      <motion.div
        className="absolute top-1/3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        animate={{ 
          x: [-100, 100],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-2/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-secondary/30 to-transparent"
        animate={{ 
          x: [100, -100],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Flare Effects */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={`flare-${i}`}
          className="absolute w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: i % 2 === 0 
              ? "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)"
              : "radial-gradient(circle, hsl(var(--secondary) / 0.15) 0%, transparent 70%)",
            top: `${25 * i}%`,
            left: `${30 * i}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Particle Timeline Dots */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: `hsl(${263 + i * 10} 70% 50%)`,
            left: `${10 + i * 12.5}%`,
            top: "40%",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3 + i * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        />
      ))}

      {/* Editing Software UI Frames */}
      <motion.div
        className="absolute top-1/4 -left-20 w-96 h-24 border-2 border-primary/20 rounded-lg opacity-30"
        animate={{ rotate: [0, 5, -5, 0], x: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute h-full w-1/4 border-r border-primary/20"
            style={{ left: `${i * 25}%` }}
          />
        ))}
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 -right-20 w-80 h-20 border-2 border-secondary/20 rounded-lg opacity-30"
        animate={{ rotate: [0, -5, 5, 0], x: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute h-full w-1/8 border-r border-secondary/20"
            style={{ left: `${i * 12.5}%` }}
          />
        ))}
      </motion.div>

      {/* Scan Line Effects */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`scan-${i}`}
          className="absolute w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent"
          animate={{
            y: ["0%", "100%"],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 1.2,
          }}
        />
      ))}

      {/* Color Correction Circles */}
      {[...Array(5)].map((_, i) => {
        const colors = ["primary", "secondary", "accent"];
        const color = colors[i % colors.length];
        return (
          <motion.div
            key={`color-${i}`}
            className="absolute rounded-full opacity-20"
            style={{
              width: 40 + i * 20,
              height: 40 + i * 20,
              border: `2px solid hsl(var(--${color}))`,
              left: `${15 + i * 18}%`,
              top: `${60 + i * 5}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + i * 0.8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}

      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            background: `hsl(${263 + Math.random() * 100} 70% 50%)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Light Theme Enhanced - Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-orange-50/20 to-pink-50/40 dark:from-transparent dark:via-transparent dark:to-transparent pointer-events-none" />

      {/* Light Theme Animated Shapes */}
      <motion.div
        className="absolute top-10 right-10 w-72 h-72 rounded-full dark:hidden"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-20 left-20 w-80 h-80 rounded-full dark:hidden"
        style={{
          background: "radial-gradient(circle, rgba(249, 115, 22, 0.25) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -15, 0],
          y: [0, 25, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/3 w-96 h-96 rounded-full dark:hidden"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

    </div>
  );
}
