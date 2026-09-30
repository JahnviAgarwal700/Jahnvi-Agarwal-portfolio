import React, { useEffect, useState } from 'react';

/**
 * FilmGrain Component
 * Creates an organic, subtle celluloid film grain texture overlay.
 * High-performance: generated once on an offscreen canvas and cached as a CSS background.
 * Uses GPU-accelerated compositing with zero timers, zero interval repaints,
 * and zero CPU overhead.
 */
export const FilmGrain: React.FC = () => {
  const [patternUrl, setPatternUrl] = useState<string>('');

  useEffect(() => {
    // Generate one soft tileable celluloid noise pattern
    const size = 160;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.createImageData(size, size);
    const data = imgData.data;

    // Subtle monochromatic noise with gentle contrast
    for (let i = 0; i < data.length; i += 4) {
      const rand = (Math.random() + Math.random() - 1) * 22;
      const gray = Math.min(255, Math.max(0, 128 + rand));
      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
      data[i + 3] = 28; // Very soft, gentle alpha
    }

    ctx.putImageData(imgData, 0, 0);
    setPatternUrl(canvas.toDataURL('image/png'));
  }, []);

  if (!patternUrl) return null;

  return (
    <div
      className="film-grain-overlay"
      aria-hidden="true"
      style={{
        backgroundImage: `url(${patternUrl})`,
      }}
    />
  );
};

export default FilmGrain;

