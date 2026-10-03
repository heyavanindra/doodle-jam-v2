import React from 'react';
import { cn } from './lib/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  elevation?: 'e1' | 'e2' | 'e3' | 'e4' | 'flat';
  className?: string;
}

export function Card({ children, elevation = 'e2', className, ...props }: CardProps) {
  const elevationStyles = {
    flat: 'bg-transparent border border-border',
    e1: 'bg-surface-1 border border-border shadow-e1',
    e2: 'bg-surface-1 border border-border shadow-card',
    e3: 'bg-surface-1 border border-border shadow-elevated',
    e4: 'bg-surface-1 border border-border-strong shadow-elevated',
  };

  return (
    <div
      className={cn(
        'rounded-lg p-5 text-text-primary transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]',
        elevationStyles[elevation],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex flex-col space-y-1.5 pb-3', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'text-clerk-heading font-bold text-text-primary',
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-clerk-body text-text-tertiary', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('text-xs text-text-secondary leading-relaxed', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center pt-3 mt-1 border-t border-hairline', className)}
      {...props}
    >
      {children}
    </div>
  );
}
