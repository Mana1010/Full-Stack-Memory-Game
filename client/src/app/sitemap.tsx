import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = "https://full-stack-memory-game.vercel.app";
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
    {
      url: `${BASE_URL}/auth/login`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/auth/signup`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/leaderboard`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/:id`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
    },
  ];
}
