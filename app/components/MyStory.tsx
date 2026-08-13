export default function MyStory() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="group relative overflow-hidden rounded-3xl border border-blue-400/20 bg-slate-900/40 shadow-[0_0_40px_rgba(59,130,246,0.06)]">
          {/* Background glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative grid items-center gap-8 p-7 md:grid-cols-[1fr_340px] md:p-9 lg:grid-cols-[1fr_380px]">
            {/* =================================================
                LEFT CONTENT
            ================================================= */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400">
                MY STORY
              </p>

              <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight text-white">
                I didn&apos;t start with a perfect plan.
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-gray-400">
                From starting my career as a fresh graduate, to discovering
                analytics at Amazon, moving to the U.S. for my master&apos;s,
                and finding my path into data engineering every chapter
                changed what came next.
              </p>

              {/* Journey line */}
              <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                <span>Concentrix</span>

                <span className="text-cyan-500">
                  →
                </span>

                <span>Amazon</span>

                <span className="text-cyan-500">
                  →
                </span>

                <span>University of Utah</span>

                <span className="text-cyan-500">
                  →
                </span>

                <span>Swire Coca-Cola</span>

                <span className="text-cyan-500">
                  →
                </span>

                <span>Data & AI</span>
              </div>

              <a
                href="/about-me"
                className="mt-7 inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-500/5 px-5 py-3 text-sm font-semibold text-cyan-300 transition hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-cyan-500/10"
              >
                Read My Story
                <span>→</span>
              </a>
            </div>

            {/* =================================================
                DAY 1 PHOTO
            ================================================= */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-full max-w-[330px]">
                {/* Photo glow */}
                <div className="absolute -inset-4 rounded-3xl bg-blue-500/10 blur-2xl" />

                <div className="relative overflow-hidden rounded-2xl border border-blue-400/25 bg-slate-950/70 p-2">
                  {/*
                    The DAY 1 image is vertical.

                    Instead of cropping it into landscape,
                    give it its own portrait-style frame.
                  */}
                  <div className="relative flex h-[250px] items-center justify-center overflow-hidden rounded-xl bg-black/20 md:h-[270px]">
                    <img
                      src="/story-amazon-day1.jpeg"
                      alt="Amazon Day 1 — part of Abhilash's career journey"
                      className="h-full w-auto max-w-full object-contain transition duration-500 group-hover:scale-[1.02]"
                    />

                    {/* Bottom fade */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/70 to-transparent" />
                  </div>

                  {/* Caption */}
                  <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-400">
                        A TURNING POINT
                      </p>

                      <p className="mt-1 text-sm font-medium text-gray-200">
                        Amazon • Day 1
                      </p>
                    </div>

                    <span className="text-lg text-cyan-400">
                      ↗
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle bottom gradient */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}