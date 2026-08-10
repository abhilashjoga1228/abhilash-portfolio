"use client";

import { motion } from "framer-motion";


const highlights = [

{
title:"7+",
subtitle:"Years Experience",
},

{
title:"3+",
subtitle:"Enterprise Platforms",
},

{
title:"10+",
subtitle:"Data Technologies",
},

{
title:"AI + Cloud",
subtitle:"Modern Solutions",
},

];



const expertise = [

"Enterprise Data Platforms",

"Lakehouse Architecture",

"ETL / ELT Pipelines",

"Cloud Data Engineering",

"Business Intelligence",

"Semantic Modeling",

"AI-powered Analytics",

"Data Automation",

];



const technologies = [

"Microsoft Fabric",

"Azure",

"Databricks",

"Snowflake",

"Power BI",

"Python",

"SQL",

"AI Solutions",

];



export default function About(){


return (


<section

id="about"

className="
relative
px-6
py-24
md:px-20
"

>


{/* Heading */}


<motion.div

initial={{
opacity:0,
y:30
}}

whileInView={{
opacity:1,
y:0
}}

transition={{
duration:.6
}}

className="text-center"

>


<h2

className="
text-4xl
font-bold
md:text-5xl
bg-gradient-to-r
from-blue-400
to-cyan-300
bg-clip-text
text-transparent
"

>

About Me

</h2>



<p

className="
mx-auto
mt-5
max-w-3xl
text-lg
text-gray-300
"

>

Building scalable data platforms, analytics solutions,
and AI-powered automation systems that transform
enterprise data into business value.

</p>


</motion.div>









{/* Highlight Cards */}



<div

className="
mt-14
grid
gap-6
md:grid-cols-4
"

>


{

highlights.map((item,index)=>(


<motion.div

key={item.title}


initial={{
opacity:0,
y:40
}}

whileInView={{
opacity:1,
y:0
}}

transition={{
delay:index*.1
}}


className="
rounded-2xl
border
border-blue-400/30
bg-slate-900/40
p-8
text-center
backdrop-blur-xl
shadow-[0_0_40px_rgba(59,130,246,0.08)]
transition
hover:-translate-y-2
hover:border-cyan-400/50
"

>


<h3

className="
text-4xl
font-bold
bg-gradient-to-r
from-blue-400
to-cyan-300
bg-clip-text
text-transparent
"

>

{item.title}

</h3>



<p

className="
mt-3
text-gray-400
"

>

{item.subtitle}

</p>



</motion.div>


))

}


</div>










{/* Main Content */}



<div

className="
mt-16
grid
gap-10
md:grid-cols-2
"

>






{/* About Text */}



<motion.div


whileInView={{

opacity:1,
x:0

}}


initial={{

opacity:0,
x:-40

}}


className="
rounded-3xl
border
border-blue-400/30
bg-slate-900/40
p-8
backdrop-blur-xl
shadow-[0_0_50px_rgba(59,130,246,0.08)]
"

>


<h3

className="
text-2xl
font-bold
bg-gradient-to-r
from-blue-400
to-cyan-300
bg-clip-text
text-transparent
"

>

Data & Analytics Engineer

</h3>




<p

className="
mt-5
leading-8
text-gray-300
"

>


I am a Data & Analytics Engineer with 7+ years
of experience designing and building enterprise
data platforms, scalable ETL pipelines,
analytics solutions, and AI-powered automation
systems.



<br/><br/>



I specialize in Microsoft Fabric, Azure,
Databricks, Snowflake, Power BI, Python,
and SQL to build modern cloud data solutions
that enable faster and smarter decision making.



<br/><br/>



I have delivered data engineering and analytics
solutions for enterprise organizations including
Adobe, Amazon, and Swire Coca-Cola.


</p>


</motion.div>










{/* Expertise */}



<motion.div


initial={{

opacity:0,
x:40

}}


whileInView={{

opacity:1,
x:0

}}



className="
rounded-3xl
border
border-blue-400/30
bg-slate-900/40
p-8
backdrop-blur-xl
shadow-[0_0_50px_rgba(59,130,246,0.08)]
"

>





<h3

className="
text-2xl
font-bold
text-blue-400
"

>

Core Expertise

</h3>




<div

className="
mt-6
flex
flex-wrap
gap-3
"

>


{

expertise.map((item)=>(


<span

key={item}

className="
rounded-full
border
border-blue-400/30
bg-blue-500/10
px-4
py-2
text-sm
text-blue-300
transition
hover:bg-blue-500/20
"

>

{item}

</span>


))


}


</div>









<h3

className="
mt-10
text-2xl
font-bold
text-blue-400
"

>

Technology Focus

</h3>






<div

className="
mt-6
flex
flex-wrap
gap-3
"

>


{

technologies.map((item)=>(


<span

key={item}

className="
rounded-lg
border
border-blue-400/20
bg-blue-500/10
px-4
py-2
text-sm
text-blue-300
"

>

{item}

</span>


))


}


</div>



</motion.div>





</div>





</section>


);


}