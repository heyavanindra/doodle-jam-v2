import React from 'react';
import { cn } from './lib/cn';

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: 'inline' | 'block';
  className?: string;
}

export function Code({
  children,
  variant = 'inline',
  className,
  ...props
}: CodeProps) {
  if (variant === 'block') {
    return (
      <pre
        className={cn(
          'rounded-lg border border-border bg-surface-1 p-3.5 font-mono text-xs text-text-secondary leading-[1.33] overflow-x-auto selection:bg-surface-3',
          className
        )}
      >
        <code {...props}>{children}</code>
      </pre>
    );
  }

  return (
    <code
      className={cn(
        'rounded-sm border border-border-subtle bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] text-text-primary leading-[1.33]',
        className
      )}
      {...props}
    >
      {children}
    </code>
  );
}
