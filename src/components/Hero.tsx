import React, { useState, useEffect } from 'react';
import { PROFILE_DATA, getWhatsAppUrl } from '../data/portfolioData';
import { HeroDecorativeShapes } from './HeroDecorativeShapes';
import { HangingIDCard } from './HangingIDCard';

interface HeroProps {
  onOpenMedia?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const [typedName, setTypedName] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

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

  return (
    <section
      id="hero"
      className="hero-section"
      aria-label="Jahnvi Agarwal — Video Editor"
    >
      {/* Abstract Decorative Video-Editor Workspace Shape */}
      <HeroDecorativeShapes />

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

            {/* Bio Description: in Inter font */}
            <p className="hero-desc">
              {PROFILE_DATA.heroStatement}
            </p>

            {/* CTA Group: VIEW MY WORK & CONNECT */}
            <div className="hero-cta-wrap">
              <a href="#work" className="btn-hero-work">
                VIEW MY WORK
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero-connect"
                aria-label="Connect on WhatsApp"
              >
                CONNECT
              </a>
            </div>
          </div>

          {/* Right Column: Realistic Hanging Physical ID-Card Photo Badge */}
          <div className="hero-visual-col">
            <HangingIDCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

