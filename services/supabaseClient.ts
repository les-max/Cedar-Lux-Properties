import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Public, read-only client for all visitors. The anon key is safe to ship to the
// browser: row-level security allows SELECT only. All writes go through the
// password-protected /api/admin/* serverless routes, which hold the service key.
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
