import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProcessPage } from './pages/ProcessPage';
import { MaterialsPage } from './pages/MaterialsPage';
import { ConsultationPage } from './pages/ConsultationPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { initLenis, destroyLenis, scrollToTop } from './lib/lenis';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('the-crescent-house');
  const [filterCategory, setFilterCategory] = useState<string>('All');

  // Initialize Lenis smooth scroll on mount and configure manual scroll restoration
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    initLenis();
    return () => {
      destroyLenis();
    };
  }, []);

  // Handle navigation
  const handleNavigate = (page: PageId, projectId?: string, category?: string) => {
    if (projectId) {
      setSelectedProjectId(projectId);
    }
    if (category) {
      setFilterCategory(category);
    } else if (page === 'projects') {
      setFilterCategory('All');
    }
    setCurrentPage(page);
    scrollToTop(true);
  };

  // Synchronize browser history / URL hash for clean navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('project/')) {
        const pId = hash.replace('project/', '');
        setSelectedProjectId(pId);
        setCurrentPage('project-detail');
      } else if (['home', 'about', 'projects', 'services', 'process', 'materials', 'consultation', 'testimonials'].includes(hash)) {
        setCurrentPage(hash as PageId);
      } else if (hash === 'journal') {
        // Redirect obsolete journal links to testimonials
        setCurrentPage('testimonials');
      }
      scrollToTop(true);
    };

    // Initial check on mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (currentPage === 'project-detail') {
      window.location.hash = `project/${selectedProjectId}`;
    } else {
      window.location.hash = currentPage;
    }
  }, [currentPage, selectedProjectId]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-warm-ivory)' }}>
      {/* Main Sticky/Fixed Navbar */}
      <Navbar 
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Page Content Rendering with proper header offset & safe-area bottom clearance for mobile bar */}
      <main 
        className="app-main-content"
        style={{ 
          flexGrow: 1,
          paddingTop: currentPage === 'home' ? 0 : '72px'
        }}
      >
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} />
        )}
        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'projects' && (
          <ProjectsPage initialCategory={filterCategory} onNavigate={handleNavigate} />
        )}
        {currentPage === 'project-detail' && (
          <ProjectDetailPage projectId={selectedProjectId} onNavigate={handleNavigate} />
        )}
        {currentPage === 'services' && (
          <ServicesPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'process' && (
          <ProcessPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'materials' && (
          <MaterialsPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'consultation' && (
          <ConsultationPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'testimonials' && (
          <TestimonialsPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Luxury Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global CSS to ensure mobile persistent navigation does not cover page content or buttons */}
      <style>{`
        @media (max-width: 899px) {
          .app-main-content {
            padding-bottom: calc(72px + env(safe-area-inset-bottom, 0px)) !important;
          }
        }
      `}</style>
    </div>
  );
};
