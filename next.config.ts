import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // During the Vite→Next migration the legacy Vite files (App.tsx, index.tsx,
  // services/*, api/*) still live in the tree and use `import.meta.env`, which
  // Next's type-checker rejects. They are not reachable from the app/ router so
  // they never ship. Re-enable both checks in Task 12 once legacy files are removed.
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: {
    // Broad during migration; tighten to the exact Supabase storage host + known
    // image CDNs in Task 11 before cutover.
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  async redirects() {
    return [
      // Old SPA route still indexed by Google; send its equity to the homepage.
      { source: '/home', destination: '/', permanent: true },
      // Bare /properties has no page; listings live at /collection.
      { source: '/properties', destination: '/collection', permanent: true },
    ];
  },
};

export default nextConfig;
