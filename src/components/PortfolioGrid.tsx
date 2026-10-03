import React from 'react';
import { Project, PROJECTS } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';

interface PortfolioGridProps {
  onSelectProject: (project: Project) => void;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ onSelectProject }) => {
  return (
    <section id="work" className="section-selected-work" aria-label="My Recent Work">
      <div className="site-container">
        {/* Section Heading & Subtitle */}
        <div className="work-header">
          <h2 className="section-heading reveal-on-scroll reveal-heading">
            My Recent Work
          </h2>
          <p
            className="section-subline reveal-on-scroll reveal-text"
            style={{ '--stagger-index': 1 } as React.CSSProperties}
          >
            A selection of videos, campaigns and content I've edited.
          </p>
        </div>

        {/* 3-Column x 3-Row Editorial Grid (9 Blocks) */}
        <div className="work-grid" data-reveal-group>
          {PROJECTS.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onSelect={onSelectProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
