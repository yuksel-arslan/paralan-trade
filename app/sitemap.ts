import type { MetadataRoute } from "next";

const SITE_URL = "https://www.paralan.trade";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/privacy", "/terms", "/disclaimer"];
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "hourly" : "monthly",
    priority: path === "" ? 1 : 0.5,
  }));
}
