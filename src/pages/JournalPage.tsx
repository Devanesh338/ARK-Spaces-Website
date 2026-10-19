import React, { useState } from 'react';
import { PageId, JournalArticle } from '../types';
import { JOURNAL_ARTICLES } from '../data/mockData';
import { ArticleModal } from '../components/ArticleModal';

interface JournalPageProps {
  onNavigate: (page: PageId) => void;
}

export const JournalPage: React.FC<JournalPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(null);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const categories = ['All', 'Design Trends', 'Tips', 'Projects', 'Lifestyle'];

  const filteredArticles = selectedCategory === 'All'
    ? JOURNAL_ARTICLES.slice(0, 6)
    : JOURNAL_ARTICLES.filter(a => a.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !/\S+@\S+\.\S+/.test(newsletterEmail)) {
      setNewsletterError('Please enter a valid email address');
      return;
    }
    setNewsletterError('');
    setNewsletterSubscribed(true);
  };

  return (
    <div className="animate-fade-in">

      {/* 1. HERO SECTION (Directly matching PDF Page 8) */}
      <section 
        style={{
          position: 'relative',
          minHeight: '48vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#171713',
          color: '#FFFFFF',
          overflow: 'hidden'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(/images/journal-hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.35)',
            transform: 'scale(1.02)'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '4.5rem 1.5rem' }}>
          <div style={{ maxWidth: '640px' }}>
            <h1 
              style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: 'clamp(2.6rem, 5vw, 4rem)', 
                color: '#FFFFFF',
                marginBottom: '0.65rem',
                lineHeight: 1.15
              }}
            >
              Journal
            </h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '1.15rem' }}>
              Ideas, trends and insights on interior design, architecture and better living.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTERS & 3-COLUMN ARTICLE GRID (Directly matching PDF Page 8) */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-warm-ivory)' }}>
        <div className="container">

          {/* Centered Filter Pills */}
          <div 
            style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center',
              gap: '0.75rem', 
              marginBottom: '3.5rem',
              alignItems: 'center'
            }}
          >
            {categories.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.55rem 1.4rem',
                    fontSize: '0.82rem',
                    borderRadius: '24px',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--color-warm-taupe)' : 'var(--color-stone-border)',
                    backgroundColor: isActive ? 'var(--color-warm-taupe)' : 'transparent',
                    color: isActive ? '#FFFFFF' : 'var(--color-charcoal-muted)',
                    cursor: 'pointer',
                    fontWeight: 400,
                    letterSpacing: '0.02em',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'var(--color-deep-charcoal)';
                      e.currentTarget.style.color = 'var(--color-deep-charcoal)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'var(--color-stone-border)';
                      e.currentTarget.style.color = 'var(--color-charcoal-muted)';
                    }
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* 3-Column Desktop Grid with 6 Articles (Directly matching PDF Page 8) */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '3rem 2rem'
            }}
            className="journal-three-column-grid"
          >
            {filteredArticles.map((article) => (
              <article 
                key={article.id}
                onClick={() => setActiveArticle(article)}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                className="img-zoom-container"
              >
                {/* Article Image */}
                <div 
                  style={{ 
                    height: '220px', 
                    width: '100%', 
                    overflow: 'hidden', 
                    borderRadius: '4px',
                    boxShadow: '0 4px 15px rgba(23, 23, 19, 0.06)',
                    marginBottom: '1rem'
                  }}
                >
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>

                {/* Article Title & Metadata directly below */}
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', lineHeight: 1.3, color: 'var(--color-deep-charcoal)', marginBottom: '0.35rem' }}>
                    {article.title}
                  </h3>

                  <p style={{ fontSize: '0.82rem', color: 'var(--color-charcoal-muted)', marginBottom: '0.4rem', lineHeight: 1.5 }}>
                    {article.excerpt.slice(0, 75)}...
                  </p>

                  <span style={{ fontSize: '0.76rem', color: 'var(--color-charcoal-light)' }}>
                    {article.date}
                  </span>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* 3. STAY INSPIRED NEWSLETTER SECTION (Directly matching PDF Page 8) */}
      <section 
        style={{
          backgroundColor: '#171713',
          color: '#FFFFFF',
          padding: '4.5rem 0'
        }}
      >
        <div className="container">
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3.5rem',
              alignItems: 'center'
            }}
          >
            {/* Left Column: Title, Subtitle, Form */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#FFFFFF', marginBottom: '0.65rem' }}>
                Stay Inspired
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.98rem', marginBottom: '2rem' }}>
                Get the latest design ideas, trends and project updates.
              </p>

              {newsletterSubscribed ? (
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', padding: '1rem 1.25rem', borderRadius: '2px', border: '1px solid rgba(255, 255, 255, 0.2)', fontSize: '0.88rem' }}>
                  Thank you! You are subscribed to the Ark Spaces journal.
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    style={{
                      flex: '1 1 240px',
                      padding: '0.8rem 1rem',
                      fontSize: '0.88rem',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '2px',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      color: '#FFFFFF',
                      outline: 'none'
                    }}
                  />
                  <button 
                    type="submit"
                    style={{
                      backgroundColor: '#FFFFFF',
                      color: '#171713',
                      border: '1px solid #FFFFFF',
                      padding: '0.8rem 1.6rem',
                      fontSize: '0.82rem',
                      fontWeight: 500,
                      borderRadius: '2px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                      e.currentTarget.style.color = '#171713';
                    }}
                  >
                    Subscribe
                  </button>
                </form>
              )}

              {newsletterError && (
                <p style={{ color: '#F08080', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                  {newsletterError}
                </p>
              )}
            </div>

            {/* Right Column: Interior Scene Photograph matching PDF Page 8 */}
            <div 
              style={{
                height: '280px',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)'
              }}
              className="img-zoom-container"
            >
              <img 
                src="/images/cta-warm.jpg" 
                alt="ARK Spaces Lounge & Greenery" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>

          </div>
        </div>
      </section>

      {/* Article Detail Modal */}
      <ArticleModal 
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        onNavigate={onNavigate}
      />

      {/* Responsive layout for mobile */}
      <style>{`
        @media (max-width: 860px) {
          .journal-three-column-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </div>
  );
};
