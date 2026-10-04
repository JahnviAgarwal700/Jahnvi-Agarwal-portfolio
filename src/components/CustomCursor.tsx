import React, { useEffect, useRef } from 'react';
import { getAssetUrl } from '../data/portfolioData';

/**
 * CustomCursor Component (Zero-Latency, Ultra-High Performance)
 * 
 * Replaces system cursor on pointer/mouse devices with the bespoke custom yellow cursor.
 * Features:
 * - Instantaneous 1:1 hardware pointer tracking (zero lerp delay, 0ms input lag)
 * - Micro-inertia tilt on horizontal movement with automatic decay
 * - Instant click compression (scale-down)
 * - Zero background CPU/GPU overhead: NO continuous rAF loop when idle
 * - Auto-hidden over videos and video controls
 * - Completely disabled on mobile / touch devices
 */

const CURSOR_WIDTH = 56;
const CURSOR_HEIGHT = 56;
const HOTSPOT_X = 11.05; // x: 101/512 * 56px
const HOTSPOT_Y = 3.50;  // y: 32/512 * 56px

export const CustomCursor: React.FC = () => {
  const cursorWrapperRef = useRef<HTMLDivElement | null>(null);
  const cursorGraphicRef = useRef<HTMLDivElement | null>(null);
  const rippleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 1. Mobile & Touch Detection: Disable custom cursor on touch/coarse devices
    const isTouchDevice =
      ('ontouchstart' in window) ||
      window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
      navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      return;
    }

    // Enable custom cursor styles on <html>
    document.documentElement.classList.add('custom-cursor-enabled');

    const wrapper = cursorWrapperRef.current;
    const graphic = cursorGraphicRef.current;
    const ripple = rippleRef.current;
    if (!wrapper || !graphic || !ripple) return;

    // State
    let isHovering = false;
    let isClicking = false;
    let isOverVideo = false;
    let isOpenMode = false;
    let isVisible = false;

    let prevX = -100;
    let tiltDecayTimeout: number | null = null;
    let currentTilt = 0;

    // 2. Audio Engine for Click Sound (Lazy-initialized)
    let audioCtx: AudioContext | null = null;
    let clickBuffer: AudioBuffer | null = null;
    let lastSoundTime = 0;
    let audioInitialized = false;

    const initAudio = () => {
      if (audioInitialized) return;
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

        if (AudioContextClass) {
          audioCtx = new AudioContextClass();
          fetch(getAssetUrl('sounds/click.wav'))
            .then((res) => {
              if (res.ok) return res.arrayBuffer();
              throw new Error('Sound not found');
            })
            .then((buf) => {
              if (buf && audioCtx) {
                return audioCtx.decodeAudioData(buf);
              }
              return null;
            })
            .then((decoded) => {
              clickBuffer = decoded || null;
            })
            .catch(() => {});
        }
        audioInitialized = true;
      } catch (_) {}
    };

    const playClickSound = () => {
      const now = performance.now();
      if (now - lastSoundTime < 50) return;
      lastSoundTime = now;

      if (!audioInitialized) {
        initAudio();
      }

      if (!audioCtx) return;

      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      try {
        const masterGain = audioCtx.createGain();
        masterGain.gain.setValueAtTime(0.18, audioCtx.currentTime);
        masterGain.connect(audioCtx.destination);

        if (clickBuffer) {
          const source = audioCtx.createBufferSource();
          source.buffer = clickBuffer;
          source.connect(masterGain);
          source.start(0);
        } else {
          const t0 = audioCtx.currentTime;
          const osc = audioCtx.createOscillator();
          const clickGain = audioCtx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(1250, t0);
          osc.frequency.exponentialRampToValueAtTime(260, t0 + 0.022);

          clickGain.gain.setValueAtTime(0.9, t0);
          clickGain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.024);

          osc.connect(clickGain);
          clickGain.connect(masterGain);

          osc.start(t0);
          osc.stop(t0 + 0.025);
        }
      } catch (_) {}
    };

    // Update target state only on element boundary transitions
    let lastTarget: EventTarget | null = null;
    let lastHoverState = false;
    let lastOpenMode = false;

    const updateTargetState = (target: HTMLElement | null) => {
      if (!target) return;

      const openTarget = Boolean(
        target.closest('[data-cursor-open="true"], .card-media-box, .work-card')
      );
      if (openTarget !== lastOpenMode) {
        isOpenMode = openTarget;
        lastOpenMode = openTarget;
        if (openTarget) {
          wrapper.classList.add('is-open-mode');
        } else {
          wrapper.classList.remove('is-open-mode');
        }
      }

      const overVideo = Boolean(
        target.closest('video, .video-player-container, .video-wrapper, iframe, .allow-system-cursor')
      );
      isOverVideo = overVideo && !isOpenMode;

      const isInteractive = Boolean(
        target.closest(
          'a, button, [role="button"], input, select, textarea, .project-card, .btn-hero-work, .btn-hero-connect, .nav-link, .modal-close-btn, .playlist-track, .portfolio-card, .desk-mosaic-item, .desk-mosaic-img, .desk-lightbox-close'
        )
      );
      isHovering = isInteractive && !isOverVideo && !isOpenMode;

      if (isHovering !== lastHoverState) {
        lastHoverState = isHovering;
        if (isHovering) {
          graphic.classList.add('is-hovering');
        } else {
          graphic.classList.remove('is-hovering');
        }
        applyGraphicTransform();
      }

      // Hide or show cursor
      if (isOverVideo) {
        wrapper.style.opacity = '0';
      } else if (isVisible) {
        wrapper.style.opacity = '1';
      }
    };

    const applyGraphicTransform = () => {
      const scaleStr = isClicking ? ' scale(0.85)' : isHovering ? ' scale(1.12)' : '';
      const tiltStr = currentTilt !== 0 ? ` rotate(${currentTilt.toFixed(1)}deg)` : '';
      graphic.style.transform = `${tiltStr}${scaleStr}`;
    };

    // Instantaneous 1:1 hardware pointer tracking (Zero Lerp Lag!)
    const handlePointerMove = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (!isOverVideo) {
          wrapper.style.opacity = '1';
        }
      }

      // Direct transform translation: 0ms delay, instantaneous cursor tracking
      const renderX = x - HOTSPOT_X;
      const renderY = y - HOTSPOT_Y;
      wrapper.style.transform = `translate3d(${renderX}px, ${renderY}px, 0)`;

      // Directional velocity micro-tilt
      if (prevX !== -100) {
        const velX = x - prevX;
        const targetTilt = Math.max(-5.5, Math.min(5.5, velX * 0.32));
        if (Math.abs(targetTilt) > 0.5) {
          currentTilt = targetTilt;
          applyGraphicTransform();

          if (tiltDecayTimeout) clearTimeout(tiltDecayTimeout);
          tiltDecayTimeout = window.setTimeout(() => {
            currentTilt = 0;
            applyGraphicTransform();
          }, 70);
        }
      }
      prevX = x;

      // Element boundary check
      if (e.target !== lastTarget) {
        lastTarget = e.target;
        updateTargetState(e.target as HTMLElement | null);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;

      isClicking = true;
      if (isOpenMode) {
        wrapper.classList.add('is-clicking-open');
      }
      graphic.classList.add('is-clicking');
      applyGraphicTransform();

      initAudio();
      playClickSound();

      // Trigger ripple
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      ripple.classList.remove('is-active');
      void ripple.offsetWidth;
      ripple.classList.add('is-active');
    };

    const handlePointerUp = () => {
      isClicking = false;
      wrapper.classList.remove('is-clicking-open');
      graphic.classList.remove('is-clicking');
      applyGraphicTransform();
    };

    const handleMouseLeave = () => {
      isVisible = false;
      wrapper.style.opacity = '0';
    };

    const handleMouseEnter = (e: MouseEvent) => {
      isVisible = true;
      const renderX = e.clientX - HOTSPOT_X;
      const renderY = e.clientY - HOTSPOT_Y;
      wrapper.style.transform = `translate3d(${renderX}px, ${renderY}px, 0)`;
      if (!isOverVideo) {
        wrapper.style.opacity = '1';
      }
    };

    // Event listeners
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      if (tiltDecayTimeout) clearTimeout(tiltDecayTimeout);
      document.documentElement.classList.remove('custom-cursor-enabled');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (audioCtx) {
        audioCtx.close().catch(() => {});
      }
    };
  }, []);

  return (
    <>
      <div
        ref={cursorWrapperRef}
        className="custom-cursor-wrapper"
        aria-hidden="true"
      >
        <div ref={cursorGraphicRef} className="custom-cursor-graphic">
          <img
            src={getAssetUrl('images/custom-cursor.png')}
            alt=""
            className="custom-cursor-img"
            width={CURSOR_WIDTH}
            height={CURSOR_HEIGHT}
            draggable={false}
          />
        </div>

        <div className="custom-cursor-open-badge">
          <span className="badge-open-text">OPEN</span>
        </div>
      </div>

      <div
        ref={rippleRef}
        className="custom-cursor-ripple"
        aria-hidden="true"
      />
    </>
  );
};

export default CustomCursor;
