import React, { useState } from 'react';
import { CERTIFICATIONS, STUDIO_META } from '../data/studioData';
import { Certification } from '../types';

export const CertificationsSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section id="certificates" className="w-full py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[12px] font-semibold uppercase text-[#803d1d] tracking-[0.2em] block mb-2">
            Verified Professional Credentials
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#201a18]">
            Certifications &amp; Accreditations
          </h2>
          <p className="text-xs sm:text-sm text-[#54433c] mt-3 leading-relaxed">
            Rigorous technical training backed by international standards, government accolades, and premier creative institutions.
          </p>
        </div>

        {/* Main Certificates Showcase Graphic (Image 15) */}
        <div className="w-full rounded-2xl overflow-hidden shadow-md bg-[#fdf1ec] border border-[#dac2b9]/50 mb-12">
          <img
            alt="Official Certifications: Microsoft Office Specialist, DICT digitaljobsPH Graphic Design Medalist, Adobe Creative Educator, Canva Essentials"
            className="w-full h-auto object-cover"
            src={STUDIO_META.certificatesBanner}
            loading="lazy"
          />
        </div>

        {/* Credential Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="p-6 rounded-2xl bg-[#f8ebe6] border border-[#dac2b9]/40 shadow-sm flex flex-col justify-between hover:border-[#803d1d] hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="space-y-3">
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: cert.accentColor }}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {cert.icon}
                  </span>
                </span>

                <span
                  className="text-[10px] font-bold uppercase tracking-wider block"
                  style={{ color: cert.accentColor }}
                >
                  {cert.distinction}
                </span>

                <h4 className="font-serif-display text-lg text-[#201a18] group-hover:text-[#803d1d] transition-colors leading-snug">
                  {cert.title}
                </h4>

                <p className="text-xs text-[#54433c] leading-relaxed line-clamp-3">
                  {cert.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#dac2b9]/40 mt-4 flex items-center justify-between text-[11px] text-[#54433c]">
                <span className="font-medium truncate">{cert.issuer}</span>
                <span className="text-[#803d1d] font-semibold text-[10px] uppercase group-hover:underline">
                  Inspect
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Inspector Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#fff8f6] max-w-lg w-full rounded-2xl p-7 shadow-2xl border border-[#dac2b9] relative">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f8ebe6] text-[#201a18] flex items-center justify-center hover:bg-[#f2e6e1]"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm"
                style={{ backgroundColor: selectedCert.accentColor }}
              >
                <span className="material-symbols-outlined text-2xl">
                  {selectedCert.icon}
                </span>
              </span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#803d1d] block">
                  {selectedCert.badge}
                </span>
                <h3 className="font-serif-display text-xl text-[#201a18]">
                  {selectedCert.title}
                </h3>
              </div>
            </div>

            <div className="space-y-3 py-3 border-y border-[#dac2b9]/40 text-xs text-[#54433c] leading-relaxed">
              <p>{selectedCert.description}</p>
              <div className="grid grid-cols-2 gap-2 p-3 bg-[#fdf1ec] rounded-xl text-[11px]">
                <div>
                  <span className="text-[#201a18] font-semibold block">Issuer:</span>
                  <span>{selectedCert.issuer}</span>
                </div>
                <div>
                  <span className="text-[#201a18] font-semibold block">Accreditation:</span>
                  <span>{selectedCert.year}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setSelectedCert(null)}
                className="bg-[#803d1d] text-white text-xs font-semibold tracking-wider uppercase px-5 py-2 rounded-full hover:bg-[#8e4d32]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
