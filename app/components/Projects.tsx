"use client";

export default function Projects() {
  const projects = [
    {
      featured: true,

      category: "DATA ENGINEERING",

      title: "Delivery Standardization & Cost Optimization Platform",

      logo: "/Logos/powerbi.png",

      description:
        "Enterprise analytics platform designed to identify delivery inefficiencies, optimize delivery frequency, reduce operational costs, and improve logistics performance.",

      architecture: [
        "Operational Data",
        "Python Data Pipeline",
        "SQL / Medallion Layers",
        "Semantic Model",
        "Power BI Analytics",
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
        "Cost-to-serve analysis",
        "Improved driver and delivery productivity visibility",
      ],

      caseStudy: "/projects/delivery-standardization",

      github:
        "https://github.com/abhilashjoga1228/Delivery-Standardization-Cost-Optimization-Platform",
    },

    {
      category: "CLOUD DATA ENGINEERING",

      title: "Cloud Data Migration & Modernization",

      logo: "/Logos/fabric.png",

      description:
        "Enterprise data modernization case study demonstrating migration patterns across SQL Server, Snowflake, Databricks, and Microsoft Fabric while maintaining data quality, scalability, and analytics continuity.",

      architecture: [
        "Legacy Data Sources",
        "ETL / ELT",
        "Cloud Data Platform",
        "Validation & Reconciliation",
        "Analytics Layer",
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
        "Modernized legacy data platforms",
        "Improved cloud data availability",
        "Standardized migration validation",
        "Enabled scalable analytics workloads",
      ],

      caseStudy: "/projects/cloud-data-migration",
    },

    {
      category: "AI / ANALYTICS",

      title: "AI Powered Analytics Assistant",

      logo: "/Logos/OPENAI.png",

      description:
        "AI-powered portfolio assistant that uses natural language and structured profile context to answer questions about experience, skills, projects, certifications, and job-description alignment.",

      architecture: [
        "User Question",
        "Next.js API Route",
        "Profile Context",
        "OpenAI LLM",
        "Structured Response",
      ],

      technologies: [
        "OpenAI API",
        "Next.js",
        "TypeScript",
        "LLM",
        "Prompt Engineering",
        "Context Design",
      ],

      impact: [
        "Natural language interaction with portfolio information",
        "Faster experience and skill discovery",
        "Job description and profile comparison",
        "AI-assisted recruiter and hiring-manager interaction",
      ],

      caseStudy: "/projects/ai-analytics-assistant",
    },

    {
      category: "BI / PLATFORM MODERNIZATION",

      title: "Enterprise BI & Power Platform Modernization",

      logo: "/Logos/powerplatform.png",

      description:
        "Modernized enterprise Power BI and Power Platform development practices by introducing source control, deployment pipelines, standardized environments, governed credentials, and improved production ownership.",

      architecture: [
        "Development Standards",
        "PBIP Source Control",
        "Git Version Control",
        "Deployment Pipelines",
        "Governed Production",
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
        "Introduced Power BI version control using PBIP and Git",
        "Standardized Dev, Test, and Production deployments",
        "Implemented ALM practices for Power Apps and Power Automate",
        "Moved production ownership toward governed service accounts",
        "Reduced dependency on individual developer credentials",
        "Established repeatable BI and Power Platform development standards",
      ],

      caseStudy: "/projects/bi-platform-modernization",
    },
  ];

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2
          className="
            text-center
            text-4xl
            font-bold
            bg-gradient-to-r
            from-blue-400
            to-cyan-300
            bg-clip-text
            text-transparent
          "
        >
          Featured Projects
        </h2>

        <p
          className="
            mx-auto
            mt-4
            max-w-3xl
            text-center
            text-gray-400
          "
        >
          Real-world data engineering, cloud platforms, analytics solutions,
          and AI applications.
        </p>

        <div
          className="
            mt-12
            grid
            gap-8
            md:grid-cols-2
          "
        >
          {projects.map((project) => (
            <div
              key={project.title}
              className={`
                relative
                overflow-hidden
                rounded-3xl
                border
                bg-slate-900/40
                p-8
                backdrop-blur-xl
                transition
                duration-300
                hover:-translate-y-2

                ${
                  project.featured
                    ? "border-cyan-400/50 shadow-[0_0_50px_rgba(34,211,238,0.15)]"
                    : "border-blue-400/30 hover:border-cyan-400/50"
                }
              `}
            >
              {/* Top Row */}
              <div className="flex items-start justify-between gap-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="
                      rounded-full
                      border
                      border-blue-400/30
                      bg-blue-500/10
                      px-4
                      py-1
                      text-xs
                      text-blue-300
                    "
                  >
                    {project.category}
                  </span>

                  {project.featured && (
                    <span
                      className="
                        rounded-full
                        bg-cyan-500/20
                        px-3
                        py-1
                        text-xs
                        text-cyan-300
                      "
                    >
                      Featured
                    </span>
                  )}
                </div>

                {/* Project Logo */}
                <div
                  className="
                    flex
                    h-16
                    w-16
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-blue-400/20
                    bg-slate-950/70
                    p-3
                    shadow-[0_0_25px_rgba(59,130,246,0.15)]
                  "
                >
                  <img
                    src={project.logo}
                    alt={`${project.title} technology`}
                    className="
                      h-full
                      w-full
                      object-contain
                    "
                  />
                </div>
              </div>

              {/* Title */}
              <h3
                className="
                  mt-5
                  max-w-xl
                  text-2xl
                  font-bold
                  text-white
                "
              >
                {project.title}
              </h3>

              {/* Description */}
              <p
                className="
                  mt-4
                  leading-7
                  text-gray-300
                "
              >
                {project.description}
              </p>

              {/* Architecture */}
              <h4
                className="
                  mt-6
                  font-semibold
                  text-blue-400
                "
              >
                Architecture
              </h4>

              <div
                className="
                  mt-3
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {project.architecture.map((step) => (
                  <span
                    key={step}
                    className="
                      rounded-lg
                      border
                      border-blue-400/20
                      bg-slate-800
                      px-3
                      py-2
                      text-sm
                      text-gray-300
                    "
                  >
                    {step}
                  </span>
                ))}
              </div>

              {/* Technology Stack */}
              <h4
                className="
                  mt-6
                  font-semibold
                  text-blue-400
                "
              >
                Technology Stack
              </h4>

              <div
                className="
                  mt-3
                  flex
                  flex-wrap
                  gap-3
                "
              >
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="
                      rounded-full
                      border
                      border-blue-400/30
                      bg-blue-500/10
                      px-4
                      py-2
                      text-sm
                      text-blue-300
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Business Impact */}
              <h4
                className="
                  mt-6
                  font-semibold
                  text-blue-400
                "
              >
                Business Impact
              </h4>

              <ul
                className="
                  mt-3
                  space-y-2
                  text-gray-300
                "
              >
                {project.impact.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-cyan-400">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Buttons */}
              <div
                className="
                  mt-8
                  flex
                  flex-wrap
                  gap-3
                "
              >
                {project.caseStudy && (
                  <a
                    href={project.caseStudy}
                    className="
                      rounded-lg
                      bg-blue-600
                      px-5
                      py-2
                      font-semibold
                      text-white
                      transition
                      hover:bg-blue-700
                    "
                  >
                    View Case Study
                  </a>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      rounded-lg
                      border
                      border-gray-500
                      px-5
                      py-2
                      font-semibold
                      text-gray-200
                      transition
                      hover:border-gray-300
                      hover:bg-gray-800
                    "
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}