import { NextResponse } from 'next/server';

const HL_BASE = 'https://services.leadconnectorhq.com';
const HL_VERSION = '2021-07-28';

// Creates/updates a HighLevel (GHL) contact from the website contact form,
// attaches the message + TCPA consent as notes, and opens a pipeline opportunity.
export async function POST(req: Request) {
  const {
    name, email, phone, message, companyName, consent, consentText,
    highlevelToken, highlevelLocationId,
    highlevelPipelineId, highlevelPipelineStageId,
  } = await req.json();

  if (!highlevelToken || !highlevelLocationId) {
    return NextResponse.json({ error: 'Missing HighLevel credentials' }, { status: 400 });
  }

  const headers = {
    Authorization: `Bearer ${highlevelToken}`,
    'Content-Type': 'application/json',
    Version: HL_VERSION,
  };

  const nameParts = (name || '').trim().split(/\s+/);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const tags = ['web_inquiry'];
  if (consent) tags.push('sms_consent');

  // 1. Create (or upsert) the contact
  const contactRes = await fetch(`${HL_BASE}/contacts/upsert`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      locationId: highlevelLocationId,
      firstName,
      lastName,
      name,
      email,
      phone,
      source: companyName,
      tags,
      customFields: message ? [{ key: 'web_inquiry_message', field_value: message }] : [],
    }),
  });

  if (!contactRes.ok) {
    const errorBody = await contactRes.text();
    return NextResponse.json(
      { error: 'HighLevel contact creation failed', detail: errorBody },
      { status: contactRes.status }
    );
  }

  const contactData = await contactRes.json();
  const contactId = contactData?.contact?.id;

  // 2. Attach the message as a note
  if (message && contactId) {
    await fetch(`${HL_BASE}/contacts/${contactId}/notes`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ body: message }),
    }).catch(() => {});
  }

  // 3. Record TCPA consent as a timestamped note
  if (consent && contactId) {
    const stamp = new Date().toISOString();
    const consentNote = `Consent captured ${stamp} via website contact form: "${consentText || 'Agreed to be contacted by phone, text message, and email.'}"`;
    await fetch(`${HL_BASE}/contacts/${contactId}/notes`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ body: consentNote }),
    }).catch(() => {});
  }

  // 4. Create opportunity in pipeline (best-effort — does not block form success)
  if (contactId && highlevelPipelineId) {
    let stageId = highlevelPipelineStageId;
    if (!stageId) {
      const pipelinesRes = await fetch(
        `${HL_BASE}/opportunities/pipelines?locationId=${highlevelLocationId}`,
        { headers }
      ).catch(() => null);
      if (pipelinesRes?.ok) {
        const pipelinesData = await pipelinesRes.json().catch(() => null);
        const pipeline = pipelinesData?.pipelines?.find((p: { id: string }) => p.id === highlevelPipelineId);
        stageId = pipeline?.stages?.find((s: { name: string }) => s.name === 'New Inquiry')?.id;
      }
    }
    if (stageId) {
      await fetch(`${HL_BASE}/opportunities/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          pipelineId: highlevelPipelineId,
          pipelineStageId: stageId,
          locationId: highlevelLocationId,
          contactId,
          name: `${name} — Web Inquiry`,
          status: 'open',
        }),
      }).catch(() => {});
    }
  }

  return NextResponse.json({ success: true });
}
