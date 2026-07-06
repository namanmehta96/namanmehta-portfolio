import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/projects";

// TODO: set real domain
const baseUrl = "https://namanmehta-portfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl },
    { url: `${baseUrl}/about` },
    ...caseStudies.map((study) => ({
      url: `${baseUrl}/work/${study.slug}`,
    })),
  ];
}
