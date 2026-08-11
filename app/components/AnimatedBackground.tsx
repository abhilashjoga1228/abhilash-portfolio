"use client";

import { motion } from "framer-motion";

const nodes = [
  {
    name: "Swire Coca-Cola",
    logo: "/Logos/swire.jpg",
    position: "top-[10%] left-[8%]",
    size: "h-16 w-16",
  },
  {
    name: "Microsoft Fabric",
    logo: "/Logos/fabric.png",
    position: "top-[12%] left-[30%]",
    size: "h-16 w-16",
  },
  {
    name: "SQL",
    logo: "/Logos/sql.png",
    position: "top-[18%] right-[45%]",
    size: "h-12 w-12",
  },
  {
    name: "Azure",
    logo: "/Logos/azure.png",
    position: "top-[35%] left-[8%]",
    size: "h-14 w-14",
  },
  {
    name: "Databricks",
    logo: "/Logos/databricks.png",
    position: "top-[22%] right-[10%]",
    size: "h-14 w-14",
  },
  {
    name: "Adobe",
    logo: "/Logos/adobe.png",
    position: "top-[55%] right-[12%]",
    size: "h-16 w-16",
  },
  {
    name: "Amazon",
    logo: "/Logos/amazon.png",
    position: "bottom-[28%] left-[5%]",
    size: "h-16 w-16",
  },
  {
    name: "Snowflake",
    logo: "/Logos/snowflake.png",
    position: "bottom-[0%] left-[28%]",
    size: "h-14 w-14",
  },
  {
    name: "Power BI",
    logo: "/Logos/powerbi.png",
    position: "top-[15%] right-[28%]",
    size: "h-16 w-16",
  },
  {
    name: "Power Platform",
    logo: "/Logos/powerplatform.png",
    position: "bottom-[12%] left-[48%]",
    size: "h-14 w-14",
  },
  {
    name: "Python",
    logo: "/Logos/python.png",
    position: "bottom-[15%] left-[10%]",
    size: "h-12 w-12",
  },
  {
    name: "SAP",
    logo: "/Logos/sap.png",
    position: "bottom-[5%] right-[25%]",
    size: "h-14 w-14",
  },
];

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
    <div className="absolute inset-0 overflow-hidden">
      {/* Background Grid */}
      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(rgba(59,130,246,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.025)_1px,transparent_1px)]
          bg-[size:80px_80px]
        "
      />

      {/* Main AI/Data Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[600px]
          w-[600px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-blue-600/20
          blur-[160px]
        "
      />

      {/* Floating Technology Logos */}
      {nodes.map((node, index) => (
        <motion.div
          key={node.name}
          animate={{
            y: [0, -40, 0, 25, 0],
            x: [0, 20, -15, 10, 0],
            scale: [1, 1.06, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 5 + (index % 3),
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut",
          }}
          className={`
            absolute
            ${node.position}
            group
            hidden
            flex-col
            items-center
            gap-2
            md:flex
          `}
        >
          <div
            className="
              rounded-2xl
              border
              border-blue-400/30
              bg-slate-950/80
              p-4
              backdrop-blur-xl
              shadow-[0_0_35px_rgba(59,130,246,0.35)]
            "
          >
            <img
              src={node.logo}
              alt={node.name}
              className={`
                ${node.size}
                rounded-xl
                object-contain
              `}
            />
          </div>

          <span
            className="
              text-xs
              text-blue-300
              opacity-70
              transition
              group-hover:text-cyan-300
            "
          >
            {node.name}
          </span>
        </motion.div>
      ))}

      {/* Floating Data Particles */}
      {particles.map((position, index) => (
        <motion.div
          key={index}
          animate={{
            y: [0, -120, 0],
            opacity: [0.1, 0.8, 0.1],
          }}
          transition={{
            duration: 5 + (index % 5),
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut",
          }}
          className="
            absolute
            h-1.5
            w-1.5
            rounded-full
            bg-cyan-400
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