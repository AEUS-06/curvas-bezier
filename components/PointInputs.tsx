"use client";
import NumberField from "./NumberField";
import { Point } from "@/lib/bezier";

type Props = {
  points: Point[];
  onChange: (index: number, axis: "x" | "y", value: number) => void;
  onReset: () => void;
};

export default function PointInputs({ points, onChange, onReset }: Props) {
  return (
    <div className="panel inputs">
      <div className="row head">
        <span />
        <span>x</span>
        <span>y</span>
      </div>
      {points.map((p, i) => (
        <div className="row" key={i}>
          <span className="tag">P{i}</span>
          <NumberField label={`P${i} x`} value={p.x} onChange={(v) => onChange(i, "x", v)} />
          <NumberField label={`P${i} y`} value={p.y} onChange={(v) => onChange(i, "y", v)} />
        </div>
      ))}
      <button className="btn" onClick={onReset}>
        Restablecer
      </button>
    </div>
  );
}
