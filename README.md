# Curva de Bézier (3 puntos)

Next.js 14 + TypeScript. Curva de Bézier de 3 puntos de control con t = 0.05.
Los puntos se pueden escribir o arrastrar en el lienzo.

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Estructura
- `lib/bezier.ts`: cálculo de la curva (De Casteljau)
- `components/BezierCanvas.tsx`: lienzo y arrastre
- `components/PointInputs.tsx`: campos x / y
- `components/NumberField.tsx`: campo numérico neumórfico
- `app/page.tsx`: estado de los puntos
