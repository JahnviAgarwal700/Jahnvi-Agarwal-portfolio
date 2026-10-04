import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioGrid } from './components/PortfolioGrid';
import { ArchiveSection } from './components/ArchiveSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { CustomCursor } from './components/CustomCursor';
import { useScrollReveal } from './hooks/useScrollReveal';
import { Project, PROJECTS } from './data/portfolioData';

export const App: React.FC = () => {
  // Initialize cinematic scroll reveal engine
  useScrollReveal();

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenHeroMedia = () => {
    // Open the featured showreel / precision engineering master project
    const featured = PROJECTS.find(p => p.videoUrl) || PROJECTS[0];
    setSelectedProject(featured);
  };

  return (
    <div className="portfolio-app">
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* 1. Minimal Navigation */}
      <Navbar />

      <main id="main-content">
        {/* 01 — HERO */}
        <Hero onOpenMedia={handleOpenHeroMedia} />

        {/* 02 — SELECTED WORK */}
        <PortfolioGrid onSelectProject={(project) => setSelectedProject(project)} />

        {/* 02.5 — ARCHIVE (Tactile Physical Folder Stack) */}
        <ArchiveSection />

        {/* 03 — CONTACT */}
        <Contact />
      </main>

      {/* 08 — FOOTER */}
      <Footer />

      {/* Project Lightbox Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(project) => setSelectedProject(project)}
      />
    </div>
  );
};

export default App;
