import React from 'react';
import { PROFILE_DATA, getWhatsAppUrl } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const { contact } = PROFILE_DATA;

  return (
    <section id="contact" className="contact-section" aria-label="Contact Jahnvi Agarwal">
      <div className="site-container">
        <div className="contact-card-wrap">
          {/* Headline: Got a video in mind? */}
          <h2 className="contact-main-heading reveal-on-scroll reveal-heading">
            {contact.heading}
          </h2>

          {/* Subheading: Let's make something worth watching. */}
          <p
            className="contact-copy-line reveal-on-scroll reveal-text"
            style={{ '--stagger-index': 1 } as React.CSSProperties}
          >
            {contact.subCopy}
          </p>

          {/* CTA: HIT ME UP (Redirects to WhatsApp with pre-filled message) */}
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
        </div>
      </div>
    </section>
  );
};

export default Contact;
