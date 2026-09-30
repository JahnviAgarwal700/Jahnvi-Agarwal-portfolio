import React, { useEffect, useState } from 'react';

/**
 * FilmGrain Component
 * Creates an organic, living celluloid film grain texture overlay.
 * Soft, dithered, and balanced at low opacity with mix-blend-mode: overlay
 * so it breathes subtle analog life into the signature yellow, cream, and dark backgrounds
 * without being sharp, harsh, or fatiguing to the eyes.
 */
export const FilmGrain: React.FC = () => {
  const [frameUrl, setFrameUrl] = useState<string>('');

  useEffect(() => {
    // Generate 4 softly dithered celluloid noise pattern frames
    const size = 180;
    const frameUrls: string[] = [];

    for (let f = 0; f < 4; f++) {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) continue;

      const imgData = ctx.createImageData(size, size);
      const data = imgData.data;

      // Soft monochromatic noise with low contrast (standard deviation ~18, centered at 128)
      for (let i = 0; i < data.length; i += 4) {
        // Subtle bell-curve-like noise by summing two uniform randoms
        const rand = (Math.random() + Math.random() - 1) * 26;
        const gray = Math.min(255, Math.max(0, 128 + rand));

        data[i] = gray;     // R
        data[i + 1] = gray; // G
        data[i + 2] = gray; // B
        data[i + 3] = 36;   // Gentle base alpha
      }

      ctx.putImageData(imgData, 0, 0);

      // Perform a delicate blur/smoothing pass so the grain has soft celluloid clumps, never sharp digital spikes
      const smoothedCanvas = document.createElement('canvas');
      smoothedCanvas.width = size;
      smoothedCanvas.height = size;
      const sCtx = smoothedCanvas.getContext('2d');
      if (sCtx) {
        sCtx.imageSmoothingEnabled = true;
        sCtx.drawImage(canvas, 0, 0);
        // Feather sharp edges
        sCtx.globalAlpha = 0.32;
        sCtx.drawImage(canvas, 0.5, 0.5);
        sCtx.globalAlpha = 1.0;
        frameUrls.push(smoothedCanvas.toDataURL('image/png'));
      } else {
        frameUrls.push(canvas.toDataURL('image/png'));
      }
    }

    if (frameUrls.length === 0) return;

    setFrameUrl(frameUrls[0]);

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return; // Keep frame 0 static
    }

    // Cycle through the 4 frames at 12fps (85ms) — classic cinema film cadence
    let current = 0;
    const interval = setInterval(() => {
      current = (current + 1) % frameUrls.length;
      setFrameUrl(frameUrls[current]);
    }, 85);

    return () => clearInterval(interval);
  }, []);

  if (!frameUrl) return null;

  return (
    <div
      className="film-grain-overlay"
      aria-hidden="true"
      style={{
        backgroundImage: `url(${frameUrl})`,
      }}
    />
  );
};

export default FilmGrain;
