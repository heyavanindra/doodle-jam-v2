'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

/**
 * 12-lobed scalloped flower blob sticker matching reference image (top-left orange, bottom-right teal/green).
 * Includes gentle floating and drift motion.
 */
export function FlowerBlobSticker({
  className = '',
  color = '#FF8A00',
  size = 76,
  floatY = 6,
  duration = 5,
}: {
  className?: string;
  color?: string;
  size?: number;
  floatY?: number;
  duration?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={
        shouldReduceMotion
          ? undefined
          : {
              y: [0, -floatY, 0],
              rotate: [0, 4, 0],
            }
      }
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.1, rotate: 12 }}
      className={`cursor-pointer select-none ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[2.5px_2.5px_0px_#000]"
      >
        <path
          d="M 98.00 50.00 C 98.00 53.28, 87.78 55.84, 86.71 59.84 C 85.63 63.84, 93.21 71.16, 91.57 74.00 C 89.93 76.84, 79.80 73.94, 76.87 76.87 C 73.94 79.80, 76.84 89.93, 74.00 91.57 C 71.16 93.21, 63.84 85.63, 59.84 86.71 C 55.84 87.78, 53.28 98.00, 50.00 98.00 C 46.72 98.00, 44.16 87.78, 40.16 86.71 C 36.16 85.63, 28.84 93.21, 26.00 91.57 C 23.16 89.93, 26.06 79.80, 23.13 76.87 C 20.20 73.94, 10.07 76.84, 8.43 74.00 C 6.79 71.16, 14.37 63.84, 13.29 59.84 C 12.22 55.84, 2.00 53.28, 2.00 50.00 C 2.00 46.72, 12.22 44.16, 13.29 40.16 C 14.37 36.16, 6.79 28.84, 8.43 26.00 C 10.07 23.16, 20.20 26.06, 23.13 23.13 C 26.06 20.20, 23.16 10.07, 26.00 8.43 C 28.84 6.79, 36.16 14.37, 40.16 13.29 C 44.16 12.22, 46.72 2.00, 50.00 2.00 C 53.28 2.00, 55.84 12.22, 59.84 13.29 C 63.84 14.37, 71.16 6.79, 74.00 8.43 C 76.84 10.07, 73.94 20.20, 76.87 23.13 C 79.80 26.06, 89.93 23.16, 91.57 26.00 C 93.21 28.84, 85.63 36.16, 86.71 40.16 C 87.78 44.16, 98.00 46.72, 98.00 50.00 Z"
          fill={color}
          stroke="#000"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

/**
 * 6-armed chunky asterisk/cross matching reference image.
 * Includes gentle sway and rotate float motion.
 */
export function ChunkyAsteriskSticker({
  className = '',
  color = '#FF8A00',
  size = 80,
  duration = 6,
}: {
  className?: string;
  color?: string;
  size?: number;
  duration?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={
        shouldReduceMotion
          ? undefined
          : {
              rotate: [0, 8, 0],
              y: [0, -5, 0],
            }
      }
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.12, rotate: 30 }}
      className={`cursor-pointer select-none ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[2.5px_2.5px_0px_#000]"
      >
        <path
          d="M 98.00 39.00 L 98.00 61.00 L 69.05 61.00 L 83.53 86.07 L 64.47 97.07 L 50.00 72.00 L 35.53 97.07 L 16.47 86.07 L 30.95 61.00 L 2.00 61.00 L 2.00 39.00 L 30.95 39.00 L 16.47 13.93 L 35.53 2.93 L 50.00 28.00 L 64.47 2.93 L 83.53 13.93 L 69.05 39.00 Z"
          fill={color}
          stroke="#000"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

/**
 * Hand-drawn loopy squiggle arrow with subtle bounce guiding attention down.
 */
export function LoopyArrowSticker({
  className = '',
  flip = false,
  size = 72,
}: {
  className?: string;
  flip?: boolean;
  size?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={
        shouldReduceMotion
          ? undefined
          : {
              y: [0, 6, 0],
            }
      }
      transition={{
        duration: 2.2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={shouldReduceMotion ? undefined : { y: 10, scale: 1.05 }}
      className={`pointer-events-none select-none ${flip ? '-scale-x-100' : ''} ${className}`}
    >
      <svg
        width={size}
        height={size * 1.1}
        viewBox="0 0 80 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hand-drawn stem with loop */}
        <path
          d="M 28 8 C 22 24, 38 34, 46 44 C 54 53, 52 64, 40 64 C 28 64, 25 48, 36 44 C 48 40, 52 58, 48 76"
          stroke="#000"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Arrowhead */}
        <path
          d="M 38 72 L 48 78 L 56 68"
          stroke="#000"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

/**
 * Yellow highlighter brush stroke under emphasized word.
 */
export function HighlighterScribble({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
    >
      <path
        d="M 4 12 C 35 6, 85 5, 136 10 C 105 13, 50 15, 10 14"
        stroke="#FFDD00"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  );
}

/**
 * Radiating sketch rays around the CTA button with subtle gentle breathing animation.
 */
export function ButtonRays({ className = '' }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.svg
      animate={
        shouldReduceMotion
          ? undefined
          : {
              scale: [1, 1.04, 1],
              opacity: [0.85, 1, 0.85],
            }
      }
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      viewBox="0 0 200 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none absolute -inset-x-6 -inset-y-3.5 size-[calc(100%+48px)] h-[calc(100%+28px)] ${className}`}
    >
      <line x1="14" y1="20" x2="4" y2="10" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="8" y1="36" x2="0" y2="36" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="14" y1="52" x2="4" y2="62" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />

      <line
        x1="186"
        y1="20"
        x2="196"
        y2="10"
        stroke="#000"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="192"
        y1="36"
        x2="200"
        y2="36"
        stroke="#000"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="186"
        y1="52"
        x2="196"
        y2="62"
        stroke="#000"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

/**
 * Concentric target / radar rings behind the hero headline.
 */
export function RadarCircles({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none ${className}`}
      aria-hidden="true"
    >
      <div className="relative flex items-center justify-center">
        <div className="size-[320px] rounded-full border border-neutral-300/80 sm:size-[380px]" />
        <div className="absolute size-[480px] rounded-full border border-neutral-300/60 sm:size-[560px]" />
        <div className="absolute size-[640px] rounded-full border border-neutral-300/40 sm:size-[740px]" />
      </div>
    </div>
  );
}

// Keep backwards compatibility for any previous imports
export { FlowerBlobSticker as StarburstSticker };
export { ChunkyAsteriskSticker as AsteriskSticker };
export { FlowerBlobSticker as SparkleSticker };
export { LoopyArrowSticker as SquiggleArrow };
