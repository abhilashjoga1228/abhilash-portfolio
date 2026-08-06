import Navbar from "./components/Navbar";
import Experience from "./components/Experience";
import About from "./components/About";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <Navbar />


      {/* Hero Section */}
      <section
        id="home"
        className="flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center"
      >

        <h1 className="text-5xl font-bold md:text-7xl">
          Abhilash Joga
        </h1>


        <h2 className="mt-6 text-2xl text-blue-400 md:text-4xl">
          Data Engineer | Microsoft Fabric | Analytics
        </h2>


        <p className="mt-6 max-w-3xl text-lg text-gray-300">
          Building enterprise data platforms, analytics solutions,
          and AI-powered applications using Microsoft Fabric,
          Power BI, Python, SQL, and cloud technologies.
        </p>



        {/* Hero Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-5">


          <a
            href="#projects"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
          >
            View Projects
          </a>



          <a
            href="/Abhilash_Joga_Resume.pdf"
            target="_blank"
            className="rounded-lg border border-gray-500 px-6 py-3 font-semibold hover:bg-gray-800"
          >
            Download Resume
          </a>



          <a
            href="https://www.linkedin.com/"
            target="_blank"
            className="rounded-lg border border-gray-500 px-6 py-3 font-semibold hover:bg-gray-800"
          >
            LinkedIn
          </a>



          <a
            href="https://github.com/"
            target="_blank"
            className="rounded-lg border border-gray-500 px-6 py-3 font-semibold hover:bg-gray-800"
          >
            GitHub
          </a>


        </div>


      </section>




      {/* About */}
      <About />



      {/* Experience */}
      <Experience />




      {/* Skills */}
      <section
        id="skills"
        className="px-10 py-20"
      >

        <h2 className="text-4xl font-bold">
          Skills
        </h2>


        <div className="mt-8 grid gap-5 md:grid-cols-4">


          {[
            "Microsoft Fabric",
            "Power BI",
            "Azure",
            "Databricks",
            "Snowflake",
            "Python",
            "SQL",
            "AI Solutions",
          ].map((skill) => (


            <div
              key={skill}
              className="rounded-xl bg-slate-800 p-5 text-center"
            >
              {skill}
            </div>


          ))}


        </div>


      </section>




      {/* Projects */}
      <Projects />





      {/* Contact */}
      <section
        id="contact"
        className="px-10 py-20"
      >

        <h2 className="text-4xl font-bold">
          Contact
        </h2>


        <p className="mt-4 text-gray-300">
          Connect with me for Data Engineering, Microsoft Fabric,
          Analytics, and AI opportunities.
        </p>


      </section>
      <section
  id="contact"
  className="px-10 py-20"
>
  <h2 className="text-4xl font-bold">
    Contact
  </h2>

  <p className="mt-4 text-gray-300">
    Connect with me for Data Engineering, Microsoft Fabric,
    Analytics, and AI opportunities.
  </p>

</section>


<Footer />




    </main>
  );
}