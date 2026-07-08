import { createClient } from '@supabase/supabase-js';

// Server-side read client. Reuses the existing Vite env var names so no new
// secrets are required for the SEO-critical data fetching. The anon key is
// read-only (RLS allows SELECT only); all writes go through /api/admin/*.
// Placeholder fallbacks keep createClient from throwing "supabaseUrl is
// required" at module load when env vars are absent (e.g. a preview build with
// no Supabase env). Queries against the placeholder simply fail into the
// try/catch in site-data, which returns bundled fallback content.
const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabaseServer = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
