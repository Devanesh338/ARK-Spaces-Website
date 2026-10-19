import { TestimonialItem, ReviewSummary } from '../types';

export const REVIEW_SUMMARY: ReviewSummary = {
  rating: 5.0,
  totalReviews: 175,
  source: 'Google Reviews',
  sourceUrl: 'https://arkspaces.com/testimonials/',
  googleReviewUrl: 'https://maps.google.com/?cid=3836299712500048356'
};

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    author: 'Bala Bhaskar',
    location: 'Chennai',
    rating: 5,
    quote: 'Ishaq and Imran were a great team. Went above and beyond to finish the project as per our expectation. Very happy with the final result. Would highly recommend.',
    source: 'Google Reviews',
    category: 'Residential',
    featured: true
  },
  {
    id: 'test-2',
    author: 'Ganapathy Raj',
    location: 'Chennai',
    rating: 5,
    quote: 'Ark spaces has made my house as my pride. They did an excellent job.',
    source: 'Google Reviews',
    category: 'Residential',
    featured: true
  },
  {
    id: 'test-3',
    author: 'RR EYE Hospital',
    roleOrCompany: 'Healthcare Facility',
    location: 'Chennai',
    rating: 5,
    quote: 'Completely satisfied with the whole team. Their quick solutions have been very useful to carry out works without any hurdles. Finishing work on time is also an add on quality. Good luck and cheers to the team.',
    source: 'Google Reviews',
    category: 'Commercial',
    featured: true
  },
  {
    id: 'test-4',
    author: 'salman abu',
    location: 'Chennai',
    rating: 5,
    quote: 'Thanks for Making our dream home. Awesome work by the Ar.Ishaq & Ar Imran & Team. Great value for the price and services with super supportive designers. Thanks Team',
    source: 'Google Reviews',
    category: 'Residential'
  },
  {
    id: 'test-5',
    author: 'Asif',
    roleOrCompany: 'JK Realty Chennai',
    location: 'Chennai',
    rating: 5,
    quote: 'ARK SPACES started by team of young professionals, who has zeal to achieve big goals in life. They are very good in doing all civil engineering related activities right from Designing, Planning and completing the project with in timelines. The work will meet the expectations of the clients. I can assure you the best quality in the work... I wish them all the best.',
    source: 'Google Reviews',
    category: 'Commercial'
  },
  {
    id: 'test-6',
    author: 'Swathi shree',
    location: 'Chennai',
    rating: 5,
    quote: "It's been an incredible experience working with the Ark spaces. Work Environment and Work Culture is Amazing. They value our professional development and provide various opportunities to expand our skills while working. The management team is dedicated to our success and always ready to assist us in any way possible.",
    source: 'Google Reviews',
    category: 'Design & Build'
  },
  {
    id: 'test-7',
    author: 'Saravanan M',
    location: 'Chennai',
    rating: 5,
    quote: 'Customer service is top notch. Dedicated team and transparent communication throughout our home interior execution.',
    source: 'Google Reviews',
    category: 'Residential'
  },
  {
    id: 'test-8',
    author: 'Dhandapaniraj R',
    location: 'Chennai',
    rating: 5,
    quote: 'Delivered our modular kitchen and living room woodwork on schedule with very neat craftsmanship.',
    source: 'Google Reviews',
    category: 'Renovations'
  },
  {
    id: 'test-9',
    author: 'Sivapriya .M',
    location: 'Chennai',
    rating: 5,
    quote: 'Great design solutions tailored to our apartment space. The team was patient with all our revision requests.',
    source: 'Google Reviews',
    category: 'Residential'
  }
];
