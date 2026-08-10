"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send, Maximize2, Minimize2 } from "lucide-react";
import ReactMarkdown from "react-markdown";


type Message = {

  role: "user" | "ai";

  text: string;

};



const suggestedQuestions = [

  "Adobe Experience",

  "Technical Skills",

  "Projects",

  "🎯 Analyze Job Match"

];



export default function ChatBot() {


const [open,setOpen] = useState(false);

const [expanded,setExpanded] = useState(false);

const [input,setInput] = useState("");

const [loading,setLoading] = useState(false);



const messagesEndRef = useRef<HTMLDivElement>(null);



const [messages,setMessages] = useState<Message[]>([


{

role:"ai",

text:

`Hi 👋 I'm Abhilash AI.

I can help you explore:

• Experience & career background
• Technical skills & technologies
• Projects and architecture
• Job fit analysis

Share a job description or role requirements, and I will analyze how well it matches Abhilash's profile.

Ask me anything!`

}

]);





useEffect(()=>{


messagesEndRef.current?.scrollIntoView({

behavior:"smooth"

});


},[messages]);







async function sendMessage(question?:string){


const userMessage = question || input;



if(!userMessage.trim()) return;



setInput("");



setMessages(prev=>[

...prev,

{

role:"user",

text:userMessage

}

]);



setLoading(true);



try{


const response = await fetch("/api/chat",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

message:userMessage

})

});



const data = await response.json();



setMessages(prev=>[

...prev,

{

role:"ai",

text:data.answer

}

]);


}

catch(error){


setMessages(prev=>[

...prev,

{

role:"ai",

text:"Sorry, something went wrong."

}

]);


}

finally{

setLoading(false);

}


}






return (

<>

{/* Floating Button */}


<button

onClick={()=>setOpen(!open)}

className="
fixed
bottom-6
right-6
z-50
flex
h-16
w-16
items-center
justify-center
rounded-full
bg-blue-600
shadow-[0_0_30px_rgba(59,130,246,0.6)]
hover:scale-105
transition
"

>


{

open ?

<X size={28}/>

:

<img

src="/abhilash.jpg"

alt="Abhilash"

className="
h-14
w-14
rounded-full
object-cover
"

/>

}


</button>





{

open && (


<div

className={`
fixed
z-50
flex
flex-col
overflow-hidden
border
border-blue-400/20
bg-slate-950
shadow-2xl
transition-all
duration-300

${
expanded

?

"bottom-6 right-6 h-[90vh] w-[1100px] max-w-[calc(100vw-3rem)]"

:

"bottom-24 right-6 h-[85vh] w-[520px] max-w-[calc(100vw-2rem)]"

}

rounded-3xl

`}

>






{/* HEADER */}



<div

className="
flex
items-center
gap-3
border-b
border-white/10
p-5
"

>



<img

src="/abhilash.jpg"

alt="Abhilash"

className="
h-16
w-16
rounded-full
border
border-blue-400
object-cover
"

/>



<div>


<h3

className="
font-bold
text-blue-400
"

>

Abhilash AI

</h3>



<p

className="
text-xs
text-gray-400
"

>

AI Portfolio & Job Fit Assistant

</p>



<p

className="
text-xs
text-green-400
"

>

● Online

</p>


</div>




<div

className="
ml-auto
flex
gap-2
"

>


<button

onClick={()=>setExpanded(!expanded)}

className="
rounded-lg
border
border-blue-400/30
p-2
text-blue-300
hover:bg-blue-600
hover:text-white
"

>


{

expanded ?

<Minimize2 size={16}/>

:

<Maximize2 size={16}/>

}


</button>




<button

onClick={()=>setOpen(false)}

className="
rounded-lg
border
border-blue-400/30
p-2
text-blue-300
hover:bg-blue-600
hover:text-white
"

>

<X size={16}/>

</button>



</div>



</div>









{/* SUGGESTIONS */}



<div

className="
border-b
border-white/10
p-3
"

>


<p

className="
mb-3
text-xs
font-semibold
text-blue-400
"

>

Try asking

</p>




<div

className="
flex
flex-wrap
gap-2
"

>


{

suggestedQuestions.map(question=>(


<button

key={question}

onClick={()=>sendMessage(question)}

className={`

rounded-full

border

px-3

py-2

text-xs

transition


${
question==="🎯 Analyze Job Match"

?

"border-blue-500 bg-blue-600 text-white"

:

"border-blue-400/30 bg-slate-900 text-blue-300 hover:bg-blue-600 hover:text-white"

}

`}

>

{question}

</button>


))


}


</div>





<div

className="
mt-3
rounded-lg
bg-blue-500/10
p-2
text-xs
text-blue-300
"

>

🎯 Paste any Data/Analytics job description to get a match score

</div>



</div>









{/* CHAT MESSAGES */}



<div

className="
flex-1
min-h-0
space-y-3
overflow-y-auto
p-4
"

>



{

messages.map((message,index)=>(


<div

key={index}

className={`

rounded-xl

p-3

text-base

leading-relaxed

break-words


${
message.role==="user"

?

"ml-8 bg-blue-600 text-white"

:

"mr-8 bg-slate-800 text-gray-200"

}

`}

>


<ReactMarkdown>

{message.text}

</ReactMarkdown>


</div>



))


}




{

loading &&

<div

className="
mr-8
rounded-xl
bg-slate-800
p-3
text-sm
text-gray-300
"

>

Abhilash AI is typing...

</div>


}



<div ref={messagesEndRef}/>


</div>









{/* QUICK LINKS */}



<div

className="
flex
gap-2
px-3
pb-2
"

>


<a

href="/Abhilash_Joga_Resume.pdf"

target="_blank"

className="
rounded-lg
bg-blue-600
px-3
py-2
text-xs
text-white
"

>

📄 Resume

</a>




<a

href="https://www.linkedin.com/in/jogaabhilash/"

target="_blank"

className="
rounded-lg
border
border-blue-400/40
px-3
py-2
text-xs
text-blue-300
"

>

🔗 LinkedIn

</a>




<a

href="mailto:abhilashjoga1028@gmail.com"

className="
rounded-lg
border
border-blue-400/40
px-3
py-2
text-xs
text-blue-300
"

>

✉️ Email

</a>



</div>









{/* INPUT */}



<div

className="
flex
gap-2
border-t
border-white/10
p-3
"

>


<input

value={input}

onChange={(e)=>setInput(e.target.value)}

onKeyDown={(e)=>{

if(e.key==="Enter") sendMessage();

}}

placeholder="Ask about Abhilash..."

className="
flex-1
rounded-xl
bg-slate-800
px-4
py-4
text-sm
text-white
outline-none
"

/>




<button

onClick={()=>sendMessage()}

className="
rounded-xl
bg-blue-600
px-4
text-white
"

>

<Send size={18}/>

</button>



</div>





</div>


)

}


</>

);

}