// Project content. Case studies get full pages; notes render as short quiet entries.

export interface CaseStudy {
  type: "case-study";
  slug: string;
  title: string;
  oneLiner: string;
  tech: string[];
  repo: string;
  live: string;
  /** Featured project — gets the amber accent treatment. */
  accent?: boolean;
  /** Award or distinction, rendered on the case-study page when present. */
  recognition?: string;
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
    tech: ["React", "Three.js", "AI strategy", "Healthcare"],
    repo: "https://github.com/namanmehta96/astrazeneca-early-action",
    live: "https://namanmehta96.github.io/astrazeneca-early-action",
    accent: true,
    problem:
      "Lung cancer is the world's number one cancer killer, and 84% of cases are caught too late, when five-year survival falls below 20%. The tools to detect it early already exist. What is missing is the system that connects screening, diagnosis, and treatment into one journey. Fewer than 10% of eligible adults ever get screened. The EDHEC Industry Acceleration Project asked how AI could move a company like AstraZeneca from optimizing processes to transforming them. We picked the hardest version of that question.",
    approach:
      "We built the strategy as an interactive product rather than a slide deck: seven chapters covering the problem, AstraZeneca's position, a Blue Ocean analysis showing that every AI layer in oncology is crowded except patient journey coordination, and a proposed architecture of four AI layers where a human always signs off on clinical decisions. The plan: prove the model in a UK pilot with the NHS, then scale through AZ's global footprint. Instead of fixed forecasts, every number sits on a visible assumption stack. We also included a chapter called Five Honest Gaps, naming our strategy's weaknesses before the jury could. I co-built the entire site with one teammate, from the React and Three.js front end to the content architecture.",
    outcome:
      "Presented at the final defense in April 2026 to faculty and industry reviewers, with the interactive site as the centrepiece of the pitch.",
    learnings: [
      "Naming your own gaps first turns the hardest Q&A questions into prepared ground.",
      "Presenting numbers as adjustable assumptions builds more trust than confident forecasts.",
      "Shipping strategy as an interactive product changes how seriously people engage with it.",
    ],
  },
  {
    type: "case-study",
    slug: "orange-esg-platform",
    title: "Orange ESG Platform",
    oneLiner:
      "ESG sales intelligence platform built for Orange Business, EDHEC MBA Sustainable Impact Challenge 2025/26.",
    tech: ["React", "Generative AI", "B2B sales", "ESG"],
    repo: "https://github.com/namanmehta96/orange-esg-platform",
    live: "https://namanmehta96.github.io/orange-esg-platform",
    recognition:
      "Best Pitch, EDHEC Sustainable Impact Challenge 2026 (15 teams)",
    problem:
      "Orange Business sales teams engage enterprise customers on sustainability, but understanding each customer's ESG posture meant manually digging through annual reports, sustainability disclosures, and press releases. Slow, inconsistent, and impossible to scale, which capped how targeted those conversations could be. The EDHEC Sustainable Impact Challenge brief from Orange asked: can Generative AI automate customer sustainability profiling from public information?",
    approach:
      "I built a working sales intelligence tool, not a mockup. An account manager selects a company and the platform generates a full engagement brief: an executive summary of the customer's ESG position, meeting intelligence, key contacts, and a solution catalog that bridges the customer's sustainability challenges to specific Orange Business offerings, with CRM export at the end. Built and deployed in three months.",
    outcome:
      "Won Best Pitch out of 15 teams at the EDHEC Sustainable Impact Challenge 2026, presented to Orange Business.",
    learnings: [
      "The value of GenAI in sales is not the text it writes, it is the hours of research it collapses into minutes.",
      "Tools get adopted when they end in an action, which is why the CRM export mattered as much as the AI profile.",
    ],
  },
  {
    type: "case-study",
    slug: "menty-b",
    title: "Menty B",
    oneLiner:
      "A calm, judgment-free companion for anxiety, stress, and emotional overwhelm.",
    tech: ["Web app", "Custom GPT", "Conversational design"],
    repo: "https://github.com/namanmehta96/menty-b",
    live: "https://namanmehta96.github.io/menty-b",
    problem:
      "When anxiety or panic hits, most people do not need a lecture or a login wall. They need something calm, immediate, and judgment-free. Most wellbeing apps bury that moment of need under onboarding and subscriptions.",
    approach:
      "I designed and built Menty B as a companion that opens straight into a simple check-in and routes to what helps: guided breathing, grounding exercises, affirmations, a wind-down mode, and a clearly separated crisis help section that points to real support. Alongside the web app, I built a custom GPT agent version, designing the conversational flow end to end.",
    outcome:
      "A live, complete companion app, and my most personal project: an exercise in designing AI interactions where tone matters more than features.",
    learnings: [
      "Designing for someone mid-panic inverts normal product thinking: fewer choices, softer language, zero friction.",
      "Knowing where an AI companion must stop and hand over to human crisis support is a design decision, not an afterthought.",
    ],
  },
  {
    type: "case-study",
    slug: "ai-ethics",
    title: "AI Ethics",
    oneLiner: "An interactive exploration of AI accountability and liability.",
    tech: ["React", "AI policy", "Interactive explainer"],
    repo: "https://github.com/namanmehta96/ai-ethics",
    live: "https://namanmehta96.github.io/ai-ethics",
    problem:
      "When an AI system causes harm, who is liable? The maker, the deployer, or no one? Real cases are already testing this, courts are answering inconsistently, and most explanations of the problem are either academic papers or hot takes.",
    approach:
      "I built an interactive, case-driven explainer that walks through real incidents, including the Air Canada chatbot ruling where the deployer was held liable for AI misinformation, then maps the legal void: how the EU AI Act's risk tiers and the extended Product Liability Directive attempt to cover AI, where liability chains break down, and how frameworks like Microsoft's Responsible AI program assign accountability inside companies. It closes with my own verdict, including proposals like a legislated duty to signal uncertainty and mandatory named accountability chains.",
    outcome:
      "A live interactive resource, built solo in React, that turns a legal grey zone into something a non-lawyer can navigate in ten minutes.",
    learnings: [
      "Accountability questions become concrete the moment you follow one real case end to end.",
      "Building the explainer forced me to hold a position rather than just survey opinions, which is the difference between summarizing a debate and contributing to it.",
    ],
  },
  {
    type: "note",
    title: "Amadeus: AI & Travel Distribution Strategy",
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
