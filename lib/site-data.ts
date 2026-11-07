import { unstable_cache } from 'next/cache';
import { supabaseServer } from '@/lib/supabase-server';
import { DEFAULT_SETTINGS, INITIAL_PROPERTIES } from '@/constants';
import type { Property, SiteSettings } from '@/types';

const REVALIDATE_SECONDS = 300;

/**
 * All properties, newest first. Falls back to the bundled INITIAL_PROPERTIES on
 * error so prerendered pages always have content (mirrors the current app).
 */
export const getProperties = unstable_cache(
  async (): Promise<Property[]> => {
    try {
      const { data, error } = await supabaseServer
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      if (data && data.length > 0) return data as Property[];
    } catch (e) {
      console.error('getProperties failed, using fallback:', e);
    }
    return INITIAL_PROPERTIES;
  },
  ['cedar-lux-properties'],
  { revalidate: REVALIDATE_SECONDS, tags: ['properties'] }
);

const fetchSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    const { data, error } = await supabaseServer
      .from('settings')
      .select('data')
      .eq('id', 1)
      .maybeSingle();
    if (error) throw error;
    if (!data?.data) return DEFAULT_SETTINGS;
    // The CRM token lives in the HIGHLEVEL_TOKEN env var. Drop any copy still
    // stored in this row so it can never reach a page or the browser.
    const { highlevelToken: _token, ...safe } = data.data as Partial<SiteSettings> & {
      highlevelToken?: string;
    };
    return { ...DEFAULT_SETTINGS, ...safe };
  },
  ['cedar-lux-settings'],
  { revalidate: REVALIDATE_SECONDS, tags: ['settings'] }
);

/**
 * Site settings (single row, id=1) merged over DEFAULT_SETTINGS. Falls back to
 * DEFAULT_SETTINGS on error, outside the cache so a brief Supabase failure is
 * not stored for the whole revalidate window (the contact form depends on this).
 */
export async function getSettings(): Promise<SiteSettings> {
  try {
    return await fetchSettings();
  } catch (e) {
    console.error('getSettings failed, using defaults:', e);
    return DEFAULT_SETTINGS;
  }
}
