import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../../services/api';
import { EventItem, Category } from '../../types';
import { EventCard } from '../../components/events/EventCard';
import { EventCardSkeleton } from '../../components/common/LoadingSkeleton';
import { EmptyState } from '../../components/common/EmptyState';
import { Button } from '../../components/common/Button';
import {
  Sparkles,
  Heart,
  Camera,
  Baby,
  Cake,
  Layers,
  MapPin,
  Calendar,
  Search,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Clock,
  ShieldCheck,
  Award,
  RotateCcw,
  LayoutGrid,
  List,
  ChevronDown,
  ChevronUp,
  Star,
  HelpCircle,
  Users,
  Compass,
} from 'lucide-react';

// Default celebration packages to guarantee the page is always rich and never empty
const DEFAULT_SERVICES: EventItem[] = [
  {
    _id: 'pkg-wedding-1',
    title: 'Royal Destination Wedding & Complete Management',
    slug: 'royal-destination-wedding-management',
    shortDescription:
      'Comprehensive end-to-end wedding execution: grand stage decor, hospitality coordination, ritual styling, and dedicated day-of event managers.',
    fullDescription:
      'Our signature Royal Wedding Package takes away all the stress so you and your families can celebrate every moment. Includes complete venue transformation, custom mandap & floral stage setup, bridal entry concept, sound & lighting setup, guest logistics concierge, and on-site event managers ensuring seamless execution from Mehendi to Reception.',
    category: {
      _id: 'cat-weddings',
      name: 'Weddings & Receptions',
      slug: 'weddings',
      description: 'Complete wedding planning and day coordination',
      icon: 'Heart',
      color: '#183153',
      eventCount: 3,
    },
    organizer: {
      id: 'org-1',
      name: 'R. Senthil Kumar',
      email: 'senthil@utsavevents.in',
      role: 'organizer',
      organization: 'Utsav Events Lead Director',
    },
    bannerImage:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    ],
    startDate: '2026-12-01',
    endDate: '2026-12-31',
    startTime: 'Full Day',
    endTime: 'Late Night',
    locationType: 'in_person',
    venue: {
      name: 'The Grand Heritage Palace & Mandap',
      address: 'Main Town Center',
      city: 'Nagercoil & Kanyakumari',
      state: 'Tamil Nadu',
      country: 'India',
    },
    status: 'published',
    isFeatured: true,
    tags: ['Royal Mandap', 'Guest Hospitality', 'Bridal Entry', 'Sangeet DJ'],
    totalCapacity: 50,
    bookedSeats: 12,
    tickets: [
      {
        _id: 't-1',
        event: 'pkg-wedding-1',
        name: 'Classic Wedding Management',
        type: 'paid',
        price: 125000,
        quantity: 20,
        availableQuantity: 15,
        maxPerOrder: 1,
        description: 'Stage decor, ritual coordination, sound setup, and day-of event coordinator.',
        perks: ['Floral Stage Decor', 'Sound & Mic System', 'Vendor Coordination', 'Day-of Planner'],
      },
      {
        _id: 't-2',
        event: 'pkg-wedding-1',
        name: 'Royal Destination Package',
        type: 'paid',
        price: 275000,
        quantity: 15,
        availableQuantity: 10,
        maxPerOrder: 1,
        description: 'Complete 2-day wedding planning, luxury floral mandap, grand bride/groom entries, and full guest hospitality team.',
        perks: ['Custom Mandap Architecture', 'Grand Bridal Entry Concepts', 'Guest Concierge', 'Lead Director + 4 Floor Coordinators'],
      },
    ],
  },
  {
    _id: 'pkg-photo-1',
    title: 'Candid Wedding Photography & 4K Cinematic Films',
    slug: 'candid-wedding-photography-cinematic-films',
    shortDescription:
      'Capturing timeless emotional moments with 2 Candid Photographers, 2 Traditional Cinematographers, Drone Aerial coverage, and Luxury Velvet Album.',
    fullDescription:
      'Our award-winning photography crew specializes in emotional storytelling, candid expressions, and magazine-quality portraits. We deliver a 3-minute 4K cinematic highlights teaser, full ceremony documentary film, 500+ hand-color-graded high-resolution photos, and an Italian lay-flat leather photobook.',
    category: {
      _id: 'cat-photo',
      name: 'Wedding Photography & Cinema',
      slug: 'photography',
      description: 'Candid wedding films and aerial cinematography',
      icon: 'Camera',
      color: '#4F78A8',
      eventCount: 4,
    },
    organizer: {
      id: 'org-2',
      name: 'Arun Karthik',
      email: 'arun@utsavevents.in',
      role: 'organizer',
      organization: 'Lead Cinematographer',
    },
    bannerImage:
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
    ],
    startDate: '2026-12-05',
    endDate: '2026-12-31',
    startTime: '08:00 AM',
    endTime: '11:00 PM',
    locationType: 'in_person',
    venue: {
      name: 'Client Selected Wedding Hall & Venue',
      address: 'On-Location Studio & Venue',
      city: 'Nagercoil & Kanyakumari',
      state: 'Tamil Nadu',
      country: 'India',
    },
    status: 'published',
    isFeatured: true,
    tags: ['4K Cinema', 'Drone Pilot', 'Candid Photographers', 'Italian Velvet Album'],
    totalCapacity: 30,
    bookedSeats: 8,
    tickets: [
      {
        _id: 't-3',
        event: 'pkg-photo-1',
        name: 'Essential Photography',
        type: 'paid',
        price: 45000,
        quantity: 20,
        availableQuantity: 16,
        maxPerOrder: 1,
        description: '1 Candid Photographer + 1 Traditional Photographer for full ceremony.',
        perks: ['300 Edited Photos', 'All Raw Images in Drive', 'Digital Gallery Link'],
      },
      {
        _id: 't-4',
        event: 'pkg-photo-1',
        name: 'Cinematic Premium Film + Drone',
        type: 'paid',
        price: 95000,
        quantity: 15,
        availableQuantity: 11,
        maxPerOrder: 1,
        description: '2 Candid + 2 Traditional + 1 Drone pilot, 3-minute teaser & full wedding movie with 40-page leather album.',
        perks: ['Aerial 4K Drone Footage', 'Cinematic Highlights Video', 'Italian Leather Photobook', 'Pre-Wedding Teaser'],
      },
    ],
  },
  {
    _id: 'pkg-baby-1',
    title: 'Dreamy Pastel Baby Shower & Cradle Ceremony Decor',
    slug: 'dreamy-pastel-baby-shower-cradle-decor',
    shortDescription:
      'Transform your baby shower into a fairytale wonderland: organic pastel balloon arches, floral cradle styling, mom-to-be throne, and customized photo backdrop.',
    fullDescription:
      'Celebrate the arrival of your little miracle with our bespoke Baby Shower & Cradle Ceremony styling. We create dreamy settings featuring cloud & teddy balloon installations, fresh flower cradle wraps, mom-to-be royal chair, personalized name signage, party favors table, and photo props.',
    category: {
      _id: 'cat-baby',
      name: 'Baby Showers & Cradle Ceremonies',
      slug: 'baby-showers',
      description: 'Pastel themes, cradle decorations, and Seemantham rituals',
      icon: 'Baby',
      color: '#4A9B91',
      eventCount: 2,
    },
    organizer: {
      id: 'org-3',
      name: 'Priya Senthil',
      email: 'priya@utsavevents.in',
      role: 'organizer',
      organization: 'Head of Baby Showers & Birthdays',
    },
    bannerImage:
      'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    ],
    startDate: '2026-12-10',
    endDate: '2027-01-31',
    startTime: '02:00 PM',
    endTime: '07:00 PM',
    locationType: 'in_person',
    venue: {
      name: 'Home / Banquet Hall / Garden Lawn',
      address: 'On-Site Setup in Nagercoil & Surrounds',
      city: 'Nagercoil / Tirunelveli',
      state: 'Tamil Nadu',
      country: 'India',
    },
    status: 'published',
    isFeatured: true,
    tags: ['Floral Cradle', 'Pastel Balloons', 'Mom-to-Be Throne', 'Seemantham Jhula'],
    totalCapacity: 40,
    bookedSeats: 14,
    tickets: [
      {
        _id: 't-5',
        event: 'pkg-baby-1',
        name: 'Delight Baby Shower Package',
        type: 'paid',
        price: 28000,
        quantity: 25,
        availableQuantity: 20,
        maxPerOrder: 1,
        description: 'Balloon ring backdrop, mom-to-be sash, cake table styling, and photography coverage.',
        perks: ['Balloon Arch & Props', 'Mom-to-Be Special Chair', '2 Hours Photography Coverage'],
      },
      {
        _id: 't-6',
        event: 'pkg-baby-1',
        name: 'Grand Cradle & Fairy Shower Package',
        type: 'paid',
        price: 55000,
        quantity: 15,
        availableQuantity: 12,
        maxPerOrder: 1,
        description: 'Fresh flower cradle wrap, organic pastel balloon styling, personalized welcome board, baby welcome setup, and album.',
        perks: ['Fresh Flower Cradle Decoration', 'Personalized Acrylic Signage', 'Complete Photography & Video Reel'],
      },
    ],
  },
  {
    _id: 'pkg-birthday-1',
    title: 'Milestone Birthday Extravaganza & Theme Styling',
    slug: 'milestone-birthday-extravaganza-theme-styling',
    shortDescription:
      'From 1st birthday fairytale themes to grand 50th jubilee celebrations: LED marquee numbers, luxury balloon styling, DJ music, and interactive host.',
    fullDescription:
      'Make birthday milestones truly unforgettable. Our team provides complete theme conceptualization (Jungle Safari, Boss Baby, Princess Castle, or Black & Gold Luxury Lounge), organic balloon garlands, dessert station setup, sound system, emcee entertainer, and cake table decoration.',
    category: {
      _id: 'cat-birthday',
      name: 'Birthday Parties & Celebrations',
      slug: 'birthdays',
      description: 'First birthday celebrations and themed milestone galas',
      icon: 'Cake',
      color: '#E056FD',
      eventCount: 3,
    },
    organizer: {
      id: 'org-3',
      name: 'Priya Senthil',
      email: 'priya@utsavevents.in',
      role: 'organizer',
      organization: 'Head of Baby Showers & Birthdays',
    },
    bannerImage:
      'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=80',
    gallery: [],
    startDate: '2026-12-12',
    endDate: '2027-02-28',
    startTime: '04:00 PM',
    endTime: '10:00 PM',
    locationType: 'in_person',
    venue: {
      name: 'Clubhouse / Rooftop Lounge / Lawn',
      address: 'Client Location',
      city: 'Madurai & Nagercoil',
      country: 'India',
    },
    status: 'published',
    isFeatured: true,
    tags: ['LED Marquee', 'Safari Theme', 'Emcee Host', 'Balloon Clouds'],
    totalCapacity: 60,
    bookedSeats: 19,
    tickets: [
      {
        _id: 't-7',
        event: 'pkg-birthday-1',
        name: 'Standard Theme Package',
        type: 'paid',
        price: 22000,
        quantity: 30,
        availableQuantity: 24,
        maxPerOrder: 1,
        description: 'Theme setup, backdrop decoration, and basic sound/lighting.',
        perks: ['Theme Backdrop', 'Balloon Garland', 'Sound System Setup'],
      },
      {
        _id: 't-8',
        event: 'pkg-birthday-1',
        name: 'Celebration VIP Package',
        type: 'paid',
        price: 48000,
        quantity: 20,
        availableQuantity: 16,
        maxPerOrder: 1,
        description: 'Complete celebration production with live entertainer, DJ, marquee lights, and event photography.',
        perks: ['LED Marquee Lettering', 'Professional DJ & Host', 'Event Photography & Video Reel'],
      },
    ],
  },
  {
    _id: 'pkg-mandap-1',
    title: 'Luxury Floral Mandap & Reception Stage Architecture',
    slug: 'luxury-floral-mandap-reception-stage',
    shortDescription:
      'Exquisite fresh floral mandaps, crystal chandeliers, royal velvet seating, fairy-light tunnels, and atmospheric wash lighting.',
    fullDescription:
      'Our floral architects and stage engineers turn any ballroom or outdoor lawn into a breathtaking cinematic stage. Featuring imported Dutch roses, cascading orchids, geometric acrylic pillars, ambient par cans, and dramatic stage backdrops.',
    category: {
      _id: 'cat-stage',
      name: 'Stage, Floral & Mandap Decor',
      slug: 'stage-decor',
      description: 'Temple pillars, fresh flower mandaps, and LED backdrops',
      icon: 'Sparkles',
      color: '#F39C12',
      eventCount: 3,
    },
    organizer: {
      id: 'org-1',
      name: 'R. Senthil Kumar',
      email: 'senthil@utsavevents.in',
      role: 'organizer',
      organization: 'Chief Decor Architect',
    },
    bannerImage:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    gallery: [],
    startDate: '2026-12-15',
    endDate: '2027-03-31',
    startTime: 'Setup 4 Hours Prior',
    endTime: 'Event Conclusion',
    locationType: 'in_person',
    venue: {
      name: 'Banquet Hall or Outdoor Lawn',
      address: 'Event Venue',
      city: 'Trivandrum & Kanyakumari',
      country: 'India',
    },
    status: 'published',
    isFeatured: false,
    tags: ['Temple Mandap', 'Fresh Dutch Roses', 'Crystal Chandeliers', 'Stage Wash Lighting'],
    totalCapacity: 35,
    bookedSeats: 7,
    tickets: [
      {
        _id: 't-9',
        event: 'pkg-mandap-1',
        name: 'Grand Floral Mandap Package',
        type: 'paid',
        price: 85000,
        quantity: 15,
        availableQuantity: 10,
        maxPerOrder: 1,
        description: 'Exquisite fresh floral mandap with imported orchids, par can lighting, and stage sofa setup.',
        perks: ['Fresh Floral Mandap', 'Royal Stage Sofa', 'Focus & Wash Spotlights', 'On-Site Florist Team'],
      },
    ],
  },
  {
    _id: 'pkg-prewed-1',
    title: 'Pre-Wedding & Maternity Scenic Photoshoot',
    slug: 'pre-wedding-maternity-scenic-photoshoot',
    shortDescription:
      'Romantic scenic photoshoot with professional fashion lighting, 3 costume changes, drone landscape footage, and social media reels.',
    fullDescription:
      'Capture your special chapter in iconic outdoor landscapes or curated studio setups. Includes personalized mood board guidance, professional lighting assistant, 50 retouched high-resolution images, and 2 Instagram teaser reels.',
    category: {
      _id: 'cat-prewed',
      name: 'Pre-Wedding & Maternity',
      slug: 'portrait-shoots',
      description: 'Golden hour sunset shoots and outdoor cinematic sequences',
      icon: 'Star',
      color: '#0EA5E9',
      eventCount: 2,
    },
    organizer: {
      id: 'org-2',
      name: 'Arun Karthik',
      email: 'arun@utsavevents.in',
      role: 'organizer',
      organization: 'Lead Cinematographer',
    },
    bannerImage:
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    startDate: '2026-12-08',
    endDate: '2027-03-31',
    startTime: 'Golden Hour (06:00 AM / 04:00 PM)',
    endTime: '3-4 Hours Session',
    locationType: 'in_person',
    venue: {
      name: 'Scenic Beach / Botanic Gardens / Heritage Fort',
      address: 'Outdoor Location',
      city: 'Kanyakumari Coast & Nagercoil',
      country: 'India',
    },
    status: 'published',
    isFeatured: false,
    tags: ['Golden Hour', 'Drone Cinema', '3 Costume Changes', 'Social Reels'],
    totalCapacity: 45,
    bookedSeats: 11,
    tickets: [
      {
        _id: 't-10',
        event: 'pkg-prewed-1',
        name: 'Outdoor Scenic Photoshoot',
        type: 'paid',
        price: 35000,
        quantity: 20,
        availableQuantity: 15,
        maxPerOrder: 1,
        description: 'Golden hour session at coastal Kanyakumari or heritage venues with 50 retouched photos and reels.',
        perks: ['Drone Landscape Shots', '50 Retouched High-Res Photos', '2 Instagram Reels', 'Styling Guidance'],
      },
    ],
  },
];

export const EventsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [events, setEvents] = useState<EventItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state initialized from query params
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'upcoming');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Load categories once
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await api.get('/categories');
        if (res.data.success && res.data.data.length > 0) {
          setCategories(res.data.data);
        }
      } catch (err) {
        console.error('Failed fetching categories:', err);
      }
    };
    fetchCats();
  }, []);

  // Fetch events with fallback to ensure the page is never blank
  useEffect(() => {
    let isMounted = true;
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const params: any = {
          limit: 12,
          sort,
        };

        if (search) params.search = search;
        if (category) params.category = category;
        if (location) params.location = location;

        const res = await api.get('/events', { params });
        if (isMounted) {
          if (res.data.success && res.data.data && res.data.data.length > 0) {
            setEvents(res.data.data);
          } else {
            // Apply client-side filtering over default services if search/filter applied
            let filtered = DEFAULT_SERVICES;
            if (search) {
              const q = search.toLowerCase();
              filtered = filtered.filter(
                (e) =>
                  e.title.toLowerCase().includes(q) ||
                  e.shortDescription.toLowerCase().includes(q) ||
                  e.tags?.some((t) => t.toLowerCase().includes(q))
              );
            }
            if (category) {
              filtered = filtered.filter(
                (e) =>
                  e.category?.slug === category ||
                  e.category?.name.toLowerCase().includes(category.toLowerCase())
              );
            }
            if (location) {
              const loc = location.toLowerCase();
              filtered = filtered.filter(
                (e) =>
                  e.venue?.city.toLowerCase().includes(loc) ||
                  e.venue?.name.toLowerCase().includes(loc)
              );
            }
            setEvents(filtered);
          }
        }
      } catch (err) {
        console.error('Failed fetching events from API, using default catalog:', err);
        if (isMounted) {
          setEvents(DEFAULT_SERVICES);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchEvents();
    return () => {
      isMounted = false;
    };
  }, [search, category, location, sort]);

  const handleReset = () => {
    setSearch('');
    setCategory('');
    setLocation('');
    setSort('upcoming');
    setSearchParams({});
  };

  const handleCategoryPill = (catSlug: string) => {
    if (category === catSlug) {
      setCategory('');
    } else {
      setCategory(catSlug);
    }
  };

  const quickFilterTabs = [
    { label: 'All Services', slug: '', icon: Sparkles },
    { label: 'Weddings & Mandaps', slug: 'weddings', icon: Heart },
    { label: 'Photography & Cinema', slug: 'photography', icon: Camera },
    { label: 'Baby Showers & Cradle', slug: 'baby-showers', icon: Baby },
    { label: 'Birthdays & Themes', slug: 'birthdays', icon: Cake },
    { label: 'Stage & Floral Decor', slug: 'stage-decor', icon: Layers },
    { label: 'Pre-Wedding & Maternity', slug: 'portrait-shoots', icon: Star },
  ];

  const planningSteps = [
    {
      step: '01',
      title: 'Consultation & Date Check',
      desc: 'Tell us your celebration date, expected guest count, and venue in Nagercoil, Kanyakumari, Tirunelveli, or Madurai.',
      icon: Calendar,
    },
    {
      step: '02',
      title: '3D Moodboard & Concept',
      desc: 'Our floral architects draft custom color palettes, mandap dimensions, stage lighting plans, and entry concepts.',
      icon: Compass,
    },
    {
      step: '03',
      title: 'On-Site Fabrication',
      desc: 'Our in-house fabrication, lighting, sound, and floral teams assemble everything 4 hours before guest arrival.',
      icon: Layers,
    },
    {
      step: '04',
      title: 'Flawless Execution',
      desc: 'Your dedicated lead director coordinates rituals, entry timing, catering sync, and candid photographers seamlessly.',
      icon: CheckCircle2,
    },
  ];

  const faqs = [
    {
      q: 'Can we customize package inclusions like mandap flower types and lighting?',
      a: 'Absolutely! Every single package can be customized 100%. Whether you prefer classic Madurai jasmine canopies, imported Dutch roses, or contemporary neon and cold-pyro stages, we adjust elements to your preference and budget.',
    },
    {
      q: 'Do you offer combined decor and photography packages?',
      a: 'Yes, combining decor and photography under Utsav Events provides seamless coordination and special bundle discounts. Our cinematographers work in tandem with our lighting designers so stage illumination is calibrated perfectly for 4K video.',
    },
    {
      q: 'How much advance booking notice is required for wedding dates?',
      a: 'For auspicious muhurtham wedding dates, we recommend booking 3 to 6 months in advance. For baby showers and milestone birthdays, 2 to 4 weeks advance notice is typically sufficient.',
    },
    {
      q: 'Which geographic regions do your teams travel to?',
      a: 'We operate across Tamil Nadu and Kerala, with primary hubs covering Nagercoil, Kanyakumari, Tirunelveli, Tuticorin, Madurai, and Trivandrum.',
    },
    {
      q: 'What is your payment and booking confirmation schedule?',
      a: 'We require a 25% advance to lock in your date, 50% on-site prior to final fabrication, and the remaining 25% upon flawless event handover.',
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO HEADER WITH WARM MANDAP BACKDROP & HIGH CONTRAST */}
      <section className="relative overflow-hidden bg-brand-primary text-white py-16 sm:py-24">
        {/* Background Image with Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85"
            alt="Utsav Events Celebration Services"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/95 via-brand-primary/90 to-brand-primary/85 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>All-Inclusive Celebration Packages • Since 2004</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-md">
            Our Celebration Services &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-emerald-300">
              Event Packages
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            From traditional South Indian temple mandap weddings to candid 4K cinematography,
            fairytale baby shower cradles, and milestone birthday wonderlands. Transparent inclusions and
            dedicated day-of event directors.
          </p>

          {/* Quick Trust Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-3 text-xs sm:text-sm text-gray-200 font-medium">
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              20+ Years Excellence
            </span>
            <span className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-400" />
              500+ Dream Weddings
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% In-House Production Crew
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-300" />
              Punctual 4-Hour Prior Handover
            </span>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Quick Category Filter Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {quickFilterTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = category === tab.slug;
            return (
              <button
                key={tab.label}
                onClick={() => handleCategoryPill(tab.slug)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 shadow-subtle ${
                  isSelected
                    ? 'bg-brand-primary text-white shadow-card-hover scale-[1.02]'
                    : 'bg-brand-surface text-brand-darkSlate border border-brand-border hover:bg-brand-hoverBg hover:border-brand-primary/30'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isSelected ? 'text-brand-accent' : 'text-brand-mutedGray'
                  }`}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Refined Search & Filter Toolbar */}
        <div className="bg-brand-surface rounded-2xl border border-brand-border p-5 sm:p-6 shadow-subtle space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-5 h-5 text-brand-mutedGray absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search services (e.g., Royal Mandap, Candid Photography, Cradle, Safari Birthday)..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-brand-border text-sm text-brand-darkSlate placeholder-brand-mutedGray focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
              />
            </div>

            {/* Region / Location Input */}
            <div className="md:col-span-3 relative">
              <MapPin className="w-4 h-4 text-brand-mutedGray absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City (e.g. Nagercoil, Kanyakumari, Tirunelveli)"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-brand-border text-xs sm:text-sm text-brand-darkSlate placeholder-brand-mutedGray focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
              />
            </div>

            {/* Sort & View Mode */}
            <div className="md:col-span-3 flex items-center justify-end gap-2.5">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-brand-border text-xs sm:text-sm text-brand-darkSlate bg-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-primary"
              >
                <option value="upcoming">Recommended</option>
                <option value="newest">Recently Added</option>
                <option value="popular">Most In-Demand</option>
              </select>

              <div className="flex items-center rounded-xl border border-brand-border overflow-hidden bg-brand-background p-0.5 shrink-0">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-brand-surface text-brand-primary shadow-subtle'
                      : 'text-brand-mutedGray hover:text-brand-darkSlate'
                  }`}
                  title="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-brand-surface text-brand-primary shadow-subtle'
                      : 'text-brand-mutedGray hover:text-brand-darkSlate'
                  }`}
                  title="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {(search || category || location) && (
                <button
                  onClick={handleReset}
                  className="p-2.5 rounded-xl border border-brand-border text-brand-mutedGray hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Chips Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-brand-border text-xs text-brand-mutedGray">
            <span className="font-medium text-brand-darkSlate">
              Displaying <strong className="text-brand-primary font-bold">{events.length}</strong> verified celebration service packages
            </span>

            {(search || category || location) && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold text-brand-mutedGray">Active Filters:</span>
                {category && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary font-semibold text-[11px]">
                    Category: {category}
                    <button onClick={() => setCategory('')} className="hover:text-rose-600 ml-1">×</button>
                  </span>
                )}
                {location && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-secondary/15 text-brand-secondary font-semibold text-[11px]">
                    Location: {location}
                    <button onClick={() => setLocation('')} className="hover:text-rose-600 ml-1">×</button>
                  </span>
                )}
                {search && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold text-[11px]">
                    Search: "{search}"
                    <button onClick={() => setSearch('')} className="hover:text-rose-600 ml-1">×</button>
                  </span>
                )}
                <button
                  onClick={handleReset}
                  className="text-xs text-rose-600 hover:underline font-semibold ml-1"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 3. EVENT PACKAGE LIST / GRID */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
          </div>
        ) : events.length === 0 ? (
          <div className="bg-brand-surface rounded-2xl border border-brand-border p-12 text-center space-y-4 shadow-subtle">
            <div className="w-16 h-16 rounded-full bg-brand-primary/5 text-brand-secondary flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-brand-primary font-heading">
              No service packages match your filter
            </h3>
            <p className="text-sm text-brand-mutedGray max-w-md mx-auto">
              We couldn't find any packages matching your exact criteria. Try resetting your search or browse our full celebration catalog.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button variant="primary" size="md" onClick={handleReset}>
                Show All Celebration Packages
              </Button>
              <Link to="/contact">
                <Button variant="outline" size="md" leftIcon={<PhoneCall className="w-4 h-4" />}>
                  Request Custom Quote
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'
                : 'space-y-5'
            }
          >
            {events.map((event) => (
              <EventCard key={event._id} event={event} viewMode={viewMode} />
            ))}
          </div>
        )}

        {/* 4. HOW WE PLAN YOUR EVENT (4-STEP PROCESS) */}
        <section className="pt-12 border-t border-brand-border space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
              Our Seamless Workflow
            </span>
            <h2 className="text-3xl font-extrabold text-brand-primary font-heading">
              How Utsav Events Plans Your Celebration
            </h2>
            <p className="text-sm text-brand-mutedGray">
              From our first phone conversation to the moment your guests leave in awe, here is how we ensure 100% stress-free perfection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {planningSteps.map((step) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={step.step}
                  className="relative p-6 rounded-2xl bg-brand-surface border border-brand-border shadow-subtle hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                        <StepIcon className="w-6 h-6 text-brand-primary" />
                      </div>
                      <span className="text-2xl font-black font-heading text-brand-primary/20">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-brand-primary font-heading">
                      {step.title}
                    </h3>
                    <p className="text-xs text-brand-mutedGray leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. WHY FAMILIES CHOOSE UTSAV EVENTS (GUARANTEES) */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-brand-primary/5 via-brand-surface to-brand-secondary/5 border border-brand-border space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
              The Utsav Commitment
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-primary font-heading">
              Why 500+ Families Trust Utsav Events
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-brand-border shadow-subtle space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-brand-primary text-base">In-House Inventory & Crew</h4>
              <p className="text-xs text-brand-mutedGray leading-relaxed">
                We own our audio-visual rigs, trussing, floral cold-storage, and cameras. No sub-contracting delays or hidden commissions.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-brand-border shadow-subtle space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-brand-primary text-base">4-Hour Prior Handover</h4>
              <p className="text-xs text-brand-mutedGray leading-relaxed">
                Your stage, lighting, floral mandap, and audio checks are finished 4 hours prior so you can take pre-event photos peacefully.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-brand-border shadow-subtle space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-brand-primary text-base">Transparent Fixed Pricing</h4>
              <p className="text-xs text-brand-mutedGray leading-relaxed">
                Itemized quotes for florals, crew, audio, and photobooks. Zero surprise fees on your auspicious wedding day.
              </p>
            </div>
          </div>
        </section>

        {/* 6. FREQUENTLY ASKED QUESTIONS */}
        <section className="space-y-6 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-primary font-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-brand-mutedGray">
              Everything you need to know about booking our wedding, baby shower, and photography services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3 pt-4">
            {faqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-brand-surface border border-brand-border overflow-hidden shadow-subtle transition-colors"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-brand-primary hover:text-brand-secondary transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-brand-accent shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-brand-mutedGray shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-brand-mutedGray shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-brand-mutedGray leading-relaxed border-t border-brand-border/60 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 7. CUSTOM PROPOSAL CTA BANNER */}
        <section className="rounded-3xl bg-brand-primary text-white p-8 sm:p-12 relative overflow-hidden shadow-modal">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 pointer-events-none">
            <Sparkles className="w-full h-full text-white" />
          </div>

          <div className="max-w-3xl relative z-10 space-y-5">
            <span className="inline-block px-3 py-1 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              Free Date Availability & Site Consultation
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight">
              Need a Custom Celebration Plan Tailored to Your Hall & Budget?
            </h2>

            <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
              Speak directly with our senior event architects. We offer complimentary venue inspections across Nagercoil, Kanyakumari, Tirunelveli, and Madurai with customized 3D moodboards.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/contact">
                <Button variant="accent" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Request Free Quotation
                </Button>
              </Link>
              <a
                href="tel:+919344168280"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Call +91 93441 68280</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
