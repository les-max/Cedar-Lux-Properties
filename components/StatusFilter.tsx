'use client';

import { useRouter, usePathname } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export function StatusFilter({ statuses, value }: { statuses: string[]; value: string }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="relative">
      <select
        className="appearance-none bg-white border border-neutral-200 px-8 py-3 rounded-full font-bold text-sm outline-none cursor-pointer pr-12"
        value={value}
        onChange={(e) => {
          const s = e.target.value;
          router.push(s === 'All' ? pathname : `${pathname}?status=${encodeURIComponent(s)}`);
        }}
      >
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <ChevronLeft className="-rotate-90 absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" size={16} />
    </div>
  );
}
