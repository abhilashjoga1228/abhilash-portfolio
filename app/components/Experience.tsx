"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    company: "Adobe",
    logo: "/Logos/adobe.png",
    role: "Data Engineer",
    duration: "Mar 2026 - Present",

    description:
      "Building enterprise data engineering and analytics solutions while supporting cloud modernization initiatives across Databricks, Microsoft Fabric, SQL Server, Salesforce, and Dynamics 365.",

    achievements: [
      "Developed ETL and ELT pipelines integrating Databricks, SnapLogic, SQL Server, Salesforce, Dynamics 365, and Microsoft Fabric",
      "Built Microsoft Fabric workspaces, Lakehouses, pipelines, semantic models, and enterprise reporting solutions",
      "Supported proof-of-concept initiatives evaluating migration of legacy SQL Server workloads to Databricks and modern cloud data platforms",
      "Automated integration and reporting workflows across enterprise business systems and cloud analytics platforms",
      "Explored AI-enabled reporting and analytics workflows for KPI summaries, reporting automation, and business insights",
    ],

    technologies: [
      "Databricks",
      "Microsoft Fabric",
      "SQL Server",
      "SnapLogic",
      "Azure",
      "Power BI",
      "SQL",
    ],
  },

  {
    company: "Swire Coca-Cola",
    logo: "/Logos/swire.jpg",
    role: "Business Intelligence Analyst",
    duration: "Feb 2023 - Mar 2026",

    description:
      "Delivered enterprise business intelligence, logistics analytics, cloud data modernization, and automation solutions supporting operational, financial, and commercial decision-making.",

    achievements: [
      "Built logistics analytics solutions integrating operational data from Samsara, BlueJay, SAP, SQL, and Python to improve transportation visibility",
      "Contributed to a 23% reduction in transportation costs through route, delivery, and operational analytics",
      "Developed Power BI dashboards and semantic models for KPIs including OTIF, delivery performance, Cases per Stop, and operational productivity",
      "Supported delivery-frequency optimization initiatives that reduced delivery stops by 12.5%",
      "Migrated SQL Server analytical workloads to Snowflake on Azure and supported downstream Power BI reporting",
      "Supported modernization patterns moving Snowflake analytics workloads toward Microsoft Fabric Lakehouse, pipeline, and semantic-model architecture",
      "Automated reporting and operational workflows using Power Apps and Power Automate",
    ],

    technologies: [
      "Microsoft Fabric",
      "Snowflake",
      "Azure",
      "Power BI",
      "Python",
      "SQL",
      "Power Apps",
      "Power Automate",
    ],
  },

  {
    company: "Amazon",
    logo: "/Logos/amazon.png",
    role: "Last Mile Analyst",
    duration: "Jul 2020 - Aug 2022",

    description:
      "Analyzed large-scale last-mile logistics operations across North America and Europe using SQL, Amazon Redshift, Python, APIs, and AWS analytics services.",

    achievements: [
      "Analyzed operational data using SQL and Amazon Redshift to identify delivery bottlenecks, root causes, and process improvement opportunities",
      "Built operational dashboards and KPI reporting using Amazon QuickSight",
      "Integrated traffic and route data using Python, APIs, Apache Airflow, and AWS services to support delivery optimization",
      "Processed delivery feedback and geospatial datasets to improve map quality, routing accuracy, and last-mile performance",
      "Applied Python-based statistical analysis to identify routing patterns and contributed to a 25% reduction in route inefficiencies",
      "Supported initiatives that contributed to a 10% reduction in delivery delays",
    ],

    technologies: [
      "SQL",
      "Amazon Redshift",
      "Python",
      "AWS",
      "Apache Airflow",
      "Amazon QuickSight",
      "APIs",
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
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
            CAREER JOURNEY
          </p>

          <h2 className="mt-3 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Professional Experience
          </h2>

          <p className="mx-auto mt-5 max-w-3xl leading-8 text-gray-400">
            Experience spanning data engineering, business intelligence,
            cloud modernization, logistics analytics, automation, and applied
            analytics across enterprise environments.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Timeline Line */}
          <div className="absolute bottom-0 left-6 top-0 hidden w-px bg-gradient-to-b from-cyan-400/60 via-blue-400/30 to-transparent md:block" />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                }}
                className="relative md:pl-16"
              >
                {/* Timeline Number */}
                <div className="absolute left-0 top-8 hidden h-12 w-12 items-center justify-center rounded-full border border-cyan-400/40 bg-slate-950 text-sm font-bold text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.15)] md:flex">
                  {index + 1}
                </div>

                {/* Card */}
                <div className="rounded-3xl border border-blue-400/20 bg-slate-900/40 p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 md:p-9">
                  {/* Header */}
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-5">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-blue-400/20 bg-white p-2">
                        <img
                          src={exp.logo}
                          alt={exp.company}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {exp.company}
                        </h3>

                        <p className="mt-1 font-semibold text-blue-300">
                          {exp.role}
                        </p>
                      </div>
                    </div>

                    <span className="w-fit rounded-full border border-blue-400/20 bg-blue-500/5 px-4 py-2 text-sm text-gray-400">
                      {exp.duration}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-7 max-w-4xl leading-7 text-gray-300">
                    {exp.description}
                  </p>

                  {/* Contributions */}
                  <div className="mt-8">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-400">
                      Key Contributions
                    </h4>

                    <ul className="mt-5 space-y-3 text-gray-300">
                      {exp.achievements.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 leading-7"
                        >
                          <span className="mt-[2px] shrink-0 text-cyan-400">
                            ✓
                          </span>

                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technology */}
                  <div className="mt-8 border-t border-blue-400/10 pt-6">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">
                      Technology
                    </h4>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-blue-400/25 bg-blue-500/5 px-3 py-1.5 text-xs text-blue-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Career Progression */}
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
          className="mt-10 rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 p-7"
        >
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400">
            CAREER PROGRESSION
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {[
              "Operational Analytics",
              "Business Intelligence",
              "Cloud Data Engineering",
              "Platform Modernization",
              "Applied AI",
            ].map((item, index, array) => (
              <div
                key={item}
                className="flex items-center gap-3"
              >
                <span className="rounded-full border border-blue-400/25 bg-slate-950/60 px-4 py-2 text-sm text-blue-300">
                  {item}
                </span>

                {index !== array.length - 1 && (
                  <span className="text-cyan-400">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}