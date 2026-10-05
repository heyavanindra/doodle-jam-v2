import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto my-0 max-w-7xl px-5', className)}>{children}</div>;
}
