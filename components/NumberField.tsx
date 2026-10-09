"use client";
import { useEffect, useState } from "react";

type Props = { label: string; value: number; onChange: (v: number) => void };

const round = (n: number) => Math.round(n * 10) / 10;

export default function NumberField({ label, value, onChange }: Props) {
  const [text, setText] = useState(String(round(value)));

  // Sincroniza cuando el valor cambia desde el lienzo
  useEffect(() => {
    if (parseFloat(text) !== round(value)) setText(String(round(value)));
  }, [value]);

  return (
    <input
      className="field"
      type="number"
      step="any"
      aria-label={label}
      value={text}
      onChange={(e) => {
        setText(e.target.value);
        const v = parseFloat(e.target.value);
        if (!isNaN(v)) onChange(v);
      }}
    />
  );
}
