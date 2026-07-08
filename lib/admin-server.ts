import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Service-role Supabase client. Server-only: the service key is read from a
// non-public env var so it is NEVER bundled into the browser.
export const adminClient = () =>
  createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_KEY as string,
    { auth: { persistSession: false } }
  );

// Gates an admin route behind the shared admin password.
// Returns null when authorized, or an error NextResponse when not.
export function requireAdmin(req: Request): NextResponse | null {
  const expected = process.env.ADMIN_PASSWORD;
  const provided = req.headers.get('x-admin-password');
  if (!expected) {
    return NextResponse.json({ error: 'ADMIN_PASSWORD not configured on the server' }, { status: 500 });
  }
  if (provided && provided === expected) return null;
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
