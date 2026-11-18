'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@repo/ui/components/button';
import { Link } from 'next-view-transitions';

export function Navbar() {
  return (
    <header className="bg-background/95 sticky top-0 z-40 w-full border-b-2 border-black px-4 backdrop-blur-xs sm:px-8">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <Image
            src="/doodlejam-icon.svg"
            alt="DoodleJam"
            width={32}
            height={32}
            className="size-8 transition-transform group-hover:scale-105"
            priority
          />
          <span className="text-xl font-black tracking-tight text-neutral-900">DoodleJam</span>
        </Link>

        {/* Center Nav Links / Pills */}
        <nav className="hidden items-center gap-4 text-xs font-bold tracking-wider uppercase md:flex">
          <Link
            href="#bento-demos"
            className="rounded-full border-2 border-black bg-[#FEF08A] px-3.5 py-1 text-black shadow-[2px_2px_0px_0px_#000] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
          >
            Features
          </Link>
          <Link
            href="#bento-demos"
            className="px-2.5 py-1 text-neutral-800 transition-colors hover:text-black"
          >
            How it works
          </Link>
          <Link
            href="/dashboard"
            className="px-2.5 py-1 text-neutral-800 transition-colors hover:text-black"
          >
            Dashboard
          </Link>
          <Link
            href="/room/new"
            className="px-2.5 py-1 text-neutral-800 transition-colors hover:text-black"
          >
            Rooms
          </Link>
        </nav>

        {/* Right CTA Button */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link href="/login">
            <Button
              variant="neutral"
              size="sm"
              className="rounded-full border-2 border-black px-4 text-xs font-black tracking-wider uppercase shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
            >
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
