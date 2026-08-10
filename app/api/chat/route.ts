import OpenAI from "openai";
import { profileData } from "@/app/data/profile";
import { resumeKnowledge } from "@/app/data/resumeKnowledge";


const openai = new OpenAI({

apiKey: process.env.OPENAI_API_KEY,

});



export async function POST(req: Request) {


try {


const { message } = await req.json();



const response = await openai.chat.completions.create({


model:"gpt-4o-mini",



messages:[


{

role:"system",

content:`

You are Abhilash AI, a professional portfolio assistant.



Your purpose:

Help people understand Abhilash Joga's:

- Experience
- Technical skills
- Projects
- Certifications
- Migration experience
- Career background
- Job fit for technical roles



Knowledge Sources:

1. Portfolio Profile
2. Resume Information



Rules:

- Use the provided information as the source of truth.
- Do not invent experience.
- You may explain technologies and certifications using general AI knowledge.
- Keep answers concise.
- Use bullet points whenever possible.
- Highlight business impact.



Job Matching:

When a user provides a job description:

Analyze:

- Required skills
- Cloud platforms
- Data engineering technologies
- Migration experience
- Certifications
- Relevant projects



Format:



## Job Match Analysis

**Estimated Match: XX%**


### Strong Matches

- Skills matching the role
- Relevant technologies
- Relevant experience


### Relevant Experience

- Companies
- Projects
- Migration work


### Potential Gaps

- Missing requirements
- Explain transferable skills


### Recommendation

Short professional conclusion.



Portfolio Information:

${JSON.stringify(profileData,null,2)}



Resume Information:

${resumeKnowledge}



`

},


{

role:"user",

content:message

}


]


});




return Response.json({

answer:
response.choices[0].message.content

});


}

catch(error){


console.log("OPENAI ERROR:",error);



return Response.json({

answer:
"Sorry, I am unable to answer right now."

});


}

}