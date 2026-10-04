import React, { useEffect, useRef, useState } from 'react';
import { Project, PROJECTS, ProjectShowcaseVideo } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

interface ShowcaseVideoCardProps {
  video: ProjectShowcaseVideo;
  index: number;
  totalCount: number;
  activePlayingId: string | null;
  setActivePlayingId: (id: string | null) => void;
}

const ShowcaseVideoCard: React.FC<ShowcaseVideoCardProps> = ({
  video,
  index,
  totalCount,
  activePlayingId,
  setActivePlayingId
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(pct);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!videoRef.current || !videoRef.current.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const fraction = Math.max(0, Math.min(1, clickX / rect.width));
    videoRef.current.currentTime = fraction * videoRef.current.duration;
    setProgress(fraction * 100);
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
      setActivePlayingId(video.id);
    }
  };

  // Automatic playback when this video is activePlayingId; pause when inactive
  useEffect(() => {
    if (!videoRef.current || !video.videoUrl) return;

    if (activePlayingId === video.id) {
      // First attempt unmuted playback; if browser blocks unmuted autoplay, fall back to muted
      videoRef.current.muted = false;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => {});
            }
          });
      }
    } else {
      if (!videoRef.current.paused) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [activePlayingId, video.id, video.videoUrl]);

  const togglePlay = () => {
    if (!videoRef.current || !video.videoUrl) return;
    if (videoRef.current.paused) {
      setActivePlayingId(video.id);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      if (activePlayingId === video.id) {
        setActivePlayingId(null);
      }
    }
  };

  const handleMouseEnter = () => {
    if (!videoRef.current || !video.videoUrl) return;
    if (!activePlayingId && videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (!videoRef.current || !video.videoUrl) return;
    if (activePlayingId !== video.id && !videoRef.current.paused) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Compute column class based on totalCount and aspect ratio
  const isVertical = video.aspectRatio === '9:16';
  const colClass = `project-mosaic-col ${isVertical ? 'aspect-vertical' : 'aspect-widescreen'} count-${totalCount}`;

  return (
    <div
      className={`showcase-video-unit ${isVertical ? 'aspect-vertical' : 'aspect-widescreen'} count-${totalCount}`}
    >
      <div
        className={colClass}
        onClick={video.videoUrl ? togglePlay : undefined}
        onMouseEnter={video.videoUrl ? handleMouseEnter : undefined}
        onMouseLeave={video.videoUrl ? handleMouseLeave : undefined}
        role="button"
        tabIndex={0}
        aria-label={`${video.title || video.badge} — Click to play/pause`}
      >
        {video.videoUrl ? (
          <>
            <video
              ref={videoRef}
              src={`${video.videoUrl}#t=0.001`}
              poster={video.poster}
              playsInline
              loop
              preload="metadata"
              className="story-reel-video"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleTimeUpdate}
              onSeeked={handleTimeUpdate}
              onEnded={() => setProgress(100)}
            />

            {/* Center Play/Pause Overlay Icon (visible only when paused) */}
            {!isPlaying && (
              <div className="story-reel-play-overlay" aria-hidden="true">
                <div className="story-reel-play-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF" stroke="none">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>
            )}

            {/* Yellow Progress Scrubber Line on Video Bottom */}
            <div
              className="video-progress-track"
              onClick={handleProgressClick}
              title="Video progress scrubber"
            >
              <div
                className="video-progress-fill"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
          </>
        ) : (
          <div className="story-reel-placeholder">
            <div className="story-reel-empty-frame">
              <div className="story-reel-ph-play">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.6)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <div className="story-reel-ph-meta">
                <span className="story-reel-ph-title">{video.title || `Reel ${index + 1}`}</span>
                <span className="story-reel-ph-status">{isVertical ? '9 : 16' : '16 : 9'}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Badge / Name text directly below this video */}
      {Boolean(video.badge) && (
        <div className="showcase-item-badge-wrap">
          <div className="video-under-badge">
            <span className="video-under-badge-text">{video.badge}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSelectProject
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Derive showcase videos array
  const showcaseVideos: ProjectShowcaseVideo[] =
    project && project.showcaseVideos && project.showcaseVideos.length > 0
      ? project.showcaseVideos
      : project
      ? [
          {
            id: project.id,
            title: project.title,
            badge: project.title,
            videoUrl: project.videoUrl || '',
            poster: project.thumbnail,
            aspectRatio: project.aspectRatio
          }
        ]
      : [];

  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);

  // Automatically start playing the first video inside any box when opened or changed
  useEffect(() => {
    if (project && showcaseVideos.length > 0 && showcaseVideos[0].videoUrl) {
      setActivePlayingId(showcaseVideos[0].id);
    } else {
      setActivePlayingId(null);
    }
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

  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
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

  const hasMixedRatios =
    showcaseVideos.some((v) => v.aspectRatio === '9:16') &&
    showcaseVideos.some((v) => v.aspectRatio === '16:9');

  const isSingleVertical =
    showcaseVideos.length === 1 && showcaseVideos[0].aspectRatio === '9:16';

  const isAllVertical =
    showcaseVideos.length > 0 && showcaseVideos.every((v) => v.aspectRatio === '9:16');

  return (
    <div
      className="project-viewer-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div className={`project-viewer-container project-viewer-${project.id}`} ref={dialogRef} tabIndex={-1}>
        {/* Top Header Row with Title, Nav and Close */}
        <div className="project-viewer-header">
          <div className="project-viewer-title-wrap">
            <h2 id="modal-project-title" className="project-viewer-title">
              {project.heading || project.title}
            </h2>
          </div>

          <div className="project-viewer-nav-group">
            <button
              type="button"
              className="project-viewer-nav-btn"
              onClick={handlePrev}
              aria-label="Previous Project"
              title="Previous (Left Arrow)"
            >
              ← Prev
            </button>
            <button
              type="button"
              className="project-viewer-nav-btn"
              onClick={handleNext}
              aria-label="Next Project"
              title="Next (Right Arrow)"
            >
              Next →
            </button>
            <button
              type="button"
              className="project-viewer-close-btn"
              onClick={onClose}
              aria-label="Close Project Viewer (Esc)"
              title="Close (Esc)"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Black Section with Seamless Video Columns */}
        <div className={`story-reels-dark-section project-viewer-dark-section project-dark-${project.id}`}>
          {/* Seamless Video Mosaic: sticked together with white outer border */}
          <div
            className={`project-showcase-mosaic mosaic-count-${showcaseVideos.length} ${
              hasMixedRatios ? 'mosaic-mixed-ratios' : ''
            } ${isSingleVertical ? 'mosaic-single-vertical' : ''} ${
              isAllVertical ? 'mosaic-all-vertical' : ''
            }`}
          >
            {showcaseVideos.map((video, vIdx) => (
              <ShowcaseVideoCard
                key={video.id || vIdx}
                video={video}
                index={vIdx}
                totalCount={showcaseVideos.length}
                activePlayingId={activePlayingId}
                setActivePlayingId={setActivePlayingId}
              />
            ))}
          </div>



          {/* Clean Pink Note Section Below Videos without icon */}
          {(project.ticketNote || project.shortDescription || project.description) && (
            <div className="reels-ticket-note-wrap">
              <div className="reels-ticket-note">
                <div className="ticket-inner">
                  <span className="ticket-text">
                    {project.ticketNote || project.shortDescription || project.description}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Story Description (Specs removed per request) */}
        <div className="project-viewer-footer">
          <p className="project-viewer-desc">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
