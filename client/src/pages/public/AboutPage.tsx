import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Camera,
  Baby,
  Cake,
  Sparkles,
  Award,
  Shield,
  CheckCircle,
  MapPin,
  Calendar,
  ArrowRight,
  PhoneCall,
  Clock,
  Layers,
  Users,
} from 'lucide-react';
import { Button } from '../../components/common/Button';

export const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Award,
      title: '20+ Years of Mastery',
      description:
        'Established in 2004 in Nagercoil, our team has two decades of proven experience executing grand weddings, mandaps, and family milestones.',
      color: 'bg-amber-50 text-amber-600 border-amber-200',
    },
    {
      icon: Layers,
      title: 'Trendy & Traditional Fusion',
      description:
        'We seamlessly blend rich South Indian cultural customs (Madurai jasmine, temple pillars) with modern aesthetics (LED stages, cold pyro, pastel balloon styling).',
      color: 'bg-blue-50 text-blue-600 border-blue-200',
    },
    {
      icon: Heart,
      title: '100% Bespoke Customization',
      description:
        'Every family is unique. We tailor every color palette, floral arrangement, and stage scale to match your personal vision and budget.',
      color: 'bg-rose-50 text-rose-600 border-rose-200',
    },
    {
      icon: Shield,
      title: 'Punctual & Stress-Free Execution',
      description:
        'Our in-house floral, audio-visual, and photography departments work with military punctuality so you can simply cherish every second with your family.',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
  ];

  const team = [
    {
      name: 'R. Senthil Kumar',
      role: 'Founder & Chief Decor Architect',
      experience: '20+ Years Experience',
      bio: 'Pioneered traditional South Indian temple mandap designs, Kerala floral canopies, and luxury stage architecture across Tamil Nadu & Kerala since 2004.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Priya Senthil',
      role: 'Head of Baby Showers & Birthday Styling',
      experience: '14+ Years Experience',
      bio: 'Specialist in custom pastel ring cradle decor, organic balloon cloud backdrops, Seemantham floral swings, and kids milestone theme wonderlands.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Arun Karthik',
      role: 'Lead Cinematographer & Drone Pilot',
      experience: '10+ Years Experience',
      bio: 'Award-winning candid photographer capturing raw family emotions, 4K aerial drone sequences, teaser reels, and lay-flat Italian velvet albums.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'M. Muthukumar',
      role: 'Production & Logistics Director',
      experience: '16+ Years Experience',
      bio: 'Coordinates on-site stage fabrication, cold-spark pyrotechnics, line-array sound systems, moving-head lighting, and guest welcoming hospitality.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO HEADER WITH HIGH-CONTRAST PHOTOGRAPHY & GLOW */}
      <section className="relative overflow-hidden bg-brand-primary text-white py-20 lg:py-28">
        {/* Background Image with Dark Vignette & Blur */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85"
            alt="Utsav Events Mandap & Celebrations"
            className="w-full h-full object-cover object-center"
          />
          {/* Deep dark gradient overlay ensures 100% crystal clear text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/95 via-brand-primary/90 to-brand-primary/85 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          {/* Glowing Golden Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Utsav Events & Photography Studio • Est. 2004</span>
          </div>

          {/* Hero Main Headline (explicit text-white for visibility) */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-md">
            Blending Rich South Indian Tradition with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-emerald-300">
              Modern Elegance.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            With over <strong>20+ years of creative passion</strong>, Utsav Events turns life’s most cherished
            occasions into majestic memories across Nagercoil, Kanyakumari, Tirunelveli, Madurai, and Trivandrum.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <Link to="/gallery">
              <Button variant="accent" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore Past Works Gallery
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
                leftIcon={<PhoneCall className="w-4 h-4 text-amber-400" />}
              >
                Schedule Consultation
              </Button>
            </Link>
          </div>

          {/* Floating Key Metrics Ribbon */}
          <div className="pt-8 max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
              <h4 className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-heading">20+</h4>
              <p className="text-[11px] uppercase tracking-wider text-gray-300 font-semibold mt-0.5">
                Years Since 2004
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
              <h4 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">500+</h4>
              <p className="text-[11px] uppercase tracking-wider text-gray-300 font-semibold mt-0.5">
                Weddings & Mandaps
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
              <h4 className="text-2xl sm:text-3xl font-extrabold text-emerald-300 font-heading">300+</h4>
              <p className="text-[11px] uppercase tracking-wider text-gray-300 font-semibold mt-0.5">
                Baby Showers & Birthdays
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
              <h4 className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-heading">5 Districts</h4>
              <p className="text-[11px] uppercase tracking-wider text-gray-300 font-semibold mt-0.5">
                Nagercoil to Trivandrum
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR STORY & ROOTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Layered Photography Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-modal border-4 border-white bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
                alt="Utsav Events Mandap Craftsmanship"
                className="w-full h-[440px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="px-2.5 py-1 text-[11px] font-bold rounded bg-amber-500 text-black">
                    Eraniel • Nagercoil
                  </span>
                  <h4 className="text-lg font-bold font-heading text-white">
                    Rooted in Kanyakumari District
                  </h4>
                  <p className="text-xs text-gray-200">
                    Kattadimoodu Junction, Nagercoil Road, Eraniel, Tamil Nadu
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-brand-surface rounded-2xl p-4 shadow-modal border border-brand-border flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-primary text-white flex items-center justify-center font-bold text-lg font-heading">
                20+
              </div>
              <div className="text-xs">
                <p className="font-bold text-brand-primary">Years of Trust</p>
                <p className="text-brand-mutedGray">Established in 2004</p>
              </div>
            </div>
          </div>

          {/* Right: Narrative Story & Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
                Our Story Since 2004
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary font-heading">
                From a Humble Dream in Eraniel to South India’s Premier Event Team
              </h2>
            </div>

            <p className="text-sm text-brand-darkSlate leading-relaxed">
              Utsav Events was founded in 2004 at Kattadimoodu Junction, Nagercoil Road, Eraniel in the Kanyakumari
              district. Over two decades, our devotion to authentic craftsmanship and creative styling has earned the trust
              of hundreds of families across Tamil Nadu and Kerala.
            </p>

            <p className="text-sm text-brand-mutedGray leading-relaxed">
              We specialize in creating harmony between tradition and modern style. Whether it is an elaborate Vedic
              temple mandap decorated with fresh Madurai jasmine, a grand reception backdrop illuminated with crystal
              chandeliers, a dreamy pastel ring cradle for a baby shower, or 4K drone cinematography — our in-house team
              executes every detail flawlessly.
            </p>

            {/* Feature Points */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-brand-surface border border-brand-border">
                <CheckCircle className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-brand-primary">Authentic Cultural Roots:</strong> Handcrafted floral
                  mandaps, Madurai Malli garlands, traditional brass urlis, and ritual arrangements.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-brand-surface border border-brand-border">
                <CheckCircle className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-brand-primary">Cutting-Edge Modern Visuals:</strong> High-definition LED
                  stages, intelligent moving-head beams, cold-spark pyrotechnics, and 4K aerial drone coverage.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-brand-surface border border-brand-border">
                <CheckCircle className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-brand-primary">Single Point of Accountability:</strong> No juggling 10
                  different vendors. Our in-house designers, camera crews, and coordinators handle everything.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE PRINCIPLES / WHY FAMILIES CHOOSE JEYAM EVENTS */}
      <section className="bg-brand-surface border-y border-brand-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
              The Utsav Difference
            </span>
            <h2 className="text-3xl font-extrabold text-brand-primary font-heading">
              Why Families Love Working With Us
            </h2>
            <p className="text-xs sm:text-sm text-brand-mutedGray">
              Over 20 years of dedication to perfection, punctuality, and heartfelt hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-brand-background border border-brand-border shadow-subtle hover:shadow-card-hover transition-all duration-300 space-y-3"
                >
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${val.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-brand-primary font-heading">{val.title}</h3>
                  <p className="text-xs text-brand-mutedGray leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. MEET THE TEAM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
            The Creative Minds
          </span>
          <h2 className="text-3xl font-extrabold text-brand-primary font-heading">
            Meet the Planners & Artists
          </h2>
          <p className="text-xs sm:text-sm text-brand-mutedGray">
            The passionate team managing your event from initial sketch to final applause.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="bg-brand-surface rounded-2xl border border-brand-border overflow-hidden shadow-subtle group hover:shadow-card-hover transition-all duration-300"
            >
              <div className="h-64 overflow-hidden bg-gray-100 relative">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold bg-black/70 backdrop-blur-md text-white">
                  {member.experience}
                </span>
              </div>
              <div className="p-5 space-y-2">
                <div>
                  <h3 className="font-bold text-base text-brand-primary font-heading">{member.name}</h3>
                  <p className="text-xs font-semibold text-brand-accent">{member.role}</p>
                </div>
                <p className="text-xs text-brand-mutedGray line-clamp-3 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-brand-primary to-brand-primary/95 text-white p-8 sm:p-12 shadow-modal flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left border border-white/15">
          <div className="space-y-2 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Let's Plan Your Date
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Plan Your Dream Celebration with Utsav Events
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 max-w-xl">
              Visit our design studio at Kattadimoodu Junction, Eraniel, or request an instant date availability check online.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 relative z-10 shrink-0">
            <Link to="/contact">
              <Button variant="accent" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Check Date & Free Quote
              </Button>
            </Link>
            <Link to="/gallery">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                View Past Celebrations
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
