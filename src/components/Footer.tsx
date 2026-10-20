import React from 'react';
import { STUDIO_META } from '../data/studioData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenAdmin }) => {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <footer className="w-full bg-[#fdf1ec] pt-16 pb-12 border-t border-[#dac2b9]/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#dac2b9]/40">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#f2e6e1] border border-[#dac2b9]/60 flex items-center justify-center">
                <span className="font-serif-display text-xl text-[#803d1d] leading-none">
                  F
                </span>
              </div>
              <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#201a18]">
                {STUDIO_META.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#54433c] max-w-sm leading-relaxed">
              Artisanal creative direction, brand identity curation, and bespoke visual storytelling under the guidance of Creative Director {STUDIO_META.director}.
            </p>

            <div className="pt-2">
              <a
                href={`mailto:${STUDIO_META.email}`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#803d1d] hover:text-[#8e4d32] font-medium transition-colors underline underline-offset-4"
              >
                <span className="material-symbols-outlined text-base">mail</span>
                <span>{STUDIO_META.email}</span>
              </a>
            </div>
          </div>

          {/* Directory */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-xs font-bold tracking-widest uppercase text-[#201a18]">
              Atelier Directory
            </span>
            <nav className="flex flex-col gap-2 text-xs text-[#54433c]">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#home');
                }}
                className="hover:text-[#803d1d] transition-colors"
              >
                Home Overview
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#about');
                }}
                className="hover:text-[#803d1d] transition-colors"
              >
                About Fhlori &amp; Manifesto
              </a>
              <a
                href="#portfolio-gallery"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#portfolio-gallery');
                }}
                className="hover:text-[#803d1d] transition-colors"
              >
                Selected Portfolio (14 Cases)
              </a>
              <a
                href="#tools"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#tools');
                }}
                className="hover:text-[#803d1d] transition-colors"
              >
                Creative Tools &amp; Mastery
              </a>
              <a
                href="#certificates"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#certificates');
                }}
                className="hover:text-[#803d1d] transition-colors"
              >
                Certificates &amp; Honors
              </a>
              <button
                onClick={onOpenAdmin}
                className="text-left font-semibold text-[#803d1d] hover:underline transition-colors flex items-center gap-1 cursor-pointer pt-1"
              >
                <span className="material-symbols-outlined text-[15px]">admin_panel_settings</span>
                <span>Payload CRM / Admin (/admin)</span>
              </button>
            </nav>
          </div>

          {/* Inquiries & Consultations */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="text-xs font-bold tracking-widest uppercase text-[#201a18]">
              Inquiries &amp; Consultations
            </span>
            <p className="text-xs text-[#54433c] leading-relaxed">
              Open for select brand commissions, editorial styling, and private visual architecture appointments worldwide.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Archive"
                className="w-10 h-10 rounded-full bg-[#f8ebe6] border border-[#dac2b9]/60 flex items-center justify-center text-[#54433c] hover:bg-[#803d1d] hover:text-white transition-all shadow-xs"
              >
                <span className="material-symbols-outlined text-[19px]">camera</span>
              </a>
              <a
                href="https://behance.net"
                target="_blank"
                rel="noreferrer"
                aria-label="Design Network"
                className="w-10 h-10 rounded-full bg-[#f8ebe6] border border-[#dac2b9]/60 flex items-center justify-center text-[#54433c] hover:bg-[#803d1d] hover:text-white transition-all shadow-xs"
              >
                <span className="material-symbols-outlined text-[19px]">palette</span>
              </a>
              <a
                href="mailto:flurrygraphystudio@gmail.com"
                aria-label="Direct Studio Contact"
                className="w-10 h-10 rounded-full bg-[#f8ebe6] border border-[#dac2b9]/60 flex items-center justify-center text-[#54433c] hover:bg-[#803d1d] hover:text-white transition-all shadow-xs"
              >
                <span className="material-symbols-outlined text-[19px]">public</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#54433c]">
          <p className="text-center sm:text-left">
            © 2024–2026 {STUDIO_META.name}. Directed by {STUDIO_META.director}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[11px] font-semibold uppercase tracking-wider">
            <a
              href="#booking-section"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#booking-section');
              }}
              className="hover:text-[#803d1d] transition-colors"
            >
              Contact Atelier
            </a>
            <button
              onClick={onOpenBooking}
              className="text-[#803d1d] hover:underline transition-colors uppercase font-semibold"
            >
              Reserve Session
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
