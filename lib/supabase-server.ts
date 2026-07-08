import { createClient } from '@supabase/supabase-js';

// Server-side read client. Reuses the existing Vite env var names so no new
// secrets are required for the SEO-critical data fetching. The anon key is
// read-only (RLS allows SELECT only); all writes go through /api/admin/*.
const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY =
  process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabaseServer = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
