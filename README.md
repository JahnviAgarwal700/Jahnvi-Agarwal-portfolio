# Jahnvi Agarwal — Video Editor Portfolio

A minimal, editorial, single-page portfolio website designed specifically for **Jahnvi Agarwal — Video Editor**.

Built with **React + TypeScript + Vite** and Vanilla CSS for maximum performance, bespoke layout rhythm, and fluid responsiveness across desktop, tablet, and mobile devices.

---

## 🎨 Design System & Palette

## 🎨 Design System & Palette

- **Yellow**: `#FFC700` (Signature main brand color: hero section, primary buttons, badges, accents)
- **Pink**: `#FF438A` (Bespoke custom interactive cursor graphic & ripple physics)
- **Cream**: `#F5F0E8` (Primary editorial background)
- **White**: `#FFFFFF` (Negative space, cards, contrast sections)
- **Black**: `#111111` (Typography, high-contrast buttons, full-width 900K+ proof section)
- **Typography**: Google Sans Flex & Inter fallback

### 01–08 Structure:
1. `01 — HERO` (Hi, I'm Jahnvi. · Video Editor · 16:10 Rounded Media)
2. `02 — SELECTED WORK` (Editorial 2-column portfolio + full-screen modal)
3. `03 — 900K+ PROOF` (Dramatic minimal full-width black section with huge 100–140px stat)
4. `04 — WHAT I EDIT` (Clean editorial list of editing specializations)
5. `05 — ABOUT ME` (Personal bio + rounded photo placeholder)
6. `06 — BEHIND THE EDIT` (My Setup + AI Workflow)
7. `07 — CONTACT` (Minimal CTA + direct email, WhatsApp, Instagram, LinkedIn)
8. `08 — FOOTER` (Jahnvi Agarwal · Video Editor · India · Worldwide)

---

## 📁 Project Structure

```
├── public/
│   ├── favicon.svg              # Minimal branding favicon
│   ├── images/                  # All placeholder & production graphics
│   │   ├── hero-preview.svg     # 16:10 Hero showreel/photo preview
│   │   ├── about-workspace.svg  # About Me photo/workspace preview
│   │   ├── contact-visual.svg   # Contact section visual preview
│   │   ├── project-geeky-gamer.svg
│   │   ├── project-manufacturing.svg
│   │   ├── project-advertising.svg
│   │   ├── project-ai-corporate.svg
│   │   ├── project-shortform.svg
│   │   └── project-creative.svg
│   └── videos/                  # Direct master video assets
│       └── bs pr final.mp4      # Real 4K master precision engineering reel
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Minimal sticky nav (Work, About, Contact, CTA)
│   │   ├── Hero.tsx             # Personal hero layout + 16:10 rounded media
│   │   ├── PortfolioGrid.tsx    # 2-column editorial project grid
│   │   ├── ProjectCard.tsx      # 24–28px rounded cards with subtle hover scale
│   │   ├── ProofSection.tsx     # Full-width #111111 dramatic 900K+ proof
│   │   ├── WhatIEdit.tsx        # Clean editorial list of editing specializations
│   │   ├── About.tsx            # Personal statement + photo placeholder
│   │   ├── BehindTheEdit.tsx    # My Setup & AI Workflow
│   │   ├── Contact.tsx          # Minimal CTA + direct channels
│   │   ├── Footer.tsx           # Ultra-minimal footer
│   │   └── ProjectModal.tsx     # Full-screen lightbox video player & metadata
│   ├── data/
│   │   └── portfolioData.ts     # Single source of truth for all projects & info
│   ├── App.tsx                  # Single long-scrolling page orchestrator
│   ├── index.css                # Pure Vanilla CSS design system
│   └── main.tsx                 # React entry point
├── index.html                   # SEO tags, social open graph, Google Sans Flex fonts
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm / yarn

### Running Locally
```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Building for Production
```bash
npm run build
```
This generates an optimized static bundle in `/dist` ready for deployment to **Vercel**, **Netlify**, **Cloudflare Pages**, or **GitHub Pages**.

---

## 🛠️ How to Replace Placeholders & Customize

All data is intentionally consolidated into one file:
👉 **`src/data/portfolioData.ts`**

### 1. Replacing Your Hero & About Photos / Showreel
- **Hero Media**: Replace `/public/images/hero-preview.svg` with your actual photograph, showreel poster, or video thumbnail (e.g. `/public/images/hero-jahnvi.jpg`).
- **About Workspace Photo**: Replace `/public/images/about-workspace.svg` with your photo or workspace shot (e.g. `/public/images/jahnvi-workspace.jpg`).
- Update paths in `src/data/portfolioData.ts` or in `Hero.tsx` / `About.tsx`.

### 2. Adding Real Project Videos (.mp4 or YouTube / Vimeo)
1. Drop your `.mp4` file into `/public/videos/my-video.mp4` (or get a YouTube/Vimeo embed link).
2. Open `src/data/portfolioData.ts`.
3. Set the `videoUrl` property:
   ```typescript
   videoUrl: "/videos/my-video.mp4"
   // or
   videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID"
   ```
4. If `videoUrl` is left empty, the portfolio displays the interactive mock video player with play/pause, timecode, and scrubber controls.

### 3. Updating Your Contact Details
In `src/data/portfolioData.ts`:
```typescript
contact: {
  email: "your.real.email@gmail.com",
  whatsapp: "+91 9XXXXXXXXX",
  instagram: "https://instagram.com/yourhandle",
  linkedin: "https://linkedin.com/in/yourprofile"
}
```

---

## 🚀 Features & Accessibility
- **Accessible Modal**: Press `Esc` to close, `←` / `→` arrow keys to cycle through projects.
- **Micro-Animations**: Hover zoom (1.02x), smooth transitions, circular play buttons.
- **Mobile Optimized**: Tested for seamless layout at 1440px, 1280px, 1024px, 768px, 430px, 390px, and 360px.
- **Respects `prefers-reduced-motion`**: Disabled intense transitions for users who prefer reduced motion.
- **SEO & Social Metadata**: Rich OpenGraph tags, title, and description pre-configured in `index.html`.
