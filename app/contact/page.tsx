import type { Metadata } from 'next';
import { Phone, Mail, MapPin } from 'lucide-react';
import { getSettings } from '@/lib/site-data';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: { absolute: 'Contact Cedar Lux Properties | Cedar Creek Lake Custom Homes' },
  description:
    'Start the conversation about your custom lakefront home on Cedar Creek Lake. Reach Cedar Lux Properties by phone, email, or the inquiry form.',
  alternates: { canonical: '/contact' },
};

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <main className="flex-1 pt-40 pb-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <h1 className="text-6xl font-medium serif italic mb-8">Let&apos;s Build Your Legacy.</h1>
            <p className="text-neutral-500 text-xl leading-relaxed mb-12 max-w-lg">
              Every masterpiece starts with a conversation. We invite you to share your vision with us, and together we will create something truly extraordinary on the shores of Cedar Creek Lake.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-luxury-gold shadow-sm border border-neutral-100">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Direct Line</p>
                  <p className="text-xl font-bold text-lake">{settings.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-luxury-gold shadow-sm border border-neutral-100">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Inquiries</p>
                  <p className="text-xl font-bold text-lake">{settings.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-luxury-gold shadow-sm border border-neutral-100">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Main Office</p>
                  <p className="text-xl font-bold text-lake">{settings.address}</p>
                </div>
              </div>
            </div>
          </div>

          <ContactForm
            webhookUrl={settings.webhookUrl}
            companyName={settings.companyName}
            highlevelToken={settings.highlevelToken}
            highlevelLocationId={settings.highlevelLocationId}
            highlevelMessageFieldKey={settings.highlevelMessageFieldKey}
            highlevelPipelineId={settings.highlevelPipelineId}
            highlevelPipelineStageId={settings.highlevelPipelineStageId}
            notificationEmail={settings.notificationEmail}
          />
        </div>
      </div>
    </main>
  );
}
