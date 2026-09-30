import React from 'react';
import { PROFILE_DATA } from '../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section id="about" className="about-me-section" aria-label="About Jahnvi Agarwal">
      <div className="site-container">
        <div className="about-me-layout">
          {/* Left Column: Personal Copy */}
          <div className="about-me-text-col">
            <h2 className="section-heading reveal-on-scroll reveal-heading">
              {PROFILE_DATA.about.heading}
            </h2>

            <div className="about-me-paragraphs" data-reveal-group>
              {PROFILE_DATA.about.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="about-p reveal-on-scroll reveal-text"
                  style={{ '--stagger-index': idx + 1 } as React.CSSProperties}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Right Column: Large Rounded Personal Photo/Workspace Placeholder */}
          <div
            className="about-me-photo-col reveal-on-scroll reveal-media"
            style={{ '--stagger-index': 1 } as React.CSSProperties}
          >
            <div className="about-photo-frame">
              <img
                src="/images/about-workspace.svg"
                alt="Jahnvi Agarwal — Editor Desk & Workspace Media Placeholder"
                className="about-photo-asset"
                loading="lazy"
              />
              <div className="about-photo-caption">
                Jahnvi Agarwal · Video Editor Workspace
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
