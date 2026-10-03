import React from 'react';
import { PROFILE_DATA, getWhatsAppUrl } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const { contact } = PROFILE_DATA;

  return (
    <section id="contact" className="contact-section" aria-label="Contact Jahnvi Agarwal">
      <div className="site-container">
        <div className="contact-card-wrap">
          {/* Headline: Have a video in mind? */}
          <h2 className="contact-main-heading reveal-on-scroll reveal-heading">
            {contact.heading}
          </h2>

          {/* Subheading: Send me the footage or brief. */}
          <p
            className="contact-copy-line reveal-on-scroll reveal-text"
            style={{ '--stagger-index': 1 } as React.CSSProperties}
          >
            {contact.subCopy}
          </p>

          {/* CTA: LET'S CONNECT (Redirects to WhatsApp with pre-filled message) */}
          <div
            className="contact-cta-wrapper reveal-on-scroll reveal-btn"
            style={{ '--stagger-index': 2 } as React.CSSProperties}
          >
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-maroon-cta"
              aria-label="Connect on WhatsApp"
            >
              {contact.buttonText}
            </a>
          </div>

          {/* Clean Contact Links in Single Horizontal Row with Yellow Icons */}
          <div className="contact-channels-row" data-reveal-group>
            {/* Email */}
            <a
              href={`mailto:${contact.email}`}
              className="contact-channel-link reveal-on-scroll reveal-item"
              style={{ '--stagger-index': 3 } as React.CSSProperties}
            >
              <svg
                className="contact-icon"
                width="20"
                height="20"
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
              <span className="channel-handle">{contact.email}</span>
            </a>

            {/* WhatsApp */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-link reveal-on-scroll reveal-item"
              style={{ '--stagger-index': 4 } as React.CSSProperties}
            >
              <svg
                className="contact-icon"
                width="20"
                height="20"
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
              <span className="channel-handle">{contact.whatsapp}</span>
            </a>

            {/* Instagram */}
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-link reveal-on-scroll reveal-item"
              style={{ '--stagger-index': 5 } as React.CSSProperties}
            >
              <svg
                className="contact-icon"
                width="20"
                height="20"
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
              <span className="channel-handle">{contact.instagramHandle}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
