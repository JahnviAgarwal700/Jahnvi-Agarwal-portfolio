import React, { useEffect, useRef, useState } from 'react';
import { getAssetUrl } from '../data/portfolioData';

interface HangingIDCardProps {
  mouseX?: number;
  mouseY?: number;
}

/**
 * HangingIDCard Component
 * 
 * Authentic, physical hanging ID badge with single-eyelet V-strap design.
 * Highly optimized:
 * - Runs pendulum simulation in requestAnimationFrame ONLY when in the viewport (IntersectionObserver)
 * - Caches layout coordinates to eliminate forced reflows / getBoundingClientRect during mouse movement
 * - Zero React re-renders on mousemove
 */
export const HangingIDCard: React.FC<HangingIDCardProps> = () => {
  const cardContainerRef = useRef<HTMLDivElement | null>(null);
  const cardElementRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Cached layout bounds to avoid forced layout thrashing
  const cachedBoundsRef = useRef({
    centerX: 0,
    centerY: 0,
    width: 300,
    height: 400,
  });

  // Target mouse position in viewport
  const mousePosRef = useRef({ x: -1, y: -1 });

  // Mouse tilt targets and current smoothed state
  const mouseTiltRef = useRef({
    targetTiltX: 0,
    targetTiltY: 0,
    curTiltX: 0,
    curTiltY: 0,
  });

  useEffect(() => {
    // 1. Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (cardElementRef.current) {
        cardElementRef.current.style.transform = 'none';
      }
      return;
    }

    // 2. Cache bounds on mount, resize, and scroll
    const updateBounds = () => {
      if (cardContainerRef.current) {
        const rect = cardContainerRef.current.getBoundingClientRect();
        cachedBoundsRef.current = {
          centerX: rect.left + rect.width / 2,
          centerY: rect.top + rect.height / 2,
          width: rect.width || 300,
          height: rect.height || 400,
        };
      }
    };

    updateBounds();
    window.addEventListener('resize', updateBounds, { passive: true });

    // 3. Pointer move listener on window (zero DOM reads, just saves clientX/Y)
    const handlePointerMove = (e: PointerEvent) => {
      mousePosRef.current.x = e.clientX;
      mousePosRef.current.y = e.clientY;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // 4. Main real-physics animation loop (active only when in viewport)
    let rafId = 0;
    let isVisible = true;
    const startTime = performance.now();
    let lastTime = performance.now();

    const X_START = 240.0;
    const Y_START = -620.0;
    const ANGLE_START = 24.0;

    const loop = (currentTime: number) => {
      if (!isVisible) return;

      const dt = Math.min(0.05, Math.max(0.001, (currentTime - lastTime) / 1000));
      lastTime = currentTime;
      const totalElapsed = (currentTime - startTime) / 1000;

      const leadIn = 0.05;
      let x = 0;
      let y = 0;
      let angle = 0;

      if (totalElapsed < leadIn) {
        x = X_START;
        y = Y_START;
        angle = ANGLE_START;
      } else {
        const tau = totalElapsed - leadIn;

        // Vertical drop with elastic damping
        const omegaY = 4.2;
        const lambdaY = 2.2;
        const decayY = Math.exp(-lambdaY * tau);
        y = Y_START * decayY * (Math.cos(omegaY * tau) + (lambdaY / omegaY) * Math.sin(omegaY * tau));

        // Pendulum arc swing
        const omegaPendulum = 2.8;
        const lambdaPendulum = 1.28;
        const decayPendulum = Math.exp(-lambdaPendulum * tau);
        const swingOscillation = Math.cos(omegaPendulum * tau) + (lambdaPendulum / omegaPendulum) * Math.sin(omegaPendulum * tau);

        const xDrop = X_START * decayPendulum * swingOscillation;
        const angleDrop = ANGLE_START * decayPendulum * swingOscillation;

        // Ambient gentle sway
        const omegaAmbient = 0.80;
        const angleAmbient = 1.9 * Math.cos(omegaAmbient * tau);
        const xAmbient = 4.8 * Math.cos(omegaAmbient * tau);

        const blendProgress = Math.min(1.0, Math.max(0.0, (tau - 1.1) / 2.1));
        const blend = blendProgress * blendProgress * (3 - 2 * blendProgress);

        x = xDrop + blend * xAmbient;
        angle = angleDrop + blend * angleAmbient;
      }

      // Compute cursor tilt from cached bounds without layout reflow
      const mouse = mousePosRef.current;
      const bounds = cachedBoundsRef.current;
      if (mouse.x >= 0 && mouse.y >= 0 && bounds.centerX > 0) {
        const deltaX = mouse.x - bounds.centerX;
        const deltaY = mouse.y - bounds.centerY;
        const distance = Math.hypot(deltaX, deltaY);
        const influenceRadius = 650;

        if (distance < influenceRadius) {
          const normalizedDist = 1 - distance / influenceRadius;
          const clampedX = Math.max(-1, Math.min(1, deltaX / (bounds.width * 1.2)));
          const clampedY = Math.max(-1, Math.min(1, deltaY / (bounds.height * 1.2)));

          mouseTiltRef.current.targetTiltX = clampedY * -4.2 * normalizedDist;
          mouseTiltRef.current.targetTiltY = clampedX * 5.2 * normalizedDist;
        } else {
          mouseTiltRef.current.targetTiltX = 0;
          mouseTiltRef.current.targetTiltY = 0;
        }
      }

      // Smooth 3D cursor tilt
      const tilt = mouseTiltRef.current;
      const smoothFactor = 1 - Math.exp(-dt * 8.0);
      tilt.curTiltX += (tilt.targetTiltX - tilt.curTiltX) * smoothFactor;
      tilt.curTiltY += (tilt.targetTiltY - tilt.curTiltY) * smoothFactor;

      // Apply GPU-accelerated transform
      if (cardElementRef.current) {
        const renderX = x.toFixed(2);
        const renderY = y.toFixed(2);
        const renderAngle = (angle + tilt.curTiltY * 0.16).toFixed(2);
        const renderTiltX = tilt.curTiltX.toFixed(2);
        const renderTiltY = tilt.curTiltY.toFixed(2);

        cardElementRef.current.style.transform = 
          `perspective(1400px) ` +
          `translate3d(${renderX}px, ${renderY}px, 0) ` +
          `rotate(${renderAngle}deg) ` +
          `rotateX(${renderTiltX}deg) ` +
          `rotateY(${renderTiltY}deg)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    // 5. IntersectionObserver: Sleep when out of viewport, wake up when in view
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (!isVisible) {
            isVisible = true;
            lastTime = performance.now();
            updateBounds();
            rafId = requestAnimationFrame(loop);
          }
        } else {
          isVisible = false;
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0 }
    );

    if (cardContainerRef.current) {
      observer.observe(cardContainerRef.current);
    }

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('resize', updateBounds);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <div
      ref={cardContainerRef}
      className={`hanging-id-card-wrapper ${isHovered ? 'is-hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div ref={cardElementRef} className="hanging-badge-rig">
        <div className="badge-strap-ext badge-strap-ext-left" aria-hidden="true" />
        <div className="badge-strap-ext badge-strap-ext-right" aria-hidden="true" />

        <img
          src={getAssetUrl('images/id-badge-current.png')}
          alt="Jahnvi Agarwal — Video Editor ID Card Badge"
          className="hanging-badge-img"
          loading="eager"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default HangingIDCard;

