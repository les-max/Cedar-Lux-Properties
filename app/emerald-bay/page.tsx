import type { Metadata } from 'next';
import { getSettings } from '@/lib/site-data';
import { EmeraldBayPage } from '@/components/EmeraldBayPage';
import { JsonLd } from '@/components/JsonLd';
import { businessSchema, webPageSchema } from '@/lib/schema';

export const revalidate = 300;

const DESCRIPTION =
  'Custom luxury homes in Emerald Bay at Cedar Creek Lake, Texas. Cedar Lux Properties builds bespoke waterfront residences in one of Cedar Creek Lake’s most prestigious communities.';

export const metadata: Metadata = {
  title: { absolute: 'Emerald Bay Custom Homes | Cedar Lux Properties | Cedar Creek Lake' },
  description: DESCRIPTION,
  alternates: { canonical: '/emerald-bay' },
};

export default async function EmeraldBayRoute() {
  const settings = await getSettings();
  return (
    <>
      <JsonLd
        data={[
          businessSchema(settings),
          webPageSchema('Emerald Bay Custom Homes — Cedar Creek Lake', '/emerald-bay', DESCRIPTION, 'Emerald Bay'),
        ]}
      />
      <EmeraldBayPage
        phone={settings.phone}
        companyName={settings.companyName}
        heroImage={settings.emeraldBayHeroImage || settings.lifestyleHeroImage}
      />
    </>
  );
}
