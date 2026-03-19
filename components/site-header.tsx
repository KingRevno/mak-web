"use client";

import { useEffect, useMemo, useState } from "react";
import { TypedLogo } from "@/components/typed-logo";
import { TypedText } from "@/components/typed-text";
import { NAV_ITEMS } from "@/lib/portfolio-data";

export function SiteHeader() {
  const [activeId, setActiveId] = useState<string>("about");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const sectionIds = useMemo(() => NAV_ITEMS.map((item) => item.id), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.2, 0.4, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
      <div
        className={`mx-auto max-w-6xl rounded-2xl border transition-all duration-300 ${
          scrolled
            ? "border-white/15 glass-panel"
            : "border-transparent bg-transparent shadow-none"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70"
          >
            <TypedLogo className="text-lg" />
            <span className="hidden text-slate-400 md:inline">/</span>
            <TypedText
              text="Quality-first engineering"
              startDelayMs={1200}
              stepMs={65}
              className="hidden text-sm text-slate-300 md:inline-flex"
            />
          </a>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`rounded-full px-3 py-1.5 text-sm transition-all duration-300 ${
                    isActive
                      ? "bg-white/12 text-white"
                      : "text-slate-300 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-slate-100 md:hidden"
            onClick={() => setMobileOpen((current) => !current)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                <path
                  d="M4.5 7.5H19.5M4.5 12H19.5M4.5 16.5H19.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>

        {mobileOpen ? (
          <nav
            id="mobile-nav"
            className="space-y-1 border-t border-white/10 px-4 pb-4 pt-2 md:hidden"
            aria-label="Mobile navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-xl px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-white/12 text-white"
                      : "text-slate-300 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
