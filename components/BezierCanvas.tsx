"use client";
import { useEffect, useRef, useState } from "react";
import { HEIGHT, Point, WIDTH, sampleCurve } from "@/lib/bezier";

type Props = { points: Point[]; onMove: (index: number, p: Point) => void };

const INK = "#4a5568";
const ACCENT = "#5b6ee1";

export default function BezierCanvas({ points, onMove }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [drag, setDrag] = useState(-1);

  useEffect(() => {
    const ctx = ref.current!.getContext("2d")!;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // línea entre puntos de control
    ctx.setLineDash([8, 8]);
    ctx.strokeStyle = "#a3b1c6";
    ctx.lineWidth = 2;
    ctx.beginPath();
    points.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    ctx.stroke();
    ctx.setLineDash([]);

    // curva
    const curve = sampleCurve(points);
    ctx.strokeStyle = ACCENT;
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";
    ctx.beginPath();
    curve.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    ctx.stroke();

    // muestras
    ctx.fillStyle = ACCENT;
    curve.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    // puntos de control
    ctx.font = "600 18px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    points.forEach((p, i) => {
      ctx.fillStyle = "#e0e5ec";
      ctx.shadowColor = "rgba(163,177,198,0.9)";
      ctx.shadowBlur = 12;
      ctx.shadowOffsetX = 4;
      ctx.shadowOffsetY = 4;
      ctx.beginPath();
      ctx.arc(p.x, p.y, i === drag ? 20 : 17, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowColor = "transparent";
      ctx.fillStyle = INK;
      ctx.fillText(`P${i}`, p.x, p.y + 1);
    });
  }, [points, drag]);

  const toCanvas = (e: React.PointerEvent): Point => {
    const r = ref.current!.getBoundingClientRect();
    const clamp = (v: number, max: number) => Math.max(0, Math.min(max, v));
    return {
      x: clamp(((e.clientX - r.left) * WIDTH) / r.width, WIDTH),
      y: clamp(((e.clientY - r.top) * HEIGHT) / r.height, HEIGHT),
    };
  };

  const onDown = (e: React.PointerEvent) => {
    const m = toCanvas(e);
    let best = -1;
    let bestD = 45 * 45;
    points.forEach((p, i) => {
      const d = (p.x - m.x) ** 2 + (p.y - m.y) ** 2;
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    if (best >= 0) {
      setDrag(best);
      ref.current!.setPointerCapture(e.pointerId);
    }
  };

  return (
    <div className="panel inset">
      <canvas
        ref={ref}
        width={WIDTH}
        height={HEIGHT}
        className="canvas"
        aria-label="Lienzo de la curva"
        onPointerDown={onDown}
        onPointerMove={(e) => drag >= 0 && onMove(drag, toCanvas(e))}
        onPointerUp={() => setDrag(-1)}
        onPointerCancel={() => setDrag(-1)}
      />
    </div>
  );
}
