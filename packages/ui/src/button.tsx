import React from 'react';
import { cn } from './lib/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'inverse';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'rounded' | 'md' | 'lg' | 'pill';
  shadow?: 'default' | 'button' | 'control' | 'card' | 'none';
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  appName?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  shape = 'rounded',
  shadow = 'default',
  children,
  className,
  icon,
  appName,
  onClick,
  ...props
}: ButtonProps) {
  // Clerk design system: clean, high-contrast, technical precision, 150ms cubic-bezier(0.4, 0, 0.2, 1)
  const baseStyles =
    'inline-flex items-center justify-center font-medium select-none cursor-pointer ' +
    'transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] ' +
    'active:scale-[0.985] ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ' +
    'disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100';

  const shapeStyles = {
    rounded: 'rounded-lg',
    md: 'rounded-md',
    lg: 'rounded-lg',
    pill: 'rounded-pill',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-3 py-2 gap-1.5 min-h-[36px]',
    md: 'text-xs px-4 py-2.5 gap-2 min-h-[48px]',
    lg: 'text-sm px-5 py-3 gap-2.5 min-h-[48px]',
  };

  const shadowStyles = {
    default: '',
    button: 'shadow-button',
    control: 'shadow-control',
    card: 'shadow-card',
    none: 'shadow-none',
  };

  const variantStyles = {
    primary:
      'bg-primary text-on-primary hover:bg-primary-hover active:bg-[#000000] ' +
      'shadow-card border border-transparent font-medium',
    secondary:
      'bg-surface-1 text-ink border border-border ' +
      'shadow-button hover:bg-surface-2 hover:border-border-strong active:bg-surface-3',
    ghost: 'text-ink-subtle hover:text-ink hover:bg-surface-2 active:bg-surface-3',
    outline:
      'border border-border text-ink hover:border-border-strong hover:bg-surface-2 active:bg-surface-3',
    danger:
      'bg-surface-1 text-danger border border-danger/30 hover:bg-danger/10 hover:border-danger/50 shadow-card',
    inverse: 'bg-ink text-on-primary hover:opacity-90 shadow-card font-medium',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (appName) {
      alert(`Hello from your ${appName} app!`);
    }
    onClick?.(e);
  };

  return (
    <button
      className={cn(
        baseStyles,
        shapeStyles[shape],
        sizeStyles[size],
        variantStyles[variant],
        shadowStyles[shadow],
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
