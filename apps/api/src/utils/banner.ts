// utils/banner.ts

const rgb = (r: number, g: number, b: number) => `\x1b[38;2;${r};${g};${b}m`;
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';

// eslint-disable-next-line no-control-regex
const strip = (s: string) => s.replace(/\x1b\[[0-9;]*m/g, '');
const pad = (s: string, w: number) => s + ' '.repeat(Math.max(0, w - strip(s).length));

type RGB = [number, number, number];

// Per-character gradient
function gradient(text: string, from: RGB, to: RGB) {
  const chars = [...text];
  return (
    chars
      .map((ch, i) => {
        if (ch === ' ') return ch;
        const t = chars.length === 1 ? 0 : i / (chars.length - 1);
        const r = Math.round(from[0] + (to[0] - from[0]) * t);
        const g = Math.round(from[1] + (to[1] - from[1]) * t);
        const b = Math.round(from[2] + (to[2] - from[2]) * t);
        return `${rgb(r, g, b)}${ch}`;
      })
      .join('') + RESET
  );
}

interface BannerOptions {
  port: number | string;
  env?: string;
  version?: string;
  startedAt?: number; // Date.now() at boot, to show startup time
}

export function printBanner({
  port,
  env = process.env.NODE_ENV ?? 'development',
  version,
  startedAt,
}: BannerOptions) {
  const W = 54; // inner width
  const border = rgb(167, 139, 250); // violet
  const label = rgb(148, 163, 184); // slate
  const green = rgb(74, 222, 128);
  const cyan = rgb(34, 211, 238);
  const yellow = rgb(250, 204, 21);

  const line = (content = '') => `${border}│${RESET} ${pad(content, W - 2)} ${border}│${RESET}`;
  const center = (content: string) => {
    const space = W - 2 - strip(content).length;
    const left = Math.floor(space / 2);
    return line(' '.repeat(left) + content);
  };
  const row = (k: string, v: string) =>
    line(`${label}${pad(k, 10)}${RESET}${border}→${RESET}  ${v}`);

  const squiggle = gradient('~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~', [244, 114, 182], [34, 211, 238]);
  const title = gradient('✎  D O O D L E   J A M  ✎', [244, 114, 182], [96, 165, 250]);

  const bootTime = startedAt ? `${DIM}  (${Date.now() - startedAt}ms)${RESET}` : '';
  const envColor = env === 'production' ? yellow : cyan;

  const out = [
    '',
    `${border}╭${'─'.repeat(W)}╮${RESET}`,
    line(),
    center(title),
    center(squiggle),
    line(),
    `${border}├${'─'.repeat(W)}┤${RESET}`,
    line(),
    row('Status', `${green}●${RESET} ${BOLD}Running${RESET}${bootTime}`),
    row('Local', `${BOLD}http://localhost:${port}${RESET}`),
    row('Env', `${envColor}${env}${RESET}`),
    row('Node', `${process.version}`),
    row('PID', `${process.pid}`),
    ...(version ? [row('Version', `v${version}`)] : []),
    line(),
    `${border}╰${'─'.repeat(W)}╯${RESET}`,
    `${DIM}   Press Ctrl+C to stop${RESET}`,
    '',
  ].join('\n');

  console.log(out);
}
