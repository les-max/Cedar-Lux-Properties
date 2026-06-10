import type { VercelRequest, VercelResponse } from '@vercel/node';
import { admin, requireAdmin } from '../../server/admin.js';

// Issues a short-lived signed upload URL for the images bucket. The browser
// uploads the file directly to that URL (so large photos never pass through the
// function), but only the server holds the service key that can authorize it.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAdmin(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { folder, ext } = req.body || {};
    const safeFolder = String(folder || 'misc').replace(/[^a-z0-9_-]/gi, '') || 'misc';
    const safeExt = (String(ext || 'jpg').replace(/[^a-z0-9]/gi, '').slice(0, 5)) || 'jpg';
    const path = `${safeFolder}/${Date.now()}.${safeExt}`;

    const sb = admin();
    const { data, error } = await sb.storage.from('images').createSignedUploadUrl(path);
    if (error || !data) throw error || new Error('Failed to create signed upload URL');

    const publicUrl = sb.storage.from('images').getPublicUrl(path).data.publicUrl;
    return res.status(200).json({ path, token: data.token, publicUrl });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || 'Server error' });
  }
}
