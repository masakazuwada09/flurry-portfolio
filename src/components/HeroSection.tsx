import React from 'react';
import { STUDIO_META, STUDIO_METRICS } from '../data/studioData';

interface HeroSectionProps {
  onBookAppointment: () => void;
  onExploreWorks: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBookAppointment,
  onExploreWorks,
}) => {
  return (
    <section id="home" className="relative w-full overflow-hidden pb-16 lg:pb-24 pt-6">
      {/* Ambient diffused soft glow */}
      <div className="absolute -top-24 right-0 w-[500px] h-[500px] bg-[#feaa88]/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 -left-36 w-[450px] h-[450px] bg-[#ffdbcd]/25 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-4 lg:pt-10">
        {/* Breadcrumb & Studio Status Pill */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#f8ebe6] border border-[#dac2b9]/60 text-[#54433c] text-[11px] font-medium tracking-[0.18em] uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#803d1d] animate-pulse" />
            <span>{STUDIO_META.name} • Creative Direction Atelier</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] text-[#54433c]">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#803d1d]">
                verified
              </span>
              Certified Graphic Designer
            </span>
            <span className="hidden sm:inline text-[#dac2b9]">•</span>
            <span className="hidden sm:flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#803d1d]">
                award_star
              </span>
              Top Rated Specialist
            </span>
          </div>
        </div>

        {/* Hero Main Visual Masterpiece (Image 17) */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-[#f2e6e1] shadow-2xl border border-[#dac2b9]/50 transition-all duration-700 group">
          <div className="relative w-full aspect-[16/9] min-h-[420px] max-h-[640px] overflow-hidden">
            <img
              alt="Flurrygraphy Studio Showcase - Creative Design Solutions for Businesses"
              className="w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-[1.01]"
              src={STUDIO_META.heroBanner}
              loading="eager"
            />
            {/* Elegant warm gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#201a18]/85 via-[#201a18]/40 to-transparent flex flex-col justify-end p-6 sm:p-10 lg:p-14">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fff8f6]/95 backdrop-blur-md text-[11px] font-semibold tracking-[0.18em] uppercase text-[#803d1d] shadow-sm">
                  <span>Visual Architecture &amp; Brand Styling</span>
                </div>

                <h1 className="font-serif-display text-3xl sm:text-5xl lg:text-[56px] text-[#fff8f6] drop-shadow-sm font-normal leading-[1.12] tracking-tight">
                  {STUDIO_META.tagline}
                </h1>

                <p className="text-sm sm:text-lg text-[#fdf1ec] max-w-2xl font-light drop-shadow leading-relaxed">
                  Bespoke branding kits, editorial publications, tactile packaging mockups, and high-impact digital graphics curated for forward-thinking lifestyle brands.
                </p>

                <div className="pt-3 sm:pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={onBookAppointment}
                    className="inline-flex items-center gap-2.5 bg-[#9e5432] text-[#ffe2d7] hover:bg-[#803d1d] hover:text-white text-[12px] sm:text-[13px] font-semibold tracking-[0.16em] uppercase px-7 py-3.5 rounded-full transition-all duration-300 shadow-xl hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Book an Appointment</span>
                    <span className="material-symbols-outlined text-[18px]">
                      calendar_today
                    </span>
                  </button>

                  <button
                    onClick={onExploreWorks}
                    className="inline-flex items-center gap-2 bg-[#fff8f6]/90 hover:bg-[#fff8f6] text-[#201a18] text-[12px] sm:text-[13px] font-semibold tracking-[0.16em] uppercase px-6 py-3.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-md hover:-translate-y-0.5 cursor-pointer border border-[#dac2b9]/40"
                  >
                    <span>Explore Selected Works</span>
                    <span className="material-symbols-outlined text-[18px]">
                      arrow_downward
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Metrics strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {STUDIO_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="bg-[#f8ebe6] border border-[#dac2b9]/40 p-5 sm:p-6 rounded-xl shadow-sm flex flex-col gap-1 transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <span
                className={`font-serif-display text-3xl sm:text-4xl ${metric.colorClass} font-normal leading-none`}
              >
                {metric.value}
              </span>
              <span className="text-[12px] font-semibold uppercase text-[#201a18] tracking-[0.18em] mt-1.5">
                {metric.label}
              </span>
              <p className="text-[12px] text-[#54433c] leading-snug mt-0.5">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
