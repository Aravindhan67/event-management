import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarX, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-2">
        <CalendarX className="w-8 h-8 text-brand-accent" />
      </div>
      <h1 className="text-4xl font-extrabold text-brand-primary font-heading">404 - Page Not Found</h1>
      <p className="text-sm text-brand-mutedGray max-w-md">
        The destination or event page you requested does not exist or may have been archived.
      </p>
      <Link to="/" className="pt-2">
        <Button variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Return to Home
        </Button>
      </Link>
    </div>
  );
};
