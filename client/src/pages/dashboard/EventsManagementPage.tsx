import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Check,
  X,
  Calendar,
  MapPin,
  Clock,
  Layers,
  Sparkles,
} from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { EventItem, Category } from '../../types';
import { Header } from '../../components/dashboard/Header';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { TableRowSkeleton } from '../../components/common/LoadingSkeleton';

export const EventsManagementPage: React.FC = () => {
  const { user } = useAuth();
  const isOrganizer = user?.role === 'organizer';

  const [events, setEvents] = useState<EventItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [saving, setSaving] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('05:00 PM');
  const [locationType, setLocationType] = useState<'in_person' | 'virtual' | 'hybrid'>('in_person');
  const [venueName, setVenueName] = useState('');
  const [venueAddress, setVenueAddress] = useState('');
  const [venueCity, setVenueCity] = useState('');
  const [virtualUrl, setVirtualUrl] = useState('');
  const [totalCapacity, setTotalCapacity] = useState(200);
  const [isFeatured, setIsFeatured] = useState(false);
  const [status, setStatus] = useState<'draft' | 'published'>('published');

  // Ticket tier for new event
  const [ticketPrice, setTicketPrice] = useState(99);
  const [ticketName, setTicketName] = useState('General Admission');

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const endpoint = isOrganizer ? '/events/organizer/my-events' : '/events?status=all';
      const [eventsRes, catsRes] = await Promise.all([api.get(endpoint), api.get('/categories')]);

      if (eventsRes.data.success) setEvents(eventsRes.data.data);
      if (catsRes.data.success) setCategories(catsRes.data.data);
    } catch (err) {
      console.error('Failed fetching management events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [isOrganizer]);

  const openCreateModal = () => {
    setEditingEvent(null);
    setTitle('');
    setShortDescription('');
    setFullDescription('');
    setCategoryId(categories[0]?._id || '');
    setBannerImage('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80');
    setStartDate('2026-12-15');
    setEndDate('2026-12-16');
    setStartTime('09:00 AM');
    setEndTime('05:00 PM');
    setLocationType('in_person');
    setVenueName('Grand Hyatt Ballroom');
    setVenueAddress('109 East 42nd St');
    setVenueCity('New York');
    setVirtualUrl('');
    setTotalCapacity(250);
    setIsFeatured(false);
    setStatus('published');
    setTicketPrice(99);
    setTicketName('General Admission');
    setIsModalOpen(true);
  };

  const openEditModal = (event: EventItem) => {
    setEditingEvent(event);
    setTitle(event.title);
    setShortDescription(event.shortDescription);
    setFullDescription(event.fullDescription);
    setCategoryId(event.category?._id || (event.category as any));
    setBannerImage(event.bannerImage);
    setStartDate(event.startDate);
    setEndDate(event.endDate);
    setStartTime(event.startTime);
    setEndTime(event.endTime);
    setLocationType(event.locationType);
    setVenueName(event.venue?.name || '');
    setVenueAddress(event.venue?.address || '');
    setVenueCity(event.venue?.city || '');
    setVirtualUrl(event.virtualUrl || '');
    setTotalCapacity(event.totalCapacity);
    setIsFeatured(event.isFeatured);
    setStatus(event.status === 'published' ? 'published' : 'draft');
    setIsModalOpen(true);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload: any = {
        title,
        shortDescription,
        fullDescription,
        category: categoryId,
        bannerImage,
        startDate,
        endDate,
        startTime,
        endTime,
        locationType,
        venue: {
          name: venueName,
          address: venueAddress,
          city: venueCity,
          country: 'United States',
        },
        virtualUrl,
        totalCapacity: Number(totalCapacity),
        isFeatured,
        status,
        schedule: [
          { time: '09:00 AM', title: 'Welcome & Registration', speaker: 'Host Team' },
          { time: '10:00 AM', title: 'Keynote Session', speaker: 'Keynote Speaker' },
          { time: '01:00 PM', title: 'Networking Luncheon' },
        ],
      };

      if (editingEvent) {
        await api.put(`/events/${editingEvent._id}`, payload);
      } else {
        const createRes = await api.post('/events', payload);
        // Automatically create default ticket tier for new event
        if (createRes.data.success && createRes.data.data._id) {
          await api.post('/tickets', {
            event: createRes.data.data._id,
            name: ticketName,
            type: ticketPrice === 0 ? 'free' : 'paid',
            price: Number(ticketPrice),
            quantity: Number(totalCapacity),
            availableQuantity: Number(totalCapacity),
            description: 'Standard event access ticket',
          });
        }
      }

      setIsModalOpen(false);
      fetchEvents();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed saving event.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (event: EventItem) => {
    const nextStatus = event.status === 'published' ? 'draft' : 'published';
    try {
      await api.patch(`/events/${event._id}/status`, { status: nextStatus });
      setEvents((prev) =>
        prev.map((e) => (e._id === event._id ? { ...e, status: nextStatus } : e))
      );
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed updating status.');
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this event? This action cannot be undone.'))
      return;
    try {
      await api.delete(`/events/${id}`);
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed deleting event.');
    }
  };

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <Header
        title={isOrganizer ? 'My Events Portfolio' : 'Event Catalog Management'}
        subtitle="Create, configure, publish, and oversee event schedules and capacity quotas."
      />

      <div className="px-8 space-y-6">
        {/* Actions bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-brand-surface p-4 rounded-2xl border border-brand-border shadow-subtle">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-brand-mutedGray absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events by title..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={openCreateModal}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Create New Event
          </Button>
        </div>

        {/* Table */}
        <div className="bg-brand-surface rounded-2xl border border-brand-border overflow-hidden shadow-subtle">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-brand-border bg-brand-background/60 text-brand-mutedGray uppercase tracking-wider font-semibold">
                  <th className="p-4">Event Details</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Date & City</th>
                  <th className="p-4">Capacity & Booked</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border text-brand-darkSlate">
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => <TableRowSkeleton key={i} cols={6} />)
                ) : filteredEvents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-brand-mutedGray italic">
                      No events found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredEvents.map((evt) => (
                    <tr key={evt._id} className="hover:bg-brand-hoverBg/40 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={evt.bannerImage}
                            alt={evt.title}
                            className="w-12 h-10 rounded-lg object-cover bg-gray-100 shrink-0"
                          />
                          <div className="truncate max-w-[240px]">
                            <p className="font-bold text-brand-primary truncate">{evt.title}</p>
                            <span className="text-[11px] text-brand-mutedGray">
                              /{evt.slug}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className="px-2.5 py-0.5 text-[11px] font-semibold rounded text-white"
                          style={{ backgroundColor: evt.category?.color || '#183153' }}
                        >
                          {evt.category?.name || 'General'}
                        </span>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold">{evt.startDate}</p>
                        <p className="text-[11px] text-brand-mutedGray">
                          {evt.locationType === 'virtual' ? 'Virtual' : evt.venue?.city || 'TBA'}
                        </p>
                      </td>
                      <td className="p-4">
                        <div className="w-28 space-y-1">
                          <div className="flex justify-between text-[10px]">
                            <span>{evt.bookedSeats} booked</span>
                            <span>{evt.totalCapacity} max</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-brand-accent"
                              style={{
                                width: `${Math.min(
                                  100,
                                  Math.round((evt.bookedSeats / evt.totalCapacity) * 100)
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleStatus(evt)}
                          title="Click to toggle publish status"
                          className="focus:outline-none"
                        >
                          <Badge
                            variant={evt.status === 'published' ? 'success' : 'neutral'}
                            size="sm"
                          >
                            {evt.status === 'published' ? 'Published' : 'Draft'}
                          </Badge>
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`/events/${evt.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 text-brand-mutedGray hover:text-brand-primary hover:bg-brand-hoverBg rounded-lg"
                            title="Preview Public Page"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => openEditModal(evt)}
                            className="p-1.5 text-brand-mutedGray hover:text-brand-secondary hover:bg-brand-hoverBg rounded-lg"
                            title="Edit Event"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(evt._id)}
                            className="p-1.5 text-brand-mutedGray hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                            title="Delete Event"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
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

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingEvent ? 'Modify Event Details' : 'Create New Event'}
          maxWidth="2xl"
        >
          <form onSubmit={handleSaveEvent} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                Event Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Global Artificial Intelligence Summit 2026"
                className="w-full px-3.5 py-2 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                  Category *
                </label>
                <select
                  required
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary"
                >
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                  Location Type *
                </label>
                <select
                  value={locationType}
                  onChange={(e) => setLocationType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary"
                >
                  <option value="in_person">In-Person</option>
                  <option value="virtual">Virtual</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                Banner Image URL *
              </label>
              <input
                type="url"
                required
                value={bannerImage}
                onChange={(e) => setBannerImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2 rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                Short Summary (Card Preview) *
              </label>
              <input
                type="text"
                required
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="A high-impact gathering of 1,000+ technology leaders..."
                className="w-full px-3.5 py-2 rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                Full Description (Detailed Agenda & Value Proposition) *
              </label>
              <textarea
                required
                rows={4}
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                placeholder="Provide a comprehensive narrative about this event..."
                className="w-full p-3 rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                  Start Date *
                </label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-brand-border text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                  End Date *
                </label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-brand-border text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                  Start Time *
                </label>
                <input
                  type="text"
                  required
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  placeholder="09:00 AM"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-brand-border text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                  End Time *
                </label>
                <input
                  type="text"
                  required
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  placeholder="05:00 PM"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-brand-border text-xs"
                />
              </div>
            </div>

            {locationType !== 'virtual' ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-brand-background rounded-xl border border-brand-border">
                <div>
                  <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                    Venue Name
                  </label>
                  <input
                    type="text"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    placeholder="Grand Hyatt Ballroom"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-brand-border text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={venueAddress}
                    onChange={(e) => setVenueAddress(e.target.value)}
                    placeholder="109 East 42nd St"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-brand-border text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={venueCity}
                    onChange={(e) => setVenueCity(e.target.value)}
                    placeholder="New York"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-brand-border text-xs"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                  Virtual Live Stream URL
                </label>
                <input
                  type="url"
                  value={virtualUrl}
                  onChange={(e) => setVirtualUrl(e.target.value)}
                  placeholder="https://live.eventpro.com/summit"
                  className="w-full px-3 py-2 rounded-xl border border-brand-border text-xs"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                  Total Capacity Limit *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={totalCapacity}
                  onChange={(e) => setTotalCapacity(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-brand-border text-xs"
                />
              </div>

              {!editingEvent && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                      Ticket Tier Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={ticketName}
                      onChange={(e) => setTicketName(e.target.value)}
                      placeholder="General Admission"
                      className="w-full px-3 py-2 rounded-xl border border-brand-border text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                      Ticket Price ($) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={ticketPrice}
                      onChange={(e) => setTicketPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-brand-border text-xs"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-brand-darkSlate">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded text-brand-primary"
                />
                <span>Show as Featured Event on Home Page</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-brand-darkSlate">
                <input
                  type="checkbox"
                  checked={status === 'published'}
                  onChange={(e) => setStatus(e.target.checked ? 'published' : 'draft')}
                  className="rounded text-brand-primary"
                />
                <span>Publish Immediately</span>
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-brand-border">
              <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" isLoading={saving}>
                {editingEvent ? 'Save Changes' : 'Create Event'}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
