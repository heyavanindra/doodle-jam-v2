import type { Room } from '@/features/dashboard/api/room';
import { CreateRoomDialog } from './create-room-dialog';

export function EmptyCanvasIllustration(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 360 260"
      width="360"
      height="260"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      {...props}
    >
      <defs>
        {/* Subtle depth shadow */}
        <filter
          id="dj-canvas-shadow"
          x="-25%"
          y="-25%"
          width="150%"
          height="165%"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#000000" floodOpacity="0.42" />
        </filter>

        {/* Rear artboard */}
        <linearGradient id="dj-rear-surface" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#202024" />
          <stop offset="100%" stopColor="#141417" />
        </linearGradient>

        {/* Front artboard */}
        <linearGradient id="dj-front-surface" x1="0" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#26262B" />
          <stop offset="55%" stopColor="#202024" />
          <stop offset="100%" stopColor="#18181C" />
        </linearGradient>

        {/* Quiet edge definition */}
        <linearGradient id="dj-front-border" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#42424A" />
          <stop offset="100%" stopColor="#29292F" />
        </linearGradient>

        {/* Restrained top-edge reflection */}
        <linearGradient id="dj-edge-highlight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.12" />
          <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Canvas grid pattern */}
        <pattern id="dj-canvas-grid" width="18" height="18" patternUnits="userSpaceOnUse">
          <path d="M18 0H0V18" stroke="#A1A1AA" strokeOpacity="0.065" strokeWidth="0.7" />
        </pattern>

        {/* Clip paths */}
        <clipPath id="dj-rear-clip">
          <rect x="77" y="35" width="226" height="148" rx="10" />
        </clipPath>

        <clipPath id="dj-front-clip">
          <rect x="49" y="65" width="236" height="150" rx="10" />
        </clipPath>

        {/* Sketch stroke gradient */}
        <linearGradient
          id="dj-sketch-stroke"
          x1="70"
          y1="0"
          x2="255"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#A1A1AA" />
          <stop offset="65%" stopColor="#D4D4D8" />
          <stop offset="100%" stopColor="#A1A1AA" />
        </linearGradient>
      </defs>

      {/* Grounding shadow */}
      <ellipse cx="169" cy="222" rx="104" ry="10" fill="#000000" fillOpacity="0.34" />

      {/* REAR ARTBOARD */}
      <g id="dj-rear-artboard">
        <rect
          x="77"
          y="35"
          width="226"
          height="148"
          rx="10"
          fill="url(#dj-rear-surface)"
          stroke="#34343B"
          strokeOpacity="0.8"
        />

        <g clipPath="url(#dj-rear-clip)">
          <rect x="77" y="35" width="226" height="148" fill="url(#dj-canvas-grid)" />

          <g
            stroke="#777780"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.48"
          >
            <path d="M220 66L246 51L267 71" />
            <path d="M246 51L244 78" opacity="0.65" />
            <path d="M268 71L280 61" opacity="0.55" />
          </g>

          <path
            d="M105 105C118 94 132 96 142 108"
            stroke="#696971"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.35"
          />
        </g>
      </g>

      {/* FRONT ARTBOARD */}
      <g id="dj-front-artboard">
        <rect
          x="49"
          y="65"
          width="236"
          height="150"
          rx="10"
          fill="url(#dj-front-surface)"
          stroke="url(#dj-front-border)"
          strokeWidth="1"
          filter="url(#dj-canvas-shadow)"
        />

        <path
          d="M61 65.6H214"
          stroke="url(#dj-edge-highlight)"
          strokeWidth="1"
          strokeLinecap="round"
        />

        <g clipPath="url(#dj-front-clip)">
          <rect x="49" y="65" width="236" height="150" fill="url(#dj-canvas-grid)" />

          {/* Sketch paths */}
          <path
            d="M79 154 C94 137 105 119 122 125 C138 130 138 151 157 151 C176 151 183 120 204 119 C220 118 230 132 246 126"
            stroke="url(#dj-sketch-stroke)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M99 167 C116 159 126 163 140 170 C151 175 163 173 175 164"
            stroke="#85858F"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.66"
          />

          <path
            d="M151 110L173 92L192 111"
            stroke="#92929C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />

          <circle cx="173" cy="92" r="2" fill="#A1A1AA" fillOpacity="0.8" />

          {/* Accent drawing point */}
          <path d="M231 130L246 126" stroke="#60A5FA" strokeWidth="2.2" strokeLinecap="round" />

          <circle cx="246" cy="126" r="2.5" fill="#60A5FA" />
        </g>

        <rect
          x="49.5"
          y="65.5"
          width="235"
          height="149"
          rx="9.5"
          stroke="#45454D"
          strokeOpacity="0.28"
        />
      </g>
    </svg>
  );
}

interface RoomsViewProps {
  rooms: Room[] | undefined;
}

export function RoomsView({ rooms }: RoomsViewProps) {
  if (!rooms || rooms.length === 0) {
    return (
      <div className="mx-auto flex max-w-sm flex-col items-center justify-center px-4 py-10 text-center">
        <div className="relative mb-5 flex items-center justify-center">
          <EmptyCanvasIllustration className="h-auto w-64 sm:w-72" />
        </div>
        <h3 className="text-base font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          No rooms yet
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-balance text-neutral-500 sm:text-sm dark:text-neutral-400">
          Create your first canvas room to start sketching and collaborating in real time.
        </p>
        <CreateRoomDialog />
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3">
      {rooms.map((room) => (
        <div
          key={room.id}
          className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-neutral-100/60 dark:hover:bg-neutral-800/40"
        >
          <div className="size-12 shrink-0 rounded-lg bg-neutral-100 dark:bg-neutral-800" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              {room.name}
            </span>
            {room.description && (
              <span className="text-xs text-neutral-600 dark:text-neutral-400">
                {room.description}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
