import React from 'react';
import { Clock, User } from 'lucide-react';
import { ScheduleItem } from '../../types';

interface ScheduleTimelineProps {
  schedule?: ScheduleItem[];
}

export const ScheduleTimeline: React.FC<ScheduleTimelineProps> = ({ schedule }) => {
  if (!schedule || schedule.length === 0) {
    return (
      <p className="text-sm text-brand-mutedGray italic">
        Detailed event schedule timeline will be announced closer to the event date.
      </p>
    );
  }

  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-brand-border">
      {schedule.map((item, idx) => (
        <div key={idx} className="relative group">
          {/* Timeline node */}
          <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-brand-surface border-2 border-brand-accent group-hover:scale-125 transition-transform" />

          <div className="bg-brand-surface p-4 rounded-xl border border-brand-border shadow-subtle space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-secondary">
              <Clock className="w-3.5 h-3.5 text-brand-accent" />
              <span>{item.time}</span>
            </div>

            <h4 className="text-base font-bold text-brand-primary font-heading">{item.title}</h4>

            {item.description && (
              <p className="text-xs text-brand-mutedGray leading-relaxed">{item.description}</p>
            )}

            {item.speaker && (
              <div className="flex items-center gap-1.5 pt-1 text-xs text-brand-darkSlate font-medium">
                <User className="w-3.5 h-3.5 text-brand-mutedGray" />
                <span>Speaker: {item.speaker}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
