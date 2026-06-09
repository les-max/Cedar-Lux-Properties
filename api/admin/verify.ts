import type { VercelRequest, VercelResponse } from '@vercel/node';

// Validates the admin password server-side at login. The password is no longer
// hardcoded in the client bundle.
export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return res.status(500).json({ error: 'ADMIN_PASSWORD not configured on the server' });

  const { password } = req.body || {};
  if (typeof password === 'string' && password === expected) {
    return res.status(200).json({ ok: true });
  }
  return res.status(401).json({ error: 'Invalid password' });
}
