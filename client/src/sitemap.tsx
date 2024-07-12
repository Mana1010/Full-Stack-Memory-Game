import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = "http://localhost:3000";
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/levels`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/setting`,
      lastModified: new Date(),
    },
  ];
}
