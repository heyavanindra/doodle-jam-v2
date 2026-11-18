import { Point, Viewport } from '../types';

export function screenToWorld(screen: Point, viewport: Viewport): Point {
  const worldX = (screen.x - viewport.offsetX) / viewport.zoom;
  const worldY = (screen.y - viewport.offsetY) / viewport.zoom;

  return { x: worldX, y: worldY };
}

export function worldToScreen(world: Point, viewport: Viewport): Point {
  const screenX = world.x * viewport.zoom + viewport.offsetX;
  const screenY = world.y * viewport.zoom + viewport.offsetY;

  return { x: screenX, y: screenY };
}

export function applyViewportTransform(ctx: CanvasRenderingContext2D, viewport: Viewport) {
  ctx.translate(viewport.offsetX, viewport.offsetY);
  ctx.scale(viewport.zoom, viewport.zoom);
}
