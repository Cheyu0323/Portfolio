import type { MetadataRoute } from "next";
import workList from "@/public/work_list.json";
const BASE_URL = "https://cheyu-portfolio.vercel.app";
export default function sitemap(): MetadataRoute.Sitemap {
    const staticPages: MetadataRoute.Sitemap = [
        { url: BASE_URL, changeFrequency: "monthly", priority: 1 },
        { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/works`, changeFrequency: "monthly", priority: 0.9 },
    ];
    const workPages: MetadataRoute.Sitemap = workList.map((work) => ({
        url: `${BASE_URL}/works/${work.slug}`,
        changeFrequency: "monthly",
        priority: 0.8,
    }));
    return [...staticPages, ...workPages];
}
