"use client";

const migrationPatterns = [
  {
    id: "MIGRATION 01",
    source: "SQL Server",
    sourceLogo: "/Logos/sql.png",
    target: "Snowflake",
    targetLogo: "/Logos/snowflake.png",
    description:
      "Modernized legacy SQL Server analytical workloads by moving data into Snowflake and supporting cloud-based analytics and reporting.",
  },
  {
    id: "MIGRATION 02",
    source: "SQL Server",
    sourceLogo: "/Logos/sql.png",
    target: "Databricks",
    targetLogo: "/Logos/databricks.png",
    description:
      "Supported modernization initiatives moving legacy SQL Server workloads toward Databricks-based data engineering and analytics architectures.",
  },
  {
    id: "MIGRATION 03",
    source: "Snowflake",
    sourceLogo: "/Logos/snowflake.png",
    target: "Microsoft Fabric",
    targetLogo: "/Logos/fabric.png",
    description:
      "Evaluated and implemented modernization patterns for moving analytics workloads into Microsoft Fabric using Lakehouse, pipeline, and semantic-model capabilities.",
  },
];

const architectureSteps = [
  {
    step: "01",
    title: "Legacy Sources",
    subtitle: "Operational and analytical source systems",
    logo: "/Logos/sql.png",
    items: ["SQL Server", "Enterprise Data", "Legacy Reporting"],
  },
  {
    step: "02",
    title: "Ingestion",
    subtitle: "Move data into cloud processing layers",
    logo: "/Logos/python.png",
    items: ["ETL / ELT", "SQL", "Python"],
  },
  {
    step: "03",
    title: "Cloud Platform",
    subtitle: "Modernize storage and processing",
    logo: "/Logos/fabric.png",
    items: ["Snowflake", "Databricks", "Microsoft Fabric"],
  },
  {
    step: "04",
    title: "Validation",
    subtitle: "Verify data before analytics cutover",
    logo: "/Logos/sql.png",
    items: ["Reconciliation", "Quality Checks", "Business Rules"],
  },
  {
    step: "05",
    title: "Analytics",
    subtitle: "Reconnect enterprise reporting",
    logo: "/Logos/powerbi.png",
    items: ["Semantic Models", "Power BI", "Enterprise Reporting"],
  },
];

export default function CloudDataMigrationCaseStudy() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Top Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-blue-400/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a
            href="/"
            className="text-sm font-semibold text-gray-300 transition hover:text-cyan-300"
          >
            ← Abhilash Portfolio
          </a>

          <a
            href="/#projects"
            className="text-sm font-semibold text-blue-300 transition hover:text-cyan-300"
          >
            Projects
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pb-20 pt-36">
        <div className="mx-auto max-w-6xl">
          <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-xs font-semibold tracking-wide text-cyan-300">
            CLOUD DATA ENGINEERING
          </span>

          <h1 className="mt-8 max-w-5xl bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-6xl">
            Cloud Data Migration & Modernization
          </h1>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-gray-300">
            A cloud data modernization case study demonstrating enterprise
            migration patterns across SQL Server, Snowflake, Databricks, and
            Microsoft Fabric while maintaining data quality, analytics
            continuity, and scalable data-processing capabilities.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {[
              "Microsoft Fabric",
              "Databricks",
              "Snowflake",
              "Azure",
              "SQL",
              "Python",
              "ETL / ELT",
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Business Challenge */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Business Challenge
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-300">
            Enterprise analytics environments often evolve across multiple
            generations of technology. Legacy SQL Server platforms may support
            operational reporting while newer cloud platforms such as
            Snowflake, Databricks, and Microsoft Fabric are introduced for
            scalability, performance, and modern analytics.
          </p>

          <p className="mt-5 max-w-4xl leading-8 text-gray-300">
            Moving data between these environments requires more than simply
            copying tables. Data pipelines, transformations, business rules,
            reporting dependencies, schemas, data types, validation controls,
            and downstream analytics all need to remain consistent throughout
            the migration.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              "Legacy data platforms with growing scalability limitations",
              "Complex ETL and reporting dependencies",
              "Different schemas and data types across platforms",
              "Risk of data-quality issues during migration",
              "Need to maintain Power BI and analytics continuity",
              "Requirement for scalable cloud data-processing architecture",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-blue-400/20 bg-slate-900/50 p-5 text-gray-300"
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Migration Patterns */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            ENTERPRISE MODERNIZATION EXPERIENCE
          </div>

          <h2 className="mt-3 text-3xl font-bold text-white">
            Migration Patterns
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-300">
            This case study brings together migration and modernization
            patterns from enterprise data engineering work across several cloud
            platforms.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {migrationPatterns.map((migration) => (
              <div
                key={migration.id}
                className="rounded-3xl border border-blue-400/20 bg-slate-900/50 p-7 transition hover:-translate-y-1 hover:border-cyan-400/40"
              >
                <div className="text-xs font-semibold tracking-[0.2em] text-cyan-400">
                  {migration.id}
                </div>

                {/* Source to Target */}
                <div className="mt-7 flex items-center justify-between gap-4">
                  <div className="flex min-w-0 flex-1 flex-col items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/20 bg-slate-950">
                      <img
                        src={migration.sourceLogo}
                        alt={migration.source}
                        className="h-10 w-10 object-contain"
                      />
                    </div>

                    <div className="mt-3 text-center text-sm font-semibold text-gray-200">
                      {migration.source}
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="text-2xl text-cyan-400">→</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-gray-500">
                      Migrate
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/5">
                      <img
                        src={migration.targetLogo}
                        alt={migration.target}
                        className="h-10 w-10 object-contain"
                      />
                    </div>

                    <div className="mt-3 text-center text-sm font-semibold text-cyan-300">
                      {migration.target}
                    </div>
                  </div>
                </div>

                <p className="mt-7 leading-7 text-gray-300">
                  {migration.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Migration Architecture */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            CLOUD DATA ARCHITECTURE
          </div>

          <h2 className="mt-3 text-3xl font-bold text-white">
            Migration Architecture
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-300">
            The migration approach separates ingestion, transformation,
            validation, and consumption so that each stage can be independently
            tested and reconciled before downstream workloads are moved.
          </p>

          {/* Architecture Cards */}
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {architectureSteps.map((item, index) => (
              <div
                key={item.title}
                className="group relative rounded-3xl border border-blue-400/20 bg-slate-900/50 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.2em] text-cyan-400">
                    STEP {item.step}
                  </span>

                  {index < architectureSteps.length - 1 && (
                    <span className="hidden text-xl text-cyan-400 xl:block">
                      →
                    </span>
                  )}
                </div>

                <div className="mt-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/20 bg-slate-950">
                  <img
                    src={item.logo}
                    alt={item.title}
                    className="h-10 w-10 object-contain"
                  />
                </div>

                <h3 className="mt-6 text-xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  {item.subtitle}
                </p>

                <div className="mt-5 space-y-2">
                  {item.items.map((detail) => (
                    <div
                      key={detail}
                      className="rounded-lg border border-blue-400/10 bg-slate-950/50 px-3 py-2 text-sm text-gray-300"
                    >
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* End-to-End Flow */}
          <div className="mt-8 rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 p-7">
            <h3 className="text-lg font-bold text-cyan-300">
              End-to-End Migration Flow
            </h3>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {[
                "Assess",
                "Extract",
                "Transform",
                "Load",
                "Validate",
                "Reconcile",
                "Cut Over",
              ].map((item, index, array) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="rounded-full border border-blue-400/30 bg-slate-950/70 px-4 py-2 text-sm text-blue-300">
                    {item}
                  </span>

                  {index !== array.length - 1 && (
                    <span className="text-cyan-400">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Principles */}
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-blue-400/20 bg-slate-900/50 p-6">
              <h3 className="font-bold text-blue-300">
                Data Movement
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-300">
                SQL, Python, and cloud-native pipelines move source data into
                modern analytical platforms using controlled ETL and ELT
                patterns.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-400/20 bg-slate-900/50 p-6">
              <h3 className="font-bold text-blue-300">
                Data Validation
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-300">
                Source and target datasets are reconciled using row counts,
                aggregates, keys, business rules, and KPI comparisons.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-400/20 bg-slate-900/50 p-6">
              <h3 className="font-bold text-blue-300">
                Analytics Continuity
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-300">
                Semantic models and reporting workloads are transitioned after
                validation to reduce disruption to downstream analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Migration Approach */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Migration Approach
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                number: "01",
                title: "Discovery & Assessment",
                description:
                  "Inventory source tables, stored procedures, transformations, reporting dependencies, refresh schedules, and downstream consumers.",
              },
              {
                number: "02",
                title: "Source-to-Target Mapping",
                description:
                  "Map schemas, data types, keys, transformations, business rules, and target structures before moving workloads.",
              },
              {
                number: "03",
                title: "Pipeline Development",
                description:
                  "Build scalable ingestion and transformation pipelines using SQL, Python, and cloud-native data engineering services.",
              },
              {
                number: "04",
                title: "Validation & Reconciliation",
                description:
                  "Compare source and target row counts, aggregates, key metrics, null patterns, duplicates, and business-rule outputs.",
              },
              {
                number: "05",
                title: "Performance Optimization",
                description:
                  "Optimize transformation logic, query execution, partitioning, storage patterns, and analytical workloads for the target platform.",
              },
              {
                number: "06",
                title: "Analytics Cutover",
                description:
                  "Reconnect semantic models and reporting workloads after data validation and complete controlled migration to the new platform.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-blue-400/20 bg-slate-900/40 p-7"
              >
                <div className="text-sm font-bold text-cyan-300">
                  {step.number}
                </div>

                <h3 className="mt-3 text-xl font-bold text-white">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Validation */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Data Validation & Reconciliation
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-300">
            Validation is one of the most important parts of any migration.
            Successful data movement does not automatically mean that the
            migrated data is analytically correct.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Source vs. target row-count validation",
              "Primary-key and duplicate checks",
              "Null and data-type validation",
              "Aggregate reconciliation",
              "Business-rule validation",
              "Historical-data comparison",
              "Incremental-load validation",
              "Power BI KPI reconciliation",
              "Exception logging and remediation",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-blue-400/20 bg-slate-900/50 p-5 text-gray-300"
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Reconciliation */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Example Reconciliation Framework
          </h2>

          <div className="mt-10 overflow-x-auto rounded-3xl border border-blue-400/20 bg-slate-900/40">
            <table className="w-full min-w-[700px] text-left">
              <thead className="border-b border-blue-400/20 bg-slate-900/80">
                <tr>
                  <th className="px-6 py-4 text-blue-300">
                    Validation
                  </th>
                  <th className="px-6 py-4 text-blue-300">
                    Source
                  </th>
                  <th className="px-6 py-4 text-blue-300">
                    Target
                  </th>
                  <th className="px-6 py-4 text-blue-300">
                    Result
                  </th>
                </tr>
              </thead>

              <tbody className="text-gray-300">
                <tr className="border-b border-blue-400/10">
                  <td className="px-6 py-4">
                    Row Count
                  </td>
                  <td className="px-6 py-4">
                    1,250,000
                  </td>
                  <td className="px-6 py-4">
                    1,250,000
                  </td>
                  <td className="px-6 py-4 text-green-400">
                    Passed
                  </td>
                </tr>

                <tr className="border-b border-blue-400/10">
                  <td className="px-6 py-4">
                    Duplicate Keys
                  </td>
                  <td className="px-6 py-4">
                    0
                  </td>
                  <td className="px-6 py-4">
                    0
                  </td>
                  <td className="px-6 py-4 text-green-400">
                    Passed
                  </td>
                </tr>

                <tr className="border-b border-blue-400/10">
                  <td className="px-6 py-4">
                    Revenue Total
                  </td>
                  <td className="px-6 py-4">
                    $42.8M
                  </td>
                  <td className="px-6 py-4">
                    $42.8M
                  </td>
                  <td className="px-6 py-4 text-green-400">
                    Passed
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4">
                    Business KPI
                  </td>
                  <td className="px-6 py-4">
                    98.4%
                  </td>
                  <td className="px-6 py-4">
                    98.4%
                  </td>
                  <td className="px-6 py-4 text-green-400">
                    Passed
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Example values are illustrative and are not proprietary production
            data.
          </p>
        </div>
      </section>

      {/* Modernization Patterns */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Modernization Patterns
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Snowflake */}
            <div className="rounded-3xl border border-blue-400/20 bg-slate-900/40 p-7">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/20 bg-slate-950">
                <img
                  src="/Logos/snowflake.png"
                  alt="Snowflake"
                  className="h-10 w-10 object-contain"
                />
              </div>

              <h3 className="mt-6 text-xl font-bold text-white">
                Snowflake
              </h3>

              <p className="mt-4 leading-7 text-gray-300">
                Cloud data warehousing for scalable SQL analytics, centralized
                enterprise reporting, and separation of compute and storage.
              </p>
            </div>

            {/* Databricks */}
            <div className="rounded-3xl border border-blue-400/20 bg-slate-900/40 p-7">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/20 bg-slate-950">
                <img
                  src="/Logos/databricks.png"
                  alt="Databricks"
                  className="h-10 w-10 object-contain"
                />
              </div>

              <h3 className="mt-6 text-xl font-bold text-white">
                Databricks
              </h3>

              <p className="mt-4 leading-7 text-gray-300">
                Lakehouse data engineering using scalable transformation
                patterns, Python, SQL, and distributed data processing.
              </p>
            </div>

            {/* Fabric */}
            <div className="rounded-3xl border border-cyan-400/40 bg-slate-900/40 p-7 shadow-[0_0_40px_rgba(34,211,238,0.08)]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/5">
                <img
                  src="/Logos/fabric.png"
                  alt="Microsoft Fabric"
                  className="h-10 w-10 object-contain"
                />
              </div>

              <h3 className="mt-6 text-xl font-bold text-white">
                Microsoft Fabric
              </h3>

              <p className="mt-4 leading-7 text-gray-300">
                Unified analytics architecture combining Lakehouse, pipelines,
                semantic models, and Power BI within an integrated data
                platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Impact */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Business & Technical Impact
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              "Modernized legacy data and analytics workloads",
              "Improved scalability of enterprise data-processing pipelines",
              "Standardized source-to-target validation and reconciliation",
              "Improved availability of cloud-based analytical datasets",
              "Supported migration of downstream reporting and semantic models",
              "Reduced dependency on legacy data-platform architecture",
              "Enabled modern analytics using Snowflake, Databricks, and Fabric",
              "Improved foundation for enterprise Power BI reporting",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-5 text-gray-300"
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Technology Stack
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-blue-400/20 bg-slate-900/50 p-6">
              <h3 className="font-bold text-blue-300">
                Cloud Platforms
              </h3>

              <div className="mt-4 space-y-2 text-gray-300">
                <p>Microsoft Fabric</p>
                <p>Azure</p>
                <p>Snowflake</p>
                <p>Databricks</p>
              </div>
            </div>

            <div className="rounded-3xl border border-blue-400/20 bg-slate-900/50 p-6">
              <h3 className="font-bold text-blue-300">
                Data Engineering
              </h3>

              <div className="mt-4 space-y-2 text-gray-300">
                <p>SQL</p>
                <p>Python</p>
                <p>ETL / ELT</p>
                <p>Data Pipelines</p>
              </div>
            </div>

            <div className="rounded-3xl border border-blue-400/20 bg-slate-900/50 p-6">
              <h3 className="font-bold text-blue-300">
                Data Quality
              </h3>

              <div className="mt-4 space-y-2 text-gray-300">
                <p>Validation</p>
                <p>Reconciliation</p>
                <p>Data Profiling</p>
                <p>Quality Controls</p>
              </div>
            </div>

            <div className="rounded-3xl border border-blue-400/20 bg-slate-900/50 p-6">
              <h3 className="font-bold text-blue-300">
                Analytics
              </h3>

              <div className="mt-4 space-y-2 text-gray-300">
                <p>Power BI</p>
                <p>Semantic Models</p>
                <p>Data Modeling</p>
                <p>Enterprise Reporting</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Takeaway */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-10">
            <div className="text-sm font-semibold text-cyan-300">
              CASE STUDY TAKEAWAY
            </div>

            <h2 className="mt-4 text-3xl font-bold text-white">
              Migration is not just data movement.
            </h2>

            <p className="mt-5 max-w-4xl leading-8 text-gray-300">
              A successful cloud migration requires architecture design,
              transformation logic, data-quality controls, reconciliation,
              performance optimization, and careful migration of downstream
              analytics. The objective is not simply to move data to a new
              platform, but to create a more scalable and maintainable
              analytics foundation.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-blue-400/10 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm leading-6 text-gray-500">
            This case study summarizes cloud migration and modernization
            patterns based on professional data engineering experience.
            Architecture diagrams, sample validation values, and examples shown
            here are simplified for portfolio presentation and do not expose
            confidential company data or proprietary implementation details.
          </p>
        </div>
      </section>
    </main>
  );
}