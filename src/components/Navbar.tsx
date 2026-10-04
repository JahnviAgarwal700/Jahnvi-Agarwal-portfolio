import React, { useState, useEffect } from 'react';
import { PROFILE_DATA } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="header-inner">
        <a href="#hero" className="brand-logo" onClick={closeMenu} aria-label="Jahnvi Agarwal — Home">
          {PROFILE_DATA.name}
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-links">
            <li><a href="#work" className="nav-link">Work</a></li>
            <li><a href="#about" className="nav-link">About</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>

          <a href="#contact" className="btn-nav-cta">
            Let's Work Together
          </a>
        </nav>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {mobileMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile Drawer Menu (only rendered when open on mobile) */}
      {mobileMenuOpen && (
        <div className="mobile-nav-menu is-open">
          <ul className="mobile-nav-links">
            <li><a href="#work" onClick={closeMenu}>Work</a></li>
            <li><a href="#about" onClick={closeMenu}>About</a></li>
            <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
          </ul>

          <div className="mobile-nav-cta-wrap">
            <a href="#contact" className="btn-primary btn-full" onClick={closeMenu}>
              Let's Work Together
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
