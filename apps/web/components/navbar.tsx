'use client';
import { authClient } from '@/lib/auth-client';
import { Button } from '@repo/ui/components/button';
import { LogInIcon, LogOutIcon, UserIcon } from 'lucide-react';
import { Link, useTransitionRouter } from 'next-view-transitions';
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
    <div className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:px-6">
      <motion.div
        className="pointer-events-auto flex w-full items-center justify-between rounded-xl border border-neutral-200/80 bg-neutral-50/75 px-3 py-2 shadow-control backdrop-blur-md sm:px-4 sm:py-2.5 dark:border-neutral-800 dark:bg-neutral-800/60"
        animate={{
          maxWidth: isVisible ? '1028px' : '1280px',
          borderRadius: isVisible ? '999px' : '16px',
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
        <div className="flex w-full items-center justify-between gap-x-2">
          <Link
            href="/"
            className="flex shrink-0 items-center transition-opacity hover:opacity-85"
            aria-label="DoodleJam Home"
          >
            <Image
              src="/doodlejam-lockup-black.svg"
              alt="DoodleJam"
              width={112}
              height={27}
              priority
              className="h-6 w-auto shrink-0 sm:h-7 dark:hidden"
            />
            <Image
              src="/doodlejam-lockup-white.svg"
              alt="DoodleJam"
              width={112}
              height={27}
              priority
              className="hidden h-6 w-auto shrink-0 sm:h-7 dark:block"
            />
          </Link>

          <div className="flex shrink-0 items-center gap-x-1.5 sm:gap-x-2">
            <ModeToggle />
            {session ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push('/dashboard')}
                  className="cursor-pointer bg-white/70 shadow-xs hover:bg-white dark:bg-neutral-900/60 dark:hover:bg-neutral-800"
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Sign Out"
                  onClick={() => authClient.signOut().then(() => router.push('/'))}
                  className="cursor-pointer hover:bg-white hover:shadow-control dark:hover:bg-neutral-800"
                >
                  <LogOutIcon className="size-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Sign in"
                  onClick={() => router.push('/login')}
                  className="cursor-pointer hover:bg-white hover:shadow-control dark:hover:bg-neutral-800"
                >
                  <LogInIcon className="size-3.5" />
                  <span className="hidden sm:inline">Sign in</span>
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  aria-label="Sign Up"
                  onClick={() => router.push('/signup')}
                  className="cursor-pointer"
                >
                  <UserIcon className="size-3.5" />
                  <span>Sign Up</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
