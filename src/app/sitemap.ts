import type { MetadataRoute } from "next";
import { caseStudies, engagementNote } from "@/data/projects";

const baseUrl = "https://namanmehta.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl },
    { url: `${baseUrl}/about` },
    ...caseStudies.map((study) => ({
      url: `${baseUrl}/work/${study.slug}`,
    })),
    { url: `${baseUrl}/work/${engagementNote.slug}` },
  ];
}
