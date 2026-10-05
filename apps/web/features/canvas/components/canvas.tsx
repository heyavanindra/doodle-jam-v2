import { useRef } from 'react';

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return <canvas ref={canvasRef}></canvas>;
}
