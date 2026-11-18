import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, Calendar, AlertCircle } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/common/Button';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Retrieve redirect URL if passed in query
  const query = new URLSearchParams(location.search);
  const redirect = query.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        login(res.data.token, res.data.user);
        // Direct to appropriate dashboard if staff
        if (redirect !== '/') {
          navigate(redirect);
        } else if (res.data.user.role === 'admin' || res.data.user.role === 'super_admin') {
          navigate('/admin');
        } else if (res.data.user.role === 'organizer') {
          navigate('/organizer');
        } else {
          navigate('/');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword('password123');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-brand-surface rounded-2xl border border-brand-border p-8 shadow-card space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-white">
              <Calendar className="w-5 h-5 text-brand-accent" />
            </div>
          </Link>
          <h2 className="text-2xl font-bold text-brand-primary font-heading">
            Welcome Back
          </h2>
          <p className="text-xs text-brand-mutedGray">
            Sign in to access your registered events, passes, and organizer controls.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-brand-mutedGray absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-brand-darkSlate">Password</label>
              <Link to="/forgot-password" className="text-xs text-brand-secondary hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-brand-mutedGray absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={loading}
            rightIcon={<LogIn className="w-4 h-4" />}
          >
            Sign In to Account
          </Button>
        </form>

        {/* Demo Quick Fills */}
        <div className="pt-2 border-t border-brand-border space-y-2">
          <p className="text-[11px] font-semibold text-brand-mutedGray uppercase tracking-wider text-center">
            Demo Credentials (Quick Test)
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickFill('superadmin@eventpro.com')}
              className="p-2 rounded-lg border border-brand-border text-left hover:bg-brand-hoverBg text-brand-darkSlate transition-colors"
            >
              <p className="font-bold text-[11px] text-brand-primary">Super Admin</p>
              <p className="text-[10px] text-brand-mutedGray">Full platform control</p>
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('organizer@eventpro.com')}
              className="p-2 rounded-lg border border-brand-border text-left hover:bg-brand-hoverBg text-brand-darkSlate transition-colors"
            >
              <p className="font-bold text-[11px] text-brand-accent">Event Organizer</p>
              <p className="text-[10px] text-brand-mutedGray">Manage own events</p>
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('admin@eventpro.com')}
              className="p-2 rounded-lg border border-brand-border text-left hover:bg-brand-hoverBg text-brand-darkSlate transition-colors"
            >
              <p className="font-bold text-[11px] text-brand-secondary">Platform Admin</p>
              <p className="text-[10px] text-brand-mutedGray">Operations manager</p>
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('attendee@eventpro.com')}
              className="p-2 rounded-lg border border-brand-border text-left hover:bg-brand-hoverBg text-brand-darkSlate transition-colors"
            >
              <p className="font-bold text-[11px] text-brand-primary">Attendee</p>
              <p className="text-[10px] text-brand-mutedGray">Ticket booking</p>
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-brand-mutedGray">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-semibold text-brand-secondary hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};
