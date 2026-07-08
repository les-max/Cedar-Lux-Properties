import type { Metadata } from 'next';
import { getProperties, getSettings } from '@/lib/site-data';
import { AdminClient } from '@/components/AdminClient';

export const metadata: Metadata = {
  title: 'CMS',
  robots: { index: false, follow: false },
};

// Admin should always reflect current data, not a cached snapshot.
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const [properties, settings] = await Promise.all([getProperties(), getSettings()]);
  return <AdminClient initialProperties={properties} initialSettings={settings} />;
}
