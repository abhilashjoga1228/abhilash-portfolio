"use client";

import { motion } from "framer-motion";

const highlights = [
  {
    title: "7+",
    subtitle: "Years in Data & Analytics",
  },
  {
    title: "4",
    subtitle: "Enterprise Organizations",
  },
  {
    title: "Cloud",
    subtitle: "Migration & Modernization",
  },
  {
    title: "AI + BI",
    subtitle: "Applied Analytics Solutions",
  },
];

const expertise = [
  "Data Engineering",
  "Cloud Data Platforms",
  "ETL / ELT Pipelines",
  "Lakehouse Architecture",
  "Data Modeling",
  "Semantic Models",
  "Business Intelligence",
  "Platform Modernization",
  "Data Validation",
  "Analytics Automation",
  "Applied AI",
];

const technologies = [
  "Microsoft Fabric",
  "Databricks",
  "Snowflake",
  "Azure",
  "Power BI",
  "SQL",
  "Python",
  "Power Platform",
];

export default function About() {
  return (
    <section
      id="about"
      className="relative px-6 py-24 md:px-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
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
            duration: 0.6,
          }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
            MY BACKGROUND
          </p>

          <h2 className="mt-3 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            About Me
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            I work at the intersection of data engineering, analytics, cloud
            modernization, and applied AI—building solutions that make
            enterprise data more scalable, reliable, and useful.
          </p>
        </motion.div>

        {/* Highlight Cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, index) => (
            <motion.div
              key={item.subtitle}
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
              className="rounded-2xl border border-blue-400/20 bg-slate-900/40 p-7 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40"
            >
              <h3 className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-3xl font-bold text-transparent">
                {item.title}
              </h3>

              <p className="mt-3 text-sm text-gray-400">
                {item.subtitle}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Career Story */}
          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-blue-400/20 bg-slate-900/40 p-8 backdrop-blur-xl md:p-10"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400">
              CAREER STORY
            </div>

            <h3 className="mt-3 text-2xl font-bold text-white">
              From analytics to modern data platforms
            </h3>

            <div className="mt-6 space-y-5 leading-8 text-gray-300">
              <p>
                My career has evolved across analytics, business intelligence,
                data engineering, and cloud platform modernization. That
                progression has given me experience across the full analytics
                lifecycle—from understanding business questions to engineering
                the data foundations that support reporting and decision-making.
              </p>

              <p>
                I have worked on enterprise initiatives involving data
                pipelines, cloud migrations, semantic models, operational
                analytics, Power BI modernization, automation, and scalable
                data architectures across SQL Server, Snowflake, Databricks,
                Microsoft Fabric, and Azure.
              </p>

              <p>
                More recently, I have also been applying generative AI to
                analytics-oriented use cases, including context-grounded
                assistants, job-description analysis, automated reporting, and
                workflow integration.
              </p>

              <p>
                My focus is not only on building technology, but on connecting
                architecture, data quality, analytics, automation, and business
                outcomes into solutions that can be maintained and scaled.
              </p>
            </div>
          </motion.div>

          {/* Expertise */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-blue-400/20 bg-slate-900/40 p-8 backdrop-blur-xl md:p-10"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400">
              WHAT I WORK ON
            </div>

            <h3 className="mt-3 text-2xl font-bold text-white">
              Core Expertise
            </h3>

            <div className="mt-6 flex flex-wrap gap-3">
              {expertise.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-blue-400/25 bg-blue-500/5 px-4 py-2 text-sm text-blue-300 transition hover:border-cyan-400/40 hover:bg-blue-500/10"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-10 border-t border-blue-400/10 pt-8">
              <h3 className="text-xl font-bold text-white">
                Technology Focus
              </h3>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {technologies.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-blue-400/15 bg-slate-950/50 px-4 py-3 text-sm text-gray-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-5">
              <p className="text-sm leading-6 text-gray-300">
                I&apos;m particularly interested in roles where data
                engineering, analytics platforms, cloud modernization, and
                applied AI come together to solve real business problems.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Enterprise Experience */}
        <motion.div
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
            duration: 0.6,
          }}
          className="mt-8 rounded-3xl border border-blue-400/20 bg-slate-900/30 p-7 md:p-8"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                ENTERPRISE EXPERIENCE
              </div>

              <p className="mt-3 max-w-3xl leading-7 text-gray-300">
                Experience delivering data, analytics, and platform solutions
                across organizations including Adobe, Swire Coca-Cola, and
                Amazon.
              </p>
            </div>

            <a
              href="#experience"
              className="w-fit rounded-xl border border-blue-400/30 px-5 py-2.5 text-sm font-semibold text-blue-300 transition hover:border-cyan-400/50 hover:bg-blue-500/10"
            >
              View Experience →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}