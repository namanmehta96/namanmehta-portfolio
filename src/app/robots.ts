import type { MetadataRoute } from "next";

// TODO: set real domain
const baseUrl = "https://namanmehta-portfolio.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
