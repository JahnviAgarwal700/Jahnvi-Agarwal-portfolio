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

export interface ProjectShowcaseVideo {
  id: string;
  title: string;
  badge?: string;
  videoUrl: string;
  poster?: string;
  aspectRatio?: '16:9' | '9:16';
  duration?: string;
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
  ticketNote?: string;
  showcaseVideos?: ProjectShowcaseVideo[];
  description: string;
  role: string;
  software: string;
  year: string;
  clientContext?: string;
  featured?: boolean;
  mobileOnly?: boolean;
}

export const PROFILE_DATA = {
  name: "Jahnvi Agarwal",
  title: "VIDEO EDITOR",
  smallLabel: "VIDEO EDITOR",
  heroHeading: "Hi, I'm Jahnvi.",
  heroStatement: "Hi there :) I am a video editor with 4 years of experience and have edited 1,000+ videos across various genres and co-built a YouTube channel to 900K+ subscribers in one year. I’ve worked across YouTube long, short-form, advertising, corporate, and branded content. I can also handle projects end-to-end. I specialize in Premiere Pro, After Effects, and AI-powered workflows to have a fast turnaround.",
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
    heading: "More About Me",
    paragraphs: [
      "I am 21. Outside of editing, I’m naturally curious about technology, AI, and anything that lets me create or build something new. I like experimenting, learning by doing, and figuring out how things work. I’m always exploring new tools and ideas that can make the creative process faster, smarter, or simply more interesting. I’m based in India, proficient in English and Hindi and absolutely love what I do :)."
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
    subCopy: "Send me the footage or brief.",
    callout: "Let's make something worth watching.",
    buttonText: "LET'S CONNECT",
    email: "jahnviagarwal700@gmail.com",
    whatsapp: "+91 63961-24279",
    instagram: "https://instagram.com/jahnviagarwall",
    instagramHandle: "@jahnviagarwall",
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

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi Jahnvi, I came across your portfolio and wanted to discuss a project with you.";

export const getWhatsAppUrl = (customMessage?: string): string => {
  const cleanPhone = PROFILE_DATA.contact.whatsapp.replace(/[^0-9]/g, '');
  const msg = customMessage || WHATSAPP_DEFAULT_MESSAGE;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
};

const RAW_PROJECTS: Project[] = [
  // ─── 01. Talking Head ─────────────────────────────────────────────────────
  {
    id: "talking-head-videos",
    title: "Talking Head",
    heading: "Talking Head Videos",
    category: "Talking Head Videos",
    aspectRatio: "16:9",
    duration: "Full + Short",
    thumbnail: "/images/work-talking-head.png",
    videoUrl: "videos/varun-mayya-intro.mp4",
    ticketNote: "One Recording → One Long-Form Video + Multiple High-Retention Shorts",
    showcaseVideos: [
      { id: "varun-long", title: "Varun & Maya — Full-Length", badge: "01 · Full-Length (16:9)", videoUrl: "videos/varun-mayya-intro.mp4", poster: "images/work-talking-head.png", aspectRatio: "16:9" },
      { id: "varun-short", title: "Varun & Maya — Short-Form", badge: "02 · Viral Short (9:16)", videoUrl: "videos/varun-mayya-reel.mp4", poster: "images/talking-head-thumb.png", aspectRatio: "9:16" }
    ],
    shortDescription: "Varun & Maya · One recording repurposed into long-form video and high-retention shorts.",
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
    description: "I turn your raw talking-head footage into a polished long-form video, then repurpose the best moments into multiple engaging Shorts. This clip was created as an editing sample for Varun Mayya.",
    role: "Lead Video Editor & Pacing Specialist",
    software: "Adobe Premiere Pro",
    year: "2024",
    clientContext: "Varun Mayya",
    featured: true
  },

  // ─── 02. Documentary Storytelling ─────────────────────────────────────────
  {
    id: "business-journalism",
    title: "Documentary Storytelling",
    heading: "Documentary Storytelling",
    category: "Documentary",
    aspectRatio: "16:9",
    duration: "02:18",
    thumbnail: "/images/documentary-storytelling-thumb.jpg",
    videoUrl: "videos/tamil-idli.mp4",
    ticketNote: "From Scattered Footage to a Cohesive Documentary",
    showcaseVideos: [
      { id: "tamil-idli-cut", title: "How Mumbai Wakes Up to Tamilian Idlis", videoUrl: "videos/tamil-idli.mp4", poster: "images/documentary-storytelling-thumb.jpg", aspectRatio: "16:9" }
    ],
    shortDescription: "How Mumbai Wakes Up to Tamilian Idlis · From scattered footage to a cohesive documentary.",
    description: "I can shape raw documentary footage into a polished journalism film that connects stories, builds narrative, and keeps viewers engaged.",
    role: "Lead Video Editor & Storyteller",
    software: "Adobe Premiere Pro",
    year: "2024"
  },

  // ─── 03. Shorts (4 Shorts Slot) ───────────────────────────────────────────
  {
    id: "shorts",
    title: "Shorts",
    heading: "Short Form",
    category: "Short Form",
    aspectRatio: "9:16",
    duration: "4 Shorts",
    thumbnail: "/images/work-short-form.svg",
    videoUrl: "videos/1.mp4",
    ticketNote: "These short-form reels are engineered for high hook rate, rapid narrative pacing, and maximum retention",
    showcaseVideos: [
      { id: "short-podcast", title: "Podcast Clips", badge: "Podcast Clips", videoUrl: "videos/1.mp4", aspectRatio: "9:16" },
      { id: "short-tech", title: "Tech Shorts", badge: "Tech Shorts", videoUrl: "videos/varun-mayya-reel.mp4", aspectRatio: "9:16" },
      { id: "short-ugc", title: "UGC Content", badge: "UGC Content", videoUrl: "videos/21.mp4", aspectRatio: "9:16" },
      { id: "short-gaming", title: "Gaming Shorts", badge: "Gaming Shorts", videoUrl: "videos/2.mp4", aspectRatio: "9:16" }
    ],
    shortDescription: "Podcast Clips, Tech Shorts, UGC Content & Gaming Shorts · High-retention vertical edits.",
    description: "High-retention vertical short-form video editing for Instagram Reels, YouTube Shorts, and TikTok. Engineered with kinetic pacing, animated text, sound design, and pattern interrupts.",
    role: "Short-Form Video Editor",
    software: "Adobe Premiere Pro & After Effects",
    year: "2024"
  },

  // ─── 04. AI-generated corporate videos (BS Projects & SSAC) ───────────────
  {
    id: "ai-commercial-ads",
    title: "AI-generated corporate videos",
    heading: "AI-generated corporate videos",
    category: "AI & Corporate Film",
    aspectRatio: "16:9",
    duration: "2 Videos",
    thumbnail: "/images/bs-projects-outside-thumb.jpg",
    videoUrl: "videos/bs-projects-final.mp4",
    ticketNote: "Complete AI Video Production for Corporate Brands",
    showcaseVideos: [
      { id: "bs-projects", title: "BS Projects Private Limited", badge: "01 · BS Projects Private Limited", videoUrl: "videos/bs-projects-final.mp4", poster: "images/bs-projects-inside-poster.jpg", aspectRatio: "16:9" },
      { id: "ssac", title: "SSAC Studio", badge: "02 · SSAC Studio", videoUrl: "videos/ssac-full.mp4", poster: "images/ssac-thumb.png", aspectRatio: "16:9" }
    ],
    shortDescription: "BS Projects Private Limited & SSAC Studio · Complete AI video production for corporate brands.",
    description: "I independently reached out to these brands and handled the projects end-to-end—from scripting and ElevenLabs voiceovers to AI-generated visuals, editing, sound design, and final delivery.",
    role: "Lead Video Editor & AI Producer",
    software: "Adobe Premiere Pro, After Effects & ElevenLabs",
    year: "2024",
    playlist: [
      {
        id: "bs-projects-cut",
        title: "BS Projects Private Limited",
        subtitle: "Brand & Corporate Commercial Film",
        videoUrl: "./videos/bs-projects-final.mp4",
        thumbnail: "/images/bs-projects-inside-poster.jpg",
        badge: "01 · BS Projects Private Limited",
        duration: "02:00",
        description: "A cinematic brand film delivering high-impact executive storytelling, precision pacing, custom sound design, and color grading for BS Projects Private Limited."
      },
      {
        id: "ssac-studio-cut",
        title: "SSAC Studio",
        subtitle: "Multi-Camera Studio & Commercial Edit",
        videoUrl: "./videos/ssac-full.mp4",
        thumbnail: "/images/ssac-thumb.png",
        badge: "02 · SSAC Studio",
        duration: "08:15",
        description: "Multi-angle studio production featuring fast-paced conversational cutting, graphic inserts, color grading, and broadcast-quality audio leveling."
      }
    ]
  },

  // ─── 05. Podcast ──────────────────────────────────────────────────────────
  {
    id: "podcast-price-of-excellence",
    title: "Podcast",
    heading: "Podcast",
    category: "Studio & Podcast",
    aspectRatio: "16:9",
    duration: "02:00",
    thumbnail: "/images/price-of-excellence-thumb.svg",
    videoUrl: "videos/price-of-excellence-2min.mp4",
    ticketNote: "Studio podcast conversation edited to the first 2-minute hook cut for audience retention",
    showcaseVideos: [
      { id: "podcast-cut", title: "The Price of Excellence", badge: "Podcast Hook Cut", videoUrl: "videos/price-of-excellence-2min.mp4", poster: "images/price-of-excellence-thumb.svg", aspectRatio: "16:9" }
    ],
    shortDescription: "The Price of Excellence · Starting 2-minute hook cut crafted for maximum narrative retention.",
    description: "A compelling studio podcast conversation exploring the unseen discipline, sacrifices, and psychology behind mastery. Edited to the starting 2-minute hook cut for high audience retention.",
    role: "Lead Video Editor",
    software: "Adobe Premiere Pro",
    year: "2024"
  },

  // ─── 06. Super Squad Ad (formerly Product Commercial 3360) ─────────────────
  {
    id: "product-commercial-3360",
    title: "Super Squad Ad",
    heading: "Super Squad Ad",
    category: "Commercial",
    aspectRatio: "16:9",
    duration: "2 Videos",
    thumbnail: "/images/vidssave-thumb.png",
    videoUrl: "videos/3360.mp4",
    ticketNote: "High-energy commercial advertisement cuts with tight beat-matching & kinetic typography",
    showcaseVideos: [
      { id: "super-squad", title: "Super Squad Ad (3360)", badge: "01 · Super Squad", videoUrl: "videos/3360.mp4", poster: "images/vidssave-thumb.png", aspectRatio: "16:9" },
      { id: "vidssave", title: "Vidssave", badge: "02 · Vidssave", videoUrl: "videos/vidssave.mp4", poster: "images/work-commercial.png", aspectRatio: "16:9" }
    ],
    shortDescription: "Super Squad Ad (3360) & Vidssave · High-energy commercial advertisement cuts with kinetic typography.",
    description: "High-energy commercial advertisement edits crafted to stop the scroll, featuring tight audio beat-matching, dynamic pacing, and crisp typography.",
    role: "Commercial Video Editor",
    software: "Premiere Pro & After Effects",
    year: "2024",
    playlist: [
      {
        id: "product-commercial-3360-cut",
        title: "Super Squad Ad (3360)",
        subtitle: "High-Energy Commercial Cut",
        videoUrl: "./videos/3360.mp4",
        thumbnail: "/images/vidssave-thumb.png",
        badge: "01 · Super Squad",
        duration: "00:37",
        description: "High-energy commercial advertisement edit for Super Squad (3360), focused on stopping the scroll, clear product showcase, tight audio beat-matching, and kinetic typography."
      },
      {
        id: "product-commercial-vidssave-cut",
        title: "Vidssave",
        subtitle: "Brand Commercial Master Edit",
        videoUrl: "./videos/vidssave.mp4",
        thumbnail: "/images/work-commercial.png",
        badge: "02 · Vidssave",
        duration: "00:27",
        description: "Commercial advertisement focused on stopping the scroll, clear product value proposition, and clean kinetic typography."
      }
    ]
  },

  // ─── 07. Product Commercial (KEYENCE IM-X1000 Series) ─────────────────────
  {
    id: "im-x1000-measurement",
    title: "Product Commercial",
    heading: "Product Commercial",
    category: "Commercial",
    aspectRatio: "16:9",
    duration: "00:16",
    thumbnail: "/images/product-commercial-keyence-thumb.jpg",
    videoUrl: "videos/im-x1000-measurement.mp4",
    ticketNote: "Product-Focused Visuals. Clean and Clear Commercial Editing.",
    showcaseVideos: [
      { id: "imx1000", title: "KEYENCE IM-X1000 Measurement System", videoUrl: "videos/im-x1000-measurement.mp4", poster: "images/product-commercial-keyence-thumb.jpg", aspectRatio: "16:9" }
    ],
    shortDescription: "KEYENCE IM-X1000 measurement system · Product-focused visuals and clean commercial editing.",
    description: "A clean commercial edit showcasing the KEYENCE IM-X1000 measurement system through product-focused visuals, clear on-screen messaging, and precise pacing.",
    role: "Commercial Video Editor",
    software: "Premiere Pro & After Effects",
    year: "2024"
  },

  // ─── 08. Voice Documentary (Diana & Donald Trump) ──────────────────────────
  {
    id: "documentary",
    title: "Voice Documentary",
    heading: "Voice Documentary",
    category: "Voice Documentary",
    aspectRatio: "16:9",
    duration: "2 Documentaries",
    thumbnail: "/images/doc-princess-diana-thumb.jpg",
    videoUrl: "videos/princess-diana.mp4",
    ticketNote: "Archival voice documentaries weaving rare historical footage, voiceover & narrative pacing",
    showcaseVideos: [
      { id: "diana", title: "Princess Diana", badge: "01 · Princess Diana", videoUrl: "videos/princess-diana.mp4", poster: "images/doc-princess-diana-thumb.jpg", aspectRatio: "16:9" },
      { id: "trump", title: "Donald Trump", badge: "02 · Donald Trump", videoUrl: "videos/princess-diana.mp4", poster: "images/documentary-trump-thumb.png", aspectRatio: "16:9" }
    ],
    shortDescription: "Princess Diana & Donald Trump · Archival voice documentary edits weaving historical footage, voiceover, and narrative pacing.",
    description: "Archival voice documentary edits featuring Princess Diana and Donald Trump, weaving rare historical footage, voiceover storytelling, and atmospheric pacing into engaging narrative experiences.",
    role: "Lead Video Editor & Archival Researcher",
    software: "Adobe Premiere Pro",
    year: "2024",
    playlist: [
      {
        id: "voice-doc-diana",
        title: "Princess Diana",
        subtitle: "Archival Voice Documentary",
        videoUrl: "./videos/princess-diana.mp4",
        thumbnail: "/images/doc-princess-diana-thumb.jpg",
        badge: "01 · Princess Diana",
        duration: "13:31",
        description: "An investigative archival documentary edit weaving historical footage, voiceover, and atmospheric pacing into an engaging narrative experience."
      },
      {
        id: "voice-doc-trump",
        title: "Donald Trump",
        subtitle: "Voice Documentary Narrative",
        videoUrl: "./videos/princess-diana.mp4",
        thumbnail: "/images/documentary-trump-thumb.png",
        badge: "02 · Donald Trump",
        duration: "Archival Cut",
        description: "Investigative documentary edit exploring high-stakes political biography, archival sound design, and retention-focused storytelling."
      }
    ]
  },

  // ─── 09. Real Estate ───────────────────────────────────────────────────────
  {
    id: "real-estate-projects",
    title: "Real Estate",
    heading: "Real Estate Projects",
    category: "Real Estate",
    aspectRatio: "16:9",
    duration: "2 Videos",
    thumbnail: "/images/nakshatra-mana-thumb.png",
    videoUrl: "videos/nakshatra-mana.mp4",
    ticketNote: "Architectural real estate showcases highlighting Kerala heritage & luxury hillside living",
    showcaseVideos: [
      { id: "nakshatra", title: "Nakshatra Mana", badge: "01 · Nakshatra Mana", videoUrl: "videos/nakshatra-mana.mp4", poster: "images/nakshatra-mana-thumb.png", aspectRatio: "16:9" },
      { id: "ranch", title: "Real Estate 2 — Yercaud Ranch", badge: "02 · Real Estate 2", videoUrl: "videos/real-estate-2-edit.mp4", poster: "images/yercaud-ranch-thumb.png", aspectRatio: "16:9" }
    ],
    shortDescription: "Nakshatra Mana & 9,000 Sq. Ft. Ranch · Architectural estate films.",
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
  }
];

export const PROJECTS: Project[] = RAW_PROJECTS.map((p) => ({
  ...p,
  thumbnail: getAssetUrl(p.thumbnail),
  videoUrl: p.videoUrl ? getAssetUrl(p.videoUrl) : '',
  showcaseVideos: p.showcaseVideos?.map((s) => ({
    ...s,
    videoUrl: s.videoUrl ? getAssetUrl(s.videoUrl) : '',
    poster: s.poster ? getAssetUrl(s.poster) : undefined
  })),
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


