import type { MetadataRoute } from "next";

import { content } from "@/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${content.pt.seo.url}/sitemap.xml`,
  };
}
