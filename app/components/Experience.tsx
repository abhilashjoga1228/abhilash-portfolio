"use client";


const experiences = [

{
company:"Adobe",

logo:"/Logos/adobe.png",

role:"Data Engineer / Analytics Engineer",

duration:"2026 - Present",

description:
"Built enterprise analytics solutions and supported cloud data modernization initiatives using Microsoft Fabric, Databricks, Azure, and Power BI.",

achievements:[

"Developed enterprise analytics solutions using Microsoft Fabric, Databricks, SQL, Azure, and Power BI",

"Supported migration of legacy SQL Server workloads to Databricks-based cloud data platforms",

"Designed scalable data models, ETL pipelines, and reporting workflows for analytics solutions",

"Improved data accessibility through cloud modernization and BI enablement initiatives"

],

technologies:[

"Microsoft Fabric",

"Databricks",

"Power BI",

"SQL",

"Azure"

]

},




{
company:"Swire Coca-Cola",

logo:"/Logos/swire.jpg",

role:"Business Intelligence Analyst",

duration:"2023 - 2026",

description:
"Designed scalable cloud data engineering solutions supporting enterprise analytics, data modernization, and business intelligence initiatives.",

achievements:[

"Developed enterprise Power BI dashboards and semantic models for operational and financial analytics",

"Migrated SQL Server workloads to Snowflake cloud data platform, supporting modernization of enterprise analytics",

"Migrated Snowflake analytics workloads to Microsoft Fabric architecture including Lakehouse and reporting solutions",

"Designed data models and analytical datasets to improve business reporting and decision support",

"Performed data validation, reconciliation, and quality checks during platform migration initiatives"

],

technologies:[

"Microsoft Fabric",

"Azure",

"Databricks",

"Snowflake",

"Power BI",

"Python",

"SQL"

]

},


{
company:"Amazon",

logo:"/Logos/amazon.png",

role:"Last Mile Analyst",

duration:"2020 - 2022",

description:
"Analyzed large-scale last-mile logistics operations using SQL, Amazon Redshift, Python, and analytics solutions to improve delivery performance across North America and Europe.",


achievements:[

"Analyzed operational data using SQL and Amazon Redshift to identify delivery bottlenecks, root causes, and process improvement opportunities",

"Built logistics analytics dashboards using SQL and Amazon QuickSight to monitor delivery performance, productivity, and operational KPIs",

"Integrated real-time traffic and route data using Python, APIs, Apache Airflow, and AWS services to support delivery optimization initiatives",

"Processed delivery feedback and geospatial datasets to improve map quality, routing accuracy, and last-mile delivery efficiency",

"Applied statistical analysis using Python to identify routing patterns and reduce delivery inefficiencies"

],


technologies:[

"SQL",

"Amazon Redshift",

"Python",

"AWS",

"Apache Airflow",

"Amazon QuickSight",

"Data Analytics"

]

}

];




export default function Experience(){


return (

<section

id="experience"

className="
px-6
py-24
"

>


<div

className="
mx-auto
max-w-5xl
"

>


<h2

className="
mb-16
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

Professional Experience

</h2>





<div

className="
relative
"

>


{/* Timeline Line */}

<div

className="
absolute
left-8
top-0
h-full
w-px
bg-blue-400/30
"

/>





{

experiences.map((exp,index)=>(


<div

key={exp.company}

className="
relative
mb-12
pl-20
"

>


{/* Timeline Number */}

<div

className="
absolute
left-3
top-8
flex
h-10
w-10
items-center
justify-center
rounded-full
border
border-blue-400
bg-slate-950
font-bold
text-blue-400
shadow-[0_0_20px_rgba(59,130,246,0.5)]
"

>

{index+1}

</div>






{/* Experience Card */}

<div

className="
rounded-3xl
border
border-blue-400/30
bg-slate-900/40
p-8
backdrop-blur-xl
transition
hover:-translate-y-2
hover:border-cyan-400/50
"

>



{/* Company Header */}

<div

className="
flex
items-center
gap-5
"

>


<img

src={exp.logo}

alt={exp.company}

className="
h-16
w-16
rounded-xl
bg-white
object-contain
p-2
"

/>



<div>


<h3

className="
text-2xl
font-bold
text-white
"

>

{exp.company}

</h3>



<p

className="
font-semibold
text-blue-400
"

>

{exp.role}

</p>



<p

className="
text-sm
text-gray-400
"

>

{exp.duration}

</p>


</div>


</div>





<p

className="
mt-6
leading-7
text-gray-300
"

>

{exp.description}

</p>






<h4

className="
mt-6
font-semibold
text-blue-400
"

>

Key Contributions

</h4>




<ul

className="
mt-3
space-y-2
text-gray-300
"

>


{

exp.achievements.map((item)=>(


<li

key={item}

>

✓ {item}

</li>


))

}


</ul>







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


{

exp.technologies.map((tech)=>(


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


))

}


</div>





</div>


</div>


))

}


</div>


</div>


</section>


);

}