import React from 'react';
import { PROFILE_DATA } from '../data/portfolioData';

export const BehindTheEdit: React.FC = () => {
  const { behindTheEdit } = PROFILE_DATA;

  return (
    <section id="behind-the-edit" className="behind-the-edit-section" aria-label="Behind the Edit: Setup and Workflow">
      <div className="site-container">
        {/* Section Heading */}
        <div className="behind-header">
          <h2 className="section-heading reveal-on-scroll reveal-heading">
            {behindTheEdit.heading}
          </h2>
        </div>

        {/* Two Small Editorial Blocks */}
        <div className="behind-grid">
          {/* BLOCK 1: MY SETUP */}
          <div className="behind-block setup-block">
            <h3 className="block-title reveal-on-scroll reveal-heading">
              {behindTheEdit.setup.title}
            </h3>

            {/* Visual Setup / Workstation Media Area */}
            <div
              className="setup-media-box reveal-on-scroll reveal-media"
              style={{ '--stagger-index': 1 } as React.CSSProperties}
            >
              <img
                src="/images/hero-preview.svg"
                alt="Jahnvi Agarwal — Editing Rig & Setup"
                className="setup-media-img"
                loading="lazy"
              />
              <div className="setup-media-caption">
                Premiere Pro Suite · 4K Color-Accurate Timeline Scrubbing
              </div>
            </div>

            {/* Setup Items List */}
            <div className="setup-specs-list" data-reveal-group>
              {behindTheEdit.setup.items.map((item, idx) => (
                <div
                  key={idx}
                  className="spec-row reveal-on-scroll reveal-item"
                  style={{ '--stagger-index': idx + 2 } as React.CSSProperties}
                >
                  <span className="spec-name">{item.label}</span>
                  <span className="spec-val">{item.spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* BLOCK 2: MY WORKFLOW */}
          <div className="behind-block workflow-block">
            <h3
              className="block-title reveal-on-scroll reveal-heading"
              style={{ '--stagger-index': 1 } as React.CSSProperties}
            >
              {behindTheEdit.workflow.title}
            </h3>

            <div className="workflow-flow-container" data-reveal-group>
              {behindTheEdit.workflow.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="workflow-step-node reveal-on-scroll reveal-item"
                  style={{ '--stagger-index': idx + 2 } as React.CSSProperties}
                >
                  <div className="step-content">
                    <span className="step-num">0{idx + 1}</span>
                    <span className="step-text">{step}</span>
                  </div>

                  {idx < behindTheEdit.workflow.steps.length - 1 && (
                    <div className="workflow-step-arrow" aria-hidden="true">
                      ↓
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p
              className="workflow-subtext reveal-on-scroll reveal-text"
              style={{ '--stagger-index': 6 } as React.CSSProperties}
            >
              AI serves as an accelerator for transcription, audio cleaning, and visual research — paired with deliberate timeline editing in Premiere Pro.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
