import React, { useState, useEffect } from 'react';
import { PROFILE_DATA, getWhatsAppUrl, getAssetUrl } from '../data/portfolioData';
import { HeroDecorativeShapes } from './HeroDecorativeShapes';

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

                {/* Video Editor: in white box with black video icon */}
                <div className="hero-role">
                  <svg
                    className="hero-role-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <rect x="2" y="6" width="13" height="12" rx="2.5" fill="#000000" />
                    <path
                      d="M15 10.24L20.55 6.54C21.22 6.09 22 6.57 22 7.38V16.62C22 17.43 21.22 17.91 20.55 17.46L15 13.76V10.24Z"
                      fill="#000000"
                    />
                  </svg>
                  <span>Video Editor</span>
                </div>
              </div>

              {/* Mobile Top-Right Avatar with Premiere Pro Crop Reveal */}
              <div className="hero-mobile-avatar-wrap" aria-hidden="true">
                <div className="hero-mobile-avatar-frame">
                  <div className="hero-mobile-avatar">
                    <img
                      src={getAssetUrl('images/jahnvi-hero.jpg?v=playbuttons')}
                      alt="Jahnvi Agarwal — Video Editor"
                      className="hero-mobile-avatar-img"
                    />
                  </div>

                  {/* Premiere Pro-style Hand Cursor drawing the crop frame from top-left */}
                  <div className="hero-mobile-hand-cursor" aria-hidden="true">
                    <svg
                      className="hand-cursor-svg"
                      width="26"
                      height="26"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.5 2.5C7.94772 2.5 7.5 2.94772 7.5 3.5V13.89L6.15 12.54C5.75947 12.1495 5.12631 12.1495 4.73579 12.54C4.34526 12.9305 4.34526 13.5637 4.73579 13.9542L8.98579 18.2042C10.5486 19.767 12.6685 20.6455 14.8787 20.6455H16.5C19.8137 20.6455 22.5 17.9592 22.5 14.6455V9.5C22.5 8.94772 22.0523 8.5 21.5 8.5C20.9477 8.5 20.5 8.94772 20.5 9.5V12.5H19.5V6.5C19.5 5.94772 19.0523 5.5 18.5 5.5C17.9477 5.5 17.5 5.94772 17.5 6.5V12.5H16.5V5.5C16.5 4.94772 16.0523 4.5 15.5 4.5C14.9477 4.5 14.5 4.94772 14.5 5.5V12.5H13.5V3.5C13.5 2.94772 13.0523 2.5 12.5 2.5H8.5Z"
                        fill="#FFFFFF"
                        stroke="#111111"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Description: in Inter font */}
            <p className="hero-desc">
              {PROFILE_DATA.heroStatement}
            </p>

            {/* CTA Group: VIEW MY WORK & LET'S CONNECT */}
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
                LET'S CONNECT
              </a>
            </div>
          </div>

          {/* Right Column: Portrait in Cream Frame with Premiere Pro Hand Cursor Crop Reveal */}
          <div className="hero-visual-col">
            <div className="hero-portrait-wrap">
              <div className="hero-portrait-frame">
                <img
                  src={getAssetUrl('images/jahnvi-hero.jpg?v=playbuttons')}
                  alt="Jahnvi Agarwal — Video Editor"
                  className="hero-portrait-img"
                  loading="eager"
                />
              </div>

              {/* Premiere Pro-style Hand Cursor drawing the crop frame from top-left */}
              <div className="hero-hand-cursor" aria-hidden="true">
                <svg
                  className="hand-cursor-svg"
                  width="32"
                  height="32"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.5 2.5C7.94772 2.5 7.5 2.94772 7.5 3.5V13.89L6.15 12.54C5.75947 12.1495 5.12631 12.1495 4.73579 12.54C4.34526 12.9305 4.34526 13.5637 4.73579 13.9542L8.98579 18.2042C10.5486 19.767 12.6685 20.6455 14.8787 20.6455H16.5C19.8137 20.6455 22.5 17.9592 22.5 14.6455V9.5C22.5 8.94772 22.0523 8.5 21.5 8.5C20.9477 8.5 20.5 8.94772 20.5 9.5V12.5H19.5V6.5C19.5 5.94772 19.0523 5.5 18.5 5.5C17.9477 5.5 17.5 5.94772 17.5 6.5V12.5H16.5V5.5C16.5 4.94772 16.0523 4.5 15.5 4.5C14.9477 4.5 14.5 4.94772 14.5 5.5V12.5H13.5V3.5C13.5 2.94772 13.0523 2.5 12.5 2.5H8.5Z"
                    fill="#FFFFFF"
                    stroke="#111111"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

