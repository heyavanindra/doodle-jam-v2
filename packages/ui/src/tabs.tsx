import React from 'react';
import { cn } from './lib/cn';

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'default' | 'pill';
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, variant = 'default', className }: TabsProps) {
  const isPill = variant === 'pill';

  return (
    <div
      className={cn(
        'inline-flex items-center gap-0.5 border border-hairline bg-surface-1 p-0.5',
        isPill ? 'rounded-pill px-1 py-1' : 'rounded-lg',
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              isPill ? 'rounded-pill' : 'rounded-md',
              isActive
                ? 'bg-surface-2 text-ink shadow-e1 border border-hairline'
                : 'text-ink-subtle hover:text-ink hover:bg-surface-2/60'
            )}
          >
            {tab.icon && <span className="inline-flex shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={cn(
                  'rounded-sm px-1.5 py-0.5 text-[10px] font-mono',
                  isActive
                    ? 'bg-surface-3 text-text-secondary'
                    : 'bg-surface-2 text-text-muted'
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
