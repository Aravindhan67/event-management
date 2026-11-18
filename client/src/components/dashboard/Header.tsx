import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, LogOut, ExternalLink } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const { user, logout } = useAuth();

  return (
    <header className="h-20 bg-brand-surface border-b border-brand-border px-8 flex items-center justify-between sticky top-0 z-30 shadow-subtle">
      <div>
        <h1 className="text-xl font-bold text-brand-primary font-heading">{title}</h1>
        {subtitle && <p className="text-xs text-brand-mutedGray mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Website preview link */}
        <Link
          to="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-border text-xs font-medium text-brand-darkSlate hover:bg-brand-hoverBg transition-colors"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-brand-secondary" />
        </Link>

        {/* User Card */}
        <div className="flex items-center gap-3 pl-4 border-l border-brand-border">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-brand-primary">{user?.name}</p>
            <span className="text-[10px] uppercase font-bold text-brand-accent tracking-wider">
              {user?.role.replace('_', ' ')}
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-sm">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <button
            onClick={logout}
            className="p-2 rounded-lg text-brand-mutedGray hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
