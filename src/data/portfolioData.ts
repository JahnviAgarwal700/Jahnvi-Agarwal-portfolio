export interface DualVideoTrack {
  title: string;
  label: string;
  format: string;
  aspectRatio: '16:9' | '9:16';
  videoUrl: string;
  badge: string;
  poster?: string;
}

export interface DualVideosConfig {
  fullLength: DualVideoTrack;
  shortForm: DualVideoTrack;
  subheading: string;
  explanation: string;
  caseStudyTitle: string;
  caseStudyDescription: string;
}

export interface PlaylistItem {
  id: string;
  title: string;
  subtitle?: string;
  videoUrl: string;
  thumbnail: string;
  badge?: string;
  duration?: string;
  description?: string;
}

export interface ExtraVideo {
  title: string;
  subtitle?: string;
  duration?: string;
  badge?: string;
  videoUrl: string;
  thumbnail?: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  heading?: string;
  shortDescription?: string;
  category: 'Short Form' | 'YouTube' | 'Advertising' | 'Corporate' | 'Manufacturing' | 'AI Film' | 'Creative Content' | 'Talking Head' | 'Video Editing' | string;
  aspectRatio: '16:9' | '9:16';
  duration: string;
  thumbnail: string;
  videoUrl?: string; // Optional direct mp4 or embed link
  dualVideos?: DualVideosConfig;
  extraVideo?: ExtraVideo;
  playlist?: PlaylistItem[];
  description: string;
  role: string;
  software: string;
  year: string;
  clientContext?: string;
  featured?: boolean;
}

export const PROFILE_DATA = {
  name: "Jahnvi Agarwal",
  title: "VIDEO EDITOR",
  smallLabel: "VIDEO EDITOR",
  heroHeading: "Hi, I'm Jahnvi.",
  heroStatement: "Hi there :) I am a video editor with 5 years of experience and have edited 1,000+ videos across all genres. I’ve created content that generated millions of views across various countries and co-built a YouTube channel to 900K+ subscribers in one year. I’ve worked across YouTube long, short-form, advertising, corporate, and branded content. I can also handle projects end-to-end — from script to editing and final delivery. I specialize in Premiere Pro, After Effects, and AI-powered workflows to have a fast turnaround.",
  location: "India · Working Worldwide",
  proof: {
    number: "900K+",
    label: "YouTube Subscribers",
    copy: "I co-built and helped scale Geeky Gamer to 900K+ YouTube subscribers, working on content where editing, pacing and understanding the audience mattered as much as the footage itself."
  },
  whatIEdit: [
    "Short Form",
    "YouTube",
    "Advertising",
    "Manufacturing Ads",
    "Corporate Films",
    "AI-Based Films",
    "Social Content",
    "Other Creative Content"
  ],
  about: {
    heading: "A little about me.",
    paragraphs: [
      "I'm a video editor working across content, advertising and commercial video. I've worked on YouTube content, short-form videos, manufacturing ads, corporate films and AI-based content.",
      "I currently work at Nijyo Online Services, creating ads across different industries.",
      "I edit primarily in Adobe Premiere Pro and use AI tools to make my workflow faster and more efficient.",
      "I'm proficient in English and work with clients in India and internationally."
    ]
  },
  behindTheEdit: {
    heading: "Behind the Edit",
    setup: {
      title: "MY SETUP",
      items: [
        { label: "PC", spec: "Custom High-Performance AMD Ryzen 9 workstation" },
        { label: "Monitor", spec: "Color-accurate 4K display calibrated for Rec.709 video" },
        { label: "Desk", spec: "Solid hardwood ergonomic sit-stand editing desk" },
        { label: "Keyboard", spec: "Custom mechanical keyboard mapped with Premiere shortcuts" },
        { label: "Mouse", spec: "Precision ergonomic mouse with timeline scrub wheel" },
        { label: "Environment", spec: "Studio reference headphones and acoustic monitoring" }
      ]
    },
    workflow: {
      title: "MY WORKFLOW",
      steps: [
        "IDEA",
        "EDIT",
        "AI-ASSISTED WORKFLOW",
        "POLISH",
        "DELIVERY"
      ]
    }
  },
  contact: {
    heading: "Have a video in mind?",
    subCopy: "Send me the footage, idea or brief.",
    callout: "Let's make something worth watching.",
    buttonText: "LET'S WORK TOGETHER",
    email: "jahnviagarwal700@gmail.com",
    whatsapp: "+91 63961-24279",
    instagram: "https://instagram.com/jahnvi.edits",
    instagramHandle: "@jahnvi.edits",
    linkedin: "https://linkedin.com/in/jahnvi-agarwal",
    linkedinHandle: "in/jahnvi-agarwal"
  },
  footer: {
    name: "Jahnvi Agarwal",
    role: "Video Editor",
    location: "India · Worldwide",
    copyright: "© 2026 Jahnvi Agarwal"
  }
};

export const getAssetUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.replace(/^\.?\//, '');
  const base = ((import.meta as any).env?.BASE_URL as string) || '/';
  return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
};

const RAW_PROJECTS: Project[] = [
  // ─── ROW 1 — BLOCK 01. Talking Head Videos ────────────────────────────────
  {
    id: "talking-head-videos",
    title: "Varun & Maya",
    heading: "Talking Head Videos",
    category: "Talking Head Videos",
    aspectRatio: "16:9",
    duration: "Full + Short",
    thumbnail: "/images/work-talking-head.png",
    videoUrl: "./videos/varun-mayya-intro.mp4",
    shortDescription: "Varun & Maya (Dual Formats) & 16 Things Every Woman Should Know How To Do ALONE.",
    dualVideos: {
      fullLength: {
        title: "Full-Length Video",
        label: "FULL-LENGTH",
        format: "16:9 · Long-form",
        aspectRatio: "16:9",
        videoUrl: "./videos/varun-mayya-intro.mp4",
        badge: "16:9 Long-Form",
        poster: "/images/work-talking-head.png"
      },
      shortForm: {
        title: "Short-Form Version",
        label: "SHORT-FORM",
        format: "9:16 · Short-form / Social",
        aspectRatio: "9:16",
        videoUrl: "./videos/varun-mayya-reel.mp4",
        badge: "9:16 Viral Reel",
        poster: "/images/talking-head-thumb.png"
      },
      subheading: "LONG-FORM → SHORT-FORM",
      explanation: "One piece of content, edited for two different formats.",
      caseStudyTitle: "FROM ONE VIDEO → MULTIPLE FORMATS",
      caseStudyDescription: "I edited the full-length video and then adapted the same content into a short-form version, adjusting pacing, framing, captions and visual emphasis for short-form viewing."
    },
    extraVideo: {
      title: "16 Things Every Woman Should Know How To Do ALONE",
      subtitle: "Long Form Talking Head & Lifestyle Narrative",
      duration: "24:13",
      badge: "Featured Cut",
      videoUrl: "./videos/16-things-alone.mp4",
      thumbnail: "/images/16-things-alone-thumb.svg",
      description: "Engaging conversational talking head edit focused on pacing, natural sound leveling, and strong viewer retention."
    },
    description: "I take raw footage and turn it into a fully polished, high-quality video ready to publish.",
    role: "Lead Video Editor & Pacing Specialist",
    software: "Adobe Premiere Pro",
    year: "2024",
    clientContext: "Varun Mayya",
    featured: true
  },

  // ─── ROW 1 — BLOCK 02. BS Projects (Brand Film) ───────────────────────────
  {
    id: "bs-brand-video",
    title: "BS Projects",
    heading: "Brand & Corporate Film",
    category: "Corporate",
    aspectRatio: "16:9",
    duration: "02:40",
    thumbnail: "/images/bs-project-thumb.png",
    videoUrl: "./videos/bs-brand-video.mp4",
    shortDescription: "Cinematic 4K corporate brand film highlighting precision engineering and facility excellence.",
    description: "A cinematic brand film delivering high-impact executive storytelling, precision pacing, custom sound design, and color grading for BS Projects.",
    role: "Video Editor & Color Treatment",
    software: "Adobe Premiere Pro",
    year: "2024"
  },

  // ─── ROW 1 — BLOCK 03. IM-X1000 Dimension Measurement System ───────────────
  {
    id: "im-x1000-measurement",
    title: "IM-X1000 Series",
    heading: "Commercial Video",
    category: "Commercial",
    aspectRatio: "16:9",
    duration: "00:16",
    thumbnail: "/images/im-x1000-thumb.jpg",
    videoUrl: "./videos/im-x1000-measurement.mp4",
    shortDescription: "Image Dimension Measurement System IM-X1000 Series · Precision commercial edit.",
    description: "High-precision commercial showcase for the KEYENCE Image Dimension Measurement System IM-X1000 Series, highlighting automated optical inspection, optical clarity, and product engineering excellence.",
    role: "Commercial Video Editor",
    software: "Premiere Pro & After Effects",
    year: "2024"
  },

  // ─── ROW 2 — BLOCK 04. Documentary (Princess Diana) ───────────────────────
  {
    id: "documentary",
    title: "Princess Diana",
    heading: "Documentary",
    shortDescription: "Archival documentary edit weaving historical footage, voiceover, and narrative pacing.",
    category: "Documentary",
    aspectRatio: "16:9",
    duration: "13:31",
    thumbnail: "/images/doc-princess-diana-thumb.jpg",
    videoUrl: "./videos/princess-diana.mp4",
    description: "An investigative archival documentary edit weaving historical footage, voiceover, and atmospheric pacing into an engaging narrative experience.",
    role: "Lead Video Editor & Archival Researcher",
    software: "Adobe Premiere Pro",
    year: "2024"
  },

  // ─── ROW 2 — BLOCK 05. Business Journalism (Tamil Idlis) ──────────────────
  {
    id: "business-journalism",
    title: "Business Journalism",
    heading: "Business Journalism",
    category: "Business Journalism",
    aspectRatio: "16:9",
    duration: "02:18",
    thumbnail: "/images/business-journalism-thumb.svg",
    videoUrl: "./videos/tamil-idli.mp4",
    shortDescription: "How Mumbai Wakes Up to Tamilian Idlis · 2-minute documentary edit on early morning street enterprise.",
    description: "An investigative business journalism documentary tracing the micro-entrepreneurship, logistics, and heritage of traditional Tamilian idli vendors serving thousands every morning across Mumbai.",
    role: "Lead Video Editor & Storyteller",
    software: "Adobe Premiere Pro",
    year: "2024"
  },

  // ─── ROW 2 — BLOCK 06. Shorts ─────────────────────────────────────────────
  {
    id: "shorts",
    title: "Shorts",
    heading: "Short Form",
    category: "Short Form",
    aspectRatio: "9:16",
    duration: "Vertical",
    thumbnail: "/images/work-short-form.svg",
    videoUrl: "",
    shortDescription: "Viral short-form edits tailored for hook rate, rapid narrative pacing, and retention.",
    description: "High-retention vertical short-form video editing for Instagram Reels, YouTube Shorts, and TikTok. Engineered with kinetic pacing, animated text, sound design, and pattern interrupts.",
    role: "Short-Form Video Editor",
    software: "Adobe Premiere Pro & After Effects",
    year: "2024"
  },

  // ─── ROW 3 — BLOCK 07. Product Commercial (3360 & Vidssave) ──────────────
  {
    id: "product-commercial-3360",
    title: "Product Commercial 3360",
    heading: "Commercial Video",
    category: "Commercial",
    aspectRatio: "16:9",
    duration: "2 Videos",
    thumbnail: "/images/vidssave-thumb.png",
    videoUrl: "./videos/3360.mp4",
    shortDescription: "Product Commercial 3360 & Vidssave · 2 dynamic commercial cuts with kinetic typography.",
    description: "High-energy commercial advertisement edits (3360 and Vidssave) crafted to stop the scroll, featuring tight audio beat-matching, dynamic pacing, and crisp typography.",
    role: "Commercial Video Editor",
    software: "Premiere Pro & After Effects",
    year: "2024",
    playlist: [
      {
        id: "product-commercial-3360-cut",
        title: "Product Commercial 3360",
        subtitle: "High-Energy Commercial Cut",
        videoUrl: "./videos/3360.mp4",
        thumbnail: "/images/vidssave-thumb.png",
        badge: "01 · 3360",
        duration: "00:37",
        description: "High-energy commercial advertisement edit for 3360, focused on stopping the scroll, clear product showcase, tight audio beat-matching, and kinetic typography."
      },
      {
        id: "product-commercial-vidssave-cut",
        title: "Product Commercial — Vidssave",
        subtitle: "Brand Commercial Master Edit",
        videoUrl: "./videos/vidssave.mp4",
        thumbnail: "/images/work-commercial.png",
        badge: "02 · Vidssave",
        duration: "00:27",
        description: "Commercial advertisement focused on stopping the scroll, clear product value proposition, and clean kinetic typography."
      }
    ]
  },

  // ─── ROW 3 — BLOCK 08. Real Estate Projects (Real Estate 2 & Nakshatra) ────
  {
    id: "real-estate-projects",
    title: "Real Estate 2",
    heading: "Real Estate Projects",
    shortDescription: "Nakshatra Mana & 9,000 Sq. Ft. Ranch · Architectural estate films.",
    category: "Real Estate",
    aspectRatio: "16:9",
    duration: "2 Videos",
    thumbnail: "/images/nakshatra-mana-thumb.png",
    videoUrl: "./videos/nakshatra-mana.mp4",
    description: "Architectural real estate showcases highlighting tranquil Kerala heritage landscapes, spatial luxury, and serene natural lighting across iconic estates.",
    role: "Lead Video Editor & Colorist",
    software: "Adobe Premiere Pro",
    year: "2024",
    playlist: [
      {
        id: "nakshatra-mana",
        title: "Nakshatra Mana — Tranquil Living",
        subtitle: "Architectural Tropical Living Film",
        videoUrl: "./videos/nakshatra-mana.mp4",
        thumbnail: "/images/nakshatra-mana-thumb.png",
        badge: "01 · Nakshatra Mana",
        duration: "04:23",
        description: "A tranquil cinematic real estate showcase capturing the serene landscape, traditional heritage architecture, and natural light of Nakshatra Mana."
      },
      {
        id: "real-estate-2",
        title: "Real Estate 2 — 9,000 Sq. Ft. Luxury Ranch Estate",
        subtitle: "Iconic Yercaud Hillside Estate Walkthrough",
        videoUrl: "./videos/real-estate-2-edit.mp4",
        thumbnail: "/images/yercaud-ranch-thumb.png",
        badge: "02 · Real Estate 2",
        duration: "01:54",
        description: "An immersive architectural tour of a 9,000 sq. ft. ranch crafted for luxury hillside living at Yercaud's most iconic estate."
      }
    ]
  },

  // ─── ROW 3 — BLOCK 09. Podcast (The Price of Excellence) ──────────────────
  {
    id: "podcast-price-of-excellence",
    title: "The Price of Excellence",
    heading: "Podcast",
    category: "Studio & Podcast",
    aspectRatio: "16:9",
    duration: "02:00",
    thumbnail: "/images/price-of-excellence-thumb.svg",
    videoUrl: "./videos/price-of-excellence-2min.mp4",
    shortDescription: "The Price of Excellence · Starting 2-minute hook cut crafted for maximum narrative retention.",
    description: "A compelling studio podcast conversation exploring the unseen discipline, sacrifices, and psychology behind mastery. Edited to the starting 2-minute hook cut for high audience retention.",
    role: "Lead Video Editor",
    software: "Adobe Premiere Pro",
    year: "2024"
  },

  // ─── ROW 4 — BLOCK 10. SSAC Studio (Studio Edit) ──────────────────────────
  {
    id: "ssac-studio",
    title: "SSAC Studio",
    heading: "Studio & Podcast Edit",
    category: "Studio & Podcast",
    aspectRatio: "16:9",
    duration: "08:15",
    thumbnail: "/images/ssac-thumb.png",
    videoUrl: "./videos/ssac-full.mp4",
    shortDescription: "Dynamic multi-camera studio podcast edit with clean speaker switching and audio balance.",
    description: "Multi-angle studio production featuring fast-paced conversational cutting, graphic inserts, color grading, and broadcast-quality audio leveling.",
    role: "Lead Video Editor",
    software: "Adobe Premiere Pro",
    year: "2024"
  },

  // ─── 11. Motion Graphics ───────────────────────────────────────────────────
  {
    id: "motion-graphics",
    title: "Motion Graphics",
    shortDescription: "Kinetic typography, animated brand assets, and 2D visual elements.",
    category: "Motion Graphics",
    aspectRatio: "16:9",
    duration: "01:15",
    thumbnail: "/images/work-motion-graphics.svg", // <-- REPLACE with your thumbnail image
    videoUrl: "", // <-- REPLACE with your video file or link
    description: "Sleek animated title sequences, lower thirds, UI transitions, and branded kinetic graphics created in After Effects.",
    role: "Motion Designer & Editor",
    software: "Adobe After Effects & Premiere Pro",
    year: "2024"
  },

  // ─── 12. Food / Lifestyle ──────────────────────────────────────────────────
  {
    id: "food-lifestyle",
    title: "Food / Lifestyle",
    shortDescription: "Sensory culinary & lifestyle edits with rich color grading and macro cuts.",
    category: "Food / Lifestyle",
    aspectRatio: "16:9",
    duration: "01:30",
    thumbnail: "/images/work-food-lifestyle.svg", // <-- REPLACE with your thumbnail image
    videoUrl: "", // <-- REPLACE with your video file or link
    description: "Appetizing culinary showcase highlighting texture, sizzle, vibrant color correction, and rhythmic preparation sequences.",
    role: "Lifestyle Video Editor",
    software: "Adobe Premiere Pro",
    year: "2024"
  }
];

export const PROJECTS: Project[] = RAW_PROJECTS.map((p) => ({
  ...p,
  thumbnail: getAssetUrl(p.thumbnail),
  videoUrl: p.videoUrl ? getAssetUrl(p.videoUrl) : '',
  dualVideos: p.dualVideos
    ? {
        ...p.dualVideos,
        fullLength: {
          ...p.dualVideos.fullLength,
          videoUrl: p.dualVideos.fullLength.videoUrl ? getAssetUrl(p.dualVideos.fullLength.videoUrl) : '',
          poster: p.dualVideos.fullLength.poster ? getAssetUrl(p.dualVideos.fullLength.poster) : ''
        },
        shortForm: {
          ...p.dualVideos.shortForm,
          videoUrl: p.dualVideos.shortForm.videoUrl ? getAssetUrl(p.dualVideos.shortForm.videoUrl) : '',
          poster: p.dualVideos.shortForm.poster ? getAssetUrl(p.dualVideos.shortForm.poster) : ''
        }
      }
    : undefined,
  extraVideo: p.extraVideo
    ? {
        ...p.extraVideo,
        videoUrl: p.extraVideo.videoUrl ? getAssetUrl(p.extraVideo.videoUrl) : '',
        thumbnail: p.extraVideo.thumbnail ? getAssetUrl(p.extraVideo.thumbnail) : ''
      }
    : undefined,
  playlist: p.playlist
    ? p.playlist.map((item) => ({
        ...item,
        videoUrl: item.videoUrl ? getAssetUrl(item.videoUrl) : '',
        thumbnail: item.thumbnail ? getAssetUrl(item.thumbnail) : ''
      }))
    : undefined
}));


