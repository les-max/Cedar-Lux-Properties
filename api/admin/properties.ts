import type { VercelRequest, VercelResponse } from '@vercel/node';
import { admin, requireAdmin } from '../../server/admin';

// Property writes (insert / upsert / delete). All run with the service-role key
// on the server and require the admin password header.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAdmin(req, res)) return;
  const sb = admin();

  try {
    if (req.method === 'POST') {
      const { error } = await sb.from('properties').insert(req.body);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    if (req.method === 'PUT') {
      const { created_at, ...data } = req.body || {};
      const { error } = await sb.from('properties').upsert(data, { onConflict: 'id' });
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    if (req.method === 'DELETE') {
      const id = req.query.id as string;
      if (!id) return res.status(400).json({ error: 'Missing id' });
      const { error } = await sb.from('properties').delete().eq('id', id);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || 'Server error' });
  }
}
