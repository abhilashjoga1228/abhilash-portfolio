"use client";

import { motion } from "framer-motion";

const certifications = [
  {
    title: "Microsoft Certified: Fabric Data Engineer Associate",
    issuer: "Microsoft",
    year: "2025",
    description:
      "Microsoft Fabric data engineering, Lakehouse architecture, data pipelines, and analytics solutions.",
    logo: "/Logos/fabric.png",
    focus: ["Fabric", "Lakehouse", "Data Engineering"],
  },
  {
    title: "Microsoft Certified: Power BI Data Analyst Associate",
    issuer: "Microsoft",
    year: "2023",
    description:
      "Power BI reporting, semantic models, DAX, data modeling, and business intelligence.",
    logo: "/Logos/powerbi.png",
    focus: ["Power BI", "DAX", "Semantic Models"],
  },
  {
    title: "Microsoft Certified: Azure Database Administrator Associate",
    issuer: "Microsoft",
    year: "2023",
    description:
      "Azure database administration, cloud data platforms, performance, security, and operational management.",
    logo: "/Logos/azure.png",
    focus: ["Azure", "Databases", "Cloud"],
  },
  {
    title: "ITIL Foundation",
    issuer: "PeopleCert",
    year: "2025",
    description:
      "IT service management principles, operational practices, service delivery, and continuous improvement.",
    logo: "/Logos/itil.png",
    focus: ["ITSM", "Operations", "Service Management"],
  },
];

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative px-6 py-24"
    >
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
            PROFESSIONAL CREDENTIALS
          </p>

          <h2 className="mt-3 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Certifications
          </h2>

          <p className="mx-auto mt-5 max-w-3xl leading-7 text-gray-400">
            Industry certifications supporting my work across modern data
            platforms, cloud databases, business intelligence, and enterprise
            technology operations.
          </p>
        </motion.div>

        {/* Certification Grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
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
              className="group relative overflow-hidden rounded-3xl border border-blue-400/20 bg-slate-900/50 p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40"
            >
              {/* Subtle Glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition group-hover:bg-cyan-500/10" />

              <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between gap-5">
                  <div className="flex items-center gap-5">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-blue-400/20 bg-white p-2">
                      <img
                        src={cert.logo}
                        alt={cert.title}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold leading-6 text-white">
                        {cert.title}
                      </h3>

                      <p className="mt-2 text-sm font-semibold text-blue-300">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-full border border-cyan-400/20 bg-cyan-500/5 px-3 py-1.5 text-xs font-semibold text-cyan-300">
                    {cert.year}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-6 leading-7 text-gray-300">
                  {cert.description}
                </p>

                {/* Focus Areas */}
                <div className="mt-6 flex flex-wrap gap-2 border-t border-blue-400/10 pt-5">
                  {cert.focus.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-blue-400/20 bg-blue-500/5 px-3 py-1.5 text-xs text-blue-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}