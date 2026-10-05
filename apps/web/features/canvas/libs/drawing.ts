import { Point } from '../types';

export function drawLine(ctx: CanvasRenderingContext2D, from: Point, to: Point) {
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
}
