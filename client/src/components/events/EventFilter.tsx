import React from 'react';
import { Search, MapPin, Calendar, LayoutGrid, List, RotateCcw } from 'lucide-react';
import { Category } from '../../types';

interface EventFilterProps {
  categories: Category[];
  search: string;
  setSearch: (v: string) => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  startDate: string;
  setStartDate: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (v: 'grid' | 'list') => void;
  onReset: () => void;
}

export const EventFilter: React.FC<EventFilterProps> = ({
  categories,
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  location,
  setLocation,
  startDate,
  setStartDate,
  sort,
  setSort,
  viewMode,
  setViewMode,
  onReset,
}) => {
  return (
    <div className="bg-brand-surface rounded-2xl border border-brand-border p-6 shadow-subtle space-y-4 mb-8">
      {/* Top Search & Layout Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Search */}
        <div className="md:col-span-8 relative">
          <Search className="w-5 h-5 text-brand-mutedGray absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search packages (e.g. Wedding, Baby Shower, Birthday, Photography)..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-brand-border text-sm text-brand-darkSlate placeholder-brand-mutedGray focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
        </div>

        {/* Sort & View Mode */}
        <div className="md:col-span-4 flex items-center justify-end gap-2.5">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl border border-brand-border text-sm text-brand-darkSlate bg-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-primary"
          >
            <option value="upcoming">Upcoming First</option>
            <option value="newest">Recently Added</option>
            <option value="popular">Most Popular</option>
          </select>

          <div className="flex items-center rounded-xl border border-brand-border overflow-hidden bg-brand-background p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-brand-surface text-brand-primary shadow-subtle'
                  : 'text-brand-mutedGray hover:text-brand-darkSlate'
              }`}
              title="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-brand-surface text-brand-primary shadow-subtle'
                  : 'text-brand-mutedGray hover:text-brand-darkSlate'
              }`}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-brand-border">
        {/* Category */}
        <div>
          <label className="block text-xs font-medium text-brand-mutedGray mb-1">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs text-brand-darkSlate bg-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-primary"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-medium text-brand-mutedGray mb-1">City / Region</label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-brand-mutedGray absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Nagercoil, Kanyakumari, Tirunelveli"
              className="w-full pl-8 pr-3 py-2 rounded-lg border border-brand-border text-xs text-brand-darkSlate placeholder-brand-mutedGray focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-xs font-medium text-brand-mutedGray mb-1">Starting From</label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-brand-mutedGray absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-lg border border-brand-border text-xs text-brand-darkSlate focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>
        </div>

        {/* Reset */}
        <div className="flex items-end">
          <button
            onClick={onReset}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-brand-border text-xs font-medium text-brand-mutedGray hover:text-brand-darkSlate hover:bg-brand-hoverBg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};
