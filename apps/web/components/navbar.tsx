'use client';
import { authClient } from '@/lib/auth-client';
import { Button } from '@repo/ui/components/button';
import { LogInIcon, LogOutIcon, UserIcon, Icon } from 'lucide-react';
import { useTransitionRouter } from 'next-view-transitions';
import Image from 'next/image';
import { toast } from 'sonner';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useState } from 'react';
import ModeToggle from './mode-toggle';

export function Navbar() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const router = useTransitionRouter();
  const { data: session, error } = authClient.useSession();
  if (error) {
    toast.error(error.message);
  }
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (value) => {
    if (value > 20) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  return (
    <div className="fixed top-3 z-50 w-full bg-transparent px-5">
      <motion.div
        className="mx-auto flex max-w-7xl items-center justify-between rounded-xl border border-neutral-200/80 bg-neutral-50/75 px-4 py-2.5 shadow-control backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-800/60"
        animate={{
          width: isVisible ? '1028px' : '1280px',
          borderRadius: isVisible ? '999px' : '12px',
          backdropFilter: isVisible ? 'blur(16px)' : 'blur(10px)',
        }}
        style={{
          WebkitBackdropFilter: isVisible ? 'blur(16px)' : 'blur(10px)',
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 50,
        }}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-x-2.5">
            <div className="p-1">
              <Image src="/logo.svg" alt="Logo" width={22} height={22} className="shrink-0" />
            </div>
            <span className="font-display text-sm font-bold tracking-tight text-neutral-800 dark:text-neutral-300">
              DoodleJam
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            <ModeToggle />
            {session ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => authClient.signOut().then(() => router.push('/'))}
                className="cursor-pointer hover:bg-white hover:shadow-control dark:hover:bg-neutral-800"
              >
                <LogOutIcon />
                Sign Out
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/login')}
                className="cursor-pointer hover:bg-white hover:shadow-control dark:hover:bg-neutral-800"
              >
                <LogInIcon />
                Sign in
              </Button>
            )}
            <Button
              variant="default"
              size="sm"
              onClick={() => router.push('/signup')}
              className="cursor-pointer"
            >
              <UserIcon />
              Sign Up
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
