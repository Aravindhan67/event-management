import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Building, Mail, Phone, MapPin, Globe } from 'lucide-react';
import api from '../../services/api';
import { Header } from '../../components/dashboard/Header';
import { Button } from '../../components/common/Button';

export const SettingsPage: React.FC = () => {
  const [companyName, setCompanyName] = useState('EventPro Global');
  const [siteTitle, setSiteTitle] = useState('EventPro | Modern Event Management Platform');
  const [tagline, setTagline] = useState('Creating Unforgettable Experiences, One Event at a Time.');
  const [contactEmail, setContactEmail] = useState('contact@eventpro.com');
  const [contactPhone, setContactPhone] = useState('+1 (800) 555-EVENT');
  const [address, setAddress] = useState('742 Evergreen Terrace, Suite 500, New York, NY 10001');
  const [currency, setCurrency] = useState('USD');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data.success && res.data.data) {
          const s = res.data.data;
          setCompanyName(s.companyName || 'EventPro Global');
          setSiteTitle(s.siteTitle || '');
          setTagline(s.tagline || '');
          setContactEmail(s.contactEmail || '');
          setContactPhone(s.contactPhone || '');
          setAddress(s.address || '');
          setCurrency(s.currency || 'USD');
        }
      } catch (err) {
        console.error('Failed fetching settings:', err);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      await api.put('/settings', {
        companyName,
        siteTitle,
        tagline,
        contactEmail,
        contactPhone,
        address,
        currency,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      alert('Failed saving settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <Header
        title="Platform & Branding Settings"
        subtitle="Manage global corporate identity, contact coordinates, and default platform behavior."
      />

      <div className="px-8 max-w-4xl space-y-6">
        {saved && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Platform settings saved successfully.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="bg-brand-surface rounded-2xl border border-brand-border p-8 shadow-card space-y-6">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-brand-primary font-heading border-b border-brand-border pb-3">
              Corporate Branding
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                  Default Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="CAD">CAD ($)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                Site Headline / Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-brand-border">
            <h3 className="text-base font-bold text-brand-primary font-heading border-b border-brand-border pb-3">
              Contact Coordinates
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                Physical Office Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-brand-border">
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={saving}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save Platform Configuration
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
