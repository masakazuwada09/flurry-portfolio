import React, { useState } from 'react';

interface BrandGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandGuideModal: React.FC<BrandGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const studioPalette = [
    { name: 'Primary Terracotta', hex: '#803D1D', role: 'Hero marks, key CTA actions, primary branding' },
    { name: 'Secondary Roasted Cinnamon', hex: '#8E4D32', role: 'Active button states, section accent titles' },
    { name: 'Tertiary Toasted Sand', hex: '#6D4820', role: 'Subtle badges, tags, decorative dividers' },
    { name: 'Deep Espresso Ink', hex: '#201A18', role: 'Rich high-contrast body & editorial headings' },
    { name: 'Warm Ivory Canvas', hex: '#FFF8F6', role: 'Base parchment canvas backdrop' },
    { name: 'Warm Linen Container', hex: '#F8EBE6', role: 'Tactile card containers & quiet surfaces' },
    { name: 'Flaxen Outline', hex: '#DAC2B9', role: 'Delicate hairline borders & structural dividers' },
    { name: 'Sunset Accent Dim', hex: '#FFB596', role: 'Soft ambient illumination highlights' },
  ];

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedCode(hex);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#fff8f6] max-w-3xl w-full rounded-2xl shadow-2xl border border-[#dac2b9] max-h-[90vh] overflow-y-auto p-6 sm:p-10 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f8ebe6] text-[#201a18] flex items-center justify-center hover:bg-[#f2e6e1]"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>

        {/* Modal Title */}
        <div className="space-y-1 mb-8">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#803d1d] block">
            Studio Aesthetic Architecture
          </span>
          <h2 className="font-serif-display text-2xl sm:text-4xl text-[#201a18]">
            Warm Editorial Atelier Style System
          </h2>
          <p className="text-xs sm:text-sm text-[#54433c]">
            Rooted in earthen minerals, unbleached linen, and classical monograph typography.
          </p>
        </div>

        {/* Color Palette Grid */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#201a18]">
              Tactile Color Palette Formulas
            </h3>
            {copiedCode && (
              <span className="text-xs text-[#803d1d] font-semibold animate-pulse">
                Copied {copiedCode} to clipboard!
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {studioPalette.map((color, idx) => (
              <button
                key={idx}
                onClick={() => handleCopy(color.hex)}
                className="group p-3 rounded-xl bg-[#f8ebe6] border border-[#dac2b9]/50 text-left hover:border-[#803d1d] transition-all cursor-pointer shadow-xs"
                title={`Click to copy ${color.hex}`}
              >
                <div
                  className="w-full h-14 rounded-lg shadow-inner mb-2 border border-black/10"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-[11px] font-bold text-[#201a18] block truncate">
                  {color.name}
                </span>
                <span className="text-[10px] text-[#803d1d] font-mono group-hover:underline">
                  {color.hex}
                </span>
                <span className="text-[9px] text-[#54433c] block line-clamp-2 mt-1 leading-tight">
                  {color.role}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Typography System */}
        <div className="space-y-4 mb-8 p-5 bg-[#fdf1ec] rounded-2xl border border-[#dac2b9]/60">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#803d1d]">
            Typographic Cadence Pairings
          </h3>
          <div className="space-y-4">
            <div className="border-b border-[#dac2b9]/40 pb-3">
              <span className="text-[10px] font-mono text-[#54433c] block mb-1">
                Display &amp; Headings — Playfair Display (Serif)
              </span>
              <p className="font-serif-display text-2xl text-[#201a18]">
                Expressive Design Solutions, Tailor Fit to Your Vision.
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#54433c] block mb-1">
                Body &amp; Technical Metadata — DM Sans (Geometric Humanist)
              </span>
              <p className="text-xs sm:text-sm text-[#54433c] leading-relaxed">
                Clean modernist sans-serif engineered with generous micro-tracking, ensuring effortless legibility across long-form editorial dossiers, tactile packaging dielines, and high-density print menus.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end pt-4 border-t border-[#dac2b9]/40">
          <button
            onClick={onClose}
            className="bg-[#803d1d] text-white text-xs font-semibold uppercase tracking-wider px-6 py-2.5 rounded-full hover:bg-[#8e4d32]"
          >
            Close Atelier Guide
          </button>
        </div>
      </div>
    </div>
  );
};
