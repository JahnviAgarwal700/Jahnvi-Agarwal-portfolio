import React from 'react';
import { PROFILE_DATA } from '../data/portfolioData';

export const ProofSection: React.FC = () => {
  return (
    <section id="proof" className="proof-statement-section" aria-label="900K+ YouTube Proof">
      <div className="site-container">
        <div className="proof-content" data-reveal-group>
          <div
            className="proof-huge-number reveal-on-scroll reveal-stat"
            style={{ '--stagger-index': 0 } as React.CSSProperties}
          >
            {PROFILE_DATA.proof.number}
          </div>

          <div
            className="proof-sublabel reveal-on-scroll reveal-heading"
            style={{ '--stagger-index': 1 } as React.CSSProperties}
          >
            {PROFILE_DATA.proof.label}
          </div>

          <p
            className="proof-narrative reveal-on-scroll reveal-text"
            style={{ '--stagger-index': 2 } as React.CSSProperties}
          >
            {PROFILE_DATA.proof.copy}
          </p>
        </div>
      </div>
    </section>
  );
};
