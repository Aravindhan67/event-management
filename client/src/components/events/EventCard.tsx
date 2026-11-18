import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Sparkles, ArrowRight, Check } from 'lucide-react';
import { EventItem } from '../../types';
import { Badge } from '../common/Badge';

interface EventCardProps {
  event: EventItem;
  viewMode?: 'grid' | 'list';
}

export const EventCard: React.FC<EventCardProps> = ({ event, viewMode = 'grid' }) => {
  const lowestPrice =
    event.tickets && event.tickets.length > 0
      ? Math.min(...event.tickets.map((t) => t.price))
      : 25000;

  if (viewMode === 'list') {
    return (
      <div className="bg-brand-surface rounded-xl border border-brand-border p-5 shadow-subtle hover:shadow-card-hover hover:border-brand-secondary/30 transition-all duration-300 flex flex-col md:flex-row gap-6 items-center">
        <div className="relative w-full md:w-72 h-48 rounded-xl overflow-hidden shrink-0">
          <img
            src={event.bannerImage}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-2.5 left-2.5">
            <span
              className="px-2.5 py-1 text-xs font-semibold rounded-md shadow-sm text-white"
              style={{ backgroundColor: event.category?.color || '#183153' }}
            >
              {event.category?.name || 'Celebration'}
            </span>
          </div>
          {event.isFeatured && (
            <div className="absolute top-2.5 right-2.5">
              <Badge variant="accent" size="sm" className="font-semibold shadow-sm">
                Popular Choice
              </Badge>
            </div>
          )}
        </div>

        <div className="flex-1 w-full space-y-2.5">
          <div className="flex flex-wrap items-center gap-4 text-xs text-brand-mutedGray">
            <span className="flex items-center gap-1.5 font-medium text-brand-secondary">
              <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
              Full Setup & Coordination
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {event.venue?.city || 'Nagercoil & Kanyakumari'}
            </span>
          </div>

          <h3 className="text-xl font-bold text-brand-primary font-heading line-clamp-1 hover:text-brand-secondary transition-colors">
            <Link to={`/events/${event.slug}`}>{event.title}</Link>
          </h3>

          <p className="text-sm text-brand-mutedGray line-clamp-2 leading-relaxed">
            {event.shortDescription}
          </p>

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {event.tags.slice(0, 4).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[10px] font-medium bg-brand-primary/5 text-brand-primary border border-brand-primary/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-brand-border">
            <div>
              <span className="text-xs text-brand-mutedGray block">Starting from</span>
              <span className="text-2xl font-extrabold text-brand-primary font-heading">
                ₹{lowestPrice.toLocaleString('en-IN')}
              </span>
            </div>

            <Link
              to={`/events/${event.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary text-white text-sm font-semibold hover:bg-opacity-90 shadow-subtle transition-all"
            >
              <span>View Package Inclusions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Grid Card
  return (
    <div className="group bg-brand-surface rounded-2xl border border-brand-border overflow-hidden shadow-subtle hover:shadow-card-hover hover:border-brand-secondary/30 transition-all duration-300 flex flex-col hover:-translate-y-1">
      {/* Banner */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src={event.bannerImage}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span
            className="px-2.5 py-1 text-xs font-semibold rounded-md shadow-sm text-white"
            style={{ backgroundColor: event.category?.color || '#183153' }}
          >
            {event.category?.name || 'Celebration'}
          </span>
        </div>
        {event.isFeatured && (
          <div className="absolute top-3 right-3">
            <Badge variant="accent" size="sm" className="font-semibold shadow-sm">
              Popular Choice
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs text-brand-mutedGray">
            <span className="flex items-center gap-1.5 font-medium text-brand-secondary">
              <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
              Full Setup & Coordination
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {event.venue?.city || 'Tamil Nadu & Kerala'}
            </span>
          </div>

          <h3 className="text-lg font-bold text-brand-primary font-heading line-clamp-2 group-hover:text-brand-secondary transition-colors leading-snug">
            <Link to={`/events/${event.slug}`}>{event.title}</Link>
          </h3>

          <p className="text-xs text-brand-mutedGray line-clamp-2 leading-relaxed">
            {event.shortDescription}
          </p>

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {event.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[10px] font-medium bg-brand-primary/5 text-brand-primary border border-brand-primary/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Action */}
        <div className="pt-3 border-t border-brand-border space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-brand-mutedGray">Complete Package</span>
            <div className="text-right">
              <span className="text-xs text-brand-mutedGray mr-1">Starts at</span>
              <span className="text-xl font-extrabold text-brand-primary font-heading">
                ₹{lowestPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <Link
            to={`/events/${event.slug}`}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary text-white text-sm font-semibold hover:bg-opacity-90 active:bg-opacity-95 transition-all shadow-subtle"
          >
            <span>View Details & Book</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
