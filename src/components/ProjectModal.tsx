import React, { useEffect, useRef, useState } from 'react';
import { Project, PROJECTS, ProjectShowcaseVideo } from '../data/portfolioData';
import { MobileVideoLightbox } from './MobileVideoLightbox';

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
  isMobile?: boolean;
  onVideoClick?: (index: number) => void;
}

const ShowcaseVideoCard: React.FC<ShowcaseVideoCardProps> = ({
  video,
  index,
  totalCount,
  activePlayingId,
  setActivePlayingId,
  isMobile = false,
  onVideoClick
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isVideoFrameReady, setIsVideoFrameReady] = useState(false);

  useEffect(() => {
    setIsVideoFrameReady(false);
  }, [video.id, video.videoUrl]);

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
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
      setActivePlayingId(video.id);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Automatic playback when this video is activePlayingId; pause when inactive
  useEffect(() => {
    if (!videoRef.current || !video.videoUrl) return;

    if (activePlayingId === video.id) {
      // First attempt unmuted playback; if browser blocks unmuted autoplay, fall back to muted
      videoRef.current.muted = false;
      setIsMuted(false);
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
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
      videoRef.current.muted = false;
      setIsMuted(false);
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

  const handleCardClick = (e: React.MouseEvent) => {
    if (isMobile && onVideoClick) {
      e.stopPropagation();
      onVideoClick(index);
    } else if (video.videoUrl) {
      togglePlay();
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
        onClick={handleCardClick}
        onMouseEnter={video.videoUrl ? handleMouseEnter : undefined}
        onMouseLeave={video.videoUrl ? handleMouseLeave : undefined}
        role="button"
        tabIndex={0}
        aria-label={`${video.title || video.badge} — ${isMobile ? 'Tap to enlarge' : 'Click to play/pause'}`}
      >
        {video.videoUrl ? (
          <>
            <video
              ref={videoRef}
              src={video.videoUrl}
              poster={video.poster}
              playsInline
              loop
              preload={activePlayingId === video.id || index === 0 ? 'auto' : 'metadata'}
              className="story-reel-video"
              onPlay={() => setIsPlaying(true)}
              onPlaying={() => setIsVideoFrameReady(true)}
              onPause={() => setIsPlaying(false)}
              onVolumeChange={() => setIsMuted(videoRef.current?.muted ?? false)}
              onTimeUpdate={() => {
                if (videoRef.current && videoRef.current.currentTime > 0) {
                  setIsVideoFrameReady(true);
                }
                handleTimeUpdate();
              }}
              onLoadedData={() => {
                if (videoRef.current && videoRef.current.currentTime > 0) {
                  setIsVideoFrameReady(true);
                }
              }}
              onLoadedMetadata={handleTimeUpdate}
              onSeeked={handleTimeUpdate}
              onEnded={() => setProgress(100)}
            />

            {/* Instant Poster Layer: Displays immediately (0ms) so visitors never see an empty black frame while video buffers */}
            {video.poster && (
              <img
                src={video.poster}
                alt=""
                aria-hidden="true"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className={`showcase-video-instant-poster ${isVideoFrameReady && isPlaying ? 'is-faded' : ''}`}
              />
            )}

            {/* Sound / Mute Toggle Button in Top Right */}
            <button
              type="button"
              className={`story-reel-sound-btn ${isMuted ? 'is-muted' : 'is-unmuted'}`}
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              title={isMuted ? "Click to unmute" : "Click to mute"}
            >
              {isMuted ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>

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
        <div
          className="showcase-item-badge-wrap"
          onClick={isMobile && onVideoClick ? (e) => { e.stopPropagation(); onVideoClick(index); } : undefined}
          style={isMobile ? { cursor: 'pointer' } : undefined}
        >
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

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Derive showcase videos array
  const rawShowcaseVideos: ProjectShowcaseVideo[] =
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

  // In mobile version for short form content: show 4 reels and remove the gaming one
  const showcaseVideos: ProjectShowcaseVideo[] =
    isMobile && project?.id === 'shorts'
      ? rawShowcaseVideos.filter((v) => v.id !== 'short-gaming')
      : rawShowcaseVideos;

  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const [mobileLightboxIndex, setMobileLightboxIndex] = useState<number | null>(null);

  // Automatically start playing the first video inside any box when opened or changed
  useEffect(() => {
    setMobileLightboxIndex(null);
    if (project && showcaseVideos.length > 0 && showcaseVideos[0].videoUrl) {
      setActivePlayingId(showcaseVideos[0].id);
    } else {
      setActivePlayingId(null);
    }
  }, [project?.id]);

  const handleOpenMobileLightbox = (index: number) => {
    setActivePlayingId(null);
    setMobileLightboxIndex(index);
  };

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

  const visibleProjects = isMobile ? PROJECTS : PROJECTS.filter((p) => !p.mobileOnly);
  const currentIndex = visibleProjects.findIndex((p) => p.id === project.id);
  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + visibleProjects.length) % visibleProjects.length;
    onSelectProject(visibleProjects[prevIndex]);
  };
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % visibleProjects.length;
    onSelectProject(visibleProjects[nextIndex]);
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
          {/* On mobile for shorts: render pink note above the mosaic (like 900K archive) */}
          {isMobile && project.id === 'shorts' && (project.ticketNote || project.shortDescription || project.description) && (
            <div className="reels-ticket-note-wrap archive-reels-note-top">
              <div className="reels-ticket-note">
                <div className="ticket-inner">
                  <span className="ticket-text">
                    {project.ticketNote || project.shortDescription || project.description}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Seamless Video Mosaic: 2 on top, 2 below on mobile */}
          <div
            className={`project-showcase-mosaic mosaic-count-${showcaseVideos.length} ${
              hasMixedRatios ? 'mosaic-mixed-ratios' : ''
            } ${isSingleVertical ? 'mosaic-single-vertical' : ''} ${
              isAllVertical ? 'mosaic-all-vertical' : ''
            } ${isMobile && project.id === 'shorts' ? 'mosaic-shorts-mobile-2x2' : ''}`}
          >
            {showcaseVideos.map((video, vIdx) => (
              <ShowcaseVideoCard
                key={video.id || vIdx}
                video={video}
                index={vIdx}
                totalCount={showcaseVideos.length}
                activePlayingId={activePlayingId}
                setActivePlayingId={setActivePlayingId}
                isMobile={isMobile}
                onVideoClick={handleOpenMobileLightbox}
              />
            ))}
          </div>

          {/* Clean Pink Note Section Below Videos (for desktop or non-shorts) */}
          {(!isMobile || project.id !== 'shorts') && (project.ticketNote || project.shortDescription || project.description) && (
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

      {/* Mobile Enlarged Video Lightbox (allows visitors to see full resolution work on mobile) */}
      {mobileLightboxIndex !== null && isMobile && (
        <MobileVideoLightbox
          videos={showcaseVideos.map((v) => ({
            id: v.id,
            title: v.title,
            badge: v.badge,
            videoUrl: v.videoUrl,
            poster: v.poster,
            aspectRatio: v.aspectRatio
          }))}
          currentIndex={mobileLightboxIndex}
          onClose={() => setMobileLightboxIndex(null)}
          onIndexChange={(newIdx) => setMobileLightboxIndex(newIdx)}
        />
      )}
    </div>
  );
};

export default ProjectModal;
