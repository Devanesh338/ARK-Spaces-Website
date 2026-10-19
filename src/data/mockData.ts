import { Project, ServiceItem, MaterialItem, MaterialMoodboard, JournalArticle, ProcessStep } from '../types';
export type { TestimonialItem, ReviewSummary, ProcessStep } from '../types';
export { TESTIMONIALS, REVIEW_SUMMARY } from './testimonialsData';

export const COMPANY_INFO = {
  name: 'ARK SPACES',
  tagline: 'Interiors, Considered.',
  headline: 'Spaces that feel like you.',
  subheadline: 'Thoughtful design. Functional details. Beautifully executed spaces.',
  philosophy: 'Good design isn’t just about how it looks, but how it makes you feel.',
  aboutStory: `ARK Spaces is a Chennai-based interior design studio focused on creating thoughtful, functional and timeless spaces. We believe that great design is not just about aesthetics, but about how a space makes you feel and live. With a passion for detail and a commitment to quality, we work closely with our clients to bring their vision to life — from concept to completion.`,
  stats: [
    { value: '10+', label: 'Years of Experience' },
    { value: '200+', label: 'Projects Completed' },
    { value: '100+', label: 'Happy Clients' },
    { value: '120+', label: 'Quality Checks' },
  ],
  address: 'Flat 1B, No 25, Arjun Flats, Senthamil Sethupillai St, Ganapathipuram, East Tambaram, Chennai - 600 059',
  phone: '+91 91769 33786',
  phoneSecondary: '+91 98765 43210',
  email: 'hello@arkspaces.com',
  emailSupport: 'info@arkspaces.com',
  hours: 'Monday – Saturday: 9:00 AM – 7:00 PM',
  socials: {
    instagram: 'https://www.instagram.com/ark.spaces/',
    linkedin: 'https://in.linkedin.com/company/ark-spaces',
    facebook: 'https://www.facebook.com/p/Ark-Spaces-100076691352645/'
  }
};

export const PROJECTS: Project[] = [
  {
    id: 'the-crescent-house',
    title: 'The Crescent House',
    category: 'Residential',
    year: '2024',
    location: 'Chennai',
    size: '3,200 sq.ft.',
    subtitle: 'A modern home designed for a growing family.',
    heroImage: '/images/project-crescent-1.jpg',
    visionText: 'The clients wanted a warm, modern home that felt open, calm and connected to nature. Our design focused on natural materials, soft tones and functional spaces for every member of the family.',
    visionImage: '/images/project-crescent-vision.jpg',
    highlights: [
      'Open-plan living and dining with seamless garden connectivity',
      'Natural stone, travertine and fluted oak timber finishes',
      'Custom floor-to-ceiling storage solutions with hidden joinery',
      'Curated indoor plants and biophilic micro-courtyards for a calming atmosphere'
    ],
    highlightsImage: '/images/project-crescent-highlights.jpg',
    materials: [
      { name: 'Oak Wood', type: 'Natural Solid White Oak', colorHex: '#C5A073', texture: '/images/mat-oak.jpg' },
      { name: 'Travertine Stone', type: 'Navona Vein-cut Stone', colorHex: '#DDD5C7', texture: '/images/mat-travertine.jpg' },
      { name: 'Linen Fabric', type: 'Raw Belgian Woven Linen', colorHex: '#E2DBD2', texture: '/images/mat-linen.jpg' },
      { name: 'Matte Black', type: 'Architectural Powder-Coated Metal', colorHex: '#1B1A17', texture: '/images/mat-steel.jpg' },
      { name: 'Olive Green', type: 'Earth Pigment Accent Paint', colorHex: '#4E5340' }
    ],
    gallery: [
      '/images/project-crescent-gallery1.jpg',
      '/images/project-crescent-gallery2.jpg',
      '/images/project-crescent-gallery3.jpg',
      '/images/project-crescent-gallery4.jpg'
    ]
  },
  {
    id: 'oak-and-stone-kitchen',
    title: 'Oak & Stone Kitchen',
    category: 'Modular Kitchens',
    year: '2024',
    location: 'Chennai',
    size: '480 sq.ft.',
    subtitle: 'An architectural kitchen blending fluted timber with tactile quartz.',
    heroImage: '/images/project-kitchen-1.jpg',
    visionText: 'Conceived as the culinary centerpiece of the residence, this kitchen harmonizes ergonomic culinary performance with warm residential luxury.',
    visionImage: '/images/cat-kitchen.jpg',
    highlights: [
      'Integrated pocket doors concealing heavy culinary prep zones',
      'Fluted solid white oak island with cantilevered breakfast ledge',
      'Seamless calacatta quartz countertops with mitered waterfall edge',
      'Architectural recessed warm LED lighting in 2700K temperature'
    ],
    highlightsImage: '/images/project-crescent-gallery1.jpg',
    materials: [
      { name: 'Oak Wood', type: 'Fluted White Oak', colorHex: '#C5A073', texture: '/images/mat-oak.jpg' },
      { name: 'Calacatta Marble', type: 'Honied Quartzite', colorHex: '#F0EFEA', texture: '/images/mat-marble.jpg' },
      { name: 'Brushed Brass', type: 'Solid PVD Brass Hardware', colorHex: '#CBB279', texture: '/images/mat-brass.jpg' },
      { name: 'Matte Black', type: 'Anodized Aluminum Profile', colorHex: '#222220' }
    ],
    gallery: [
      '/images/project-kitchen-1.jpg',
      '/images/cat-kitchen.jpg',
      '/images/project-crescent-gallery1.jpg',
      '/images/moodboard-warm-minimal.jpg'
    ]
  },
  {
    id: 'serene-bedroom',
    title: 'Serene Bedroom',
    category: 'Bedrooms',
    year: '2023',
    location: 'Chennai',
    size: '560 sq.ft.',
    subtitle: 'A restful sanctuary celebrating Japandi minimalism and ambient light.',
    heroImage: '/images/project-bedroom-1.jpg',
    visionText: 'Designed as a tranquil sanctuary away from the hustle of Chennai city, utilizing soft textures, acoustic timber slatted panels, and warm ambient backlighting.',
    visionImage: '/images/cat-bedroom.jpg',
    highlights: [
      'Bespoke wrap-around linen headboard with integrated nightstands',
      'Acoustic micro-ribbed wood slatted accent wall',
      'Concealed floor-to-ceiling wardrobes with touch-latch mechanisms',
      'Curated reading nook with bouclé armchair and linen pendant'
    ],
    highlightsImage: '/images/project-crescent-gallery2.jpg',
    materials: [
      { name: 'Ash Wood', type: 'Light Natural Ash', colorHex: '#D8C9B4', texture: '/images/mat-ash.jpg' },
      { name: 'Bouclé Fabric', type: 'Textured Cream Wool Bouclé', colorHex: '#ECE7DF', texture: '/images/mat-boucle.jpg' },
      { name: 'Muted Beige', type: 'Limewash Accent Wall', colorHex: '#D9CCBA' },
      { name: 'Warm Taupe', type: 'Soft Micro-Suede Headboard', colorHex: '#B6A58E' }
    ],
    gallery: [
      '/images/project-bedroom-1.jpg',
      '/images/cat-bedroom.jpg',
      '/images/project-crescent-gallery2.jpg',
      '/images/moodboard-modern-earthy.jpg'
    ]
  },
  {
    id: 'the-horizon-office',
    title: 'The Horizon Office',
    category: 'Workspaces',
    year: '2023',
    location: 'Chennai',
    size: '2,600 sq.ft.',
    subtitle: 'An executive creative workspace designed for focus and collaboration.',
    heroImage: '/images/project-office-1.jpg',
    visionText: 'Ark Spaces designed this workplace to discard generic corporate cubicles in favor of warm, biophilic, residential-inspired collaborative spaces.',
    visionImage: '/images/cat-workspace.jpg',
    highlights: [
      'Slender black fluted glass and bronze executive meeting pods',
      'Custom solid American walnut workstations with wire management',
      'Integrated biophilic greenery planters along common circulation aisles',
      'Acoustic ceiling felt panels with architectural linear luminaires'
    ],
    highlightsImage: '/images/project-office-1.jpg',
    materials: [
      { name: 'Walnut Wood', type: 'American Black Walnut', colorHex: '#5C4033', texture: '/images/mat-walnut.jpg' },
      { name: 'Matte Black Steel', type: 'Powder-Coated Partition Frames', colorHex: '#1E1E1C', texture: '/images/mat-steel.jpg' },
      { name: 'Charcoal Linen', type: 'Acoustic Sound Baffle Fabric', colorHex: '#3D3D3A' },
      { name: 'Travertine', type: 'Reception Desk Facing', colorHex: '#DDD5C7', texture: '/images/mat-travertine.jpg' }
    ],
    gallery: [
      '/images/project-office-1.jpg',
      '/images/cat-workspace.jpg',
      '/images/about-philosophy.jpg',
      '/images/journal-5.jpg'
    ]
  },
  {
    id: 'villa-sunrise',
    title: 'Villa Sunrise',
    category: 'Residential',
    year: '2023',
    location: 'Chennai',
    size: '4,800 sq.ft.',
    subtitle: 'An expansive coastal villa celebrating organic stone and daylight.',
    heroImage: '/images/project-villa-1.jpg',
    visionText: 'Framing breathtaking sky and garden views through 12-foot floor-to-ceiling glass, Villa Sunrise weaves monolithic stone volumes with warm teak joinery.',
    visionImage: '/images/about-hero.jpg',
    highlights: [
      'Double-height open living pavilion with floating staircase',
      'Custom book-matched travertine stone fireplace surround',
      'Handcrafted teak wood louvered screen panels',
      'Indoor-outdoor transitioning courtyard with sunken reflection pool'
    ],
    highlightsImage: '/images/project-crescent-gallery4.jpg',
    materials: [
      { name: 'Teak Wood', type: 'Burmese Golden Teak', colorHex: '#9E6B38', texture: '/images/mat-teak.jpg' },
      { name: 'Sandstone', type: 'Textured Honed Sandstone', colorHex: '#CFC2A9', texture: '/images/mat-sandstone.jpg' },
      { name: 'Dark Olive', type: 'Earth Architectural Wash', colorHex: '#24291D' },
      { name: 'Travertine', type: 'Porous Roman Travertine', colorHex: '#E5DFD4', texture: '/images/mat-travertine.jpg' }
    ],
    gallery: [
      '/images/project-villa-1.jpg',
      '/images/about-hero.jpg',
      '/images/project-crescent-gallery4.jpg',
      '/images/cta-warm.jpg'
    ]
  },
  {
    id: 'urban-nest',
    title: 'Urban Nest',
    category: 'Residential',
    year: '2022',
    location: 'Chennai',
    size: '1,950 sq.ft.',
    subtitle: 'A contemporary apartment refined with intelligent spatial flow.',
    heroImage: '/images/project-urban-1.jpg',
    visionText: 'Addressing urban apartment proportions with bespoke multifunctional cabinetry, soft curvaceous furnishings, and luminous natural ivory tones.',
    visionImage: '/images/cat-residential.jpg',
    highlights: [
      'Bespoke curved partition unit separating foyer from living room',
      'Concealed dry bar with pocketing doors and backlit bronze mirror',
      'Warm microcement feature wall with embedded ambient wash lighting',
      'Custom low-profile platform seating with built-in linen bolsters'
    ],
    highlightsImage: '/images/project-crescent-highlights.jpg',
    materials: [
      { name: 'Oak Wood', type: 'Nordic Light Oak', colorHex: '#D6BA91', texture: '/images/mat-oak.jpg' },
      { name: 'Warm Ivory', type: 'Velvet Matte Wall Finish', colorHex: '#F5F2EB' },
      { name: 'Brushed Brass', type: 'Linear Cabinet Hardware', colorHex: '#C5A967', texture: '/images/mat-brass.jpg' },
      { name: 'Soft Stone', type: 'Microcement Hearth', colorHex: '#E5E1DA' }
    ],
    gallery: [
      '/images/project-urban-1.jpg',
      '/images/cat-residential.jpg',
      '/images/hero-home.jpg',
      '/images/about-story.jpg'
    ]
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'residential-design',
    title: 'Residential Design',
    tagline: 'Homes that reflect your lifestyle and personality.',
    description: 'We curate bespoke residential environments that balance refined aesthetics with everyday practicality. From private villas to urban penthouses, our comprehensive design process creates cohesive, soothing sanctuaries.',
    image: '/images/cat-residential.jpg',
    features: [
      'Comprehensive spatial planning and ergonomic layout optimization',
      'Curated architectural finishes, lighting designs, and custom joinery',
      'Bespoke furniture sourcing and handcrafted luxury upholstery',
      'Full 3D visualization and photometric lighting simulations'
    ],
    timeline: '8–14 Weeks (Concept to Detailed Design)',
    deliverables: [
      '2D Detailed Floor Plans & Elevations',
      'Photorealistic 3D Renders for all primary zones',
      'Complete Material & Finish Specification Schedules',
      'Comprehensive Electrical, Plumbing & HVAC Coordination'
    ]
  },
  {
    id: 'modular-kitchens',
    title: 'Modular Kitchens',
    tagline: 'Smart, functional and beautiful kitchens.',
    description: 'The kitchen is the emotional heart of any home. We engineer modular kitchen systems tailored specifically to your cooking rituals, featuring ergonomic storage accessories, high-durability surfaces, and timeless architectural aesthetics.',
    image: '/images/cat-kitchen.jpg',
    features: [
      'German and Austrian precision hardware mechanisms (Blum, Hettich)',
      'Anti-scratch, heat-resistant quartz, ceramic and granite counter surfaces',
      'Ergonomic zone-based layouts (Prep, Cooking, Cleaning, Consumables)',
      'Seamless concealed storage for appliances, spices, and cutlery'
    ],
    timeline: '4–6 Weeks (Design, Fabrication & Assembly)',
    deliverables: [
      'Detailed Cabinetry & Carcass CAD drawings',
      'Appliance Cutout & Utility Coordinate Plans',
      'Hardware specification & weight rating schedule',
      'Factory-finished modular unit installation & warranty'
    ]
  },
  {
    id: 'bedrooms',
    title: 'Bedrooms',
    tagline: 'Restful spaces for better living.',
    description: 'Our bedroom designs prioritize sensory tranquility. We layer ambient cove lighting, acoustic wood finishes, custom storage wardrobes, and tactile textiles to create a private haven for restorative rest.',
    image: '/images/cat-bedroom.jpg',
    features: [
      'Acoustic wall paneling and personalized custom headboards',
      'Walk-in wardrobes with sensor lighting and humidity-controlled storage',
      'Circadian-friendly layered lighting design',
      'Curated natural linen bedding and organic upholstery accents'
    ],
    timeline: '4–8 Weeks',
    deliverables: [
      'Custom headboard & wardrobe shop drawings',
      'Lighting switch & dimmer schedule',
      'Soft furnishings and textile moodboard',
      'Complete turnkey fit-out'
    ]
  },
  {
    id: 'workspaces',
    title: 'Workspaces',
    tagline: 'Inspiring environments for greater productivity.',
    description: 'From executive home studies to boutique commercial corporate studios, we create high-performance workspaces that inspire creativity, encourage teamwork, and elevate client impressions.',
    image: '/images/cat-workspace.jpg',
    features: [
      'Ergonomic desk systems with discrete wire and power management',
      'Acoustically isolated video conferencing and focus rooms',
      'Biophilic living plant walls and natural daylight optimization',
      'Branded hospitality zones, coffee bars, and breakout lounges'
    ],
    timeline: '6–12 Weeks',
    deliverables: [
      'Spatial zoning & circulation density mapping',
      'Acoustic reverberation design specifications',
      'Custom executive joinery and desk design',
      'Commercial grade safety, MEP & IT integration'
    ]
  },
  {
    id: 'renovation-and-turnkey',
    title: 'Renovation & Turnkey',
    tagline: 'From planning to final handover, we handle it all.',
    description: 'Transform outdated spaces into modern luxury homes without the stress of coordinating contractors. Ark Spaces provides end-to-end turnkey project management, managing civil restructuring, materials procurement, and precision finishing with our 120-point quality checks.',
    image: '/images/service-renovation.jpg',
    features: [
      'Single-point accountability from architectural demolition to final handover',
      'Dedicated on-site project engineer and weekly photographic progress reports',
      'Transparent milestone billing with no hidden costs',
      '120+ rigorous quality checks and our on-time delivery guarantee'
    ],
    timeline: '10–20 Weeks (Based on scope)',
    deliverables: [
      'Structural feasibility analysis & demolition plans',
      'Full civil engineering, tiling, masonry & waterproofing',
      'MEP (Mechanical, Electrical, Plumbing) rewiring',
      'Final professional detailing, deep cleaning & handover'
    ]
  },
  {
    id: 'bare-shell-interiors',
    title: 'Bare Shell Interiors',
    tagline: 'Transform empty spaces into stunning homes from scratch.',
    description: 'Received a bare-shell builder flat or empty villa structure? Ark Spaces develops complete interior architectural solutions starting directly from raw concrete, ensuring you get exactly the customized home you desire.',
    image: '/images/service-bare-shell.jpg',
    features: [
      'Complete custom room demarcation and layout planning',
      'Full electrical, plumbing, HVAC and automation trunking infrastructure',
      'False ceiling architecture with integrated cove and architectural lighting',
      'Bespoke millwork, marble flooring installation, and luxury paint finishing'
    ],
    timeline: '12–24 Weeks',
    deliverables: [
      'Architectural space planning & wall layout drawings',
      'Infrastructure engineering plans',
      'Full material supply and installation',
      'Key handover with comprehensive warranty dossier'
    ]
  }
];

export const MATERIALS: MaterialItem[] = [
  // Wood
  {
    id: 'oak-wood',
    name: 'White Oak',
    category: 'Wood',
    description: 'Pale golden European White Oak with straight grain and subtle silver ray flecks. Highly versatile and durable.',
    finish: 'Matte Polyurethane / Raw Danish Oil',
    image: '/images/mat-oak.jpg',
    characteristics: ['Hardwearing', 'Subtle linear grain', 'Neutral undertone']
  },
  {
    id: 'walnut-wood',
    name: 'American Walnut',
    category: 'Wood',
    description: 'Deep, luxurious chocolate-brown timber with expressive flowing grain patterns and warm auburn highlights.',
    finish: 'Low-sheen Natural Wax / Satin Lacquer',
    image: '/images/mat-walnut.jpg',
    characteristics: ['Rich warmth', 'High visual depth', 'Statement character']
  },
  {
    id: 'teak-wood',
    name: 'Burmese Teak',
    category: 'Wood',
    description: 'Prized tropical golden teak rich in natural oils, offering unmatched weather resistance and silky smooth tactile warmth.',
    finish: 'Natural Oil / Hand-buffed Beeswax',
    image: '/images/mat-teak.jpg',
    characteristics: ['Naturally water-resistant', 'Warm golden hue', 'Generational longevity']
  },
  {
    id: 'ash-wood',
    name: 'Natural Ash',
    category: 'Wood',
    description: 'Clean Scandinavian aesthetic with high elasticity and pronounced grain arches in creamy white to light beige.',
    finish: 'White-wash Oil / Clear Matte Protective Coat',
    image: '/images/mat-ash.jpg',
    characteristics: ['Luminous pale tone', 'High tensile strength', 'Contemporary minimalist']
  },

  // Stone
  {
    id: 'travertine-stone',
    name: 'Navona Travertine',
    category: 'Stone',
    description: 'Classic Italian limestone featuring delicate organic voids, soft cream hues, and understated architectural elegance.',
    finish: 'Honed / Unfilled or Resin-filled Honed',
    image: '/images/mat-travertine.jpg',
    characteristics: ['Warm tactile porosity', 'Earthy calmness', 'Ancient yet contemporary']
  },
  {
    id: 'calacatta-marble',
    name: 'Calacatta Oro Marble',
    category: 'Stone',
    description: 'Luminous milky-white Italian marble distinguished by dramatic grey ribbons and delicate gold-amber veining.',
    finish: 'Bookmatched Honed / Soft Velvet Silk',
    image: '/images/mat-marble.jpg',
    characteristics: ['Sculptural drama', 'High prestige', 'Reflective luminosity']
  },
  {
    id: 'black-granite',
    name: 'Nero Leathered Granite',
    category: 'Stone',
    description: 'Intense deep charcoal-black granite with a sensual leathered micro-textured touch that resists fingerprints.',
    finish: 'Leathered / Brushed Antique',
    image: '/images/mat-granite.jpg',
    characteristics: ['Extreme scratch resistance', 'Textured non-reflective surface', 'Sophisticated contrast']
  },
  {
    id: 'sandstone',
    name: 'Buff Sandstone',
    category: 'Stone',
    description: 'Natural sedimentary stone reminiscent of desert dunes, providing soft grain and natural thermal insulation.',
    finish: 'Fine-sawn / Honed',
    image: '/images/mat-sandstone.jpg',
    characteristics: ['Warm neutral palette', 'Fine sandy texture', 'Natural acoustic dampening']
  },

  // Fabrics
  {
    id: 'belgian-linen',
    name: 'Belgian Woven Linen',
    category: 'Fabrics',
    description: 'Heavyweight organic linen spun from European flax with effortless drape, breathable texture, and slubbed depth.',
    finish: 'Stonewashed / Enzyme Softened',
    image: '/images/mat-linen.jpg',
    characteristics: ['100% Biodegradable', 'Naturally hypo-allergenic', 'Softens beautifully with age']
  },
  {
    id: 'cream-boucle',
    name: 'Cream Wool Bouclé',
    category: 'Fabrics',
    description: 'Plush looped wool blend fabric creating cloud-like tactile warmth and organic curved silhouettes.',
    finish: 'Treated Stain-Resistant Weave',
    image: '/images/mat-boucle.jpg',
    characteristics: ['Ultra-plush comfort', 'Visual acoustic softness', 'Mid-century architectural heritage']
  },

  // Metals
  {
    id: 'brushed-brass',
    name: 'Brushed Brass',
    category: 'Metals',
    description: 'Warm gold metallic alloy with delicate directional hairline brushing that reflects ambient light softly.',
    finish: 'PVD Coated Anti-Tarnish / Living Antique',
    image: '/images/mat-brass.jpg',
    characteristics: ['Warm ambient glow', 'Corrosion-proof PVD', 'Jewel-like detailing']
  },
  {
    id: 'matte-black-steel',
    name: 'Matte Black Steel',
    category: 'Metals',
    description: 'Precision architectural metalwork in ultra-matte fine powder coating, defining sharp graphic outlines.',
    finish: 'Electrostatic Fine Sand Texture',
    image: '/images/mat-steel.jpg',
    characteristics: ['Graphic architectural clarity', 'Zero glare', 'Ultra-durable']
  },

  // Colours
  {
    id: 'color-warm-ivory',
    name: 'Warm Ivory',
    category: 'Colours',
    description: 'The foundational architectural base: a nuanced off-white infused with warm buttermilk undertones.',
    finish: 'Dead-Flat Velvet Emulsion',
    colorHex: '#F5F2EB',
    characteristics: ['Expands spatial perception', 'Softens harsh natural light', 'Timeless backdrop']
  },
  {
    id: 'color-dark-olive',
    name: 'Dark Olive',
    category: 'Colours',
    description: 'Deep forest botanical green that roots rooms in organic composure, ideal for libraries and dining alcoves.',
    finish: 'Matte Mineral Eggshell',
    colorHex: '#24291D',
    characteristics: ['Biophilic grounding', 'Dramatic depth', 'Complements brass and walnut']
  },
  {
    id: 'color-warm-taupe',
    name: 'Warm Taupe',
    category: 'Colours',
    description: 'An earthy blend of grey and beige evoking weathered stone and raw unbleached wool.',
    finish: 'Chalky Mineral Limewash',
    colorHex: '#B6A58E',
    characteristics: ['Neutral warmth', 'Pairs with natural oak', 'Subtle elegance']
  },
  {
    id: 'color-deep-charcoal',
    name: 'Deep Charcoal',
    category: 'Colours',
    description: 'An architectural near-black with brown undertones that adds weight, poise and modern drama.',
    finish: 'Satin Architectural Lacquer',
    colorHex: '#171713',
    characteristics: ['High contrast framing', 'Masculine poise', 'Refined definition']
  }
];

export const MOODBOARDS: MaterialMoodboard[] = [
  {
    id: 'warm-minimal',
    name: 'Warm Minimal',
    tagline: 'Natural White Oak + Vein-cut Travertine + Belgian Linen',
    image: '/images/moodboard-warm-minimal.jpg',
    materials: ['White Oak', 'Navona Travertine', 'Belgian Woven Linen', 'Warm Ivory'],
    description: 'An effortless, sun-drenched aesthetic celebrating organic simplicity, generous daylight, and serene tactile calm.'
  },
  {
    id: 'modern-earthy',
    name: 'Modern Earthy',
    tagline: 'American Walnut + Dark Olive + Brushed Brass + Sandstone',
    image: '/images/moodboard-modern-earthy.jpg',
    materials: ['American Walnut', 'Dark Olive', 'Brushed Brass', 'Buff Sandstone'],
    description: 'Deep grounding tones inspired by forest canopies and raw minerals, creating intimate, cocooning living spaces.'
  },
  {
    id: 'elegant-classic',
    name: 'Elegant Classic',
    tagline: 'Calacatta Marble + Matte Black Steel + Cream Bouclé + Taupe',
    image: '/images/moodboard-elegant-classic.jpg',
    materials: ['Calacatta Oro Marble', 'Matte Black Steel', 'Cream Wool Bouclé', 'Warm Taupe'],
    description: 'A striking architectural interplay of crisp monochrome contrasts softened by plush looped textiles and refined stonework.'
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'interior-design-trends-2025',
    title: 'Top 5 Interior Design Trends for 2025',
    category: 'Design Trends',
    date: 'May 15, 2025',
    readTime: '5 min read',
    excerpt: 'From tactile limewash surfaces to biophilic courtyards and warm minimalist lighting, explore the movements shaping luxury living this year.',
    image: '/images/journal-1.jpg',
    content: [
      'The era of sterile all-white interiors is decisively behind us. In 2025, residential design has embraced organic warmth, tactile micro-textures, and architecture that fosters deep emotional wellness.',
      '1. Tactile Earth Materials: Homeowners are seeking visceral connections to nature. Travertine stone, unlacquered brass that patinas with touch, and rough-hewn oak are replacing slick synthetic laminates.',
      '2. Sculptural Ambient Lighting: Rather than relying solely on harsh ceiling downlights, spaces are illuminated through layered perimeter cove washes, fluted sconces, and sculptural floor luminaires operating at warm 2700K temperatures.',
      '3. Integrated Biophilic Courtyards: In cities like Chennai, internal light wells with tropical vegetation and micro-reflection ponds offer restorative microclimates inside dense urban residences.'
    ]
  },
  {
    id: 'how-to-make-small-spaces-feel-bigger',
    title: 'How to Make Small Spaces Feel Bigger',
    category: 'Tips',
    date: 'Apr 10, 2025',
    readTime: '4 min read',
    excerpt: 'Intelligent spatial strategies, pocket doors, vertical continuity, and reflective planes to double the perceived volume of compact homes.',
    image: '/images/journal-2.jpg',
    content: [
      'Square footage is only one dimension of how a home feels. Through thoughtful architectural manipulation of sightlines, ceiling planes, and continuous materiality, even modest apartments can evoke expansive luxury.',
      'Key Strategy: Unbroken Flooring Planes. Carrying the same large-format stone or timber planks across the living, dining, and corridor spaces avoids visual fragmentation.',
      'Concealed Joinery: Push-to-open floor-to-ceiling cabinet fronts painted to match the adjoining wall disappear into the background, providing immense storage without bulky visual clutter.',
      'Low-Profile Furniture: Choosing furnishings with raised slender legs allows light to travel beneath, keeping floor planes feeling open and breezy.'
    ]
  },
  {
    id: 'the-role-of-lighting-in-interior-design',
    title: 'The Role of Lighting in Interior Design',
    category: 'Tips',
    date: 'Apr 02, 2025',
    readTime: '6 min read',
    excerpt: 'Understanding the triumvirate of ambient, task, and accent lighting to transform mood, emphasize textures, and enhance daily well-being.',
    image: '/images/journal-3.jpg',
    content: [
      'Architecture is the masterly play of masses brought together in light. Lighting is not an afterthought added once walls are painted; it is an elemental building material.',
      'Layer 1: Ambient Foundation. Concealed linear LED coves in ceiling recesses create soft, glare-free indirect bounces that define room volumes.',
      'Layer 2: Task Illumination. Targeted high-CRI (Color Rendering Index >90) directional illumination above kitchen countertops, reading chairs, and vanity mirrors ensures functional precision.',
      'Layer 3: Accent Grazing. Highlighting natural stone veins or textured limewash plaster with narrow beam graze angles dramatizes shadow and tactile richness after twilight.'
    ]
  },
  {
    id: 'sustainable-materials-in-modern-interiors',
    title: 'Sustainable Materials in Modern Interiors',
    category: 'Lifestyle',
    date: 'Mar 25, 2025',
    readTime: '5 min read',
    excerpt: 'How ethical timber harvesting, non-toxic plant pigments, and low-embodied carbon stone elevate both indoor air quality and architectural longevity.',
    image: '/images/journal-4.jpg',
    content: [
      'True luxury today is inseparable from sustainability and health. At Ark Spaces, we curate materials that age gracefully over decades while releasing zero volatile organic compounds (VOCs).',
      'Naturally Sourced Lime Plasters: Unlike vinyl wallpapers or petroleum-based wall paints, mineral limewash breathes with humidity changes and resists microbial growth naturally.',
      'FSC-Certified Regional Timbers: Responsibly harvested teak and ash support local artisanal millworkers while ensuring carbon remains permanently sequestered in residential joinery.',
      'Organic Linens and Wool: Untreated natural fibers ensure healthy indoor air quality while imparting soft, imperfect warmth that synthetic polyesters simply cannot replicate.'
    ]
  },
  {
    id: 'office-design-for-better-productivity',
    title: 'Office Design for Better Productivity',
    category: 'Design Trends',
    date: 'Mar 01, 2025',
    readTime: '4 min read',
    excerpt: 'Creating restorative executive workspaces that balance deep solitary focus, acoustic comfort, and collaborative team synergy.',
    image: '/images/journal-5.jpg',
    content: [
      'The modern executive office is no longer a monument to corporate formality; it is a calibrated ecosystem for high-level creative problem solving.',
      'Acoustic Zoning: Incorporating micro-perforated wood wall baffles and sound-absorbing textiles dampens intrusive reverberation during video conferences and focused analytical sessions.',
      'Biophilic Integration: Studies show visible indoor foliage reduces cortisol levels by up to 15% and increases cognitive stamina during demanding working schedules.',
      'Human-Centric Lighting: Tunable white illumination that follows the natural progression of daylight—crisp 4000K in morning hours transitioning to gentle 2700K in late afternoon—harmonizes circadian rhythms.'
    ]
  },
  {
    id: 'a-look-inside-our-latest-project',
    title: 'A Look Inside Our Latest Project',
    category: 'Projects',
    date: 'Feb 20, 2025',
    readTime: '7 min read',
    excerpt: 'A behind-the-scenes walkthrough of The Crescent House in Chennai, revealing the design challenges, custom joinery, and bespoke material palettes.',
    image: '/images/journal-6.jpg',
    content: [
      'When our clients first approached Ark Spaces, their brief was clear: create a contemporary sanctuary in Chennai that felt effortlessly calm, deeply grounded in natural materials, and durable enough for family living.',
      'The Spatial Challenge: The original floor plan suffered from compartmentalized rooms that starved the core of natural light. Our structural team opened up the central spine to form a continuous double-height living-dining pavilion.',
      'The Material Selection: We balanced the warmth of natural European white oak with honed Italian Navona travertine and tactile Belgian linen draperies. Black powder-coated metal window reveals frame the tropical gardens like living paintings.',
      'The Outcome: A timeless family home that breathes with the coastal breezes, bathed in golden daylight by day and warm architectural amber glows by night.'
    ]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Initial Consultation',
    subtitle: 'Understanding your vision, lifestyle and space.',
    description: 'We initiate the process with a comprehensive initial consultation, exploring your unique vision, lifestyle preferences, and specific functional requirements. This thorough exploration forms the foundation for crafting a personalized architectural approach tailored to exceed your expectations.',
    details: [
      'In-depth lifestyle and ergonomic requirement discovery',
      'Architectural site survey, spatial audit & photographic documentation',
      'Preliminary scope, timeline horizons, and budget alignment'
    ],
    duration: '1–2 Weeks',
    deliverables: [
      'Site Measurement & Spatial Audit',
      'Design Brief & Requirement Matrix',
      'Preliminary Budget Scoping'
    ],
    image: '/images/process-sketch.jpg'
  },
  {
    step: '02',
    title: 'Design Proposal',
    subtitle: 'Bringing ideas into photorealistic reality.',
    description: 'Our experienced design team meticulously crafts a detailed design proposal. We present innovative layout concepts, photorealistic 3D visualizations, and curated material combinations aligned seamlessly with your preferences and architectural context.',
    details: [
      'Comprehensive 2D spatial layouts with optimal circulation paths',
      'Photorealistic 3D renders with photometric daylight simulations',
      'Curated physical material palette and finish samples'
    ],
    duration: '3–4 Weeks',
    deliverables: [
      'Photorealistic 3D Zone Renders',
      '2D Detailed Floor Plans & Elevations',
      'Material Palette & Sample Moodboards'
    ],
    image: '/images/hero-home.jpg'
  },
  {
    step: '03',
    title: 'Review & Feedback',
    subtitle: 'Collaborative refinement and technical sign-off.',
    description: 'We invite your valuable feedback on the design proposal, fostering an open dialogue to ensure that every intricate detail aligns precisely with your expectations. We conduct feasibility checks, finalize specifications, and lock in exact costs before on-site work begins.',
    details: [
      'Interactive review sessions with revision iterations',
      'Structural feasibility and MEP service coordination checks',
      'Fixed-price milestone quotation with no hidden extras'
    ],
    duration: '1–2 Weeks',
    deliverables: [
      'Material Specification Schedules',
      'Joinery & Carpentry Shop Drawings',
      'Final Budget & Fixed Milestone Schedule'
    ],
    image: '/images/moodboard-warm-minimal.jpg'
  },
  {
    step: '04',
    title: 'Execution & Implementation',
    subtitle: 'Precision craftsmanship with 120+ quality checks.',
    description: 'Conduct a thorough feasibility check to confirm that the proposed design and materials are practical and on budget, then commence on-site execution. Our dedicated site engineers, master carpenters, and MEP technicians work meticulously to achieve flawless results.',
    details: [
      'Dedicated on-site project engineer managing daily operations',
      'Weekly photographic milestone reports delivered to your portal',
      '120+ rigorous quality inspections across civil, joinery, and electrical'
    ],
    duration: '6–12 Weeks',
    deliverables: [
      'Dedicated Site Engineer Supervision',
      'Weekly Milestone Progress Reports',
      '120+ Rigorous Quality Inspections'
    ],
    image: '/images/cat-residential.jpg'
  },
  {
    step: '05',
    title: 'Final Reveal & Walkthrough',
    subtitle: 'Unveiling your completed dream space.',
    description: 'The culmination of our efforts—we unveil the completed project with a comprehensive walkthrough, ensuring your complete satisfaction, addressing any final adjustments, and handing over all warranties, certifications, and maintenance guides.',
    details: [
      'Comprehensive room-by-room walkthrough and white-glove inspection',
      'Professional post-construction deep clean and air purification',
      'Handover of manufacturer warranties and ARK Spaces care dossier'
    ],
    duration: 'Handover Day',
    deliverables: [
      'Comprehensive Quality Walkthrough',
      'Warranty Dossier & Care Manual',
      'Post-Handover Support Guarantee'
    ],
    image: '/images/project-crescent-1.jpg'
  }
];

