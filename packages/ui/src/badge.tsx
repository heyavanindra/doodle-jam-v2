import React from 'react';
import { cn } from './lib/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'default' | 'neutral' | 'mono' | 'success' | 'warning' | 'info';
  size?: 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
  pulse?: boolean;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
  icon,
  pulse = false,
  ...props
}: BadgeProps) {
  const baseStyles =
    'inline-flex items-center font-medium tracking-tight border transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] select-none rounded-sm';

  const sizeStyles = {
    sm: 'text-[10px] px-1.5 py-0.5 gap-1',
    md: 'text-[11px] px-2 py-0.5 gap-1.5',
  };

  const variantStyles = {
    default: 'bg-surface-2 text-text-primary border-border',
    neutral: 'bg-surface-1 text-text-tertiary border-border',
    mono: 'bg-surface-2 text-text-primary border-border font-mono text-[11px]',
    success: 'bg-surface-1 text-success border-success/30',
    warning: 'bg-surface-1 text-warning border-warning/30',
    info: 'bg-surface-1 text-primary border-border',
  };

  return (
    <span
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
        </span>
      )}
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
