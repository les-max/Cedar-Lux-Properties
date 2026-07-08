import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { adminClient, requireAdmin } from '@/lib/admin-server';

// Site settings upsert (single row, id = 1). Service-role, password-gated.
// Purges the 'settings' tag so the layout (nav/footer) and every page that
// reads settings update immediately.
export async function POST(req: Request) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  const body = await req.json();
  const { error } = await adminClient().from('settings').upsert({ id: 1, data: body });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidateTag('settings');
  return NextResponse.json({ ok: true });
}
