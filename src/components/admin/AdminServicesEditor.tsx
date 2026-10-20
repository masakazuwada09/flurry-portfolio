import React, { useState } from 'react';
import { ServiceOption } from '../../types';

interface AdminServicesEditorProps {
  services: ServiceOption[];
  onUpdateServices: (services: ServiceOption[]) => void;
}

export const AdminServicesEditor: React.FC<AdminServicesEditorProps> = ({
  services,
  onUpdateServices,
}) => {
  const [servicesList, setServicesList] = useState<ServiceOption[]>([...services]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handlePriceChange = (id: string, price: number) => {
    setServicesList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, basePrice: price } : s))
    );
  };

  const handleDurationChange = (id: string, dur: string) => {
    setServicesList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, typicalDuration: dur } : s))
    );
  };

  const handleDescriptionChange = (id: string, desc: string) => {
    setServicesList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, description: desc } : s))
    );
  };

  const handleSave = () => {
    onUpdateServices(servicesList);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 sm:p-8 rounded-2xl bg-[#f8ebe6] border border-[#dac2b9]/60 text-[#201a18] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#803d1d] block mb-1">
            Commercial Offerings
          </span>
          <h3 className="font-serif-display text-2xl text-[#201a18]">
            Services &amp; Pricing Packages
          </h3>
          <p className="text-xs text-[#54433c] mt-0.5">
            Control service base pricing and turnaround timeframes displayed in the public appointment booking calculator.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <span className="text-xs text-[#137333] font-bold animate-pulse">
              ✓ Rates Saved to Live Store!
            </span>
          )}
          <button
            onClick={handleSave}
            className="bg-[#803d1d] hover:bg-[#8e4d32] text-white text-xs font-semibold px-6 py-2.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 uppercase tracking-wider shadow-md"
          >
            <span className="material-symbols-outlined text-sm">save</span>
            <span>Save Pricing Specs</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {servicesList.map((svc) => (
          <div
            key={svc.id}
            className="p-6 rounded-2xl bg-[#fff8f6] border border-[#dac2b9]/60 text-[#201a18] space-y-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#803d1d] font-bold uppercase tracking-wider block">
                  {svc.id}
                </span>
                <h4 className="font-serif-display font-semibold text-lg text-[#201a18] mt-0.5">
                  {svc.name}
                </h4>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[#54433c] font-semibold block mb-1">Base Price (USD)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-[#803d1d] font-bold">$</span>
                  <input
                    type="number"
                    value={svc.basePrice}
                    onChange={(e) => handlePriceChange(svc.id, Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-1.5 bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] font-mono font-bold focus:outline-none focus:border-[#803d1d]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#54433c] font-semibold block mb-1">Typical Duration</label>
                <input
                  type="text"
                  value={svc.typicalDuration}
                  onChange={(e) => handleDurationChange(svc.id, e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] focus:outline-none focus:border-[#803d1d]"
                />
              </div>
            </div>

            <div>
              <label className="text-[#54433c] font-semibold block mb-1 text-xs">
                Service Scope Brief
              </label>
              <textarea
                rows={2}
                value={svc.description}
                onChange={(e) => handleDescriptionChange(svc.id, e.target.value)}
                className="w-full px-3 py-2 bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] text-xs focus:outline-none focus:border-[#803d1d]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
