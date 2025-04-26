"use client";

import { useEffect, useState } from "react";
import { animate } from "animejs";

type GridDataProps = {
  cols: number;
  rows: number;
  dots: number[];
};

type PulseEffectProps = {
  duration: number
}

export default function PulseEffect(props: PulseEffectProps) {
  const [gridData, setGridData] = useState<GridDataProps>({
    cols: 0,
    rows: 0,
    dots: [],
  });

  const { duration } = props

  useEffect(() => {
    const cols = Math.floor(window.innerWidth / 200) | 1;
    const rows = Math.floor(window.innerHeight / 200) | 1;

    const adjustedCols = cols % 2 === 0 ? cols + 1 : cols;
    const adjustedRows = rows % 2 === 0 ? rows + 1 : rows;

    const total = adjustedCols * adjustedRows;
    const dots = Array.from({ length: total }, (_, i) => i);

    setGridData({ cols: adjustedCols, rows: adjustedRows, dots });
  }, []);

  useEffect(() => {
    const dots = document.querySelectorAll(".dot");
    const centerX = Math.floor(gridData.cols / 2);
    const centerY = Math.floor(gridData.rows / 2);

    dots.forEach((dot, index) => {
      const x = index % gridData.cols;
      const y = Math.floor(index / gridData.cols);
      const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
      const delay = (distance * 700) + duration;

      animate(dot, {
        scale: [
          { to: 20, duration: duration, ease: "inOut" },
          { to: 0, duration: duration, ease: "inOut" },
          { to: 0, duration: 2000 },
        ],
        delay: delay,
        loop: true,
      });
    });
  }, [gridData]);

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <div
        className={`grid gap-28 w-full h-full place-items-center overflow-hidden`}
        style={{
          gridTemplateColumns: `repeat(${gridData.cols}, minmax(0, 1fr))`,
        }}
      >
        {gridData.dots.map((_, index) => (
          <div
            key={index}
            className="dot w-1 h-1 max-w-[25px] max-h-[25px] bg-[#094974] rounded-full origin-center"
            style={{ transform: "scale(0)" }}
          />
        ))}
      </div>
    </div>
  );
}
