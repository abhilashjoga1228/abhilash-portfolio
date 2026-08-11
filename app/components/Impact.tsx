"use client";

import { motion } from "framer-motion";

const impactItems = [
  {
    value: "23%",
    label: "Transportation Cost Reduction",
    description:
      "Supported logistics and route analytics initiatives that reduced transportation costs.",
  },
  {
    value: "12.5%",
    label: "Delivery Stop Reduction",
    description:
      "Supported delivery-frequency optimization that reduced unnecessary delivery stops.",
  },
  {
    value: "25%",
    label: "Route Inefficiency Reduction",
    description:
      "Applied analytics to identify routing patterns and improve last-mile performance.",
  },
  {
    value: "10%",
    label: "Delivery Delay Reduction",
    description:
      "Supported operational analytics initiatives focused on improving delivery performance.",
  },
];

export default function Impact() {
  return (
    <section className="relative px-6 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
          }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
            MEASURABLE OUTCOMES
          </p>

          <h2 className="mt-3 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            BUSINESS IMPACT
          </h2>

          <p className="mx-auto mt-5 max-w-3xl leading-7 text-gray-400">
            Examples of measurable business outcomes supported through
            analytics, automation, and data-driven operational improvements.
          </p>
        </motion.div>

        {/* Impact Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {impactItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              className="rounded-2xl border border-blue-400/20 bg-slate-900/40 p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40"
            >
              <div className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-4xl font-bold text-transparent">
                {item.value}
              </div>

              <h3 className="mt-4 text-lg font-semibold text-white">
                {item.label}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Context Note */}
        <div className="mt-8 text-center">
          <p className="text-xs leading-5 text-gray-600">
            Outcomes reflect professional initiatives described in the
            experience and project case studies.
          </p>
        </div>
      </div>
    </section>
  );
}