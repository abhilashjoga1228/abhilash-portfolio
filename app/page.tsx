import Navbar from "./components/Navbar";
import Experience from "./components/Experience";
import About from "./components/About";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Footer from "./components/Footer";
import AnimatedBackground from "./components/AnimatedBackground";
import Impact from "./components/Impact";
import ChatBot from "./components/ChatBot";
import MyStory from "./components/MyStory";

const experienceCompanies = [
  {
    name: "Adobe",
    logo: "/Logos/adobe.png",
  },
  {
    name: "Swire Coca-Cola",
    logo: "/Logos/swire.jpg",
  },
  {
    name: "Amazon",
    logo: "/Logos/amazon.png",
  },
];

const technologies = [
  {
    name: "Microsoft Fabric",
    logo: "/Logos/fabric.png",
  },
  {
    name: "Databricks",
    logo: "/Logos/databricks.png",
  },
  {
    name: "Snowflake",
    logo: "/Logos/snowflake.png",
  },
  {
    name: "Azure",
    logo: "/Logos/azure.png",
  },
  {
    name: "Power BI",
    logo: "/Logos/powerbi.png",
  },
  {
    name: "Python",
    logo: "/Logos/python.png",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <Navbar />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        id="home"
        className="relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-28 md:px-10 lg:px-16"
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <AnimatedBackground />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1650px]">
          {/* Main Hero Row */}
          <div className="grid items-center gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div>
              <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-500/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Data Engineering • Analytics • Applied AI
              </div>

              <h1 className="mt-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-5xl font-bold leading-[1.04] text-transparent md:text-6xl lg:text-7xl">
                Abhilash Joga
              </h1>

              <h2 className="mt-5 text-2xl font-semibold text-white md:text-3xl lg:text-4xl">
                Data & Analytics Engineer
              </h2>

              <p className="mt-3 text-lg font-medium text-blue-300 md:text-xl">
                Cloud Data Platforms • BI Modernization • AI-Enabled Analytics
              </p>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-300">
                Data & Analytics Engineer with 7+ years of experience building
                scalable data platforms, cloud analytics solutions, enterprise
                reporting, data pipelines, and automation across modern cloud
                environments.
              </p>

              <p className="mt-4 max-w-2xl leading-7 text-gray-400">
                Experienced with Microsoft Fabric, Databricks, Snowflake,
                Azure, Power BI, SQL, Python, cloud migration, analytics
                engineering, and applied AI solutions.
              </p>

              {/* Buttons */}

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,0.35)] transition hover:-translate-y-0.5 hover:bg-blue-500"
                >
                  View Projects
                </a>

                <a
                  href="/Abhilash_Joga_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-blue-400/40 px-6 py-3 font-semibold text-blue-300 transition hover:border-cyan-400/60 hover:bg-blue-500/10"
                >
                  View Resume
                </a>

                <a
                  href="https://www.linkedin.com/in/jogaabhilash/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-blue-400/40 px-6 py-3 font-semibold text-blue-300 transition hover:border-cyan-400/60 hover:bg-blue-500/10"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* =================================================
                RIGHT PROFILE
            ================================================= */}

            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                {/* Glow */}

                <div className="pointer-events-none absolute -inset-10 rounded-full bg-blue-500/10 blur-3xl" />

                {/* Profile Card */}

                <div className="relative rounded-3xl border border-blue-400/30 bg-slate-900/60 p-6 shadow-[0_0_60px_rgba(59,130,246,0.12)] backdrop-blur-xl sm:p-7">
                  <div className="overflow-hidden rounded-3xl border border-blue-400/30">
                    <img
                      src="/abhilash.jpg"
                      alt="Abhilash Joga"
                      className="aspect-square w-full object-cover"
                    />
                  </div>

                  <div className="mt-6 text-center">
                    <h3 className="text-2xl font-bold text-white">
                      Abhilash Joga
                    </h3>

                    <p className="mt-2 font-medium text-blue-300">
                      Data & Analytics Engineer
                    </p>

                    <p className="mt-3 text-sm text-gray-400">
                      7+ Years • Cloud Data • Analytics
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              EXPERIENCE + TECHNOLOGY STRIP
          ================================================= */}

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {/* Experience */}

            <div className="rounded-2xl border border-blue-400/15 bg-slate-900/40 p-5 backdrop-blur-xl">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Experience
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {experienceCompanies.map((company) => (
                  <div
                    key={company.name}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 transition hover:-translate-y-0.5 hover:border-cyan-400/30"
                  >
                    <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-white p-1">
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <span className="text-sm font-medium text-slate-200">
                      {company.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Technologies */}

            <div className="rounded-2xl border border-blue-400/15 bg-slate-900/40 p-5 backdrop-blur-xl">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Core Technologies
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {technologies.map((technology) => (
                  <div
                    key={technology.name}
                    className="flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/5 px-3 py-2 text-sm font-medium text-blue-200 transition hover:-translate-y-0.5 hover:border-cyan-400/40"
                  >
                    <img
                      src={technology.logo}
                      alt={technology.name}
                      className="h-5 w-5 object-contain"
                    />

                    {technology.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN SECTIONS
      ===================================================== */}

      <div className="relative z-10">
        <Impact />

        <About />

        <Experience />

        <MyStory />

        <Projects />

        <Certifications />

        {/* ===================================================
            CONTACT
        =================================================== */}

        <section
          id="contact"
          className="bg-slate-950 px-6 py-24"
        >
          <div className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-3xl border border-blue-400/30 bg-slate-900/50 p-8 text-center backdrop-blur-xl md:p-12">
              {/* Glow */}

              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="relative">
                <div className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
                  LET&apos;S CONNECT
                </div>

                <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
                  Interested in working together?
                </h2>

                <p className="mx-auto mt-5 max-w-3xl leading-8 text-gray-300">
                  Open to opportunities across Data Engineering, Analytics,
                  Microsoft Fabric, Databricks, cloud data platforms, BI
                  modernization, and applied AI solutions.
                </p>

                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500">
                  Explore my projects, review my experience, ask Abhilash AI a
                  question, or schedule a conversation directly through the
                  portfolio assistant.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <a
                    href="https://www.linkedin.com/in/jogaabhilash/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
                  >
                    LinkedIn
                  </a>

                  <a
                    href="mailto:abhilashjoga1028@gmail.com"
                    className="rounded-xl border border-blue-400/40 px-6 py-3 font-semibold text-blue-300 transition hover:border-cyan-400/60 hover:bg-blue-500/10"
                  >
                    Email
                  </a>

                  <a
                    href="tel:+13854613687"
                    className="rounded-xl border border-blue-400/40 px-6 py-3 font-semibold text-blue-300 transition hover:border-cyan-400/60 hover:bg-blue-500/10"
                  >
                    Mobile
                  </a>

                </div>

                <div className="mt-8 border-t border-blue-400/10 pt-6">
                  <p className="text-sm text-gray-500">
                    You can also use Abhilash AI in the bottom-right corner to
                    explore my experience, analyze a job description, or
                    schedule a 30-minute meeting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <ChatBot />
    </main>
  );
}