import React, { useEffect, useRef, useState } from 'react';
import { Project, PROJECTS, PlaylistItem } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

function getEmbedUrl(url: string): string {
  if (!url) return '';
  if (url.includes('youtube.com/watch?v=') || url.includes('youtube.com/watch')) {
    const match = url.match(/[?&]v=([^&]+)/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return url;
}

function isEmbeddableVideo(url: string): boolean {
  return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com') || url.includes('/embed/');
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSelectProject
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const fullVideoRef = useRef<HTMLVideoElement>(null);
  const shortVideoRef = useRef<HTMLVideoElement>(null);
  const extraVideoRef = useRef<HTMLVideoElement>(null);
  const [activePlaylistIndex, setActivePlaylistIndex] = useState(0);
  const [dualSubView, setDualSubView] = useState<'dual' | 'extra'>('dual');

  useEffect(() => {
    setActivePlaylistIndex(0);
    setDualSubView('dual');
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    dialogRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [project]);

  if (!project) return null;

  const currentIndex = PROJECTS.findIndex(p => p.id === project.id);
  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length;
    onSelectProject(PROJECTS[prevIndex]);
  };
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % PROJECTS.length;
    onSelectProject(PROJECTS[nextIndex]);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Mutual exclusion: pause the other video so they never play simultaneously
  const handleFullPlay = () => {
    if (shortVideoRef.current && !shortVideoRef.current.paused) {
      shortVideoRef.current.pause();
    }
  };

  const handleShortPlay = () => {
    if (fullVideoRef.current && !fullVideoRef.current.paused) {
      fullVideoRef.current.pause();
    }
  };

  const handleSwitchSubView = (view: 'dual' | 'extra') => {
    if (view === 'extra') {
      if (fullVideoRef.current && !fullVideoRef.current.paused) fullVideoRef.current.pause();
      if (shortVideoRef.current && !shortVideoRef.current.paused) shortVideoRef.current.pause();
    } else {
      if (extraVideoRef.current && !extraVideoRef.current.paused) extraVideoRef.current.pause();
    }
    setDualSubView(view);
  };

  const hasPlaylist = Boolean(project.playlist && project.playlist.length > 0);
  const activePlaylistItem: PlaylistItem | undefined =
    hasPlaylist && project.playlist ? project.playlist[activePlaylistIndex] || project.playlist[0] : undefined;

  const currentVideoUrl = activePlaylistItem?.videoUrl || project.videoUrl || '';
  const currentPoster = activePlaylistItem?.thumbnail || project.thumbnail || '';
  const currentTitle = activePlaylistItem?.title || project.title || '';
  const currentDescription = activePlaylistItem?.description || project.description || '';
  const isEmbed = isEmbeddableVideo(currentVideoUrl);
  const embedUrl = isEmbed ? getEmbedUrl(currentVideoUrl) : '';
  const isVertical = project.aspectRatio === '9:16' || !!(currentVideoUrl && (currentVideoUrl.toLowerCase().includes('varun') || currentVideoUrl.toLowerCase().includes('reel')));
  const isWide = Boolean(project.dualVideos || hasPlaylist);

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div className={`modal-container ${isWide ? 'modal-container-wide' : ''}`} ref={dialogRef} tabIndex={-1}>
        {/* Close Button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close Project Viewer (Esc)"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {project.dualVideos ? (
          /* ====================================================================
             CASE STUDY: DUAL-VIDEO CONTENT REPURPOSING PRESENTATION
             ==================================================================== */
          <div className="dual-modal-content">
            {/* Top Header */}
            <div className="dual-modal-header">
              <span className="dual-modal-pill">
                {project.dualVideos.subheading}
              </span>

              <h2 id="modal-project-title" className="dual-modal-title">
                {project.heading || project.title}
              </h2>

              {project.extraVideo && (
                <div className="dual-track-toggle-bar">
                  <button
                    type="button"
                    className={`dual-toggle-btn ${dualSubView === 'dual' ? 'is-active' : ''}`}
                    onClick={() => handleSwitchSubView('dual')}
                  >
                    <span className="toggle-dot" />
                    <span>Varun &amp; Maya (Dual Formats)</span>
                  </button>
                  <button
                    type="button"
                    className={`dual-toggle-btn ${dualSubView === 'extra' ? 'is-active' : ''}`}
                    onClick={() => handleSwitchSubView('extra')}
                  >
                    <span className="toggle-dot" />
                    <span>{project.extraVideo.title}</span>
                    {project.extraVideo.duration && (
                      <span className="dual-btn-duration">{project.extraVideo.duration}</span>
                    )}
                  </button>
                </div>
              )}
            </div>

            {dualSubView === 'dual' ? (
              <>
                {/* Video Presentation: Side-by-Side Desktop / Stacked Mobile */}
                <div className="dual-videos-area">
                  <div className={`dual-videos-grid ${project.dualVideos.shortForm.aspectRatio === '16:9' ? 'dual-both-widescreen' : ''}`}>
                    {/* Left: Video 1 */}
                    <div className={`dual-video-col ${project.dualVideos.shortForm.aspectRatio === '16:9' ? 'dual-col-equal' : 'dual-col-full'}`}>
                      <div className="dual-col-header">
                        <span className="dual-badge-pill">{project.dualVideos.fullLength.label}</span>
                        <span className="dual-format-badge">{project.dualVideos.fullLength.aspectRatio || '16:9'}</span>
                      </div>
                      <div className="dual-player-frame dual-frame-16-9">
                        {project.dualVideos.fullLength.videoUrl ? (
                          <video
                            ref={fullVideoRef}
                            src={project.dualVideos.fullLength.videoUrl}
                            poster={project.dualVideos.fullLength.poster || project.thumbnail}
                            controls
                            playsInline
                            preload="metadata"
                            onPlay={handleFullPlay}
                            className="dual-video-element"
                          />
                        ) : (
                          <div className="dual-placeholder-slot">
                            <span>{project.dualVideos.fullLength.label} Ready</span>
                            <small>Place your video in public/videos/ and specify in portfolioData.ts</small>
                          </div>
                        )}
                      </div>
                      <div className="dual-video-caption">
                        <div className="dual-caption-title">{project.dualVideos.fullLength.label}</div>
                        <div className="dual-caption-sub">{project.dualVideos.fullLength.format}</div>
                      </div>
                    </div>

                    {/* Right: Video 2 */}
                    <div className={`dual-video-col ${project.dualVideos.shortForm.aspectRatio === '16:9' ? 'dual-col-equal' : 'dual-col-short'}`}>
                      <div className="dual-col-header">
                        <span className="dual-badge-pill dual-badge-accent">{project.dualVideos.shortForm.label}</span>
                        <span className="dual-format-badge">{project.dualVideos.shortForm.aspectRatio || '9:16'}</span>
                      </div>
                      <div className={`dual-player-frame ${project.dualVideos.shortForm.aspectRatio === '16:9' ? 'dual-frame-16-9' : 'dual-frame-9-16'}`}>
                        {project.dualVideos.shortForm.videoUrl ? (
                          <video
                            ref={shortVideoRef}
                            src={project.dualVideos.shortForm.videoUrl}
                            poster={project.dualVideos.shortForm.poster}
                            controls
                            playsInline
                            preload="metadata"
                            onPlay={handleShortPlay}
                            className="dual-video-element"
                          />
                        ) : (
                          <div className="dual-placeholder-slot">
                            <span>{project.dualVideos.shortForm.label} Ready</span>
                            <small>Place your video in public/videos/ and specify in portfolioData.ts</small>
                          </div>
                        )}
                      </div>
                      <div className="dual-video-caption">
                        <div className="dual-caption-title">{project.dualVideos.shortForm.label}</div>
                        <div className="dual-caption-sub">{project.dualVideos.shortForm.format}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Below the Videos: Editorial Repurposing Context */}
                <div className="dual-modal-story">
                  <div className="dual-story-card">
                    <h3 className="dual-story-heading">
                      {project.dualVideos.caseStudyTitle}
                    </h3>
                    <p className="dual-story-copy">
                      "{project.dualVideos.caseStudyDescription}"
                    </p>
                  </div>

                  {/* Specs Grid — Focused purely on project content and formats */}
                  <div className="modal-specs-grid">
                    <div className="spec-col">
                      <span className="spec-col-label">Project</span>
                      <span className="spec-col-val">{project.title}</span>
                    </div>
                    <div className="spec-col">
                      <span className="spec-col-label">Format 01</span>
                      <span className="spec-col-val">{project.dualVideos.fullLength.label} ({project.dualVideos.fullLength.aspectRatio || '16:9'})</span>
                    </div>
                    <div className="spec-col">
                      <span className="spec-col-label">Format 02</span>
                      <span className="spec-col-val">{project.dualVideos.shortForm.label} ({project.dualVideos.shortForm.aspectRatio || '9:16'})</span>
                    </div>
                    <div className="spec-col">
                      <span className="spec-col-label">Editorial Focus</span>
                      <span className="spec-col-val">Pacing, Storytelling &amp; Retention</span>
                    </div>
                  </div>
                </div>
              </>
            ) : project.extraVideo ? (
              <div className="dual-extra-player-area">
                <div className="dual-col-header" style={{ marginBottom: '14px' }}>
                  <span className="dual-badge-pill dual-badge-accent">
                    {project.extraVideo.badge || 'Talking Head'}
                  </span>
                  <span className="dual-format-badge">
                    16:9 Widescreen Master · {project.extraVideo.duration}
                  </span>
                </div>

                <div className="dual-player-frame dual-frame-16-9">
                  <video
                    ref={extraVideoRef}
                    src={project.extraVideo.videoUrl}
                    poster={project.extraVideo.thumbnail}
                    controls
                    playsInline
                    preload="metadata"
                    className="dual-video-element"
                  />
                </div>

                <div className="dual-modal-story" style={{ marginTop: '24px' }}>
                  <div className="dual-story-card">
                    <h3 className="dual-story-heading">
                      {project.extraVideo.title}
                    </h3>
                    <p className="dual-story-copy">
                      "{project.extraVideo.description || project.description}"
                    </p>
                  </div>

                  <div className="modal-specs-grid">
                    <div className="spec-col">
                      <span className="spec-col-label">Project</span>
                      <span className="spec-col-val">{project.extraVideo.title}</span>
                    </div>
                    <div className="spec-col">
                      <span className="spec-col-label">Duration</span>
                      <span className="spec-col-val">{project.extraVideo.duration}</span>
                    </div>
                    <div className="spec-col">
                      <span className="spec-col-label">Aspect Ratio</span>
                      <span className="spec-col-val">16:9 Widescreen Master</span>
                    </div>
                    <div className="spec-col">
                      <span className="spec-col-label">Editorial Focus</span>
                      <span className="spec-col-val">Conversational Pacing &amp; Audio Leveling</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Prev / Next Navigation */}
            <div className="dual-modal-story" style={{ paddingTop: '0' }}>
              <div className="modal-nav-row">
                <button
                  type="button"
                  className="modal-nav-arrow"
                  onClick={handlePrev}
                  aria-label="Previous project"
                >
                  ← Previous
                </button>

                <span className="modal-count">
                  {currentIndex + 1} of {PROJECTS.length}
                </span>

                <button
                  type="button"
                  className="modal-nav-arrow"
                  onClick={handleNext}
                  aria-label="Next project"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ====================================================================
             STANDARD SINGLE-VIDEO / MULTI-CUT MODAL PRESENTATION
             ==================================================================== */
          <>
            {/* Video / Visual Viewport */}
            <div className="modal-video-area">
              <div className={`modal-video-box ${isVertical ? 'aspect-vertical' : ''}`}>
                {currentVideoUrl ? (
                  isEmbed ? (
                    <iframe
                      key={currentVideoUrl}
                      src={embedUrl}
                      title={currentTitle}
                      className="modal-video-frame"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      key={currentVideoUrl}
                      src={currentVideoUrl}
                      poster={currentPoster}
                      controls
                      autoPlay={false}
                      playsInline
                      preload="metadata"
                      onTimeUpdate={(e) => {
                        const target = e.currentTarget;
                        if (currentVideoUrl.includes('price-of-excellence') && target.currentTime >= 120) {
                          target.pause();
                          target.currentTime = 120;
                        }
                      }}
                      className="modal-video-element"
                    />
                  )
                ) : (
                  <div className="modal-placeholder-box">
                    <img
                      src={currentPoster}
                      alt={`${currentTitle} master footage preview`}
                      className="modal-placeholder-img"
                    />
                  </div>
                )}
              </div>

              {/* Multi-cut Playlist Selector Bar (e.g. Documentary Series) */}
              {hasPlaylist && project.playlist && (
                <div className="modal-playlist-bar">
                  <div className="playlist-bar-header">
                    <div className="playlist-header-left">
                      <span className="playlist-badge-count">{project.title} · {project.playlist.length} Cuts</span>
                      <span className="playlist-header-hint">Select a video cut below to play</span>
                    </div>
                    <span className="playlist-active-indicator">
                      Cut 0{activePlaylistIndex + 1} of 0{project.playlist.length}
                    </span>
                  </div>

                  <div className="playlist-cards-grid">
                    {project.playlist.map((item, idx) => {
                      const isActive = idx === activePlaylistIndex;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          className={`playlist-item-card ${isActive ? 'is-active' : ''}`}
                          onClick={() => setActivePlaylistIndex(idx)}
                          aria-label={`Play cut 0${idx + 1}: ${item.title}`}
                          aria-pressed={isActive}
                        >
                          <div className="playlist-card-thumb-wrap">
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="playlist-card-thumb-img"
                              loading="lazy"
                            />
                            <div className="playlist-card-overlay">
                              {isActive ? (
                                <span className="playlist-now-playing-pill">
                                  <span className="playlist-pulse-dot" />
                                  NOW PLAYING
                                </span>
                              ) : (
                                <span className="playlist-play-icon">
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </span>
                              )}
                            </div>
                            {item.duration && (
                              <span className="playlist-card-duration">{item.duration}</span>
                            )}
                          </div>

                          <div className="playlist-card-meta">
                            <span className="playlist-card-badge">{item.badge || `Cut 0${idx + 1}`}</span>
                            <h4 className="playlist-card-title">{item.title}</h4>
                            {item.subtitle && (
                              <p className="playlist-card-subtitle">{item.subtitle}</p>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Info Area */}
            <div className="modal-details">
              <div className="modal-category-tag">
                {project.category} {activePlaylistItem?.subtitle ? `· ${activePlaylistItem.subtitle}` : `· ${project.duration}`}
              </div>

              <h2 id="modal-project-title" className="modal-title">
                {currentTitle}
              </h2>

              <p className="modal-desc">
                {currentDescription}
              </p>

              <div className="modal-specs-grid">
                <div className="spec-col">
                  <span className="spec-col-label">Role</span>
                  <span className="spec-col-val">{project.role}</span>
                </div>
                <div className="spec-col">
                  <span className="spec-col-label">Software</span>
                  <span className="spec-col-val">{project.software}</span>
                </div>
                <div className="spec-col">
                  <span className="spec-col-label">Year</span>
                  <span className="spec-col-val">{project.year}</span>
                </div>
                <div className="spec-col">
                  <span className="spec-col-label">{hasPlaylist ? 'Selection' : 'Format'}</span>
                  <span className="spec-col-val">
                    {hasPlaylist
                      ? `Cut 0${activePlaylistIndex + 1} of 0${project.playlist!.length}`
                      : project.aspectRatio}
                  </span>
                </div>
              </div>

              {/* Modal Footer Prev/Next */}
              <div className="modal-nav-row">
                <button
                  type="button"
                  className="modal-nav-arrow"
                  onClick={handlePrev}
                  aria-label="Previous project"
                >
                  ← Previous
                </button>

                <span className="modal-count">
                  {currentIndex + 1} of {PROJECTS.length}
                </span>

                <button
                  type="button"
                  className="modal-nav-arrow"
                  onClick={handleNext}
                  aria-label="Next project"
                >
                  Next →
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

