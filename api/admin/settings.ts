import type { VercelRequest, VercelResponse } from '@vercel/node';
import { admin, requireAdmin } from '../../server/admin';

// Site settings upsert (single row, id = 1). Service-role write, password-gated.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAdmin(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const sb = admin();
    const { error } = await sb.from('settings').upsert({ id: 1, data: req.body });
    if (error) throw error;
    return res.status(200).json({ ok: true });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || 'Server error' });
  }
}
