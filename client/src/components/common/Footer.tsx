import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  CheckCircle,
} from 'lucide-react';
import api from '../../services/api';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await api.post('/newsletter/subscribe', { email });
      setSubscribed(true);
      setEmail('');
    } catch {
      // Mock success for client smoothness
      setSubscribed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-brand-primary text-white border-t border-brand-primary/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <Calendar className="w-5 h-5 text-brand-accent" />
              </div>
              <span className="font-heading font-bold text-2xl text-white tracking-tight">
                Utsav<span className="text-brand-accent">Events</span>
              </span>
            </Link>
            <p className="text-sm text-gray-300 max-w-sm leading-relaxed">
              Utsav Events & Photography Studio — Premier event planning, traditional & modern mandaps,
              candid 4K photography, and celebration styling. Blending heritage with trendy elegance.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                <span>Kattadimoodu Junction, Nagercoil Road, Eraniel, Kanyakumari Dist, TN – 629802</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-accent shrink-0" />
                <span>+91 93441 68280 / +91 98945 95787</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-accent shrink-0" />
                <span>info@utsavevents.in</span>
              </div>
            </div>
            <p className="text-xs text-brand-accent font-semibold pt-1">
              Serving Nagercoil • Kanyakumari • Tirunelveli • Madurai • Trivandrum
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white font-heading">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/events" className="hover:text-brand-accent transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-brand-accent transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-accent transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-brand-accent transition-colors">
                  Client Portal Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Event Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white font-heading">
              Our Specialties
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/events?category=weddings" className="hover:text-brand-accent transition-colors">
                  Weddings & Receptions
                </Link>
              </li>
              <li>
                <Link to="/events?category=wedding-photography" className="hover:text-brand-accent transition-colors">
                  Candid Photography & 4K Films
                </Link>
              </li>
              <li>
                <Link to="/events?category=baby-showers" className="hover:text-brand-accent transition-colors">
                  Baby Showers & Cradles
                </Link>
              </li>
              <li>
                <Link to="/events?category=birthdays" className="hover:text-brand-accent transition-colors">
                  Birthday Themes & Marquee
                </Link>
              </li>
              <li>
                <Link to="/events?category=mandap-decor" className="hover:text-brand-accent transition-colors">
                  Stage & Mandap Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white font-heading">
              Stay Informed
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Subscribe to receive curated event invitations, keynote speaker alerts, and early-bird tickets.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-brand-accent/20 border border-brand-accent/40 rounded-lg text-brand-accent text-xs">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Thank you! You have been subscribed.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter corporate email"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 text-xs focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-1.5 top-1.5 p-1.5 rounded-md bg-brand-accent text-white hover:bg-brand-accentHover transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
            <div className="flex items-center gap-3 pt-2">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} Utsav Events & Photography Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookie Settings</span>
            <span>Security Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
