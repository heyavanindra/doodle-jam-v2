import React from 'react';
import { cn } from './lib/cn';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  error?: string;
  icon?: React.ReactNode;
  inputSize?: 'sm' | 'md';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, icon, inputSize = 'md', type = 'text', ...props }, ref) => {
    const sizeStyles = {
      sm: 'min-h-[36px] px-3 py-2 text-xs',
      md: 'min-h-[48px] px-4 py-3 text-xs',
    };

    return (
      <div className="w-full">
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-text-muted">
              {icon}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            className={cn(
              'flex w-full rounded-md border bg-surface-1 text-text-primary placeholder:text-text-muted transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] file:border-0 file:bg-transparent file:text-xs file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
              sizeStyles[inputSize],
              icon && (inputSize === 'sm' ? 'pl-8' : 'pl-9'),
              error
                ? 'border-danger focus-visible:ring-danger'
                : 'border-border hover:border-border-strong',
              className,
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-[11px] text-danger">{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
