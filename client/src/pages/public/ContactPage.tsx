import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from 'lucide-react';
import api from '../../services/api';
import { Button } from '../../components/common/Button';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      const res = await api.post('/inquiries', {
        name,
        email,
        phone,
        subject,
        message,
      });

      if (res.data.success) {
        setSubmitted(true);
        setName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Failed sending message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header with Visual Backdrop & High Contrast */}
      <section className="relative overflow-hidden bg-brand-primary text-white py-16 sm:py-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80"
            alt="Event Consultation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/95 via-brand-primary/90 to-brand-primary/85" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <span>Event Consultation & Date Booking</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading drop-shadow-md">
            Request a Quote & Check Date
          </h1>
          <p className="text-sm sm:text-base text-gray-200">
            Tell us about your upcoming wedding, mandap, baby shower, or birthday celebration.
            Our team will provide a customized proposal within 24 hours.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
                Connect with Utsav Events
              </span>
              <h2 className="text-2xl font-bold text-brand-primary font-heading">
                Office & Event Planning Desk
              </h2>
              <p className="text-sm text-brand-mutedGray leading-relaxed">
                Our senior event planners and decor designers are available 7 days a week to discuss your
                wedding, reception mandap, baby shower, or birthday celebration ideas.
              </p>
            </div>

            <div className="space-y-5 text-sm text-brand-darkSlate">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-brand-surface border border-brand-border">
                <MapPin className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-brand-primary">Main Office & Design Studio</h4>
                  <p className="text-xs text-brand-mutedGray mt-0.5">
                    Kattadimoodu Junction, Nagercoil Road, Eraniel, Kanyakumari District, Tamil Nadu – 629802
                  </p>
                  <p className="text-[11px] font-semibold text-brand-accent mt-1">
                    Serving: Nagercoil • Kanyakumari • Tirunelveli • Madurai • Trivandrum
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-brand-surface border border-brand-border">
                <Phone className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-brand-primary">Direct Call / WhatsApp</h4>
                  <p className="text-xs text-brand-mutedGray mt-0.5">+91 93441 68280 / +91 98945 95787</p>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Instant WhatsApp Date Check Available</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-brand-surface border border-brand-border">
                <Mail className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-brand-primary">Email Inquiries</h4>
                  <p className="text-xs text-brand-mutedGray mt-0.5">info@utsavevents.in / contact@utsavevents.in</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-mutedGray">
                Follow Utsav Events
              </h4>
              <div className="flex items-center gap-3">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center text-brand-primary hover:text-brand-accent transition-colors shadow-subtle">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center text-brand-primary hover:text-brand-accent transition-colors shadow-subtle">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center text-brand-primary hover:text-brand-accent transition-colors shadow-subtle">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center text-brand-primary hover:text-brand-accent transition-colors shadow-subtle">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Interactive Map Placeholder */}
            <div className="h-44 rounded-2xl bg-brand-hoverBg border border-brand-border flex flex-col items-center justify-center text-xs text-brand-mutedGray gap-2 shadow-subtle">
              <MapPin className="w-6 h-6 text-brand-primary" />
              <span className="font-semibold text-brand-darkSlate">Google Maps Integration Active</span>
              <span className="text-[11px]">40.7538° N, 73.9840° W</span>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-brand-surface rounded-2xl border border-brand-border p-8 shadow-card space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-brand-primary font-heading">
                  Submit an Inquiry
                </h3>
                <p className="text-xs text-brand-mutedGray">
                  Complete the form below and an event manager will review your submission promptly.
                </p>
              </div>

              {submitted && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                  <div>
                    <p className="font-semibold">Message dispatched successfully!</p>
                    <p className="text-xs text-emerald-700 mt-0.5">
                      Our coordinator has logged your inquiry and will reply via email.
                    </p>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm text-brand-darkSlate focus:outline-none focus:ring-2 focus:ring-brand-primary"
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
                      placeholder="jane@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm text-brand-darkSlate focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm text-brand-darkSlate focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Corporate Summit Partnership"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm text-brand-darkSlate focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details about your expected guest count, venue preferences, or ticketing inquiries..."
                    className="w-full p-3.5 rounded-xl border border-brand-border text-sm text-brand-darkSlate focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  isLoading={submitting}
                  rightIcon={<Send className="w-4 h-4" />}
                >
                  Transmit Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
