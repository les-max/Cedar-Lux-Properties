import type { MetadataRoute } from 'next';
import { getProperties } from '@/lib/site-data';
import { propertySlug } from '@/lib/slug';

const BASE = 'https://cedarluxproperties.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/collection`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/emerald-bay`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/cedar-creek-lake`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact`, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const properties = await getProperties();
  const propertyRoutes: MetadataRoute.Sitemap = properties.map((p) => ({
    url: `${BASE}/properties/${propertySlug(p)}`,
    lastModified: p.created_at ? new Date(p.created_at) : undefined,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...propertyRoutes];
}
