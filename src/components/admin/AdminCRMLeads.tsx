import React, { useState } from 'react';
import { AppointmentInquiry, CRMLeadStatus } from '../../types';
import { SERVICE_OPTIONS } from '../../data/studioData';

interface AdminCRMLeadsProps {
  leads: AppointmentInquiry[];
  onUpdateLeadStatus: (id: string, status: CRMLeadStatus) => void;
  onUpdateLeadNotes: (id: string, notes: string) => void;
  onDeleteLead: (id: string) => void;
  onAddManualLead: (lead: AppointmentInquiry) => void;
}

export const AdminCRMLeads: React.FC<AdminCRMLeadsProps> = ({
  leads,
  onUpdateLeadStatus,
  onUpdateLeadNotes,
  onDeleteLead,
  onAddManualLead,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<AppointmentInquiry | null>(null);
  const [notesDraft, setNotesDraft] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Lead form state
  const [newClientName, setNewClientName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newServices, setNewServices] = useState<string[]>(['branding-kit']);
  const [newBudget, setNewBudget] = useState('Standard Identity Suite ($800 - $2,000)');
  const [newTargetDate, setNewTargetDate] = useState('');
  const [newBrief, setNewBrief] = useState('');

  const statuses: { key: string; label: string }[] = [
    { key: 'all', label: 'All Leads' },
    { key: 'Pending Discovery', label: 'Pending Discovery' },
    { key: 'Reviewed', label: 'Reviewed' },
    { key: 'Proposal Sent', label: 'Proposal Sent' },
    { key: 'Contract Signed', label: 'Contract Signed' },
    { key: 'Completed', label: 'Completed' },
    { key: 'Archived', label: 'Archived' },
  ];

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    const matchesSearch =
      searchQuery === '' ||
      lead.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalPipelineValue = leads.reduce((sum, lead) => sum + (lead.estimatedTotal || 0), 0);

  const handleOpenLead = (lead: AppointmentInquiry) => {
    setSelectedLead(lead);
    setNotesDraft(lead.adminNotes || '');
  };

  const handleSaveNotes = () => {
    if (selectedLead) {
      onUpdateLeadNotes(selectedLead.id, notesDraft);
      setSelectedLead({ ...selectedLead, adminNotes: notesDraft });
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Client Name', 'Email', 'Status', 'Estimated Total', 'Services', 'Date'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.clientName}"`,
      l.email,
      l.status,
      l.estimatedTotal,
      `"${l.selectedServices.join(', ')}"`,
      l.createdAt,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `flurrygraphy_crm_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newEmail) return;

    const lead: AppointmentInquiry = {
      id: `inq-crm-${Date.now().toString(36)}`,
      clientName: newClientName,
      email: newEmail,
      phone: newPhone,
      selectedServices: newServices,
      targetLaunchDate: newTargetDate || 'Flexible',
      budgetTier: newBudget,
      estimatedTotal: newServices.reduce((acc, sId) => {
        const s = SERVICE_OPTIONS.find((opt) => opt.id === sId);
        return acc + (s ? s.basePrice : 400);
      }, 0),
      projectDescription: newBrief,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      status: 'Pending Discovery',
    };

    onAddManualLead(lead);
    setShowAddModal(false);
    setNewClientName('');
    setNewEmail('');
    setNewPhone('');
    setNewBrief('');
  };

  return (
    <div className="space-y-6">
      {/* Top Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#f8ebe6] border border-[#dac2b9]/60 text-[#201a18] shadow-sm">
          <span className="text-[10px] font-mono text-[#54433c] uppercase font-bold tracking-wider">
            Total Leads
          </span>
          <h3 className="font-serif-display text-2xl font-bold mt-1 text-[#201a18]">
            {leads.length}
          </h3>
          <span className="text-[10px] text-[#803d1d] font-semibold">Active Studio Funnel</span>
        </div>
        <div className="p-5 rounded-2xl bg-[#f8ebe6] border border-[#dac2b9]/60 text-[#201a18] shadow-sm">
          <span className="text-[10px] font-mono text-[#54433c] uppercase font-bold tracking-wider">
            Pipeline Value
          </span>
          <h3 className="font-serif-display text-2xl font-bold mt-1 text-[#803d1d]">
            ${totalPipelineValue.toLocaleString()} USD
          </h3>
          <span className="text-[10px] text-[#54433c]">Estimated packages</span>
        </div>
        <div className="p-5 rounded-2xl bg-[#f8ebe6] border border-[#dac2b9]/60 text-[#201a18] shadow-sm">
          <span className="text-[10px] font-mono text-[#54433c] uppercase font-bold tracking-wider">
            Pending Discovery
          </span>
          <h3 className="font-serif-display text-2xl font-bold mt-1 text-[#8e4d32]">
            {leads.filter((l) => l.status === 'Pending Discovery').length}
          </h3>
          <span className="text-[10px] text-[#8e4d32] font-semibold">24hr turnaround</span>
        </div>
        <div className="p-5 rounded-2xl bg-[#f8ebe6] border border-[#dac2b9]/60 text-[#201a18] shadow-sm">
          <span className="text-[10px] font-mono text-[#54433c] uppercase font-bold tracking-wider">
            Signed / Active
          </span>
          <h3 className="font-serif-display text-2xl font-bold mt-1 text-[#137333]">
            {leads.filter((l) => l.status === 'Contract Signed').length}
          </h3>
          <span className="text-[10px] text-[#137333] font-semibold">In production</span>
        </div>
      </div>

      {/* Action Header & Search */}
      <div className="p-5 rounded-2xl bg-[#f8ebe6] border border-[#dac2b9]/60 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
          {statuses.map((st) => (
            <button
              key={st.key}
              onClick={() => setFilterStatus(st.key)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                filterStatus === st.key
                  ? 'bg-[#803d1d] text-white shadow-xs'
                  : 'bg-[#fff8f6] text-[#54433c] hover:text-[#201a18] border border-[#dac2b9]/50'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3.5 py-1.5 text-xs bg-[#fff8f6] border border-[#dac2b9] rounded-xl text-[#201a18] placeholder:text-[#54433c]/60 focus:outline-none focus:border-[#803d1d] transition-colors"
          />
          <button
            onClick={handleExportCSV}
            title="Export to CSV"
            className="px-3.5 py-1.5 rounded-xl bg-[#fff8f6] hover:bg-[#f2e6e1] text-[#201a18] border border-[#dac2b9] text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-sm text-[#803d1d]">download</span>
            <span>Export</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#803d1d] hover:bg-[#8e4d32] text-white text-xs font-semibold px-4 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer uppercase tracking-wider shadow-xs"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Leads Table */}
      <div className="rounded-2xl bg-[#fff8f6] border border-[#dac2b9]/60 overflow-hidden text-[#201a18] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f8ebe6] text-[#54433c] uppercase text-[10px] tracking-wider border-b border-[#dac2b9]/60 font-semibold">
              <tr>
                <th className="py-3 px-4">Lead ID</th>
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">Services</th>
                <th className="py-3 px-4">Est. Value</th>
                <th className="py-3 px-4">Target Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dac2b9]/40">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-[#54433c]">
                    No leads found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => handleOpenLead(lead)}
                    className="hover:bg-[#f8ebe6]/80 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-[#803d1d]">{lead.id}</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold block text-[#201a18]">{lead.clientName}</span>
                      <span className="text-[11px] text-[#54433c]">{lead.email}</span>
                    </td>
                    <td className="py-3 px-4 max-w-[200px] truncate text-[#54433c]">
                      {lead.selectedServices
                        .map((sId) => SERVICE_OPTIONS.find((s) => s.id === sId)?.name || sId)
                        .join(', ')}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-[#803d1d]">
                      ${lead.estimatedTotal} USD
                    </td>
                    <td className="py-3 px-4 text-[#54433c]">{lead.targetLaunchDate}</td>
                    <td className="py-3 px-4">
                      <select
                        value={lead.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as CRMLeadStatus)}
                        className="bg-[#f8ebe6] text-[#201a18] text-[11px] border border-[#dac2b9] rounded-lg px-2.5 py-1 font-medium focus:outline-none focus:border-[#803d1d]"
                      >
                        <option value="Pending Discovery">Pending Discovery</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Contract Signed">Contract Signed</option>
                        <option value="Completed">Completed</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onDeleteLead(lead.id)}
                        className="text-[#54433c] hover:text-[#ba1a1a] p-1 rounded transition-colors"
                        title="Delete lead"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Lead Inspector Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#fff8f6] border-l border-[#dac2b9] text-[#201a18] p-6 sm:p-8 shadow-2xl flex flex-col justify-between overflow-y-auto space-y-6">
            <div>
              <div className="flex items-center justify-between border-b border-[#dac2b9]/60 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#803d1d] font-bold uppercase tracking-wider">
                    {selectedLead.id}
                  </span>
                  <h3 className="font-serif-display text-2xl font-bold text-[#201a18]">
                    {selectedLead.clientName}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="w-8 h-8 rounded-full bg-[#f8ebe6] text-[#201a18] hover:bg-[#f2e6e1] flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>

              <div className="space-y-4 pt-4 text-xs">
                <div className="grid grid-cols-2 gap-3 p-4 bg-[#f8ebe6] rounded-2xl border border-[#dac2b9]/50">
                  <div>
                    <span className="text-[#54433c] block text-[10px] uppercase font-semibold">
                      Email
                    </span>
                    <a href={`mailto:${selectedLead.email}`} className="text-[#803d1d] font-semibold hover:underline">
                      {selectedLead.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-[#54433c] block text-[10px] uppercase font-semibold">
                      Target Date
                    </span>
                    <span className="text-[#201a18] font-medium">{selectedLead.targetLaunchDate}</span>
                  </div>
                  <div>
                    <span className="text-[#54433c] block text-[10px] uppercase font-semibold">
                      Budget Tier
                    </span>
                    <span className="text-[#201a18] font-medium">{selectedLead.budgetTier}</span>
                  </div>
                  <div>
                    <span className="text-[#54433c] block text-[10px] uppercase font-semibold">
                      Est. Investment
                    </span>
                    <span className="text-[#803d1d] font-mono font-bold">${selectedLead.estimatedTotal} USD</span>
                  </div>
                </div>

                <div>
                  <span className="text-[#54433c] block text-[10px] uppercase font-semibold mb-1">
                    Requested Services
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedLead.selectedServices.map((sId) => (
                      <span key={sId} className="px-2.5 py-1 rounded-lg bg-[#f8ebe6] border border-[#dac2b9]/50 text-[#201a18] text-[11px] font-medium">
                        {SERVICE_OPTIONS.find((s) => s.id === sId)?.name || sId}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedLead.projectDescription && (
                  <div>
                    <span className="text-[#54433c] block text-[10px] uppercase font-semibold mb-1">
                      Client Project Brief
                    </span>
                    <p className="p-3.5 bg-[#f8ebe6] border border-[#dac2b9]/50 rounded-xl text-[#201a18] italic leading-relaxed">
                      "{selectedLead.projectDescription}"
                    </p>
                  </div>
                )}

                {/* Internal Admin Notes */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#803d1d] font-bold uppercase text-[10px] tracking-wider">
                      Internal Atelier CRM Notes
                    </span>
                    <button
                      onClick={handleSaveNotes}
                      className="bg-[#803d1d] hover:bg-[#8e4d32] text-white text-[10px] uppercase font-bold px-3 py-1 rounded-lg transition-colors cursor-pointer"
                    >
                      Save Notes
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={notesDraft}
                    onChange={(e) => setNotesDraft(e.target.value)}
                    placeholder="Add consultation notes, follow-up deadlines, proposal links, contract notes..."
                    className="w-full px-3 py-2 text-xs bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] placeholder:text-[#54433c]/50 focus:outline-none focus:border-[#803d1d]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#dac2b9]/60 flex items-center justify-between">
              <span className="text-[11px] text-[#54433c]">Created {selectedLead.createdAt}</span>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-[#f8ebe6] hover:bg-[#f2e6e1] text-[#201a18] border border-[#dac2b9] rounded-xl transition-colors cursor-pointer"
              >
                Close Docket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Manual Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#fff8f6] border border-[#dac2b9] text-[#201a18] max-w-md w-full p-6 sm:p-8 rounded-2xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#dac2b9]/60 pb-3">
              <h4 className="font-serif-display text-lg font-bold text-[#201a18]">
                Log New Consultation Lead
              </h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-[#f8ebe6] text-[#201a18] flex items-center justify-center hover:bg-[#f2e6e1]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="space-y-3 text-xs">
              <div>
                <label className="text-[#201a18] font-semibold block mb-1">Client Full Name *</label>
                <input
                  type="text"
                  required
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] focus:outline-none focus:border-[#803d1d]"
                />
              </div>
              <div>
                <label className="text-[#201a18] font-semibold block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] focus:outline-none focus:border-[#803d1d]"
                />
              </div>
              <div>
                <label className="text-[#201a18] font-semibold block mb-1">Phone / WhatsApp</label>
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] focus:outline-none focus:border-[#803d1d]"
                />
              </div>
              <div>
                <label className="text-[#201a18] font-semibold block mb-1">Project Brief</label>
                <textarea
                  rows={2}
                  value={newBrief}
                  onChange={(e) => setNewBrief(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] focus:outline-none focus:border-[#803d1d]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-[#dac2b9]/60">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs text-[#54433c] hover:text-[#201a18]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#803d1d] hover:bg-[#8e4d32] text-white text-xs font-semibold px-5 py-2 rounded-xl shadow-xs"
                >
                  Create Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
