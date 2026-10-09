"use client";
import { useState } from "react";
import BezierCanvas from "@/components/BezierCanvas";
import PointInputs from "@/components/PointInputs";
import { Point, defaultPoints } from "@/lib/bezier";

export default function Page() {
  const [points, setPoints] = useState<Point[]>(defaultPoints);

  const movePoint = (i: number, p: Point) =>
    setPoints((prev) => prev.map((q, j) => (j === i ? p : q)));

  const setAxis = (i: number, axis: "x" | "y", v: number) =>
    setPoints((prev) => prev.map((q, j) => (j === i ? { ...q, [axis]: v } : q)));

  return (
    <main className="page">
      <h1>Curva de Bézier</h1>
      <p className="sub">3 puntos de control · t = 0.05</p>
      <div className="layout">
        <BezierCanvas points={points} onMove={movePoint} />
        <PointInputs points={points} onChange={setAxis} onReset={() => setPoints(defaultPoints())} />
      </div>
    </main>
  );
}
