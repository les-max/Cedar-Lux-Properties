import type { Property, SiteSettings } from '@/types';
import { propertySlug } from '@/lib/slug';

const SITE = 'https://cedarluxproperties.com';

/** Core business identity, reused across pages. */
export function businessSchema(settings?: Partial<SiteSettings>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'Cedar Lux Properties',
    url: SITE,
    telephone: settings?.phone || '972-764-8687',
    email: settings?.email || 'info@cedarluxproperties.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mabank',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    description:
      'Custom luxury home builder on Cedar Creek Lake, Texas. Specializing in waterfront homes and spec builds at Emerald Bay and across Cedar Creek Lake.',
    areaServed: 'Cedar Creek Lake, Texas',
    knowsAbout: [
      'Custom Home Building',
      'Waterfront Homes',
      'Luxury Construction',
      'Cedar Creek Lake',
      'Emerald Bay',
    ],
  };
}

/** WebPage + breadcrumb for a community/marketing page. */
export function webPageSchema(name: string, path: string, description: string, crumbLabel: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    url: `${SITE}${path}`,
    description,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: crumbLabel },
      ],
    },
  };
}

/** Product/listing schema for an individual property. */
export function propertySchema(p: Property) {
  const availability =
    p.status === 'Sold'
      ? 'https://schema.org/SoldOut'
      : 'https://schema.org/InStock';
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.title,
    image: p.image,
    description: p.description,
    category: p.propertyType || 'Home',
    url: `${SITE}/properties/${propertySlug(p)}`,
    areaServed: 'Cedar Creek Lake, Texas',
    ...(p.price > 0 && (p.propertyType || 'Home') !== 'Floor Plan'
      ? {
          offers: {
            '@type': 'Offer',
            price: p.price,
            priceCurrency: 'USD',
            availability,
          },
        }
      : {}),
  };
}

/** ItemList enumerating property URLs for the collection page. */
export function collectionSchema(properties: Property[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: properties.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE}/properties/${propertySlug(p)}`,
      name: p.title,
    })),
  };
}
