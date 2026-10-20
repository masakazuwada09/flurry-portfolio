import React from 'react';
import { AppointmentInquiry, PortfolioItem, MediaAsset, StudioMeta, AdminTab, CRMLeadStatus } from '../../types';

interface AdminDashboardProps {
  studioMeta: StudioMeta;
  portfolioItems: PortfolioItem[];
  leads: AppointmentInquiry[];
  mediaAssets: MediaAsset[];
  onNavigateTab: (tab: AdminTab) => void;
  onUpdateLeadStatus: (id: string, status: CRMLeadStatus) => void;
  onApplyMasterToAll: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  studioMeta,
  portfolioItems,
  leads,
  mediaAssets,
  onNavigateTab,
  onUpdateLeadStatus,
  onApplyMasterToAll,
}) => {
  const pendingLeads = leads.filter((l) => l.status === 'Pending Discovery');
  const pipelineValue = leads.reduce((sum, l) => sum + (l.estimatedTotal || 0), 0);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#f8ebe6] border border-[#dac2b9]/70 text-[#201a18] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdbcd] text-[#803d1d] text-[11px] font-mono uppercase tracking-wider font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#803d1d] animate-pulse" />
            <span>Payload CRM Atelier Engine • Production</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl text-[#201a18] tracking-tight">
            Welcome back, {studioMeta.directorShort}
          </h2>
          <p className="text-xs sm:text-sm text-[#54433c] max-w-xl leading-relaxed">
            Manage your boutique atelier portfolio, incoming client discovery bookings, media assets, and editorial copy in one centralized warm dashboard.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onApplyMasterToAll}
            className="bg-[#803d1d] hover:bg-[#8e4d32] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
          >
            <span className="material-symbols-outlined text-sm">auto_fix_high</span>
            <span>Align All Images to Master</span>
          </button>
          <button
            onClick={() => onNavigateTab('crm')}
            className="bg-[#f2e6e1] hover:bg-[#ece0db] text-[#201a18] border border-[#dac2b9]/60 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 uppercase tracking-wider"
          >
            <span className="material-symbols-outlined text-sm">group</span>
            <span>View All Leads ({leads.length})</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigateTab('crm')}
          className="p-5 rounded-2xl bg-[#f8ebe6] border border-[#dac2b9]/60 hover:border-[#803d1d] text-[#201a18] cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm"
        >
          <div className="flex items-center justify-between text-[#54433c] text-xs">
            <span className="font-mono uppercase text-[10px] font-semibold tracking-wider">
              CRM Pipeline Value
            </span>
            <span className="material-symbols-outlined text-base text-[#803d1d]">
              payments
            </span>
          </div>
          <h3 className="font-serif-display text-2xl sm:text-3xl font-bold mt-2 text-[#803d1d]">
            ${pipelineValue.toLocaleString()} USD
          </h3>
          <span className="text-[11px] text-[#54433c] mt-1 block">
            {leads.length} recorded inquiries
          </span>
        </div>

        <div
          onClick={() => onNavigateTab('crm')}
          className="p-5 rounded-2xl bg-[#f8ebe6] border border-[#dac2b9]/60 hover:border-[#803d1d] text-[#201a18] cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm"
        >
          <div className="flex items-center justify-between text-[#54433c] text-xs">
            <span className="font-mono uppercase text-[10px] font-semibold tracking-wider">
              Pending Discovery
            </span>
            <span className="material-symbols-outlined text-base text-[#8e4d32]">
              schedule
            </span>
          </div>
          <h3 className="font-serif-display text-2xl sm:text-3xl font-bold mt-2 text-[#8e4d32]">
            {pendingLeads.length}
          </h3>
          <span className="text-[11px] text-[#8e4d32] mt-1 block font-medium">
            Awaiting director reply
          </span>
        </div>

        <div
          onClick={() => onNavigateTab('portfolio')}
          className="p-5 rounded-2xl bg-[#f8ebe6] border border-[#dac2b9]/60 hover:border-[#803d1d] text-[#201a18] cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm"
        >
          <div className="flex items-center justify-between text-[#54433c] text-xs">
            <span className="font-mono uppercase text-[10px] font-semibold tracking-wider">
              Selected Works
            </span>
            <span className="material-symbols-outlined text-base text-[#6d4820]">
              grid_view
            </span>
          </div>
          <h3 className="font-serif-display text-2xl sm:text-3xl font-bold mt-2 text-[#201a18]">
            {portfolioItems.length}
          </h3>
          <span className="text-[11px] text-[#54433c] mt-1 block">
            Live published cases
          </span>
        </div>

        <div
          onClick={() => onNavigateTab('media')}
          className="p-5 rounded-2xl bg-[#f8ebe6] border border-[#dac2b9]/60 hover:border-[#803d1d] text-[#201a18] cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm"
        >
          <div className="flex items-center justify-between text-[#54433c] text-xs">
            <span className="font-mono uppercase text-[10px] font-semibold tracking-wider">
              Media Assets
            </span>
            <span className="material-symbols-outlined text-base text-[#803d1d]">
              photo_library
            </span>
          </div>
          <h3 className="font-serif-display text-2xl sm:text-3xl font-bold mt-2 text-[#201a18]">
            {mediaAssets.length}
          </h3>
          <span className="text-[11px] text-[#54433c] mt-1 block">
            Artwork &amp; banners
          </span>
        </div>
      </div>

      {/* Two Column Layout: Recent Leads + Quick Studio Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Inquiries */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#fff8f6] border border-[#dac2b9]/60 text-[#201a18] space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#dac2b9]/50 pb-3">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#803d1d]">
                Recent Appointment Bookings &amp; Inquiries
              </h4>
              <span className="text-xs text-[#54433c]">Latest client project leads</span>
            </div>
            <button
              onClick={() => onNavigateTab('crm')}
              className="text-xs text-[#803d1d] hover:underline font-semibold"
            >
              Open Pipeline →
            </button>
          </div>

          <div className="space-y-3">
            {leads.slice(0, 4).map((lead) => (
              <div
                key={lead.id}
                className="p-3.5 rounded-xl bg-[#f8ebe6] border border-[#dac2b9]/50 flex items-center justify-between gap-3 text-xs shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#201a18]">{lead.clientName}</span>
                    <span className="font-mono text-[10px] text-[#803d1d] font-bold">
                      {lead.id}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#54433c] block">{lead.email}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-[#803d1d]">
                    ${lead.estimatedTotal} USD
                  </span>
                  <select
                    value={lead.status}
                    onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as CRMLeadStatus)}
                    className="bg-[#fff8f6] text-[#201a18] text-[11px] border border-[#dac2b9] rounded-lg px-2 py-1 font-medium focus:outline-none focus:border-[#803d1d]"
                  >
                    <option value="Pending Discovery">Pending Discovery</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Contract Signed">Contract Signed</option>
                    <option value="Completed">Completed</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Collections & Pages Navigation */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#fff8f6] border border-[#dac2b9]/60 text-[#201a18] space-y-4 shadow-sm">
          <div className="border-b border-[#dac2b9]/50 pb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#803d1d]">
              Studio Content Collections
            </h4>
            <span className="text-xs text-[#54433c]">Quick navigation into CMS collections</span>
          </div>

          <div className="space-y-2.5">
            {[
              {
                title: 'Editorial Pages & Banners',
                desc: 'Hero headline, About narrative, contact details',
                tab: 'pages',
                icon: 'auto_stories',
              },
              {
                title: 'Portfolio Works Collection',
                desc: `${portfolioItems.length} curated case studies`,
                tab: 'portfolio',
                icon: 'palette',
              },
              {
                title: 'Media Library & Uploads',
                desc: 'Upload images from device or web links',
                tab: 'media',
                icon: 'image',
              },
              {
                title: 'Services & Rates',
                desc: 'Package tiers and turnaround duration',
                tab: 'services',
                icon: 'sell',
              },
            ].map((col) => (
              <button
                key={col.tab}
                onClick={() => onNavigateTab(col.tab as AdminTab)}
                className="w-full p-3 rounded-xl bg-[#f8ebe6] hover:bg-[#f2e6e1] border border-[#dac2b9]/50 text-left flex items-center justify-between transition-colors cursor-pointer group shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#803d1d] text-lg">
                    {col.icon}
                  </span>
                  <div>
                    <h5 className="text-xs font-semibold text-[#201a18] group-hover:text-[#803d1d]">
                      {col.title}
                    </h5>
                    <span className="text-[11px] text-[#54433c]">{col.desc}</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-sm text-[#54433c] group-hover:translate-x-1 group-hover:text-[#803d1d] transition-all">
                  arrow_forward
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
