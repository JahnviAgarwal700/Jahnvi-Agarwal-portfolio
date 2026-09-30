import React, { useState, useEffect } from 'react';
import { PROFILE_DATA } from '../data/portfolioData';
import { HeroDecorativeShapes } from './HeroDecorativeShapes';
import { HangingIDCard } from './HangingIDCard';

interface HeroProps {
  onOpenMedia?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const [typedName, setTypedName] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fullName = 'Jahnvi Agarwal.';
    let currentIndex = 0;

    // Start typing the whole name shortly after page load
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        currentIndex++;
        setTypedName(fullName.slice(0, currentIndex));
        if (currentIndex >= fullName.length) {
          clearInterval(interval);
          setIsTypingComplete(true);
        }
      }, 75);

      return () => clearInterval(interval);
    }, 280);

    return () => clearTimeout(startTimeout);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      className="hero-section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Jahnvi Agarwal — Video Editor"
    >
      {/* 
        Abstract Decorative Video-Editor Workspace Shapes
        - Palette: Dark Golden Yellow #D99F00 and Secondary Gold #E8B400 at 10-30% opacity
        - Elements: Playheads, framing crosshairs, keyframes, bezier squiggles, dots, arcs
        - Interactive subtle parallax response to mouse movements
      */}
      <HeroDecorativeShapes mouseX={mousePos.x} mouseY={mousePos.y} />

      <div className="site-container hero-container">
        <div className="hero-layout">
          {/* Left Column: 58-60% width Editorial Text Composition */}
          <div className="hero-content">
            {/* Top Header Row: Name & Role */}
            <div className="hero-header-row">
              <div className="hero-title-group">
                {/* Primary Headline with dynamic typing effect for whole name */}
                <div className="hero-headline-block">
                  <h1 className="hero-name" aria-label="Jahnvi Agarwal.">
                    <span>{typedName}</span>
                    <span
                      className={`hero-cursor ${isTypingComplete ? 'is-blinking' : ''}`}
                      aria-hidden="true"
                    >
                      |
                    </span>
                  </h1>
                </div>

                {/* Video Editor: in Instrument Serif Italic */}
                <div className="hero-role">
                  Video Editor
                </div>
              </div>
            </div>

            {/* Bio Description */}
            <p className="hero-desc">
              {PROFILE_DATA.heroStatement}
            </p>

            {/* CTA Group: VIEW MY WORK & CONNECT */}
            <div className="hero-cta-wrap">
              <a href="#work" className="btn-hero-work">
                VIEW MY WORK
              </a>
              <a href="#contact" className="btn-hero-connect">
                CONNECT
              </a>
            </div>
          </div>

          {/* Right Column: Realistic Hanging Physical ID-Card Photo Badge */}
          <div className="hero-visual-col">
            <HangingIDCard mouseX={mousePos.x} mouseY={mousePos.y} />
          </div>
        </div>
      </div>
    </section>
  );
};
