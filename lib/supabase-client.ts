import { createClient } from '@supabase/supabase-js';

// Browser client, used only in the admin CMS for direct-to-storage image
// uploads via a server-issued signed token. Requires NEXT_PUBLIC_* env vars
// (set these in Vercel at cutover — see the migration plan Task 12).
const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const key =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

export const supabaseBrowser = createClient(url, key);
