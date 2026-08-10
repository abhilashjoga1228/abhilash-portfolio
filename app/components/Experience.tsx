export default function Experience() {


const experiences = [


{
company:"Adobe",

logo:"/logos/adobe.png",

role:"Data Engineer / Analytics Engineer",

duration:"2026",

description:
"Built enterprise analytics solutions supporting business reporting, data integration, and cloud-based analytics initiatives.",

achievements:[

"Developed Power BI dashboards and analytical solutions",

"Worked with Microsoft Fabric and cloud data platforms",

"Designed scalable data models and reporting workflows"

],

technologies:[

"Microsoft Fabric",

"Power BI",

"SQL",

"Azure",

"Databricks"

]

},





{
company:"Swire Coca-Cola",

logo:"/logos/swire.jpg",

role:"Senior Data Engineer",

duration:"2023 - 2026",

description:
"Designed scalable data engineering solutions supporting operational analytics and business intelligence.",

achievements:[

"Built enterprise ETL/ELT pipelines",

"Developed operational and financial analytics dashboards",

"Implemented cloud data solutions and automation"

],

technologies:[

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

logo:"/logos/amazon.png",

role:"Data Engineer",

duration:"2020 - 2022",

description:
"Developed data pipelines and analytics solutions supporting large-scale business operations.",

achievements:[

"Built automated data processing workflows",

"Created analytical datasets for reporting",

"Optimized SQL queries and transformations"

],

technologies:[

"Python",

"SQL",

"AWS",

"ETL",

"Data Warehousing"

]

}



];





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

></div>





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





{/* Timeline Dot */}

<div

className="
absolute
left-3
top-8
h-10
w-10
rounded-full
border
border-blue-400
bg-slate-950
flex
items-center
justify-center
shadow-[0_0_20px_rgba(59,130,246,0.5)]
"

>

<span

className="
text-blue-400
font-bold
"

>

{index+1}

</span>


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
shadow-[0_0_40px_rgba(59,130,246,0.08)]
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
shadow-lg
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
text-blue-400
font-semibold
"

>

{exp.role}

</p>



<span

className="
text-sm
text-gray-400
"

>

{exp.duration}

</span>



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








{/* Achievements */}


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