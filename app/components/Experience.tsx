export default function Experience() {
  return (
    <section
      id="experience"
      className="px-10 py-20"
    >

      <h2 className="text-4xl font-bold">
        Experience
      </h2>


      <div className="relative mt-10 border-l border-slate-700 pl-8">


        {/* Adobe */}
        <div className="mb-12">

          <div className="absolute -left-3 mt-2 h-6 w-6 rounded-full bg-blue-500"></div>

          <h3 className="text-2xl font-bold text-blue-400">
            Adobe
          </h3>

          <p className="mt-2 text-xl font-semibold">
            Data Engineer
          </p>

          <p className="text-gray-400">
            2026
          </p>


          <ul className="mt-5 list-disc space-y-2 pl-5 text-gray-300">

            <li>
              Built analytics solutions using Microsoft Fabric,
              Power BI, SQL, and cloud data platforms.
            </li>

            <li>
              Developed reporting solutions, data models, and
              dashboards to support business decision-making.
            </li>

            <li>
              Improved data accessibility through automation and
              optimized analytics workflows.
            </li>

          </ul>

        </div>




        {/* Swire */}
        <div className="mb-12">

          <div className="absolute -left-3 mt-2 h-6 w-6 rounded-full bg-blue-500"></div>

          <h3 className="text-2xl font-bold text-blue-400">
            Swire Coca-Cola
          </h3>

          <p className="mt-2 text-xl font-semibold">
            Business Intelligence Analyst
          </p>

          <p className="text-gray-400">
            2023 - 2026
          </p>


          <ul className="mt-5 list-disc space-y-2 pl-5 text-gray-300">

            <li>
              Designed enterprise BI solutions using Power BI,
              Azure, SQL, and modern data engineering practices.
            </li>

            <li>
              Built transportation, delivery, and operational
              analytics dashboards for business teams.
            </li>

            <li>
              Automated reporting processes and optimized data
              pipelines to improve operational visibility.
            </li>

          </ul>

        </div>




        {/* Amazon */}
        <div className="mb-12">

          <div className="absolute -left-3 mt-2 h-6 w-6 rounded-full bg-blue-500"></div>

          <h3 className="text-2xl font-bold text-blue-400">
            Amazon
          </h3>

          <p className="mt-2 text-xl font-semibold">
            Data Engineer
          </p>

          <p className="text-gray-400">
            Previous Experience
          </p>


          <ul className="mt-5 list-disc space-y-2 pl-5 text-gray-300">

            <li>
              Developed scalable data pipelines and analytics
              solutions supporting enterprise business operations.
            </li>

            <li>
              Worked with SQL, Python, cloud technologies, and
              data processing frameworks to transform large datasets.
            </li>

            <li>
              Built reporting and data solutions to improve
              operational insights and decision-making.
            </li>

          </ul>

        </div>


      </div>

    </section>
  );
}