'use client';

import ModeToggle from '@/components/mode-toggle';
import { authClient } from '@/lib/auth-client';
import { Button } from '@repo/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu';
import { cn } from 'cn';
import { BadgeCheckIcon, BellIcon, ChevronsUpDown, CreditCardIcon, LogOutIcon } from 'lucide-react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import Image from 'next/image';
import { Link, useTransitionRouter } from 'next-view-transitions';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

export function DashboardNav() {
  const ref = useRef<HTMLDivElement>(null);
  const [prevScrollY, setPrevScrollY] = useState(false);
  const { data: session } = authClient.useSession();
  const router = useTransitionRouter();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 4) {
      setPrevScrollY(true);
    } else {
      setPrevScrollY(false);
    }
  });

  const handleInvite = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.origin);
      toast.success('Workspace invite link copied to clipboard!');
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push('/');
    toast.success('Signed out successfully');
  };

  const userName = session?.user?.name || 'Avi';
  const userEmail = session?.user?.email || 'avi@example.com';
  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      ref={ref}
      animate={{
        borderBottomLeftRadius: prevScrollY ? '24px' : '0px',
        borderBottomRightRadius: prevScrollY ? '24px' : '0px',
        boxShadow: prevScrollY ? 'var(--shadow-control)' : 'none',
      }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-auto w-full px-4 py-3.5 sm:px-6',
        'bg-background/80 backdrop-blur-md',
        'border-border border-b',
        'transition-colors',
      )}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 50,
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-md text-white shadow-xs">
            <Image
              src="/doodlejam-mark-black.svg"
              alt="DoodleJam"
              width={28}
              height={28}
              priority
              className="size-7 shrink-0 dark:hidden"
            />
            <Image
              src="/doodlejam-mark-white.svg"
              alt="DoodleJam"
              width={28}
              height={28}
              priority
              className="hidden size-7 shrink-0 dark:block"
            />
          </div>

          <button
            type="button"
            className="group hover:bg-muted/70 -ml-1 flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1 text-left transition-colors"
          >
            <span className="text-foreground text-sm font-medium tracking-tight">
              Personal workspace
            </span>
            <span className="border-border bg-muted/80 text-muted-foreground rounded-md border px-1.5 py-0.5 text-[11px] font-medium">
              Hobby
            </span>
            <ChevronsUpDown className="text-muted-foreground group-hover:text-foreground size-3.5 transition-colors" />
          </button>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleInvite}
            className="h-7 cursor-pointer px-2.5 text-xs font-medium"
          >
            Invite
          </Button>

          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="ring-border size-7 cursor-pointer overflow-hidden rounded-full p-0 shadow-xs ring-1 hover:opacity-90 sm:size-8"
                >
                  {session?.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={userName}
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center bg-linear-to-tr from-cyan-600 to-emerald-500 text-xs font-semibold text-white">
                      {userInitials}
                    </div>
                  )}
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-56 min-w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-foreground text-xs leading-none font-medium">{userName}</p>
                    <p className="text-muted-foreground truncate text-[11px] leading-none">
                      {userEmail}
                    </p>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer">
                  <BadgeCheckIcon className="size-4" />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <CreditCardIcon className="size-4" />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <BellIcon className="size-4" />
                  <span>Notifications</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={handleSignOut}
                className="cursor-pointer"
              >
                <LogOutIcon className="size-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );
}
