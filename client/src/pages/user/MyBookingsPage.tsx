import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Camera,
  Users,
  CheckCircle,
  Clock,
  Printer,
  ChevronRight,
  Sparkles,
  PhoneCall,
  Download,
} from 'lucide-react';
import api from '../../services/api';
import { Booking } from '../../types';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { EmptyState } from '../../components/common/EmptyState';

export const MyBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBookingModal, setSelectedBookingModal] = useState<any | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get('/bookings/my');
      if (res.data.success) {
        setBookings(res.data.data);
      }
    } catch (err) {
      console.error('Failed fetching user bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const stages = [
    { label: 'Booking Confirmed', step: 1 },
    { label: 'Coordinator Assigned', step: 2 },
    { label: 'Decor & Team Ready', step: 3 },
    { label: 'Event Day', step: 4 },
    { label: 'Photos Delivered', step: 5 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
          Client Portal
        </span>
        <h1 className="text-3xl font-extrabold text-brand-primary font-heading mt-1">
          My Booked Celebrations
        </h1>
        <p className="text-sm text-brand-mutedGray">
          Track preparation progress for your upcoming weddings, baby showers, and photography deliverables.
        </p>
      </div>

      {loading ? (
        <div className="p-16 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-sm text-brand-mutedGray">Loading your celebration records...</p>
        </div>
      ) : bookings.length === 0 ? (
        <EmptyState
          title="No event bookings found"
          description="You haven't booked any weddings, baby showers, or photography packages yet. Explore our packages to lock in your date."
          actionText="Explore Event Packages"
          onAction={() => (window.location.href = '/events')}
        />
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => {
            const isCancelled = booking.status === 'cancelled';

            return (
              <div
                key={booking._id}
                className={`bg-brand-surface rounded-2xl border p-6 sm:p-8 shadow-subtle space-y-6 ${
                  isCancelled ? 'border-gray-200 opacity-70' : 'border-brand-border hover:shadow-card'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-border pb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-brand-primary px-3 py-1 bg-brand-background rounded-lg border border-brand-border">
                      {booking.bookingReference}
                    </span>
                    <Badge variant={booking.status === 'confirmed' ? 'success' : 'primary'} size="sm">
                      {booking.status.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-brand-mutedGray">
                      Booked on {new Date(booking.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-brand-mutedGray block">Package Budget</span>
                    <span className="text-xl font-extrabold text-brand-primary font-heading">
                      ${booking.totalAmount}
                    </span>
                  </div>
                </div>

                {/* Event Highlights */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-8 space-y-3">
                    <h3 className="text-xl font-bold text-brand-primary font-heading">
                      {booking.event?.title || booking.eventType || 'Celebration Event'}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-brand-mutedGray">
                      <span className="flex items-center gap-1.5 font-medium text-brand-secondary">
                        <Calendar className="w-3.5 h-3.5" />
                        Date: {booking.eventDate || booking.event?.startDate || 'Date Confirmed'}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {booking.venueName || 'Venue Designated'}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        {booking.guestCount || 100} Guests
                      </span>
                    </div>

                    {booking.selectedServices && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {booking.selectedServices.map((srv: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2.5 py-0.5 rounded-md text-[11px] bg-brand-background border border-brand-border text-brand-darkSlate"
                          >
                            ✓ {srv}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Assigned Coordinator */}
                  <div className="lg:col-span-4 bg-brand-background p-4 rounded-xl border border-brand-border space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-accent block">
                      Assigned Event Lead
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-xs">
                        AW
                      </div>
                      <div>
                        <p className="text-xs font-bold text-brand-primary">Alexander Wright</p>
                        <p className="text-[11px] text-brand-mutedGray">Senior Event Director</p>
                      </div>
                    </div>
                    <div className="pt-1 flex items-center gap-1.5 text-xs text-brand-secondary font-medium">
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>+1 (555) 019-2834</span>
                    </div>
                  </div>
                </div>

                {/* Celebration Preparation Progress Bar */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-brand-darkSlate block">
                    Preparation & Milestone Tracker
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                    {stages.map((st, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl border text-[11px] font-semibold flex flex-col items-center gap-1 ${
                          idx <= 2
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                            : 'bg-brand-background border-brand-border text-brand-mutedGray'
                        }`}
                      >
                        <CheckCircle
                          className={`w-3.5 h-3.5 ${idx <= 2 ? 'text-emerald-600' : 'text-gray-300'}`}
                        />
                        <span>{st.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2 border-t border-brand-border">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedBookingModal(booking)}
                    leftIcon={<Printer className="w-3.5 h-3.5" />}
                  >
                    View Official Invoice & Contract
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Invoice Modal */}
      {selectedBookingModal && (
        <Modal
          isOpen={!!selectedBookingModal}
          onClose={() => setSelectedBookingModal(null)}
          title="Celebration Contract & Invoice"
          maxWidth="md"
        >
          <div className="space-y-5 text-left text-xs">
            <div className="p-4 bg-brand-primary text-white rounded-xl space-y-1 text-center">
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-accent">
                OFFICIAL BOOKING CONFIRMATION
              </span>
              <h3 className="text-base font-bold font-heading">
                {selectedBookingModal.event?.title || selectedBookingModal.eventType}
              </h3>
              <p className="text-xs text-gray-300">Ref: {selectedBookingModal.bookingReference}</p>
            </div>

            <div className="bg-brand-background p-4 rounded-xl border border-brand-border space-y-2">
              <div className="flex justify-between">
                <span className="text-brand-mutedGray">Client Name:</span>
                <span className="font-bold">{selectedBookingModal.attendeeInfo.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-mutedGray">Contact Phone:</span>
                <span>{selectedBookingModal.attendeeInfo.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-mutedGray">Event Date:</span>
                <span className="font-semibold">{selectedBookingModal.eventDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-mutedGray">Venue:</span>
                <span>{selectedBookingModal.venueName}</span>
              </div>
              <div className="flex justify-between border-t border-brand-border pt-2 font-bold">
                <span>Total Package Cost:</span>
                <span>${selectedBookingModal.totalAmount}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Advance Paid:</span>
                <span>${selectedBookingModal.advancePaid || Math.round(selectedBookingModal.totalAmount * 0.3)}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="primary" className="flex-1" onClick={handlePrint}>
                Print Receipt
              </Button>
              <Button variant="outline" onClick={() => setSelectedBookingModal(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
