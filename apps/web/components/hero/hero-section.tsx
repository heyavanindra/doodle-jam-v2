'use client';

import React from 'react';
import { Button } from '@repo/ui/components/button';
import { Link } from 'next-view-transitions';
import { BentoDemos } from './bento-demos';
import {
  FlowerBlobSticker,
  ChunkyAsteriskSticker,
  LoopyArrowSticker,
  ButtonRays,
} from './hero-stickers';

export function HeroSection() {
  const handleScrollToDemos = () => {
    const el = document.getElementById('bento-demos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-20 sm:pt-14 sm:pb-28">
      {/* STICKERS - Matching reference image with motion/react */}
      {/* 1. Top-Left Orange Flower Blob */}
      <div className="absolute top-10 left-6 select-none sm:top-14 sm:left-14 md:left-24">
        <FlowerBlobSticker color="#FF8A00" size={74} className="rotate-[-6deg]" />
      </div>

      {/* 2. Top-Right Orange Chunky Asterisk */}
      <div className="absolute top-8 right-6 select-none sm:top-12 sm:right-16 md:right-28">
        <ChunkyAsteriskSticker color="#FF8A00" size={78} className="rotate-[18deg]" />
      </div>

      {/* 3. Left Edge Blue Chunky Asterisk (bleeding off edge) */}
      <div className="absolute top-72 -left-8 select-none sm:top-76 sm:-left-6 md:left-2">
        <ChunkyAsteriskSticker color="#0099FF" size={96} className="rotate-[-10deg]" />
      </div>

      {/* 4. Right Edge Green Flower Blob */}
      <div className="absolute top-76 right-4 select-none sm:top-80 sm:right-10 md:right-20">
        <FlowerBlobSticker color="#05E17A" size={74} className="rotate-[12deg]" />
      </div>

      {/* Hero Content Container */}
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6">
        {/* Row of Plus Signs (+ + + + +) above headline */}
        <div className="flex items-center gap-2 text-base font-black tracking-widest text-neutral-800 select-none">
          <span>+</span>
          <span>+</span>
          <span>+</span>
          <span>+</span>
          <span>+</span>
        </div>

        {/* Headline */}
        <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-6xl md:text-7xl lg:leading-[1.12]">
          Draw & wireframe{' '}
          <span className="bg-main relative inline-flex rotate-[-1.5deg] items-center rounded-full border-3 border-black px-4 py-0.5 text-black shadow-[3px_3px_0px_0px_#000]">
            together in real time
          </span>
        </h1>

        {/* Subline */}
        <p className="mt-5 max-w-2xl text-base font-medium text-neutral-800 sm:text-lg md:text-xl">
          An infinite collaborative whiteboard with zero login friction, instant sub-15ms sync, and
          offline-first speed.
        </p>

        {/* CTA Button Row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <div className="relative inline-block">
            <ButtonRays />
            <Link href="/room/new">
              <Button
                size="lg"
                className="bg-main relative h-12 cursor-pointer rounded-full border-3 border-black px-8 text-base font-black text-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"
              >
                Start a board →
              </Button>
            </Link>
          </div>

          <Button
            variant="neutral"
            size="lg"
            onClick={handleScrollToDemos}
            className="h-12 cursor-pointer rounded-full border-3 border-black px-6 text-base font-bold shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"
          >
            Explore features ↓
          </Button>
        </div>

        {/* Loopy Sketch Arrows pointing down toward Bento Demos */}
        <div className="relative mt-6 flex w-full max-w-md items-center justify-between px-6 sm:mt-8">
          <div className="pointer-events-none select-none">
            <LoopyArrowSticker size={64} className="rotate-[-10deg]" />
          </div>
          <div className="pointer-events-none select-none">
            <LoopyArrowSticker flip size={64} className="rotate-[10deg]" />
          </div>
        </div>
      </div>

      {/* Bento Grid of Fake Demos */}
      <div id="bento-demos" className="relative mt-2">
        <BentoDemos />
      </div>
    </section>
  );
}
