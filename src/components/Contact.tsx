import React from 'react';
import { PROFILE_DATA, getWhatsAppUrl } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const { contact } = PROFILE_DATA;

  return (
    <section id="contact" className="contact-section" aria-label="Contact Jahnvi Agarwal">
      <div className="site-container">
        <div className="contact-card-wrap">
          <h2 className="contact-main-heading reveal-on-scroll reveal-heading">
            {contact.heading}
          </h2>

          <div className="contact-copy-group">
            <p
              className="contact-copy-line reveal-on-scroll reveal-text"
              style={{ '--stagger-index': 1 } as React.CSSProperties}
            >
              {contact.subCopy}
            </p>
            <p
              className="contact-copy-callout reveal-on-scroll reveal-text"
              style={{ '--stagger-index': 2 } as React.CSSProperties}
            >
              {contact.callout}
            </p>
          </div>

          <div
            className="contact-cta-wrapper reveal-on-scroll reveal-btn"
            style={{ '--stagger-index': 3 } as React.CSSProperties}
          >
            <a
              href={`mailto:${contact.email}?subject=Video%20Editing%20Inquiry%20%E2%80%94%20Jahnvi%20Agarwal`}
              className="btn-primary btn-maroon-cta"
            >
              {contact.buttonText}
            </a>
          </div>

          {/* Clean Contact Links */}
          <div className="contact-channels-row" data-reveal-group>
            <a
              href={`mailto:${contact.email}`}
              className="contact-channel-link reveal-on-scroll reveal-item"
              style={{ '--stagger-index': 4 } as React.CSSProperties}
            >
              <span className="channel-type">Email</span>
              <span className="channel-handle">{contact.email}</span>
            </a>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-link reveal-on-scroll reveal-item"
              style={{ '--stagger-index': 5 } as React.CSSProperties}
            >
              <span className="channel-type">WhatsApp</span>
              <span className="channel-handle">{contact.whatsapp}</span>
            </a>

            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-link reveal-on-scroll reveal-item"
              style={{ '--stagger-index': 6 } as React.CSSProperties}
            >
              <span className="channel-type">Instagram</span>
              <span className="channel-handle">{contact.instagramHandle}</span>
            </a>

            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-link reveal-on-scroll reveal-item"
              style={{ '--stagger-index': 7 } as React.CSSProperties}
            >
              <span className="channel-type">LinkedIn</span>
              <span className="channel-handle">{contact.linkedinHandle}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
