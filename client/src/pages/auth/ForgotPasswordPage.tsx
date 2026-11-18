import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../../services/api';
import { Button } from '../../components/common/Button';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [resetToken, setResetToken] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await api.post('/auth/forgot-password', { email });
      if (res.data.success) {
        setSuccessMsg(res.data.message);
        if (res.data.resetToken) {
          setResetToken(res.data.resetToken);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Error processing request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-brand-surface rounded-2xl border border-brand-border p-8 shadow-card space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-brand-primary font-heading">
            Reset Password
          </h2>
          <p className="text-xs text-brand-mutedGray">
            Enter your account email to receive instructions for recovering your access.
          </p>
        </div>

        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-2">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
            {resetToken && (
              <div className="mt-2 pt-2 border-t border-emerald-200">
                <p className="text-[11px] text-emerald-900 font-mono break-all">
                  Demo Token: <strong>{resetToken}</strong>
                </p>
                <Link
                  to={`/reset-password?token=${resetToken}`}
                  className="inline-block mt-2 font-bold underline text-emerald-700"
                >
                  Proceed to Reset Screen →
                </Link>
              </div>
            )}
          </div>
        )}

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
              Registered Email
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

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={loading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Send Reset Instructions
          </Button>
        </form>

        <p className="text-center text-xs text-brand-mutedGray">
          Remember your credentials?{' '}
          <Link to="/login" className="font-semibold text-brand-secondary hover:underline">
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
