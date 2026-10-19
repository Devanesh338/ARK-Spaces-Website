export type PageId = 
  | 'home' 
  | 'about' 
  | 'projects' 
  | 'project-detail' 
  | 'services' 
  | 'process'
  | 'materials' 
  | 'consultation' 
  | 'testimonials'
  | 'journal';

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  duration: string;
  deliverables: string[];
  image: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  roleOrCompany?: string;
  location?: string;
  rating: number; // 5
  quote: string;
  source: 'Google Reviews' | 'Direct Client Feedback';
  category: 'Residential' | 'Commercial' | 'Renovations' | 'Design & Build';
  featured?: boolean;
}

export interface ReviewSummary {
  rating: number;
  totalReviews: number;
  source: string;
  sourceUrl: string;
  googleReviewUrl: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'Residential' | 'Modular Kitchens' | 'Bedrooms' | 'Workspaces';
  year: string;
  location: string;
  size: string;
  subtitle: string;
  heroImage: string;
  visionText: string;
  visionImage: string;
  highlights: string[];
  highlightsImage: string;
  materials: {
    name: string;
    type: string;
    colorHex?: string;
    texture?: string;
  }[];
  gallery: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  timeline: string;
  deliverables: string[];
}

export interface MaterialItem {
  id: string;
  name: string;
  category: 'Wood' | 'Stone' | 'Fabrics' | 'Metals' | 'Colours';
  description: string;
  finish: string;
  colorHex?: string;
  image?: string;
  characteristics: string[];
}

export interface MaterialMoodboard {
  id: string;
  name: string;
  tagline: string;
  image: string;
  materials: string[];
  description: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  category: 'Design Trends' | 'Tips' | 'Projects' | 'Lifestyle';
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  content: string[];
}
