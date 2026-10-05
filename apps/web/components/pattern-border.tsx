import React from 'react';
import { cn } from '@/lib/utils';

export function PatternBorder({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-neutral-200/80 p-2 dark:border-neutral-800',
        className,
      )}
    >
      <div className="relative z-10 h-full w-full">{children}</div>

      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 h-full w-full bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[6px_6px]" />
        <div className="absolute inset-0 h-full w-full bg-[repeating-linear-gradient(-315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[6px_6px]" />
      </div>
    </div>
  );
}
