import { SectionShell } from "@/components/section-shell";
import { SectionReveal } from "@/components/section-reveal";
import { SiteHeader } from "@/components/site-header";
import {
  ABOUT_PARAGRAPHS,
  CONTACT_LINKS,
  EXPERIENCE_HIGHLIGHTS,
  FEATURED_PROJECTS,
  FOOTER_TAGLINE,
  HERO_COPY,
  SKILL_GROUPS,
} from "@/lib/portfolio-data";

export default function Home() {
  return (
    <div id="top" className="min-h-screen text-slate-100">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-36 md:px-10 md:pt-40">
          <div className="pointer-events-none absolute -left-24 top-20 h-56 w-56 rounded-full bg-sky-400/15 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 top-16 h-64 w-64 rounded-full bg-indigo-400/15 blur-3xl" />

          <div className="mx-auto max-w-6xl">
            <SectionReveal>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
                {HERO_COPY.name}
              </h1>
              <p className="mt-4 text-lg font-medium tracking-wide text-sky-100/85 md:text-2xl">
                {HERO_COPY.role}
              </p>
              <p className="mt-6 max-w-3xl text-xl leading-8 text-slate-100/95 md:text-2xl md:leading-9">
                {HERO_COPY.statement}
              </p>
              <p className="mt-7 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
                {HERO_COPY.intro}
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="rounded-full bg-sky-300 px-6 py-3 text-sm font-semibold text-slate-950 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-sky-200"
                >
                  View Projects
                </a>
                <a
                  href="#resume"
                  className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                >
                  Download Resume
                </a>
                <a
                  href="#contact"
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-slate-200 transition duration-300 hover:-translate-y-0.5 hover:border-sky-200/60 hover:text-white"
                >
                  Contact Me
                </a>
              </div>
            </SectionReveal>
          </div>
        </section>

        <SectionShell
          id="about"
          eyebrow="About"
          title="Driving software quality through scalable automation."
          description="I build quality systems that help product teams move faster with confidence."
        >
          <div className="grid gap-5 md:grid-cols-3">
            {ABOUT_PARAGRAPHS.map((paragraph) => (
              <article key={paragraph} className="rounded-2xl glass-panel p-6">
                <p className="text-sm leading-7 text-slate-200/90 md:text-base">
                  {paragraph}
                </p>
              </article>
            ))}
          </div>
        </SectionShell>

        <SectionShell
          id="skills"
          eyebrow="Skills"
          title="Tools and practices I rely on."
          description="A practical stack focused on reliable automation, fast feedback, and release quality."
        >
          <div className="grid gap-5 md:grid-cols-2">
            {SKILL_GROUPS.map((group) => (
              <article key={group.title} className="rounded-2xl glass-panel p-6">
                <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/15 bg-white/6 px-3 py-1 text-xs font-medium text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </SectionShell>

        <SectionShell
          id="experience"
          eyebrow="Experience"
          title="Impact-focused QA leadership."
          description="Highlights of how I improve engineering outcomes, not just test counts."
        >
          <div className="grid gap-5 md:grid-cols-2">
            {EXPERIENCE_HIGHLIGHTS.map((item) => (
              <article key={item.title} className="rounded-2xl glass-panel p-6">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm font-medium text-sky-100/90">{item.impact}</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.detail}</p>
              </article>
            ))}
          </div>
        </SectionShell>

        <SectionShell
          id="projects"
          eyebrow="Projects"
          title="Featured quality engineering projects."
          description="Focused initiatives that improved stability, confidence, and delivery speed."
        >
          <div className="grid gap-5 md:grid-cols-2">
            {FEATURED_PROJECTS.map((project) => (
              <article key={project.title} className="rounded-2xl glass-panel p-6">
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{project.summary}</p>
                <p className="mt-4 text-sm font-medium text-sky-100">{project.outcome}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 bg-white/6 px-3 py-1 text-xs text-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.detailsUrl ?? "#"}
                  className="mt-5 inline-flex rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-sky-200/60 hover:text-white"
                >
                  View Details
                </a>
              </article>
            ))}
          </div>
        </SectionShell>

        <SectionShell
          id="resume"
          eyebrow="Resume"
          title="Resume and background."
          description="Download a full overview of my QA automation and software quality experience."
        >
          <div className="rounded-2xl glass-panel p-8 md:flex md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">Tony Mak Resume</h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                Looking for deeper details on framework design, strategy ownership, and
                delivery outcomes? Download the latest resume PDF.
              </p>
            </div>
            <a
              href="/Anthony_Mak_Resume.pdf"
              className="mt-6 inline-flex rounded-full bg-sky-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-sky-200 md:mt-0"
              download
            >
              Download Resume
            </a>
          </div>
        </SectionShell>

        <SectionShell
          id="contact"
          eyebrow="Contact"
          title="Let&apos;s build reliable releases together."
          description="If you are scaling automation, modernizing QA, or strengthening release confidence, I would love to connect."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <a
              href={`mailto:${CONTACT_LINKS.email}`}
              className="rounded-2xl glass-panel p-6 transition hover:border-sky-200/60"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Email</p>
              <p className="mt-3 text-sm font-medium text-white">{CONTACT_LINKS.email}</p>
            </a>
            <a
              href={CONTACT_LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl glass-panel p-6 transition hover:border-sky-200/60"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">LinkedIn</p>
              <p className="mt-3 text-sm font-medium text-white">Connect on LinkedIn</p>
            </a>
            <a
              href={CONTACT_LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl glass-panel p-6 transition hover:border-sky-200/60"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">GitHub</p>
              <p className="mt-3 text-sm font-medium text-white">View QA and automation work</p>
            </a>
          </div>
        </SectionShell>
      </main>

      <footer className="border-t section-divider">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-slate-300 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <p className="font-semibold text-white">Tony Mak</p>
            <p className="mt-1 text-slate-400">{FOOTER_TAGLINE}</p>
          </div>
          <div className="flex items-center gap-4">
            <a href={CONTACT_LINKS.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">
              LinkedIn
            </a>
            <a href={CONTACT_LINKS.github} target="_blank" rel="noreferrer" className="hover:text-white">
              GitHub
            </a>
            <a href={`mailto:${CONTACT_LINKS.email}`} className="hover:text-white">
              Email
            </a>
            <span className="text-slate-500">© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
