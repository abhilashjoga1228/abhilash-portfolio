export default function Projects() {


const projects = [

{
featured:true,

category:"DATA ENGINEERING",

title:"Delivery Standardization & Cost Optimization Platform",

description:
"Enterprise analytics platform designed to identify delivery inefficiencies, optimize delivery frequency, reduce operational costs, and improve logistics performance.",


architecture:[

"Operational Data",

"Python Data Pipeline",

"Microsoft Fabric Lakehouse",

"Semantic Model",

"Power BI Analytics"

],


technologies:[

"Microsoft Fabric",

"Power BI",

"Python",

"SQL",

"Data Modeling"

],


impact:[

"Operational KPI monitoring",

"Cost-to-serve analysis",

"Delivery frequency optimization",

"Driver productivity insights"

]

},



{

category:"CLOUD DATA PLATFORM",

title:"Enterprise Lakehouse & Analytics Platform",

description:
"Modern cloud data architecture integrating enterprise sources into scalable analytics platforms.",


architecture:[

"Source Systems",

"ETL / ELT",

"Lakehouse",

"Warehouse",

"BI Layer"

],


technologies:[

"Azure Data Factory",

"Databricks",

"Snowflake",

"Azure Synapse",

"SQL"

],


impact:[

"Scalable data pipelines",

"Improved data availability",

"Optimized analytical workloads",

"Enterprise reporting enablement"

]

},



{

category:"AI / ANALYTICS",

title:"AI Powered Analytics Assistant",

description:
"AI assistant concept enabling users to interact with enterprise data using natural language.",


architecture:[

"Business Question",

"LLM Agent",

"Data Retrieval",

"Analytics Response"

],


technologies:[

"Python",

"LLM",

"RAG",

"Vector Search",

"Power BI"

],


impact:[

"Natural language analytics",

"Automated insights",

"Reduced reporting effort",

"AI driven decision support"

]

},



{

category:"BUSINESS INTELLIGENCE",

title:"Executive BI Analytics Platform",

description:
"Business intelligence solution providing interactive dashboards, semantic models, and advanced analytics.",


architecture:[

"Data Sources",

"SQL Models",

"Semantic Model",

"Power BI Reports"

],


technologies:[

"Power BI",

"DAX",

"Semantic Models",

"SQL",

"Visualization"

],


impact:[

"Executive dashboards",

"KPI tracking",

"Self-service analytics",

"Business reporting automation"

]

}

];






return (

<section

id="projects"

className="
px-6
py-24
"

>


<div

className="
mx-auto
max-w-6xl
"

>



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

Real-world data engineering, cloud platforms,
analytics solutions, and AI applications.

</p>






<div

className="
mt-12
grid
gap-8
md:grid-cols-2
"

>



{

projects.map((project)=>(


<div

key={project.title}

className={`

rounded-3xl

border

bg-slate-900/40

p-8

backdrop-blur-xl

transition

hover:-translate-y-2


${
project.featured

?

"border-cyan-400/50 shadow-[0_0_50px_rgba(34,211,238,0.15)]"

:

"border-blue-400/30 hover:border-cyan-400/50"

}

`}

>






{/* Category */}


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





{

project.featured &&

<span

className="
ml-2
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

}







<h3

className="
mt-5
text-2xl
font-bold
text-white
"

>

{project.title}

</h3>





<p

className="
mt-4
text-gray-300
leading-7
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
items-center
gap-2
"

>


{

project.architecture.map((step,index)=>(


<div

key={step}

className="
flex
items-center
gap-2
"

>


<span

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



{

index !== project.architecture.length-1 &&

<span

className="
text-cyan-400
"

>

→

</span>

}



</div>


))


}


</div>








{/* Technologies */}



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

project.technologies.map((tech)=>(


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









{/* Impact */}



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


{

project.impact.map((item)=>(


<li key={item}>

✓ {item}

</li>


))


}


</ul>






<div

className="
mt-8
flex
gap-3
"

>


<button

className="
rounded-lg
bg-blue-600
px-5
py-2
font-semibold
text-white
hover:bg-blue-700
"

>

View Case Study

</button>



<button

className="
rounded-lg
border
border-gray-500
px-5
py-2
font-semibold
text-gray-200
hover:bg-gray-800
"

>

GitHub

</button>



</div>





</div>


))


}



</div>



</div>


</section>


);

}