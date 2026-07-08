import { NextResponse } from 'next/server';
import { adminClient, requireAdmin } from '@/lib/admin-server';

// Property writes (insert / upsert / delete). Service-role, password-gated.
export async function POST(req: Request) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  const body = await req.json();
  const { error } = await adminClient().from('properties').insert(body);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function PUT(req: Request) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  const body = await req.json();
  // Strip created_at so upsert never rewrites the original timestamp.
  const { created_at, ...data } = body || {};
  void created_at;
  const { error } = await adminClient().from('properties').upsert(data, { onConflict: 'id' });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  const id = new URL(req.url).searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const { error } = await adminClient().from('properties').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
