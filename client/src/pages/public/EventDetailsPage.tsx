import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  Share2,
  ArrowRight,
  Ticket as TicketIcon,
  Globe,
  Building2,
  CheckCircle,
} from 'lucide-react';
import api from '../../services/api';
import { EventItem } from '../../types';
import { ScheduleTimeline } from '../../components/events/ScheduleTimeline';
import { EventCard } from '../../components/events/EventCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const EventDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/events/slug/${slug}`);
        if (res.data.success) {
          setEvent(res.data.data);
        }
      } catch (err) {
        console.error('Failed fetching event details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchEvent();
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-sm text-brand-mutedGray">Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-brand-primary font-heading">Event Not Found</h2>
        <p className="text-sm text-brand-mutedGray">
          The event you are looking for may have been removed or unpublished.
        </p>
        <Link to="/events">
          <Button variant="primary">Browse All Events</Button>
        </Link>
      </div>
    );
  }

  const isSoldOut = event.bookedSeats >= event.totalCapacity;
  const seatsRemaining = Math.max(0, event.totalCapacity - event.bookedSeats);
  const lowestPrice =
    event.tickets && event.tickets.length > 0
      ? Math.min(...event.tickets.map((t) => t.price))
      : null;

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO BANNER */}
      <div className="relative bg-brand-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="px-3 py-1 text-xs font-bold rounded-md shadow-sm text-white"
                style={{ backgroundColor: event.category?.color || '#183153' }}
              >
                {event.category?.name || 'Category'}
              </span>
              <span className="text-xs text-brand-secondary font-medium uppercase tracking-wider">
                {event.locationType === 'virtual'
                  ? 'Virtual Event'
                  : event.locationType === 'hybrid'
                  ? 'Hybrid Experience'
                  : 'In-Person Gathering'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading leading-tight">
              {event.title}
            </h1>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl">
              {event.shortDescription}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm text-gray-200">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-brand-accent shrink-0" />
                <div>
                  <p className="font-semibold">{event.startDate}</p>
                  <p className="text-xs text-gray-400">Through {event.endDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-brand-accent shrink-0" />
                <div>
                  <p className="font-semibold">{event.startTime} - {event.endTime}</p>
                  <p className="text-xs text-gray-400">Local Time</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-brand-accent shrink-0" />
                <div>
                  <p className="font-semibold">{event.venue?.name || 'Virtual Portal'}</p>
                  <p className="text-xs text-gray-400">
                    {event.venue?.address ? `${event.venue.address}, ${event.venue.city}` : 'Access link provided upon registration'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-brand-accent shrink-0" />
                <div>
                  <p className="font-semibold">{seatsRemaining} Seats Remaining</p>
                  <p className="text-xs text-gray-400">Capacity of {event.totalCapacity}</p>
                </div>
              </div>
            </div>

            {/* Share and Tags */}
            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Link Copied!' : 'Share Event'}</span>
              </button>
              {event.tags && event.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {event.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[11px] bg-white/5 text-gray-300 border border-white/10"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Registration Card in Hero / Sticky on Right */}
          <div className="lg:col-span-5">
            <div className="bg-brand-surface rounded-2xl border border-brand-border p-8 text-brand-darkSlate shadow-modal space-y-6">
              <div className="relative rounded-xl overflow-hidden h-48 bg-gray-100">
                <img
                  src={event.bannerImage}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                {isSoldOut && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="px-4 py-1.5 bg-rose-600 text-white font-bold text-sm uppercase tracking-wider rounded">
                      Sold Out
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-baseline justify-between border-b border-brand-border pb-4">
                <div>
                  <span className="text-xs text-brand-mutedGray block">Package Pricing Starts At</span>
                  <span className="text-2xl font-extrabold text-brand-primary font-heading">
                    {lowestPrice !== null ? `₹${lowestPrice.toLocaleString('en-IN')}` : '₹35,000'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-brand-mutedGray block">Booking Availability</span>
                  <span className="text-xs font-bold text-brand-accent">
                    Open for Dates
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => navigate(`/register/${event._id}`)}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Book This Celebration Package
                </Button>
                <p className="text-[11px] text-center text-brand-mutedGray flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Includes full planning, decor setup & photography crew</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BODY CONTENT: Overview, Schedule, Organizer, Related */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Event Description */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-brand-primary font-heading">
                About This Experience
              </h2>
              <div className="text-sm text-brand-darkSlate leading-relaxed space-y-4 whitespace-pre-line">
                {event.fullDescription}
              </div>
            </section>

            {/* Ticket Options Breakdown */}
            {event.tickets && event.tickets.length > 0 && (
              <section className="space-y-4 pt-4 border-t border-brand-border">
                <h2 className="text-2xl font-bold text-brand-primary font-heading">
                  Admission Packages & Tiers
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.tickets.map((t) => (
                    <div
                      key={t._id}
                      className="p-5 rounded-xl border border-brand-border bg-brand-surface space-y-2 shadow-subtle"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-brand-primary font-heading">{t.name}</h4>
                        <span className="font-extrabold text-brand-primary">
                          {t.price === 0 ? 'Complimentary' : `₹${t.price.toLocaleString('en-IN')}`}
                        </span>
                      </div>
                      <p className="text-xs text-brand-mutedGray">{t.description}</p>
                      {t.perks && t.perks.length > 0 && (
                        <div className="pt-2 space-y-1 text-xs text-brand-darkSlate">
                          {t.perks.map((p, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                              <span>{p}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Event Schedule */}
            <section className="space-y-6 pt-4 border-t border-brand-border">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-brand-primary font-heading">
                    Event Schedule & Program
                  </h2>
                  <p className="text-xs text-brand-mutedGray">
                    Detailed timeline of rituals, stage styling, grand entries, and photography shoots.
                  </p>
                </div>
              </div>
              <ScheduleTimeline schedule={event.schedule} />
            </section>
          </div>

          {/* Sidebar Info Column */}
          <div className="lg:col-span-4 space-y-8">
            {/* Organizer Card */}
            <div className="bg-brand-surface rounded-2xl border border-brand-border p-6 shadow-subtle space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
                Event Organizer
              </span>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-brand-primary text-white flex items-center justify-center font-bold text-base">
                  {event.organizer?.avatar ? (
                    <img
                      src={event.organizer.avatar}
                      alt={event.organizer.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    event.organizer?.name?.charAt(0) || 'O'
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-brand-primary font-heading">
                    {event.organizer?.name}
                  </h4>
                  <p className="text-xs text-brand-mutedGray">
                    {event.organizer?.organization || 'Verified Event Producer'}
                  </p>
                </div>
              </div>
              <p className="text-xs text-brand-mutedGray leading-relaxed">
                Organized with precision and compliance to EventPro international standard protocols.
              </p>
            </div>

            {/* Venue Location Details */}
            {event.venue && event.locationType !== 'virtual' && (
              <div className="bg-brand-surface rounded-2xl border border-brand-border p-6 shadow-subtle space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
                  Venue Location
                </span>
                <h4 className="font-bold text-brand-primary font-heading">{event.venue.name}</h4>
                <p className="text-xs text-brand-mutedGray leading-relaxed">
                  {event.venue.address}, {event.venue.city}, {event.venue.state} {event.venue.country}
                </p>
                {/* Map Placeholder */}
                <div className="h-36 rounded-xl bg-gray-100 border border-brand-border flex items-center justify-center text-xs text-brand-mutedGray flex-col gap-1">
                  <MapPin className="w-5 h-5 text-brand-secondary" />
                  <span>Interactive Map Location</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Events Section */}
        {event.relatedEvents && event.relatedEvents.length > 0 && (
          <div className="pt-16 border-t border-brand-border space-y-6">
            <h2 className="text-2xl font-bold text-brand-primary font-heading">
              Related Events You Might Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {event.relatedEvents.map((rel) => (
                <EventCard key={rel._id} event={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
