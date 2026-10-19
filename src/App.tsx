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

interface ParsedRoute {
  page: PageId;
  projectId?: string;
  category?: string;
}

const getBasePath = (): string => {
  if (typeof window === 'undefined') return '';
  const pathname = window.location.pathname;
  // If hosted in a subfolder (e.g. GitHub Pages /repo-name/projects)
  const match = pathname.match(/^(\/[^/]+)\/(projects|about|services|process|materials|consultation|contact|testimonials|reviews|journal|project)/i);
  if (match) {
    return match[1];
  }
  return '';
};

const parseCurrentRoute = (): ParsedRoute => {
  if (typeof window === 'undefined') {
    return { page: 'home' };
  }

  // 1. Support SPA fallback query parameter (e.g. ?p=/projects from 404.html)
  const searchParams = new URLSearchParams(window.location.search);
  const redirectedPath = searchParams.get('p');
  if (redirectedPath) {
    try {
      const decoded = decodeURIComponent(redirectedPath);
      window.history.replaceState(null, '', decoded);
    } catch {
      // Ignore URI decode errors
    }
  }

  // 2. Check hash fallback (e.g. /#projects, /#project/crescent-house, /#/projects)
  const hash = window.location.hash.replace(/^#[/]?/, '').toLowerCase();
  if (hash) {
    if (hash.startsWith('project/')) {
      const pId = hash.replace('project/', '').trim();
      return { page: 'project-detail', projectId: pId || 'the-crescent-house' };
    }
    if (['about', 'projects', 'services', 'process', 'materials', 'consultation', 'testimonials', 'home'].includes(hash)) {
      return { page: hash as PageId };
    }
    if (hash === 'contact') return { page: 'consultation' };
    if (hash === 'reviews' || hash === 'journal') return { page: 'testimonials' };
  }

  // 3. Check real pathname (e.g. /projects, /services, /project/the-crescent-house)
  const rawPath = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  
  // Project detail route: /project/:id
  const projectMatch = rawPath.match(/\/project\/([^/?#]+)/i);
  if (projectMatch && projectMatch[1]) {
    return { page: 'project-detail', projectId: projectMatch[1] };
  }

  if (rawPath.endsWith('/about')) return { page: 'about' };
  if (rawPath.endsWith('/projects')) {
    const cat = searchParams.get('category') || 'All';
    return { page: 'projects', category: cat };
  }
  if (rawPath.endsWith('/services')) return { page: 'services' };
  if (rawPath.endsWith('/process')) return { page: 'process' };
  if (rawPath.endsWith('/materials')) return { page: 'materials' };
  if (rawPath.endsWith('/consultation') || rawPath.endsWith('/contact')) return { page: 'consultation' };
  if (rawPath.endsWith('/testimonials') || rawPath.endsWith('/reviews') || rawPath.endsWith('/journal')) return { page: 'testimonials' };

  return { page: 'home' };
};

export const App: React.FC = () => {
  // Synchronously initialize state from the current browser URL so refreshing preserves the page
  const [currentPage, setCurrentPage] = useState<PageId>(() => parseCurrentRoute().page);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(() => parseCurrentRoute().projectId || 'the-crescent-house');
  const [filterCategory, setFilterCategory] = useState<string>(() => parseCurrentRoute().category || 'All');

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

  // Handle navigation and update browser history cleanly
  const handleNavigate = (page: PageId, projectId?: string, category?: string) => {
    const basePath = getBasePath();
    let targetPath = '/';
    let targetSearch = '';

    if (page === 'home') {
      targetPath = `${basePath}/`;
    } else if (page === 'project-detail') {
      const pId = projectId || selectedProjectId || 'the-crescent-house';
      setSelectedProjectId(pId);
      targetPath = `${basePath}/project/${pId}`;
    } else if (page === 'projects') {
      targetPath = `${basePath}/projects`;
      if (category && category !== 'All') {
        targetSearch = `?category=${encodeURIComponent(category)}`;
        setFilterCategory(category);
      } else {
        setFilterCategory('All');
      }
    } else {
      targetPath = `${basePath}/${page}`;
    }

    if (projectId && page !== 'project-detail') {
      setSelectedProjectId(projectId);
    }

    setCurrentPage(page);

    const fullUrl = `${targetPath}${targetSearch}`.replace(/\/+/g, '/');
    if (window.location.pathname + window.location.search !== fullUrl) {
      window.history.pushState({ page, projectId, category }, '', fullUrl);
    }

    scrollToTop(true);
  };

  // Synchronize browser history / URL back and forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const route = parseCurrentRoute();
      setCurrentPage(route.page);
      if (route.projectId) {
        setSelectedProjectId(route.projectId);
      }
      if (route.category) {
        setFilterCategory(route.category);
      }
      scrollToTop(true);
    };

    // If initial URL had a hash, upgrade it to a clean path
    if (window.location.hash) {
      const route = parseCurrentRoute();
      const basePath = getBasePath();
      const cleanPath = route.page === 'home'
        ? `${basePath}/`
        : route.page === 'project-detail'
          ? `${basePath}/project/${route.projectId || selectedProjectId}`
          : `${basePath}/${route.page}`;
      window.history.replaceState({ page: route.page }, '', cleanPath.replace(/\/+/g, '/'));
    }

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, [selectedProjectId]);

  // Update document title for proper SEO & tab labeling
  useEffect(() => {
    const pageTitles: Record<PageId, string> = {
      home: 'ARK SPACES — Luxury Interior Design Studio | Chennai',
      about: 'About Us — ARK Spaces Luxury Interior Design Studio',
      projects: 'Curated Portfolio — ARK Spaces',
      'project-detail': 'Project Details — ARK Spaces',
      services: 'Interior Design Services — ARK Spaces',
      process: 'Design & Execution Process — ARK Spaces',
      materials: 'Tactile Materials & Finishes — ARK Spaces',
      consultation: 'Book a Design Consultation — ARK Spaces',
      testimonials: 'Client Reviews & Testimonials — ARK Spaces',
      journal: 'Client Reviews & Testimonials — ARK Spaces'
    };

    document.title = pageTitles[currentPage] || 'ARK SPACES — Luxury Interior Design Studio';
  }, [currentPage]);

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
