import React, { useState, useEffect } from 'react';
import { SERVICE_OPTIONS, STUDIO_META } from '../data/studioData';
import { AppointmentInquiry } from '../types';

interface BookingSectionProps {
  onAppointmentCreated: (appointment: AppointmentInquiry) => void;
  preselectedServiceId?: string | null;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  onAppointmentCreated,
  preselectedServiceId,
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(['branding-kit']);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [budgetTier, setBudgetTier] = useState('Standard Identity Suite ($800 - $2,000)');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmittedId, setLastSubmittedId] = useState<string | null>(null);

  // Sync preselectedServiceId if passed from a case study modal
  useEffect(() => {
    if (preselectedServiceId && !selectedServices.includes(preselectedServiceId)) {
      setSelectedServices((prev) => [...prev, preselectedServiceId]);
    }
  }, [preselectedServiceId]);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  // Calculate estimated investment
  const estimatedTotal = selectedServices.reduce((sum, serviceId) => {
    const s = SERVICE_OPTIONS.find((item) => item.id === serviceId);
    return sum + (s ? s.basePrice : 0);
  }, 0);

  // Multi-service bundle discount (10% if 2+, 15% if 3+)
  const discountRate = selectedServices.length >= 3 ? 0.15 : selectedServices.length >= 2 ? 0.10 : 0;
  const finalEstimate = Math.round(estimatedTotal * (1 - discountRate));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email) {
      return;
    }

    const newAppointment: AppointmentInquiry = {
      id: `inq-${Date.now().toString(36)}`,
      clientName: fullName,
      email,
      phone,
      selectedServices,
      targetLaunchDate: targetDate || 'Flexible / To Be Discussed',
      budgetTier,
      estimatedTotal: finalEstimate,
      projectDescription: message,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      status: 'Pending Discovery',
    };

    onAppointmentCreated(newAppointment);
    setLastSubmittedId(newAppointment.id);
    setIsSubmitted(true);
  };

  return (
    <section id="booking-section" className="w-full py-16 lg:py-24 bg-[#fdf1ec] border-t border-[#dac2b9]/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Contact Banner Visual (Image 18) */}
        <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-[#fff8f6] border border-[#dac2b9]/50 mb-12">
          <img
            alt="Let's Work Together - Flurrygraphy Design Studio Contact Banner"
            className="w-full h-auto object-cover max-h-[500px]"
            src={STUDIO_META.contactBanner}
            loading="lazy"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left: Consultation Value & Direct Coordinates */}
          <div className="lg:col-span-5 bg-[#fff8f6] p-7 sm:p-10 lg:p-12 rounded-2xl shadow-sm border border-[#dac2b9]/50 flex flex-col justify-between">
            <div className="space-y-6">
              <span className="text-[12px] font-semibold uppercase text-[#803d1d] tracking-[0.2em] block">
                Direct Atelier Inquiries
              </span>

              <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl text-[#201a18] leading-tight">
                Let's Bring Your Dream Brand into High-Contrast Focus.
              </h3>

              <p className="text-xs sm:text-sm text-[#54433c] leading-relaxed">
                Every appointment includes a dedicated 1-on-1 discovery review, moodboard curation, and a comprehensive scope roadmap tailor-fitted to your goals.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#f8ebe6] flex items-center justify-center text-[#803d1d] shrink-0 border border-[#dac2b9]/60">
                    <span className="material-symbols-outlined text-xl">mail</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#54433c] block">
                      Direct Email
                    </span>
                    <a
                      href={`mailto:${STUDIO_META.email}`}
                      className="text-sm text-[#803d1d] font-semibold hover:underline"
                    >
                      {STUDIO_META.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#f8ebe6] flex items-center justify-center text-[#803d1d] shrink-0 border border-[#dac2b9]/60">
                    <span className="material-symbols-outlined text-xl">schedule</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#54433c] block">
                      Consultation Turnaround
                    </span>
                    <span className="text-xs sm:text-sm text-[#201a18]">
                      {STUDIO_META.turnaround}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#f8ebe6] flex items-center justify-center text-[#803d1d] shrink-0 border border-[#dac2b9]/60">
                    <span className="material-symbols-outlined text-xl">public</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#54433c] block">
                      Clientele Scope
                    </span>
                    <span className="text-xs sm:text-sm text-[#201a18]">
                      {STUDIO_META.scope}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-[#dac2b9]/40 mt-6 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-[#54433c]">Social Studio:</span>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#f8ebe6] border border-[#dac2b9]/50 text-[11px] font-medium text-[#201a18]">
                  {STUDIO_META.socialHandles.instagram}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#f8ebe6] border border-[#dac2b9]/50 text-[11px] font-medium text-[#201a18]">
                  Behance
                </span>
              </div>
            </div>
          </div>

          {/* Right: Interactive Booking Form */}
          <div className="lg:col-span-7 bg-[#fff8f6] p-7 sm:p-10 lg:p-12 rounded-2xl shadow-sm border border-[#dac2b9]/50">
            {isSubmitted ? (
              <div className="py-8 space-y-6 text-center animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-[#f8ebe6] text-[#803d1d] flex items-center justify-center mx-auto border-2 border-[#803d1d]">
                  <span className="material-symbols-outlined text-3xl">check</span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold tracking-widest uppercase text-[#803d1d]">
                    Appointment Request Recorded
                  </span>
                  <h4 className="font-serif-display text-2xl sm:text-3xl text-[#201a18]">
                    Thank you, {fullName}!
                  </h4>
                  <p className="text-xs sm:text-sm text-[#54433c] max-w-md mx-auto leading-relaxed">
                    Your appointment inquiry (<code className="text-[#803d1d] font-semibold">{lastSubmittedId}</code>) has been logged in the studio docket. Creative Director Fhlori will review your project brief and reply to <strong className="text-[#201a18]">{email}</strong> within 24 business hours.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#f8ebe6] border border-[#dac2b9]/60 max-w-md mx-auto text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#54433c]">Estimated Investment:</span>
                    <strong className="text-[#803d1d]">${finalEstimate} USD</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#54433c]">Selected Focus Areas:</span>
                    <span className="text-[#201a18] font-medium">{selectedServices.length} service(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#54433c]">Target Timeline:</span>
                    <span className="text-[#201a18]">{targetDate || 'Flexible'}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFullName('');
                      setEmail('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="bg-[#803d1d] text-white text-xs font-semibold uppercase tracking-wider px-6 py-2.5 rounded-full hover:bg-[#8e4d32] transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <h4 className="font-serif-display text-2xl sm:text-3xl text-[#201a18]">
                    Book an Appointment / Project Inquiry
                  </h4>
                  <p className="text-xs sm:text-sm text-[#54433c]">
                    Select your required services and preferred schedule below.
                  </p>
                </div>

                {/* Service Selection Multi-chips */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#201a18]">
                      Select Studio Focus (Choose 1 or more)
                    </label>
                    <span className="text-[11px] text-[#803d1d] font-semibold">
                      {selectedServices.length} Selected
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {SERVICE_OPTIONS.map((svc) => {
                      const isSelected = selectedServices.includes(svc.id);
                      return (
                        <button
                          key={svc.id}
                          type="button"
                          onClick={() => toggleService(svc.id)}
                          className={`p-3 rounded-xl text-left text-[11px] uppercase tracking-wider transition-all flex flex-col justify-between min-h-[72px] border cursor-pointer ${
                            isSelected
                              ? 'bg-[#9e5432] text-white border-[#803d1d] shadow-sm'
                              : 'bg-[#f8ebe6] text-[#201a18] border-[#dac2b9]/60 hover:bg-[#f2e6e1]'
                          }`}
                        >
                          <div className="flex items-start justify-between w-full">
                            <span className="font-medium pr-1">{svc.name}</span>
                            <span className="material-symbols-outlined text-[16px]">
                              {isSelected ? 'check_circle' : 'add_circle'}
                            </span>
                          </div>
                          <span className={`text-[10px] mt-2 ${isSelected ? 'text-[#ffe2d7]' : 'text-[#803d1d]'} font-semibold font-mono`}>
                            From ${svc.basePrice}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Real-time estimate calculation pill */}
                  {selectedServices.length > 0 && (
                    <div className="mt-3 p-3 rounded-xl bg-[#fdf1ec] border border-[#dac2b9]/60 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-[#54433c]">
                        <span className="material-symbols-outlined text-sm text-[#803d1d]">
                          calculate
                        </span>
                        <span>
                          Estimated atelier investment:{' '}
                          <strong className="text-[#803d1d] text-sm">${finalEstimate} USD</strong>
                        </span>
                      </div>
                      {discountRate > 0 && (
                        <span className="text-[10px] bg-[#803d1d] text-white px-2 py-0.5 rounded-full font-bold">
                          {Math.round(discountRate * 100)}% Multi-Service Bundle Applied
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#201a18] block mb-1">
                      Your Full Name <span className="text-[#803d1d]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Sofia Ramirez"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#fdf1ec] border border-[#dac2b9]/60 text-xs sm:text-sm text-[#201a18] placeholder:text-[#54433c]/50 focus:outline-none focus:border-[#803d1d] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#201a18] block mb-1">
                      Email Address <span className="text-[#803d1d]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sofia@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#fdf1ec] border border-[#dac2b9]/60 text-xs sm:text-sm text-[#201a18] placeholder:text-[#54433c]/50 focus:outline-none focus:border-[#803d1d] transition-colors"
                    />
                  </div>
                </div>

                {/* Date & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#201a18] block mb-1">
                      Target Launch Date
                    </label>
                    <input
                      type="date"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#fdf1ec] border border-[#dac2b9]/60 text-xs sm:text-sm text-[#201a18] focus:outline-none focus:border-[#803d1d] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#201a18] block mb-1">
                      Estimated Budget Tier
                    </label>
                    <select
                      value={budgetTier}
                      onChange={(e) => setBudgetTier(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#fdf1ec] border border-[#dac2b9]/60 text-xs sm:text-sm text-[#201a18] focus:outline-none focus:border-[#803d1d] transition-colors"
                    >
                      <option>Boutique Starter ($350 - $800)</option>
                      <option>Standard Identity Suite ($800 - $2,000)</option>
                      <option>Full Brand Architecture &amp; Collateral ($2,000+)</option>
                      <option>Monthly Design Retainer ($1,500/mo)</option>
                    </select>
                  </div>
                </div>

                {/* Message / Brief */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#201a18] block mb-1">
                    Tell Us About Your Brand &amp; Goals
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your brand story, aesthetic mood, color affinities, or key launch milestones..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#fdf1ec] border border-[#dac2b9]/60 text-xs sm:text-sm text-[#201a18] placeholder:text-[#54433c]/50 focus:outline-none focus:border-[#803d1d] transition-colors"
                  />
                </div>

                {/* Action Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2.5 bg-[#803d1d] text-white hover:bg-[#8e4d32] text-xs font-semibold tracking-[0.16em] uppercase px-8 py-3.5 rounded-full transition-all shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <span>Submit Appointment Request</span>
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </button>

                  <span className="text-xs text-[#54433c]">
                    🔒 Confidential • No initial obligation
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
