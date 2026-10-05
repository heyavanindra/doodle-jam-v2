import { Container } from '@/components/container';
import { Navbar } from '@/components/navbar';
import { Button } from '@repo/ui/components/button';
import { Link } from 'next-view-transitions';
import { PatternBorder } from '@/components/pattern-border';
import { Pencil, Square, Circle, Type, StickyNote, MousePointer2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-background text-text-primary relative flex min-h-screen w-full flex-col overflow-hidden">
      {/* Diagonal Fade Center Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 z-0 [--grid-color:rgba(17,24,39,0.08)] dark:[--grid-color:rgba(255,255,255,0.04)]"
        style={{
          backgroundImage: `
      linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
      linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
    `,
          backgroundSize: '32px 32px',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 75%)',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 75%)',
        }}
      />

      <Navbar />

      <Container className="relative z-10 flex flex-1 flex-col items-center justify-center">
        <main className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center py-20 text-center md:py-24">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1 text-xs font-medium text-neutral-900 shadow-tray backdrop-blur-xs dark:bg-neutral-800/80 dark:text-neutral-400">
            <span className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Realtime Multiplayer Canvas
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl leading-[1.05] font-medium tracking-[-0.03em] text-balance text-neutral-900 sm:text-5xl md:text-6xl lg:text-7xl dark:text-neutral-200">
            Draw, brainstorm, and collaborate in real time
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-tight tracking-tight text-balance text-neutral-600 sm:text-lg md:text-lg dark:text-neutral-400">
            An infinite whiteboard built for speed and multiplayer flow. Sketch diagrams, share
            wireframes, and jam with your team live with zero lag.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="default" className="cursor-pointer">
                Start Drawing Free
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="default"
                className="cursor-pointer bg-white shadow-control dark:bg-neutral-950"
              >
                Live Canvas Demo
              </Button>
            </Link>
          </div>

          {/* Collaborative Canvas Preview Framed by PatternBorder */}
          <PatternBorder className="mt-14 w-full bg-white/70 shadow-control dark:bg-neutral-900/70">
            <div className="overflow-hidden rounded-xl border border-neutral-200/90 bg-white shadow-xs dark:border-neutral-800 dark:bg-neutral-950">
              {/* Canvas Header Bar */}
              <div className="flex items-center justify-between border-b border-neutral-200/80 bg-neutral-50/70 px-4 py-2.5 dark:border-neutral-800 dark:bg-neutral-900/70">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="ml-2 font-mono text-xs font-medium text-neutral-600 dark:text-neutral-400">
                    doodle-jam / sprint-planning
                  </span>
                </div>

                {/* Floating Canvas Toolbar Preview */}
                <div className="hidden items-center gap-1 rounded-lg border border-neutral-200/80 bg-white px-2 py-1 shadow-xs sm:flex dark:border-neutral-700 dark:bg-neutral-800">
                  <span className="rounded-md p-1.5 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300">
                    <MousePointer2 className="h-3.5 w-3.5" />
                  </span>
                  <span className="rounded-md bg-neutral-900 p-1.5 text-white shadow-xs">
                    <Pencil className="h-3.5 w-3.5" />
                  </span>
                  <span className="rounded-md p-1.5 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300">
                    <Square className="h-3.5 w-3.5" />
                  </span>
                  <span className="rounded-md p-1.5 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-500">
                    <Circle className="h-3.5 w-3.5" />
                  </span>
                  <span className="rounded-md p-1.5 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300">
                    <Type className="h-3.5 w-3.5" />
                  </span>
                  <span className="rounded-md p-1.5 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300">
                    <StickyNote className="h-3.5 w-3.5" />
                  </span>
                </div>

                {/* Active Live Avatars */}
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500 text-[10px] font-bold text-white ring-2 ring-white">
                      AV
                    </div>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white ring-2 ring-white">
                      SK
                    </div>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white ring-2 ring-white">
                      JD
                    </div>
                  </div>
                  <span className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600 md:inline">
                    3 Online
                  </span>
                </div>
              </div>

              {/* Canvas Workspace Mockup */}
              <div className="relative h-64 w-full overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] p-6 select-none sm:h-80 dark:bg-[radial-gradient(#27272a_1px,transparent_1px)]">
                {/* Sticky Note 1 */}
                <div className="absolute top-8 left-6 w-44 -rotate-2 rounded-xl border border-amber-300/80 bg-amber-100/90 p-3 text-left shadow-xs sm:left-12 dark:bg-amber-950/40">
                  <span className="text-[10px] font-bold tracking-wider text-amber-800 uppercase dark:text-amber-300">
                    Idea
                  </span>
                  <p className="mt-1 text-xs leading-snug font-medium text-amber-950 dark:text-amber-100">
                    Realtime canvas sync via WebSockets + Redis PubSub 🚀
                  </p>
                </div>

                {/* Sticky Note 2 */}
                <div className="absolute top-10 right-6 w-44 rotate-3 rounded-xl border border-violet-300/80 bg-violet-100/90 p-3 text-left shadow-xs sm:right-16 dark:bg-violet-950/40">
                  <span className="text-[10px] font-bold tracking-wider text-violet-800 uppercase dark:text-violet-300">
                    Feature
                  </span>
                  <p className="mt-1 text-xs leading-snug font-medium text-violet-950 dark:text-violet-100">
                    Zero-latency pressure drawing with smooth bezier paths ✨
                  </p>
                </div>

                {/* Center Drawn Diagram Shape */}
                <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                  <div className="rounded-xl border-2 border-dashed border-neutral-400/80 bg-white/80 px-6 py-4 text-center shadow-xs backdrop-blur-xs dark:border-neutral-600 dark:bg-neutral-900/80">
                    <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                      Multiplayer Canvas Room
                    </p>
                    <p className="text-[11px] text-neutral-500">
                      Instant shared drawing across all browsers
                    </p>
                  </div>
                </div>

                {/* Multiplayer Cursor 1 */}
                <div className="pointer-events-none absolute top-20 left-1/3 flex items-start gap-1">
                  <MousePointer2 className="h-4 w-4 fill-violet-600 text-violet-600" />
                  <span className="rounded-full bg-violet-600 px-2 py-0.5 text-[10px] font-semibold text-white shadow-xs">
                    Sarah
                  </span>
                </div>

                {/* Multiplayer Cursor 2 */}
                <div className="pointer-events-none absolute right-1/3 bottom-12 flex items-start gap-1">
                  <MousePointer2 className="h-4 w-4 fill-emerald-600 text-emerald-600" />
                  <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold text-white shadow-xs">
                    Alex
                  </span>
                </div>
              </div>
            </div>
          </PatternBorder>
        </main>
      </Container>
    </div>
  );
}
