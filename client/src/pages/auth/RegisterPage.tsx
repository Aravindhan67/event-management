import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Building, Phone, ArrowRight, AlertCircle, Calendar } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/common/Button';

export const RegisterPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'attendee' | 'organizer'>('attendee');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await api.post('/auth/register', {
        name,
        email,
        password,
        role,
        phone,
        organization,
      });

      if (res.data.success) {
        login(res.data.token, res.data.user);
        if (role === 'organizer') {
          navigate('/organizer');
        } else {
          navigate('/events');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-brand-surface rounded-2xl border border-brand-border p-8 shadow-card space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-white">
              <Calendar className="w-5 h-5 text-brand-accent" />
            </div>
          </Link>
          <h2 className="text-2xl font-bold text-brand-primary font-heading">
            Create an Account
          </h2>
          <p className="text-xs text-brand-mutedGray">
            Register to book tickets, manage reservations, or publish and host world-class events.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Account Role Selector */}
          <div>
            <label className="block text-xs font-semibold text-brand-darkSlate mb-1.5">
              I am registering as:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('attendee')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  role === 'attendee'
                    ? 'border-brand-primary bg-brand-primary text-white shadow-subtle'
                    : 'border-brand-border bg-brand-surface text-brand-darkSlate hover:bg-brand-hoverBg'
                }`}
              >
                Event Attendee
              </button>
              <button
                type="button"
                onClick={() => setRole('organizer')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  role === 'organizer'
                    ? 'border-brand-primary bg-brand-primary text-white shadow-subtle'
                    : 'border-brand-border bg-brand-surface text-brand-darkSlate hover:bg-brand-hoverBg'
                }`}
              >
                Event Organizer
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-brand-mutedGray absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Eleanor Vance"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-brand-mutedGray absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="eleanor@company.com"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                Password (min 6 characters) *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-brand-mutedGray absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-brand-mutedGray absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
              Company / Organization (Optional)
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-brand-mutedGray absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Apex Summits LLC"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={loading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Create My Account
          </Button>
        </form>

        <p className="text-center text-xs text-brand-mutedGray">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-brand-secondary hover:underline">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
};
