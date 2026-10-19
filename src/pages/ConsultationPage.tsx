import React, { useState, useRef } from 'react';
import { PageId } from '../types';
import { Phone, Mail, MapPin, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { useGsapContext } from '../hooks/useGsapContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ConsultationPageProps {
  onNavigate: (page: PageId) => void;
}

export const ConsultationPage: React.FC<ConsultationPageProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    roomType: '',
    budget: '',
    timeline: '',
    details: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useGsapContext(containerRef, () => {
    // 1. Hero Entrance
    gsap.from('.consult-hero-title', {
      y: 30,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out',
      delay: 0.1
    });
    gsap.from('.consult-hero-sub', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.25
    });

    // 2. Form & Contact Columns Reveal
    gsap.from('.consult-form-column', {
      scrollTrigger: {
        trigger: '.consult-split-section',
        start: 'top 82%',
        toggleActions: 'play none none none'
      },
      x: -30,
      opacity: 0,
      duration: 0.85,
      ease: 'power2.out'
    });

    gsap.from('.consult-info-column', {
      scrollTrigger: {
        trigger: '.consult-split-section',
        start: 'top 82%',
        toggleActions: 'play none none none'
      },
      x: 30,
      opacity: 0,
      duration: 0.85,
      ease: 'power2.out'
    });
  });

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please provide a valid phone number';
    }
    if (!formData.roomType) errs.roomType = 'Please select a room type';
    if (!formData.budget) errs.budget = 'Please select a budget range';
    if (!formData.timeline) errs.timeline = 'Please select a preferred timeline';
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 700);
    }
  };

  return (
    <div ref={containerRef} style={{ backgroundColor: 'var(--color-warm-ivory)' }}>

      {/* 1. HERO SECTION (Directly matching PDF Page 7) */}
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
            backgroundImage: 'url(/images/consultation-hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.38)',
            transform: 'scale(1.02)'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '4.5rem 1.5rem' }}>
          <div style={{ maxWidth: '640px' }}>
            <h1 
              className="consult-hero-title"
              style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: 'clamp(2.6rem, 5vw, 4rem)', 
                color: '#FFFFFF',
                marginBottom: '0.65rem',
                lineHeight: 1.15
              }}
            >
              Book a Consultation
            </h1>
            <p className="consult-hero-sub" style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '1.15rem' }}>
              Let’s bring your vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* 2. TWO-COLUMN LAYOUT: ENQUIRY FORM & CONTACT DETAILS (Directly matching PDF Page 7) */}
      <section className="section-py consult-split-section" style={{ backgroundColor: 'var(--color-warm-ivory)', overflow: 'hidden' }}>
        <div className="container">
          <div 
            className="consult-split-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: 'clamp(2.5rem, 5vw, 4.5rem)',
              alignItems: 'start'
            }}
          >
            
            {/* Left Column: Project Enquiry Form */}
            <div className="consult-form-column">
              {submitted ? (
                <div style={{ backgroundColor: '#FAF8F5', padding: '3rem 2rem', borderRadius: '4px', border: '1px solid var(--color-stone-border)', textAlign: 'center' }}>
                  <div 
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(36, 41, 29, 0.1)',
                      color: 'var(--color-dark-olive)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.25rem'
                    }}
                  >
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', marginBottom: '0.5rem' }}>
                    Enquiry Received
                  </h3>
                  <p style={{ color: 'var(--color-charcoal-muted)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
                    Thank you, <strong>{formData.fullName}</strong>. Our interior design team will get back to you within 24–48 hours.
                  </p>
                  <button 
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        roomType: '',
                        budget: '',
                        timeline: '',
                        details: ''
                      });
                    }}
                    style={{
                      backgroundColor: 'var(--color-deep-charcoal)',
                      color: '#FFFFFF',
                      padding: '0.75rem 1.8rem',
                      fontSize: '0.82rem',
                      borderRadius: '2px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.9rem, 3.2vw, 2.5rem)', color: 'var(--color-deep-charcoal)', marginBottom: '0.35rem' }}>
                    Tell us about your project
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-charcoal-muted)', marginBottom: '2rem' }}>
                    Fill in a few details and our team will get back to you within 24–48 hours.
                  </p>

                  {/* Full Name */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-charcoal-muted)', marginBottom: '0.4rem' }}>
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="form-input-field"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.9rem',
                        fontSize: '0.92rem',
                        border: '1px solid',
                        borderColor: errors.fullName ? '#D9534F' : 'var(--color-stone-border)',
                        borderRadius: '2px',
                        backgroundColor: '#FFFFFF',
                        outline: 'none',
                        fontFamily: 'inherit',
                        transition: 'border-color 0.25s ease, box-shadow 0.25s ease'
                      }}
                    />
                    {errors.fullName && (
                      <span style={{ fontSize: '0.75rem', color: '#D9534F', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertCircle size={12} /> {errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* Email Address */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-charcoal-muted)', marginBottom: '0.4rem' }}>
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input-field"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.9rem',
                        fontSize: '0.92rem',
                        border: '1px solid',
                        borderColor: errors.email ? '#D9534F' : 'var(--color-stone-border)',
                        borderRadius: '2px',
                        backgroundColor: '#FFFFFF',
                        outline: 'none',
                        fontFamily: 'inherit',
                        transition: 'border-color 0.25s ease, box-shadow 0.25s ease'
                      }}
                    />
                    {errors.email && (
                      <span style={{ fontSize: '0.75rem', color: '#D9534F', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertCircle size={12} /> {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-charcoal-muted)', marginBottom: '0.4rem' }}>
                      Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-input-field"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.9rem',
                        fontSize: '0.92rem',
                        border: '1px solid',
                        borderColor: errors.phone ? '#D9534F' : 'var(--color-stone-border)',
                        borderRadius: '2px',
                        backgroundColor: '#FFFFFF',
                        outline: 'none',
                        fontFamily: 'inherit',
                        transition: 'border-color 0.25s ease, box-shadow 0.25s ease'
                      }}
                    />
                    {errors.phone && (
                      <span style={{ fontSize: '0.75rem', color: '#D9534F', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertCircle size={12} /> {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* Room Type */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-charcoal-muted)', marginBottom: '0.4rem' }}>
                      Room Type *
                    </label>
                    <select 
                      value={formData.roomType}
                      onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                      className="form-input-field"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.9rem',
                        fontSize: '0.92rem',
                        border: '1px solid',
                        borderColor: errors.roomType ? '#D9534F' : 'var(--color-stone-border)',
                        borderRadius: '2px',
                        backgroundColor: '#FFFFFF',
                        outline: 'none',
                        fontFamily: 'inherit',
                        color: formData.roomType ? 'var(--color-deep-charcoal)' : 'var(--color-charcoal-light)',
                        transition: 'border-color 0.25s ease, box-shadow 0.25s ease'
                      }}
                    >
                      <option value="">Select</option>
                      <option value="Residential">Residential Design (Full Home)</option>
                      <option value="Modular Kitchens">Modular Kitchen</option>
                      <option value="Bedrooms">Bedrooms & Suites</option>
                      <option value="Workspaces">Workspaces & Commercial</option>
                      <option value="Renovation">Renovation & Turnkey</option>
                    </select>
                    {errors.roomType && (
                      <span style={{ fontSize: '0.75rem', color: '#D9534F', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertCircle size={12} /> {errors.roomType}
                      </span>
                    )}
                  </div>

                  {/* Project Budget */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-charcoal-muted)', marginBottom: '0.4rem' }}>
                      Project Budget *
                    </label>
                    <select 
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="form-input-field"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.9rem',
                        fontSize: '0.92rem',
                        border: '1px solid',
                        borderColor: errors.budget ? '#D9534F' : 'var(--color-stone-border)',
                        borderRadius: '2px',
                        backgroundColor: '#FFFFFF',
                        outline: 'none',
                        fontFamily: 'inherit',
                        color: formData.budget ? 'var(--color-deep-charcoal)' : 'var(--color-charcoal-light)',
                        transition: 'border-color 0.25s ease, box-shadow 0.25s ease'
                      }}
                    >
                      <option value="">Select</option>
                      <option value="Under 10 Lakhs">Under ₹10 Lakhs</option>
                      <option value="10 - 25 Lakhs">₹10 Lakhs – ₹25 Lakhs</option>
                      <option value="25 - 50 Lakhs">₹25 Lakhs – ₹50 Lakhs</option>
                      <option value="50 Lakhs+">₹50 Lakhs+</option>
                    </select>
                    {errors.budget && (
                      <span style={{ fontSize: '0.75rem', color: '#D9534F', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertCircle size={12} /> {errors.budget}
                      </span>
                    )}
                  </div>

                  {/* Preferred Timeline */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-charcoal-muted)', marginBottom: '0.4rem' }}>
                      Preferred Timeline *
                    </label>
                    <select 
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="form-input-field"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.9rem',
                        fontSize: '0.92rem',
                        border: '1px solid',
                        borderColor: errors.timeline ? '#D9534F' : 'var(--color-stone-border)',
                        borderRadius: '2px',
                        backgroundColor: '#FFFFFF',
                        outline: 'none',
                        fontFamily: 'inherit',
                        color: formData.timeline ? 'var(--color-deep-charcoal)' : 'var(--color-charcoal-light)',
                        transition: 'border-color 0.25s ease, box-shadow 0.25s ease'
                      }}
                    >
                      <option value="">Select</option>
                      <option value="Immediate">Immediate</option>
                      <option value="1 - 3 Months">1 – 3 Months</option>
                      <option value="3 - 6 Months">3 – 6 Months</option>
                      <option value="Planning stage">Planning Stage</option>
                    </select>
                    {errors.timeline && (
                      <span style={{ fontSize: '0.75rem', color: '#D9534F', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertCircle size={12} /> {errors.timeline}
                      </span>
                    )}
                  </div>

                  {/* Additional Details */}
                  <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-charcoal-muted)', marginBottom: '0.4rem' }}>
                      Additional Details
                    </label>
                    <textarea 
                      rows={4}
                      placeholder="Tell us more about your project..."
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="form-input-field"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.9rem',
                        fontSize: '0.92rem',
                        border: '1px solid var(--color-stone-border)',
                        borderRadius: '2px',
                        backgroundColor: '#FFFFFF',
                        outline: 'none',
                        fontFamily: 'inherit',
                        resize: 'vertical',
                        transition: 'border-color 0.25s ease, box-shadow 0.25s ease'
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      backgroundColor: 'var(--color-deep-charcoal)',
                      color: '#FFFFFF',
                      padding: '0.85rem 2rem',
                      fontSize: '0.84rem',
                      fontWeight: 500,
                      borderRadius: '2px',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'background-color 0.25s ease, transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#000000';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-deep-charcoal)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {isSubmitting ? 'Submitting...' : (
                      <>Submit Enquiry <ArrowRight size={15} /></>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Other Ways to Reach Us & Supporting Photo (Directly matching PDF Page 7) */}
            <div className="consult-info-column">
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.9rem, 3.2vw, 2.5rem)', color: 'var(--color-deep-charcoal)', marginBottom: '2rem' }}>
                Other Ways to Reach Us
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                
                {/* Phone */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--color-stone-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-charcoal-muted)', backgroundColor: '#FFFFFF' }}>
                    <Phone size={17} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--color-charcoal-light)' }}>Phone</div>
                    <div style={{ fontSize: '0.94rem', fontWeight: 500, color: 'var(--color-deep-charcoal)' }}>
                      +91 98765 43210
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--color-stone-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-charcoal-muted)', backgroundColor: '#FFFFFF' }}>
                    <Mail size={17} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--color-charcoal-light)' }}>Email</div>
                    <div style={{ fontSize: '0.94rem', fontWeight: 500, color: 'var(--color-deep-charcoal)' }}>
                      hello@arkspaces.com
                    </div>
                  </div>
                </div>

                {/* Office */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--color-stone-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-charcoal-muted)', backgroundColor: '#FFFFFF' }}>
                    <MapPin size={17} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--color-charcoal-light)' }}>Office</div>
                    <div style={{ fontSize: '0.94rem', fontWeight: 500, color: 'var(--color-deep-charcoal)' }}>
                      Chennai, Tamil Nadu
                    </div>
                  </div>
                </div>

              </div>

              {/* Supporting Photograph matching PDF Page 7 */}
              <div 
                style={{ 
                  height: '320px', 
                  borderRadius: '4px', 
                  overflow: 'hidden', 
                  boxShadow: '0 8px 30px rgba(23, 23, 19, 0.08)',
                  marginBottom: '1.75rem'
                }}
                className="img-zoom-container"
              >
                <img 
                  src="/images/cta-warm.jpg" 
                  alt="ARK Spaces Sitting Room" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>

              {/* Quote below photo */}
              <div>
                <blockquote style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontStyle: 'italic', color: 'var(--color-deep-charcoal)', marginBottom: '0.4rem', lineHeight: 1.3 }}>
                  &ldquo;Great spaces start with a conversation.&rdquo;
                </blockquote>
                <cite style={{ fontSize: '0.76rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-warm-taupe)', fontStyle: 'normal' }}>
                  — ARK SPACES
                </cite>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Field focus styles & responsive layout */}
      <style>{`
        .form-input-field:focus {
          border-color: var(--color-warm-taupe) !important;
          box-shadow: 0 0 0 2px rgba(182, 165, 142, 0.25) !important;
        }
        @media (max-width: 840px) {
          .consult-split-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .consult-form-column {
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>

    </div>
  );
};
