import React from 'react';
import { Card } from '../common/Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  subtitle?: string;
  change?: string;
  isPositive?: boolean;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  subtitle,
  change,
  isPositive = true,
}) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-mutedGray">
            {title}
          </p>
          <h3 className="text-2xl font-extrabold text-brand-primary font-heading mt-1">
            {value}
          </h3>
          {change && (
            <div className="flex items-center gap-1.5 mt-2 text-xs">
              <span className={`font-semibold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                {change}
              </span>
              <span className="text-brand-mutedGray">{subtitle || 'vs last month'}</span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 rounded-xl bg-brand-hoverBg flex items-center justify-center text-brand-primary">
          {icon}
        </div>
      </div>
    </Card>
  );
};
