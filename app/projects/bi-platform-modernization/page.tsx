"use client";

const operatingModelSteps = [
  {
    step: "01",
    title: "Development",
    subtitle: "Build analytics solutions",
    logo: "/Logos/powerplatform.png",
    items: ["Power BI", "Power Apps", "Power Automate"],
    type: "image",
  },
  {
    step: "02",
    title: "Source Control",
    subtitle: "Track and govern changes",
    logo: "",
    items: ["PBIP", "Git", "Version History"],
    type: "git",
  },
  {
    step: "03",
    title: "Deployment",
    subtitle: "Promote validated releases",
    logo: "/Logos/powerbi.png",
    items: ["Development", "Test", "Production"],
    type: "image",
  },
  {
    step: "04",
    title: "Governance",
    subtitle: "Centralize ownership",
    logo: "/Logos/azure.png",
    items: ["Service Accounts", "Credentials", "Access"],
    type: "image",
  },
  {
    step: "05",
    title: "Production",
    subtitle: "Operate and support",
    logo: "/Logos/powerbi.png",
    items: ["Governed", "Monitored", "Maintainable"],
    type: "image",
  },
];

export default function BIPlatformModernizationCaseStudy() {
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
            BI / PLATFORM MODERNIZATION
          </span>

          <h1 className="mt-8 max-w-5xl bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-6xl">
            Enterprise BI & Power Platform Modernization
          </h1>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-gray-300">
            A modernization initiative focused on improving how enterprise
            Power BI, Power Apps, and Power Automate solutions are developed,
            versioned, deployed, owned, monitored, and supported in production.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {[
              "Power BI",
              "PBIP",
              "Git",
              "Deployment Pipelines",
              "Power Apps",
              "Power Automate",
              "ALM",
              "Service Accounts",
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
            As enterprise BI and Power Platform solutions grow, development can
            become difficult to manage when reports, applications, flows,
            credentials, and deployments depend too heavily on individual
            developers or manual processes.
          </p>

          <p className="mt-5 max-w-4xl leading-8 text-gray-300">
            The objective of this modernization effort was to introduce more
            structured development standards, repeatable deployment practices,
            source control, governed production ownership, automated monitoring,
            and improved application lifecycle management across Power BI and
            Power Platform solutions.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              "Limited source control for Power BI development",
              "Manual or inconsistent deployment processes",
              "Production solutions tied to individual developer ownership",
              "Personal credentials used in enterprise connections",
              "Inconsistent Dev, Test, and Production practices",
              "Limited visibility into solution changes and version history",
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

      {/* Modernization Strategy */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Modernization Strategy
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-300">
            The modernization approach focused on moving from developer-centric
            ownership and manual deployment toward a governed and repeatable
            enterprise operating model.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-red-400/20 bg-slate-900/40 p-8">
              <div className="text-sm font-semibold text-red-300">
                BEFORE
              </div>

              <ul className="mt-6 space-y-4 text-gray-300">
                <li>• Developer-owned reports and solutions</li>
                <li>• Limited Power BI source control</li>
                <li>• Manual deployment between environments</li>
                <li>• Personal credentials used in connections</li>
                <li>• Limited change history</li>
                <li>• Production dependency on individual users</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-cyan-400/30 bg-cyan-500/5 p-8">
              <div className="text-sm font-semibold text-cyan-300">
                AFTER
              </div>

              <ul className="mt-6 space-y-4 text-gray-300">
                <li>• PBIP-based source control with Git</li>
                <li>• Standardized deployment pipelines</li>
                <li>• Dev → Test → Production promotion process</li>
                <li>• Governed service-account ownership</li>
                <li>• Improved version history and traceability</li>
                <li>• Repeatable ALM and support practices</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Target Operating Model */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              ENTERPRISE OPERATING MODEL
            </div>

            <h2 className="mt-3 text-3xl font-bold text-white">
              Target Operating Model
            </h2>

            <p className="mt-6 max-w-4xl leading-8 text-gray-300">
              The target model connects development, source control,
              environment promotion, governance, and production support into a
              controlled lifecycle for enterprise BI and Power Platform
              solutions.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {operatingModelSteps.map((item, index) => (
              <div
                key={item.title}
                className="group relative rounded-3xl border border-blue-400/20 bg-slate-900/50 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-900/70"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.2em] text-cyan-400">
                    STEP {item.step}
                  </span>

                  {index < operatingModelSteps.length - 1 && (
                    <span className="hidden text-xl text-cyan-400 xl:block">
                      →
                    </span>
                  )}
                </div>

                <div className="mt-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/20 bg-slate-950">
                  {item.type === "image" ? (
                    <img
                      src={item.logo}
                      alt={item.title}
                      className="h-10 w-10 object-contain"
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-sm font-black text-white">
                      Git
                    </div>
                  )}
                </div>

                <h3 className="mt-6 text-xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-gray-400">
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

          <div className="mt-8 rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 p-7">
            <h3 className="text-lg font-bold text-cyan-300">
              Enterprise BI Lifecycle
            </h3>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {[
                "Develop",
                "Version",
                "Validate",
                "Deploy",
                "Govern",
                "Monitor",
                "Support",
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

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-blue-400/20 bg-slate-900/50 p-6">
              <h3 className="font-bold text-blue-300">
                Controlled Development
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-300">
                Developers work in structured environments with source control,
                validation practices, and clear change history.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-400/20 bg-slate-900/50 p-6">
              <h3 className="font-bold text-blue-300">
                Governed Deployment
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-300">
                Solutions move through Dev, Test, and Production using
                controlled promotion and release practices.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-400/20 bg-slate-900/50 p-6">
              <h3 className="font-bold text-blue-300">
                Sustainable Production
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-300">
                Production ownership, credentials, monitoring, and support are
                designed to reduce dependency on individual developers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PBIP + Git */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Power BI Version Control with PBIP & Git
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-300">
            One of the major improvements was introducing a source-control
            approach for Power BI development using Power BI Project files
            (PBIP) and Git.
          </p>

          <p className="mt-5 max-w-4xl leading-8 text-gray-300">
            PBIP allows report and semantic-model artifacts to be represented
            as project files that can participate in modern source-control
            workflows rather than relying only on standalone PBIX files.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              "Stored Power BI project artifacts in source control",
              "Introduced Git-based version history",
              "Improved visibility into development changes",
              "Supported controlled collaboration across developers",
              "Created a foundation for repeatable deployment practices",
              "Reduced reliance on unmanaged standalone report files",
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

      {/* Deployment Pipelines */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Deployment Pipelines
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-300">
            Deployment pipelines were used to create a structured promotion
            process between development, testing, and production environments.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-blue-400/20 bg-slate-900/40 p-7">
              <div className="text-sm font-semibold text-blue-300">
                DEVELOPMENT
              </div>

              <h3 className="mt-4 text-xl font-bold text-white">
                Build & Validate
              </h3>

              <p className="mt-4 leading-7 text-gray-300">
                Reports, semantic models, applications, and automation changes
                are developed and validated before promotion.
              </p>
            </div>

            <div className="rounded-3xl border border-cyan-400/30 bg-slate-900/40 p-7">
              <div className="text-sm font-semibold text-cyan-300">
                TEST
              </div>

              <h3 className="mt-4 text-xl font-bold text-white">
                Controlled Testing
              </h3>

              <p className="mt-4 leading-7 text-gray-300">
                Changes are promoted into a controlled testing environment for
                validation before production deployment.
              </p>
            </div>

            <div className="rounded-3xl border border-blue-400/20 bg-slate-900/40 p-7">
              <div className="text-sm font-semibold text-blue-300">
                PRODUCTION
              </div>

              <h3 className="mt-4 text-xl font-bold text-white">
                Governed Release
              </h3>

              <p className="mt-4 leading-7 text-gray-300">
                Approved solutions are promoted into production using a more
                consistent and repeatable deployment process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Power Platform ALM */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Power Apps & Power Automate ALM
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-300">
            The same modernization principles were extended beyond Power BI to
            Power Apps and Power Automate solutions.
          </p>

          <p className="mt-5 max-w-4xl leading-8 text-gray-300">
            The goal was to improve application lifecycle management by making
            solution development, testing, deployment, ownership, and support
            more consistent across environments.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              "Introduced structured environment promotion practices",
              "Reduced manual deployment dependency",
              "Improved solution ownership and supportability",
              "Standardized deployment between Dev, Test, and Production",
              "Improved lifecycle management for applications and flows",
              "Created more repeatable enterprise development practices",
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

      {/* Automated BI Monitoring */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
                POWER AUTOMATE ORCHESTRATION
              </div>

              <h2 className="mt-3 text-3xl font-bold text-white">
                Automated BI Monitoring & Refresh Orchestration
              </h2>

              <p className="mt-6 max-w-4xl leading-8 text-gray-300">
                Power Automate workflows were used to orchestrate recurring BI
                validation, conditional refresh execution, status evaluation,
                and automated notifications across analytics solutions.
              </p>
            </div>

            <span className="w-fit rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-300">
              Sanitized Portfolio Visual
            </span>
          </div>

          {/* Main Flow */}
          <div className="mt-8 rounded-3xl border border-blue-400/20 bg-slate-900/40 p-5">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <h3 className="text-xl font-bold text-blue-300">
                  Validation & Refresh Orchestration
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-300">
                  A scheduled workflow performs automated validation checks,
                  evaluates results, executes refresh actions when validation
                  passes, and routes failures through notification paths for
                  operational follow-up.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      title: "Scheduled Validation",
                      description:
                        "Recurring checks before downstream refresh.",
                    },
                    {
                      title: "Conditional Logic",
                      description:
                        "Validation controls the next processing step.",
                    },
                    {
                      title: "Dataset Refresh",
                      description:
                        "Refresh runs after validation succeeds.",
                    },
                    {
                      title: "Operational Alerts",
                      description:
                        "Teams and email surface failures.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl border border-blue-400/20 bg-blue-500/5 p-3"
                    >
                      <h4 className="text-sm font-semibold text-blue-300">
                        {item.title}
                      </h4>

                      <p className="mt-1 text-xs leading-5 text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-white">
                  <img
                    src="/projects/power-automate-validation-main.png"
                    alt="Power Automate BI validation and refresh orchestration workflow"
                    className="mx-auto max-h-[300px] w-auto max-w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Supporting Flow */}
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-blue-400/20 bg-slate-900/40 p-7">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                FAILURE HANDLING
              </div>

              <h3 className="mt-3 text-2xl font-bold text-white">
                Validation, Status Parsing & Notification
              </h3>

              <p className="mt-5 leading-7 text-gray-300">
                Supporting automation handles result parsing and operational
                exception management. Failed validation or refresh conditions
                can trigger targeted Teams and email notifications, allowing
                support teams to identify issues without manually monitoring
                each dataset.
              </p>

              <div className="mt-6 space-y-3 text-sm text-gray-300">
                {[
                  "Parse validation and refresh status",
                  "Detect failed or incomplete execution",
                  "Route exceptions to Teams notifications",
                  "Send email-based failure alerts",
                  "Support post-refresh validation",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-blue-400/20 bg-slate-950/50 p-4"
                  >
                    ✓ {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center rounded-3xl border border-blue-400/20 bg-slate-900/40 p-5 md:p-7">
              <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-white">
                <img
                  src="/projects/power-automate-validation-alerts.png"
                  alt="Power Automate validation and notification workflow"
                  className="mx-auto max-h-[300px] w-auto max-w-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-8 lg:grid-cols-2">
            <div />

            <p className="mx-auto max-w-xl text-sm leading-6 text-gray-500">
              Flow labels and business-specific terminology have been sanitized
              for portfolio presentation. No credentials, internal identifiers,
              production configuration, or proprietary data are shown.
            </p>
          </div>

          {/* Automation Flow */}
          <div className="mt-8 rounded-3xl border border-cyan-400/20 bg-cyan-500/5 p-7">
            <h3 className="text-lg font-bold text-cyan-300">
              Automation Pattern
            </h3>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {[
                "Scheduled Trigger",
                "BI Validation",
                "Condition Check",
                "Dataset Refresh",
                "Post-Refresh Validation",
                "Teams / Email Alert",
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
        </div>
      </section>

      {/* Service Accounts */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Service Accounts & Credential Governance
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-300">
            Production BI and Power Platform solutions should not depend on an
            individual employee&apos;s personal credentials whenever a
            governed service-account model is appropriate.
          </p>

          <p className="mt-5 max-w-4xl leading-8 text-gray-300">
            The modernization approach moved production ownership and
            credentials toward shared enterprise service accounts, improving
            continuity and reducing operational dependency on individual users.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-red-400/20 bg-slate-900/40 p-7">
              <div className="text-sm font-semibold text-red-300">
                INDIVIDUAL OWNERSHIP
              </div>

              <ul className="mt-5 space-y-3 text-gray-300">
                <li>• Personal user credentials</li>
                <li>• Individual application ownership</li>
                <li>• Risk when employees change roles or leave</li>
                <li>• Difficult production support</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-cyan-400/30 bg-cyan-500/5 p-7">
              <div className="text-sm font-semibold text-cyan-300">
                GOVERNED OWNERSHIP
              </div>

              <ul className="mt-5 space-y-3 text-gray-300">
                <li>• Governed service accounts</li>
                <li>• Centralized production ownership</li>
                <li>• Improved credential continuity</li>
                <li>• Better support and maintainability</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ownership */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Ownership & Support Model
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-300">
            Platform modernization also requires clear responsibility for who
            develops, approves, deploys, owns, and supports production
            solutions.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Develop",
                description:
                  "Build and test changes using standardized development practices.",
              },
              {
                title: "Review",
                description:
                  "Validate changes before promotion into higher environments.",
              },
              {
                title: "Deploy",
                description:
                  "Promote approved solutions through controlled deployment pipelines.",
              },
              {
                title: "Support",
                description:
                  "Maintain production solutions through governed ownership and credentials.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-blue-400/20 bg-slate-900/40 p-7"
              >
                <h3 className="text-xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Standards */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Development Best Practices
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Use source control for supported BI project artifacts",
              "Separate development, testing, and production environments",
              "Use repeatable deployment processes",
              "Avoid unnecessary dependency on personal credentials",
              "Establish clear production ownership",
              "Document application and report dependencies",
              "Maintain version history for production changes",
              "Validate changes before deployment",
              "Standardize naming and environment practices",
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

      {/* Business Impact */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Business & Technical Impact
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              "Introduced version control for Power BI using PBIP and Git",
              "Standardized Dev, Test, and Production deployment practices",
              "Improved change tracking and solution traceability",
              "Implemented structured ALM practices for Power Apps and Power Automate",
              "Automated BI validation, refresh monitoring, and operational notifications",
              "Reduced dependency on individual developer credentials",
              "Improved production ownership through governed service accounts",
              "Established repeatable BI and Power Platform development standards",
              "Improved maintainability and long-term supportability of enterprise solutions",
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
                Business Intelligence
              </h3>

              <div className="mt-4 space-y-2 text-gray-300">
                <p>Power BI</p>
                <p>PBIP</p>
                <p>Semantic Models</p>
                <p>Power BI Service</p>
              </div>
            </div>

            <div className="rounded-3xl border border-blue-400/20 bg-slate-900/50 p-6">
              <h3 className="font-bold text-blue-300">
                Power Platform
              </h3>

              <div className="mt-4 space-y-2 text-gray-300">
                <p>Power Apps</p>
                <p>Power Automate</p>
                <p>Solutions</p>
                <p>ALM</p>
              </div>
            </div>

            <div className="rounded-3xl border border-blue-400/20 bg-slate-900/50 p-6">
              <h3 className="font-bold text-blue-300">
                DevOps & Deployment
              </h3>

              <div className="mt-4 space-y-2 text-gray-300">
                <p>Git</p>
                <p>Version Control</p>
                <p>Deployment Pipelines</p>
                <p>Environment Promotion</p>
              </div>
            </div>

            <div className="rounded-3xl border border-blue-400/20 bg-slate-900/50 p-6">
              <h3 className="font-bold text-blue-300">
                Governance
              </h3>

              <div className="mt-4 space-y-2 text-gray-300">
                <p>Service Accounts</p>
                <p>Credential Governance</p>
                <p>Ownership</p>
                <p>Production Support</p>
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
              Enterprise BI requires more than building dashboards.
            </h2>

            <p className="mt-5 max-w-4xl leading-8 text-gray-300">
              Sustainable analytics platforms require source control,
              environment management, deployment standards, automated
              monitoring, governed credentials, clear ownership, and repeatable
              application lifecycle practices. The modernization effort created
              a stronger operating model for Power BI and Power Platform
              solutions while reducing dependency on individual developers.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-blue-400/10 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm leading-6 text-gray-500">
            This case study summarizes enterprise BI and Power Platform
            modernization patterns based on professional experience. Workflow
            labels and examples shown in portfolio visuals have been sanitized
            for presentation. The case study does not expose confidential
            company environments, credentials, customer information, production
            configuration, or proprietary implementation details.
          </p>
        </div>
      </section>
    </main>
  );
}