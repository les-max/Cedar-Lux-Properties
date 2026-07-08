import { NextResponse } from 'next/server';
import { adminClient, requireAdmin } from '@/lib/admin-server';

// Site settings upsert (single row, id = 1). Service-role, password-gated.
export async function POST(req: Request) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  const body = await req.json();
  const { error } = await adminClient().from('settings').upsert({ id: 1, data: body });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
