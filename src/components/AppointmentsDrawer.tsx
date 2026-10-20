import React from 'react';
import { AppointmentInquiry } from '../types';
import { SERVICE_OPTIONS } from '../data/studioData';

interface AppointmentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: AppointmentInquiry[];
  onDeleteAppointment: (id: string) => void;
  onNewBookingClick: () => void;
}

export const AppointmentsDrawer: React.FC<AppointmentsDrawerProps> = ({
  isOpen,
  onClose,
  appointments,
  onDeleteAppointment,
  onNewBookingClick,
}) => {
  if (!isOpen) return null;

  const handleCopySummary = (app: AppointmentInquiry) => {
    const summaryText = `--- FLURRYGRAPHY APPOINTMENT INQUIRY ---
Inquiry ID: ${app.id}
Client: ${app.clientName}
Email: ${app.email}
Target Launch: ${app.targetLaunchDate}
Budget: ${app.budgetTier}
Estimated Investment: $${app.estimatedTotal} USD
Focus Services: ${app.selectedServices
      .map((sId) => SERVICE_OPTIONS.find((s) => s.id === sId)?.name || sId)
      .join(', ')}
Status: ${app.status}
Notes: ${app.projectDescription || 'None provided'}
Date Logged: ${app.createdAt}`;

    navigator.clipboard.writeText(summaryText);
    alert('Appointment summary copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#fff8f6] h-full shadow-2xl border-l border-[#dac2b9] flex flex-col justify-between overflow-hidden">
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#dac2b9]/40 flex items-center justify-between bg-[#fdf1ec]">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-[#803d1d] text-white flex items-center justify-center text-sm">
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            </span>
            <div>
              <h3 className="font-serif-display text-lg text-[#201a18]">
                Atelier Inquiries
              </h3>
              <p className="text-[11px] text-[#54433c]">
                {appointments.length} active consultation docket(s)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#fff8f6] text-[#201a18] flex items-center justify-center hover:bg-[#f8ebe6] transition-colors"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {appointments.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <span className="material-symbols-outlined text-4xl text-[#dac2b9]">
                event_busy
              </span>
              <p className="text-sm text-[#201a18] font-medium">No appointments logged yet.</p>
              <p className="text-xs text-[#54433c] max-w-xs mx-auto">
                Schedule a 1-on-1 brand discovery session to discuss your bespoke identity or packaging project.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNewBookingClick();
                }}
                className="mt-2 bg-[#803d1d] text-white text-xs font-semibold uppercase tracking-wider px-5 py-2 rounded-full hover:bg-[#8e4d32]"
              >
                Schedule Session
              </button>
            </div>
          ) : (
            appointments.map((app) => (
              <div
                key={app.id}
                className="p-4 rounded-xl bg-[#f8ebe6] border border-[#dac2b9]/60 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#803d1d] block">
                      {app.id}
                    </span>
                    <h4 className="font-serif-display text-base text-[#201a18]">
                      {app.clientName}
                    </h4>
                    <span className="text-xs text-[#54433c]">{app.email}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#ffdbcd] text-[#803d1d] text-[10px] font-bold uppercase">
                    {app.status}
                  </span>
                </div>

                <div className="text-xs space-y-1 text-[#54433c] border-t border-[#dac2b9]/40 pt-2">
                  <div className="flex justify-between">
                    <span>Target Date:</span>
                    <strong className="text-[#201a18]">{app.targetLaunchDate}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Total:</span>
                    <strong className="text-[#803d1d]">${app.estimatedTotal} USD</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Services:</span>
                    <span className="text-[#201a18] truncate max-w-[180px]">
                      {app.selectedServices
                        .map((sId) => SERVICE_OPTIONS.find((s) => s.id === sId)?.name || sId)
                        .join(', ')}
                    </span>
                  </div>
                </div>

                {app.projectDescription && (
                  <p className="text-[11px] text-[#54433c] bg-[#fff8f6] p-2.5 rounded-lg border border-[#dac2b9]/40 italic">
                    "{app.projectDescription}"
                  </p>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-[#dac2b9]/40 text-xs">
                  <button
                    onClick={() => handleCopySummary(app)}
                    className="text-[#803d1d] hover:underline flex items-center gap-1 font-semibold text-[11px]"
                  >
                    <span className="material-symbols-outlined text-sm">content_copy</span>
                    <span>Copy Summary</span>
                  </button>
                  <button
                    onClick={() => onDeleteAppointment(app.id)}
                    className="text-red-700 hover:underline text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-[#dac2b9]/40 bg-[#fdf1ec] flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onNewBookingClick();
            }}
            className="w-full bg-[#803d1d] text-white text-xs font-semibold uppercase tracking-wider py-2.5 rounded-full hover:bg-[#8e4d32] text-center"
          >
            + Add New Appointment
          </button>
        </div>
      </div>
    </div>
  );
};
