import React, { useState } from 'react';
import { StudioMeta } from '../types';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenBrandGuide: () => void;
  onOpenInquiries: () => void;
  onOpenAdmin: () => void;
  inquiryCount: number;
  studioMeta: StudioMeta;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onOpenBrandGuide,
  onOpenInquiries,
  onOpenAdmin,
  inquiryCount,
  studioMeta,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Portfolio', href: '#portfolio-gallery' },
    { label: 'Tools', href: '#tools' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Contact', href: '#booking-section' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fff8f6]/90 backdrop-blur-xl border-b border-[#dac2b9]/40 shadow-[0_1px_8px_rgba(128,61,29,0.03)]">
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand Crest */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="flex items-center gap-3.5 group text-left"
        >
          <div className="w-10 h-10 rounded-full bg-[#f8ebe6] border border-[#dac2b9]/60 flex items-center justify-center transition-all group-hover:scale-105 group-hover:bg-[#ffdbcd]/50 duration-300">
            <span className="font-serif-display text-2xl text-[#803d1d] font-medium leading-none">
              F
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm tracking-[0.2em] uppercase text-[#201a18]">
              {studioMeta.name.split(' ')[0]}
            </span>
            <span className="text-[10px] tracking-[0.18em] uppercase text-[#54433c] font-medium">
              Creative Direction Atelier
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-1 bg-[#fdf1ec] px-3 py-1.5 rounded-full border border-[#dac2b9]/50 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="px-4 py-1.5 text-[12px] font-medium tracking-[0.16em] uppercase text-[#54433c] hover:text-[#201a18] hover:bg-[#f2e6e1] rounded-full transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA cluster */}
        <div className="flex items-center gap-2.5">
          {/* Admin CRM Button */}
          <button
            onClick={onOpenAdmin}
            title="Open Payload CRM & Content Manager (/admin)"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase px-3 py-2 rounded-full border border-[#dac2b9] text-[#803d1d] bg-[#f8ebe6] hover:bg-[#803d1d] hover:text-white transition-all shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-xs">
              admin_panel_settings
            </span>
            <span className="hidden sm:inline">Payload CRM</span>
            <span className="sm:hidden">CRM</span>
          </button>

          {/* Brand Style Guide button */}
          <button
            onClick={onOpenBrandGuide}
            title="Inspect Studio Style & Color Palette"
            className="hidden lg:inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wider uppercase px-3 py-2 rounded-full border border-[#dac2b9] text-[#54433c] hover:text-[#803d1d] hover:border-[#803d1d] bg-[#fff8f6] transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-[#803d1d]"></span>
            <span>Style</span>
          </button>

          {/* Book Appointment CTA */}
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center bg-[#9e5432] text-[#ffe2d7] hover:bg-[#803d1d] hover:text-white text-[12px] font-semibold tracking-[0.15em] uppercase px-4 sm:px-5 py-2.5 rounded-full transition-all duration-300 shadow-[0_4px_16px_rgba(158,84,50,0.18)] hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] mr-1.5 hidden md:inline">
              calendar_today
            </span>
            <span>Book</span>
          </button>

          {/* Inquiries / Bookings Drawer Toggle */}
          <button
            onClick={onOpenInquiries}
            title="View booked appointments & inquiries"
            className="relative w-9 h-9 rounded-full bg-[#803d1d] text-white flex items-center justify-center hover:bg-[#8e4d32] transition-colors cursor-pointer shadow-sm"
            aria-label="Appointments & Inquiries"
          >
            <span className="material-symbols-outlined text-[19px]">
              person
            </span>
            {inquiryCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#201a18] text-[#ffe2d7] text-[10px] font-bold flex items-center justify-center border-2 border-[#fff8f6]">
                {inquiryCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-9 h-9 rounded-full bg-[#f8ebe6] text-[#201a18] flex items-center justify-center hover:bg-[#f2e6e1] transition-colors cursor-pointer border border-[#dac2b9]/60"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#fff8f6] border-b border-[#dac2b9] px-6 py-5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-4 py-2.5 text-sm font-medium tracking-wider uppercase text-[#201a18] hover:bg-[#f8ebe6] rounded-lg transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="material-symbols-outlined text-sm text-[#803d1d]">
                  arrow_forward
                </span>
              </a>
            ))}
            <div className="pt-3 border-t border-[#dac2b9]/40 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full text-left px-4 py-2.5 text-xs uppercase tracking-wider text-[#803d1d] bg-[#f8ebe6] hover:bg-[#803d1d] hover:text-white border border-[#dac2b9] rounded-xl flex items-center justify-between font-semibold transition-all"
              >
                <span>Payload CRM / Admin</span>
                <span className="material-symbols-outlined text-sm text-[#803d1d]">
                  admin_panel_settings
                </span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBrandGuide();
                }}
                className="w-full text-left px-4 py-2.5 text-xs uppercase tracking-wider text-[#54433c] hover:bg-[#f8ebe6] rounded-lg flex items-center gap-2"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#803d1d]"></span>
                <span>Inspect Atelier Color Palette</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiries();
                }}
                className="w-full text-left px-4 py-2.5 text-xs uppercase tracking-wider text-[#803d1d] font-semibold hover:bg-[#f8ebe6] rounded-lg flex items-center justify-between"
              >
                <span>My Appointments ({inquiryCount})</span>
                <span className="material-symbols-outlined text-sm">schedule</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
