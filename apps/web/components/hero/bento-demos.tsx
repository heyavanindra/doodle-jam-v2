'use client';

import React, { useState } from 'react';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { toast } from '@repo/ui/components/toast';
import { SparkleSticker, StarburstSticker } from './hero-stickers';

export function BentoDemos() {
  const [copied, setCopied] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [activeColor, setActiveColor] = useState('#05E17A');

  const handleCopyLink = () => {
    setCopied(true);
    toast.add({
      type: 'success',
      title: 'Link copied!',
      description: 'Room URL ready to share with your team.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto mt-12 w-full max-w-6xl px-4 sm:px-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {/* TILE 1: HERO UI (Span 2 columns on lg) - Multi-cursor collaboration */}
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-3 border-black bg-white p-6 shadow-[5px_5px_0px_0px_#000] sm:col-span-2 sm:p-8">
          <div>
            <div className="flex items-center justify-between">
              <Badge
                variant="neutral"
                className="bg-main gap-1 border-2 border-black text-xs font-extrabold text-black shadow-[2px_2px_0px_0px_#000]"
              >
                ⚡ Live Multiplayer
              </Badge>
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 animate-ping rounded-full bg-[#05E17A]" />
                <span className="text-xs font-bold text-neutral-600">3 peers connected</span>
              </div>
            </div>

            <h3 className="mt-4 text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl">
              Real-time Cursor Presence
            </h3>
            <p className="mt-1 text-sm font-medium text-neutral-700 sm:text-base">
              See teammates point, sketch, and edit with zero perceptual latency.
            </p>
          </div>

          {/* Micro-canvas fake demo stage */}
          <div className="relative mt-6 h-52 w-full overflow-hidden rounded-xl border-2 border-black bg-neutral-50/80 p-4 shadow-[3px_3px_0px_0px_#000]">
            {/* Dotted canvas background */}
            <div
              className="absolute inset-0 opacity-40 select-none"
              style={{
                backgroundImage: 'radial-gradient(#000 1.2px, transparent 1.2px)',
                backgroundSize: '18px 18px',
              }}
            />

            {/* Sketched Node & Connector */}
            <div className="absolute top-8 left-8 flex rotate-[-1deg] items-center gap-2 rounded-lg border-2 border-black bg-[#E0F2FE] px-3.5 py-2 shadow-[3px_3px_0px_0px_#000]">
              <span className="size-2 rounded-full bg-[#0284C7]" />
              <span className="text-xs font-black text-black">API Gateway</span>
            </div>

            <svg className="absolute top-12 left-36 h-14 w-40" fill="none" viewBox="0 0 160 60">
              <path
                d="M10 20C40 10 90 40 140 25"
                stroke="#FF7A05"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="6 4"
                className="animate-pulse"
              />
              <path
                d="M130 18L144 26L132 34"
                stroke="#FF7A05"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute top-12 right-8 flex rotate-[1.5deg] items-center gap-2 rounded-lg border-2 border-black bg-[#DCFCE7] px-3.5 py-2 shadow-[3px_3px_0px_0px_#000]">
              <span className="size-2 rounded-full bg-[#16A34A]" />
              <span className="text-xs font-black text-black">DB Cluster</span>
            </div>

            {/* Floating Collaborator Cursor 1: Alex */}
            <div className="absolute top-20 left-28 z-10 flex items-center gap-1.5 transition-transform duration-700 hover:scale-110">
              <svg width="22" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 2L19 12L11 13.5L8 21L3 2Z"
                  fill="#05E17A"
                  stroke="#000"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="rounded-md border-2 border-black bg-[#05E17A] px-1.5 py-0.5 text-[11px] font-black text-black shadow-[2px_2px_0px_0px_#000]">
                Alex
              </span>
            </div>

            {/* Floating Collaborator Cursor 2: Maya */}
            <div className="absolute right-20 bottom-6 z-10 flex items-center gap-1.5 transition-transform duration-700 hover:scale-110">
              <svg width="22" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 2L19 12L11 13.5L8 21L3 2Z"
                  fill="#FF7A05"
                  stroke="#000"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="rounded-md border-2 border-black bg-[#FF7A05] px-1.5 py-0.5 text-[11px] font-black text-black shadow-[2px_2px_0px_0px_#000]">
                Maya ✏️
              </span>
            </div>
          </div>
        </div>

        {/* TILE 2: STAT TILE - Latency / Performance */}
        <div className="flex flex-col justify-between rounded-2xl border-3 border-black bg-[#FEF08A] p-6 shadow-[5px_5px_0px_0px_#000] sm:p-8">
          <div>
            <Badge
              variant="neutral"
              className="border-2 border-black bg-white text-xs font-extrabold shadow-[2px_2px_0px_0px_#000]"
            >
              🚀 Speed
            </Badge>
            <h3 className="mt-4 text-lg font-black tracking-tight text-neutral-900">
              Sub-15ms WebSocket Sync
            </h3>
            <p className="mt-1 text-sm font-medium text-neutral-800">
              Feels instant even over high-latency mobile networks.
            </p>
          </div>

          <div className="mt-6 flex flex-col items-start">
            <div className="flex items-baseline gap-1">
              <span className="text-6xl font-black tracking-tight text-black sm:text-7xl">12</span>
              <span className="text-2xl font-black text-neutral-800">ms</span>
            </div>
            <div className="mt-2 flex w-full items-center gap-2 rounded-full border-2 border-black bg-white px-3 py-1.5 shadow-[2px_2px_0px_0px_#000]">
              <span className="size-2 animate-pulse rounded-full bg-[#16A34A]" />
              <span className="text-xs font-bold text-neutral-800">Global Peer Consensus</span>
            </div>
          </div>
        </div>

        {/* TILE 3: COMPONENT DEMO - Tilted Sticky Notes Stack */}
        <div className="flex flex-col justify-between rounded-2xl border-3 border-black bg-white p-6 shadow-[5px_5px_0px_0px_#000] sm:p-8">
          <div>
            <Badge
              variant="neutral"
              className="border-2 border-black bg-white text-xs font-extrabold shadow-[2px_2px_0px_0px_#000]"
            >
              📝 Canvas Objects
            </Badge>
            <h3 className="mt-4 text-xl font-black tracking-tight text-neutral-900">
              Sticky Notes That Pop
            </h3>
            <p className="mt-1 text-sm font-medium text-neutral-700">
              Brainstorm, organize sprints, and leave color-coded feedback.
            </p>
          </div>

          {/* Interactive Sticky Note Preview */}
          <div className="relative mt-6 flex h-40 items-center justify-center">
            {/* Background Note 1 */}
            <div className="absolute size-32 rotate-[-8deg] rounded-lg border-2 border-black bg-[#BAE6FD] p-3 shadow-[3px_3px_0px_0px_#000]">
              <span className="text-xs font-black text-black">Q3 Roadmap 🎯</span>
              <p className="mt-1 text-[10px] text-neutral-700">Prioritize WebSocket gateway</p>
            </div>

            {/* Foreground Note 2 */}
            <div className="absolute size-34 rotate-[5deg] rounded-lg border-2 border-black bg-[#FEF08A] p-3.5 shadow-[4px_4px_0px_0px_#000] transition-transform hover:scale-105 hover:rotate-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-black">Sprint Task ⚡</span>
                <span className="text-[10px]">📌</span>
              </div>
              <p className="mt-2 text-xs font-bold text-neutral-900">
                Ship interactive canvas local mode!
              </p>
            </div>
          </div>
        </div>

        {/* TILE 4: DIAGRAM / OFFLINE-FIRST DEMO */}
        <div className="flex flex-col justify-between rounded-2xl border-3 border-black bg-[#DCFCE7] p-6 shadow-[5px_5px_0px_0px_#000] sm:p-8">
          <div>
            <Badge
              variant="neutral"
              className="border-2 border-black bg-white text-xs font-extrabold shadow-[2px_2px_0px_0px_#000]"
            >
              💾 Offline First
            </Badge>
            <h3 className="mt-4 text-xl font-black tracking-tight text-neutral-900">
              Conflict-Free CRDTs
            </h3>
            <p className="mt-1 text-sm font-medium text-neutral-800">
              Draw on a flight. Changes auto-merge cleanly when you reconnect.
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between rounded-xl border-2 border-black bg-white p-3.5 shadow-[3px_3px_0px_0px_#000]">
            <div className="flex items-center gap-2">
              <span
                className={`size-3 rounded-full border border-black ${
                  isOnline ? 'bg-[#16A34A]' : 'bg-[#EF4444]'
                }`}
              />
              <span className="text-xs font-black text-black">
                {isOnline ? 'Network Online' : 'Airplane Mode'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOnline(!isOnline)}
              className="rounded-md border-2 border-black bg-neutral-100 px-2.5 py-1 text-xs font-extrabold shadow-[1.5px_1.5px_0px_0px_#000] hover:bg-neutral-200"
            >
              Toggle Demo
            </button>
          </div>
        </div>

        {/* TILE 5: COMPONENT DEMO - Instant Share without login */}
        <div className="flex flex-col justify-between rounded-2xl border-3 border-black bg-white p-6 shadow-[5px_5px_0px_0px_#000] sm:p-8">
          <div>
            <Badge
              variant="neutral"
              className="border-2 border-black bg-white text-xs font-extrabold shadow-[2px_2px_0px_0px_#000]"
            >
              🔗 Zero Friction
            </Badge>
            <h3 className="mt-4 text-xl font-black tracking-tight text-neutral-900">
              One-Click Room Sharing
            </h3>
            <p className="mt-1 text-sm font-medium text-neutral-700">
              Send a link to anyone. No sign-up wall to jump in and doodle.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-2.5">
            <div className="flex items-center justify-between rounded-xl border-2 border-black bg-neutral-50 px-3 py-2 font-mono text-xs font-bold text-neutral-800 shadow-[2.5px_2.5px_0px_0px_#000]">
              <span className="truncate">doodlejam.com/r/sketch-99</span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="bg-main ml-2 shrink-0 rounded-md border-2 border-black px-2 py-0.5 text-xs font-black text-black shadow-[1.5px_1.5px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
              >
                {copied ? 'Copied! ✓' : 'Copy'}
              </button>
            </div>
            <span className="text-[11px] font-bold text-neutral-500">
              🔓 Public room • Read & Write access
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
