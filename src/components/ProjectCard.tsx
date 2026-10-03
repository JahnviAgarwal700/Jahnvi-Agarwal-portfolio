import React from 'react';
import { Project } from '../data/portfolioData';

interface ProjectCardProps {
  project: Project;
  index?: number;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index = 0,
  onSelect
}) => {
  return (
    <article
      className={`work-card reveal-on-scroll reveal-card ${project.mobileOnly ? 'card-mobile-only' : ''}`}
      style={{ '--stagger-index': index % 3 } as React.CSSProperties}
      tabIndex={0}
      role="button"
      data-cursor-open="true"
      onClick={() => onSelect(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
      aria-label={`View project details: ${project.title}, Category: ${project.category}`}
    >
      {/* 16:9 Clean Minimal Video Focus: No heavy borders or box shadows */}
      <div className="card-media-box" data-cursor-open="true">
        <img
          src={project.thumbnail}
          alt={`${project.title} preview`}
          className="card-media-img"
          loading="lazy"
        />

        {/* Minimal sleek hover overlay */}
        <div className="card-hover-overlay" aria-hidden="true">
          <div className="card-play-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Clean Editorial Meta Underneath */}
      <div className="card-info">
        {/* Title in Bodoni Moda */}
        <h3 className="card-title">
          {project.title}
        </h3>
      </div>
    </article>
  );
};

export default ProjectCard;
