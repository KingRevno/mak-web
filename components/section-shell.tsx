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
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
            {eyebrow}
          </p>
          <div className="mt-4 border-l-4 border-blue-600 pl-4">
            <h2 className="text-[2rem] font-semibold tracking-tight text-slate-900">{title}</h2>
          </div>
          {description ? (
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
              {description}
            </p>
          ) : null}
        </SectionReveal>
        <SectionReveal className="mt-10">
          {children}
        </SectionReveal>
      </div>
    </section>
  );
}
