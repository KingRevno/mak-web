import { SectionShell } from "@/components/section-shell";
import { SectionReveal } from "@/components/section-reveal";
import { SiteHeader } from "@/components/site-header";
import {
  ABOUT_PARAGRAPHS,
  CONTACT_LINKS,
  EXPERIENCE_HIGHLIGHTS,
  FOOTER_TAGLINE,
  HERO_COPY,
  SKILL_GROUPS,
} from "@/lib/portfolio-data";

export default function Home() {
  const formspreeEndpoint =
    process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "https://formspree.io/f/your-form-id";

  return (
    <div id="top" className="min-h-screen bg-[#F7F6F2] text-slate-900">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-36 md:px-10 md:pt-40">
          <div className="hero-grid pointer-events-none absolute inset-0 opacity-70" />
          <div className="pointer-events-none absolute -left-24 top-20 h-56 w-56 rounded-full bg-blue-200/60 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 top-16 h-64 w-64 rounded-full bg-blue-100/70 blur-3xl" />

          <div className="mx-auto max-w-6xl">
            <SectionReveal className="relative">
              <div className="glass-panel rounded-2xl p-8 md:p-10">
                <div className="flex items-start gap-5">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-blue-600 text-3xl font-semibold text-white shadow-sm">
                    TM
                  </div>
                  <div>
                    <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-[#111827] md:text-[3.5rem]">
                      {HERO_COPY.name}
                    </h1>
                    <p className="mt-3 text-lg font-medium tracking-wide text-slate-600 md:text-2xl">
                      {HERO_COPY.role}
                    </p>
                  </div>
                </div>

                <p className="mt-7 max-w-3xl text-xl leading-8 text-slate-800 md:text-2xl md:leading-9">
                  {HERO_COPY.statement}
                </p>
                <p className="mt-7 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
                  {HERO_COPY.intro}
                </p>

                <div className="mt-10 flex flex-wrap gap-3">
                  <a
                    href="#experience"
                    className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition duration-150 hover:-translate-y-0.5 hover:bg-blue-700"
                  >
                    View Experience
                  </a>
                  <a
                    href="#resume"
                    className="rounded-lg border border-blue-600 bg-transparent px-6 py-3 text-sm font-semibold text-blue-600 transition duration-150 hover:-translate-y-0.5 hover:bg-blue-50"
                  >
                    Download Resume
                  </a>
                  <a
                    href="#contact"
                    className="rounded-lg border border-blue-600 bg-transparent px-6 py-3 text-sm font-semibold text-blue-600 transition duration-150 hover:-translate-y-0.5 hover:bg-blue-50"
                  >
                    Contact Me
                  </a>
                </div>
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
                <p className="text-sm leading-7 text-slate-700 md:text-base">
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
                <h3 className="inline-flex items-center gap-2 text-lg font-medium text-slate-900">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-600" aria-hidden />
                  {group.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-1 text-xs font-medium text-[#1D4ED8] transition duration-150 hover:-translate-y-0.5 hover:shadow-sm"
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
              <article
                key={item.title}
                className="rounded-xl border-l-4 border-blue-600 bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(37,99,235,0.14)]"
              >
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm font-medium text-slate-500">{item.impact}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.detail}</p>
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
              <h3 className="text-xl font-semibold text-slate-900">Tony Mak Resume</h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                Looking for deeper details on framework design, strategy ownership, and
                delivery outcomes? Download the latest resume PDF.
              </p>
            </div>
            <a
              href="/Anthony_Mak_Resume.pdf"
              className="mt-6 inline-flex rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition duration-150 hover:-translate-y-0.5 hover:bg-blue-700 md:mt-0"
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
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(37,99,235,0.14)]">
              <h3 className="text-lg font-semibold text-slate-900">Send a message</h3>
              <form
                action={formspreeEndpoint}
                method="post"
                className="mt-5 space-y-4"
              >
                <input type="hidden" name="_subject" value="New message from mak.codes" />
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition duration-150 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition duration-150 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition duration-150 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition duration-150 hover:bg-blue-700"
                >
                  Send
                </button>
              </form>
            </div>
            <div className="grid gap-4">
              <a
                href={`mailto:${CONTACT_LINKS.email}`}
                className="rounded-xl bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(37,99,235,0.14)]"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Email</p>
                <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-slate-900">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-blue-600" aria-hidden>
                    <path
                      d="M4 6.75A1.75 1.75 0 0 1 5.75 5h12.5A1.75 1.75 0 0 1 20 6.75v10.5A1.75 1.75 0 0 1 18.25 19H5.75A1.75 1.75 0 0 1 4 17.25V6.75Zm1.5.61v.09l6.5 4.64 6.5-4.64v-.09a.25.25 0 0 0-.25-.25H5.75a.25.25 0 0 0-.25.25Zm13 1.93-5.92 4.23a1 1 0 0 1-1.16 0L5.5 9.29v7.96c0 .14.11.25.25.25h12.5a.25.25 0 0 0 .25-.25V9.29Z"
                      fill="currentColor"
                    />
                  </svg>
                  {CONTACT_LINKS.email}
                </p>
              </a>
              <a
                href={CONTACT_LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(37,99,235,0.14)]"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">LinkedIn</p>
                <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-slate-900">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-blue-600" aria-hidden>
                    <path
                      d="M6.5 8.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5ZM5.25 10h2.5v8h-2.5v-8Zm4 0h2.39v1.1h.04c.33-.63 1.14-1.3 2.35-1.3 2.51 0 2.97 1.65 2.97 3.8V18h-2.5v-3.79c0-.9-.02-2.05-1.25-2.05-1.26 0-1.46.98-1.46 1.99V18h-2.54v-8Z"
                      fill="currentColor"
                    />
                  </svg>
                  Connect on LinkedIn
                </p>
              </a>
              <a
                href={CONTACT_LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(37,99,235,0.14)]"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">GitHub</p>
                <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-slate-900">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-blue-600" aria-hidden>
                    <path
                      d="M12 3.75a8.25 8.25 0 0 0-2.61 16.08c.41.08.56-.18.56-.4v-1.46c-2.28.5-2.76-.97-2.76-.97-.37-.94-.9-1.19-.9-1.19-.74-.5.06-.49.06-.49.82.06 1.25.84 1.25.84.73 1.25 1.91.89 2.38.68.07-.53.28-.89.5-1.1-1.82-.21-3.73-.91-3.73-4.05 0-.9.32-1.63.84-2.2-.09-.2-.37-1.03.08-2.15 0 0 .68-.22 2.23.84a7.67 7.67 0 0 1 4.06 0c1.54-1.06 2.23-.84 2.23-.84.44 1.12.16 1.95.08 2.15.52.57.84 1.3.84 2.2 0 3.15-1.92 3.84-3.75 4.04.29.25.55.76.55 1.53v2.27c0 .22.15.48.56.4A8.25 8.25 0 0 0 12 3.75Z"
                      fill="currentColor"
                    />
                  </svg>
                  View QA and automation work
                </p>
              </a>
            </div>
          </div>
        </SectionShell>
      </main>

      <footer className="mt-8 bg-[#111827]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-[#9CA3AF] md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <p className="font-semibold text-[#F9FAFB]">Tony Mak</p>
            <p className="mt-1 text-[#9CA3AF]">{FOOTER_TAGLINE}</p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={CONTACT_LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-[#F9FAFB] transition-colors duration-150 hover:text-blue-600"
            >
              LinkedIn
            </a>
            <a
              href={CONTACT_LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="text-[#F9FAFB] transition-colors duration-150 hover:text-blue-600"
            >
              GitHub
            </a>
            <a
              href={`mailto:${CONTACT_LINKS.email}`}
              className="text-[#F9FAFB] transition-colors duration-150 hover:text-blue-600"
            >
              Email
            </a>
            <span className="text-[#6B7280]">© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
