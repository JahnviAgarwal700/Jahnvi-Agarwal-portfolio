import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getAssetUrl } from '../data/portfolioData';
import { MobileVideoLightbox } from './MobileVideoLightbox';

interface FolderItem {
  id: string;
  title: string;
  shoulderTag: string;
  theme: string;
  bgColor: string;
  hoverColor: string;
  icon?: React.ReactNode;
  sticker: React.ReactNode;
  content: {
    categoryBadge?: string;
    headline?: string;
    subtext?: string;
    storyProof?: boolean;
    metrics?: Array<{
      value: string;
      label: string;
    }>;
    columns?: Array<{
      heading: string;
      items: Array<{
        title: string;
        desc?: string;
        pill?: string;
        highlight?: boolean;
      }>;
    }>;
    pills?: string[];
  };
}

/* ==========================================================================
   AUTHENTIC DIE-CUT STICKERS (Inspired by Ana Cuna Recording 2026-09-29 135759)
   Playful, glossy illustrated badges that pop in with a spring bounce on hover.
   ========================================================================== */

// 1. YouTube: 900K Story: Classic Director's Clapperboard with Action Chevrons
const ClapperboardSticker: React.FC = () => (
  <svg width="68" height="68" viewBox="0 0 68 68" fill="none" className="sticker-svg" aria-hidden="true">
    {/* Thick white die-cut sticker silhouette */}
    <rect x="7" y="16" width="48" height="42" rx="10" fill="#FFFFFF" />
    <path d="M5 22 L49 10 L55 24 L11 36 Z" fill="#FFFFFF" />
    {/* Clapperboard Body */}
    <rect x="10" y="25" width="42" height="30" rx="7" fill="#111111" />
    {/* Angled Clapper Arm with Yellow/Black Stripes */}
    <g transform="rotate(-13 12 25)">
      <rect x="9" y="11" width="44" height="12" rx="4" fill="#111111" />
      <polygon points="14,11 20,11 16,23 10,23" fill="#FFC800" />
      <polygon points="25,11 31,11 27,23 21,23" fill="#FFC800" />
      <polygon points="36,11 42,11 38,23 32,23" fill="#FFC800" />
      <polygon points="47,11 51,11 49,23 43,23" fill="#FFC800" />
    </g>
    {/* REC Dot & Slate Info */}
    <circle cx="22" cy="40" r="5" fill="#FFC800" />
    <circle cx="22" cy="40" r="2.2" fill="#111111" />
    <rect x="32" y="36" width="14" height="3.2" rx="1.6" fill="#FFFFFF" opacity="0.9" />
    <rect x="32" y="42" width="9" height="3" rx="1.5" fill="#FFFFFF" opacity="0.6" />
  </svg>
);


// 3. About Me: Video Editor with Studio Headphones & Retro Glasses
const EditorSticker: React.FC = () => (
  <svg width="68" height="68" viewBox="0 0 68 68" fill="none" className="sticker-svg" aria-hidden="true">
    {/* Thick white sticker circle */}
    <circle cx="34" cy="34" r="27" fill="#FFFFFF" />
    {/* Character face */}
    <circle cx="34" cy="34" r="22" fill="#FF7AA2" />
    {/* Headphone arch */}
    <path d="M18 33 C18 21 25 14 34 14 C43 14 50 21 50 33" stroke="#111111" strokeWidth="4.8" strokeLinecap="round" />
    {/* Ear Cups */}
    <rect x="14" y="28" width="7.5" height="14" rx="3.75" fill="#111111" />
    <rect x="46.5" y="28" width="7.5" height="14" rx="3.75" fill="#111111" />
    {/* Cool Glasses */}
    <rect x="23" y="30" width="9" height="6.5" rx="2.2" fill="#111111" />
    <rect x="36" y="30" width="9" height="6.5" rx="2.2" fill="#111111" />
    <line x1="32" y1="33" x2="36" y2="33" stroke="#111111" strokeWidth="2.4" />
    {/* Confident Smile */}
    <path d="M29 41 Q34 46 39 41" stroke="#111111" strokeWidth="2.8" strokeLinecap="round" />
  </svg>
);

// 4. Desk Tour: Dual 4K Workstation Displays & Real-Time NLE Timeline
const WorkstationSticker: React.FC = () => (
  <svg width="68" height="68" viewBox="0 0 68 68" fill="none" className="sticker-svg" aria-hidden="true">
    {/* White sticker silhouette */}
    <rect x="6" y="13" width="56" height="44" rx="10" fill="#FFFFFF" />
    {/* Main Wide Display */}
    <rect x="10" y="17" width="32" height="23" rx="3.5" fill="#111111" />
    <rect x="12.5" y="19.5" width="27" height="18" rx="2" fill="#FFF4D6" />
    {/* Timeline track & playhead */}
    <line x1="15" y1="31" x2="37" y2="31" stroke="#111111" strokeWidth="2" />
    <line x1="24" y1="22" x2="24" y2="35" stroke="#FF4400" strokeWidth="2.2" />
    {/* Side Color-grading Screen */}
    <rect x="44" y="15" width="14" height="26" rx="3" fill="#111111" />
    <rect x="46" y="17" width="10" height="22" rx="1.5" fill="#FFC800" />
    {/* Ergonomic Stand */}
    <rect x="23" y="40" width="6" height="7" fill="#111111" />
    <rect x="15" y="47" width="22" height="3" rx="1.5" fill="#111111" />
  </svg>
);

// 5. Skills & Tools: Razor Blade / Scissors Cutting 35mm Celluloid
const ScissorsSticker: React.FC = () => (
  <svg width="68" height="68" viewBox="0 0 68 68" fill="none" className="sticker-svg" aria-hidden="true">
    {/* White sticker silhouette */}
    <path d="M12 45 C7 39 11 28 19 28 C26 28 30 32 34 36 L49 13 C52 8 59 11 56 17 L43 38 C47 41 49 47 46 53 C42 59 32 59 28 53 C25 48 26 44 28 40 L24 37 C18 42 14 47 12 45 Z" fill="#FFFFFF" />
    {/* Upper Blade */}
    <path d="M22 36 L53 14 C55 12 57 14 55 17 L36 40 Z" fill="#111111" />
    {/* Lower Blade */}
    <path d="M32 32 L50 49 C52 51 50 53 47 52 L26 38 Z" fill="#FFC800" />
    {/* Pivot screw */}
    <circle cx="31" cy="37" r="3.6" fill="#FFFFFF" />
    <circle cx="31" cy="37" r="1.8" fill="#111111" />
    {/* Finger Rings */}
    <circle cx="18" cy="47" r="6.5" fill="#111111" />
    <circle cx="18" cy="47" r="3.4" fill="#FFFFFF" />
    <circle cx="39" cy="51" r="6.5" fill="#111111" />
    <circle cx="39" cy="51" r="3.4" fill="#FFFFFF" />
  </svg>
);

// 6. Resume: Die-Cut Document Dossier with Corner Fold & Verified Seal
const ResumeSticker: React.FC = () => (
  <svg width="68" height="68" viewBox="0 0 68 68" fill="none" className="sticker-svg" aria-hidden="true">
    {/* Thick white die-cut sticker silhouette */}
    <rect x="11" y="9" width="46" height="50" rx="9" fill="#FFFFFF" />
    <path d="M43 9 L57 23 L57 9 Z" fill="#FFFFFF" />

    {/* Document Body */}
    <rect x="14" y="12" width="40" height="44" rx="5" fill="#111111" />
    <rect x="16" y="14" width="36" height="40" rx="3.5" fill="#FAF5EA" />

    {/* Folded corner flap in gold */}
    <path d="M41 14 L52 25 L41 25 Z" fill="#FFC800" />
    <path d="M41 14 L41 25 L52 25" stroke="#111111" strokeWidth="1.6" fill="none" />

    {/* Header banner accent (Coral) */}
    <rect x="20" y="19" width="18" height="4.5" rx="2" fill="#FF8566" />

    {/* Miniature avatar circle */}
    <circle cx="23.5" cy="30" r="3.5" fill="#111111" />
    <circle cx="23.5" cy="30" r="2.2" fill="#FFC800" />

    {/* Resume summary lines */}
    <rect x="29" y="28.5" width="19" height="2.2" rx="1.1" fill="#111111" opacity="0.85" />
    <rect x="29" y="32.5" width="14" height="1.8" rx="0.9" fill="#111111" opacity="0.5" />

    {/* Section divider */}
    <line x1="20" y1="37" x2="48" y2="37" stroke="#111111" strokeWidth="1" opacity="0.25" />

    {/* Bullet point items */}
    <circle cx="21.5" cy="41" r="1.2" fill="#FF8566" />
    <rect x="25" y="40" width="22" height="2" rx="1" fill="#111111" opacity="0.75" />

    <circle cx="21.5" cy="45.5" r="1.2" fill="#FF8566" />
    <rect x="25" y="44.5" width="18" height="2" rx="1" fill="#111111" opacity="0.75" />

    {/* Certified verification stamp / seal */}
    <circle cx="43" cy="46" r="4.5" fill="#FF8566" />
    <path d="M41 46 L42.3 47.3 L45 44.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ARCHIVE_FOLDERS: FolderItem[] = [
  {
    id: 'desk-tour',
    title: 'DESK TOUR',
    shoulderTag: 'Dual 4K Workstations',
    theme: 'mint',
    bgColor: '#FFFFFF',
    hoverColor: '#72D8BE',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2.5" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <rect x="16.5" y="5.5" width="2.5" height="2.5" rx="0.5" fill="#111111" stroke="none" />
      </svg>
    ),
    sticker: <WorkstationSticker />,
    content: {
      categoryBadge: 'HARDWARE WORKSTATIONS',
      headline: 'Desk Tour',
      subtext: '',
      columns: []
    }
  },
  {
    id: 'youtube-900k-story',
    title: '900K+ SUBSCRIBERS',
    shoulderTag: '900K+ in One Year',
    theme: 'yellow',
    bgColor: '#FFFFFF',
    hoverColor: '#FFD026',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#111111" stroke="none" />
      </svg>
    ),
    sticker: <ClapperboardSticker />,
    content: {
      categoryBadge: 'YOUTUBE CASE STUDY',
      headline: '900K+ Subscribers in One Year',
      subtext: '',
      storyProof: true,
      columns: []
    }
  },
  {
    id: 'about-me',
    title: 'MORE ABOUT ME',
    shoulderTag: 'Curiosity · AI · Making',
    theme: 'pink',
    bgColor: '#FFFFFF',
    hoverColor: '#FF7AA2',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4.2" />
        <path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2" />
      </svg>
    ),
    sticker: <EditorSticker />,
    content: {
      categoryBadge: 'PERSONAL ESSAY & MINDSET',
      headline: 'More About Me',
      subtext: '',
      columns: []
    }
  },
  {
    id: 'skills-tools',
    title: 'TOOLS I USE',
    shoulderTag: 'Premiere · After Effects · AI',
    theme: 'lilac',
    bgColor: '#FFFFFF',
    hoverColor: '#B588F7',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2l4 4-12 12H6v-4L18 2z" />
        <line x1="15" y1="5" x2="19" y2="9" />
        <path d="M4 8a4 4 0 0 1 4-4l1.5 1.5-2 2 2 2-1.5 1.5A4 4 0 0 1 4 8z" />
        <line x1="8" y1="12" x2="17" y2="21" />
        <path d="M17 21a2 2 0 0 0 2.8 0 2 2 0 0 0 0-2.8" />
      </svg>
    ),
    sticker: <ScissorsSticker />,
    content: {
      categoryBadge: 'SOFTWARE MASTERY & AI WORKFLOWS',
      headline: 'Tools I Use',
      subtext: '',
      columns: []
    }
  },
  {
    id: 'resume',
    title: 'RESUME',
    shoulderTag: 'Experience · Skills · Bio',
    theme: 'coral',
    bgColor: '#FFFFFF',
    hoverColor: '#FF8566',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    ),
    sticker: <ResumeSticker />,
    content: {
      categoryBadge: 'CURRICULUM VITAE',
      headline: 'Resume',
      subtext: '',
      columns: []
    }
  }
];

export interface ReelItem {
  id: string;
  title: string;
  badge?: string;
  videoUrl?: string;
  poster?: string;
}

export const YOUTUBE_900K_REELS: ReelItem[] = [
  {
    id: 'reel-1',
    title: 'Short Reel 01',
    badge: 'Reel 1',
    videoUrl: 'videos/1.mp4',
    poster: 'images/archive-reel-1-poster.webp'
  },
  {
    id: 'reel-5',
    title: 'Short Reel 02',
    badge: 'Reel 2',
    videoUrl: 'videos/5.mp4',
    poster: 'images/archive-reel-5-poster.webp'
  },
  {
    id: 'reel-2',
    title: 'Short Reel 03',
    badge: 'Reel 3',
    videoUrl: 'videos/2.mp4',
    poster: 'images/archive-reel-2-poster.webp'
  },
  {
    id: 'reel-21',
    title: 'Short Reel 04',
    badge: 'Reel 4',
    videoUrl: 'videos/21.mp4',
    poster: 'images/archive-reel-21-poster.webp'
  }
];

const StoryReelCard: React.FC<{
  reel: ReelItem;
  index: number;
  isMobile?: boolean;
  onMobileClick?: (index: number) => void;
}> = ({ reel, index, isMobile = false, onMobileClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isReelFrameReady, setIsReelFrameReady] = useState(false);
  const manuallyPausedRef = useRef(false);

  const isFirstReel = index === 0;

  // Listen for other reels playing so only one reel speaks at a time
  useEffect(() => {
    const handleOtherReelPlay = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      if (customEvent.detail?.id !== reel.id) {
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      }
    };
    document.addEventListener('story-reel-play', handleOtherReelPlay);
    return () => {
      document.removeEventListener('story-reel-play', handleOtherReelPlay);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [reel.id]);

  // Play function ensuring voice/sound is ON
  const startPlayingWithSound = useCallback(() => {
    if (!videoRef.current || manuallyPausedRef.current) return;

    // Notify other reels to pause so voice does not overlap
    document.dispatchEvent(new CustomEvent('story-reel-play', { detail: { id: reel.id } }));

    // Unmute and ensure volume is 100%
    videoRef.current.muted = false;
    videoRef.current.volume = 1.0;

    const playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err: Error) => {
          // Fallback if browser requires touch/click gesture first
          if (err.name === 'NotAllowedError') {
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});

              // Instant unmute on the very next user gesture anywhere on screen
              const activateAudio = () => {
                if (videoRef.current) {
                  videoRef.current.muted = false;
                  videoRef.current.volume = 1.0;
                }
                window.removeEventListener('click', activateAudio);
                window.removeEventListener('touchstart', activateAudio);
                window.removeEventListener('keydown', activateAudio);
              };
              window.addEventListener('click', activateAudio, { once: true });
              window.addEventListener('touchstart', activateAudio, { once: true });
              window.addEventListener('keydown', activateAudio, { once: true });
            }
          }
        });
    }
  }, [reel.id]);

  // Auto-play first reel with voice when visitors scroll down to the reel section inside the 900K folder
  useEffect(() => {
    if (!isFirstReel || !reel.videoUrl) return;

    const cardEl = cardRef.current;
    if (!cardEl) return;

    const scrollContainer = cardEl.closest('.folder-fullscreen-overlay');

    const handleScrollCheck = () => {
      if (!videoRef.current || manuallyPausedRef.current) return;
      const rect = cardEl.getBoundingClientRect();
      const containerRect = scrollContainer
        ? scrollContainer.getBoundingClientRect()
        : { top: 0, bottom: window.innerHeight };

      // Trigger play when the reel is visible within the scrolling view
      const isVisible = rect.top < containerRect.bottom - 30 && rect.bottom > containerRect.top + 30;
      if (isVisible) {
        if (videoRef.current.paused) {
          startPlayingWithSound();
        }
      } else {
        if (!videoRef.current.paused) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      }
    };

    let observer: IntersectionObserver | null = null;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (videoRef.current && !manuallyPausedRef.current && videoRef.current.paused) {
                startPlayingWithSound();
              }
            } else {
              if (videoRef.current && !videoRef.current.paused) {
                videoRef.current.pause();
                setIsPlaying(false);
              }
            }
          });
        },
        {
          root: scrollContainer || null,
          threshold: 0.15
        }
      );
      observer.observe(cardEl);
    } catch {
      // IntersectionObserver fallback handled by scroll listener
    }

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScrollCheck, { passive: true });
    }
    window.addEventListener('scroll', handleScrollCheck, { passive: true, capture: true });

    // Check visibility after folder open animation settles
    const t1 = setTimeout(handleScrollCheck, 150);
    const t2 = setTimeout(handleScrollCheck, 400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (observer) {
        observer.disconnect();
      }
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScrollCheck);
      }
      window.removeEventListener('scroll', handleScrollCheck, true);
    };
  }, [isFirstReel, reel.videoUrl, startPlayingWithSound]);

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
      startPlayingWithSound();
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      manuallyPausedRef.current = false;
      startPlayingWithSound();
    } else {
      manuallyPausedRef.current = true;
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleMouseEnter = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      startPlayingWithSound();
    }
  };

  const handleMouseLeave = () => {
    if (!videoRef.current) return;
    // Don't pause the first reel on mouse leave if it's auto-playing on scroll
    if (isFirstReel) return;
    if (!videoRef.current.paused) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (isMobile && onMobileClick) {
      e.stopPropagation();
      onMobileClick(index);
    } else if (reel.videoUrl) {
      togglePlay();
    }
  };

  return (
    <div
      ref={cardRef}
      className={`story-reel-col ${reel.videoUrl ? 'has-video' : 'is-placeholder'}`}
      onClick={reel.videoUrl ? handleCardClick : undefined}
      onMouseEnter={reel.videoUrl ? handleMouseEnter : undefined}
      onMouseLeave={reel.videoUrl ? handleMouseLeave : undefined}
      role={reel.videoUrl ? 'button' : undefined}
      tabIndex={reel.videoUrl ? 0 : undefined}
      aria-label={`${reel.title}${reel.badge ? ` - ${reel.badge}` : ''} — ${isMobile ? 'Tap to enlarge' : 'Click to play/pause'}`}
    >
      {reel.videoUrl ? (
        <>
          <video
            ref={videoRef}
            src={getAssetUrl(reel.videoUrl)}
            poster={reel.poster ? getAssetUrl(reel.poster) : undefined}
            playsInline
            loop
            preload={isFirstReel ? 'auto' : 'metadata'}
            className="story-reel-video"
            onPlay={() => setIsPlaying(true)}
            onPlaying={() => setIsReelFrameReady(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={() => {
              if (videoRef.current && videoRef.current.currentTime > 0) {
                setIsReelFrameReady(true);
              }
              handleTimeUpdate();
            }}
            onLoadedData={() => {
              if (videoRef.current && videoRef.current.currentTime > 0) {
                setIsReelFrameReady(true);
              }
            }}
            onLoadedMetadata={handleTimeUpdate}
            onSeeked={handleTimeUpdate}
            onEnded={() => setProgress(100)}
          />

          {reel.poster && (
            <img
              src={getAssetUrl(reel.poster)}
              alt=""
              aria-hidden="true"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className={`showcase-video-instant-poster ${isReelFrameReady && isPlaying ? 'is-faded' : ''}`}
            />
          )}

          {!isPlaying && (
            <div className="story-reel-play-overlay" aria-hidden="true">
              <div className="story-reel-play-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF" stroke="none">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </div>
          )}

          <div className="story-reel-bottom-badge">
            <span className="story-reel-tag">{reel.badge || `Reel ${index + 1}`}</span>
          </div>

          {/* Yellow Progress Scrubber Line on Video Bottom for Duration */}
          <div
            className="video-progress-track"
            onClick={handleProgressClick}
            title="Video duration / progress scrubber"
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
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <div className="story-reel-ph-meta">
              <span className="story-reel-ph-num">0{index + 1}</span>
              <span className="story-reel-ph-title">Short Reel {index + 1}</span>
              <span className="story-reel-ph-status">9 : 16</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FOLDER_PHOTOS: Record<string, string[]> = {
  'desk-tour': [
    'images/workstation-1-angle.webp',
    'images/workstation-1-front.webp',
    'images/workstation-2-dell.webp'
  ],
  'youtube-900k-story': [
    'images/story-part1-ultra.webp',
    'images/story-part2-ultra.webp',
    'images/story-part3-ultra.webp',
    'images/story-part4-ultra-cover.webp',
    'images/story-part5-ultra.webp',
    'images/archive-reel-1-poster.webp',
    'images/archive-reel-5-poster.webp',
    'images/archive-reel-2-poster.webp',
    'images/archive-reel-21-poster.webp'
  ],
  'about-me': [
    'images/about-childhood.webp'
  ],
  'skills-tools': [
    'images/tools-workstation.webp'
  ],
  'resume': [
    'images/resume.webp',
    'images/resume.png'
  ]
};

const ALL_ARCHIVE_PHOTOS: string[] = [
  'images/workstation-1-angle.webp',
  'images/workstation-1-front.webp',
  'images/workstation-2-dell.webp',
  'images/story-part1-ultra.webp',
  'images/story-part2-ultra.webp',
  'images/story-part3-ultra.webp',
  'images/story-part4-ultra-cover.webp',
  'images/story-part5-ultra.webp',
  'images/archive-reel-1-poster.webp',
  'images/archive-reel-5-poster.webp',
  'images/archive-reel-2-poster.webp',
  'images/archive-reel-21-poster.webp',
  'images/tools-workstation.webp',
  'images/about-childhood.webp',
  'images/resume.webp',
  'images/resume.png'
];

const preloadedUrls = new Set<string>();

const preloadImage = (path: string): void => {
  const url = getAssetUrl(path);
  if (!url || preloadedUrls.has(url)) return;
  preloadedUrls.add(url);

  const img = new Image();
  img.decoding = 'async';
  img.src = url;
};

export const preloadFolderPhotos = (folderId: string): void => {
  const list = FOLDER_PHOTOS[folderId];
  if (list) {
    list.forEach(preloadImage);
  }
};

export const preloadAllArchivePhotos = (): void => {
  ALL_ARCHIVE_PHOTOS.forEach(preloadImage);
};

export const ArchiveSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedFolderId, setExpandedFolderId] = useState<string | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [zoomedPhoto, setZoomedPhoto] = useState<string | null>(null);
  const [activeMobileReelIndex, setActiveMobileReelIndex] = useState<number | null>(null);
  const hasPushedHistoryRef = useRef(false);

  // Proactive background preloading: on idle & on scroll proximity
  useEffect(() => {
    let idleTimer: any = null;
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleTimer = (window as any).requestIdleCallback(
        () => {
          preloadAllArchivePhotos();
        },
        { timeout: 1500 }
      );
    } else {
      idleTimer = setTimeout(() => {
        preloadAllArchivePhotos();
      }, 500);
    }

    let observer: IntersectionObserver | null = null;
    if (sectionRef.current && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            preloadAllArchivePhotos();
            observer?.disconnect();
          }
        },
        { rootMargin: '600px 0px' }
      );
      observer.observe(sectionRef.current);
    }

    return () => {
      if (typeof window !== 'undefined' && 'cancelIdleCallback' in window && idleTimer) {
        (window as any).cancelIdleCallback(idleTimer);
      } else if (idleTimer) {
        clearTimeout(idleTimer);
      }
      observer?.disconnect();
    };
  }, []);

  // When any folder is opened, ensure all archive images are cached for instant switching
  useEffect(() => {
    if (expandedFolderId) {
      preloadAllArchivePhotos();
    }
  }, [expandedFolderId]);

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

  // Lock background scroll when full-screen dossier is active
  useEffect(() => {
    if (expandedFolderId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [expandedFolderId]);

  const handleCloseExpandedFolder = useCallback((triggeredByPopState: boolean | unknown = false) => {
    const isPopState = triggeredByPopState === true;
    if (isExiting) return;
    setIsExiting(true);

    // If closed via UI (BACK button, X, or ESC), pop the history entry we pushed
    if (!isPopState && hasPushedHistoryRef.current) {
      hasPushedHistoryRef.current = false;
      window.history.back();
    }

    setTimeout(() => {
      setExpandedFolderId(null);
      setIsExiting(false);
      // Clean up hash if any remains without adding extra history
      if (window.location.hash.startsWith('#archive-')) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }, 380); // Exact match to exit spring animation
  }, [isExiting]);

  // Handle browser Back / Forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      if (expandedFolderId) {
        hasPushedHistoryRef.current = false;
        handleCloseExpandedFolder(true);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [expandedFolderId, handleCloseExpandedFolder]);

  // Handle ESC key to smoothly close expanded dossier or zoomed photo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoomedPhoto) {
          setZoomedPhoto(null);
          return;
        }
        if (expandedFolderId && !isExiting) {
          handleCloseExpandedFolder(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedFolderId, isExiting, zoomedPhoto, handleCloseExpandedFolder]);

  // Open folder if URL has #archive-{id} on load, or scroll to archive
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#archive-')) {
      const folderId = hash.replace('#archive-', '');
      if (ARCHIVE_FOLDERS.some(f => f.id === folderId)) {
        setExpandedFolderId(folderId);
        hasPushedHistoryRef.current = true;
      }
    } else if (hash === '#archive' || hash === '#about') {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
      }, 50);
    }
  }, []);

  const handleOpenFolder = (folderId: string) => {
    setIsExiting(false);
    setExpandedFolderId(folderId);
    hasPushedHistoryRef.current = true;
    window.history.pushState({ archiveFolder: folderId }, '', `#archive-${folderId}`);
  };

  const activeFolder = ARCHIVE_FOLDERS.find(f => f.id === expandedFolderId);
  const currentIdx = activeFolder ? ARCHIVE_FOLDERS.findIndex(f => f.id === activeFolder.id) : 0;

  const handlePrevFolder = () => {
    const prevIdx = (currentIdx - 1 + ARCHIVE_FOLDERS.length) % ARCHIVE_FOLDERS.length;
    const nextFolderId = ARCHIVE_FOLDERS[prevIdx].id;
    setIsExiting(false);
    setExpandedFolderId(nextFolderId);
    window.history.replaceState({ archiveFolder: nextFolderId }, '', `#archive-${nextFolderId}`);
  };

  const handleNextFolder = () => {
    const nextIdx = (currentIdx + 1) % ARCHIVE_FOLDERS.length;
    const nextFolderId = ARCHIVE_FOLDERS[nextIdx].id;
    setIsExiting(false);
    setExpandedFolderId(nextFolderId);
    window.history.replaceState({ archiveFolder: nextFolderId }, '', `#archive-${nextFolderId}`);
  };

  return (
    <section ref={sectionRef} id="archive" className="section-archive" aria-label="Archive Folder Stack">
      <div id="about" style={{ position: 'relative', top: '-80px', visibility: 'hidden' }} aria-hidden="true" />
      {/* Physical Stack of Layered Die-Cut Folders covering full page left to right */}
      <div className="archive-physical-stack archive-stack-fullwidth" data-reveal-group>
        {ARCHIVE_FOLDERS.map((folder, index) => {
          return (
            <article
              key={folder.id}
              className={`archive-physical-folder folder-item-${folder.id}`}
              onMouseEnter={() => preloadFolderPhotos(folder.id)}
              onTouchStart={() => preloadFolderPhotos(folder.id)}
              onFocus={() => preloadFolderPhotos(folder.id)}
              style={{
                '--folder-index': index,
                '--folder-bg': folder.bgColor,
                '--folder-hover-bg': folder.hoverColor,
                zIndex: index + 1
              } as React.CSSProperties}
            >
              {/* Physical Die-Cut Folder Flap / Tab Header */}
              <div
                className="folder-flap-container"
                onClick={() => handleOpenFolder(folder.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenFolder(folder.id);
                  }
                }}
                aria-label={`Folder: ${folder.title}. Click to open full-screen dossier.`}
              >
                {/* SVG Die-Cut Folder Flap Contour (Broader 150px Height) */}
                <svg
                  className="folder-flap-svg"
                  viewBox="0 0 1000 150"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    className="folder-flap-fill"
                    d="M 0,150 L 0,0 L 760,0 C 790,0 800,36 830,36 L 1000,36 L 1000,150 L 0,150 Z"
                  />
                  <path
                    className="folder-flap-stroke"
                    d="M 0,150 L 0,0 L 760,0 C 790,0 800,36 830,36 L 1000,36 L 1000,150 L 0,150"
                    fill="none"
                  />
                </svg>

                {/* Folder Flap Content Overlay */}
                <div className="folder-flap-content">
                  {/* Left: Broad Title Covering a Lot of Width (Icons & Tag Pills Removed as Requested) */}
                  <div className="folder-flap-left">
                    <h3 className="folder-flap-title">
                      {folder.title}
                    </h3>
                  </div>

                  {/* Right: Illustrated Die-Cut Sticker that pops on hover */}
                  <div className="folder-flap-right">
                    <div className="folder-hover-sticker" aria-hidden="true">
                      {folder.sticker}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* FULL-SCREEN EXPANDED FOLDER DOSSIER (Recording 2026-09-29 135759 Interaction) */}
      {activeFolder && (
        <div
          className={`folder-fullscreen-overlay ${isExiting ? 'is-exiting' : 'is-entering'} folder-theme-${activeFolder.theme}`}
          style={{
            '--folder-theme-bg': activeFolder.hoverColor
          } as React.CSSProperties}
          role="dialog"
          aria-modal="true"
          aria-label={`Folder: ${activeFolder.title}`}
        >
          {/* Top Sticky Editorial Navigation Bar */}
          <header className="fullscreen-topbar">
            <div className="fullscreen-topbar-inner">
              <div className="topbar-left-group">
                <button
                  type="button"
                  className="editorial-back-pill"
                  onClick={() => handleCloseExpandedFolder(false)}
                  aria-label="Back to Archive Folder Stack"
                >
                  <span className="back-chevron">←</span>
                  <span className="back-text">BACK TO ARCHIVE</span>
                </button>
              </div>

              <div className="topbar-right-group">
                <button
                  type="button"
                  className="editorial-close-btn"
                  onClick={() => handleCloseExpandedFolder(false)}
                  aria-label="Close Folder"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          </header>

          {/* Full-Screen Editorial Dossier Canvas */}
          <main className="fullscreen-main-canvas">
            <div className="fullscreen-content-container">
              {activeFolder.id === 'youtube-900k-story' || activeFolder.content.storyProof ? (
                <div className="story-clean-page">
                  {/* Clean Page Title: Exactly 900K+ Subscribers in One Year */}
                  <h1 className="story-clean-title">
                    900K+ Subscribers in One Year
                  </h1>

                  {/* Clean Photos: Attached into the exact Canva seamless rectangle (Top 3, Bottom 2) with NO GAPS */}
                  <div className="story-canva-mosaic">
                    {/* Top Row: Playbutton 1, Playbutton 2, Full Channel Overview */}
                    <div className="story-canva-row-top">
                      <div className="story-canva-item story-canva-pb1">
                        <img
                          src={getAssetUrl('images/story-part1-ultra.webp')}
                          onError={(e) => { e.currentTarget.src = getAssetUrl('images/story-part1-ultra.jpg'); }}
                          alt="Official YouTube Creator Award Silver Play Button"
                          className="story-canva-img"
                          loading="eager"
                          decoding="async"
                          fetchPriority="high"
                        />
                      </div>
                      <div className="story-canva-item story-canva-pb2">
                        <img
                          src={getAssetUrl('images/story-part2-ultra.webp')}
                          onError={(e) => { e.currentTarget.src = getAssetUrl('images/story-part2-ultra.jpg'); }}
                          alt="Jahnvi holding YouTube Silver Play Button at workstation"
                          className="story-canva-img"
                          loading="eager"
                          decoding="async"
                          fetchPriority="high"
                        />
                      </div>
                      <div className="story-canva-item story-canva-channel">
                        <img
                          src={getAssetUrl('images/story-part3-ultra.webp')}
                          onError={(e) => { e.currentTarget.src = getAssetUrl('images/story-part3-ultra.png'); }}
                          alt="GeekyGamer YouTube Channel proof"
                          className="story-canva-img"
                          loading="eager"
                          decoding="async"
                          fetchPriority="high"
                        />
                      </div>
                    </div>

                    {/* Bottom Row: Viral Views, Channel Header Badge */}
                    <div className="story-canva-row-bottom">
                      <div className="story-canva-item story-canva-viral">
                        <img
                          src={getAssetUrl('images/story-part4-ultra-cover.webp')}
                          onError={(e) => { e.currentTarget.src = getAssetUrl('images/story-part4-ultra-cover.png'); }}
                          alt="GeekyGamer Most Popular Videos proof showing 28M views"
                          className="story-canva-img"
                          loading="eager"
                          decoding="async"
                          fetchPriority="high"
                        />
                      </div>
                      <div className="story-canva-item story-canva-badge">
                        <img
                          src={getAssetUrl('images/story-part5-ultra.webp')}
                          onError={(e) => { e.currentTarget.src = getAssetUrl('images/story-part5-ultra.png'); }}
                          alt="GeekyGamer verified channel badge and 975K subscribers"
                          className="story-canva-img"
                          loading="eager"
                          decoding="async"
                          fetchPriority="high"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Text in white box: restored earlier font but thinner */}
                  <div className="story-text-white-box">
                    <p className="story-thin-body-text">
                      I co-built this YouTube channel with my brother and worked as its video editor. In just one year, we grew the channel to 900K+ subscribers, with multiple videos reaching millions of views, including one that surpassed 27M views. We recently sold the channel, so the original content is no longer publicly available. Below are a few highlights from my work on the channel.
                    </p>
                  </div>

                  {/* Black Section at the back with Pink Note on Top and Seamless 9:16 Reels Below */}
                  <div className="story-reels-dark-section" aria-label="Geeky Gamer Highlights — 4 Short Form Reels">
                    {/* Pink Note on Top */}
                    <div className="reels-ticket-note-wrap archive-reels-note-top">
                      <div className="reels-ticket-note">
                        <div className="ticket-inner">
                          <span className="ticket-text">
                            These reels are from 2023 and were targeted for kids
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Seamless 9:16 Reel Columns sticked together like the photos above */}
                    <div className="story-reels-mosaic">
                      {YOUTUBE_900K_REELS.map((reel, rIdx) => (
                        <StoryReelCard
                          key={reel.id || rIdx}
                          reel={reel}
                          index={rIdx}
                          isMobile={isMobile}
                          onMobileClick={(idx) => setActiveMobileReelIndex(idx)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : activeFolder.id === 'skills-tools' ? (
                <div className="story-clean-page skills-clean-page">
                  {/* Clean Page Title: Tools I Use */}
                  <h1 className="story-clean-title">
                    Tools I Use
                  </h1>

                  {/* Side-by-side: 900K story styled Photo Box on left, White Text Box on right */}
                  <div className="skills-side-by-side-wrap">
                    <div
                      className="skills-photo-canva-box"
                      onClick={() => setZoomedPhoto(getAssetUrl('images/tools-workstation.webp'))}
                      role="button"
                      tabIndex={0}
                      aria-label="View workstation photo full size"
                      title="Click to zoom photo"
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setZoomedPhoto(getAssetUrl('images/tools-workstation.webp'))}
                    >
                      <img
                        src={getAssetUrl('images/tools-workstation.webp')}
                        onError={(e) => { e.currentTarget.src = getAssetUrl('images/tools-workstation.png'); }}
                        alt="Jahnvi Agarwal — Editing at workstation with Premiere Pro"
                        className="skills-canva-img"
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                      />
                    </div>

                    {/* Skills Narrative Text in White Block */}
                    <div className="story-text-white-box skills-side-text-box">
                      <p className="story-thin-body-text">
                        I use Premiere Pro at an advanced level for editing, storytelling, pacing, and retention, with basic After Effects for motion graphics and visual effects. I also use tools like ElevenLabs and Claude to streamline parts of my workflow and explore new ways of creating. I can handle a project end-to-end — from script and voice to editing and final delivery.
                      </p>
                    </div>
                  </div>
                </div>
              ) : activeFolder.id === 'about-me' ? (
                <div className="story-clean-page about-clean-page">
                  {/* Clean Page Title: More About Me */}
                  <h1 className="story-clean-title">
                    More About Me
                  </h1>

                  {/* Photo Block: Sized to photo only like 900K story */}
                  <div
                    className="about-photo-block"
                    aria-label="Photo Block"
                    onClick={() => setZoomedPhoto(getAssetUrl('images/about-childhood.webp'))}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setZoomedPhoto(getAssetUrl('images/about-childhood.webp'))}
                    role="button"
                    tabIndex={0}
                    style={{ cursor: 'pointer' }}
                    title="Click to zoom photo"
                  >
                    <img
                      src={getAssetUrl('images/about-childhood.webp')}
                      onError={(e) => { e.currentTarget.src = getAssetUrl('images/about-childhood.png'); }}
                      alt="Jahnvi Agarwal — Childhood photo"
                      className="about-photo-img"
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                    />
                  </div>

                  {/* Text in white box */}
                  <div className="story-text-white-box about-text-box">
                    <p className="story-thin-body-text">
                      I am 21. Outside of editing, I’m naturally curious about technology, AI, and anything that lets me create or build something new. I like experimenting, learning by doing, and figuring out how things work. I’m always exploring new tools and ideas that can make the creative process faster, smarter, or simply more interesting. I’m dedicated to improving my craft and take my work seriously. I’m based in India, proficient in English and Hindi, and absolutely love what I do :).
                    </p>
                  </div>
                </div>
              ) : activeFolder.id === 'desk-tour' ? (
                <div className="story-clean-page desk-tour-clean-page">
                  {/* Clean Page Title: Desk Tour */}
                  <h1 className="story-clean-title">
                    Desk Tour
                  </h1>

                  {/* Clean Workstations Photo Mosaic (Zero spaces, sharp corners, seamless like 900K story) */}
                  <div className="desk-mosaic-showcase">
                    {/* Top Row: Workstation 1 Angle (50%), Workstation 1 Front (50%) */}
                    <div className="desk-mosaic-row desk-mosaic-row-top">
                      <div
                        className="desk-mosaic-item desk-mosaic-half"
                        onClick={() => setZoomedPhoto(getAssetUrl('images/workstation-1-angle.webp'))}
                        tabIndex={0}
                        role="button"
                        aria-label="View Workstation 1 angle in full size"
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setZoomedPhoto(getAssetUrl('images/workstation-1-angle.webp'))}
                      >
                        <img
                          src={getAssetUrl('images/workstation-1-angle.webp')}
                          onError={(e) => { e.currentTarget.src = getAssetUrl('images/workstation-1-angle.jpg'); }}
                          alt="Workstation 1 — 4K Editing Setup with Antec PC and Premiere Pro"
                          className="desk-mosaic-img"
                          loading="eager"
                          decoding="async"
                          fetchPriority="high"
                        />
                      </div>

                      <div
                        className="desk-mosaic-item desk-mosaic-half"
                        onClick={() => setZoomedPhoto(getAssetUrl('images/workstation-1-front.webp'))}
                        tabIndex={0}
                        role="button"
                        aria-label="View Workstation 1 front view in full size"
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setZoomedPhoto(getAssetUrl('images/workstation-1-front.webp'))}
                      >
                        <img
                          src={getAssetUrl('images/workstation-1-front.webp')}
                          onError={(e) => { e.currentTarget.src = getAssetUrl('images/workstation-1-front.jpg'); }}
                          alt="Workstation 1 — Front Setup with RGB Antec Rig and Timeline Screen"
                          className="desk-mosaic-img"
                          loading="eager"
                          decoding="async"
                          fetchPriority="high"
                        />
                      </div>
                    </div>

                    {/* Bottom Row: Workstation 2 Dell (100% full width) */}
                    <div className="desk-mosaic-row desk-mosaic-row-bottom">
                      <div
                        className="desk-mosaic-item desk-mosaic-full"
                        onClick={() => setZoomedPhoto(getAssetUrl('images/workstation-2-dell.webp'))}
                        tabIndex={0}
                        role="button"
                        aria-label="View Workstation 2 in full size"
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setZoomedPhoto(getAssetUrl('images/workstation-2-dell.webp'))}
                      >
                        <img
                          src={getAssetUrl('images/workstation-2-dell.webp')}
                          onError={(e) => { e.currentTarget.src = getAssetUrl('images/workstation-2-dell.jpg'); }}
                          alt="Workstation 2 — Dell Display with Dedicated Editing Shortcuts Setup"
                          className="desk-mosaic-img"
                          loading="eager"
                          decoding="async"
                          fetchPriority="high"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Text in white box */}
                  <div className="story-text-white-box desk-tour-text-box">
                    <p className="story-thin-body-text">
                      I have two workstations built for demanding editing work. Both can handle 4K editing and high-resolution projects smoothly, allowing me to work efficiently and deliver high-quality videos.
                    </p>
                  </div>
                </div>
              ) : activeFolder.id === 'resume' ? (
                <div className="story-clean-page resume-clean-page">
                  {/* Clean Page Title: Resume + Download Button */}
                  <div className="resume-header-row">
                    <h1 className="story-clean-title">
                      Resume
                    </h1>
                    <a
                      href={getAssetUrl('images/resume.png')}
                      download="Jahnvi-Agarwal-Resume.png"
                      className="resume-download-btn"
                      aria-label="Download Jahnvi Agarwal's Resume"
                      title="Download high-resolution resume image"
                    >
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      <span>DOWNLOAD RESUME</span>
                    </a>
                  </div>

                  {/* Photo Block: Sized to photo with crisp white border and zoom */}
                  <div
                    className="resume-photo-block"
                    aria-label="Jahnvi Agarwal — Resume Document"
                    onClick={() => setZoomedPhoto(getAssetUrl('images/resume.png'))}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setZoomedPhoto(getAssetUrl('images/resume.png'))}
                    role="button"
                    tabIndex={0}
                    style={{ cursor: 'pointer' }}
                    title="Click to zoom resume"
                  >
                    <img
                      src={getAssetUrl('images/resume.webp')}
                      onError={(e) => { e.currentTarget.src = getAssetUrl('images/resume.png'); }}
                      alt="Jahnvi Agarwal — Official Resume"
                      className="resume-photo-img"
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                    />
                    <div className="resume-zoom-hint">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                      <span>Click to expand</span>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Bottom "OTHER ARCHIVE FOLDERS" Switcher with Prev/Next Controls (Ref: Recording 00:20) */}
              <div className="fullscreen-other-folders">
                <div className="other-folders-header">
                  <div className="other-folders-title-wrap">
                    <span className="other-pill-badge">OTHER ARCHIVE FOLDERS</span>
                    <span className="other-count">{currentIdx + 1} OF {ARCHIVE_FOLDERS.length}</span>
                  </div>
                  <div className="other-nav-arrows">
                    <button
                      type="button"
                      className="other-arrow-btn"
                      onClick={handlePrevFolder}
                      aria-label="Previous archive folder"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      className="other-arrow-btn"
                      onClick={handleNextFolder}
                      aria-label="Next archive folder"
                    >
                      →
                    </button>
                  </div>
                </div>

                <div className="other-folders-grid">
                  {ARCHIVE_FOLDERS.filter(f => f.id !== activeFolder.id).map(other => (
                    <button
                      key={other.id}
                      type="button"
                      className={`other-folder-btn theme-${other.theme}`}
                      onClick={() => handleOpenFolder(other.id)}
                      onMouseEnter={() => preloadFolderPhotos(other.id)}
                      onTouchStart={() => preloadFolderPhotos(other.id)}
                    >
                      <div className="other-icon-wrap" aria-hidden="true">
                        {other.icon}
                      </div>
                      <div className="other-btn-text">
                        <span className="other-btn-title">{other.title}</span>
                        <span className="other-btn-tag">{other.shoulderTag}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      )}

      {/* Lightbox / Zoom Modal for Desk Tour Photos */}
      {zoomedPhoto && (
        <div
          className="desk-lightbox-overlay"
          onClick={() => setZoomedPhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged workstation preview"
        >
          <div className="desk-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="desk-lightbox-close"
              onClick={() => setZoomedPhoto(null)}
              aria-label="Close enlarged preview"
            >
              ✕
            </button>
            <img
              src={zoomedPhoto}
              alt="Workstation setup enlarged"
              className="desk-lightbox-img"
              decoding="async"
            />
          </div>
        </div>
      )}

      {/* Lightbox for Mobile 900K Archive Reels (allows visitors to see full resolution work on mobile) */}
      {activeMobileReelIndex !== null && isMobile && (
        <MobileVideoLightbox
          videos={YOUTUBE_900K_REELS.map((r) => ({
            id: r.id,
            title: r.title,
            badge: r.badge,
            videoUrl: r.videoUrl || '',
            poster: r.poster,
            aspectRatio: '9:16'
          }))}
          currentIndex={activeMobileReelIndex}
          onClose={() => setActiveMobileReelIndex(null)}
          onIndexChange={(newIdx) => setActiveMobileReelIndex(newIdx)}
        />
      )}
    </section>
  );
};

export default ArchiveSection;
