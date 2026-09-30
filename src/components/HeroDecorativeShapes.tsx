import React from 'react';

interface HeroDecorativeShapesProps {
  mouseX: number;
  mouseY: number;
}

/**
 * HeroDecorativeShapes Component
 * 
 * Only large, elegant, organic dark yellow background shape (#D99F00)
 * placed strictly on the right side, deep behind the hanging ID card & cords.
 * All left-side shapes removed for clean typography on the left.
 */
export const HeroDecorativeShapes: React.FC<HeroDecorativeShapesProps> = ({
  mouseX,
  mouseY
}) => {
  // Parallax offsets (dx and dy normalized roughly between -1 and 1)
  const p1X = mouseX * 8;
  const p1Y = mouseY * 6;

  return (
    <div className="hero-shapes-container" aria-hidden="true">
      {/* Big Organic Wave Blob (Right Side: Strictly behind ID Card & Cords) */}
      <svg
        className="hero-shape hero-big-blob-right"
        style={{
          transform: `translate3d(${p1X * 0.45}px, ${p1Y * 0.45}px, 0)`,
        }}
        width="760"
        height="720"
        viewBox="0 0 760 720"
        fill="none"
      >
        <path
          d="M240 100 C 390 -30, 600 30, 700 150 C 780 260, 760 450, 660 570 C 560 700, 380 730, 240 650 C 110 580, 50 420, 80 290 C 110 190, 140 150, 240 100 Z"
          fill="#D99F00"
          fillOpacity="0.16"
        />
      </svg>
    </div>
  );
};

export default HeroDecorativeShapes;
