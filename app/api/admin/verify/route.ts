import { NextResponse } from 'next/server';

// Validates the admin password server-side at login.
export async function POST(req: Request) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json({ error: 'ADMIN_PASSWORD not configured on the server' }, { status: 500 });
  }
  const { password } = await req.json().catch(() => ({}));
  if (typeof password === 'string' && password === expected) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
}
