"use client";

export default function AIAnalyticsAssistantCaseStudy() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Top Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-blue-400/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a
            href="/"
            className="text-sm font-semibold text-gray-300 transition hover:text-cyan-300"
          >
            ← Abhilash Portfolio
          </a>

          <a
            href="/#projects"
            className="text-sm font-semibold text-blue-300 transition hover:text-cyan-300"
          >
            Projects
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pb-20 pt-36">
        <div className="mx-auto max-w-6xl">
          <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-xs font-semibold tracking-wide text-cyan-300">
            AI / ANALYTICS
          </span>

          <h1 className="mt-8 max-w-5xl bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-6xl">
            AI-Powered Analytics Assistant
          </h1>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-gray-300">
            A generative AI analytics concept designed to help users interact
            with business and technical information using natural language,
            retrieve relevant context, summarize complex information, and
            generate useful analytics-oriented responses.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {[
              "OpenAI API",
              "Next.js",
              "TypeScript",
              "LLM",
              "Prompt Engineering",
              "Context Retrieval",
              "Analytics",
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Business Problem */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Business Challenge
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-300">
            Business users often have access to large amounts of reporting,
            documentation, project information, and technical data but still
            depend on analysts or engineers to interpret that information.
          </p>

          <p className="mt-5 max-w-4xl leading-8 text-gray-300">
            Traditional dashboards are effective for predefined KPIs, but they
            are less flexible when users want to ask open-ended questions,
            compare requirements, summarize technical experience, or explore
            information conversationally.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              "Users depend on predefined dashboards and reports",
              "Information may be distributed across multiple sources",
              "Manual analysis can delay answers to business questions",
              "Users may not know which report or dataset contains the answer",
              "Complex technical information can be difficult to interpret",
              "Repeated questions create unnecessary analyst effort",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-blue-400/20 bg-slate-900/50 p-5 text-gray-300"
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Overview */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Solution Overview
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-300">
            The AI assistant provides a conversational interface between the
            user and curated business or profile information. Instead of
            requiring the user to manually search through documents, the
            assistant interprets the question, identifies relevant context,
            and generates a structured response.
          </p>

          <div className="mt-10 overflow-x-auto rounded-3xl border border-blue-400/20 bg-slate-900/40 p-8">
            <div className="min-w-[850px]">
              <div className="flex items-center justify-between gap-4 text-center">
                <div className="w-40 rounded-xl border border-blue-400/30 bg-blue-500/10 p-5">
                  <div className="font-semibold text-blue-300">User</div>
                  <div className="mt-2 text-sm text-gray-400">
                    Natural Language
                    <br />
                    Question
                  </div>
                </div>

                <div className="text-2xl text-cyan-400">→</div>

                <div className="w-40 rounded-xl border border-blue-400/30 bg-blue-500/10 p-5">
                  <div className="font-semibold text-blue-300">
                    Application
                  </div>
                  <div className="mt-2 text-sm text-gray-400">
                    Next.js
                    <br />
                    API Route
                  </div>
                </div>

                <div className="text-2xl text-cyan-400">→</div>

                <div className="w-40 rounded-xl border border-cyan-400/40 bg-cyan-500/10 p-5">
                  <div className="font-semibold text-cyan-300">
                    Context
                  </div>
                  <div className="mt-2 text-sm text-gray-400">
                    Profile
                    <br />
                    Project Knowledge
                  </div>
                </div>

                <div className="text-2xl text-cyan-400">→</div>

                <div className="w-40 rounded-xl border border-blue-400/30 bg-blue-500/10 p-5">
                  <div className="font-semibold text-blue-300">
                    OpenAI
                  </div>
                  <div className="mt-2 text-sm text-gray-400">
                    LLM
                    <br />
                    Reasoning
                  </div>
                </div>

                <div className="text-2xl text-cyan-400">→</div>

                <div className="w-40 rounded-xl border border-blue-400/30 bg-blue-500/10 p-5">
                  <div className="font-semibold text-blue-300">
                    Response
                  </div>
                  <div className="mt-2 text-sm text-gray-400">
                    Structured
                    <br />
                    Answer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            How the Assistant Works
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                number: "01",
                title: "User Question",
                description:
                  "The user submits a natural-language question through the chatbot interface.",
              },
              {
                number: "02",
                title: "Context Preparation",
                description:
                  "Relevant portfolio, experience, skills, projects, and structured profile information are included as context for the model.",
              },
              {
                number: "03",
                title: "Prompt Construction",
                description:
                  "System instructions define how the model should answer, what information it can use, and how responses should be structured.",
              },
              {
                number: "04",
                title: "LLM Processing",
                description:
                  "The OpenAI model interprets the question, connects relevant information, compares requirements, and generates the response.",
              },
              {
                number: "05",
                title: "Structured Response",
                description:
                  "The response is returned to the application and displayed conversationally to the user.",
              },
              {
                number: "06",
                title: "Continuous Improvement",
                description:
                  "Prompt design and profile context can be refined as new projects, skills, certifications, and use cases are added.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-blue-400/20 bg-slate-900/40 p-7"
              >
                <div className="text-sm font-bold text-cyan-300">
                  {step.number}
                </div>

                <h3 className="mt-3 text-xl font-bold text-white">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Portfolio Assistant */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Portfolio Assistant Use Case
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-300">
            The portfolio implementation uses this architecture to provide an
            interactive AI assistant that can answer questions about
            experience, technologies, certifications, projects, and career
            background.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-blue-400/20 bg-slate-900/40 p-7">
              <div className="text-sm font-semibold text-cyan-300">
                EXAMPLE QUESTION
              </div>

              <p className="mt-4 text-lg font-semibold text-white">
                “What experience does Abhilash have with Microsoft Fabric?”
              </p>

              <p className="mt-4 leading-7 text-gray-300">
                The assistant can identify the Fabric-related experience in the
                supplied profile context and generate a concise summary around
                Lakehouse, pipelines, semantic models, migration work, and
                analytics.
              </p>
            </div>

            <div className="rounded-3xl border border-cyan-400/30 bg-slate-900/40 p-7">
              <div className="text-sm font-semibold text-cyan-300">
                EXAMPLE QUESTION
              </div>

              <p className="mt-4 text-lg font-semibold text-white">
                “How well does this job description match Abhilash?”
              </p>

              <p className="mt-4 leading-7 text-gray-300">
                The assistant can compare job requirements with the supplied
                profile information, identify strong matches, relevant
                experience, potential gaps, and provide an overall assessment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Match */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            AI Job-Matching Workflow
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-300">
            One of the assistant&apos;s most useful portfolio capabilities is
            analyzing a job description against the candidate profile.
          </p>

          <div className="mt-10 overflow-x-auto rounded-3xl border border-blue-400/20 bg-slate-900/40">
            <table className="w-full min-w-[720px] text-left">
              <thead className="border-b border-blue-400/20 bg-slate-900/80">
                <tr>
                  <th className="px-6 py-4 text-blue-300">Job Requirement</th>
                  <th className="px-6 py-4 text-blue-300">Profile Evidence</th>
                  <th className="px-6 py-4 text-blue-300">Assessment</th>
                </tr>
              </thead>

              <tbody className="text-gray-300">
                <tr className="border-b border-blue-400/10">
                  <td className="px-6 py-4">Microsoft Fabric</td>
                  <td className="px-6 py-4">
                    Lakehouse, pipelines, semantic models
                  </td>
                  <td className="px-6 py-4 text-green-400">Strong Match</td>
                </tr>

                <tr className="border-b border-blue-400/10">
                  <td className="px-6 py-4">SQL</td>
                  <td className="px-6 py-4">
                    Data engineering and analytics workloads
                  </td>
                  <td className="px-6 py-4 text-green-400">Strong Match</td>
                </tr>

                <tr className="border-b border-blue-400/10">
                  <td className="px-6 py-4">Power BI</td>
                  <td className="px-6 py-4">
                    Dashboards, semantic models, KPI reporting
                  </td>
                  <td className="px-6 py-4 text-green-400">Strong Match</td>
                </tr>

                <tr>
                  <td className="px-6 py-4">Unlisted Technology</td>
                  <td className="px-6 py-4">No supporting profile evidence</td>
                  <td className="px-6 py-4 text-yellow-400">Potential Gap</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Example assessment shown for portfolio demonstration.
          </p>
        </div>
      </section>

      {/* Prompt Design */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Prompt & Context Design
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-300">
            The quality of an AI assistant depends heavily on the context and
            instructions supplied to the model. The assistant uses structured
            profile information rather than relying on the model to invent
            details.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-blue-400/20 bg-slate-900/40 p-7">
              <h3 className="text-xl font-bold text-white">
                System Instructions
              </h3>

              <p className="mt-4 leading-7 text-gray-300">
                Define the assistant&apos;s role, answer style, limitations,
                and expected response structure.
              </p>
            </div>

            <div className="rounded-3xl border border-blue-400/20 bg-slate-900/40 p-7">
              <h3 className="text-xl font-bold text-white">
                Structured Context
              </h3>

              <p className="mt-4 leading-7 text-gray-300">
                Provide verified experience, skills, certifications, projects,
                technologies, and impact statements.
              </p>
            </div>

            <div className="rounded-3xl border border-cyan-400/30 bg-slate-900/40 p-7">
              <h3 className="text-xl font-bold text-white">
                Response Controls
              </h3>

              <p className="mt-4 leading-7 text-gray-300">
                Encourage the model to distinguish strong matches, relevant
                experience, gaps, and recommendations rather than exaggerating
                fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI vs Search */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            What the AI Adds
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-300">
            A traditional search interface can locate matching words. An LLM
            adds language understanding that allows the application to connect
            related concepts, compare requirements, summarize information, and
            generate a response tailored to the user&apos;s question.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-blue-400/20 bg-slate-900/40 p-7">
              <div className="text-sm font-semibold text-blue-300">
                TRADITIONAL SEARCH
              </div>

              <ul className="mt-5 space-y-3 text-gray-300">
                <li>✓ Finds matching keywords</li>
                <li>✓ Returns predefined content</li>
                <li>✓ Works well for exact searches</li>
                <li>✓ Predictable output</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-cyan-400/30 bg-cyan-500/5 p-7">
              <div className="text-sm font-semibold text-cyan-300">
                LLM-POWERED ASSISTANT
              </div>

              <ul className="mt-5 space-y-3 text-gray-300">
                <li>✓ Understands natural-language questions</li>
                <li>✓ Connects related experience and technologies</li>
                <li>✓ Compares requirements against context</li>
                <li>✓ Generates tailored summaries and explanations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Security & Responsible AI Design
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-300">
            AI applications should separate sensitive credentials from
            browser-side code and restrict the model to approved context.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              "OpenAI API key stored server-side as an environment variable",
              "Browser communicates with a protected Next.js API route",
              "API credentials are not exposed in frontend code",
              "Assistant is instructed to use supplied profile context",
              "Responses should avoid inventing unsupported experience",
              "Production systems can add rate limiting and usage monitoring",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-blue-400/20 bg-slate-900/50 p-5 text-gray-300"
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Technology Stack
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-blue-400/20 bg-slate-900/50 p-6">
              <h3 className="font-bold text-blue-300">Application</h3>

              <div className="mt-4 space-y-2 text-gray-300">
                <p>Next.js</p>
                <p>React</p>
                <p>TypeScript</p>
                <p>Tailwind CSS</p>
              </div>
            </div>

            <div className="rounded-3xl border border-blue-400/20 bg-slate-900/50 p-6">
              <h3 className="font-bold text-blue-300">AI</h3>

              <div className="mt-4 space-y-2 text-gray-300">
                <p>OpenAI API</p>
                <p>Large Language Models</p>
                <p>Prompt Engineering</p>
                <p>Context Design</p>
              </div>
            </div>

            <div className="rounded-3xl border border-blue-400/20 bg-slate-900/50 p-6">
              <h3 className="font-bold text-blue-300">Backend</h3>

              <div className="mt-4 space-y-2 text-gray-300">
                <p>Next.js API Routes</p>
                <p>Server-Side API Calls</p>
                <p>Environment Variables</p>
                <p>JSON</p>
              </div>
            </div>

            <div className="rounded-3xl border border-blue-400/20 bg-slate-900/50 p-6">
              <h3 className="font-bold text-blue-300">Deployment</h3>

              <div className="mt-4 space-y-2 text-gray-300">
                <p>Git</p>
                <p>GitHub</p>
                <p>Vercel</p>
                <p>CI/CD</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Value */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Business Value
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              "Provides a conversational interface to complex information",
              "Reduces time spent manually searching documentation",
              "Helps users interpret technical and analytical information",
              "Supports faster comparison of requirements and capabilities",
              "Demonstrates how generative AI can complement traditional BI",
              "Creates a reusable foundation for future enterprise analytics assistants",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-5 text-gray-300"
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Architecture */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Future Enhancements
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-300">
            The current portfolio assistant uses curated context supplied to
            the model. A future enterprise implementation could extend the
            architecture with retrieval-augmented generation and governed
            business-data access.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Resume and document retrieval",
              "Vector-based semantic search",
              "RAG architecture",
              "Power BI and semantic-model integration",
              "Enterprise authentication",
              "Conversation analytics",
              "Usage and cost monitoring",
              "Model evaluation framework",
              "Role-based data access",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-blue-400/20 bg-slate-900/50 p-5 text-gray-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Takeaway */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-10">
            <div className="text-sm font-semibold text-cyan-300">
              CASE STUDY TAKEAWAY
            </div>

            <h2 className="mt-4 text-3xl font-bold text-white">
              AI becomes valuable when it is grounded in useful context.
            </h2>

            <p className="mt-5 max-w-4xl leading-8 text-gray-300">
              The objective is not simply to add a chatbot to an application.
              The real value comes from combining trusted context, clear prompt
              instructions, language understanding, and a useful user
              experience to help people find and interpret information faster.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-blue-400/10 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm leading-6 text-gray-500">
            This case study demonstrates an AI analytics application pattern
            and the portfolio assistant implementation. Future enterprise
            capabilities such as RAG, vector search, business-data connectors,
            and governed semantic-model access are presented as potential
            enhancements and are not represented as currently implemented
            production features.
          </p>
        </div>
      </section>
    </main>
  );
}