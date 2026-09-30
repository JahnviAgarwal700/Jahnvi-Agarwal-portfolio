import React, { useState, useEffect } from 'react';

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
    categoryBadge: string;
    headline: string;
    subtext: string;
    metrics?: Array<{
      value: string;
      label: string;
    }>;
    columns: Array<{
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
    <filter id="sticker-shadow-1" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="5" stdDeviation="4.5" floodColor="#000000" floodOpacity="0.25" />
    </filter>
    <g filter="url(#sticker-shadow-1)">
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
    </g>
  </svg>
);

// 2. What I Edit: 35mm Cinema Reel & Multi-Format Playback Canister
const FilmReelSticker: React.FC = () => (
  <svg width="68" height="68" viewBox="0 0 68 68" fill="none" className="sticker-svg" aria-hidden="true">
    <filter id="sticker-shadow-reel" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="5" stdDeviation="4.5" floodColor="#000000" floodOpacity="0.25" />
    </filter>
    <g filter="url(#sticker-shadow-reel)">
      {/* Thick white die-cut contour */}
      <circle cx="34" cy="34" r="27" fill="#FFFFFF" />
      {/* Outer Reel Ring */}
      <circle cx="34" cy="34" r="23" fill="#111111" />
      <circle cx="34" cy="34" r="20" fill="#FFFFFF" />
      <circle cx="34" cy="34" r="18" fill="#111111" />
      {/* Film Spool Holes with Colorful Format Accents */}
      <circle cx="34" cy="23" r="3.8" fill="#4FD1C5" />
      <circle cx="43" cy="29" r="3.8" fill="#FFD026" />
      <circle cx="40" cy="41" r="3.8" fill="#FF6B8B" />
      <circle cx="28" cy="41" r="3.8" fill="#72D8BE" />
      <circle cx="25" cy="29" r="3.8" fill="#FFAE33" />
      {/* Center Spindle & Play Triangle */}
      <circle cx="34" cy="34" r="6.5" fill="#FFFFFF" />
      <polygon points="32.5,30.5 37.5,34 32.5,37.5" fill="#111111" />
    </g>
  </svg>
);

// 3. Views & Results: Viral Attention Rocket Launching with 45M+ Spark
const RocketSticker: React.FC = () => (
  <svg width="68" height="68" viewBox="0 0 68 68" fill="none" className="sticker-svg" aria-hidden="true">
    <filter id="sticker-shadow-2" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="5" stdDeviation="4.5" floodColor="#000000" floodOpacity="0.25" />
    </filter>
    <g filter="url(#sticker-shadow-2)">
      {/* Thick white die-cut sticker contour */}
      <path d="M34 3 C45 3 55 18 53 34 L60 47 L47 45 L41 57 L34 48 L27 57 L21 45 L8 47 L15 34 C13 18 23 3 34 3 Z" fill="#FFFFFF" />
      {/* Rocket Body */}
      <path d="M34 7 C42 7 49 19 48 34 L34 42 L20 34 C19 19 26 7 34 7 Z" fill="#111111" />
      {/* Rocket Wings */}
      <path d="M20 34 L12 43 L22 41 Z" fill="#FFC800" />
      <path d="M48 34 L56 43 L46 41 Z" fill="#FFC800" />
      {/* Porthole */}
      <circle cx="34" cy="22" r="6.5" fill="#FFC800" />
      <circle cx="34" cy="22" r="3.2" fill="#FFFFFF" />
      {/* Exhaust Fire */}
      <polygon points="29,42 34,57 39,42" fill="#FF4400" />
      <polygon points="31,42 34,51 37,42" fill="#FFC800" />
      {/* Sparkles */}
      <circle cx="56" cy="18" r="2.8" fill="#111111" />
      <circle cx="12" cy="22" r="2.2" fill="#111111" />
    </g>
  </svg>
);

// 3. About Me: Video Editor with Studio Headphones & Retro Glasses
const EditorSticker: React.FC = () => (
  <svg width="68" height="68" viewBox="0 0 68 68" fill="none" className="sticker-svg" aria-hidden="true">
    <filter id="sticker-shadow-3" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="5" stdDeviation="4.5" floodColor="#000000" floodOpacity="0.25" />
    </filter>
    <g filter="url(#sticker-shadow-3)">
      {/* Thick white sticker circle */}
      <circle cx="34" cy="34" r="27" fill="#FFFFFF" />
      {/* Character face */}
      <circle cx="34" cy="34" r="22" fill="#FFC800" />
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
    </g>
  </svg>
);

// 4. Desk Tour: Dual 4K Workstation Displays & Real-Time NLE Timeline
const WorkstationSticker: React.FC = () => (
  <svg width="68" height="68" viewBox="0 0 68 68" fill="none" className="sticker-svg" aria-hidden="true">
    <filter id="sticker-shadow-4" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="5" stdDeviation="4.5" floodColor="#000000" floodOpacity="0.25" />
    </filter>
    <g filter="url(#sticker-shadow-4)">
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
    </g>
  </svg>
);

// 5. Skills & Tools: Razor Blade / Scissors Cutting 35mm Celluloid
const ScissorsSticker: React.FC = () => (
  <svg width="68" height="68" viewBox="0 0 68 68" fill="none" className="sticker-svg" aria-hidden="true">
    <filter id="sticker-shadow-5" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="5" stdDeviation="4.5" floodColor="#000000" floodOpacity="0.25" />
    </filter>
    <g filter="url(#sticker-shadow-5)">
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
    </g>
  </svg>
);

const ARCHIVE_FOLDERS: FolderItem[] = [
  {
    id: 'youtube-900k-story',
    title: 'YOUTUBE : 900K STORY',
    shoulderTag: '180+ Videos · 900K+ Subs',
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
      categoryBadge: 'YOUTUBE 900K CASE STUDY & PRODUCTION LOGS',
      headline: 'Scaling Geeky Gamer from 0 to 900,000+ YouTube Subscribers',
      subtext: 'The full production playbook of how rigorous script-to-screen pacing, multi-track audio foley, and kinetic visual hooks co-built one of the most engaged gaming channels in the ecosystem.',
      metrics: [
        { value: '900K+', label: 'Subscriber Milestones' },
        { value: '180+', label: 'Long-Form Masters' },
        { value: '45M+', label: 'Total Channel Views' },
        { value: '1 Year', label: 'Scaling Velocity' }
      ],
      columns: [
        {
          heading: 'THE 900K EDITING PLAYBOOK',
          items: [
            {
              title: 'Script-to-Screen Pacing Architecture',
              desc: 'Restructuring narrative arcs, eliminating dead air, and introducing fast-paced kinetic zoom punch-ins synced tightly with audio accents.',
              pill: 'Pacing Engine · Long-Form',
              highlight: true
            },
            {
              title: 'Multi-Track Foley & Meme Audio Anchors',
              desc: 'Layering custom sound effects, risers, whooshes, and pop-culture sound bites to create subconscious dopamine loops and keep attention locked.',
              pill: 'Layered SFX · High Energy',
              highlight: true
            },
            {
              title: 'Thumbnail-to-Intro Continuity Hooks',
              desc: 'Ensuring the first 5 seconds immediately fulfill the curiosity gap promised by the thumbnail and title, cutting drop-offs by over 35%.',
              pill: 'Retention Defense'
            },
            {
              title: 'Creator Voice & Cadence Elevation',
              desc: 'Preserving the authentic personality and comedic timing of the host while trimming filler words and accelerating punchlines.',
              pill: 'Creator Chemistry'
            }
          ]
        },
        {
          heading: 'KEY PRODUCTION DELIVERABLES',
          items: [
            {
              title: 'YouTube Long-Form Masters',
              desc: '15–35 minute deep-dive narrative videos with multi-cam sync, layered B-roll archives, and retention-optimized chapters.',
              pill: '180+ Delivered'
            },
            {
              title: 'Viral Shorts Cutdowns',
              desc: 'High-impact 30–60 second vertical cutdowns engineered with word-by-word kinetic captions, animated emojis, and sound-designed beat drops.',
              pill: '120+ Viral Shorts'
            },
            {
              title: 'High-Paced Sizzle Teasers',
              desc: 'Dynamic 15s–30s trailer sizzles used across community posts and Instagram to drive immediate viewer migration to the main video.',
              pill: 'Audience Traffic'
            }
          ]
        }
      ],
      pills: ['YouTube Long-Form', '900K Subscribers', 'Retention First', 'Multi-Track Foley', 'Kinetic Zooms', 'Curiosity Hooks']
    }
  },
  {
    id: 'what-i-edit',
    title: 'WHAT I EDIT',
    shoulderTag: '8 Formats · Scaled Video',
    theme: 'teal',
    bgColor: '#FFFFFF',
    hoverColor: '#4FD1C5',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M7 4v16" />
        <path d="M17 4v16" />
        <path d="M2 12h20" />
        <path d="M2 8h5" />
        <path d="M2 16h5" />
        <path d="M17 8h5" />
        <path d="M17 16h5" />
      </svg>
    ),
    sticker: <FilmReelSticker />,
    content: {
      categoryBadge: 'PRODUCTION REPERTOIRE & FORMAT DIRECTORY',
      headline: '8 Specialized Editorial Formats Engineered for Viewer Retention',
      subtext: 'From high-tempo retention-engineered YouTube long-form to 4K industrial manufacturing films and viral vertical short-form reels, every cut is structured with format-specific pacing rules.',
      metrics: [
        { value: '8 Formats', label: 'Core Specializations' },
        { value: '1,000+', label: 'Videos Delivered' },
        { value: '4K / 9:16', label: 'Multi-Aspect Delivery' },
        { value: '100%', label: 'Audio & Color Finish' }
      ],
      columns: [
        {
          heading: 'LONG-FORM & COMMERCIAL PRODUCTIONS',
          items: [
            {
              title: '01. Short Form Videos',
              desc: 'High-impact 30–60 second vertical cutdowns engineered with word-by-word kinetic captions, animated emojis, and sound-designed beat drops.',
              pill: '62%+ Completion Rate',
              highlight: true
            },
            {
              title: '02. YouTube Content',
              desc: '10–35 minute deep-dive narrative videos with multi-cam sync, layered B-roll archives, and retention-optimized drop-off protection.',
              pill: '900K+ Subs Scaled',
              highlight: true
            },
            {
              title: '03. Advertising & Commercials',
              desc: 'High-conversion digital ad spots engineered with strong first-3-second scroll stoppers, dynamic pacing, and commercial audio grading.',
              pill: 'High Conversion · Paid Ads'
            },
            {
              title: '04. Manufacturing Ads',
              desc: 'Cinematic corporate documentaries and factory facility showcases highlighting technical precision, heavy equipment, and brand heritage.',
              pill: '4K Precision Master'
            }
          ]
        },
        {
          heading: 'CORPORATE, AI & CREATIVE EXPERIMENTS',
          items: [
            {
              title: '05. Corporate Films',
              desc: 'Founder spotlights, investor presentations, and internal brand manifestos with clean dialogue leveling and bespoke cinematic LUTs.',
              pill: 'Corporate · Executive Level'
            },
            {
              title: '06. AI-Based Films',
              desc: 'Pioneering workflows combining Topaz upscaling, ElevenLabs voice synthesis, and generative visual accents into polished narratives.',
              pill: 'AI Acceleration Workflow',
              highlight: true
            },
            {
              title: '07. Social Content',
              desc: 'Fast-paced talking head formats, community teasers, and educational breakdowns optimized for shareability and comment engagement.',
              pill: 'Viral Reach & CTR'
            },
            {
              title: '08. Other Creative Content',
              desc: 'Rhythmic music cutdowns, stylized montage edits, and creative passion projects with custom speed-ramping and match cuts.',
              pill: 'Stylized & Mixed Media'
            }
          ]
        }
      ],
      pills: [
        'Short Form',
        'YouTube',
        'Advertising',
        'Manufacturing Ads',
        'Corporate Films',
        'AI-Based Films',
        'Social Content',
        'Other Creative Content'
      ]
    }
  },
  {
    id: 'views-results',
    title: 'VIEWS & RESULTS',
    shoulderTag: '45M+ Views · Analytics',
    theme: 'coral',
    bgColor: '#FFFFFF',
    hoverColor: '#FF6B8B',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#111111">
        <rect x="3" y="14" width="4.2" height="7" rx="1.6" />
        <rect x="9.9" y="8" width="4.2" height="13" rx="1.6" />
        <rect x="16.8" y="3" width="4.2" height="18" rx="1.6" />
      </svg>
    ),
    sticker: <RocketSticker />,
    content: {
      categoryBadge: 'AUDIENCE RETENTION & TELEMETRY LOGS',
      headline: '45,000,000+ Views Engineered Across Scaled Audiences',
      subtext: 'Video editing is not just aesthetic assembly—it is the applied science of human attention spans, dopamine reward pacing, and algorithmic session completion.',
      metrics: [
        { value: '45M+', label: 'Total Views Generated' },
        { value: '900K+', label: 'Subscriber Footprint' },
        { value: '+38%', label: 'Average Retention Lift' },
        { value: '62.4%', label: 'Shorts Completion' }
      ],
      columns: [
        {
          heading: 'RETENTION ARCHITECTURE PLAYBOOK',
          items: [
            {
              title: 'The 3-Second Sensory Hook',
              desc: 'Eliminating introductory logos and filler. Opening directly with high-tempo visual contrast, a contextual sound cue (riser/impact), and immediate narrative stakes.',
              highlight: true
            },
            {
              title: 'The 4-Second Micro-Shift Rule',
              desc: 'Ensuring that every 4 to 6 seconds the visual stimulus shifts: angle toggles, sound-designed B-roll inserts, animated punch-ins, or text callouts to prevent cognitive disengagement.',
              highlight: true
            },
            {
              title: 'Audio-Driven Pacing & Sound Anchors',
              desc: 'Layering whooshes, tape stops, subtle sub-bass drops, and riser swells to subconsciously signal narrative transitions before they register visually.',
              highlight: false
            }
          ]
        },
        {
          heading: 'QUANTIFIABLE AUDIENCE TELEMETRY',
          items: [
            {
              title: '+38% First-30s Retention Lift',
              desc: 'Across dozens of long-form videos, restructuring the hook and pruning early timeline pauses raised initial 30-second retention from 46% to an average of 64%.',
              pill: 'Benchmark vs. Channel Avg'
            },
            {
              title: '62.4% Short-Form Completion Rate',
              desc: 'Vertical cutdowns engineered with loop transitions routinely achieve 60%+ completion rates on YouTube Shorts, unlocking viral browse page distribution.',
              pill: 'Short-Form Telemetry'
            },
            {
              title: '900,000+ Subscriber Community',
              desc: 'Direct editing stewardship helping Geeky Gamer scale from early milestones into one of the largest niche gaming channels in the ecosystem.',
              pill: 'Scale Metric'
            }
          ]
        }
      ],
      pills: ['Hook Architecture', 'Micro-Pacing', 'Audio Anchors', 'Watch-Time Multiplication', 'YouTube Analytics', 'CTR Engineering']
    }
  },
  {
    id: 'about-me',
    title: 'ABOUT ME',
    shoulderTag: 'Philosophy · 4+ Yrs',
    theme: 'amber',
    bgColor: '#FFFFFF',
    hoverColor: '#FFAE33',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4.2" />
        <path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2" />
      </svg>
    ),
    sticker: <EditorSticker />,
    content: {
      categoryBadge: 'EDITOR PROFILE & METHODOLOGY',
      headline: 'Storytelling Through Rhythm, Restraint, and Precision',
      subtext: 'A behind-the-scenes look at the creative mindset of Jahnvi Agarwal—blending technical command of non-linear editing software with deep empathy for the viewer.',
      metrics: [
        { value: '3+ Years', label: 'Full-Time Experience' },
        { value: '100%', label: 'Deadline Reliability' },
        { value: '24h', label: 'Average Response Time' },
        { value: 'Top 1%', label: 'YouTube Pacing Discipline' }
      ],
      columns: [
        {
          heading: 'THE CREATIVE PHILOSOPHY',
          items: [
            {
              title: 'Editing is Invisible Psychology',
              desc: 'The best cuts are the ones the viewer never consciously notices. When sound, emotion, and motion align, the viewer forgets they are watching a timeline and simply experiences the story.',
              highlight: true
            },
            {
              title: 'Respecting the Creator Cadence',
              desc: 'Every creator has a distinct voice. My job is never to paste a generic template onto their work, but to elevate their natural cadence, humor, and intellectual rhythm.',
              highlight: false
            },
            {
              title: 'Relentless Timeline Hygiene',
              desc: 'Color-coded timeline tracks, synchronized multi-track audio labeling, and non-destructive adjustment layers ensure lightning-fast revisions and stress-free handoffs.',
              highlight: false
            }
          ]
        },
        {
          heading: 'PROFESSIONAL CONDUCT & CULTURE',
          items: [
            {
              title: 'Timezone Agnostic Collaboration',
              desc: 'Seamlessly collaborating with international teams and creators across India, the US, and Europe via structured Frame.io timestamped review cycles.',
              pill: 'Global Workflows'
            },
            {
              title: 'Publishing Calendar Discipline',
              desc: 'In creator media, consistency is survival. In over 3 years of production, zero scheduled publishing deadlines have ever been missed.',
              pill: '100% Reliability'
            }
          ]
        }
      ],
      pills: ['Invisible Psychology', 'Timeline Discipline', 'Frame.io Sync', 'Global Remote Work', 'Creative Ownership', 'Story Pacing']
    }
  },
  {
    id: 'desk-tour',
    title: 'DESK TOUR',
    shoulderTag: 'Dual 4K · RTX Rig',
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
      categoryBadge: 'HARDWARE WORKSTATION & MONITORING RIG',
      headline: 'Precision Hardware Engineered for Uninterrupted Creative Flow',
      subtext: 'A high-performance dual-display editing suite built to scrub 4K 10-bit 4:2:2 and 6K RAW footage in real-time with zero timeline lag or proxy render bottlenecks.',
      metrics: [
        { value: '4K/6K', label: 'Real-Time Playback' },
        { value: '7000MB/s', label: 'NVMe Read Speeds' },
        { value: '98%', label: 'DCI-P3 Color Accuracy' },
        { value: '16TB', label: 'Secure Project Vault' }
      ],
      columns: [
        {
          heading: 'WORKSTATION RIG SPECIFICATIONS',
          items: [
            {
              title: 'Custom Multi-Core Editing Workstation',
              desc: 'High-frequency AMD / Apple Silicon architecture with 64GB high-speed DDR5 RAM and NVIDIA GeForce RTX 40-Series GPU with 16GB VRAM for instantaneous CUDA/Metal render acceleration.',
              pill: '64GB RAM · RTX GPU',
              highlight: true
            },
            {
              title: 'Ultra-Fast NVMe Scratch Architecture',
              desc: 'Dedicated Gen4 M.2 NVMe SSDs boasting 7,000 MB/s read/write speeds for instantaneous project loads, zero-drop timeline scrubbing, and frictionless cache playback.',
              pill: '7,000 MB/s NVMe RAID'
            },
            {
              title: 'Redundant Archival Storage Vault',
              desc: 'Dual-drive mirrored RAID arrays paired with secure cold cloud backups to protect client raw footage, project files, and finished master exports forever.',
              pill: '16TB Archival Vault'
            }
          ]
        },
        {
          heading: 'DISPLAYS, MONITORING & TACTILE CONTROL',
          items: [
            {
              title: 'Dual Color-Calibrated IPS Displays',
              desc: 'Calibrated with X-Rite hardware probes to 100% sRGB and 98% DCI-P3 color gamuts, ensuring color grades translate faithfully across iPhone OLEDs, laptops, and televisions.',
              pill: '100% sRGB · 98% DCI-P3',
              highlight: true
            },
            {
              title: 'Studio Nearfield & Headphone Monitoring',
              desc: 'Audio-Technica ATH-M50x studio reference monitors and discrete high-headroom 24-bit audio interface for surgical dialogue EQ, plosive cleaning, and stereo width checks.',
              pill: 'Flat-Response Audio'
            },
            {
              title: 'Tactile Macro Control Surfaces',
              desc: 'Custom-programmed Stream Deck and macro rotary dials for rapid ripple trims, slip-and-slide edits, audio gain toggles, and instant color adjustment shortcuts.',
              pill: 'Stream Deck & Dials'
            }
          ]
        }
      ],
      pills: ['RTX Acceleration', 'NVMe Scratch Array', 'Color-Calibrated IPS', 'ATH-M50x Reference', 'Stream Deck Automation']
    }
  },
  {
    id: 'skills-tools',
    title: 'SKILLS & TOOLS',
    shoulderTag: 'Premiere · After Effects',
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
      categoryBadge: 'SOFTWARE MASTERY & TECHNICAL CAPABILITIES',
      headline: 'Industry-Standard NLE Suites, Motion Graphics & AI Pipelines',
      subtext: 'Deep technical fluency across the industry standard Adobe creative suite, Blackmagic color science, audio restoration modules, and modern AI acceleration tools.',
      metrics: [
        { value: '5+', label: 'Mastered Creative Apps' },
        { value: '10K+', label: 'Sound FX Soundbank' },
        { value: '-14 LUFS', label: 'Audio Loudness Standard' },
        { value: '100%', label: 'Color Space Accurate' }
      ],
      columns: [
        {
          heading: 'CORE NLE & POST-PRODUCTION SOFTWARE',
          items: [
            {
              title: 'Adobe Premiere Pro (Master Tier)',
              desc: 'Deep mastery of non-linear timeline assembly, multicam grouping, nested sequence workflows, Lumetri color curves, dynamic audio ducking, and Dynamic Link integration.',
              pill: 'Primary NLE Engine',
              highlight: true
            },
            {
              title: 'Adobe After Effects',
              desc: 'Custom 2.5D camera animation, planar tracking with Mocha, kinetic title typography, animated motion graphics, rotoscoping, and seamless visual transitions.',
              pill: 'Motion Graphics Suite',
              highlight: true
            },
            {
              title: 'DaVinci Resolve',
              desc: 'Node-based color grading, Color Space Transforms (CST), ACES color workflows, shot matching, skin tone isolation, and film grain emulation.',
              pill: 'Color Science & Finish'
            },
            {
              title: 'Adobe Audition & iZotope RX',
              desc: 'Dialogue spectral de-noising, room reverb suppression, sibilance reduction, dynamic multi-band compression, and broadcast loudness leveling (EBU R128 / -14 LUFS).',
              pill: 'Surgical Audio Cleanup'
            }
          ]
        },
        {
          heading: 'ADVANCED CAPABILITIES & WORKFLOWS',
          items: [
            {
              title: 'AI Video & Audio Acceleration',
              desc: 'Leveraging Topaz Video AI for archival footage upscaling and frame interpolation; ElevenLabs for voice sync; and Whisper for frame-accurate automated subtitles.',
              pill: 'Next-Gen AI Stack'
            },
            {
              title: 'Multi-Camera Synchronization',
              desc: 'Handling 3 to 5 camera angles with multi-track lavalier audio, syncing via timecode and audio waveforms for fluid switching in talk-show and podcast formats.',
              pill: 'Multi-Cam Workflows'
            },
            {
              title: 'Custom Sound Design & Foley',
              desc: 'Curated 10,000+ sound effect library including cinematic risers, whooshes, analog clicks, metallic hits, and custom ambiences built specifically for creator engagement.',
              pill: 'Layered SFX Engineering'
            }
          ]
        }
      ],
      pills: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'iZotope RX', 'Topaz AI', 'Mocha Tracking', 'Sound Design']
    }
  }
];

export const ArchiveSection: React.FC = () => {
  const [expandedFolderId, setExpandedFolderId] = useState<string | null>(null);
  const [isExiting, setIsExiting] = useState(false);

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

  // Handle ESC key to smoothly close expanded dossier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && expandedFolderId && !isExiting) {
        handleCloseExpandedFolder();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedFolderId, isExiting]);

  const handleOpenFolder = (folderId: string) => {
    setIsExiting(false);
    setExpandedFolderId(folderId);
  };

  const handleCloseExpandedFolder = () => {
    setIsExiting(true);
    setTimeout(() => {
      setExpandedFolderId(null);
      setIsExiting(false);
    }, 380); // Exact match to exit spring animation
  };

  const activeFolder = ARCHIVE_FOLDERS.find(f => f.id === expandedFolderId);
  const currentIdx = activeFolder ? ARCHIVE_FOLDERS.findIndex(f => f.id === activeFolder.id) : 0;

  const handlePrevFolder = () => {
    const prevIdx = (currentIdx - 1 + ARCHIVE_FOLDERS.length) % ARCHIVE_FOLDERS.length;
    handleOpenFolder(ARCHIVE_FOLDERS[prevIdx].id);
  };

  const handleNextFolder = () => {
    const nextIdx = (currentIdx + 1) % ARCHIVE_FOLDERS.length;
    handleOpenFolder(ARCHIVE_FOLDERS[nextIdx].id);
  };

  return (
    <section id="archive" className="section-archive" aria-label="Archive Folder Stack">
      {/* Physical Stack of Layered Die-Cut Folders covering full page left to right */}
      <div className="archive-physical-stack archive-stack-fullwidth" data-reveal-group>
        {ARCHIVE_FOLDERS.map((folder, index) => {
          return (
            <article
              key={folder.id}
              className={`archive-physical-folder folder-item-${folder.id}`}
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
                  onClick={handleCloseExpandedFolder}
                  aria-label="Back to Archive Folder Stack"
                >
                  <span className="back-chevron">←</span>
                  <span className="back-text">BACK TO ARCHIVE</span>
                </button>

                {/* Floating Ana Cuna Outline Nav Pills (Recording 00:07 & 00:15) */}
                <div className="topbar-floating-pills">
                  <a href="#dossier-summary" className="topbar-nav-pill">
                    <span className="pill-dot">○</span>
                    <span>SUMMARY</span>
                  </a>
                  <a href="#dossier-metrics" className="topbar-nav-pill">
                    <span className="pill-dot">○</span>
                    <span>TELEMETRY</span>
                  </a>
                  <a href="#dossier-columns" className="topbar-nav-pill">
                    <span className="pill-dot">○</span>
                    <span>DELIVERABLES</span>
                  </a>
                </div>
              </div>

              <div className="topbar-right-group">
                <div className="topbar-context-badge">
                  <span className="context-dot" />
                  <span className="context-name">{activeFolder.title}</span>
                </div>
                <span className="topbar-code-tag">CAT // 2023–2026</span>
                <button
                  type="button"
                  className="editorial-close-btn"
                  onClick={handleCloseExpandedFolder}
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
              {/* Massive Editorial Header (Ana Cuna Style with Instrument Serif) */}
              <div className="fullscreen-hero-row" id="dossier-summary">
                <div className="hero-category-meta">
                  <span className="category-pill-tag">
                    {activeFolder.content.categoryBadge}
                  </span>
                </div>

                <div className="hero-title-with-pill">
                  <div className="hero-icon-title">
                    <span className="fullscreen-folder-icon" aria-hidden="true">
                      {activeFolder.icon}
                    </span>
                    <h1 className="fullscreen-folder-title">
                      {activeFolder.title}
                    </h1>
                  </div>

                  <span className="floating-ana-pill">
                    {activeFolder.shoulderTag}
                  </span>
                </div>

                <h2 className="fullscreen-headline">
                  {activeFolder.content.headline}
                </h2>

                <p className="fullscreen-subtext">
                  {activeFolder.content.subtext}
                </p>
              </div>

              {/* Big Metrics Telemetry Bar */}
              {activeFolder.content.metrics && (
                <div className="fullscreen-metrics-grid" id="dossier-metrics">
                  {activeFolder.content.metrics.map((m, idx) => (
                    <div key={idx} className="fullscreen-metric-card">
                      <span className="fullscreen-metric-value">{m.value}</span>
                      <span className="fullscreen-metric-label">{m.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* 2-Column Editorial Dossier Grid */}
              <div className="fullscreen-columns-grid" id="dossier-columns">
                {activeFolder.content.columns.map((col, cIdx) => (
                  <div key={cIdx} className="fullscreen-column">
                    <h3 className="column-heading">
                      {col.heading}
                    </h3>
                    <div className="column-items-list">
                      {col.items.map((item, iIdx) => (
                        <div
                          key={iIdx}
                          className={`fullscreen-item-card ${item.highlight ? 'is-highlight' : ''}`}
                        >
                          <div className="card-top-row">
                            <h4 className="card-item-title">{item.title}</h4>
                            {item.pill && (
                              <span className="card-item-pill">{item.pill}</span>
                            )}
                          </div>
                          {item.desc && (
                            <p className="card-item-desc">{item.desc}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Editorial Pill Tags Row */}
              {activeFolder.content.pills && (
                <div className="fullscreen-tags-section">
                  <span className="tags-label">PRODUCTION TAGS:</span>
                  <div className="tags-pill-list">
                    {activeFolder.content.pills.map((pill, pIdx) => (
                      <span key={pIdx} className="fullscreen-ana-tag">
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

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
    </section>
  );
};

export default ArchiveSection;
