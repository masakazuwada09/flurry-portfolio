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
  onLogout: () => void;
  adminCredentials: { username: string; password: string };
  onUpdatePassword: (newPassword: string) => void;
  onResetPasswordToDefault: () => void;
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
  onLogout,
  adminCredentials,
  onUpdatePassword,
  onResetPasswordToDefault,
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
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPassFields, setShowPassFields] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);

    if (currentPass !== adminCredentials.password) {
      setPasswordStatus({
        type: 'error',
        message: 'The current password you entered is incorrect.',
      });
      return;
    }

    if (newPass.length < 4) {
      setPasswordStatus({
        type: 'error',
        message: 'New password must be at least 4 characters long.',
      });
      return;
    }

    if (newPass !== confirmPass) {
      setPasswordStatus({
        type: 'error',
        message: 'New password and confirmation do not match.',
      });
      return;
    }

    onUpdatePassword(newPass);
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
    setPasswordStatus({
      type: 'success',
      message: 'Password updated successfully! Use your new password on next login.',
    });
  };
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(() => {
    try {
      return localStorage.getItem('flurry_admin_sidebar_minimized') === 'true';
    } catch {
      return false;
    }
  });

  const toggleSidebar = () => {
    setIsSidebarMinimized((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('flurry_admin_sidebar_minimized', String(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

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
      <aside
        className={`w-full ${
          isSidebarMinimized ? 'md:w-20' : 'md:w-64'
        } transition-all duration-300 ease-in-out bg-[#fdf1ec] border-r border-[#dac2b9]/60 flex flex-col justify-between shrink-0 shadow-sm z-20`}
      >
        <div>
          {/* Brand header */}
          <div
            className={`p-4 border-b border-[#dac2b9]/60 flex items-center ${
              isSidebarMinimized ? 'justify-center' : 'justify-start'
            } bg-[#fff8f6]/70 transition-all`}
          >
            <div className={`flex items-center gap-3 ${isSidebarMinimized ? 'justify-center' : ''}`}>
              <div
                className="w-9 h-9 rounded-xl bg-[#803d1d] text-white flex items-center justify-center font-bold text-base shadow-sm font-serif-display shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={toggleSidebar}
                title={isSidebarMinimized ? 'Click to expand sidebar' : 'Flurrygraphy Atelier'}
              >
                F
              </div>
              {!isSidebarMinimized && (
                <div className="overflow-hidden">
                  <span className="font-bold text-sm tracking-wide text-[#201a18] block whitespace-nowrap">
                    Flurrygraphy
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#803d1d] font-semibold block whitespace-nowrap">
                    Payload CRM Atelier
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Nav List */}
          <nav className="p-3 space-y-1.5">
            {!isSidebarMinimized ? (
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#54433c] px-3 py-1.5 block font-semibold truncate">
                Collections &amp; Globals
              </span>
            ) : (
              <div className="h-2 hidden md:block" />
            )}
            {navItems.map((item) => {
              const isActive = currentTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => onChangeTab(item.tab)}
                  title={item.label + (item.badge !== undefined ? ` (${item.badge})` : '')}
                  className={`w-full relative group flex items-center ${
                    isSidebarMinimized
                      ? 'justify-center md:justify-center px-3 py-2.5 md:py-3 md:px-0'
                      : 'justify-between px-3 py-2.5'
                  } rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#803d1d] text-white font-semibold shadow-sm'
                      : 'text-[#54433c] hover:text-[#201a18] hover:bg-[#f8ebe6]'
                  }`}
                >
                  <div
                    className={`flex items-center ${
                      isSidebarMinimized
                        ? 'justify-center relative'
                        : 'gap-2.5'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg shrink-0">
                      {item.icon}
                    </span>
                    {!isSidebarMinimized && (
                      <span className="truncate">{item.label}</span>
                    )}

                    {/* Minimized notification dot/badge */}
                    {isSidebarMinimized && item.badge !== undefined && item.badge > 0 && (
                      <span
                        className={`hidden md:flex absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full text-[9px] font-mono items-center justify-center font-bold ${
                          isActive
                            ? 'bg-white text-[#803d1d]'
                            : 'bg-[#803d1d] text-white shadow-xs'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {!isSidebarMinimized && item.badge !== undefined && (
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

                  {/* Floating tooltip on hover when minimized */}
                  {isSidebarMinimized && (
                    <div className="hidden md:flex absolute left-full ml-3 px-3 py-1.5 bg-[#201a18] text-white text-[11px] font-sans font-medium rounded-lg whitespace-nowrap shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-all z-50 items-center gap-1.5 translate-x-1 group-hover:translate-x-0">
                      <span>{item.label}</span>
                      {item.badge !== undefined && (
                        <span className="px-1.5 py-0.5 bg-[#803d1d] text-white text-[9px] font-mono rounded-full font-bold">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Action: Return to Public Site */}
        <div
          className={`p-3 border-t border-[#dac2b9]/60 bg-[#fff8f6]/50 flex flex-col items-center space-y-2`}
        >
          <button
            onClick={onExitAdmin}
            title="Return to Public Live Studio"
            className={`w-full relative group flex items-center justify-center gap-2 ${
              isSidebarMinimized ? 'p-2.5 md:p-3' : 'px-4 py-2.5'
            } rounded-xl bg-[#803d1d] hover:bg-[#8e4d32] text-white text-xs font-semibold transition-all cursor-pointer shadow-sm`}
          >
            <span className="material-symbols-outlined text-sm">visibility</span>
            {!isSidebarMinimized && <span>← View Live Studio</span>}
            {isSidebarMinimized && (
              <div className="hidden md:block absolute left-full ml-3 px-3 py-1.5 bg-[#201a18] text-white text-[11px] font-sans font-medium rounded-lg whitespace-nowrap shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-all z-50">
                ← View Live Studio
              </div>
            )}
          </button>

          {!isSidebarMinimized && (
            <span className="text-[10px] text-center text-[#54433c] block font-mono">
              Direct Path: <code className="text-[#803d1d] font-semibold">/admin</code>
            </span>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden bg-[#fff8f6]">
        {/* Top Header */}
        <header className="h-16 bg-[#fff8f6]/95 backdrop-blur-md border-b border-[#dac2b9]/60 px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-3">
            {/* Menu button to minimize/maximize from top header */}
            <button
              onClick={toggleSidebar}
              className="p-2 -ml-2 rounded-xl text-[#54433c] hover:text-[#803d1d] hover:bg-[#f8ebe6] transition-colors cursor-pointer flex items-center justify-center"
              title={isSidebarMinimized ? 'Maximize sidebar menu' : 'Minimize sidebar menu'}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-xl">
                {isSidebarMinimized ? 'menu' : 'menu_open'}
              </span>
            </button>

            <span className="text-xs font-mono uppercase tracking-wider text-[#54433c] font-semibold">
              Atelier CRM / <span className="text-[#803d1d]">{currentTab}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#e6f4ea] border border-[#a8dab5] text-[10px] font-mono text-[#137333] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#137333] animate-pulse" />
              Live Connected
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onExitAdmin}
              className="text-xs text-[#54433c] hover:text-[#803d1d] hidden sm:flex items-center gap-1 font-semibold uppercase tracking-wider"
            >
              <span>Public Atelier</span>
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </button>

            <button
              onClick={onLogout}
              className="px-3 py-1.5 rounded-lg border border-[#dac2b9]/80 text-[#ba1a1a] hover:bg-[#ffdad6]/40 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Sign out of Payload CRM"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              <span className="hidden sm:inline">Sign Out</span>
            </button>

            <div className="flex items-center gap-2.5 pl-3 border-l border-[#dac2b9]/60">
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
            <div className="space-y-8 max-w-2xl">
              {/* Security & Password Change */}
              <div className="p-7 rounded-2xl bg-[#fff8f6] border border-[#dac2b9]/80 text-[#201a18] space-y-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#803d1d] block mb-1 font-mono">
                      Security &amp; Credentials
                    </span>
                    <h3 className="font-serif-display text-2xl text-[#201a18]">
                      Change CRM Password
                    </h3>
                    <p className="text-xs text-[#54433c] mt-1">
                      Update your administrator password for accessing the Flurrygraphy Payload CRM at <code className="text-[#803d1d] font-semibold">/admin</code>.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#f8ebe6] text-[#803d1d] border border-[#dac2b9]/60 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">key</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#f8ebe6]/80 border border-[#dac2b9]/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#803d1d] text-white flex items-center justify-center font-bold text-xs">
                      AD
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#201a18] block">
                        Username: <strong className="text-[#803d1d]">{adminCredentials.username}</strong>
                      </span>
                      <span className="text-[11px] text-[#54433c] block">
                        Master Studio Administrator
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#e6f4ea] text-[#137333] border border-[#a8dab5] text-[10px] font-mono font-semibold">
                    Active Account
                  </span>
                </div>

                {passwordStatus && (
                  <div
                    className={`p-3.5 rounded-xl text-xs flex items-center gap-2.5 ${
                      passwordStatus.type === 'success'
                        ? 'bg-[#e6f4ea] border border-[#a8dab5] text-[#137333]'
                        : 'bg-[#ffdad6]/60 border border-[#ffb4ab] text-[#ba1a1a]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base shrink-0">
                      {passwordStatus.type === 'success' ? 'check_circle' : 'error'}
                    </span>
                    <span>{passwordStatus.message}</span>
                  </div>
                )}

                <form onSubmit={handlePasswordChangeSubmit} className="space-y-4 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-[#201a18] mb-1.5">
                      Current Password
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-base text-[#54433c]">
                        lock
                      </span>
                      <input
                        type={showPassFields ? 'text' : 'password'}
                        required
                        value={currentPass}
                        onChange={(e) => setCurrentPass(e.target.value)}
                        placeholder="Current password (default: flurrygraphy)"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#dac2b9] focus:outline-none focus:border-[#803d1d] text-xs text-[#201a18]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#201a18] mb-1.5">
                        New Password
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-base text-[#54433c]">
                          key
                        </span>
                        <input
                          type={showPassFields ? 'text' : 'password'}
                          required
                          value={newPass}
                          onChange={(e) => setNewPass(e.target.value)}
                          placeholder="New password (min 4 chars)"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#dac2b9] focus:outline-none focus:border-[#803d1d] text-xs text-[#201a18]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#201a18] mb-1.5">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-base text-[#54433c]">
                          password
                        </span>
                        <input
                          type={showPassFields ? 'text' : 'password'}
                          required
                          value={confirmPass}
                          onChange={(e) => setConfirmPass(e.target.value)}
                          placeholder="Repeat new password"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#dac2b9] focus:outline-none focus:border-[#803d1d] text-xs text-[#201a18]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-[#54433c]">
                      <input
                        type="checkbox"
                        checked={showPassFields}
                        onChange={(e) => setShowPassFields(e.target.checked)}
                        className="rounded border-[#dac2b9] text-[#803d1d] focus:ring-[#803d1d]"
                      />
                      <span>Show passwords</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        onResetPasswordToDefault();
                        setCurrentPass('');
                        setNewPass('');
                        setConfirmPass('');
                        setPasswordStatus({
                          type: 'success',
                          message: 'Password reset to factory default: "flurrygraphy"',
                        });
                      }}
                      className="text-[11px] text-[#803d1d] hover:underline font-mono"
                    >
                      Reset to default (flurrygraphy)
                    </button>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#803d1d] hover:bg-[#8e4d32] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">lock_reset</span>
                      <span>Update Password</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Data & Backup */}
              <div className="p-7 rounded-2xl bg-[#f8ebe6] border border-[#dac2b9]/60 text-[#201a18] space-y-6 shadow-sm">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#803d1d] block mb-1 font-mono">
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

