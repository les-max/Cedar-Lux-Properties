import type { Property } from '@/types';

/** Lowercase, strip to alphanumerics, collapse to dashes. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/['".]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Canonical URL slug for a property. Uses the title; appends the last 4 chars
 * of the id to guarantee uniqueness when two properties share a title.
 */
export function propertySlug(p: Property): string {
  const base = slugify(p.title || 'property');
  const suffix = p.id ? p.id.slice(-4) : '';
  return suffix ? `${base}-${suffix}` : base;
}

export function findBySlug(properties: Property[], slug: string): Property | undefined {
  return properties.find((p) => propertySlug(p) === slug);
}
