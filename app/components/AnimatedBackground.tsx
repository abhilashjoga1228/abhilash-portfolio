"use client";

import { motion } from "framer-motion";

const particles = [
  [10, 20],
  [25, 70],
  [40, 35],
  [55, 80],
  [70, 25],
  [85, 60],
  [15, 90],
  [35, 10],
  [60, 50],
  [90, 30],
  [45, 75],
  [75, 85],
  [20, 45],
  [65, 15],
  [95, 75],
  [30, 55],
  [80, 40],
  [50, 90],
  [12, 65],
  [88, 15],
];

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Grid */}
      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(rgba(59,130,246,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.035)_1px,transparent_1px)]
          bg-[size:80px_80px]
          dark:bg-[linear-gradient(rgba(59,130,246,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.025)_1px,transparent_1px)]
        "
      />

      {/* Main glow */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.18, 0.32, 0.18],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-[42%]
          h-[560px]
          w-[560px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-blue-400/15
          blur-[150px]
          dark:bg-blue-600/20
        "
      />

      {/* Secondary glow */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          opacity: [0.08, 0.18, 0.08],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          right-[10%]
          top-[20%]
          h-[320px]
          w-[320px]
          rounded-full
          bg-cyan-300/10
          blur-[120px]
          dark:bg-cyan-500/10
        "
      />

      {/* Floating particles */}
      {particles.map((position, index) => (
        <motion.div
          key={index}
          animate={{
            y: [0, -80, 0],
            opacity: [0.08, 0.45, 0.08],
          }}
          transition={{
            duration: 6 + (index % 5),
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut",
          }}
          className="
            absolute
            h-1
            w-1
            rounded-full
            bg-blue-500/50
            dark:bg-cyan-400/60
          "
          style={{
            left: `${position[0]}%`,
            top: `${position[1]}%`,
          }}
        />
      ))}
    </div>
  );
}