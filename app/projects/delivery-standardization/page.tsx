"use client";

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

<section

className="
text-center
"

>


<p

className="
text-sm
uppercase
tracking-widest
text-cyan-400
"

>

DATA ENGINEERING CASE STUDY

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

Enterprise analytics platform designed to standardize delivery performance measurement,
identify operational inefficiencies, optimize delivery frequency, reduce transportation
costs, and improve sustainability visibility.

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

{

[
"Microsoft Fabric",
"Power BI",
"Python",
"SQL",
"Data Modeling",
"Analytics Engineering"
].map(skill=>(


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


))

}


</div>


</section>







{/* Business Challenge */}

<section

className="
mt-24
"

>


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

Distribution operations can suffer from inconsistent delivery frequencies,
inefficient routes, increased transportation costs, driver overtime,
and limited visibility into operational performance.

</p>




<div

className="
mt-8
grid
gap-4
md:grid-cols-2
"

>


{

[
"Unnecessary delivery stops",
"Low-volume deliveries",
"Driver overtime",
"Higher fuel consumption",
"Hotshot deliveries",
"Missed or delayed deliveries"
].map(item=>(


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


))

}


</div>


</section>








{/* Solution Architecture */}

<section

className="
mt-24
"

>


<h2

className="
text-3xl
font-bold
text-cyan-300
"

>

Solution Architecture

</h2>




<div

className="
mt-8
rounded-3xl
border
border-blue-400/30
bg-slate-900/50
p-8
"

>


{

[
"Operational Data Sources",
"SQL Server Bronze Layer",
"Data Cleaning & Standardization",
"Silver Business Tables",
"Gold Star Schema",
"Power BI Semantic Model",
"Executive Dashboards"
].map((item,index)=>(


<div key={item}>


<div

className="
rounded-xl
border
border-blue-400/30
bg-blue-500/10
px-5
py-3
text-center
text-blue-200
"

>

{item}

</div>



{

index !== 6 &&

<div className="
py-2
text-center
text-cyan-400
">

↓

</div>

}


</div>


))

}


</div>


</section>








{/* Data Model */}

<section

className="
mt-24
"

>


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

<section

className="
mt-24
"

>


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


{

[
["Service","OTIF, SLA, On-Time Delivery"],
["Productivity","Cases per Hour, Cases per Stop"],
["Financial","Cost to Serve, Cost per Stop"],
["Customer","Delivery Frequency Analysis"],
["Sustainability","Fuel and CO₂ Metrics"],
["Optimization","Frequency Recommendations"]

].map(([title,value])=>(


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


))

}


</div>


</section>








{/* Technology */}

<section

className="
mt-24
"

>


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


{

[
"Microsoft Fabric",
"Power BI",
"SQL Server",
"Python",
"DAX",
"Data Modeling",
"GitHub Actions"
].map(tech=>(


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


))

}


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

<li>✓ Standardized delivery performance measurement</li>

<li>✓ Improved operational visibility</li>

<li>✓ Enabled cost-to-serve analysis</li>

<li>✓ Supported delivery frequency optimization</li>

<li>✓ Created executive analytics framework</li>

</ul>


</section>






</div>


</main>

);

}