import Navbar from "./components/Navbar";
import Experience from "./components/Experience";
import About from "./components/About";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import AnimatedBackground from "./components/AnimatedBackground";
import Impact from "./components/Impact";
import ChatBot from "./components/ChatBot";


export default function Home() {


return (

<main

className="
min-h-screen
bg-slate-950
text-white
overflow-hidden
"

>


<Navbar />





{/* HERO */}


<section

id="home"

className="
relative
min-h-screen
flex
items-center
overflow-hidden
px-6
pt-24
md:px-20
"

>


<AnimatedBackground />



<div

className="
relative
z-10
mx-auto
grid
max-w-7xl
items-center
gap-16
md:grid-cols-2
"

>





{/* LEFT SIDE */}


<div>



<h1

className="
text-5xl
font-bold
leading-tight
bg-gradient-to-r
from-blue-400
via-cyan-300
to-white
bg-clip-text
text-transparent
md:text-7xl
"

>

Abhilash Joga

</h1>





<h2

className="
mt-5
text-2xl
font-semibold
text-blue-400
md:text-4xl
"

>

Data & Analytics Engineer

</h2>




<p

className="
mt-2
text-xl
text-gray-300
"

>

Cloud Data Platforms | AI Solutions

</p>







<p

className="
mt-8
max-w-xl
text-lg
leading-8
text-gray-300
"

>

Data & Analytics Engineer with 7+ years of
experience building scalable data platforms,
ETL pipelines, business intelligence solutions,
and AI-powered automation systems.

</p>





<p

className="
mt-4
max-w-xl
leading-7
text-gray-400
"

>

Expertise across Microsoft Fabric, Azure,
Databricks, Snowflake, Power BI, Python,
SQL, and modern cloud data architectures.

</p>







{/* SKILLS */}

<div

className="
mt-8
flex
flex-wrap
gap-3
"

>


{

[

"Microsoft Fabric",

"Azure",

"Databricks",

"Snowflake",

"Power BI",

"AI Automation"

].map((item)=>(


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
"

>

{item}

</span>


))

}


</div>








{/* BUTTONS */}


<div

className="
mt-10
flex
flex-wrap
gap-4
"

>


<a

href="#projects"

className="
rounded-xl
bg-blue-600
px-6
py-3
font-semibold
shadow-[0_0_30px_rgba(59,130,246,0.5)]
transition
hover:bg-blue-700
"

>

View Projects

</a>





<a

href="/Abhilash_Joga_Resume.pdf"

target="_blank"

className="
rounded-xl
border
border-blue-400/40
px-6
py-3
font-semibold
text-blue-300
transition
hover:bg-blue-500/10
"

>

View Resume

</a>






<a

href="https://www.linkedin.com/in/jogaabhilash/"

target="_blank"

rel="noopener noreferrer"

className="
rounded-xl
border
border-blue-400/40
px-6
py-3
font-semibold
text-blue-300
transition
hover:bg-blue-500/10
"

>

LinkedIn

</a>



</div>



</div>








{/* RIGHT SIDE PROFILE */}



<div

className="
flex
justify-center
"

>


<div

className="
rounded-3xl
border
border-blue-400/30
bg-slate-900/50
p-8
backdrop-blur-xl
shadow-[0_0_60px_rgba(59,130,246,0.15)]
"

>


<img

src="/abhilash.jpg"

alt="Abhilash Joga"

className="
h-72
w-72
rounded-3xl
border
border-blue-400/40
object-cover
"

 />





<div

className="
mt-6
text-center
"

>


<h3

className="
text-2xl
font-bold
text-white
"

>

Abhilash AI

</h3>




<p

className="
mt-2
text-blue-300
"

>

AI Portfolio Assistant

</p>




<p

className="
mt-3
text-sm
text-gray-400
"

>

7+ Years • Cloud Data • Analytics • AI

</p>



</div>



</div>



</div>





</div>


</section>







<div

className="
h-px
w-full
bg-gradient-to-r
from-transparent
via-blue-500/30
to-transparent
"

/>







<Impact />



<About />



<Experience />






{/* SKILLS */}


<section

id="skills"

className="
px-6
py-20
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
"

>

Technical Expertise

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

Technologies and platforms used to build
scalable data engineering, analytics,
cloud, and AI solutions.

</p>



</div>


</section>







<Projects />








<section

id="contact"

className="
px-6
py-16
"

>


<div

className="
mx-auto
max-w-4xl
rounded-3xl
border
border-blue-400/30
bg-slate-900/40
p-10
text-center
backdrop-blur-xl
"

>


<h2

className="
text-4xl
font-bold
"

>

Let's Connect

</h2>




<p

className="
mt-4
text-gray-300
"

>

Open to opportunities in Data Engineering,
Analytics, Cloud Data Platforms,
Microsoft Fabric, and AI solutions.

</p>



<a

href="mailto:abhilashjoga1028@gmail.com"

className="
mt-6
inline-block
rounded-xl
bg-blue-600
px-6
py-3
font-semibold
"

>

Email Abhilash

</a>



</div>



</section>






<Footer />


<ChatBot />



</main>


);

}