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
      { id: "short-tech", title: "I'm building a buddy for your computer cursor", badge: "Tech Shorts", videoUrl: "videos/cursor-buddy.mp4", poster: "images/cursor-buddy-short-poster.jpg", aspectRatio: "9:16" },
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
    title: "Podcast Editing & Clipping",
    heading: "Podcast Editing & Clipping",
    category: "Studio & Podcast",
    aspectRatio: "16:9",
    duration: "02:00",
    thumbnail: "/images/podcast-studio-thumb.jpg",
    videoUrl: "videos/price-of-excellence-2min.mp4",
    ticketNote: "Full-Length Podcasts & High-Retention Short Clips",
    showcaseVideos: [
      { id: "podcast-cut", title: "The Price of Excellence", badge: "Podcast Hook Cut", videoUrl: "videos/price-of-excellence-2min.mp4", poster: "images/podcast-studio-thumb.jpg", aspectRatio: "16:9" }
    ],
    shortDescription: "Podcast Editing & Clipping · Full-length podcasts & high-retention short clips.",
    description: "I edit raw podcast conversations into engaging long-form episodes and short-form clips of the best recorded moments also.",
    role: "Lead Video Editor",
    software: "Adobe Premiere Pro",
    year: "2024"
  },

  // ─── 06. Brand Films On Voice (Super Squad) ───────────────────────────────
  {
    id: "product-commercial-3360",
    title: "Brand Films On Voice",
    heading: "Brand Films On Voice",
    category: "Brand Films",
    aspectRatio: "16:9",
    duration: "2 Videos",
    thumbnail: "/images/vidssave-thumb.png",
    videoUrl: "videos/3360.mp4",
    ticketNote: "High-Energy Brand Advertising",
    showcaseVideos: [
      { id: "super-squad", title: "Back Up Launch Film", badge: "01 · Back Up Launch Film", videoUrl: "videos/3360.mp4", poster: "images/vidssave-thumb.png", aspectRatio: "16:9" },
      { id: "vidssave", title: "Brand Campaign", badge: "02 · Brand Campaign", videoUrl: "videos/vidssave.mp4", poster: "images/work-commercial.png", aspectRatio: "16:9" }
    ],
    shortDescription: "Back Up Launch Film & Brand Campaign · High-energy brand advertising.",
    description: "I edited this commercial for Super Squad, combining dynamic visuals, fast-paced editing, sound design, music, and motion-driven storytelling to create an engaging brand advertisement designed to capture attention and communicate the brand with impact.",
    role: "Commercial Video Editor",
    software: "Premiere Pro & After Effects",
    year: "2024",
    playlist: [
      {
        id: "product-commercial-3360-cut",
        title: "Back Up Launch Film",
        subtitle: "High-Energy Commercial Cut",
        videoUrl: "./videos/3360.mp4",
        thumbnail: "/images/vidssave-thumb.png",
        badge: "01 · Back Up Launch Film",
        duration: "00:37",
        description: "I edited this commercial for Super Squad, combining dynamic visuals, fast-paced editing, sound design, music, and motion-driven storytelling to create an engaging brand advertisement designed to capture attention and communicate the brand with impact."
      },
      {
        id: "product-commercial-vidssave-cut",
        title: "Brand Campaign",
        subtitle: "Brand Commercial Master Edit",
        videoUrl: "./videos/vidssave.mp4",
        thumbnail: "/images/work-commercial.png",
        badge: "02 · Brand Campaign",
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

  // ─── 08. Faceless YouTube Documentary (Diana & Donald Trump) ──────────────────
  {
    id: "documentary",
    title: "Faceless YouTube Documentary",
    heading: "Faceless YouTube Documentary",
    category: "Faceless Documentary",
    aspectRatio: "16:9",
    duration: "2 Documentaries",
    thumbnail: "/images/doc-princess-diana-thumb.jpg",
    videoUrl: "videos/princess-diana.mp4",
    ticketNote: "Scriptwriting, Voice-Over & Video Editing",
    showcaseVideos: [
      { id: "diana", title: "Princess Diana", badge: "01 · Princess Diana", videoUrl: "videos/princess-diana.mp4", poster: "images/doc-princess-diana-thumb.jpg", aspectRatio: "16:9" },
      { id: "trump", title: "Donald Trump", badge: "02 · Donald Trump", videoUrl: "videos/donald-trump.mp4", poster: "images/documentary-trump-thumb.png", aspectRatio: "16:9" }
    ],
    shortDescription: "Princess Diana & Donald Trump · Scriptwriting, voice-over & video editing.",
    description: "I can handle the complete documentary workflow from research and scriptwriting to voice-over, video editing and final delivery. I have created faceless YouTube documentaries like these built around strong narratives, archival footage, engaging visuals, and retention-focused editing.",
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
        videoUrl: "./videos/donald-trump.mp4",
        thumbnail: "/images/documentary-trump-thumb.png",
        badge: "02 · Donald Trump",
        duration: "00:53",
        description: "Investigative documentary edit exploring high-stakes political biography, archival sound design, and retention-focused storytelling."
      }
    ]
  },

  // ─── 09. Real Estate films ────────────────────────────────────────────────
  {
    id: "real-estate-projects",
    title: "Real Estate films",
    heading: "Real Estate films",
    category: "Real Estate",
    aspectRatio: "16:9",
    duration: "2 Videos",
    thumbnail: "/images/real-estate-films-thumb.jpg",
    videoUrl: "videos/vidssave.com DESIGNER RESIDENCE _ CINEMATIC REAL ESTATE VIDEO IN 4K _ SONY FX6 1080p.mp4",
    ticketNote: "Real Estate Content From Property Tours to Human Stories",
    showcaseVideos: [
      {
        id: "cinematic-tours",
        title: "Cinematic Tour",
        badge: "01 · Cinematic Tour",
        videoUrl: "videos/vidssave.com DESIGNER RESIDENCE _ CINEMATIC REAL ESTATE VIDEO IN 4K _ SONY FX6 1080p.mp4",
        poster: "images/cinematic-tours-thumb.png",
        aspectRatio: "16:9"
      },
      {
        id: "nakshatra",
        title: "Storytelling Concept",
        badge: "02 · Storytelling Concept",
        videoUrl: "videos/nakshatra-mana.mp4",
        poster: "images/real-estate-films-thumb.jpg",
        aspectRatio: "16:9"
      }
    ],
    shortDescription: "Cinematic Tour & Storytelling Concept · Real estate content from property tours to human stories.",
    description: "I edit real estate content across different formats, from fast-paced property showcases to slower, interview-led stories focused on people, places, and lifestyle.",
    role: "Lead Video Editor & Colorist",
    software: "Adobe Premiere Pro",
    year: "2024",
    playlist: [
      {
        id: "cinematic-tours",
        title: "Cinematic Tour",
        subtitle: "Designer Residence · Architectural Film",
        videoUrl: "./videos/vidssave.com DESIGNER RESIDENCE _ CINEMATIC REAL ESTATE VIDEO IN 4K _ SONY FX6 1080p.mp4",
        thumbnail: "/images/cinematic-tours-thumb.png",
        badge: "01 · Cinematic Tour",
        description: "A cinematic tour of a designer residence, highlighting its architecture, materials, and inviting interiors."
      },
      {
        id: "nakshatra-mana",
        title: "Storytelling Concept",
        subtitle: "Nakshatra Mana — Architectural Living Film",
        videoUrl: "./videos/nakshatra-mana.mp4",
        thumbnail: "/images/real-estate-films-thumb.jpg",
        badge: "02 · Storytelling Concept",
        duration: "04:23",
        description: "A tranquil cinematic real estate showcase capturing the serene landscape, traditional heritage architecture, and natural light of Nakshatra Mana."
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


