// Project content. Case studies get full pages; notes render as short quiet entries.

export interface CaseStudy {
  type: "case-study";
  slug: string;
  title: string;
  oneLiner: string;
  tech: string[];
  repo: string;
  /** Featured project — gets the amber accent treatment. */
  accent?: boolean;
  problem: string;
  approach: string;
  outcome: string;
  learnings: string[];
}

export interface ProjectNote {
  type: "note";
  title: string;
  body: string;
  /** Renders without any outbound link (e.g. NDA work). */
  noLink: true;
}

export type Project = CaseStudy | ProjectNote;

export const projects: Project[] = [
  {
    type: "case-study",
    slug: "astrazeneca-early-action",
    title: "AstraZeneca Early Action",
    oneLiner:
      "AI-powered lung cancer early detection strategy, built for AstraZeneca during the EDHEC MBA Industry Acceleration Project.",
    tech: ["JavaScript", "AI strategy", "Healthcare"],
    repo: "https://github.com/namanmehta96/astrazeneca-early-action",
    accent: true,
    problem: "TODO: Naman to write",
    approach: "TODO: Naman to write",
    outcome: "TODO: Naman to write",
    learnings: ["TODO: Naman to write", "TODO: Naman to write"],
  },
  {
    type: "case-study",
    slug: "orange-esg-platform",
    title: "Orange ESG Platform",
    oneLiner:
      "ESG sales intelligence platform built for Orange Business — EDHEC MBA Sustainable Impact Challenge 2025/26.",
    tech: ["HTML", "ESG", "B2B"],
    repo: "https://github.com/namanmehta96/orange-esg-platform",
    problem: "TODO: Naman to write",
    approach: "TODO: Naman to write",
    outcome: "TODO: Naman to write",
    learnings: ["TODO: Naman to write", "TODO: Naman to write"],
  },
  {
    type: "case-study",
    slug: "menty-b",
    title: "Menty B",
    oneLiner:
      "A calm, judgment-free companion for anxiety, stress, and emotional overwhelm.",
    tech: ["HTML", "Conversational UX", "Wellbeing"],
    repo: "https://github.com/namanmehta96/menty-b",
    problem: "TODO: Naman to write",
    approach: "TODO: Naman to write",
    outcome: "TODO: Naman to write",
    learnings: ["TODO: Naman to write", "TODO: Naman to write"],
  },
  {
    type: "case-study",
    slug: "ai-ethics",
    title: "AI Ethics",
    oneLiner: "An interactive exploration of AI accountability and liability.",
    tech: ["JavaScript", "AI policy", "Interactive"],
    repo: "https://github.com/namanmehta96/ai-ethics",
    problem: "TODO: Naman to write",
    approach: "TODO: Naman to write",
    outcome: "TODO: Naman to write",
    learnings: ["TODO: Naman to write", "TODO: Naman to write"],
  },
  {
    type: "note",
    title: "Amadeus — AI & Travel Distribution Strategy",
    body: "Strategic consulting study for Amadeus on the implications of AI for travel distribution, delivered through the EDHEC Global MBA (May–July 2026). Team of five under faculty supervision. Full deliverables and findings are proprietary to Amadeus under NDA.",
    noLink: true,
  },
];

export const caseStudies = projects.filter(
  (p): p is CaseStudy => p.type === "case-study",
);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((p) => p.slug === slug);
}
