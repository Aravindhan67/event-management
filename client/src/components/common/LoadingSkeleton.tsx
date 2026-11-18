import React from 'react';

export const EventCardSkeleton: React.FC = () => {
  return (
    <div className="bg-brand-surface rounded-xl border border-brand-border overflow-hidden shadow-subtle animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>
        <div className="h-6 w-3/4 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-2/3 bg-gray-200 rounded" />
        <div className="pt-3 border-t border-brand-border flex justify-between items-center">
          <div className="h-5 w-20 bg-gray-200 rounded" />
          <div className="h-8 w-24 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export const TableRowSkeleton: React.FC<{ cols?: number }> = ({ cols = 5 }) => {
  return (
    <tr className="animate-pulse border-b border-brand-border">
      {Array.from({ length: cols }).map((_, idx) => (
        <td key={idx} className="p-4">
          <div className="h-4 bg-gray-200 rounded w-full" />
        </td>
      ))}
    </tr>
  );
};
