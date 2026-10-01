/**
 * JAHNVI AGARWAL PORTFOLIO — STANDALONE INTERACTIVE ENGINE
 * Provides instant zero-build preview and full interactivity (modal, navigation, video controls)
 */

const PROFILE = {
  name: "Jahnvi Agarwal",
  title: "Video Editor",
  location: "Based in India · Working Worldwide",
  heroBio: "I turn raw footage, ideas and brand briefs into videos people want to watch.",
  aboutText: "I edit in Adobe Premiere Pro and use AI tools to make my workflow faster and more efficient. I’m proficient in English and comfortable working with both Indian and international clients.",
  skills: ["Premiere Pro", "Video Editing", "AI Workflow", "Commercial Editing"],
  proof: {
    stat: "900K+",
    label: "YouTube Subscribers",
    copy: "I co-built and helped scale Geeky Gamer to 900K+ subscribers, working on content where editing, pacing and understanding the audience mattered as much as the footage itself."
  },
  beyondYouTube: {
    heading: "Beyond YouTube",
    copy: "I’ve worked across short-form content, ads for manufacturing companies, corporate films, AI-based videos and many other niches. I currently work at Nijyo Online Services, creating ads across different industries."
  },
  cta: {
    heading: "Have a video in mind?",
    copy: "Send me the footage, the idea or simply the brief. We’ll take it from there.",
    availability: "Available for projects in India & worldwide."
  },
  contact: {
    email: "jahnviagarwal700@gmail.com",
    whatsapp: "+91 63961-24279",
    instagram: "https://instagram.com/jahnviagarwall",
    linkedin: "https://linkedin.com/in/jahnvi-agarwal"
  }
};

const PROJECTS = [
  {
    id: "talking-head-videos",
    title: "Talking Head",
    shortDescription: "I take raw footage and turn it into a fully polished, high-quality video ready to publish.",
    category: "Video Editing",
    aspectRatio: "16:9",
    duration: "Full + Short",
    thumbnail: "./images/work-talking-head.png",
    videoUrl: "./videos/Varun%20Mayya%20Intro%20Edited_1.mp4",
    dualVideos: {
      fullLength: {
        title: "Full-Length Video",
        label: "FULL-LENGTH",
        format: "16:9 · Long-form",
        aspectRatio: "16:9",
        videoUrl: "./videos/Varun%20Mayya%20Intro%20Edited_1.mp4"
      },
      shortForm: {
        title: "Short-Form Version",
        label: "SHORT-FORM",
        format: "9:16 · Short-form / Social",
        aspectRatio: "9:16",
        videoUrl: "./videos/Varun%20Mayya%20Reel%20Edited.mp4"
      },
      subheading: "LONG-FORM → SHORT-FORM",
      explanation: "One piece of content, edited for two different formats.",
      caseStudyTitle: "FROM ONE VIDEO → MULTIPLE FORMATS",
      caseStudyDescription: "I edited the full-length video and then adapted the same content into a short-form version, adjusting pacing, framing, captions and visual emphasis for short-form viewing."
    },
    description: "I take raw footage and turn it into a fully polished, high-quality video ready to publish.",
    role: "Lead Video Editor & Pacing Specialist",
    software: "Adobe Premiere Pro",
    year: "2024",
    clientContext: "Varun Mayya",
    featured: true
  },
  {
    id: "industrial-manufacturing-brand-film",
    title: "Precision Engineering & Manufacturing Showcase",
    category: "Manufacturing",
    aspectRatio: "16:9",
    duration: "02:15",
    thumbnail: "./images/project-manufacturing.svg",
    videoUrl: "./videos/bs%20pr%20final.mp4",
    description: "Industrial documentary film highlighting heavy machinery operations, robotic automation, and manufacturing precision. Balanced heavy technical detail with rhythmic industrial sound design and sharp pacing.",
    role: "Editor & Color Treatment",
    software: "Adobe Premiere Pro",
    year: "2024",
    clientContext: "Manufacturing Enterprise",
    featured: false
  },
  {
    id: "nijyo-commercial-ad-campaign",
    title: "Multi-Industry Commercial Ad Series",
    category: "Advertising",
    aspectRatio: "16:9",
    duration: "00:45",
    thumbnail: "./images/project-advertising.svg",
    videoUrl: "",
    description: "Fast-turnaround commercial advertisement delivered across digital platforms. Focused on high-conversion first 3 seconds hook, branded typography animation, and crisp audio mixing across diverse sectors.",
    role: "Commercial Video Editor",
    software: "Adobe Premiere Pro · AI Workflows",
    year: "2024",
    clientContext: "Nijyo Online Services",
    featured: true
  },
  {
    id: "ai-enhanced-corporate-narrative",
    title: "Next-Gen Corporate Narrative Film",
    category: "Corporate / AI Films",
    aspectRatio: "16:9",
    duration: "03:10",
    thumbnail: "./images/project-ai-corporate.svg",
    videoUrl: "",
    description: "Corporate showcase integrating AI-assisted visual enhancement, speech de-noising, and hybrid generative sequences into a coherent executive brand film.",
    role: "Video Editor & AI Pipeline Integration",
    software: "Adobe Premiere Pro · AI Tooling",
    year: "2024",
    clientContext: "Corporate Client",
    featured: false
  },
  {
    id: "viral-vertical-reels-pacing",
    title: "High-Engagement Short-Form Retention Cuts",
    category: "Short Form",
    aspectRatio: "9:16",
    duration: "00:58",
    thumbnail: "./images/project-shortform.svg",
    videoUrl: "",
    description: "Vertical storytelling optimized for TikTok and Instagram Reels. Engineered dynamic cuts, kinetic subtitling rhythm, and micro-zooms tailored to stop scrolling in the first second.",
    role: "Short-Form Editor",
    software: "Adobe Premiere Pro",
    year: "2024",
    clientContext: "Creator & Brand Channels",
    featured: true
  },
  {
    id: "creative-experimental-documentary",
    title: "Creative Niche — Visual Storytelling & Pacing",
    category: "Other Projects",
    aspectRatio: "16:9",
    duration: "04:12",
    thumbnail: "./images/project-creative.svg",
    videoUrl: "",
    description: "Independent creative project emphasizing atmospheric pacing, ambient soundscapes, and non-linear narrative montage.",
    role: "Editor & Sound Designer",
    software: "Adobe Premiere Pro",
    year: "2023",
    clientContext: "Creative Production",
    featured: false
  }
];

let activeProjectIndex = 0;
let isModalOpen = false;
let isPlaying = false;
let playProgress = 35;

function renderPortfolio() {
  const root = document.getElementById('root');
  if (!root) return;

  root.innerHTML = `
    <div class="portfolio-app">
      <!-- Minimal Sticky Navigation -->
      <header class="site-nav" id="main-nav">
        <div class="container nav-container">
          <a href="#hero" class="nav-brand">
            <span class="nav-name">${PROFILE.name}</span>
            <span class="nav-role-tag">${PROFILE.title}</span>
          </a>

          <nav class="nav-desktop-menu" aria-label="Main Navigation">
            <ul class="nav-links">
              <li><a href="#work" class="nav-link">Work</a></li>
              <li><a href="#proof" class="nav-link">900K+ Proof</a></li>
              <li><a href="#about" class="nav-link">About</a></li>
              <li><a href="#contact" class="nav-link">Contact</a></li>
            </ul>
            <a href="#contact" class="btn btn-accent nav-cta-btn">Let’s Work Together</a>
          </nav>

          <button class="nav-mobile-toggle" id="nav-toggle" aria-label="Toggle navigation menu">
            <span></span><span></span><span></span>
          </button>
        </div>

        <div class="mobile-drawer" id="mobile-drawer">
          <ul class="mobile-links">
            <li><a href="#work" class="mobile-link">Work</a></li>
            <li><a href="#proof" class="mobile-link">900K+ Proof</a></li>
            <li><a href="#beyond" class="mobile-link">Beyond YouTube</a></li>
            <li><a href="#about" class="mobile-link">About</a></li>
            <li><a href="#contact" class="mobile-link">Contact</a></li>
          </ul>
          <div class="mobile-drawer-footer">
            <a href="#contact" class="btn btn-accent" style="width: 100%;">Let’s Work Together</a>
            <p style="font-size: 13px; color: #666; text-align: center;">${PROFILE.location}</p>
          </div>
        </div>
      </header>

      <main>
        <!-- 1. HERO SECTION -->
        <section id="hero" class="hero-section" aria-label="Jahnvi Agarwal — Video Editor">
          <div class="site-container hero-container">
            <div class="hero-layout">
              <div class="hero-content">
                <div class="hero-header-row">
                  <div class="hero-title-group">
                    <div class="hero-headline-block">
                      <h1 class="hero-name" aria-label="Jahnvi Agarwal.">
                        <span>Jahnvi Agarwal.</span>
                        <span class="hero-cursor is-blinking" aria-hidden="true">|</span>
                      </h1>
                    </div>

                    <div class="hero-role">
                      VIDEO EDITOR
                    </div>
                  </div>

                  <div class="hero-mobile-avatar-wrap">
                    <div class="hero-mobile-avatar">
                      <img src="./images/jahnvi-hero.jpg" alt="Jahnvi Agarwal — Video Editor" class="hero-mobile-avatar-img" />
                    </div>
                  </div>
                </div>

                <p class="hero-desc">
                  Hi there :) I am a video editor with 5 years of experience and have edited 1,000+ videos across all genres. I’ve created content that generated millions of views across various countries and co-built a YouTube channel to 900K+ subscribers in one year. I’ve worked across YouTube long, short-form, advertising, corporate, and branded content. I can also handle projects end-to-end. I specialize in Premiere Pro, After Effects, and AI-powered workflows to have a fast turnaround.
                </p>

                <div class="hero-cta-wrap">
                  <a href="#work" class="btn-hero-work">
                    VIEW MY WORK
                  </a>
                  <a href="https://wa.me/916396124279?text=Hi%20Jahnvi%2C%20I%20came%20across%20your%20portfolio%20and%20wanted%20to%20discuss%20a%20project%20with%20you." target="_blank" rel="noopener noreferrer" class="btn-hero-connect">
                    LET'S CONNECT
                  </a>
                </div>
              </div>

              <div class="hero-visual-col">
                <div class="hero-portrait-frame">
                  <img src="./images/jahnvi-hero.jpg" alt="Jahnvi Agarwal — Video Editor" class="hero-portrait-img" loading="eager" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 2. SELECTED WORK -->
        <section id="work" class="work-section" aria-label="Selected Work">
          <div class="container">
            <div class="work-header">
              <div class="eyebrow-label">PORTFOLIO</div>
              <h2 class="headline-section">Selected Work</h2>
              <p class="work-subline">A mix of content, advertising and brand films.</p>
            </div>

            <div class="work-grid">
              ${PROJECTS.map((project, idx) => `
                <article class="project-card" data-index="${idx}" tabindex="0" role="button" aria-label="View project: ${project.title}" style="margin-top: ${idx % 2 === 1 ? 'clamp(0px, 3vw, 32px)' : '0px'}">
                  <div class="project-thumb-frame ${project.aspectRatio === '9:16' ? 'aspect-vertical' : ''}">
                    <img src="${project.thumbnail}" alt="${project.title} preview" class="project-thumb-img" loading="lazy" />
                    <div class="project-thumb-overlay" aria-hidden="true">
                      <div class="project-play-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                  </div>
                  <div class="project-meta">
                    <div class="project-top-row">
                      <span class="project-category-tag">${project.category}</span>
                      <span class="project-duration-tag">${project.duration}</span>
                    </div>
                    <h3 class="project-title">${project.title}</h3>
                    ${project.shortDescription ? `<p class="card-short-desc">${project.shortDescription}</p>` : ''}
                  </div>
                </article>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- 3. 900K+ PROOF SECTION -->
        <section id="proof" class="proof-section" aria-label="Geeky Gamer 900K Proof">
          <div class="container">
            <div class="proof-container">
              <div class="eyebrow-label" style="color: #888;"><span>SCALE & RETENTION PROOF</span></div>
              <div class="proof-number">${PROFILE.proof.stat}</div>
              <div class="proof-sub-title">${PROFILE.proof.label}</div>
              <p class="proof-copy">${PROFILE.proof.copy}</p>
            </div>
          </div>
        </section>

        <!-- 4. BEYOND YOUTUBE -->
        <section id="beyond" class="beyond-section" aria-label="Beyond YouTube">
          <div class="container">
            <div class="beyond-grid">
              <div>
                <div class="eyebrow-label" style="margin-bottom: 16px;"><span>COMMERCIAL SCOPE</span></div>
                <h2 class="headline-section">${PROFILE.beyondYouTube.heading}</h2>
              </div>
              <div>
                <p class="beyond-copy">${PROFILE.beyondYouTube.copy}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 5. ABOUT ME -->
        <section id="about" class="about-section" aria-label="About Jahnvi Agarwal">
          <div class="container">
            <div class="about-grid">
              <div class="about-media-wrapper">
                <div class="about-media-frame">
                  <img src="./images/about-workspace.svg" alt="Jahnvi Agarwal workspace placeholder" class="about-media-img" loading="lazy" />
                </div>
              </div>
              <div class="about-content">
                <div class="eyebrow-label"><span>BACKGROUND</span></div>
                <h2 class="headline-section">About Me</h2>
                <p class="about-copy">${PROFILE.aboutText}</p>
                <div class="about-skills-line">${PROFILE.skills.join(' · ')}</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 6. FINAL CTA / CONTACT -->
        <section id="contact" class="contact-section" aria-label="Contact and Inquiries">
          <div class="container">
            <div class="contact-grid">
              <div class="contact-content">
                <div class="eyebrow-label" style="color: #333;"><span>LET'S CONNECT</span></div>
                <h2 class="contact-heading">${PROFILE.cta.heading}</h2>
                <p class="contact-copy">${PROFILE.cta.copy}</p>
                <div class="contact-actions">
                  <a href="https://wa.me/916396124279?text=Hi%20Jahnvi%2C%20I%20came%20across%20your%20portfolio%20and%20wanted%20to%20discuss%20a%20project%20with%20you." target="_blank" rel="noopener noreferrer" class="btn contact-btn">LET'S CONNECT</a>
                  <div class="contact-availability">${PROFILE.cta.availability}</div>
                  <div class="contact-links-grid">
                    <a href="mailto:${PROFILE.contact.email}" class="contact-channel-item">
                      <span class="contact-channel-label">Email</span>
                      <span class="contact-channel-val">${PROFILE.contact.email}</span>
                    </a>
                    <a href="https://wa.me/${PROFILE.contact.whatsapp.replace(/[^0-9]/g, '')}" target="_blank" rel="noopener noreferrer" class="contact-channel-item">
                      <span class="contact-channel-label">WhatsApp</span>
                      <span class="contact-channel-val">${PROFILE.contact.whatsapp}</span>
                    </a>
                    <a href="${PROFILE.contact.instagram}" target="_blank" rel="noopener noreferrer" class="contact-channel-item">
                      <span class="contact-channel-label">Instagram</span>
                      <span class="contact-channel-val">@jahnviagarwall</span>
                    </a>
                    <a href="${PROFILE.contact.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-channel-item">
                      <span class="contact-channel-label">LinkedIn</span>
                      <span class="contact-channel-val">in/jahnvi-agarwal</span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="contact-media-wrapper">
                <div class="contact-media-frame">
                  <img src="./images/contact-visual.svg" alt="Contact Visual Placeholder" class="contact-media-img" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <!-- FOOTER -->
      <footer class="site-footer" role="contentinfo">
        <div class="container">
          <div class="footer-content">
            <div class="footer-main-row">
              <div class="footer-info">
                <span class="footer-name">${PROFILE.name}</span>
                <span class="footer-role">${PROFILE.title}</span>
                <span class="footer-location">India · Worldwide</span>
              </div>
              <ul class="footer-links">
                <li><a href="mailto:${PROFILE.contact.email}" class="footer-link">Email</a></li>
                <li><a href="${PROFILE.contact.instagram}" target="_blank" rel="noopener noreferrer" class="footer-link">Instagram</a></li>
                <li><a href="${PROFILE.contact.linkedin}" target="_blank" rel="noopener noreferrer" class="footer-link">LinkedIn</a></li>
              </ul>
            </div>
            <div class="footer-bottom-row">
              <span>© 2026 Jahnvi Agarwal. All rights reserved.</span>
              <span>Adobe Premiere Pro · High Retention & Commercial Editing</span>
            </div>
          </div>
        </div>
      </footer>

      <!-- FULL-SCREEN PROJECT LIGHTBOX MODAL -->
      <div id="project-modal" class="modal-backdrop" role="dialog" aria-modal="true" aria-hidden="true">
        <div class="modal-dialog" tabindex="-1">
          <button class="modal-close-btn" id="modal-close" aria-label="Close Project Viewer (Esc)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div id="modal-content-target"></div>
        </div>
      </div>
    </div>
  `;

  attachEventListeners();
}

function openModal(index) {
  activeProjectIndex = index;
  isModalOpen = true;
  isPlaying = false;
  playProgress = 35;
  updateModalContent();
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  isModalOpen = false;
  isPlaying = false;
  const target = document.getElementById('modal-content-target');
  if (target) {
    const vid = target.querySelector('video');
    if (vid) {
      vid.pause();
      vid.src = '';
    }
    target.innerHTML = '';
  }
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  }
}

function updateModalContent() {
  const p = PROJECTS[activeProjectIndex];
  const target = document.getElementById('modal-content-target');
  if (!target || !p) return;

  const modalContainer = target.closest('.modal-container');
  if (modalContainer) {
    if (p.dualVideos) {
      modalContainer.classList.add('modal-container-wide');
    } else {
      modalContainer.classList.remove('modal-container-wide');
    }
  }

  if (p.dualVideos) {
    target.innerHTML = `
      <div class="dual-modal-content">
        <div class="dual-modal-header">
          <span class="dual-modal-pill">${p.dualVideos.subheading}</span>
          <h2 class="dual-modal-title">${p.title.toUpperCase()}</h2>
          <p class="dual-modal-explanation">"${p.dualVideos.explanation}"</p>
        </div>
        <div class="dual-videos-area">
          <div class="dual-videos-grid">
            <div class="dual-video-col dual-col-full">
              <div class="dual-col-header">
                <span class="dual-badge-pill">${p.dualVideos.fullLength.label}</span>
                <span class="dual-format-badge">16:9</span>
              </div>
              <div class="dual-player-frame dual-frame-16-9">
                <video src="${p.dualVideos.fullLength.videoUrl}" controls playsinline preload="metadata" class="dual-video-element" id="vanilla-full-vid"></video>
              </div>
              <div class="dual-video-caption">
                <div class="dual-caption-title">${p.dualVideos.fullLength.label}</div>
                <div class="dual-caption-sub">${p.dualVideos.fullLength.format}</div>
              </div>
            </div>
            <div class="dual-video-col dual-col-short">
              <div class="dual-col-header">
                <span class="dual-badge-pill dual-badge-accent">${p.dualVideos.shortForm.label}</span>
                <span class="dual-format-badge">9:16</span>
              </div>
              <div class="dual-player-frame dual-frame-9-16">
                <video src="${p.dualVideos.shortForm.videoUrl}" controls playsinline preload="metadata" class="dual-video-element" id="vanilla-short-vid"></video>
              </div>
              <div class="dual-video-caption">
                <div class="dual-caption-title">${p.dualVideos.shortForm.label}</div>
                <div class="dual-caption-sub">${p.dualVideos.shortForm.format}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="dual-modal-story">
          <div class="dual-story-card">
            <h3 class="dual-story-heading">${p.dualVideos.caseStudyTitle}</h3>
            <p class="dual-story-copy">"${p.dualVideos.caseStudyDescription}"</p>
          </div>
          <div class="modal-spec-grid">
            <div class="modal-spec-item"><span class="modal-spec-label">Role</span><span class="modal-spec-val">${p.role}</span></div>
            <div class="modal-spec-item"><span class="modal-spec-label">Software</span><span class="modal-spec-val">${p.software}</span></div>
            <div class="modal-spec-item"><span class="modal-spec-label">Formats</span><span class="modal-spec-val">16:9 Long-Form &amp; 9:16 Short-Form</span></div>
            <div class="modal-spec-item"><span class="modal-spec-label">Client</span><span class="modal-spec-val">${p.clientContext || ''}</span></div>
          </div>
        </div>
      </div>
    `;
    const fullV = document.getElementById('vanilla-full-vid');
    const shortV = document.getElementById('vanilla-short-vid');
    if (fullV && shortV) {
      fullV.addEventListener('play', () => { if (!shortV.paused) shortV.pause(); });
      shortV.addEventListener('play', () => { if (!fullV.paused) fullV.pause(); });
    }
    return;
  }

  target.innerHTML = `
    <div class="modal-player-container">
      <div class="modal-video-viewport ${p.aspectRatio === '9:16' ? 'aspect-vertical' : ''}">
        ${p.videoUrl ? `
          <video src="${p.videoUrl}" controls autoplay playsinline preload="metadata" style="width: 100%; height: 100%; max-height: 65vh; object-fit: contain; background: #000;"></video>
        ` : `
          <img src="${p.thumbnail}" alt="${p.title}" class="modal-placeholder-preview" />
          <div class="modal-playback-controls">
            <button class="modal-play-toggle-btn" id="modal-play-btn" aria-label="${isPlaying ? 'Pause' : 'Play'}">
              ${isPlaying ? `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16"/>
                  <rect x="14" y="4" width="4" height="16"/>
                </svg>
              ` : `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              `}
            </button>
            <div class="modal-scrubber-track" id="modal-scrubber">
              <div class="modal-scrubber-progress" style="width: ${playProgress}%;"></div>
            </div>
            <span class="modal-timecode" id="modal-timecode">01:14 / ${p.duration}</span>
          </div>
        `}
      </div>
    </div>

    <div class="modal-body-content">
      <div class="modal-header-meta">
        <span class="modal-category-badge">${p.category}</span>
        <h2 class="modal-title">${p.title}</h2>
      </div>

      <p class="modal-description">${p.description}</p>

      <div class="modal-spec-grid">
        <div class="modal-spec-item">
          <span class="modal-spec-label">Role</span>
          <span class="modal-spec-val">${p.role}</span>
        </div>
        <div class="modal-spec-item">
          <span class="modal-spec-label">Software</span>
          <span class="modal-spec-val">${p.software}</span>
        </div>
        <div class="modal-spec-item">
          <span class="modal-spec-label">Year</span>
          <span class="modal-spec-val">${p.year}</span>
        </div>
        ${p.clientContext ? `
          <div class="modal-spec-item">
            <span class="modal-spec-label">Client / Channel</span>
            <span class="modal-spec-val">${p.clientContext}</span>
          </div>
        ` : ''}
      </div>

      <div class="modal-nav-footer">
        <button class="modal-nav-arrow-btn" id="modal-prev-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span>Previous</span>
        </button>
        <span style="font-size: 13px; color: #777;">${activeProjectIndex + 1} of ${PROJECTS.length}</span>
        <button class="modal-nav-arrow-btn" id="modal-next-btn">
          <span>Next</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  `;

  // Attach modal player controls
  const playBtn = document.getElementById('modal-play-btn');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      playProgress = isPlaying ? (playProgress >= 90 ? 15 : playProgress + 20) : playProgress;
      updateModalContent();
    });
  }

  const scrubber = document.getElementById('modal-scrubber');
  if (scrubber) {
    scrubber.addEventListener('click', (e) => {
      const rect = scrubber.getBoundingClientRect();
      playProgress = Math.max(0, Math.min(100, Math.round(((e.clientX - rect.left) / rect.width) * 100)));
      updateModalContent();
    });
  }

  document.getElementById('modal-prev-btn')?.addEventListener('click', () => {
    activeProjectIndex = (activeProjectIndex - 1 + PROJECTS.length) % PROJECTS.length;
    updateModalContent();
  });

  document.getElementById('modal-next-btn')?.addEventListener('click', () => {
    activeProjectIndex = (activeProjectIndex + 1) % PROJECTS.length;
    updateModalContent();
  });
}

function attachEventListeners() {
  // Mobile drawer toggle
  const toggle = document.getElementById('nav-toggle');
  const drawer = document.getElementById('mobile-drawer');
  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('is-open');
      drawer.classList.toggle('is-open');
    });

    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('is-open');
        drawer.classList.remove('is-open');
      });
    });
  }

  // Hero showreel trigger
  document.getElementById('hero-showreel-btn')?.addEventListener('click', () => openModal(0));

  // Project cards trigger
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index') || '0', 10);
      openModal(idx);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const idx = parseInt(card.getAttribute('data-index') || '0', 10);
        openModal(idx);
      }
    });
  });

  // Modal close
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('project-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'project-modal') closeModal();
  });

  // Global keyboard listener
  window.addEventListener('keydown', (e) => {
    if (!isModalOpen) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') {
      activeProjectIndex = (activeProjectIndex + 1) % PROJECTS.length;
      updateModalContent();
    }
    if (e.key === 'ArrowLeft') {
      activeProjectIndex = (activeProjectIndex - 1 + PROJECTS.length) % PROJECTS.length;
      updateModalContent();
    }
  });
}

// Auto init on DOM load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderPortfolio);
} else {
  renderPortfolio();
}
