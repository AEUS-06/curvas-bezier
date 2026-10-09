export type Point = { x: number; y: number };

export const WIDTH = 900;
export const HEIGHT = 600;
export const T_STEP = 0.05;

export const defaultPoints = (): Point[] => [
  { x: 120, y: 480 },
  { x: 450, y: 80 },
  { x: 780, y: 480 },
];

const lerp = (a: Point, b: Point, t: number): Point => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
});

// De Casteljau para 3 puntos de control
export function bezierPoint([p0, p1, p2]: Point[], t: number): Point {
  return lerp(lerp(p0, p1, t), lerp(p1, p2, t), t);
}

// Muestrea la curva de t = 0 a t = 1 en pasos de T_STEP (21 puntos)
export function sampleCurve(points: Point[]): Point[] {
  const n = Math.round(1 / T_STEP);
  return Array.from({ length: n + 1 }, (_, i) => bezierPoint(points, i * T_STEP));
}
