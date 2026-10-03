import React from 'react';
import { cn } from './lib/cn';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}: DialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop: deep dark calm tint without heavy blur */}
      <div
        className="fixed inset-0 bg-black/70 transition-opacity animate-in fade-in duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        onClick={onClose}
      />

      {/* Modal Dialog Card: elevated shadow and 450ms base animation */}
      <div
        className={cn(
          'relative z-50 w-full max-w-lg rounded-xl border border-border-strong bg-surface-1 p-6 shadow-elevated transition-all duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)] animate-in fade-in zoom-in-95',
          className
        )}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-clerk-heading font-bold text-text-primary">{title}</h2>
            {description && (
              <p className="mt-1 text-clerk-body text-text-tertiary">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center text-text-tertiary hover:text-text-primary hover:bg-surface-2 transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer"
            aria-label="Close dialog"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}
