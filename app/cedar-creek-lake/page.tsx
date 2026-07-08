import type { Metadata } from 'next';
import { getSettings } from '@/lib/site-data';
import { CedarCreekLakePage } from '@/components/CedarCreekLakePage';
import { JsonLd } from '@/components/JsonLd';
import { businessSchema, webPageSchema } from '@/lib/schema';

export const revalidate = 300;

const DESCRIPTION =
  'Cedar Lux Properties is a custom home builder on Cedar Creek Lake, Texas — 60 minutes from Dallas. Luxury waterfront homes, spec builds, and bespoke construction at Emerald Bay and beyond.';

export const metadata: Metadata = {
  title: { absolute: 'Cedar Creek Lake Custom Home Builder | Cedar Lux Properties' },
  description: DESCRIPTION,
  alternates: { canonical: '/cedar-creek-lake' },
};

export default async function CedarCreekLakeRoute() {
  const settings = await getSettings();
  return (
    <>
      <JsonLd
        data={[
          businessSchema(settings),
          webPageSchema('Cedar Creek Lake Custom Home Builder', '/cedar-creek-lake', DESCRIPTION, 'Cedar Creek Lake Custom Homes'),
        ]}
      />
      <CedarCreekLakePage
        phone={settings.phone}
        companyName={settings.companyName}
        heroImage={settings.cedarCreekLakeHeroImage || settings.heroImage}
      />
    </>
  );
}
