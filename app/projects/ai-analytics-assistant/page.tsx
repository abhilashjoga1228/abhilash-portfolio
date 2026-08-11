"use client";

const assistantCapabilities = [
  {
    title: "Profile Q&A",
    description:
      "Answers questions about experience, skills, certifications, projects, technologies, and career background using curated profile context.",
    icon: "💬",
  },
  {
    title: "Job Match Analysis",
    description:
      "Compares a job description against profile evidence and identifies strong matches, relevant experience, and realistic gaps.",
    icon: "🎯",
  },
  {
    title: "Meeting Scheduling",
    description:
      "Collects meeting details, checks Google Calendar availability, presents valid time slots, and creates a confirmed Google Meet event.",
    icon: "📅",
  },
];

const architectureSteps = [
  {
    step: "01",
    title: "Visitor",
    description: "Natural-language question or action request",
    icon: "👤",
  },
  {
    step: "02",
    title: "Next.js Application",
    description: "Chat interface and server-side API routes",
    icon: "⚡",
  },
  {
    step: "03",
    title: "Context & Intent",
    description: "Profile knowledge, prompts, and scheduling state",
    icon: "🧠",
  },
  {
    step: "04",
    title: "OpenAI",
    description: "Language understanding and structured response generation",
    icon: "AI",
  },
  {
    step: "05",
    title: "Action Layer",
    description: "Chat response, job analysis, or calendar workflow",
    icon: "→",
  },
];

const schedulingSteps = [
  {
    number: "01",
    title: "Collect Meeting Details",
    description:
      "The assistant collects the visitor's name, email, optional company or reason, preferred date, and scheduling context.",
  },
  {
    number: "02",
    title: "Interpret Date",
    description:
      "Natural-language inputs such as tomorrow, Friday, or next Monday are converted into a specific calendar date.",
  },
  {
    number: "03",
    title: "Confirm Date",
    description:
      "The visitor confirms the interpreted date before the application performs an availability check.",
  },
  {
    number: "04",
    title: "Check Availability",
    description:
      "A server-side availability API queries Google Calendar Free/Busy data and generates valid 30-minute meeting slots.",
  },
  {
    number: "05",
    title: "Select Time",
    description:
      "Only available business-hour slots are presented to the visitor for selection.",
  },
  {
    number: "06",
    title: "Revalidate & Book",
    description:
      "Availability is checked again immediately before booking to reduce double-booking risk.",
  },
  {
    number: "07",
    title: "Create Calendar Event",
    description:
      "The scheduling API creates the meeting in Google Calendar and adds the visitor as an attendee.",
  },
  {
    number: "08",
    title: "Generate Google Meet",
    description:
      "The confirmed event includes a Google Meet conference link and calendar invitation.",
  },
];

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
            AI / APPLICATION ENGINEERING
          </span>

          <h1 className="mt-8 max-w-5xl bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-6xl">
            AI-Powered Analytics Assistant
          </h1>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-gray-300">
            An interactive AI portfolio assistant combining generative AI,
            curated professional context, job-description analysis, and
            Google Calendar scheduling within a production-style Next.js
            application.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {[
              "OpenAI API",
              "Next.js",
              "TypeScript",
              "Prompt Engineering",
              "Context Design",
              "Google Calendar API",
              "Google OAuth 2.0",
              "Google Meet",
              "Vercel",
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

      {/* Business Challenge */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Business Challenge
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-300">
            Portfolio visitors and recruiters often need to understand a
            candidate&apos;s experience quickly, compare skills against a job
            description, identify relevant projects, or determine whether a
            conversation would be useful.
          </p>

          <p className="mt-5 max-w-4xl leading-8 text-gray-300">
            A static website can display this information, but users still have
            to search through multiple sections manually. The goal was to create
            an interactive assistant that can interpret questions, use verified
            professional context, generate useful answers, and perform
            meaningful actions such as scheduling a meeting.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              "Visitors may not know where relevant experience is located",
              "Recruiters need faster role-to-profile comparison",
              "Static portfolio pages cannot answer follow-up questions",
              "Unstructured profile information can be difficult to summarize",
              "Scheduling a conversation typically requires additional back-and-forth",
              "AI responses must remain grounded in verified experience",
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

      {/* Capabilities */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            CURRENT CAPABILITIES
          </div>

          <h2 className="mt-3 text-3xl font-bold text-white">
            What Abhilash AI Can Do
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-300">
            The assistant combines conversational AI with application workflows.
            It does more than generate text by routing user intent into
            different experiences.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {assistantCapabilities.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-blue-400/20 bg-slate-900/50 p-7 transition hover:-translate-y-1 hover:border-cyan-400/40"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-slate-950 text-2xl">
                  {item.icon}
                </div>

                <h3 className="mt-6 text-xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Architecture */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            APPLICATION ARCHITECTURE
          </div>

          <h2 className="mt-3 text-3xl font-bold text-white">
            AI Assistant Architecture
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-300">
            The application separates the user interface, server-side API
            routes, verified professional context, AI processing, and external
            actions such as Google Calendar scheduling.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {architectureSteps.map((item, index) => (
              <div
                key={item.title}
                className="relative rounded-3xl border border-blue-400/20 bg-slate-900/50 p-6 transition hover:-translate-y-1 hover:border-cyan-400/40"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.2em] text-cyan-400">
                    STEP {item.step}
                  </span>

                  {index < architectureSteps.length - 1 && (
                    <span className="hidden text-xl text-cyan-400 xl:block">
                      →
                    </span>
                  )}
                </div>

                <div className="mt-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/20 bg-slate-950 text-lg font-bold text-cyan-300">
                  {item.icon}
                </div>

                <h3 className="mt-6 text-xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 p-7">
            <h3 className="text-lg font-bold text-cyan-300">
              Core Conversation Flow
            </h3>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {[
                "User Question",
                "Next.js API Route",
                "Profile Context",
                "OpenAI",
                "Structured Response",
              ].map((item, index, array) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="rounded-full border border-blue-400/30 bg-slate-950/70 px-4 py-2 text-sm text-blue-300">
                    {item}
                  </span>

                  {index !== array.length - 1 && (
                    <span className="text-cyan-400">→</span>
                  )}
                </div>
              ))}
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
                title: "User Intent",
                description:
                  "The visitor asks a question or selects an action such as analyzing a job description or scheduling a meeting.",
              },
              {
                number: "02",
                title: "Context Preparation",
                description:
                  "Verified portfolio, experience, skills, certifications, and project information are supplied to the model.",
              },
              {
                number: "03",
                title: "Prompt Construction",
                description:
                  "System instructions define the assistant's role, permitted claims, response style, and workflow rules.",
              },
              {
                number: "04",
                title: "Intent-Specific Processing",
                description:
                  "The application routes the interaction into conversational Q&A, job analysis, or scheduling logic.",
              },
              {
                number: "05",
                title: "External API Action",
                description:
                  "When scheduling is requested, server-side APIs interact with Google Calendar rather than relying on the language model to invent availability.",
              },
              {
                number: "06",
                title: "Confirmed Response",
                description:
                  "The application displays the generated answer or confirms an external action only after the backend reports success.",
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

      {/* Portfolio Assistant */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Portfolio Assistant Use Cases
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-300">
            The current portfolio implementation supports multiple recruiter and
            visitor interactions from the same conversational interface.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-blue-400/20 bg-slate-900/40 p-7">
              <div className="text-sm font-semibold text-cyan-300">
                EXPERIENCE Q&A
              </div>

              <p className="mt-4 text-lg font-semibold text-white">
                “What experience does Abhilash have with Microsoft Fabric?”
              </p>

              <p className="mt-4 leading-7 text-gray-300">
                The assistant identifies relevant verified experience and
                summarizes Fabric work around Lakehouses, pipelines, semantic
                models, migration initiatives, and analytics.
              </p>
            </div>

            <div className="rounded-3xl border border-cyan-400/30 bg-slate-900/40 p-7">
              <div className="text-sm font-semibold text-cyan-300">
                JOB MATCH
              </div>

              <p className="mt-4 text-lg font-semibold text-white">
                “How well does this job description match Abhilash?”
              </p>

              <p className="mt-4 leading-7 text-gray-300">
                The assistant compares job requirements with supplied profile
                evidence and provides strong matches, relevant experience,
                potential gaps, and a realistic overall assessment.
              </p>
            </div>

            <div className="rounded-3xl border border-cyan-400/30 bg-cyan-500/5 p-7">
              <div className="text-sm font-semibold text-cyan-300">
                SCHEDULING
              </div>

              <p className="mt-4 text-lg font-semibold text-white">
                “I&apos;d like to schedule a meeting with Abhilash.”
              </p>

              <p className="mt-4 leading-7 text-gray-300">
                The assistant starts a guided scheduling flow, checks actual
                calendar availability, presents valid meeting times, and creates
                the event only after explicit visitor confirmation.
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
            One of the assistant&apos;s most useful recruiter-facing
            capabilities is comparing a job description against verified
            candidate information.
          </p>

          <div className="mt-10 overflow-x-auto rounded-3xl border border-blue-400/20 bg-slate-900/40">
            <table className="w-full min-w-[720px] text-left">
              <thead className="border-b border-blue-400/20 bg-slate-900/80">
                <tr>
                  <th className="px-6 py-4 text-blue-300">
                    Job Requirement
                  </th>

                  <th className="px-6 py-4 text-blue-300">
                    Profile Evidence
                  </th>

                  <th className="px-6 py-4 text-blue-300">
                    Assessment
                  </th>
                </tr>
              </thead>

              <tbody className="text-gray-300">
                <tr className="border-b border-blue-400/10">
                  <td className="px-6 py-4">
                    Microsoft Fabric
                  </td>

                  <td className="px-6 py-4">
                    Lakehouse, pipelines, semantic models
                  </td>

                  <td className="px-6 py-4 text-green-400">
                    Strong Match
                  </td>
                </tr>

                <tr className="border-b border-blue-400/10">
                  <td className="px-6 py-4">
                    SQL
                  </td>

                  <td className="px-6 py-4">
                    Data engineering and analytics workloads
                  </td>

                  <td className="px-6 py-4 text-green-400">
                    Strong Match
                  </td>
                </tr>

                <tr className="border-b border-blue-400/10">
                  <td className="px-6 py-4">
                    Power BI
                  </td>

                  <td className="px-6 py-4">
                    Dashboards, semantic models, KPI reporting
                  </td>

                  <td className="px-6 py-4 text-green-400">
                    Strong Match
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4">
                    Unlisted Technology
                  </td>

                  <td className="px-6 py-4">
                    No supporting profile evidence
                  </td>

                  <td className="px-6 py-4 text-yellow-400">
                    Potential Gap
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Example assessment shown for portfolio demonstration.
          </p>
        </div>
      </section>

      {/* Scheduling */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            GOOGLE CALENDAR INTEGRATION
          </div>

          <h2 className="mt-3 text-3xl font-bold text-white">
            AI-Assisted Meeting Scheduling
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-300">
            Scheduling is handled as an application workflow rather than a
            fabricated AI response. The chatbot gathers meeting information,
            calls server-side scheduling APIs, checks the connected Google
            Calendar, and creates a real event only after validation and user
            confirmation.
          </p>

          {/* Main Scheduling Architecture */}
          <div className="mt-10 rounded-3xl border border-cyan-400/25 bg-slate-900/50 p-7 md:p-8">
            <h3 className="text-xl font-bold text-cyan-300">
              Scheduling Architecture
            </h3>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {[
                "Visitor",
                "ChatBot",
                "Availability API",
                "Google Calendar Free/Busy",
                "Available Slots",
                "User Confirmation",
                "Schedule API",
                "Calendar Event",
                "Google Meet",
              ].map((item, index, array) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="rounded-full border border-blue-400/30 bg-slate-950/70 px-4 py-2 text-sm text-blue-300">
                    {item}
                  </span>

                  {index !== array.length - 1 && (
                    <span className="text-cyan-400">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Scheduling Steps */}
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {schedulingSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-blue-400/20 bg-slate-900/40 p-6"
              >
                <div className="text-sm font-bold text-cyan-300">
                  {step.number}
                </div>

                <h3 className="mt-3 text-lg font-bold text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Scheduling Safeguards */}
          <div className="mt-10 rounded-3xl border border-blue-400/20 bg-slate-900/40 p-7">
            <h3 className="text-xl font-bold text-white">
              Scheduling Controls
            </h3>

            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                "Natural-language date parsing",
                "Explicit date confirmation",
                "Google Calendar Free/Busy validation",
                "30-minute meeting duration",
                "Weekday and business-hour validation",
                "Mountain Time scheduling logic",
                "Past-date and past-time protection",
                "Availability rechecked before booking",
                "Double-booking conflict handling",
                "Google Meet conference generation",
                "Calendar attendee invitation",
                "Success shown only after backend confirmation",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-blue-400/20 bg-slate-950/50 p-4 text-sm text-gray-300"
                >
                  ✓ {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prompt Design */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Prompt, Context & Guardrail Design
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-300">
            The quality of the assistant depends on both the information
            supplied to the model and explicit instructions controlling what it
            may claim or do.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-blue-400/20 bg-slate-900/40 p-7">
              <h3 className="text-xl font-bold text-white">
                System Instructions
              </h3>

              <p className="mt-4 leading-7 text-gray-300">
                Define the assistant&apos;s role, response style, workflow
                behavior, and boundaries around unsupported claims.
              </p>
            </div>

            <div className="rounded-3xl border border-blue-400/20 bg-slate-900/40 p-7">
              <h3 className="text-xl font-bold text-white">
                Structured Context
              </h3>

              <p className="mt-4 leading-7 text-gray-300">
                Provide verified experience, skills, certifications, projects,
                technologies, and professional-impact statements.
              </p>
            </div>

            <div className="rounded-3xl border border-cyan-400/30 bg-slate-900/40 p-7">
              <h3 className="text-xl font-bold text-white">
                Action Guardrails
              </h3>

              <p className="mt-4 leading-7 text-gray-300">
                The assistant does not claim that a meeting was scheduled,
                email was sent, or external action succeeded until the
                corresponding backend API confirms the action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current vs Future */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Current Architecture vs Future RAG
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-300">
            The current portfolio implementation uses curated profile and
            resume-related context supplied directly to the model. It does not
            represent the current implementation as a retrieval-augmented
            generation system.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {/* Current */}
            <div className="rounded-3xl border border-cyan-400/30 bg-cyan-500/5 p-8">
              <div className="text-sm font-semibold text-cyan-300">
                CURRENT IMPLEMENTATION
              </div>

              <h3 className="mt-4 text-2xl font-bold text-white">
                Context-Grounded AI
              </h3>

              <div className="mt-6 space-y-3 text-gray-300">
                <div>✓ Curated profile context</div>
                <div>✓ Resume and project knowledge</div>
                <div>✓ Prompt engineering</div>
                <div>✓ OpenAI API</div>
                <div>✓ Job-description comparison</div>
                <div>✓ Google Calendar scheduling</div>
                <div>✓ Google Meet generation</div>
              </div>
            </div>

            {/* Future */}
            <div className="rounded-3xl border border-blue-400/20 bg-slate-900/40 p-8">
              <div className="text-sm font-semibold text-blue-300">
                FUTURE ENTERPRISE ARCHITECTURE
              </div>

              <h3 className="mt-4 text-2xl font-bold text-white">
                Retrieval-Augmented AI
              </h3>

              <div className="mt-6 space-y-3 text-gray-300">
                <div>○ Document retrieval</div>
                <div>○ Vector-based semantic search</div>
                <div>○ RAG architecture</div>
                <div>○ Enterprise data connectors</div>
                <div>○ Governed semantic-model access</div>
                <div>○ Role-based authorization</div>
                <div>○ Evaluation and monitoring framework</div>
              </div>
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
            AI and external API integrations are kept server-side so application
            credentials do not need to be exposed to the browser.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              "OpenAI API key stored server-side through environment variables",
              "Google OAuth credentials stored outside browser-side code",
              "Browser communicates with protected Next.js API routes",
              "Calendar availability is queried server-side",
              "Assistant is instructed to use supplied professional context",
              "Unsupported experience should not be invented",
              "Calendar events are created only after explicit confirmation",
              "Availability is revalidated before meeting creation",
              "Private calendar event contents are not exposed to visitors",
              "Production deployment can add rate limiting and bot protection",
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
              <h3 className="font-bold text-blue-300">
                Application
              </h3>

              <div className="mt-4 space-y-2 text-gray-300">
                <p>Next.js</p>
                <p>React</p>
                <p>TypeScript</p>
                <p>Tailwind CSS</p>
              </div>
            </div>

            <div className="rounded-3xl border border-blue-400/20 bg-slate-900/50 p-6">
              <h3 className="font-bold text-blue-300">
                AI
              </h3>

              <div className="mt-4 space-y-2 text-gray-300">
                <p>OpenAI API</p>
                <p>LLM</p>
                <p>Prompt Engineering</p>
                <p>Context Design</p>
              </div>
            </div>

            <div className="rounded-3xl border border-blue-400/20 bg-slate-900/50 p-6">
              <h3 className="font-bold text-blue-300">
                Integrations
              </h3>

              <div className="mt-4 space-y-2 text-gray-300">
                <p>Google Calendar API</p>
                <p>Google OAuth 2.0</p>
                <p>Free/Busy API</p>
                <p>Google Meet</p>
              </div>
            </div>

            <div className="rounded-3xl border border-blue-400/20 bg-slate-900/50 p-6">
              <h3 className="font-bold text-blue-300">
                Backend & Deployment
              </h3>

              <div className="mt-4 space-y-2 text-gray-300">
                <p>Next.js API Routes</p>
                <p>Environment Variables</p>
                <p>GitHub</p>
                <p>Vercel</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Value */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Business & Portfolio Value
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              "Provides an interactive interface to professional experience and projects",
              "Helps recruiters find relevant experience without manually scanning every page",
              "Supports realistic comparison between job requirements and candidate evidence",
              "Demonstrates practical generative AI integration rather than a static chatbot demo",
              "Connects AI conversation with a real external workflow through Google Calendar",
              "Reduces scheduling back-and-forth by presenting actual available meeting times",
              "Demonstrates API integration, OAuth, server-side workflow design, and frontend UX",
              "Creates a reusable foundation for more advanced enterprise AI assistants",
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

      {/* Future Enhancements */}
      <section className="border-t border-blue-400/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white">
            Future Enhancements
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-300">
            The current assistant is intentionally grounded in curated context.
            A future enterprise implementation could extend the architecture
            with retrieval, governed business data, stronger authentication,
            and production observability.
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
              "Rate limiting and bot protection",
              "Scheduling horizon controls",
              "Production monitoring and alerting",
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
              AI becomes more useful when it can understand, reason, and act.
            </h2>

            <p className="mt-5 max-w-4xl leading-8 text-gray-300">
              The project goes beyond adding a chatbot to a portfolio. It
              combines verified context, generative AI, job-requirement
              analysis, structured workflow logic, and a real Google Calendar
              integration to create a more useful and interactive application.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-blue-400/10 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm leading-6 text-gray-500">
            This case study represents the current portfolio assistant
            implementation and related application patterns. Retrieval-augmented
            generation, vector search, enterprise business-data connectors, and
            governed semantic-model access are presented as future enhancements
            and are not represented as currently implemented production
            features.
          </p>
        </div>
      </section>
    </main>
  );
}