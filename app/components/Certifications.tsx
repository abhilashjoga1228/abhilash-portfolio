"use client";

import { motion } from "framer-motion";


const certifications = [

{
title:"Microsoft Certified: Fabric Data Engineer Associate",
issuer:"Microsoft",
description:
"Validates skills in Microsoft Fabric data engineering, Lakehouse architecture, data pipelines, and analytics solutions.",
logo:"/Logos/fabric.png"
},

{
title:"Microsoft Certified: Power BI Data Analyst Associate",
issuer:"Microsoft",
description:
"Demonstrates expertise in Power BI reporting, semantic models, DAX, and business intelligence solutions.",
logo:"/Logos/powerbi.png"
},

{
title:"Microsoft Certified: Azure Database Administrator Associate",
issuer:"Microsoft",
description:
"Demonstrates knowledge of Azure database management, administration, and cloud data platforms.",
logo:"/Logos/azure.png"
},

{
title:"ITIL Foundation Certificate",
issuer:"PeopleCert",
description:
"Foundation knowledge of IT service management principles and operational best practices.",
logo:"/Logos/itil.png"
}

];



export default function Certifications(){


return (

<section

id="certifications"

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


<motion.h2

initial={{
opacity:0,
y:20
}}

whileInView={{
opacity:1,
y:0
}}

transition={{
duration:0.5
}}

className="
mb-12
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

Certifications

</motion.h2>





<div

className="
grid
gap-6
md:grid-cols-2
"

>


{

certifications.map((cert,index)=>(


<motion.div

key={cert.title}

initial={{
opacity:0,
y:30
}}

whileInView={{
opacity:1,
y:0
}}

transition={{
delay:index*0.15
}}

className="
rounded-3xl
border
border-blue-400/20
bg-slate-900/50
p-8
backdrop-blur-xl
transition
hover:-translate-y-2
hover:border-cyan-400/50
"

>


<div

className="
flex
items-center
gap-5
"

>


<img

src={cert.logo}

alt={cert.title}

className="
h-14
w-14
rounded-xl
bg-white
object-contain
p-2
"

/>


<div>

<h3

className="
text-lg
font-bold
text-white
"

>

{cert.title}

</h3>


<p

className="
text-base
text-blue-400
"

>

{cert.issuer}

</p>


</div>


</div>




<p

className="
mt-5
leading-7
text-gray-300
"

>

{cert.description}

</p>



</motion.div>


))

}


</div>


</div>


</section>


);

}