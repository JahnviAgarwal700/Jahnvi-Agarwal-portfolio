import React from 'react';
import { PROFILE_DATA, getWhatsAppUrl } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const { footer, contact } = PROFILE_DATA;

  return (
    <footer className="minimal-footer" role="contentinfo">
      <div className="site-container">
        {/* Three Contact Details moved from contact section into the footer */}
        <div className="footer-contact-row" data-reveal-group>
          {/* Email */}
          <a
            href={`mailto:${contact.email}`}
            className="footer-contact-link reveal-on-scroll reveal-item"
            style={{ '--stagger-index': 0 } as React.CSSProperties}
            aria-label={`Email ${contact.email}`}
          >
            <svg
              className="footer-contact-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F5A623"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span className="footer-contact-text">{contact.email}</span>
          </a>

          {/* WhatsApp */}
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-contact-link reveal-on-scroll reveal-item"
            style={{ '--stagger-index': 1 } as React.CSSProperties}
            aria-label={`WhatsApp ${contact.whatsapp}`}
          >
            <svg
              className="footer-contact-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F5A623"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span className="footer-contact-text">{contact.whatsapp}</span>
          </a>

          {/* Instagram */}
          <a
            href={contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-contact-link reveal-on-scroll reveal-item"
            style={{ '--stagger-index': 2 } as React.CSSProperties}
            aria-label={`Instagram ${contact.instagramHandle}`}
          >
            <svg
              className="footer-contact-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F5A623"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            <span className="footer-contact-text">{contact.instagramHandle}</span>
          </a>
        </div>

        <div className="footer-divider" />

        <div className="footer-layout" data-reveal-group>
          <div
            className="footer-identity reveal-on-scroll reveal-text"
            style={{ '--stagger-index': 3 } as React.CSSProperties}
          >
            <span className="footer-name">{footer.name}</span>
            <span className="footer-role">{footer.role}</span>
          </div>

          <div
            className="footer-location reveal-on-scroll reveal-text"
            style={{ '--stagger-index': 4 } as React.CSSProperties}
          >
            {footer.location}
          </div>

          <div
            className="footer-copy reveal-on-scroll reveal-text"
            style={{ '--stagger-index': 5 } as React.CSSProperties}
          >
            {footer.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
