import type { MetadataRoute } from "next";

import { content } from "@/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = content.pt.seo.url;

  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/services`, lastModified: new Date() },
    { url: `${base}/projects`, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
  ];
}
