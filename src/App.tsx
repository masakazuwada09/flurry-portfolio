/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ToolsSection } from './components/ToolsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { BookingSection } from './components/BookingSection';
import { AppointmentsDrawer } from './components/AppointmentsDrawer';
import { BrandGuideModal } from './components/BrandGuideModal';
import { Footer } from './components/Footer';
import { AppointmentInquiry, PortfolioItem } from './types';
import { CLIENT_TESTIMONIALS } from './data/studioData';

const INITIAL_APPOINTMENTS: AppointmentInquiry[] = [
  {
    id: 'inq-initial-01',
    clientName: 'Sofia Ramirez',
    email: 'sofia@eunoiacafe.com',
    selectedServices: ['branding-kit', 'print-packaging'],
    targetLaunchDate: 'November 2026',
    budgetTier: 'Standard Identity Suite ($800 - $2,000)',
    estimatedTotal: 1017,
    projectDescription: 'Bespoke identity refresh for specialty coffee house with gold foil packaging and menu boards.',
    createdAt: 'Oct 18, 2026',
    status: 'Pending Discovery',
  },
];

export default function App() {
  const [appointments, setAppointments] = useState<AppointmentInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('flurrygraphy_appointments');
      return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  });

  const [isAppointmentsDrawerOpen, setIsAppointmentsDrawerOpen] = useState(false);
  const [isBrandGuideModalOpen, setIsBrandGuideModalOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('flurrygraphy_appointments', JSON.stringify(appointments));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [appointments]);

  const scrollToBooking = () => {
    const el = document.getElementById('booking-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio-gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProjectForInquiry = (item: PortfolioItem) => {
    // Map project category to corresponding service option
    let targetService = 'branding-kit';
    if (item.category === 'print') targetService = 'print-packaging';
    else if (item.category === 'social') targetService = 'social-templates';
    else if (item.category === 'art') targetService = 'calligraphy-art';
    else if (item.category === 'multimedia') {
      targetService = item.id.includes('video') ? 'video-motion' : 'corporate-apparel';
    }

    setPreselectedServiceId(targetService);
    scrollToBooking();
  };

  const handleAppointmentCreated = (newApp: AppointmentInquiry) => {
    setAppointments((prev) => [newApp, ...prev]);
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#fff8f6] text-[#201a18] flex flex-col font-sans selection:bg-[#ffdbce] selection:text-[#370e00]">
      {/* Top Fixed Header */}
      <Header
        onOpenBooking={scrollToBooking}
        onOpenBrandGuide={() => setIsBrandGuideModalOpen(true)}
        onOpenInquiries={() => setIsAppointmentsDrawerOpen(true)}
        inquiryCount={appointments.length}
      />

      {/* Main Studio Flow */}
      <main className="w-full pt-20 bg-[#fff8f6] flex-1">
        {/* Hero Section */}
        <HeroSection
          onBookAppointment={scrollToBooking}
          onExploreWorks={scrollToPortfolio}
        />

        {/* About Fhlori & Studio Narrative */}
        <AboutSection onScheduleDiscovery={scrollToBooking} />

        {/* Selected Curated Portfolio */}
        <PortfolioSection
          onSelectProjectForInquiry={handleSelectProjectForInquiry}
        />

        {/* Software & Creative Tools Mastery */}
        <ToolsSection />

        {/* Certifications & Accreditations */}
        <CertificationsSection />

        {/* Client Endorsements & Testimonials Ribbon */}
        <section className="w-full py-16 bg-[#fff8f6] border-t border-[#dac2b9]/40">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-[12px] font-semibold uppercase text-[#803d1d] tracking-[0.2em] block mb-1">
                  Client Endorsements
                </span>
                <h3 className="font-serif-display text-2xl sm:text-4xl text-[#201a18]">
                  Words from Brand Partners
                </h3>
              </div>
              <span className="text-xs text-[#54433c]">
                Rated 4.9/5 across 100+ creative commissions
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CLIENT_TESTIMONIALS.map((t, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#f8ebe6] border border-[#dac2b9]/50 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-[#803d1d]">
                      {[...Array(t.rating)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-[18px]">
                          star
                        </span>
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-[#201a18] font-light leading-relaxed italic">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#dac2b9]/40 mt-4">
                    <strong className="text-xs font-semibold text-[#201a18] block">
                      {t.author}
                    </strong>
                    <span className="text-[11px] text-[#54433c] block">
                      {t.role} · {t.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Booking & Inquiries Section */}
        <BookingSection
          onAppointmentCreated={handleAppointmentCreated}
          preselectedServiceId={preselectedServiceId}
        />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={scrollToBooking} />

      {/* Appointments Management Drawer */}
      <AppointmentsDrawer
        isOpen={isAppointmentsDrawerOpen}
        onClose={() => setIsAppointmentsDrawerOpen(false)}
        appointments={appointments}
        onDeleteAppointment={handleDeleteAppointment}
        onNewBookingClick={scrollToBooking}
      />

      {/* Brand Style Guide Inspector Modal */}
      <BrandGuideModal
        isOpen={isBrandGuideModalOpen}
        onClose={() => setIsBrandGuideModalOpen(false)}
      />
    </div>
  );
}
