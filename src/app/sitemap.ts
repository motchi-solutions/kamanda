import type { MetadataRoute } from "next";

import { getBaseUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  return [
    {
      url: `${baseUrl}/`,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/ae`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sa`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}