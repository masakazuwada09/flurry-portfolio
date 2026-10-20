import React, { useState } from 'react';
import {
  AdminTab,
  StudioMeta,
  PortfolioItem,
  AppointmentInquiry,
  MediaAsset,
  ServiceOption,
  CRMLeadStatus,
} from '../../types';
import { AdminDashboard } from './AdminDashboard';
import { AdminPagesEditor } from './AdminPagesEditor';
import { AdminPortfolioManager } from './AdminPortfolioManager';
import { AdminCRMLeads } from './AdminCRMLeads';
import { AdminServicesEditor } from './AdminServicesEditor';
import { AdminMediaLibrary } from './AdminMediaLibrary';

interface AdminLayoutProps {
  currentTab: AdminTab;
  onChangeTab: (tab: AdminTab) => void;
  onExitAdmin: () => void;
  studioMeta: StudioMeta;
  onSaveMeta: (meta: StudioMeta) => void;
  portfolioItems: PortfolioItem[];
  onUpdatePortfolioItem: (item: PortfolioItem) => void;
  onAddPortfolioItem: (item: PortfolioItem) => void;
  onDeletePortfolioItem: (id: string) => void;
  onSetAllPortfolioToMaster: () => void;
  leads: AppointmentInquiry[];
  onUpdateLeadStatus: (id: string, status: CRMLeadStatus) => void;
  onUpdateLeadNotes: (id: string, notes: string) => void;
  onDeleteLead: (id: string) => void;
  onAddManualLead: (lead: AppointmentInquiry) => void;
  mediaAssets: MediaAsset[];
  onAddMedia: (asset: MediaAsset) => void;
  onDeleteMedia: (id: string) => void;
  onApplyMasterToAll: () => void;
  services: ServiceOption[];
  onUpdateServices: (services: ServiceOption[]) => void;
  onResetToDefaults: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onChangeTab,
  onExitAdmin,
  studioMeta,
  onSaveMeta,
  portfolioItems,
  onUpdatePortfolioItem,
  onAddPortfolioItem,
  onDeletePortfolioItem,
  onSetAllPortfolioToMaster,
  leads,
  onUpdateLeadStatus,
  onUpdateLeadNotes,
  onDeleteLead,
  onAddManualLead,
  mediaAssets,
  onAddMedia,
  onDeleteMedia,
  onApplyMasterToAll,
  services,
  onUpdateServices,
  onResetToDefaults,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const navItems: { tab: AdminTab; label: string; icon: string; badge?: number }[] = [
    { tab: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { tab: 'pages', label: 'Pages & Sections', icon: 'auto_stories' },
    { tab: 'portfolio', label: 'Portfolio Works', icon: 'palette', badge: portfolioItems.length },
    { tab: 'crm', label: 'CRM Inquiries & Leads', icon: 'group', badge: leads.length },
    { tab: 'services', label: 'Services & Pricing', icon: 'sell' },
    { tab: 'media', label: 'Media Library', icon: 'photo_library', badge: mediaAssets.length },
    { tab: 'settings', label: 'Settings & Backup', icon: 'settings' },
  ];

  return (
    <div className="min-h-screen bg-[#fff8f6] text-[#201a18] flex flex-col md:flex-row font-sans selection:bg-[#ffdbcd] selection:text-[#370e00]">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#fdf1ec] border-r border-[#dac2b9]/60 flex flex-col justify-between shrink-0 shadow-sm">
        <div>
          {/* Brand header */}
          <div className="p-5 border-b border-[#dac2b9]/60 flex items-center justify-between bg-[#fff8f6]/70">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#803d1d] text-white flex items-center justify-center font-bold text-base shadow-sm font-serif-display">
                F
              </div>
              <div>
                <span className="font-bold text-sm tracking-wide text-[#201a18] block">
                  Flurrygraphy
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#803d1d] font-semibold block">
                  Payload CRM Atelier
                </span>
              </div>
            </div>
          </div>

          {/* Nav List */}
          <nav className="p-3 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#54433c] px-3 py-1.5 block font-semibold">
              Collections &amp; Globals
            </span>
            {navItems.map((item) => {
              const isActive = currentTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => onChangeTab(item.tab)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#803d1d] text-white font-semibold shadow-sm'
                      : 'text-[#54433c] hover:text-[#201a18] hover:bg-[#f8ebe6]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-base">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white font-bold'
                          : 'bg-[#f8ebe6] text-[#803d1d] border border-[#dac2b9]/50 font-semibold'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Action: Return to Public Site */}
        <div className="p-4 border-t border-[#dac2b9]/60 space-y-2 bg-[#fff8f6]/50">
          <button
            onClick={onExitAdmin}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#803d1d] hover:bg-[#8e4d32] text-white text-xs font-semibold transition-all cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">visibility</span>
            <span>← View Live Studio</span>
          </button>
          <span className="text-[10px] text-center text-[#54433c] block font-mono">
            Direct Path: <code className="text-[#803d1d] font-semibold">/admin</code>
          </span>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden bg-[#fff8f6]">
        {/* Top Header */}
        <header className="h-16 bg-[#fff8f6]/95 backdrop-blur-md border-b border-[#dac2b9]/60 px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#54433c] font-semibold">
              Atelier CRM / <span className="text-[#803d1d]">{currentTab}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#e6f4ea] border border-[#a8dab5] text-[10px] font-mono text-[#137333] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#137333] animate-pulse" />
              Live Connected
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onExitAdmin}
              className="text-xs text-[#54433c] hover:text-[#803d1d] hidden sm:flex items-center gap-1 font-semibold uppercase tracking-wider"
            >
              <span>Public Atelier</span>
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </button>

            <div className="flex items-center gap-2.5 pl-4 border-l border-[#dac2b9]/60">
              <div className="w-8 h-8 rounded-full bg-[#803d1d] text-white flex items-center justify-center text-xs font-bold font-serif-display shadow-xs">
                FL
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-semibold text-[#201a18] leading-none">
                  {studioMeta.directorShort} Luna
                </span>
                <span className="text-[10px] text-[#54433c] leading-none mt-1">
                  Creative Director
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Tab View Container */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto max-w-7xl w-full mx-auto">
          {currentTab === 'dashboard' && (
            <AdminDashboard
              studioMeta={studioMeta}
              portfolioItems={portfolioItems}
              leads={leads}
              mediaAssets={mediaAssets}
              onNavigateTab={onChangeTab}
              onUpdateLeadStatus={onUpdateLeadStatus}
              onApplyMasterToAll={onApplyMasterToAll}
            />
          )}

          {currentTab === 'pages' && (
            <AdminPagesEditor
              studioMeta={studioMeta}
              mediaAssets={mediaAssets}
              onSaveMeta={onSaveMeta}
            />
          )}

          {currentTab === 'portfolio' && (
            <AdminPortfolioManager
              items={portfolioItems}
              onUpdateItem={onUpdatePortfolioItem}
              onAddItem={onAddPortfolioItem}
              onDeleteItem={onDeletePortfolioItem}
              onSetAllPortfolioToMaster={onSetAllPortfolioToMaster}
            />
          )}

          {currentTab === 'crm' && (
            <AdminCRMLeads
              leads={leads}
              onUpdateLeadStatus={onUpdateLeadStatus}
              onUpdateLeadNotes={onUpdateLeadNotes}
              onDeleteLead={onDeleteLead}
              onAddManualLead={onAddManualLead}
            />
          )}

          {currentTab === 'services' && (
            <AdminServicesEditor
              services={services}
              onUpdateServices={onUpdateServices}
            />
          )}

          {currentTab === 'media' && (
            <AdminMediaLibrary
              mediaAssets={mediaAssets}
              onAddMedia={onAddMedia}
              onDeleteMedia={onDeleteMedia}
              onApplyMasterToAll={onApplyMasterToAll}
              onAssignImageToHero={(url) => onSaveMeta({ ...studioMeta, heroBanner: url })}
              onAssignImageToAbout={(url) => onSaveMeta({ ...studioMeta, directorBanner: url })}
            />
          )}

          {currentTab === 'settings' && (
            <div className="p-7 rounded-2xl bg-[#f8ebe6] border border-[#dac2b9]/60 text-[#201a18] space-y-6 max-w-2xl shadow-sm">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#803d1d] block mb-1">
                  System Administration
                </span>
                <h3 className="font-serif-display text-2xl text-[#201a18]">
                  Payload CRM Data &amp; Backup
                </h3>
                <p className="text-xs text-[#54433c] mt-1">
                  Backup your atelier records, export database JSON, or restore default studio values.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#dac2b9]/60">
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#fff8f6] border border-[#dac2b9]/60">
                  <div>
                    <h5 className="text-xs font-semibold text-[#201a18]">Export Full Database</h5>
                    <p className="text-[11px] text-[#54433c]">
                      Includes all CRM leads, custom portfolio works, rates, and media assets.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const data = {
                        studioMeta,
                        portfolioItems,
                        leads,
                        services,
                        mediaAssets,
                        exportedAt: new Date().toISOString(),
                      };
                      const blob = new Blob([JSON.stringify(data, null, 2)], {
                        type: 'application/json',
                      });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `flurrygraphy_backup_${Date.now()}.json`;
                      a.click();
                    }}
                    className="px-4 py-2 rounded-lg bg-[#803d1d] hover:bg-[#8e4d32] text-white text-xs font-semibold shadow-xs"
                  >
                    Download JSON
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-[#ffdad6]/40 border border-[#ffb4ab]">
                  <div>
                    <h5 className="text-xs font-semibold text-[#ba1a1a]">
                      Reset to Factory Studio State
                    </h5>
                    <p className="text-[11px] text-[#54433c]">
                      Clears local cache and restores original 14 portfolio cases and settings.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="px-4 py-2 rounded-lg bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs font-semibold shadow-xs"
                  >
                    Reset All
                  </button>
                </div>
              </div>

              {/* Reset Confirm Modal */}
              {showResetConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                  <div className="bg-[#fff8f6] border border-[#dac2b9] p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl">
                    <h4 className="font-serif-display text-lg font-bold text-[#ba1a1a]">
                      Confirm Reset?
                    </h4>
                    <p className="text-xs text-[#54433c]">
                      This will reset all portfolio items, leads, and page content back to the default initial values.
                    </p>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        onClick={() => setShowResetConfirm(false)}
                        className="px-4 py-1.5 text-xs text-[#54433c] hover:text-[#201a18]"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          onResetToDefaults();
                          setShowResetConfirm(false);
                        }}
                        className="bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs font-semibold px-4 py-1.5 rounded-lg"
                      >
                        Yes, Reset
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
