import React, { useEffect, useRef } from 'react';

/**
 * CustomCursor Component
 * 
 * Replaces system cursor on pointer/mouse devices with the bespoke custom yellow cursor.
 * Features:
 * - Ultra-smooth 60/120fps rAF loop with adaptive lerp (near-zero perceived latency)
 * - Micro-inertia tilt on directional changes
 * - Subtle idle floating/breathing movement
 * - Magnetic attraction to interactive elements (a, button, cards) by 3-5px
 * - Tactile click compression (15-20% scale-down + rotate) with elastic spring-back
 * - Single reused circular ripple element on click
 * - Tactile Web Audio / click.wav sound effect (debounced, autoplay safe)
 * - Auto-hidden over videos and video controls
 * - Completely disabled on mobile / touch devices
 */

// Precise hotspot coordinates calculated from the 512x512 asset at 56px display size
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

    // Movement & Physics State
    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;
    let prevCursorX = -100;
    let currentTilt = 0;
    let magnetOffsetX = 0;
    let magnetOffsetY = 0;

    let isHovering = false;
    let isClicking = false;
    let isOverVideo = false;
    let isOpenMode = false;
    let isOutside = true;
    let rafId: number;

    // 2. Audio Engine for Click Sound
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
          // Load click.wav asset asynchronously
          fetch('/sounds/click.wav')
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
            .catch(() => {
              // Sound will fallback to high-precision Web Audio synthesis
            });
        }
        audioInitialized = true;
      } catch (_) {}
    };

    const playClickSound = () => {
      const now = performance.now();
      // Debounce: prevent duplicate overlapping sound triggers
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
          // Fallback: Synthesize crisp mechanical switch click
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

    // 3. Pointer Tracking & Magnetism
    const handlePointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (isOutside) {
        isOutside = false;
        cursorX = mouseX;
        cursorY = mouseY;
        prevCursorX = cursorX;
      }

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if mouse is over an openable video card in selected work
      const openTarget = Boolean(
        target.closest('[data-cursor-open="true"], .card-media-box, .work-card')
      );
      isOpenMode = openTarget;

      if (isOpenMode) {
        wrapper.classList.add('is-open-mode');
      } else {
        wrapper.classList.remove('is-open-mode');
      }

      // Check if mouse is over a playing video player or modal container
      const overVideo = Boolean(
        target.closest('video, .video-player-container, .video-wrapper, iframe, .allow-system-cursor')
      );
      isOverVideo = overVideo && !isOpenMode;

      // Check if hovering an interactive link/button
      const interactiveEl = target.closest(
        'a, button, [role="button"], input, select, textarea, .project-card, .btn-hero-work, .btn-hero-connect, .nav-link, .modal-close-btn, .playlist-track, .portfolio-card'
      ) as HTMLElement | null;

      if (interactiveEl && !isOverVideo && !isOpenMode) {
        isHovering = true;
        // Calculate gentle magnetic attraction (max 5px)
        const rect = interactiveEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = centerX - mouseX;
        const dy = centerY - mouseY;
        const dist = Math.hypot(dx, dy);

        if (dist > 0) {
          const pull = Math.min(5, dist * 0.08);
          magnetOffsetX = (dx / dist) * pull;
          magnetOffsetY = (dy / dist) * pull;
        }
      } else {
        isHovering = false;
        magnetOffsetX = 0;
        magnetOffsetY = 0;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      // Left click only
      if (e.button !== 0) return;

      isClicking = true;
      if (isOpenMode) {
        wrapper.classList.add('is-clicking-open');
      }
      initAudio();
      playClickSound();

      // Trigger circular ripple at click coordinate
      const clickX = e.clientX;
      const clickY = e.clientY;

      ripple.style.left = `${clickX}px`;
      ripple.style.top = `${clickY}px`;
      ripple.classList.remove('is-active');
      // Trigger reflow to restart CSS keyframe animation
      void ripple.offsetWidth;
      ripple.classList.add('is-active');

      graphic.classList.add('is-clicking');
    };

    const handlePointerUp = () => {
      isClicking = false;
      wrapper.classList.remove('is-clicking-open');
      graphic.classList.remove('is-clicking');
    };

    const handleMouseLeave = () => {
      isOutside = true;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      isOutside = false;
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // 4. Ultra-Smooth 60/120fps Animation Loop
    const renderLoop = () => {
      if (!isOutside) {
        const targetX = mouseX + magnetOffsetX;
        const targetY = mouseY + magnetOffsetY;

        // Fluid, ultra-creamy adaptive lerp:
        const dist = Math.hypot(targetX - cursorX, targetY - cursorY);
        const lerp = Math.min(0.55, Math.max(0.24, dist * 0.010));

        cursorX += (targetX - cursorX) * lerp;
        cursorY += (targetY - cursorY) * lerp;

        // Smooth directional inertia tilt (clamped to ±5.5deg with exponential easing)
        const velX = cursorX - prevCursorX;
        prevCursorX = cursorX;
        const targetTilt = Math.max(-5.5, Math.min(5.5, velX * 0.38));
        currentTilt += (targetTilt - currentTilt) * 0.18;

        // Subtle idle floating/breathing movement when cursor is nearly stationary
        const time = performance.now() * 0.0022;
        const idleFloatY = isHovering || isClicking || isOpenMode || dist > 2 ? 0 : Math.sin(time) * 1.2;

        // Always position wrapper at precise pointer hotspot so cursor remains visible
        const renderX = cursorX - HOTSPOT_X;
        const renderY = cursorY - HOTSPOT_Y + idleFloatY;
        wrapper.style.transform = `translate3d(${renderX.toFixed(2)}px, ${renderY.toFixed(2)}px, 0)`;

        // Apply directional inertia tilt to inner graphic
        graphic.style.setProperty('--cursor-tilt', `${currentTilt.toFixed(2)}deg`);

        // Handle hover state class for scale & elastic response
        if (isHovering || isOpenMode) {
          graphic.classList.add('is-hovering');
        } else {
          graphic.classList.remove('is-hovering');
        }

        // Handle visibility (hide over video or outside window)
        const shouldHide = isOutside || isOverVideo;
        wrapper.style.opacity = shouldHide ? '0' : '1';
      } else {
        wrapper.style.opacity = '0';
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    rafId = requestAnimationFrame(renderLoop);

    // Event listeners
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      cancelAnimationFrame(rafId);
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
      {/* Outer wrapper: position-translated via translate3d */}
      <div
        ref={cursorWrapperRef}
        className="custom-cursor-wrapper"
        aria-hidden="true"
      >
        {/* Inner graphic: handles scale, click compression, rotation & idle hover */}
        <div ref={cursorGraphicRef} className="custom-cursor-graphic">
          <img
            src="/images/custom-cursor.png"
            alt=""
            className="custom-cursor-img"
            width={CURSOR_WIDTH}
            height={CURSOR_HEIGHT}
            draggable={false}
          />
        </div>

        {/* Rounded block titled "OPEN" shown automatically over video cards */}
        <div className="custom-cursor-open-badge">
          <span className="badge-open-text">OPEN</span>
        </div>
      </div>

      {/* Single reused click ripple element */}
      <div
        ref={rippleRef}
        className="custom-cursor-ripple"
        aria-hidden="true"
      />
    </>
  );
};

export default CustomCursor;
