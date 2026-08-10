export default function Footer() {

return (

<footer

className="
border-t
border-blue-400/20
bg-slate-950
px-6
py-8
"

>


<div

className="
mx-auto
flex
max-w-6xl
flex-col
items-center
justify-between
gap-5
md:flex-row
"

>


{/* Copyright */}

<p

className="
text-sm
text-gray-400
"

>

© {new Date().getFullYear()} Abhilash Joga. All rights reserved.

</p>





{/* Links */}

<div

className="
flex
gap-6
text-sm
"

>


<a

href="https://www.linkedin.com/in/jogaabhilash/"

target="_blank"

rel="noopener noreferrer"

className="
text-gray-300
transition
hover:text-blue-400
"

>

LinkedIn

</a>





<a

href="mailto:abhilashjoga1028@gmail.com"

className="
text-gray-300
transition
hover:text-blue-400
"

>

Email

</a>





<a

href="tel:+13854613687"

className="
text-gray-300
transition
hover:text-blue-400
"

>

Mobile

</a>



</div>



</div>


</footer>


);

}