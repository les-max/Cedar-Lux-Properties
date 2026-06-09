import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Service-role Supabase client. Lives only on the server — the service key is
// read from a non-VITE env var so it is NEVER bundled into the browser.
export const admin = () =>
  createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_KEY as string,
    { auth: { persistSession: false } }
  );

// Gates an admin endpoint behind the shared admin password.
// Returns true if authorized; otherwise writes the error response and returns false.
export function requireAdmin(req: VercelRequest, res: VercelResponse): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  const provided = req.headers['x-admin-password'];
  if (!expected) {
    res.status(500).json({ error: 'ADMIN_PASSWORD not configured on the server' });
    return false;
  }
  if (typeof provided === 'string' && provided === expected) return true;
  res.status(401).json({ error: 'Unauthorized' });
  return false;
}
