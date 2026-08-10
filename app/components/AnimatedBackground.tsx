"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">


      {/* Subtle Grid */}
      <div
        className="
        absolute inset-0
        bg-[linear-gradient(rgba(59,130,246,0.025)_1px,transparent_1px),
        linear-gradient(90deg,rgba(59,130,246,0.025)_1px,transparent_1px)]
        bg-[size:80px_80px]
        "
      />



      {/* Main AI Glow */}
      <motion.div

        animate={{
          scale:[1,1.2,1],
          opacity:[0.25,0.45,0.25]
        }}

        transition={{
          duration:10,
          repeat:Infinity,
          ease:"easeInOut"
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
        blur-[150px]
        "
      />





      {/* Secondary Purple Glow */}

      <motion.div

        animate={{
          x:[0,80,0],
          y:[0,-50,0]
        }}

        transition={{
          duration:15,
          repeat:Infinity
        }}

        className="
        absolute
        right-20
        top-32
        h-72
        w-72
        rounded-full
        bg-purple-600/10
        blur-[120px]
        "
      />





      {/* Data Flow Lines */}

      <motion.div

        animate={{
          opacity:[0.1,0.5,0.1]
        }}

        transition={{
          duration:6,
          repeat:Infinity
        }}

        className="
        absolute
        left-1/2
        top-1/2
        h-[500px]
        w-[500px]
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        border
        border-blue-400/10
        "
      />



      <motion.div

        animate={{
          rotate:360
        }}

        transition={{
          duration:40,
          repeat:Infinity,
          ease:"linear"
        }}

        className="
        absolute
        left-1/2
        top-1/2
        h-[350px]
        w-[350px]
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        border
        border-purple-400/10
        "
      />





      {/* Floating Particles */}

      {[1,2,3,4,5].map((item)=>(

        <motion.div

        key={item}

        animate={{
          y:[0,-80,0],
          opacity:[0.2,1,0.2]
        }}

        transition={{
          duration:8+item,
          repeat:Infinity,
          delay:item
        }}

        className="
        absolute
        h-2
        w-2
        rounded-full
        bg-blue-400
        "

        style={{
          left:`${15+item*15}%`,
          top:`${20+item*10}%`
        }}

        />

      ))}



    </div>
  );
}