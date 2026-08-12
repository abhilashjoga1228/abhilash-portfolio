export default function AboutMePage() {
  const journey = [
    {
      number: "01",
      eyebrow: "WHERE IT STARTED",
      title: "Concentrix — Starting Without a Perfect Plan",
      image: "/story-concentrix.jpeg",
      imageAlt: "Early career recognition at Concentrix",
      imageFit: "contain",
      paragraphs: [
        "I started my career at Concentrix as a fresh graduate without a perfect roadmap for where my career would go. I was new to the professional world, learning how organizations worked, discovering my strengths, and trying to understand what kind of career I wanted to build.",
        "That period taught me something I still carry today: every beginning matters. The first opportunity, the first person who trusts you, and the first recognition you receive can give you the confidence to keep moving forward.",
      ],
    },

    {
      number: "02",
      eyebrow: "A TURNING POINT",
      title: "Amazon — The Opportunity That Changed My Direction",
      image: "/story-amazon-day1.jpeg",
      imageAlt: "Amazon Day 1 experience",
      imageFit: "contain",
      secondaryImage: "/story-amazon-campus.jpeg",
      secondaryImageAlt: "Amazon campus",
      paragraphs: [
        "Amazon gave me an opportunity to explore things I had never imagined when I first left college. Working around last-mile operations exposed me to large-scale operational problems, analytics, SQL, automation, and the impact that good data can have on real decisions.",
        "It became an important turning point. I started seeing data not simply as reports or numbers, but as a way to understand why something was happening and what could be done differently.",
        "The Day 1 mindset also stayed with me: stay curious, keep learning, and never assume you have figured everything out.",
      ],
    },

    {
      number: "03",
      eyebrow: "THE BIG LEAP",
      title: "Moving to the U.S. for My Master’s",
      image: "/story-utah-holi.jpeg",
      imageAlt: "University of Utah student life",
      imageFit: "cover",
      paragraphs: [
        "After Amazon, I decided to take a bigger leap and move to the United States for my master’s at the University of Utah. It meant leaving familiarity behind and starting another chapter from the beginning.",
        "Graduate school gave me the opportunity to strengthen the connection between business, analytics, technology, and modern data platforms. It was also a period of adapting to a new country, meeting people from different backgrounds, and becoming more comfortable taking risks.",
      ],
    },

    {
      number: "04",
      eyebrow: "BECOMING A DATA ENGINEER",
      title: "Swire Coca-Cola — Turning Learning Into Real Systems",
      image: "/story-swire.jpeg",
      imageAlt: "Coca-Cola collection representing time at Swire Coca-Cola",
      imageFit: "contain",
      paragraphs: [
        "My next major step was joining Swire Coca-Cola as a Data Engineering Intern. That opportunity helped turn what I had been learning into real engineering and analytics work.",
        "I worked across data pipelines, SQL, Python, cloud platforms, Snowflake, Power BI, automation, operational analytics, and data modernization. Over time, my responsibilities expanded well beyond the internship and into broader enterprise analytics and data work.",
        "This chapter showed me that the best data solutions are not necessarily the most complicated ones. They are the ones that people can trust, understand, and actually use to make better decisions.",
      ],
    },

    {
      number: "05",
      eyebrow: "CONFIDENCE IN THE JOURNEY",
      title: "Adobe — The Chapter That Made Me Fully Believe in Myself",
      logo: "/Logos/adobe.png",
      paragraphs: [
        "Adobe became a very meaningful chapter in my career. By the time I joined, I had already worked across analytics, cloud data platforms, BI, automation, and engineering — but this experience gave me a different level of confidence in what I could contribute.",
        "My work expanded across Databricks, SnapLogic, SQL Server, Salesforce, Dynamics 365, Microsoft Fabric, data modernization, analytics platforms, and automation. It gave me opportunities to think more deeply about how enterprise data environments evolve and how modern cloud platforms and AI can support that evolution.",
        "More than the technology, I am grateful for the opportunity and for the team I worked with. The trust, collaboration, and support I received there helped me feel fully confident that this is the career I want to keep building.",
      ],
    },

    {
      number: "06",
      eyebrow: "WHAT I’M BUILDING NOW",
      title: "Cloud Data, AI & What Comes Next",
      paragraphs: [
        "Today, my work and learning sit at the intersection of data engineering, analytics, cloud platforms, automation, and applied AI.",
        "Microsoft Fabric, Databricks, Snowflake, Azure, Power BI, SQL, Python, AI agents, and applications such as DataLens AI are all part of how I continue exploring what modern data platforms can become.",
        "I still do not think of the journey as finished. Technology changes too quickly for that. I would rather keep the same curiosity that helped me move from my first job into analytics and eventually into data engineering.",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* =====================================================
          NAV
      ===================================================== */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a
            href="/"
            className="text-sm text-gray-300 transition hover:text-cyan-300"
          >
            ← Abhilash Portfolio
          </a>

          <a
            href="/#contact"
            className="text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
          >
            Let&apos;s Connect
          </a>
        </div>
      </nav>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden px-6 pb-24 pt-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div>
            <div className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-500/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
              MY STORY
            </div>

            <h1 className="mt-6 max-w-3xl bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-5xl font-bold leading-[1.05] text-transparent md:text-6xl">
              I didn&apos;t start with a perfect plan.
            </h1>

            <p className="mt-7 max-w-2xl text-xl leading-9 text-gray-300">
              I started as a fresh graduate trying to understand where my
              career would go. One opportunity led to another, curiosity led me
              toward data, and eventually that journey brought me into data
              engineering, cloud platforms, analytics, and AI.
            </p>

            <p className="mt-5 max-w-2xl leading-8 text-gray-400">
              This page is less about technologies and job titles and more
              about the experiences, people, decisions, and values behind the
              work.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              {[
                "Concentrix",
                "Amazon",
                "University of Utah",
                "Swire Coca-Cola",
                "Adobe",
                "Data Engineering",
                "AI",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-blue-400/20 bg-blue-500/5 px-4 py-2 text-sm text-blue-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[3rem] bg-cyan-500/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-blue-400/25 bg-slate-900/50 p-2 shadow-[0_0_60px_rgba(59,130,246,0.12)]">
              <img
                src="/beyond-mountain.jpeg"
                alt="Exploring the mountains"
                className="aspect-[4/5] w-full rounded-[1.6rem] object-cover"
              />

              <div className="absolute inset-x-2 bottom-2 rounded-b-[1.6rem] bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent px-6 pb-6 pt-24">
                <p className="text-sm font-medium text-cyan-300">
                  Still exploring.
                </p>

                <p className="mt-1 text-lg font-semibold text-white">
                  In technology, in life, and sometimes on a mountain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          JOURNEY INTRO
      ===================================================== */}
      <section className="border-y border-white/5 bg-slate-900/20 px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            THE JOURNEY
          </p>

          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
            From uncertainty to opportunity.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl leading-8 text-gray-400">
            Careers rarely move in a perfectly straight line. Mine certainly
            didn&apos;t. Each chapter gave me something I needed for the next
            one.
          </p>
        </div>
      </section>

      {/* =====================================================
          CAREER STORY
      ===================================================== */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl space-y-28">
          {journey.map((chapter, index) => {
            const hasImage = Boolean(chapter.image);
            const hasLogo = Boolean(chapter.logo);
            const hasVisual = hasImage || hasLogo;

            return (
              <article
                key={chapter.number}
                className={`grid items-center gap-12 ${
                  hasVisual
                    ? "lg:grid-cols-2 lg:gap-16"
                    : "mx-auto max-w-4xl"
                }`}
              >
                {/* TEXT */}
                <div
                  className={
                    hasVisual && index % 2 === 1
                      ? "lg:order-2"
                      : ""
                  }
                >
                  <div className="flex items-center gap-4">
                    <span className="text-5xl font-bold text-blue-500/25">
                      {chapter.number}
                    </span>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                        {chapter.eyebrow}
                      </p>

                      <div className="mt-2 h-px w-16 bg-gradient-to-r from-cyan-400 to-transparent" />
                    </div>
                  </div>

                  <h2 className="mt-6 text-3xl font-bold leading-tight text-white md:text-4xl">
                    {chapter.title}
                  </h2>

                  <div className="mt-7 space-y-5">
                    {chapter.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="leading-8 text-gray-400"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* IMAGE */}
                {hasImage && (
                  <div
                    className={
                      index % 2 === 1
                        ? "lg:order-1"
                        : ""
                    }
                  >
                    <div className="grid gap-4">
                      <div className="overflow-hidden rounded-3xl border border-blue-400/20 bg-slate-900/50 p-2">
                        <div className="flex min-h-[360px] items-center justify-center overflow-hidden rounded-[1.25rem] bg-slate-950/60">
                          <img
                            src={chapter.image}
                            alt={chapter.imageAlt}
                            className={
                              chapter.imageFit === "contain"
                                ? "max-h-[420px] w-full object-contain"
                                : "h-[420px] w-full object-cover"
                            }
                          />
                        </div>
                      </div>

                      {chapter.secondaryImage && (
                        <div className="ml-auto w-full overflow-hidden rounded-2xl border border-cyan-400/20 bg-slate-900/50 p-2 sm:w-2/3">
                          <div className="flex h-[220px] items-center justify-center overflow-hidden rounded-xl bg-slate-950/60">
                            <img
                              src={chapter.secondaryImage}
                              alt={chapter.secondaryImageAlt}
                              className="h-full w-full object-contain"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ADOBE LOGO VISUAL */}
                {hasLogo && !hasImage && (
                  <div
                    className={
                      index % 2 === 1
                        ? "lg:order-1"
                        : ""
                    }
                  >
                    <div className="relative overflow-hidden rounded-3xl border border-red-400/20 bg-gradient-to-br from-red-500/10 via-slate-900/70 to-slate-950 p-10">
                      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-red-500/10 blur-3xl" />

                      <div className="relative flex min-h-[360px] flex-col items-center justify-center text-center">
                        <div className="flex h-28 w-28 items-center justify-center rounded-3xl border border-red-400/20 bg-slate-950/70 p-5 shadow-[0_0_40px_rgba(239,68,68,0.12)]">
                          <img
                            src={chapter.logo}
                            alt="Adobe"
                            className="h-full w-full object-contain"
                          />
                        </div>

                        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.22em] text-red-300">
                          A CHAPTER I&apos;M GRATEFUL FOR
                        </p>

                        <h3 className="mt-3 max-w-md text-2xl font-bold text-white">
                          Confidence comes from opportunity, trust, and the
                          people around you.
                        </h3>

                        <p className="mt-4 max-w-md leading-7 text-gray-400">
                          I&apos;m grateful for the opportunity Adobe gave me
                          and for the team that helped make this chapter so
                          meaningful.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          VALUES QUOTE
      ===================================================== */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-cyan-400/25 bg-gradient-to-br from-blue-500/10 via-slate-900/70 to-cyan-500/5 p-8 text-center md:p-14">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative">
              <div className="text-6xl leading-none text-cyan-400/30">
                “
              </div>

              <h2 className="mx-auto -mt-3 max-w-3xl text-3xl font-bold leading-tight text-white md:text-4xl">
                Never forget who helped you when you had nothing.
              </h2>

              <p className="mx-auto mt-7 max-w-3xl leading-8 text-gray-300">
                I&apos;ve learned that an opportunity, a little trust, some
                guidance, or someone simply choosing to help can change the
                direction of another person&apos;s life.
              </p>

              <p className="mx-auto mt-4 max-w-3xl leading-8 text-gray-400">
                I try to remember the people who did that for me and help
                others whenever I can without asking what I&apos;ll receive in
                return. I believe doing the right thing matters even when
                nobody is watching.
              </p>

              <p className="mx-auto mt-4 max-w-3xl leading-8 text-gray-400">
                I also believe there is something greater than immediate
                recognition or reward. The way we treat people and the choices
                we make matter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          OUTSIDE WORK
      ===================================================== */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              OUTSIDE WORK
            </p>

            <h2 className="mt-4 text-4xl font-bold text-white">
              There&apos;s more to life than a dashboard.
            </h2>

            <p className="mx-auto mt-5 max-w-3xl leading-8 text-gray-400">
              Curiosity doesn&apos;t stop when I close the laptop. Some of my
              favorite things have nothing to do with SQL, pipelines, or cloud
              architecture.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            {/* NATIONAL PARKS */}
            <div className="group relative min-h-[560px] overflow-hidden rounded-3xl border border-blue-400/20">
              <img
                src="/beyond-mountain.jpeg"
                alt="Hiking and exploring national parks"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
                <span className="rounded-full border border-cyan-300/30 bg-slate-950/50 px-3 py-1.5 text-xs font-semibold text-cyan-200 backdrop-blur">
                  NATIONAL PARKS • HIKING • TRAVEL
                </span>

                <h3 className="mt-5 text-3xl font-bold text-white">
                  One park at a time.
                </h3>

                <p className="mt-4 max-w-xl leading-7 text-gray-200">
                  I love exploring national parks, hiking, road trips, and
                  seeing places that remind you how much of the world exists
                  beyond your everyday routine.
                </p>

                <div className="mt-5 inline-flex items-center rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm font-medium text-white backdrop-blur">
                  🎯 Personal goal: Visit every U.S. National Park
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              {/* PICKLEBALL */}
              <div className="overflow-hidden rounded-3xl border border-blue-400/20 bg-slate-900/40">
                <div className="overflow-hidden bg-slate-950/60">
                  <img
                    src="/beyond-pickleball.jpeg"
                    alt="Playing pickleball"
                    className="h-[330px] w-full object-cover object-center"
                  />
                </div>

                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
                    PICKLEBALL • FITNESS
                  </p>

                  <h3 className="mt-3 text-2xl font-bold">
                    Competitive off-screen too.
                  </h3>

                  <p className="mt-3 leading-7 text-gray-400">
                    Pickleball, workouts, hiking, and staying active are some
                    of the ways I reset after spending hours solving technical
                    problems.
                  </p>
                </div>
              </div>

              {/* PUBLIC AFFAIRS */}
              <div className="rounded-3xl border border-blue-400/20 bg-slate-900/40 p-7">
                <div className="text-3xl">
                  🏛️
                </div>

                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
                  WHAT I FOLLOW
                </p>

                <h3 className="mt-3 text-2xl font-bold">
                  Politics, policy & technology.
                </h3>

                <p className="mt-3 leading-7 text-gray-400">
                  I enjoy following politics, public policy, technology, and
                  AI — especially how decisions, systems, and technology shape
                  communities and people&apos;s everyday lives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRINCIPLES
      ===================================================== */}
      <section className="border-y border-white/5 bg-slate-900/20 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              PRINCIPLES I TRY TO CARRY
            </p>

            <h2 className="mt-4 text-4xl font-bold text-white">
              Technology changes. Values shouldn&apos;t.
            </h2>

            <p className="mx-auto mt-5 max-w-3xl leading-8 text-gray-400">
              The tools I use will keep changing. The way I try to treat people
              should not.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <ValueCard
              icon="🤝"
              title="Remember Who Helped"
              description="Success is rarely completely individual. I try not to forget the people who offered an opportunity, advice, trust, or support when it mattered."
            />

            <ValueCard
              icon="❤️"
              title="Help Without Keeping Score"
              description="Not every good action needs a return. If you can make something easier for someone else, sometimes that is reason enough to do it."
            />

            <ValueCard
              icon="🧭"
              title="Do the Right Thing"
              description="Character matters most when there is no audience. I believe integrity should not depend on whether someone is watching."
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          END
      ===================================================== */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            THE STORY CONTINUES
          </p>

          <h2 className="mt-5 text-4xl font-bold leading-tight text-white md:text-5xl">
            I&apos;m still figuring out what the next chapter looks like.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-gray-400">
            And I think that&apos;s a good thing. There is always another
            technology to learn, another place to explore, another problem to
            solve, and another person you might be able to help.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a
              href="/#projects"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Explore My Work →
            </a>

            <a
              href="/#contact"
              className="rounded-xl border border-blue-400/35 px-6 py-3 font-semibold text-blue-300 transition hover:border-cyan-400/50 hover:bg-blue-500/10"
            >
              Let&apos;s Connect
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-blue-400/15 bg-slate-950/50 p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30">
      <div className="text-3xl">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-bold text-white">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-gray-400">
        {description}
      </p>
    </div>
  );
}