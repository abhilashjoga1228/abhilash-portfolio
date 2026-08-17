"use client";

export default function Projects() {
  const projects = [
    {
      featured: true,

      category: "AI / DECISION INTELLIGENCE",

      title: "Round Table AI",

      logo: "/Logos/OPENAI.png",

      description:
        "AI-powered decision intelligence platform that stress-tests complex decisions through independent expert analysis, structured debate, evolving verdicts, and actionable recommendations.",

      architecture: [
        "User Decision",
        "AI Experts",
        "Expert Debate",
        "Verdict Synthesis",
        "Decision Memory",
        "Share / PDF",
      ],

      technologies: [
        "Next.js",
        "TypeScript",
        "OpenAI API",
        "Supabase",
        "PostgreSQL",
        "Vercel",
      ],

      impact: [
        "Dynamically assembles multiple AI perspectives around a decision",
        "Synthesizes independent expert reasoning into one actionable verdict",
        "Supports challenges, follow-up questions, and additional perspectives",
        "Persists decision history with secure cross-device access",
        "Generates public share links and branded PDF decision briefs",
      ],

      caseStudy:
        "https://roundtable.abhilashjoga.com",

      buttonLabel: "Try Round Table AI →",

      external: true,
    },

    {
      featured: false,

      category: "AI / DATA INTELLIGENCE",

      title: "DataLens AI",

      logo: "/Logos/OPENAI.png",

      description:
        "Interactive data and document intelligence platform for CSV, Excel, and PDF files with automated profiling, quality scoring, anomaly detection, visualization, document search, and AbhI Analyst for AI-powered Q&A and SQL/Python remediation.",

      architecture: [
        "CSV / Excel / PDF",
        "Browser Analysis",
        "Quality Engine",
        "Visualization",
        "AbhI Analyst",
      ],

      technologies: [
        "Next.js",
        "TypeScript",
        "OpenAI API",
        "Papa Parse",
        "SheetJS",
        "PDF.js",
        "Recharts",
      ],

      impact: [
        "Interactive CSV and multi-sheet Excel analysis",
        "Automated profiling and data-quality scoring",
        "Anomaly, duplicate, missing-value, and validity detection",
        "PDF extraction, search, and document intelligence",
        "AI-powered SQL and Python remediation generation",
      ],

      caseStudy: "/projects/data-quality-analyzer",

      buttonLabel: "Try DataLens AI →",
    },

    {
      featured: false,

      category: "DATA ENGINEERING",

      title: "Delivery Standardization & Cost Optimization Platform",

      logo: "/Logos/powerbi.png",

      description:
        "Enterprise data and analytics solution designed to identify delivery inefficiencies, standardize operational KPIs, optimize delivery frequency, and improve transportation performance.",

      architecture: [
        "Operational Data",
        "SQL / Bronze",
        "Python / Silver",
        "Gold Data Model",
        "Power BI",
      ],

      technologies: [
        "Power BI",
        "Python",
        "SQL",
        "Data Modeling",
        "Microsoft Fabric Concepts",
      ],

      impact: [
        "12.5% reduction in delivery stops",
        "23% reduction in transportation costs",
        "Enabled cost-to-serve analysis",
        "Improved route and driver productivity visibility",
      ],

      caseStudy: "/projects/delivery-standardization",

      buttonLabel: "View Case Study →",
    },

    {
      featured: false,

      category: "CLOUD DATA ENGINEERING",

      title: "Cloud Data Migration & Modernization",

      logo: "/Logos/fabric.png",

      description:
        "Cloud modernization case study covering enterprise migration patterns across SQL Server, Snowflake, Databricks, and Microsoft Fabric with validation, reconciliation, and analytics continuity.",

      architecture: [
        "Legacy Sources",
        "ETL / ELT",
        "Cloud Platform",
        "Validation",
        "Power BI",
      ],

      technologies: [
        "Microsoft Fabric",
        "Databricks",
        "Snowflake",
        "Azure",
        "SQL",
        "Python",
      ],

      impact: [
        "SQL Server → Snowflake modernization",
        "SQL Server → Databricks modernization patterns",
        "Snowflake → Microsoft Fabric modernization",
        "Source-to-target validation and reconciliation",
      ],

      caseStudy: "/projects/cloud-data-migration",

      buttonLabel: "View Case Study →",
    },

    {
      featured: false,

      category: "AI / APPLICATION ENGINEERING",

      title: "AI-Powered Analytics Assistant",

      logo: "/Logos/OPENAI.png",

      description:
        "Interactive AI portfolio assistant combining context-grounded OpenAI responses, job-description analysis, and Google Calendar scheduling through a production-style Next.js application.",

      architecture: [
        "Chat Interface",
        "Next.js APIs",
        "Profile Context",
        "OpenAI",
        "Google Calendar",
      ],

      technologies: [
        "OpenAI API",
        "Next.js",
        "TypeScript",
        "Prompt Engineering",
        "Google Calendar API",
        "Google OAuth 2.0",
      ],

      impact: [
        "Conversational access to experience and project information",
        "Job-description vs. profile matching",
        "Real-time calendar availability checks",
        "30-minute meeting scheduling with Google Meet",
        "Backend-confirmed actions and scheduling guardrails",
      ],

      caseStudy: "/projects/ai-analytics-assistant",

      buttonLabel: "View Case Study →",
    },

    {
      featured: false,

      category: "BI / PLATFORM MODERNIZATION",

      title: "Enterprise BI & Power Platform Modernization",

      logo: "/Logos/powerplatform.png",

      description:
        "Modernized enterprise Power BI and Power Platform practices through source control, deployment pipelines, governed ownership, ALM standards, and automated BI monitoring workflows.",

      architecture: [
        "Development",
        "PBIP + Git",
        "Deployment",
        "Governance",
        "Production",
      ],

      technologies: [
        "Power BI",
        "PBIP",
        "Git",
        "Power Apps",
        "Power Automate",
        "Deployment Pipelines",
      ],

      impact: [
        "Introduced PBIP and Git-based Power BI version control",
        "Standardized Dev → Test → Production deployment",
        "Implemented Power Apps and Power Automate ALM practices",
        "Automated BI validation and refresh monitoring",
        "Reduced dependency on individual credentials",
      ],

      caseStudy: "/projects/bi-platform-modernization",

      buttonLabel: "View Case Study →",
    },
  ];

  return (
    <section
      id="projects"
      className="px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
            SELECTED WORK
          </p>

          <h2 className="mt-3 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-4xl font-bold text-transparent">
            Featured Projects
          </h2>

          <p className="mx-auto mt-5 max-w-3xl leading-7 text-gray-400">
            Data engineering, cloud modernization, enterprise analytics, and
            applied AI projects demonstrating architecture, implementation,
            automation, and measurable business outcomes.
          </p>
        </div>

        {/* Project Grid */}
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className={`
                group
                relative
                flex
                h-full
                flex-col
                overflow-hidden
                rounded-3xl
                border
                bg-slate-900/40
                p-7
                backdrop-blur-xl
                transition
                duration-300
                hover:-translate-y-2
                md:p-8

                ${
                  project.featured
                    ? "border-cyan-400/50 shadow-[0_0_50px_rgba(34,211,238,0.12)]"
                    : "border-blue-400/20 hover:border-cyan-400/40"
                }
              `}
            >
              {/* Subtle Glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl transition group-hover:bg-cyan-500/10" />

              {/* Top Row */}
              <div className="relative flex items-start justify-between gap-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-300">
                    {project.category}
                  </span>

                  {project.featured && (
                    <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300">
                      Featured
                    </span>
                  )}
                </div>

                {/* Logo */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-blue-400/20 bg-slate-950/80 p-3 shadow-[0_0_25px_rgba(59,130,246,0.12)]">
                  <img
                    src={project.logo}
                    alt={`${project.title} technology`}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="relative mt-6 max-w-xl text-2xl font-bold leading-snug text-white">
                {project.title}
              </h3>

              {/* Description */}
              <p className="relative mt-4 leading-7 text-gray-300">
                {project.description}
              </p>

              {/* Architecture */}
              <div className="relative mt-7">
                <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">
                  Architecture
                </h4>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {project.architecture.map((step, index) => (
                    <div
                      key={step}
                      className="flex items-center gap-2"
                    >
                      <span className="rounded-lg border border-blue-400/15 bg-slate-950/60 px-3 py-2 text-xs text-gray-300">
                        {step}
                      </span>

                      {index !== project.architecture.length - 1 && (
                        <span className="text-xs text-cyan-500">
                          →
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Stack */}
              <div className="relative mt-7">
                <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">
                  Technology
                </h4>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-blue-400/25 bg-blue-500/5 px-3 py-1.5 text-xs text-blue-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Impact */}
              <div className="relative mt-7">
                <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">
                  Key Outcomes
                </h4>

                <ul className="mt-4 space-y-2.5 text-sm text-gray-300">
                  {project.impact.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3"
                    >
                      <span className="mt-[1px] shrink-0 text-cyan-400">
                        ✓
                      </span>

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Buttons */}
              <div className="relative mt-8 flex flex-wrap gap-3 border-t border-blue-400/10 pt-6">
                <a
                  href={project.caseStudy}
                  target={project.external ? "_blank" : undefined}
                  rel={project.external ? "noopener noreferrer" : undefined}
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  {project.buttonLabel}
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Portfolio Context */}
        <div className="mt-10 rounded-2xl border border-blue-400/10 bg-slate-900/30 px-6 py-5 text-center">
          <p className="text-sm leading-6 text-gray-500">
            Case studies combine professional experience with sanitized,
            synthetic, or simplified portfolio examples where necessary to
            protect confidential business information.
          </p>
        </div>
      </div>
    </section>
  );
}