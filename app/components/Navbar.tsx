"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";


export default function Navbar() {


const [open,setOpen] = useState(false);


const links = [

{
name:"Home",
href:"#home"
},

{
name:"About",
href:"#about"
},

{
name:"Experience",
href:"#experience"
},

{
name:"Skills",
href:"#skills"
},

{
name:"Projects",
href:"#projects"
},

{
name:"Contact",
href:"#contact"
}

];



return (

<nav

className="
fixed
top-0
z-50
w-full
border-b
border-blue-400/20
bg-slate-950/80
backdrop-blur-xl
"

>


<div

className="
mx-auto
flex
max-w-7xl
items-center
justify-between
px-6
py-4
"

>



{/* Logo */}


<a

href="#home"

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

Abhilash Joga

</a>







{/* Desktop Menu */}


<div

className="
hidden
items-center
gap-8
md:flex
"

>


{

links.map((link)=>(


<a

key={link.name}

href={link.href}

className="
group
relative
text-sm
text-gray-300
transition
hover:text-blue-400
"

>

{link.name}



<span

className="
absolute
-bottom-2
left-0
h-[2px]
w-0
bg-blue-400
transition-all
group-hover:w-full
"

></span>


</a>


))


}



</div>








{/* Resume Button */}


<a

href="/Abhilash_Joga_Resume.pdf"

target="_blank"

className="
hidden
rounded-xl
bg-blue-600
px-5
py-2
font-semibold
text-white
shadow-[0_0_25px_rgba(59,130,246,0.5)]
transition
hover:scale-105
hover:bg-blue-700
md:block
"

>

Resume

</a>







{/* Mobile Button */}


<button

onClick={()=>setOpen(!open)}

className="
md:hidden
text-gray-300
"

>


{

open ?

<X size={26}/>

:

<Menu size={26}/>

}


</button>





</div>







{/* Mobile Menu */}


{

open && (

<div

className="
border-t
border-white/10
bg-slate-950/95
px-6
py-5
md:hidden
"

>


{

links.map((link)=>(


<a

key={link.name}

href={link.href}

onClick={()=>setOpen(false)}

className="
block
py-3
text-gray-300
hover:text-blue-400
"

>

{link.name}

</a>


))


}



<a

href="/Abhilash_Joga_Resume.pdf"

target="_blank"

className="
mt-4
block
rounded-lg
bg-blue-600
px-4
py-3
text-center
font-semibold
text-white
"

>

View Resume

</a>


</div>

)

}



</nav>

);

}