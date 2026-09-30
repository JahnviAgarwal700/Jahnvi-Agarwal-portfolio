import React from 'react';
import { PROFILE_DATA } from '../data/portfolioData';

export const WhatIEdit: React.FC = () => {
  return (
    <section id="what-i-edit" className="what-i-edit-section" aria-label="What I Edit">
      <div className="site-container">
        <div className="what-i-edit-layout">
          <div className="what-i-edit-header reveal-on-scroll reveal-heading">
            <h2 className="section-heading">
              What I Edit
            </h2>
          </div>

          <div className="what-i-edit-list" role="list" data-reveal-group>
            {PROFILE_DATA.whatIEdit.map((item, index) => (
              <div
                key={index}
                className="edit-category-row reveal-on-scroll reveal-item"
                role="listitem"
                style={{ '--stagger-index': index } as React.CSSProperties}
              >
                <span className="category-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="category-name">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
