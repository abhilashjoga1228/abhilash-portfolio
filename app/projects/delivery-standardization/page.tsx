"use client";

const architectureSteps = [
  {
    title: "Operational Sources",
    subtitle: "Orders, drivers, routes, vehicles, customer and delivery data",
    logo: "/Logos/sql.png",
  },
  {
    title: "Bronze Layer",
    subtitle: "Raw operational data ingestion and historical storage",
    logo: "/Logos/sql.png",
  },
  {
    title: "Silver Layer",
    subtitle: "Cleaning, validation, business rules, and standardization",
    logo: "/Logos/python.png",
  },
  {
    title: "Gold Layer",
    subtitle: "Business-ready fact tables, dimensions, and star schema",
    logo: "/Logos/fabric.png",
  },
  {
    title: "Semantic Model",
    subtitle: "Relationships, DAX measures, KPIs, and reporting logic",
    logo: "/Logos/powerbi.png",
  },
  {
    title: "Executive Analytics",
    subtitle: "Route, delivery, cost, productivity, and performance dashboards",
    logo: "/Logos/powerbi.png",
  },
];

export default function DeliveryStandardizationCaseStudy() {
  return (
    <main
      className="
        min-h-screen
        bg-slate-950
        px-6
        py-24
        text-white
      "
    >
      {/* Top Navigation */}
      <nav
        className="
          fixed
          top-0
          left-0
          z-50
          flex
          w-full
          items-center
          justify-between
          border-b
          border-blue-400/20
          bg-slate-950/80
          px-6
          py-4
          backdrop-blur-xl
        "
      >
        <a
          href="/"
          className="
            text-xl
            font-bold
            bg-gradient-to-r
            from-blue-400
            to-cyan-300
            bg-clip-text
            text-transparent
          "
        >
          ← Abhilash Portfolio
        </a>

        <a
          href="/#projects"
          className="
            rounded-lg
            border
            border-blue-400/40
            px-5
            py-2
            text-sm
            font-semibold
            text-blue-300
            transition
            hover:bg-blue-500/10
          "
        >
          Projects
        </a>
      </nav>

      <div
        className="
          mx-auto
          max-w-6xl
        "
      >
        {/* Hero */}
        <section className="text-center">
          <p
            className="
              text-sm
              uppercase
              tracking-widest
              text-cyan-400
            "
          >
            DATA AND ANALYTICS ENGINEERING CASE STUDY
          </p>

          <h1
            className="
              mt-6
              text-4xl
              font-bold
              bg-gradient-to-r
              from-blue-400
              to-cyan-300
              bg-clip-text
              text-transparent
              md:text-6xl
            "
          >
            Delivery Standardization & Cost Optimization Platform
          </h1>

          <p
            className="
              mx-auto
              mt-6
              max-w-3xl
              text-lg
              leading-8
              text-gray-300
            "
          >
            Enterprise analytics platform designed to standardize delivery
            performance measurement, identify operational inefficiencies,
            optimize delivery frequency, reduce transportation costs, and
            improve sustainability visibility.
          </p>

          <div
            className="
              mt-8
              flex
              flex-wrap
              justify-center
              gap-3
            "
          >
            {[
              "Microsoft Fabric",
              "Power BI",
              "Python",
              "SQL",
              "Data Modeling",
              "Analytics Engineering",
            ].map((skill) => (
              <span
                key={skill}
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
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Compact Route Optimization Visual */}
        <section className="mt-16">
          <div
            className="
              grid
              items-center
              gap-8
              rounded-3xl
              border
              border-blue-400/20
              bg-slate-900/40
              p-6
              md:grid-cols-[0.9fr_1.1fr]
              md:p-8
            "
          >
            <div>
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-cyan-400
                "
              >
                Portfolio Recreation
              </p>

              <h2
                className="
                  mt-3
                  text-2xl
                  font-bold
                  text-white
                "
              >
                Route Optimization Overview
              </h2>

              <p
                className="
                  mt-4
                  leading-7
                  text-gray-300
                "
              >
                Executive-level view of distribution-center coverage, route
                optimization status, stop reduction, and service performance.
              </p>

              <div
                className="
                  mt-5
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {[
                  "Network Coverage",
                  "Stops YoY",
                  "Service Rate",
                  "Optimization Status",
                ].map((item) => (
                  <span
                    key={item}
                    className="
                      rounded-full
                      border
                      border-blue-400/20
                      bg-blue-500/5
                      px-3
                      py-1.5
                      text-xs
                      text-blue-300
                    "
                  >
                    {item}
                  </span>
                ))}
              </div>

              <p
                className="
                  mt-5
                  text-sm
                  leading-6
                  text-gray-500
                "
              >
                Synthetic portfolio recreation. No proprietary company data is shown.
              </p>
            </div>

            <div
              className="
                flex
                justify-center
                md:justify-end
              "
            >
              <img
                src="/projects/route-optimization-dashboard.png"
                alt="Route optimization dashboard"
                className="
                  w-full
                  max-w-lg
                  rounded-2xl
                  border
                  border-white/10
                  object-cover
                  shadow-lg
                "
              />
            </div>
          </div>
        </section>

        {/* Business Challenge */}
        <section className="mt-24">
          <h2
            className="
              text-3xl
              font-bold
              text-cyan-300
            "
          >
            Business Challenge
          </h2>

          <p
            className="
              mt-5
              leading-8
              text-gray-300
            "
          >
            Distribution operations can suffer from inconsistent delivery
            frequencies, inefficient routes, increased transportation costs,
            driver overtime, and limited visibility into operational performance.
          </p>

          <div
            className="
              mt-8
              grid
              gap-4
              md:grid-cols-2
            "
          >
            {[
              "Unnecessary delivery stops",
              "Low-volume deliveries",
              "Driver overtime",
              "Higher fuel consumption",
              "Hotshot deliveries",
              "Missed or delayed deliveries",
            ].map((item) => (
              <div
                key={item}
                className="
                  rounded-xl
                  border
                  border-blue-400/20
                  bg-slate-900/50
                  p-5
                "
              >
                ❌ {item}
              </div>
            ))}
          </div>
        </section>

        {/* Solution Architecture */}
        <section className="mt-24">
          <h2
            className="
              text-3xl
              font-bold
              text-cyan-300
            "
          >
            Solution Architecture
          </h2>

          <p
            className="
              mt-4
              max-w-4xl
              leading-8
              text-gray-300
            "
          >
            The platform follows a layered analytics architecture that moves
            operational delivery data from raw ingestion through standardized
            business models and finally into governed Power BI analytics.
          </p>

          <div
            className="
              mt-10
              grid
              gap-6
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {architectureSteps.map((step, index) => (
              <div
                key={step.title}
                className="
                  relative
                  rounded-3xl
                  border
                  border-blue-400/25
                  bg-slate-900/50
                  p-6
                  shadow-[0_0_30px_rgba(59,130,246,0.08)]
                "
              >
                <div
                  className="
                    flex
                    items-start
                    gap-4
                  "
                >
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
                      border-blue-400/30
                      bg-slate-950
                    "
                  >
                    <img
                      src={step.logo}
                      alt={step.title}
                      className="
                        h-10
                        w-10
                        object-contain
                      "
                    />
                  </div>

                  <div>
                    <p
                      className="
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-cyan-400
                      "
                    >
                      Step {index + 1}
                    </p>

                    <h3
                      className="
                        mt-2
                        text-xl
                        font-bold
                        text-white
                      "
                    >
                      {step.title}
                    </h3>

                    <p
                      className="
                        mt-2
                        text-sm
                        leading-6
                        text-gray-300
                      "
                    >
                      {step.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Horizontal Data Flow */}
          <div
            className="
              mt-8
              rounded-3xl
              border
              border-cyan-400/20
              bg-slate-900/50
              p-7
            "
          >
            <h3
              className="
                text-lg
                font-bold
                text-cyan-300
              "
            >
              End-to-End Data Flow
            </h3>

            <div
              className="
                mt-6
                flex
                flex-wrap
                items-center
                gap-3
              "
            >
              {[
                "Sources",
                "Bronze",
                "Silver",
                "Gold",
                "Semantic Model",
                "Power BI",
              ].map((item, index) => (
                <div
                  key={item}
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <span
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
                    {item}
                  </span>

                  {index !== 5 && (
                    <span
                      className="
                        text-lg
                        text-cyan-400
                      "
                    >
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Engineering Layers */}
          <div
            className="
              mt-6
              grid
              gap-5
              md:grid-cols-3
            "
          >
            <div
              className="
                rounded-2xl
                border
                border-blue-400/20
                bg-slate-900/50
                p-6
              "
            >
              <h3 className="font-bold text-blue-300">
                Data Engineering
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-300">
                SQL and Python pipelines ingest, clean, validate, and standardize
                operational delivery data.
              </p>
            </div>

            <div
              className="
                rounded-2xl
                border
                border-blue-400/20
                bg-slate-900/50
                p-6
              "
            >
              <h3 className="font-bold text-blue-300">
                Analytics Modeling
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-300">
                Gold-layer fact and dimension tables support reusable business
                logic, KPIs, and semantic modeling.
              </p>
            </div>

            <div
              className="
                rounded-2xl
                border
                border-blue-400/20
                bg-slate-900/50
                p-6
              "
            >
              <h3 className="font-bold text-blue-300">
                Business Intelligence
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-300">
                Power BI dashboards surface delivery, cost, productivity, route,
                and optimization insights for operational leaders.
              </p>
            </div>
          </div>
        </section>

        {/* Dashboard Capabilities */}
        <section className="mt-24">
          <h2
            className="
              text-3xl
              font-bold
              text-cyan-300
            "
          >
            Dashboard Capabilities
          </h2>

          <p
            className="
              mt-5
              max-w-4xl
              leading-8
              text-gray-300
            "
          >
            The analytics layer was designed to help operational leaders move
            from static reporting toward actionable delivery-performance
            monitoring and route optimization.
          </p>

          <div
            className="
              mt-8
              grid
              gap-5
              md:grid-cols-2
              lg:grid-cols-3
            "
          >
            {[
              [
                "Network Visibility",
                "Monitor distribution-center activity and regional delivery performance from a centralized view.",
              ],
              [
                "Stops Analysis",
                "Compare stop volumes and year-over-year movement to identify changes in delivery activity.",
              ],
              [
                "SLA Monitoring",
                "Track service-level performance and highlight areas requiring operational attention.",
              ],
              [
                "Rerouting Analysis",
                "Separate rerouted and non-rerouted delivery activity to monitor optimization behavior.",
              ],
              [
                "Geographic Analytics",
                "Visualize regional delivery activity and operational coverage using map-based analysis.",
              ],
              [
                "Executive Decision Support",
                "Provide leadership with concise KPI summaries for delivery-standardization decisions.",
              ],
            ].map(([title, description]) => (
              <div
                key={title}
                className="
                  rounded-2xl
                  border
                  border-blue-400/20
                  bg-slate-900/50
                  p-6
                "
              >
                <h3
                  className="
                    font-bold
                    text-blue-300
                  "
                >
                  {title}
                </h3>

                <p
                  className="
                    mt-3
                    leading-7
                    text-gray-300
                  "
                >
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Route Adherence Featured Visual */}
        <section className="mt-24">
          <div
            className="
              rounded-3xl
              border
              border-cyan-400/25
              bg-slate-900/50
              p-5
              shadow-[0_0_60px_rgba(34,211,238,0.08)]
              md:p-8
            "
          >
            <div
              className="
                mb-6
                flex
                flex-col
                gap-4
                md:flex-row
                md:items-end
                md:justify-between
              "
            >
              <div>
                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-cyan-400
                  "
                >
                  Operational Analytics
                </p>

                <h2
                  className="
                    mt-2
                    text-3xl
                    font-bold
                    text-white
                  "
                >
                  Route Adherence & Execution Analytics
                </h2>

                <p
                  className="
                    mt-4
                    max-w-3xl
                    leading-7
                    text-gray-300
                  "
                >
                  Detailed operational view comparing planned versus actual
                  routes, driver adherence, stop sequencing, route-level
                  exceptions, and execution performance.
                </p>
              </div>

              <span
                className="
                  w-fit
                  rounded-full
                  border
                  border-emerald-400/30
                  bg-emerald-500/10
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  text-emerald-300
                "
              >
                Synthetic Data
              </span>
            </div>

            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-slate-950
              "
            >
              <img
                src="/projects/route-adherence-analytics.png"
                alt="Route adherence and execution analytics dashboard"
                className="
                  w-full
                  object-cover
                "
              />
            </div>

            <div
              className="
                mt-6
                grid
                gap-4
                md:grid-cols-2
                lg:grid-cols-4
              "
            >
              {[
                [
                  "Planned vs Actual",
                  "Compare planned route sequences with actual execution.",
                ],
                [
                  "Driver Adherence",
                  "Measure route-level and driver-level adherence performance.",
                ],
                [
                  "Stop Variance",
                  "Identify additional, skipped, or reordered stops.",
                ],
                [
                  "Execution Exceptions",
                  "Highlight routes requiring operational follow-up.",
                ],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="
                    rounded-xl
                    border
                    border-blue-400/20
                    bg-blue-500/5
                    p-4
                  "
                >
                  <h3
                    className="
                      text-sm
                      font-semibold
                      text-blue-300
                    "
                  >
                    {title}
                  </h3>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-6
                      text-gray-400
                    "
                  >
                    {description}
                  </p>
                </div>
              ))}
            </div>

            <p
              className="
                mt-5
                text-sm
                leading-6
                text-gray-500
              "
            >
              Portfolio recreation using synthetic names, identifiers, route
              data, addresses, and performance values.
            </p>
          </div>
        </section>

        {/* Data Model */}
        <section className="mt-24">
          <h2
            className="
              text-3xl
              font-bold
              text-cyan-300
            "
          >
            Data Model Design
          </h2>

          <div
            className="
              mt-8
              grid
              gap-8
              md:grid-cols-2
            "
          >
            <div
              className="
                rounded-3xl
                border
                border-blue-400/30
                bg-slate-900/50
                p-8
              "
            >
              <h3 className="text-xl font-bold text-blue-300">
                Fact Tables
              </h3>

              <ul className="mt-4 space-y-2 text-gray-300">
                <li>FactDeliveryOrders</li>
                <li>FactDriverProductivity</li>
                <li>FactFuelPurchases</li>
              </ul>
            </div>

            <div
              className="
                rounded-3xl
                border
                border-blue-400/30
                bg-slate-900/50
                p-8
              "
            >
              <h3 className="text-xl font-bold text-blue-300">
                Dimension Tables
              </h3>

              <ul className="mt-4 space-y-2 text-gray-300">
                <li>DimCustomer</li>
                <li>DimDriver</li>
                <li>DimVehicle</li>
                <li>DimMaterial</li>
                <li>DimRoute</li>
              </ul>
            </div>
          </div>
        </section>

        {/* KPIs */}
        <section className="mt-24">
          <h2
            className="
              text-3xl
              font-bold
              text-cyan-300
            "
          >
            Key Analytics & KPIs
          </h2>

          <div
            className="
              mt-8
              grid
              gap-6
              md:grid-cols-3
            "
          >
            {[
              ["Service", "OTIF, SLA, On-Time Delivery"],
              ["Productivity", "Cases per Hour, Cases per Stop"],
              ["Financial", "Cost to Serve, Cost per Stop"],
              ["Customer", "Delivery Frequency Analysis"],
              ["Sustainability", "Fuel and CO₂ Metrics"],
              ["Optimization", "Frequency Recommendations"],
            ].map(([title, value]) => (
              <div
                key={title}
                className="
                  rounded-2xl
                  border
                  border-blue-400/30
                  bg-slate-900/60
                  p-6
                "
              >
                <h3 className="font-bold text-blue-300">
                  {title}
                </h3>

                <p className="mt-3 text-gray-300">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Technology */}
        <section className="mt-24">
          <h2
            className="
              text-3xl
              font-bold
              text-cyan-300
            "
          >
            Technology Stack
          </h2>

          <div
            className="
              mt-6
              flex
              flex-wrap
              gap-3
            "
          >
            {[
              "Microsoft Fabric",
              "Power BI",
              "SQL Server",
              "Python",
              "DAX",
              "Power Automate",
              "Data Modeling",
              "Power Apps",
              "GitHub Actions",
            ].map((tech) => (
              <span
                key={tech}
                className="
                  rounded-full
                  border
                  border-blue-400/30
                  bg-blue-500/10
                  px-4
                  py-2
                  text-blue-300
                "
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Business Impact */}
        <section
          className="
            mt-24
            rounded-3xl
            border
            border-cyan-400/30
            bg-slate-900/60
            p-10
          "
        >
          <h2
            className="
              text-3xl
              font-bold
              text-cyan-300
            "
          >
            Business Impact
          </h2>

          <ul
            className="
              mt-6
              space-y-3
              text-gray-300
            "
          >
            <li>
              ✓ Reduced delivery stops by 12.5% through delivery frequency
              optimization
            </li>

            <li>
              ✓ Reduced transportation costs by 23% through logistics and route
              analytics
            </li>

            <li>
              ✓ Improved driver and delivery productivity through KPI-driven
              performance analysis
            </li>

            <li>
              ✓ Enabled cost-to-serve analysis to identify high-cost and
              low-efficiency deliveries
            </li>

            <li>
              ✓ Built executive Power BI analytics for delivery performance,
              productivity, and cost optimization
            </li>
          </ul>
        </section>

        {/* Portfolio Disclaimer */}
        <section
          className="
            mt-10
            rounded-2xl
            border
            border-amber-400/20
            bg-amber-500/5
            p-6
          "
        >
          <p
            className="
              text-sm
              leading-7
              text-gray-400
            "
          >
            <span className="font-semibold text-amber-300">
              Portfolio Note:
            </span>{" "}
            Dashboard visuals on this page are recreated for portfolio
            demonstration using synthetic and anonymized data. They illustrate
            solution patterns and analytics capabilities without exposing
            proprietary company information.
          </p>
        </section>
      </div>
    </main>
  );
}