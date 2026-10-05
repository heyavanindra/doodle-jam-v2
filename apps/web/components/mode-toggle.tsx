'use client';
import { cn } from '@/lib/utils';
import { MoonIcon, SunIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ModeToggle = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          'flex h-5 w-12 items-center rounded-[50px] bg-zinc-100 px-1.25 py-3 shadow-inner dark:bg-zinc-700',
          className,
        )}
      >
        <div className="size-4" />
      </div>
    );
  }

  const isDark = resolvedTheme === 'dark';

  const toggleHandler = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <div
      onClick={toggleHandler}
      className={cn(
        'flex h-5 w-12 items-center rounded-[50px] bg-zinc-100 px-1.25 py-3 shadow-inner hover:cursor-pointer dark:bg-zinc-700',
        isDark ? 'justify-end' : 'justify-start',
        className,
      )}
    >
      <motion.div
        className="flex size-fit items-center justify-center rounded-full"
        layout
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 30,
        }}
      >
        <motion.div whileTap={{ rotate: 180 }}>
          {isDark ? (
            <MoonIcon className="size-4 text-slate-200" />
          ) : (
            <SunIcon className="size-4 text-neutral-900" />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ModeToggle;
