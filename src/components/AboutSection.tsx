import React, { useState } from 'react';
import { STUDIO_META } from '../data/studioData';

interface AboutSectionProps {
  onScheduleDiscovery: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onScheduleDiscovery }) => {
  const [showManifestoModal, setShowManifestoModal] = useState(false);

  return (
    <section id="about" className="w-full py-16 lg:py-24 bg-[#fdf1ec] border-y border-[#dac2b9]/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[12px] font-semibold uppercase text-[#803d1d] tracking-[0.2em] block mb-2">
              Director's Manifest
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#201a18]">
              Meet Fhlori &amp; Atelier
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#54433c] max-w-md leading-relaxed">
            A design philosophy anchored in optimism, warmth, and serene editorial minimalism that leaves an enduring tactile impression.
          </p>
        </div>

        {/* Feature Banner (Image 16) */}
        <div className="w-full rounded-2xl overflow-hidden shadow-md bg-[#fff8f6] border border-[#dac2b9]/50 mb-12">
          <img
            alt="Meet Flurry - Creative Director of Flurrygraphy Design Studio"
            className="w-full h-auto object-cover max-h-[580px]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuArrNddFXdjgUD0b73vIhhbsdxP9i1V6svAMAoPSynNjFOhG6oYvytlKSFoa5AQVoEvLSh8TmGmB7WzyGfXUA1i-KF-W5fkcsVJuNYAWOlole-eCMRWzYA0b-e0iJFUfHG3HzSvrRJYzzDrkvXtECwof5zMRJoIPQ1TweLzmGAgWVVCUqSE2hWKfD67LNFRx-i8_LGd8gy-I4xzAbrofWbGJNyRf5DGRDlrJyGUiySHFAtUYlqfrR4PGOTPJZIv9VSuIF8"
            loading="lazy"
          />
        </div>

        {/* Bento Grid of Studio Pillars & Narrative */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Main Director Narrative Card */}
          <div className="md:col-span-7 bg-[#fff8f6] p-7 sm:p-10 lg:p-12 rounded-2xl shadow-sm border border-[#dac2b9]/50 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#ffdbcd] flex items-center justify-center text-xs font-bold text-[#803d1d]">
                  01
                </span>
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#54433c]">
                  The Studio Vision
                </span>
              </div>

              <h3 className="font-serif-display text-2xl sm:text-3xl text-[#201a18] leading-snug">
                "We create expressive designs that evoke an optimistic, warm, and deeply resonant experience."
              </h3>

              <p className="text-sm sm:text-base text-[#54433c] leading-relaxed">
                Hi there! I am <strong className="font-semibold text-[#201a18]">{STUDIO_META.director}</strong> ({STUDIO_META.directorShort}), Creative Director of {STUDIO_META.name}. Are you looking for a reliable, creative, and passionate graphic designer to build your dream branding and promotional resources? We can help.
              </p>

              <p className="text-xs sm:text-sm text-[#54433c] leading-relaxed">
                Our passion is to craft expressive visual identities that empower entrepreneurs and established enterprises alike, employing minimalistic yet deeply artistic techniques to achieve striking visual distinction across print, digital, and physical touchpoints.
              </p>
            </div>

            <div className="pt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#dac2b9]/40 mt-6">
              <div className="flex flex-wrap gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-[#f8ebe6] text-[11px] font-semibold tracking-wider uppercase text-[#201a18]">
                  Warm Minimalism
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#f8ebe6] text-[11px] font-semibold tracking-wider uppercase text-[#201a18]">
                  Emotional Resonance
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#f8ebe6] text-[11px] font-semibold tracking-wider uppercase text-[#201a18]">
                  Bespoke Typography
                </span>
              </div>

              <button
                onClick={() => setShowManifestoModal(true)}
                className="text-[11px] font-semibold tracking-wider uppercase text-[#803d1d] hover:text-[#8e4d32] underline underline-offset-4 cursor-pointer inline-flex items-center gap-1"
              >
                <span>Read Full Philosophy</span>
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
              </button>
            </div>
          </div>

          {/* Pillars Sidebar Mosaic */}
          <div className="md:col-span-5 flex flex-col gap-6 justify-between">
            <div className="bg-[#fff8f6] p-7 rounded-2xl shadow-sm border border-[#dac2b9]/50">
              <div className="flex items-center gap-3 mb-2.5">
                <span className="material-symbols-outlined text-[#803d1d] text-2xl">
                  draw
                </span>
                <h4 className="text-sm font-semibold tracking-[0.1em] uppercase text-[#201a18]">
                  Artisan Calligraphy &amp; Art
                </h4>
              </div>
              <p className="text-xs text-[#54433c] leading-relaxed">
                Every curve, ligated script, and organic line art is crafted with authentic fine-art sensibilities, ensuring your brand stands completely apart from cookie-cutter templates.
              </p>
            </div>

            <div className="bg-[#fff8f6] p-7 rounded-2xl shadow-sm border border-[#dac2b9]/50">
              <div className="flex items-center gap-3 mb-2.5">
                <span className="material-symbols-outlined text-[#8e4d32] text-2xl">
                  select_window
                </span>
                <h4 className="text-sm font-semibold tracking-[0.1em] uppercase text-[#201a18]">
                  Precision Production Ready
                </h4>
              </div>
              <p className="text-xs text-[#54433c] leading-relaxed">
                From exact print bleed calibration to high-resolution web SVG and vector systems, every deliverable is engineered flawlessly for digital displays and commercial printing presses.
              </p>
            </div>

            <div className="bg-[#803d1d] text-[#fff8f6] p-7 rounded-2xl shadow-sm flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffdbcd]">
                  Collaborative Philosophy
                </span>
                <h4 className="text-base font-semibold tracking-[0.08em] uppercase text-[#fff8f6]">
                  Empathetic Partnership
                </h4>
                <p className="text-xs text-[#fdf1ec]/90 leading-relaxed">
                  You receive attentive listening, continuous consultation, and thoughtful design iterations until your vision is fully manifested.
                </p>
              </div>

              <button
                onClick={onScheduleDiscovery}
                className="inline-flex items-center gap-2 pt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ffe2d7] hover:text-white transition-colors cursor-pointer"
              >
                <span>Schedule Initial Discovery</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Atelier Philosophy Modal */}
      {showManifestoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#fff8f6] max-w-2xl w-full rounded-2xl p-7 sm:p-10 shadow-2xl border border-[#dac2b9] relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowManifestoModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f8ebe6] text-[#201a18] flex items-center justify-center hover:bg-[#f2e6e1] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#803d1d] block mb-2">
              Atelier Manifesto
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl text-[#201a18] mb-4">
              The Flurrygraphy Design Doctrine
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-[#54433c] leading-relaxed">
              <p>
                Flurrygraphy Design Studio was founded on the conviction that brand design should feel like fine literature—rich with texture, thoughtful pacing, and genuine emotional resonance.
              </p>
              <div className="p-4 rounded-xl bg-[#f8ebe6] border border-[#dac2b9]/50 space-y-2">
                <h5 className="font-semibold text-xs uppercase tracking-wider text-[#201a18]">
                  Three Non-Negotiable Tenets:
                </h5>
                <ul className="space-y-1.5 list-disc pl-4 text-xs">
                  <li><strong>Human Intent over Algorithmic Noise:</strong> No automated generic generators. Every logotype, typography pairing, and layout hierarchy is designed with purposeful artistic intuition.</li>
                  <li><strong>Tactile Authenticity:</strong> Digital visuals should echo the physical luxury of hot foil debossing, cotton rag paper, and earthen pigments.</li>
                  <li><strong>Seamless Execution:</strong> A design is only as good as its deployment. We deliver meticulously prepared dielines, color separations, and vector anchors.</li>
                </ul>
              </div>
              <p>
                Whether launching a boutique cafe in Melbourne, an architectural agency in Manila, or an organic wellness line in London, we partner with you to turn your intuition into an unforgettable visual presence.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-[#dac2b9]/40 flex justify-end">
              <button
                onClick={() => {
                  setShowManifestoModal(false);
                  onScheduleDiscovery();
                }}
                className="bg-[#803d1d] text-white text-[12px] font-semibold tracking-[0.16em] uppercase px-6 py-2.5 rounded-full hover:bg-[#8e4d32] transition-colors"
              >
                Begin Collaboration
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
