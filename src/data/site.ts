// Site-wide content. No CMS — this file is the single source of truth.

export interface SiteInfo {
  name: string;
  tagline: string;
  location: string;
  availability: string;
  email: string;
  linkedin: string;
  github: string;
  personalLine: string;
  bio: string;
}

export interface ExperienceEntry {
  title: string;
  organization: string;
  period: string;
  clients?: string[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export const site: SiteInfo = {
  name: "Naman Mehta",
  tagline: "I turn messy data into decisions.",
  location: "Nice, France",
  availability: "Available from July 2026 · Open across Europe",
  // TODO: may swap to personal address
  email: "naman.mehta@edhec.com",
  linkedin: "https://www.linkedin.com/in/naman-mehta96",
  github: "https://github.com/namanmehta96",
  personalLine:
    "Based in Nice. Archer at the range, Top 16 at the Call of Duty Mobile World Championship, soft spot for animals.",
  bio: "Almost seven years as a Database Administrator at Tata Consultancy Services, working with clients including Morgan Stanley and the Election Commission of India — where I supported reporting infrastructure tracking operational KPIs across systems serving 900M+ registered voters. At Morgan Stanley, I built Python automation pipelines that eliminated 50% of manual reporting workflows and analysed incident patterns that drove a 30% reduction in response time. Now finishing the Global MBA at EDHEC Business School, specialising in AI and Innovation (Class of 2026). Anthropic AI Fluency certified, with hands-on experience applying LLMs and agentic workflows to real problems.",
};

export const experience: ExperienceEntry[] = [
  {
    title: "Database Administrator",
    organization: "Tata Consultancy Services",
    period: "Oct 2018 – Jul 2025",
    clients: [
      "Morgan Stanley (Dec 2018 – Dec 2022)",
      "Election Commission of India (Jun 2023 – Aug 2024)",
    ],
  },
  {
    title: "Global MBA, AI & Innovation",
    organization: "EDHEC Business School, Nice",
    period: "Sep 2025 – Sep 2026",
  },
  {
    title: "BTech Information Technology",
    organization: "Manipal Institute of Technology",
    period: "2014 – 2018",
  },
];

export const skills: SkillGroup[] = [
  {
    label: "Analytics",
    items: [
      "SQL (Advanced)",
      "Python",
      "Excel",
      "Google Analytics",
      "KPI development",
      "reporting automation",
      "dashboards",
    ],
  },
  {
    label: "AI & Digital",
    items: [
      "Generative AI",
      "prompt engineering",
      "LLM applications",
      "agentic workflows",
      "AI strategy",
    ],
  },
  {
    label: "Technical",
    items: ["Oracle", "DB2", "MongoDB", "MSSQL", "Greenplum", "MySQL", "R", "Linux"],
  },
  {
    label: "Languages",
    items: ["English (C2)", "French (A2)", "Hindi (Native)"],
  },
];

export const achievements: string[] = [
  "EDHEC Global MBA Hackathon, Paris 2026 — 3rd of 8 international teams (IBM enterprise AI challenge)",
];
