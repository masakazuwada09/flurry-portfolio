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
import { AdminLayout } from './components/admin/AdminLayout';
import {
  AppointmentInquiry,
  PortfolioItem,
  StudioMeta,
  MediaAsset,
  ServiceOption,
  AdminTab,
  CRMLeadStatus,
} from './types';
import {
  STUDIO_META,
  PORTFOLIO_ITEMS,
  SERVICE_OPTIONS,
  INITIAL_MEDIA_ASSETS,
  CLIENT_TESTIMONIALS,
  MASTER_SHOWCASE_IMAGE,
} from './data/studioData';

const INITIAL_APPOINTMENTS: AppointmentInquiry[] = [
  {
    id: 'inq-initial-01',
    clientName: 'Sofia Ramirez',
    email: 'sofia@eunoiacafe.com',
    phone: '+1 (555) 234-8901',
    selectedServices: ['branding-kit', 'print-packaging'],
    targetLaunchDate: 'November 2026',
    budgetTier: 'Standard Identity Suite ($800 - $2,000)',
    estimatedTotal: 1017,
    projectDescription:
      'Bespoke identity refresh for specialty coffee house with gold foil packaging, embossed menus, and social feed templates.',
    createdAt: 'Oct 18, 2026',
    status: 'Pending Discovery',
    adminNotes: 'Review moodboard draft before initial Zoom discovery call.',
  },
  {
    id: 'inq-initial-02',
    clientName: 'Rafael Bravo',
    email: 'rafael@bravoestates.sg',
    phone: '+65 9123 4567',
    selectedServices: ['branding-kit', 'corporate-apparel'],
    targetLaunchDate: 'December 2026',
    budgetTier: 'Full Brand Architecture & Collateral ($2,000+)',
    estimatedTotal: 900,
    projectDescription:
      'Executive stationery, foil stamped business cards, and onboarding merchandise for boutique consultancy.',
    createdAt: 'Oct 19, 2026',
    status: 'Reviewed',
    adminNotes: 'Client confirmed budget; send formal proposal by Friday.',
  },
];

export default function App() {
  // Check if current route is /admin or hash is #admin
  const checkIsAdminPath = () => {
    return (
      window.location.pathname === '/admin' ||
      window.location.pathname.startsWith('/admin') ||
      window.location.hash === '#admin'
    );
  };

  const [isAdminView, setIsAdminView] = useState<boolean>(checkIsAdminPath);
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');

  // Studio Meta state
  const [studioMeta, setStudioMeta] = useState<StudioMeta>(() => {
    try {
      const saved = localStorage.getItem('flurrygraphy_studio_meta');
      return saved ? JSON.parse(saved) : STUDIO_META;
    } catch {
      return STUDIO_META;
    }
  });

  // Portfolio items state
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() => {
    try {
      const saved = localStorage.getItem('flurrygraphy_portfolio_items');
      return saved ? JSON.parse(saved) : PORTFOLIO_ITEMS;
    } catch {
      return PORTFOLIO_ITEMS;
    }
  });

  // Appointments / CRM Leads state
  const [appointments, setAppointments] = useState<AppointmentInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('flurrygraphy_appointments');
      return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  });

  // Services & Pricing state
  const [services, setServices] = useState<ServiceOption[]>(() => {
    try {
      const saved = localStorage.getItem('flurrygraphy_services');
      return saved ? JSON.parse(saved) : SERVICE_OPTIONS;
    } catch {
      return SERVICE_OPTIONS;
    }
  });

  // Media Assets state
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(() => {
    try {
      const saved = localStorage.getItem('flurrygraphy_media_assets');
      return saved ? JSON.parse(saved) : INITIAL_MEDIA_ASSETS;
    } catch {
      return INITIAL_MEDIA_ASSETS;
    }
  });

  const [isAppointmentsDrawerOpen, setIsAppointmentsDrawerOpen] = useState(false);
  const [isBrandGuideModalOpen, setIsBrandGuideModalOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | null>(null);

  // Sync route changes
  useEffect(() => {
    const handlePopState = () => {
      setIsAdminView(checkIsAdminPath());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('flurrygraphy_studio_meta', JSON.stringify(studioMeta));
    } catch (e) {
      console.warn('localStorage error', e);
    }
  }, [studioMeta]);

  useEffect(() => {
    try {
      localStorage.setItem('flurrygraphy_portfolio_items', JSON.stringify(portfolioItems));
    } catch (e) {
      console.warn('localStorage error', e);
    }
  }, [portfolioItems]);

  useEffect(() => {
    try {
      localStorage.setItem('flurrygraphy_appointments', JSON.stringify(appointments));
    } catch (e) {
      console.warn('localStorage error', e);
    }
  }, [appointments]);

  useEffect(() => {
    try {
      localStorage.setItem('flurrygraphy_services', JSON.stringify(services));
    } catch (e) {
      console.warn('localStorage error', e);
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem('flurrygraphy_media_assets', JSON.stringify(mediaAssets));
    } catch (e) {
      console.warn('localStorage error', e);
    }
  }, [mediaAssets]);

  // Navigation helpers for Admin
  const navigateToAdmin = (tab: AdminTab = 'dashboard') => {
    setAdminTab(tab);
    setIsAdminView(true);
    window.history.pushState(null, '', '/admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateExitAdmin = () => {
    setIsAdminView(false);
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const handleUpdateLeadStatus = (id: string, status: CRMLeadStatus) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

  const handleUpdateLeadNotes = (id: string, notes: string) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, adminNotes: notes } : app))
    );
  };

  // Master Showcase Image sync (Requested by user)
  const handleApplyMasterToAll = () => {
    // 1. Update studio banners
    setStudioMeta((prev) => ({
      ...prev,
      heroBanner: MASTER_SHOWCASE_IMAGE,
      directorBanner: MASTER_SHOWCASE_IMAGE,
      toolsBanner: MASTER_SHOWCASE_IMAGE,
      certificatesBanner: MASTER_SHOWCASE_IMAGE,
      contactBanner: MASTER_SHOWCASE_IMAGE,
    }));

    // 2. Update all portfolio items
    setPortfolioItems((prev) =>
      prev.map((item) => ({
        ...item,
        imageUrl: MASTER_SHOWCASE_IMAGE,
      }))
    );

    alert('✨ Success! All images have been aligned to the Master Showcase Visual.');
  };

  const handleSetAllPortfolioToMaster = () => {
    setPortfolioItems((prev) =>
      prev.map((item) => ({
        ...item,
        imageUrl: MASTER_SHOWCASE_IMAGE,
      }))
    );
    alert('✨ All 14 portfolio case study images updated to the Master Showcase Visual.');
  };

  const handleResetToDefaults = () => {
    setStudioMeta(STUDIO_META);
    setPortfolioItems(PORTFOLIO_ITEMS);
    setAppointments(INITIAL_APPOINTMENTS);
    setServices(SERVICE_OPTIONS);
    setMediaAssets(INITIAL_MEDIA_ASSETS);
    localStorage.clear();
    alert('Studio database restored to default factory state.');
  };

  // IF ADMIN VIEW IS ACTIVE
  if (isAdminView) {
    return (
      <AdminLayout
        currentTab={adminTab}
        onChangeTab={setAdminTab}
        onExitAdmin={navigateExitAdmin}
        studioMeta={studioMeta}
        onSaveMeta={setStudioMeta}
        portfolioItems={portfolioItems}
        onUpdatePortfolioItem={(updated) =>
          setPortfolioItems((prev) =>
            prev.map((it) => (it.id === updated.id ? updated : it))
          )
        }
        onAddPortfolioItem={(newItem) =>
          setPortfolioItems((prev) => [newItem, ...prev])
        }
        onDeletePortfolioItem={(id) =>
          setPortfolioItems((prev) => prev.filter((it) => it.id !== id))
        }
        onSetAllPortfolioToMaster={handleSetAllPortfolioToMaster}
        leads={appointments}
        onUpdateLeadStatus={handleUpdateLeadStatus}
        onUpdateLeadNotes={handleUpdateLeadNotes}
        onDeleteLead={handleDeleteAppointment}
        onAddManualLead={(newLead) => setAppointments((prev) => [newLead, ...prev])}
        mediaAssets={mediaAssets}
        onAddMedia={(newAsset) => setMediaAssets((prev) => [newAsset, ...prev])}
        onDeleteMedia={(id) =>
          setMediaAssets((prev) => prev.filter((m) => m.id !== id))
        }
        onApplyMasterToAll={handleApplyMasterToAll}
        services={services}
        onUpdateServices={setServices}
        onResetToDefaults={handleResetToDefaults}
      />
    );
  }

  // PUBLIC LIVE STOREFRONT
  return (
    <div className="min-h-screen bg-[#fff8f6] text-[#201a18] flex flex-col font-sans selection:bg-[#ffdbce] selection:text-[#370e00]">
      {/* Floating quick access badge to Payload CRM */}
      <aside
        aria-label="Admin quick link"
        className="fixed bottom-6 right-6 z-40"
      >
        <button
          onClick={() => navigateToAdmin('dashboard')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#fff8f6] hover:bg-[#803d1d] text-[#803d1d] hover:text-white text-xs font-semibold shadow-xl border border-[#dac2b9] hover:scale-105 transition-all cursor-pointer group uppercase tracking-wider"
          title="Open Payload CRM & Page Editor (/admin)"
        >
          <span className="material-symbols-outlined text-base">
            admin_panel_settings
          </span>
          <span>Payload CRM /admin</span>
        </button>
      </aside>

      {/* Top Fixed Header */}
      <Header
        onOpenBooking={scrollToBooking}
        onOpenBrandGuide={() => setIsBrandGuideModalOpen(true)}
        onOpenInquiries={() => setIsAppointmentsDrawerOpen(true)}
        onOpenAdmin={() => navigateToAdmin('dashboard')}
        inquiryCount={appointments.length}
        studioMeta={studioMeta}
      />

      {/* Main Studio Flow */}
      <main className="w-full pt-20 bg-[#fff8f6] flex-1">
        {/* Hero Section */}
        <HeroSection
          studioMeta={studioMeta}
          onBookAppointment={scrollToBooking}
          onExploreWorks={scrollToPortfolio}
        />

        {/* About Fhlori & Studio Narrative */}
        <AboutSection
          studioMeta={studioMeta}
          onScheduleDiscovery={scrollToBooking}
        />

        {/* Selected Curated Portfolio */}
        <PortfolioSection
          items={portfolioItems}
          onSelectProjectForInquiry={handleSelectProjectForInquiry}
        />

        {/* Software & Creative Tools Mastery */}
        <ToolsSection toolsBanner={studioMeta.toolsBanner} />

        {/* Certifications & Accreditations */}
        <CertificationsSection certificatesBanner={studioMeta.certificatesBanner} />

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
          contactBanner={studioMeta.contactBanner}
          services={services}
          onAppointmentCreated={handleAppointmentCreated}
          preselectedServiceId={preselectedServiceId}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={scrollToBooking}
        onOpenAdmin={() => navigateToAdmin('dashboard')}
      />

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
