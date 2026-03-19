export type NavItem = {
  label: string;
  href: `#${string}`;
  id: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type ExperienceHighlight = {
  title: string;
  impact: string;
  detail: string;
};

export type Project = {
  title: string;
  summary: string;
  tags: string[];
  outcome: string;
  detailsUrl?: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Resume", href: "#resume", id: "resume" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const HERO_COPY = {
  name: "Anthony Mak",
  role: "Senior SDET | QA Automation Engineer",
  statement:
    "I build scalable test automation, improve release confidence, and help teams ship with quality.",
  intro:
    "I specialize in robust UI automation, API testing, CI/CD quality gates, maintainable automation frameworks, and visual validation pipelines that keep releases reliable as systems scale.",
};

export const ABOUT_PARAGRAPHS = [
  "I specialize in QA automation and software quality engineering for teams that need speed without sacrificing confidence.",
  "My focus is building maintainable, scalable automation frameworks that increase test coverage, improve reliability, and reduce release risk over time.",
  "I work across UI, API, integration, and CI/CD workflows, and I bring additional experience in visual and 3D validation where rendering accuracy is business-critical.",
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Automation",
    items: [
      "Playwright",
      "Selenium",
      "REST Assured",
      "Cucumber",
      "JUnit",
      "PyTest",
    ],
  },
  {
    title: "Languages",
    items: ["TypeScript", "Java", "Python", "SQL"],
  },
  {
    title: "Tools / DevOps",
    items: [
      "GitHub Actions",
      "Docker",
      "Kubernetes",
      "Postman",
      "Redis",
    ],
  },
  {
    title: "QA Focus",
    items: [
      "Test Strategy",
      "Visual Validation",
      "Regression Testing",
      "CI/CD Quality Gates",
      "Risk Analysis",
    ],
  },
];

export const EXPERIENCE_HIGHLIGHTS: ExperienceHighlight[] = [
  {
    title: "Automation Framework Development",
    impact: "Reduced maintenance overhead and increased test speed.",
    detail:
      "Designed reusable test architecture and standards that improved reliability across multiple product surfaces.",
  },
  {
    title: "CI/CD Quality Integration",
    impact: "Shifted quality checks earlier in the delivery lifecycle.",
    detail:
      "Embedded automation and quality gates directly into pipelines to catch regressions before production.",
  },
  {
    title: "Test Coverage & Reliability Improvements",
    impact: "Raised release confidence for cross-functional teams.",
    detail:
      "Expanded coverage across UI, API, and integration layers with risk-focused prioritization strategies.",
  },
  {
    title: "QA Leadership & Mentorship",
    impact: "Improved delivery consistency across teams.",
    detail:
      "Mentored engineers on automation best practices, review processes, and quality ownership habits.",
  },
  {
    title: "Visual / 3D Validation Work",
    impact: "Prevented high-impact visual regressions before release.",
    detail:
      "Built validation approaches for visual and 3D rendering behavior where precision and consistency are critical.",
  },
];

export const FEATURED_PROJECTS: Project[] = [
  {
    title: "Playwright Framework Modernization",
    summary:
      "Rebuilt a legacy UI suite into a modular Playwright framework with robust fixtures and faster execution.",
    tags: ["Playwright", "TypeScript", "CI"],
    outcome:
      "Improved test stability while reducing flaky failures and overall execution time.",
  },
  {
    title: "CI/CD Quality Gate Pipeline",
    summary:
      "Implemented quality gate orchestration that blocks risky deployments based on test health and key checks.",
    tags: ["GitHub Actions", "Quality Gates", "DevOps"],
    outcome:
      "Increased release confidence and provided clear pass/fail criteria to engineering stakeholders.",
  },
  {
    title: "QA Metrics Dashboard",
    summary:
      "Designed a dashboard for test pass rates, flaky trends, and release-readiness metrics.",
    tags: ["Metrics", "SQL", "Reporting"],
    outcome:
      "Gave teams actionable visibility into quality posture and regression risk over time.",
  },
  {
    title: "Visual Asset Validation Pipeline",
    summary:
      "Built automated visual checks for pixel-level differences and 3D rendering integrity.",
    tags: ["Visual Testing", "Automation", "3D QA"],
    outcome:
      "Reduced manual visual verification and caught subtle defects before they reached production.",
  },
];

export const CONTACT_LINKS = {
  email: "marcellomak@gmail.com",
  linkedin: "https://www.linkedin.com/in/maktony/",
  github: "https://github.com/KingRevno",
};

export const FOOTER_TAGLINE =
  "Building reliable systems through thoughtful automation and quality engineering.";
