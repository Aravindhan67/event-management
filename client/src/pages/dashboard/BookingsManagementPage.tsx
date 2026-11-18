import React, { useState, useEffect } from 'react';
import {
  Search,
  Download,
  Filter,
  Eye,
  XCircle,
  CheckCircle2,
  Calendar,
  Ticket as TicketIcon,
} from 'lucide-react';
import api from '../../services/api';
import { Booking } from '../../types';
import { Header } from '../../components/dashboard/Header';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { TableRowSkeleton } from '../../components/common/LoadingSkeleton';

export const BookingsManagementPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (statusFilter) params.status = statusFilter;
      if (search) params.search = search;

      const res = await api.get('/bookings/admin/all', { params });
      if (res.data.success) {
        setBookings(res.data.data);
      }
    } catch (err) {
      console.error('Failed fetching admin bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBookings();
  };

  const handleExportCSV = async () => {
    try {
      const token = localStorage.getItem('token');
      window.open(`/api/bookings/admin/export-csv?token=${token}`, '_blank');
    } catch (err) {
      console.error('Failed exporting CSV:', err);
    }
  };

  const handleCancelReservation = async (id: string) => {
    if (!window.confirm('Are you sure you want to cancel this booking and refund/release capacity?'))
      return;
    try {
      const res = await api.patch(`/bookings/${id}/cancel`, {
        reason: 'Cancelled by Administrator',
      });
      if (res.data.success) {
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: 'cancelled' } : b))
        );
        if (selectedBooking?._id === id) setSelectedBooking(null);
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed cancelling booking.');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <Header
        title="Registrations & Attendee Bookings"
        subtitle="Manage attendee reservations, verify digital tickets, and export CSV reports."
      />

      <div className="px-8 space-y-6">
        {/* Actions & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-brand-surface p-4 rounded-2xl border border-brand-border shadow-subtle">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-brand-mutedGray absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by reference, attendee name, or email..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-brand-border text-xs bg-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-primary"
            >
              <option value="">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </form>

          <Button
            variant="outline"
            size="md"
            onClick={handleExportCSV}
            leftIcon={<Download className="w-4 h-4 text-brand-secondary" />}
          >
            Export to CSV
          </Button>
        </div>

        {/* Table */}
        <div className="bg-brand-surface rounded-2xl border border-brand-border overflow-hidden shadow-subtle">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-brand-border bg-brand-background/60 text-brand-mutedGray uppercase tracking-wider font-semibold">
                  <th className="p-4">Reference</th>
                  <th className="p-4">Attendee Details</th>
                  <th className="p-4">Event</th>
                  <th className="p-4">Pass Breakdown</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border text-brand-darkSlate">
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => <TableRowSkeleton key={i} cols={7} />)
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-brand-mutedGray italic">
                      No registrations found.
                    </td>
                  </tr>
                ) : (
                  bookings.map((b) => (
                    <tr key={b._id} className="hover:bg-brand-hoverBg/40 transition-colors">
                      <td className="p-4 font-mono font-bold text-brand-primary">
                        {b.bookingReference}
                      </td>
                      <td className="p-4">
                        <p className="font-semibold">{b.attendeeInfo?.fullName || b.user?.name}</p>
                        <p className="text-[11px] text-brand-mutedGray">
                          {b.attendeeInfo?.email || b.user?.email}
                        </p>
                        {b.attendeeInfo?.company && (
                          <span className="text-[10px] text-brand-secondary font-medium block">
                            {b.attendeeInfo.company}
                          </span>
                        )}
                      </td>
                      <td className="p-4 max-w-[200px] truncate">
                        <p className="font-semibold text-brand-primary truncate">
                          {b.event?.title || 'Unknown Event'}
                        </p>
                        <p className="text-[11px] text-brand-mutedGray">{b.event?.startDate}</p>
                      </td>
                      <td className="p-4">
                        <div className="space-y-0.5">
                          {b.tickets?.map((t, idx) => (
                            <span key={idx} className="block text-[11px]">
                              {t.ticketName} × {t.quantity}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 font-bold text-brand-primary">
                        ${b.totalAmount}
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={
                            b.status === 'confirmed'
                              ? 'success'
                              : b.status === 'cancelled'
                              ? 'danger'
                              : 'warning'
                          }
                          size="sm"
                        >
                          {b.status.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedBooking(b)}
                            className="p-1.5 text-brand-mutedGray hover:text-brand-primary hover:bg-brand-hoverBg rounded-lg"
                            title="Inspect Attendee Pass"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {b.status !== 'cancelled' && (
                            <button
                              onClick={() => handleCancelReservation(b._id)}
                              className="p-1.5 text-brand-mutedGray hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                              title="Cancel Reservation"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <Modal
          isOpen={!!selectedBooking}
          onClose={() => setSelectedBooking(null)}
          title={`Booking: ${selectedBooking.bookingReference}`}
          maxWidth="md"
        >
          <div className="space-y-4">
            <div className="p-4 bg-brand-background rounded-xl border border-brand-border space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-brand-mutedGray">Event:</span>
                <span className="font-bold text-brand-primary">{selectedBooking.event?.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-mutedGray">Date & Time:</span>
                <span>
                  {selectedBooking.event?.startDate} • {selectedBooking.event?.startTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-mutedGray">Attendee:</span>
                <span className="font-bold">{selectedBooking.attendeeInfo.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-mutedGray">Email:</span>
                <span>{selectedBooking.attendeeInfo.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-mutedGray">Phone:</span>
                <span>{selectedBooking.attendeeInfo.phone || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-mutedGray">Company:</span>
                <span>{selectedBooking.attendeeInfo.company || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-t border-brand-border pt-2 font-bold">
                <span>Total Amount:</span>
                <span>${selectedBooking.totalAmount}</span>
              </div>
            </div>

            {selectedBooking.qrCodeUrl && (
              <div className="flex flex-col items-center gap-1.5">
                <img
                  src={selectedBooking.qrCodeUrl}
                  alt="QR Code"
                  className="w-32 h-32 p-2 border border-brand-border rounded-xl bg-white shadow-sm"
                />
                <span className="text-[10px] text-brand-mutedGray font-mono">
                  {selectedBooking.bookingReference}
                </span>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t border-brand-border">
              {selectedBooking.status !== 'cancelled' && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleCancelReservation(selectedBooking._id)}
                >
                  Cancel Booking
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={() => setSelectedBooking(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
