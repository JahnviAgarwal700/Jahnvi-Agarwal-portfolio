import React from 'react';
import { PROFILE_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const { footer } = PROFILE_DATA;

  return (
    <footer className="minimal-footer" role="contentinfo">
      <div className="site-container">
        <div className="footer-layout" data-reveal-group>
          <div
            className="footer-identity reveal-on-scroll reveal-text"
            style={{ '--stagger-index': 0 } as React.CSSProperties}
          >
            <span className="footer-name">{footer.name}</span>
            <span className="footer-role">{footer.role}</span>
          </div>

          <div
            className="footer-location reveal-on-scroll reveal-text"
            style={{ '--stagger-index': 1 } as React.CSSProperties}
          >
            {footer.location}
          </div>

          <div
            className="footer-copy reveal-on-scroll reveal-text"
            style={{ '--stagger-index': 2 } as React.CSSProperties}
          >
            {footer.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
};
