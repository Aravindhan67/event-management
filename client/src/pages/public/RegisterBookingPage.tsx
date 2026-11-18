import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  CreditCard,
  Building,
  User,
  Mail,
  Phone,
  AlertCircle,
  Users,
  Check,
} from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { EventItem, Ticket } from '../../types';
import { Button } from '../../components/common/Button';

export const RegisterBookingPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [event, setEvent] = useState<EventItem | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Selected Package Tier
  const [selectedTicketId, setSelectedTicketId] = useState<string>('');

  // Event specifics
  const [eventType, setEventType] = useState('Wedding');
  const [eventDate, setEventDate] = useState('2026-12-25');
  const [venueName, setVenueName] = useState('');
  const [venueCity, setVenueCity] = useState('');
  const [guestCount, setGuestCount] = useState(150);

  // Add-on services
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Candid Photography & Cinematography',
    'Stage & Floral Decor',
    'Day-of Event Director',
  ]);

  // Client Info
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'free'>('card');

  // Confirmation State
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  const availableServices = [
    { name: 'Candid Photography & Cinematography', price: 650 },
    { name: 'Aerial Drone Shoot & Cinematic Teaser', price: 400 },
    { name: 'Stage & Floral Decor', price: 800 },
    { name: 'Pastel Cradle & Balloon Styling', price: 450 },
    { name: 'DJ, Sound & Dance Floor Lights', price: 500 },
    { name: 'Day-of Event Director', price: 350 },
    { name: 'Premium Lay-flat Photo Album', price: 250 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [eventRes, ticketsRes] = await Promise.all([
          api.get(`/events/${eventId}`),
          api.get(`/tickets/event/${eventId}`),
        ]);

        if (eventRes.data.success) {
          setEvent(eventRes.data.data);
          setEventType(eventRes.data.data.title || 'Wedding');
          if (eventRes.data.data.startDate) {
            setEventDate(eventRes.data.data.startDate);
          }
          if (eventRes.data.data.venue?.name) {
            setVenueName(eventRes.data.data.venue.name);
          }
          if (eventRes.data.data.venue?.city) {
            setVenueCity(eventRes.data.data.venue.city);
          }
        }

        if (ticketsRes.data.success && ticketsRes.data.data.length > 0) {
          setTickets(ticketsRes.data.data);
          setSelectedTicketId(ticketsRes.data.data[0]._id);
        }
      } catch (err: any) {
        setErrorMsg('Failed loading package information.');
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchData();
  }, [eventId]);

  const toggleService = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName) ? prev.filter((s) => s !== serviceName) : [...prev, serviceName]
    );
  };

  const selectedTicket = tickets.find((t) => t._id === selectedTicketId) || tickets[0];
  const basePrice = selectedTicket ? selectedTicket.price : 1200;
  const totalPrice = basePrice;
  const advanceDeposit = Math.round(totalPrice * 0.3); // 30% advance booking deposit

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!user) {
      navigate('/login?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post('/bookings', {
        eventId,
        tickets: selectedTicket ? [{ ticketId: selectedTicket._id, quantity: 1 }] : [],
        attendeeInfo: {
          fullName,
          email,
          phone,
          company: 'Personal Celebration',
        },
        eventType,
        eventDate,
        venueName: venueName || 'Client Venue',
        venueCity: venueCity || 'Main City',
        guestCount: Number(guestCount),
        selectedServices,
        totalAmount: totalPrice,
        advancePaid: advanceDeposit,
        paymentMethod,
        notes,
      });

      if (res.data.success) {
        setConfirmedBooking(res.data.data);
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Booking submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-sm text-brand-mutedGray">Initializing booking reservation...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-brand-primary font-heading">Package Not Found</h2>
        <Link to="/events">
          <Button variant="primary">Return to Packages</Button>
        </Link>
      </div>
    );
  }

  // Booking Confirmation View
  if (confirmedBooking) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-brand-surface rounded-2xl border border-brand-border p-8 shadow-card text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
              Celebration Booked & Date Locked
            </span>
            <h2 className="text-2xl font-extrabold text-brand-primary font-heading">
              Congratulations, {confirmedBooking.attendeeInfo.fullName}!
            </h2>
            <p className="text-sm text-brand-mutedGray">
              Your celebration booking for <strong className="text-brand-darkSlate">{event.title}</strong> has been registered.
            </p>
          </div>

          <div className="bg-brand-background p-6 rounded-xl border border-brand-border text-left space-y-3">
            <div className="flex justify-between items-center border-b border-brand-border pb-3">
              <span className="text-xs text-brand-mutedGray">Booking Reference</span>
              <span className="font-mono font-bold text-brand-primary text-base">
                {confirmedBooking.bookingReference}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-brand-mutedGray">Event Date</span>
              <span className="font-semibold text-brand-darkSlate">{confirmedBooking.eventDate || event.startDate}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-brand-mutedGray">Venue</span>
              <span className="font-semibold text-brand-darkSlate">{confirmedBooking.venueName || 'On-Site Location'}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-brand-mutedGray">Assigned Event Coordinator</span>
              <span className="font-semibold text-brand-accent">Alexander Wright (+1 555-019-2834)</span>
            </div>
            <div className="flex justify-between items-center text-sm font-bold pt-2 border-t border-brand-border">
              <span>Advance Deposit Paid</span>
              <span className="text-emerald-700">${confirmedBooking.advancePaid} (30% of ${confirmedBooking.totalAmount})</span>
            </div>
          </div>

          {confirmedBooking.qrCodeUrl && (
            <div className="flex flex-col items-center gap-1.5">
              <img
                src={confirmedBooking.qrCodeUrl}
                alt="Confirmation QR Code"
                className="w-36 h-36 p-2 bg-white rounded-xl border border-brand-border shadow-sm"
              />
              <span className="text-[11px] text-brand-mutedGray">Digital Verification QR</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link to="/my-bookings" className="flex-1">
              <Button variant="primary" className="w-full">
                Track My Event Status
              </Button>
            </Link>
            <Link to="/events" className="flex-1">
              <Button variant="outline" className="w-full">
                Explore More Packages
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <Link to={`/events/${event.slug}`} className="text-xs font-semibold text-brand-secondary hover:underline">
          ← Back to Package Overview
        </Link>
        <h1 className="text-3xl font-extrabold text-brand-primary font-heading mt-2">
          Book Event & Secure Your Date
        </h1>
        <p className="text-sm text-brand-mutedGray">
          Customize your package options, enter celebration details, and lock your team of photographers & planners.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Package Tier Selection */}
            {tickets.length > 0 && (
              <div className="bg-brand-surface rounded-2xl border border-brand-border p-6 shadow-subtle space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-primary text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-lg font-bold text-brand-primary font-heading">
                    Select Package Tier
                  </h3>
                </div>

                <div className="space-y-3">
                  {tickets.map((t) => (
                    <label
                      key={t._id}
                      className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedTicketId === t._id
                          ? 'border-brand-primary bg-brand-hoverBg/50 shadow-sm'
                          : 'border-brand-border hover:bg-brand-hoverBg/30'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="ticketTier"
                          checked={selectedTicketId === t._id}
                          onChange={() => setSelectedTicketId(t._id)}
                          className="mt-1 text-brand-primary focus:ring-brand-primary"
                        />
                        <div className="space-y-1">
                          <p className="font-bold text-sm text-brand-primary">{t.name}</p>
                          <p className="text-xs text-brand-mutedGray">{t.description}</p>
                          {t.perks && (
                            <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-brand-darkSlate">
                              {t.perks.map((p, i) => (
                                <span key={i} className="inline-flex items-center gap-1">
                                  <Check className="w-3 h-3 text-brand-accent" />
                                  {p}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="text-base font-extrabold text-brand-primary shrink-0">
                        ${t.price}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Event Logistics */}
            <div className="bg-brand-surface rounded-2xl border border-brand-border p-6 shadow-subtle space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-primary text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="text-lg font-bold text-brand-primary font-heading">
                  Event & Venue Details
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                    Event Celebration Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                    Estimated Guest Count *
                  </label>
                  <input
                    type="number"
                    min="10"
                    required
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                    Venue / Hall Name
                  </label>
                  <input
                    type="text"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    placeholder="e.g. Grand Palace Banquet or Home"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                    City / Location
                  </label>
                  <input
                    type="text"
                    value={venueCity}
                    onChange={(e) => setVenueCity(e.target.value)}
                    placeholder="e.g. New York, NJ"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Required Services */}
            <div className="bg-brand-surface rounded-2xl border border-brand-border p-6 shadow-subtle space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-primary text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="text-lg font-bold text-brand-primary font-heading">
                  Included Services & Add-ons
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableServices.map((srv, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer text-xs transition-colors ${
                      selectedServices.includes(srv.name)
                        ? 'border-brand-primary bg-brand-hoverBg/40 font-semibold'
                        : 'border-brand-border hover:bg-brand-hoverBg/20 text-brand-mutedGray'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(srv.name)}
                      onChange={() => toggleService(srv.name)}
                      className="rounded text-brand-primary"
                    />
                    <span>{srv.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 4: Client Contact */}
            <div className="bg-brand-surface rounded-2xl border border-brand-border p-6 shadow-subtle space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-primary text-white text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <h3 className="text-lg font-bold text-brand-primary font-heading">
                  Client Contact Information
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                  Special Theme Wishes / Vision
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share details on your favorite colors, mandap theme, or specific song for the bridal entry..."
                  className="w-full p-3 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-brand-surface rounded-2xl border border-brand-border p-6 shadow-card space-y-6">
              <h3 className="text-lg font-bold text-brand-primary font-heading border-b border-brand-border pb-3">
                Celebration Summary
              </h3>

              <div className="flex gap-3">
                <img
                  src={event.bannerImage}
                  alt={event.title}
                  className="w-20 h-16 rounded-lg object-cover"
                />
                <div className="truncate">
                  <h4 className="font-bold text-sm text-brand-primary truncate">{event.title}</h4>
                  <p className="text-xs text-brand-mutedGray mt-0.5">{eventDate}</p>
                  <p className="text-xs text-brand-mutedGray">{guestCount} Guests Estimated</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-brand-border text-xs text-brand-darkSlate">
                <div className="flex justify-between">
                  <span>Selected Package:</span>
                  <span className="font-bold">{selectedTicket?.name || 'Standard Package'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Package Base Price:</span>
                  <span className="font-semibold">${basePrice}</span>
                </div>
                <div className="flex justify-between text-brand-mutedGray">
                  <span>Services Included:</span>
                  <span>{selectedServices.length} items</span>
                </div>
              </div>

              <div className="border-t border-brand-border pt-4 space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-brand-mutedGray">Total Package Value</span>
                  <span className="text-2xl font-extrabold text-brand-primary font-heading">
                    ${totalPrice}
                  </span>
                </div>
                <div className="flex justify-between items-baseline p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div>
                    <span className="text-xs font-bold text-emerald-900 block">Advance Deposit Due (30%)</span>
                    <span className="text-[10px] text-emerald-700">Balance payable post-event</span>
                  </div>
                  <span className="text-lg font-extrabold text-emerald-800 font-heading">
                    ${advanceDeposit}
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={submitting}
              >
                Confirm Booking & Lock Date (${advanceDeposit})
              </Button>

              <div className="space-y-1.5 pt-2 text-[11px] text-brand-mutedGray text-center">
                <p className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Official contract and invoice dispatched to email</span>
                </p>
                <p>Free reschedule permitted up to 14 days prior to event date.</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
