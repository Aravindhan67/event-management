import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Heart,
  Camera,
  Baby,
  Cake,
  Sparkles,
  Utensils,
  Music,
  CheckCircle2,
  ShieldCheck,
  Star,
  Quote,
  Calendar,
  PhoneCall,
  MapPin,
} from 'lucide-react';
import api from '../../services/api';
import { EventItem, Category, Testimonial } from '../../types';
import { EventCard } from '../../components/events/EventCard';
import { EventCardSkeleton } from '../../components/common/LoadingSkeleton';
import { Button } from '../../components/common/Button';

export const HomePage: React.FC = () => {
  const [packages, setPackages] = useState<EventItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePortfolioTab, setActivePortfolioTab] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, catsRes, testRes] = await Promise.all([
          api.get('/events?limit=6&sort=upcoming'),
          api.get('/categories'),
          api.get('/testimonials'),
        ]);

        if (eventsRes.data.success) setPackages(eventsRes.data.data);
        if (catsRes.data.success) setCategories(catsRes.data.data);
        if (testRes.data.success) setTestimonials(testRes.data.data);
      } catch (err) {
        console.error('Failed fetching home page data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const portfolioItems = [
    {
      title: 'Traditional Temple Mandap Wedding at Nagercoil',
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      client: 'Priya & Karthik (Nagercoil)',
    },
    {
      title: 'Candid Coastal Sunset Couple Shoot at Kanyakumari',
      category: 'photography',
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80',
      client: 'Alisha & David (Kanyakumari)',
    },
    {
      title: 'Dreamy Pastel Ring Cradle & Seemantham Setup at Tirunelveli',
      category: 'baby_shower',
      image: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=800&q=80',
      client: 'Ananya & Vignesh (Tirunelveli)',
    },
    {
      title: 'Fairytale 1st Birthday Safari Theme with LED Marquee "1"',
      category: 'birthday',
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80',
      client: 'Baby Aarav (Nagercoil)',
    },
    {
      title: 'Grand Royal Reception & Crystal Chandelier Stage at Trivandrum',
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
      client: 'Vikas & Sneha (Trivandrum)',
    },
    {
      title: 'Heritage Madurai Jasmine Seemantham & Floral Jhula',
      category: 'baby_shower',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      client: 'Samyuktha & Arvind (Madurai)',
    },
  ];

  const filteredPortfolio =
    activePortfolioTab === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activePortfolioTab);

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-primary/5 via-brand-background to-brand-background pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
                <span>Since 2004 • Premier Wedding & Event Decors</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-primary font-heading leading-tight tracking-tight">
                Memorable Celebrations,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-accent">
                  Crafted to Perfection.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-brand-mutedGray max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Luxury wedding mandaps, candid photography, and celebration styling across Nagercoil and South India.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
                <Link to="/events">
                  <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Explore Services
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" leftIcon={<PhoneCall className="w-4 h-4 text-brand-secondary" />}>
                    Get a Quote
                  </Button>
                </Link>
              </div>

              {/* Verified Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-brand-mutedGray font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-accent" />
                  20+ Years Experience
                </span>
                <span className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-500" />
                  500+ Weddings
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-accent" />
                  100% Custom Decor
                </span>
              </div>
            </div>

            {/* Hero Image / Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-modal border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
                  alt="Utsav Events Mandap & Wedding Decors"
                  className="w-full h-[460px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <span className="px-2.5 py-1 text-xs font-semibold rounded bg-brand-accent">
                      Since 2004
                    </span>
                    <h3 className="text-xl font-bold font-heading text-white">
                      Utsav Events & Photography Studio
                    </h3>
                    <p className="text-xs text-gray-200">
                      Nagercoil • Kanyakumari • Tirunelveli • Madurai • Trivandrum
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-surface rounded-2xl border border-brand-border p-8 shadow-subtle grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-brand-border">
          <div className="text-center pt-4 md:pt-0">
            <h4 className="text-3xl sm:text-4xl font-extrabold text-brand-primary font-heading">20+</h4>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-mutedGray mt-1">
              Years of Excellence (Since 2004)
            </p>
          </div>
          <div className="text-center pt-4 md:pt-0">
            <h4 className="text-3xl sm:text-4xl font-extrabold text-brand-secondary font-heading">
              500+
            </h4>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-mutedGray mt-1">
              Weddings & Receptions
            </p>
          </div>
          <div className="text-center pt-4 md:pt-0">
            <h4 className="text-3xl sm:text-4xl font-extrabold text-brand-accent font-heading">300+</h4>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-mutedGray mt-1">
              Baby Showers & Birthdays
            </p>
          </div>
          <div className="text-center pt-4 md:pt-0">
            <h4 className="text-3xl sm:text-4xl font-extrabold text-brand-primary font-heading">100%</h4>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-mutedGray mt-1">
              On-Time Punctual Execution
            </p>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES WE OFFER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
            What Utsav Events Delivers
          </span>
          <h2 className="text-3xl font-extrabold text-brand-primary font-heading">
            Trendy & Traditional Celebration Production
          </h2>
          <p className="text-sm text-brand-mutedGray">
            From royal mandaps in Nagercoil to beachside ceremonies in Kanyakumari, our in-house teams handle every celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border shadow-subtle hover:shadow-card-hover transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
              <Heart className="w-6 h-6 text-brand-primary" />
            </div>
            <h3 className="text-lg font-bold text-brand-primary font-heading">Mandap & Wedding Decor</h3>
            <p className="text-xs text-brand-mutedGray leading-relaxed">
              South Indian temple mandaps, floral canopies, LED stages, and wedding car decor.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border shadow-subtle hover:shadow-card-hover transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-secondary/15 text-brand-secondary flex items-center justify-center">
              <Camera className="w-6 h-6 text-brand-secondary" />
            </div>
            <h3 className="text-lg font-bold text-brand-primary font-heading">Photography & 4K Films</h3>
            <p className="text-xs text-brand-mutedGray leading-relaxed">
              Candid emotional portraits, 4K aerial drone films, and handcrafted velvet albums.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border shadow-subtle hover:shadow-card-hover transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-accent/15 text-brand-accent flex items-center justify-center">
              <Baby className="w-6 h-6 text-brand-accent" />
            </div>
            <h3 className="text-lg font-bold text-brand-primary font-heading">Baby Showers & Valakaapu</h3>
            <p className="text-xs text-brand-mutedGray leading-relaxed">
              Floral ring cradles, Madurai jasmine cascades, and mom-to-be luxury thrones.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border shadow-subtle hover:shadow-card-hover transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Cake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-primary font-heading">Birthdays & Themes</h3>
            <p className="text-xs text-brand-mutedGray leading-relaxed">
              1st birthday wonderlands, 4-ft illuminated LED marquee numbers, and custom themes.
            </p>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PACKAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
              Curated Packages
            </span>
            <h2 className="text-3xl font-extrabold text-brand-primary font-heading mt-1">
              Popular Celebration Packages
            </h2>
            <p className="text-sm text-brand-mutedGray mt-1">
              Transparent, all-inclusive packages crafted for weddings, baby showers, and photoshoots.
            </p>
          </div>
          <Link to="/events">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All Packages
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
          </div>
        ) : packages.length === 0 ? (
          <div className="p-12 text-center bg-brand-surface rounded-2xl border border-brand-border">
            <p className="text-brand-mutedGray text-sm">No packages currently available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <EventCard key={pkg._id} event={pkg} viewMode="grid" />
            ))}
          </div>
        )}
      </section>

      {/* 5. WORK PORTFOLIO GALLERY */}
      <section className="bg-brand-surface border-y border-brand-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
              Real Celebrations
            </span>
            <h2 className="text-3xl font-extrabold text-brand-primary font-heading">
              Our Work & Portfolio
            </h2>
            <p className="text-sm text-brand-mutedGray">
              A glimpse into the fairytale weddings, baby showers, and memorable photography shoots we have produced.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              <button
                onClick={() => setActivePortfolioTab('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activePortfolioTab === 'all'
                    ? 'bg-brand-primary text-white shadow-subtle'
                    : 'bg-brand-background text-brand-darkSlate hover:bg-brand-hoverBg'
                  }`}
              >
                All Projects
              </button>
              <button
                onClick={() => setActivePortfolioTab('wedding')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activePortfolioTab === 'wedding'
                    ? 'bg-brand-primary text-white shadow-subtle'
                    : 'bg-brand-background text-brand-darkSlate hover:bg-brand-hoverBg'
                  }`}
              >
                Weddings & Decor
              </button>
              <button
                onClick={() => setActivePortfolioTab('photography')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activePortfolioTab === 'photography'
                    ? 'bg-brand-primary text-white shadow-subtle'
                    : 'bg-brand-background text-brand-darkSlate hover:bg-brand-hoverBg'
                  }`}
              >
                Candid Photography
              </button>
              <button
                onClick={() => setActivePortfolioTab('baby_shower')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activePortfolioTab === 'baby_shower'
                    ? 'bg-brand-primary text-white shadow-subtle'
                    : 'bg-brand-background text-brand-darkSlate hover:bg-brand-hoverBg'
                  }`}
              >
                Baby Showers
              </button>
              <button
                onClick={() => setActivePortfolioTab('birthday')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activePortfolioTab === 'birthday'
                    ? 'bg-brand-primary text-white shadow-subtle'
                    : 'bg-brand-background text-brand-darkSlate hover:bg-brand-hoverBg'
                  }`}
              >
                Birthdays
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPortfolio.map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden shadow-subtle bg-gray-900 h-72 border border-brand-border"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 p-6 flex flex-col justify-end text-white">
                  <span className="text-xs uppercase font-bold tracking-wider text-amber-300 drop-shadow">
                    Client: {item.client}
                  </span>
                  <h4 className="text-base font-bold font-heading text-white drop-shadow-md leading-snug mt-1">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* Link to Full Gallery Page */}
          <div className="pt-6 text-center">
            <Link to="/gallery">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="shadow-card-hover"
              >
                View Full Past Works & Celebrations Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
            Heartfelt Stories
          </span>
          <h2 className="text-3xl font-extrabold text-brand-primary font-heading">
            Loved by Brides, Grooms & Families
          </h2>
          <p className="text-sm text-brand-mutedGray">
            Real feedback from clients who trusted us with their milestone life celebrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="bg-brand-surface rounded-2xl border border-brand-border p-8 shadow-subtle flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-brand-secondary/20" />
                <p className="text-sm text-brand-darkSlate leading-relaxed italic">
                  "{t.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-brand-border">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-brand-hoverBg">
                  {t.avatar ? (
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm font-bold text-brand-primary">
                      {t.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-primary font-heading">{t.name}</h4>
                  <p className="text-xs text-brand-mutedGray">{t.role} • {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. BOOK CONSULTATION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-primary rounded-3xl p-10 sm:p-14 text-white relative overflow-hidden shadow-card">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-semibold uppercase tracking-wider inline-block">
              Planning An Event?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white leading-tight drop-shadow-md">
              Let's Create Unforgettable Memories Together.
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Tell us your celebration date, estimated guests, and vision. We will prepare a
              personalized quote and mood board consultation within 24 hours.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link to="/contact">
                <Button variant="accent" size="lg">
                  Request Free Quote & Date Check
                </Button>
              </Link>
              <Link to="/events">
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                  Explore Packages
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
