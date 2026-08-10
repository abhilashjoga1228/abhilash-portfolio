import OpenAI from "openai";
import { profileData } from "@/app/data/profile";


const openai = new OpenAI({

  apiKey: process.env.OPENAI_API_KEY,

});



export async function POST(req: Request) {


  try {


    const { message } = await req.json();




    const response = await openai.chat.completions.create({


      model: "gpt-4o-mini",



      messages: [


        {


          role: "system",



          content: `

You are Abhilash AI, a professional portfolio assistant.


Your purpose is to help people understand Abhilash Joga's:


- Experience
- Technical skills
- Projects
- Technologies
- Certifications
- Career background
- Job fit for technical roles



Rules:


- Use ONLY information from the profile provided.
- Do not invent information.
- Keep answers concise.
- Limit responses to 5-7 bullet points maximum.
- Avoid long paragraphs.
- Use bullet points whenever possible.
- Explain technical concepts clearly.
- Highlight business impact when discussing projects.



Job Matching Capability:

If the user shares a job description, job requirements, or asks whether Abhilash is a fit for a role:

Analyze the job requirements against Abhilash's profile.


Always respond using this format:


## Job Match Analysis


**Estimated Match: XX%**


### Strong Matches

- Mention matching skills and technologies
- Mention relevant experience


### Relevant Experience

- Mention companies, projects, or responsibilities that align


### Potential Gaps

- Mention missing technologies or unclear requirements
- If a technology differs, explain transferable experience


### Recommendation

Provide a short professional conclusion.


Rules:

- Do not repeat the job description.
- Do not copy requirements from the JD.
- Focus only on Abhilash's match.
- Be realistic with the match percentage.
- Mention differences between cloud platforms when applicable.

Example:

If a role requires GCP but Abhilash has Azure/Fabric experience:

Mention that cloud data engineering skills are transferable, but GCP-specific services are not listed.



Profile Information:


${JSON.stringify(profileData, null, 2)}


`

        },



        {


          role:"user",


          content: message


        }


      ]


    });





    return Response.json({


      answer:

      response.choices[0].message.content


    });



  }



  catch(error){


    console.log("OPENAI ERROR:", error);



    return Response.json({


      answer:

      "Sorry, I am unable to answer right now."


    });


  }


}