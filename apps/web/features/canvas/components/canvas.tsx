'use client';
import { useEffect, useRef } from 'react';

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) {
        return;
      }
      const { width, height } = entry.contentRect;

      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#0c0c0e';
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.strokeRect(50, 50, 200, 150);
    });
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 h-screen w-screen overflow-hidden bg-[#0c0c0e]"
      >
        <canvas ref={canvasRef} id="canvas" width="800" height="600" />
      </div>
    </>
  );
}
