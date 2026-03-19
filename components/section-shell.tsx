import { ReactNode } from "react";
import { SectionReveal } from "@/components/section-reveal";

type SectionShellProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
}: SectionShellProps) {
  return (
    <section id={id} className="scroll-mt-28 border-t section-divider">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
        <SectionReveal>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-sky-200/70">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300/90 md:text-lg">
              {description}
            </p>
          ) : null}
        </SectionReveal>
        <SectionReveal className="mt-10" delay={0.05}>
          {children}
        </SectionReveal>
      </div>
    </section>
  );
}
