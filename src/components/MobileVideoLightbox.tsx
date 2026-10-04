import React, { useEffect, useRef, useState } from 'react';
import { getAssetUrl } from '../data/portfolioData';

export interface LightboxVideoItem {
  id: string;
  title: string;
  badge?: string;
  videoUrl: string;
  poster?: string;
  aspectRatio?: '9:16' | '16:9';
}

interface MobileVideoLightboxProps {
  videos: LightboxVideoItem[];
  currentIndex: number;
  onClose: () => void;
  onIndexChange?: (newIndex: number) => void;
}

export const MobileVideoLightbox: React.FC<MobileVideoLightboxProps> = ({
  videos,
  currentIndex,
  onClose,
  onIndexChange
}) => {
  const currentVideo = videos[currentIndex] || videos[0];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const touchStartX = useRef<number>(0);

  // Prevent background scroll
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Keyboard navigation (Esc, Left, Right)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && onIndexChange && currentIndex < videos.length - 1) {
        onIndexChange(currentIndex + 1);
      } else if (e.key === 'ArrowLeft' && onIndexChange && currentIndex > 0) {
        onIndexChange(currentIndex - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, videos.length, onClose, onIndexChange]);

  // Autoplay with sound when video changes
  useEffect(() => {
    if (!videoRef.current || !currentVideo?.videoUrl) return;

    setProgress(0);
    videoRef.current.currentTime = 0;
    videoRef.current.muted = false;
    setIsMuted(false);

    const playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Fallback if browser blocks unmuted playback
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
  }, [currentVideo?.id, currentVideo?.videoUrl]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const next = !videoRef.current.muted;
    videoRef.current.muted = next;
    setIsMuted(next);
  };

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
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50 && onIndexChange && currentIndex < videos.length - 1) {
      onIndexChange(currentIndex + 1);
    } else if (diff < -50 && onIndexChange && currentIndex > 0) {
      onIndexChange(currentIndex - 1);
    }
  };

  if (!currentVideo) return null;

  const isVertical = currentVideo.aspectRatio === '9:16';

  return (
    <div
      className="mobile-lightbox-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged Mobile Video Player"
    >
      <div
        className="mobile-lightbox-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Header Bar */}
        <div className="mobile-lightbox-topbar">
          <div className="mobile-lightbox-meta">
            {currentVideo.badge && (
              <span className="mobile-lightbox-badge">{currentVideo.badge}</span>
            )}
            {videos.length > 1 && (
              <span className="mobile-lightbox-counter">
                {currentIndex + 1} / {videos.length}
              </span>
            )}
          </div>

          <div className="mobile-lightbox-actions">
            {/* Sound Toggle Button */}
            <button
              type="button"
              className="mobile-lightbox-sound-btn"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute video audio" : "Mute video audio"}
            >
              {isMuted ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>

            {/* Close Button */}
            <button
              type="button"
              className="mobile-lightbox-close-btn"
              onClick={onClose}
              aria-label="Close enlarged video"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Video Player Card */}
        <div
          className={`mobile-lightbox-player ${isVertical ? 'aspect-vertical' : 'aspect-widescreen'}`}
          onClick={togglePlay}
          role="button"
          tabIndex={0}
          aria-label="Click to play or pause video"
        >
          <video
            ref={videoRef}
            src={`${getAssetUrl(currentVideo.videoUrl)}#t=0.001`}
            poster={currentVideo.poster ? getAssetUrl(currentVideo.poster) : undefined}
            playsInline
            loop
            preload="auto"
            className="mobile-lightbox-video"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setProgress(100)}
          />

          {/* Center Play Button Overlay when Paused */}
          {!isPlaying && (
            <div className="mobile-lightbox-play-overlay" aria-hidden="true">
              <div className="mobile-lightbox-play-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFFFFF" stroke="none">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </div>
          )}

          {/* Video Bottom Progress Scrubber */}
          <div
            className="mobile-lightbox-progress-track"
            onClick={handleProgressClick}
            title="Scrub video"
          >
            <div
              className="mobile-lightbox-progress-fill"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        </div>

        {/* Bottom Navigation Controls (Prev / Next Buttons) */}
        {videos.length > 1 && (
          <div className="mobile-lightbox-footer">
            <button
              type="button"
              className="mobile-lightbox-nav-btn"
              disabled={currentIndex === 0}
              onClick={(e) => {
                e.stopPropagation();
                if (onIndexChange && currentIndex > 0) {
                  onIndexChange(currentIndex - 1);
                }
              }}
              aria-label="Previous Video"
            >
              ← Prev
            </button>

            <span className="mobile-lightbox-hint">
              Swipe left/right or tap arrows
            </span>

            <button
              type="button"
              className="mobile-lightbox-nav-btn"
              disabled={currentIndex === videos.length - 1}
              onClick={(e) => {
                e.stopPropagation();
                if (onIndexChange && currentIndex < videos.length - 1) {
                  onIndexChange(currentIndex + 1);
                }
              }}
              aria-label="Next Video"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileVideoLightbox;
