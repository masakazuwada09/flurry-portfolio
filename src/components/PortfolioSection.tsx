import React, { useState, useMemo } from 'react';
import { PORTFOLIO_ITEMS } from '../data/studioData';
import { PortfolioItem, ProjectCategory } from '../types';
import { CaseStudyModal } from './CaseStudyModal';
import { ImageWithFallback } from './common/ImageWithFallback';

interface PortfolioSectionProps {
  items?: PortfolioItem[];
  onSelectProjectForInquiry: (item: PortfolioItem) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  items = PORTFOLIO_ITEMS,
  onSelectProjectForInquiry,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCase, setSelectedCase] = useState<PortfolioItem | null>(null);
  const [layoutMode, setLayoutMode] = useState<'editorial' | 'grid'>('editorial');

  const categories: { key: ProjectCategory; label: string }[] = [
    { key: 'all', label: 'All Works' },
    { key: 'branding', label: 'Branding & Kits' },
    { key: 'print', label: 'Print & Packaging' },
    { key: 'social', label: 'Social & Editorial' },
    { key: 'art', label: 'Lettering & Art' },
    { key: 'multimedia', label: 'Corporate & Video' },
  ];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.client && item.client.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [items, activeCategory, searchQuery]);


  return (
    <section id="portfolio-gallery" className="w-full py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Title & Filter Nav */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#dac2b9]/40 mb-10">
          <div>
            <span className="text-[12px] font-semibold uppercase text-[#803d1d] tracking-[0.2em] block mb-2">
              Curated Archive
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#201a18]">
              Selected Portfolio
            </h2>
            <p className="text-xs sm:text-sm text-[#54433c] mt-2 max-w-lg">
              Explore 14 curated case studies across brand identity systems, physical paper goods, hand lettering, and motion graphics.
            </p>
          </div>

          {/* Controls: Search & Filters */}
          <div className="flex flex-col items-start lg:items-end gap-3 w-full lg:w-auto">
            {/* Category Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 bg-[#fdf1ec] p-1.5 rounded-full border border-[#dac2b9]/50 shadow-sm max-w-full overflow-x-auto">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#803d1d] text-white shadow-sm'
                        : 'text-[#54433c] hover:text-[#201a18] hover:bg-[#f2e6e1]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Quick search and layout toggle bar */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="relative flex-1 sm:w-64">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-sm text-[#54433c]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by keyword..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#fdf1ec] border border-[#dac2b9]/60 rounded-full text-[#201a18] placeholder:text-[#54433c]/60 focus:outline-none focus:border-[#803d1d]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2 text-[#54433c] hover:text-[#201a18] text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="inline-flex items-center bg-[#fdf1ec] p-1 rounded-full border border-[#dac2b9]/60">
                <button
                  onClick={() => setLayoutMode('editorial')}
                  title="Editorial Masonry Layout"
                  className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                    layoutMode === 'editorial'
                      ? 'bg-[#803d1d] text-white'
                      : 'text-[#54433c] hover:text-[#201a18]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">view_quilt</span>
                </button>
                <button
                  onClick={() => setLayoutMode('grid')}
                  title="Uniform Grid Layout"
                  className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                    layoutMode === 'grid'
                      ? 'bg-[#803d1d] text-white'
                      : 'text-[#54433c] hover:text-[#201a18]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">grid_view</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Counter & Active filter indicator */}
        <div className="flex items-center justify-between text-xs text-[#54433c] mb-6">
          <span>
            Showing <strong className="text-[#201a18]">{filteredItems.length}</strong> of{' '}
            {PORTFOLIO_ITEMS.length} selected works
          </span>
          {searchQuery && (
            <span className="text-[11px] text-[#803d1d]">
              Keyword filter applied: "{searchQuery}"
            </span>
          )}
        </div>

        {/* Portfolio Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#fdf1ec] rounded-2xl border border-[#dac2b9]/50">
            <span className="material-symbols-outlined text-4xl text-[#dac2b9] mb-2">
              inventory
            </span>
            <p className="text-sm text-[#54433c]">No works found matching your criteria.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#803d1d] bg-[#f8ebe6] rounded-full hover:bg-[#f2e6e1]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className={
              layoutMode === 'editorial'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8'
                : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            }
          >
            {filteredItems.map((item) => {
              const colSpan =
                layoutMode === 'editorial' ? item.colSpanDesktop : 'lg:col-span-1';

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedCase(item)}
                  className={`flex flex-col gap-3 group cursor-pointer ${colSpan}`}
                >
                  {/* Image container */}
                  <div className="relative w-full rounded-2xl overflow-hidden bg-[#f8ebe6] border border-[#dac2b9]/50 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
                    <ImageWithFallback
                      alt={item.title}
                      src={item.imageUrl}
                      loading="lazy"
                      className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.015]"
                    />

                    {/* Discipline Badge */}
                    <div className="absolute top-4 left-4 bg-[#fff8f6]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-[#803d1d] shadow-sm border border-[#dac2b9]/40">
                      {item.categoryLabel}
                    </div>

                    {/* Hover Inspect Overlay */}
                    <div className="absolute inset-0 bg-[#201a18]/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="bg-[#fff8f6] text-[#201a18] text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        <span>Inspect Case Study</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="flex items-start justify-between gap-4 px-1 pt-1">
                    <div className="space-y-1">
                      <h3 className="font-serif-display text-lg sm:text-xl text-[#201a18] group-hover:text-[#803d1d] transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#54433c] line-clamp-2 leading-relaxed">
                        {item.subtitle} — {item.description}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#803d1d] shrink-0 pt-1">
                      {item.caseNumber}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Case Study Lightbox / Inspector Modal */}
      <CaseStudyModal
        item={selectedCase}
        onClose={() => setSelectedCase(null)}
        onInquireProject={(item) => {
          setSelectedCase(null);
          onSelectProjectForInquiry(item);
        }}
      />
    </section>
  );
};
