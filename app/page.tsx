import Navbar from "./components/Navbar";
import Experience from "./components/Experience";
import About from "./components/About";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Footer from "./components/Footer";
import AnimatedBackground from "./components/AnimatedBackground";
import Impact from "./components/Impact";
import ChatBot from "./components/ChatBot";


export default function Home() {


return (

<main

className="
min-h-screen
overflow-hidden
bg-slate-950
text-white
"

>


<Navbar />


{/* Background */}

<div

className="
absolute
inset-0
z-0
"

>

<AnimatedBackground />

</div>





{/* HERO */}

<section

id="home"

className="
relative
z-10
flex
min-h-screen
items-center
overflow-hidden
px-6
pt-24
md:px-20
"

>


<div

className="
mx-auto
grid
max-w-7xl
items-center
gap-16
md:grid-cols-2
"

>


{/* LEFT */}

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

Microsoft Fabric | Cloud Data Platforms | AI Solutions

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

Data & Analytics Engineer with 7+ years of experience
building scalable data platforms, ETL pipelines,
business intelligence solutions, and AI-powered
automation systems.

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







{/* RIGHT PROFILE */}

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




<h3

className="
mt-6
text-center
text-2xl
font-bold
"

>

Abhilash Joga

</h3>



<p

className="
mt-2
text-center
text-blue-300
"

>

Data & Analytics Engineer

</p>



<p

className="
mt-3
text-center
text-sm
text-gray-400
"

>

7+ Years • Cloud Data • Analytics • AI

</p>



</div>


</div>



</div>


</section>





{/* SECTIONS */}


<div className="relative z-10">


<Impact />


<About />


<Experience />


<Projects />


<Certifications />



<section

id="contact"

className="
px-6
py-20
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


<div

className="
mt-8
flex
flex-wrap
justify-center
gap-4
"

>


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




<a

href="mailto:abhilashjoga1028@gmail.com"

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

Email

</a>




<a

href="tel:+13854613687"

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

Mobile

</a>




<a

href="https://github.com/abhilashjoga1228"

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

GitHub

</a>


</div>



</div>


</section>



<Footer />


</div>





<ChatBot />


</main>


);

}