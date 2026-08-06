export default function Projects() {
  return (
    <section
      id="projects"
      className="px-10 py-20"
    >

      <h2 className="text-4xl font-bold">
        Projects
      </h2>


      <div className="mt-10 grid gap-8">


        {/* Delivery Platform */}
        <div className="rounded-xl bg-slate-800 p-8">


          <h3 className="text-3xl font-bold text-blue-400">
            Delivery Standardization & Cost Optimization Platform
          </h3>


          <p className="mt-4 text-gray-300">

            An end-to-end analytics platform designed to optimize
            delivery operations, improve service levels, reduce
            cost-to-serve, and provide actionable business insights.

          </p>



          <h4 className="mt-8 text-xl font-semibold">
            Business Problem
          </h4>


          <p className="mt-3 text-gray-300">

            Delivery organizations face challenges with inefficient
            delivery frequency, missed deliveries, rising transportation
            costs, and limited operational visibility.

          </p>




          <h4 className="mt-8 text-xl font-semibold">
            Solution Architecture
          </h4>


          <div className="mt-4 rounded-lg bg-slate-900 p-5 text-gray-300">

            Source Systems
            <br />
            ↓
            <br />
            Microsoft Fabric Lakehouse
            <br />
            ↓
            <br />
            Bronze → Silver → Gold
            <br />
            ↓
            <br />
            Warehouse & Semantic Model
            <br />
            ↓
            <br />
            Power BI Dashboards + AI Assistant

          </div>




          <h4 className="mt-8 text-xl font-semibold">
            Technology Stack
          </h4>


          <div className="mt-4 flex flex-wrap gap-3">

            {[
              "Microsoft Fabric",
              "Power BI",
              "Python",
              "SQL",
              "Azure",
              "Databricks",
              "AI Analytics",
            ].map((tech) => (

              <span
                key={tech}
                className="rounded-full bg-blue-600 px-4 py-2 text-sm"
              >
                {tech}
              </span>

            ))}

          </div>




          <h4 className="mt-8 text-xl font-semibold">
            Key Capabilities
          </h4>


          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-300">

            <li>
              Delivery performance and OTIF analytics
            </li>

            <li>
              Customer delivery frequency recommendations
            </li>

            <li>
              Cost-to-serve analysis
            </li>

            <li>
              Driver productivity analytics
            </li>

            <li>
              Fuel and sustainability insights
            </li>

            <li>
              AI-powered business question answering
            </li>

          </ul>



          <div className="mt-8 flex gap-4">

            <a
              href="#"
              className="rounded-lg bg-blue-600 px-5 py-3 hover:bg-blue-700"
            >
              GitHub
            </a>


            <a
              href="#"
              className="rounded-lg border border-gray-500 px-5 py-3 hover:bg-gray-700"
            >
              Architecture
            </a>


          </div>


        </div>


      </div>


    </section>
  );
}