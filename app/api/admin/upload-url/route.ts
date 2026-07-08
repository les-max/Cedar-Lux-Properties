import { NextResponse } from 'next/server';
import { adminClient, requireAdmin } from '@/lib/admin-server';

// Issues a short-lived signed upload URL for the images bucket so the browser
// uploads large photos directly to storage without passing through the function.
export async function POST(req: Request) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  const { folder, ext } = await req.json().catch(() => ({}));
  const safeFolder = String(folder || 'misc').replace(/[^a-z0-9_-]/gi, '') || 'misc';
  const safeExt = String(ext || 'jpg').replace(/[^a-z0-9]/gi, '').slice(0, 5) || 'jpg';
  const path = `${safeFolder}/${Date.now()}.${safeExt}`;

  const sb = adminClient();
  const { data, error } = await sb.storage.from('images').createSignedUploadUrl(path);
  if (error || !data) {
    return NextResponse.json({ error: error?.message || 'Failed to create signed upload URL' }, { status: 500 });
  }
  const publicUrl = sb.storage.from('images').getPublicUrl(path).data.publicUrl;
  return NextResponse.json({ path, token: data.token, publicUrl });
}
