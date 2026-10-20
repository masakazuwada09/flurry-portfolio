import React, { useState } from 'react';
import { PortfolioItem } from '../types';

interface CaseStudyModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onInquireProject: (item: PortfolioItem) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  item,
  onClose,
  onInquireProject,
}) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [imageZoomed, setImageZoomed] = useState(false);

  if (!item) return null;

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#fff8f6] max-w-4xl w-full rounded-2xl shadow-2xl border border-[#dac2b9] max-h-[92vh] overflow-y-auto flex flex-col relative">
        {/* Top sticky action bar */}
        <div className="sticky top-0 z-20 bg-[#fff8f6]/95 backdrop-blur-md border-b border-[#dac2b9]/40 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#803d1d] px-3 py-1 bg-[#f8ebe6] rounded-full">
              {item.caseNumber}
            </span>
            <span className="text-xs text-[#54433c] tracking-wider uppercase hidden sm:inline">
              {item.categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onInquireProject(item)}
              className="bg-[#9e5432] text-white hover:bg-[#803d1d] text-[11px] font-semibold tracking-wider uppercase px-4 py-2 rounded-full transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[15px]">send</span>
              <span>Inquire Similar Style</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#f8ebe6] text-[#201a18] flex items-center justify-center hover:bg-[#f2e6e1] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Main Visual Display */}
          <div
            className={`relative rounded-xl overflow-hidden bg-[#f8ebe6] border border-[#dac2b9]/60 cursor-pointer group ${
              imageZoomed ? 'scale-105 transition-transform duration-300' : ''
            }`}
            onClick={() => setImageZoomed(!imageZoomed)}
            title="Click to toggle image magnification"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-auto object-cover max-h-[580px]"
            />
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[11px] px-3 py-1 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">
                {imageZoomed ? 'zoom_out' : 'zoom_in'}
              </span>
              <span>{imageZoomed ? 'Reset View' : 'Zoom In'}</span>
            </div>
          </div>

          {/* Heading & Meta */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#54433c]">
              {item.client && (
                <span className="flex items-center gap-1">
                  <strong className="text-[#201a18]">Client:</strong> {item.client}
                </span>
              )}
              {item.timeline && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <strong className="text-[#201a18]">Timeline:</strong> {item.timeline}
                  </span>
                </>
              )}
              <span>•</span>
              <span className="flex items-center gap-1">
                <strong className="text-[#201a18]">Discipline:</strong> {item.categoryLabel}
              </span>
            </div>

            <h2 className="font-serif-display text-2xl sm:text-4xl text-[#201a18]">
              {item.title}
            </h2>
            <p className="text-base sm:text-lg text-[#54433c] font-light leading-relaxed">
              {item.subtitle}
            </p>
          </div>

          {/* Detailed Narrative */}
          <div className="p-5 rounded-xl bg-[#fdf1ec] border border-[#dac2b9]/40 space-y-2">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#803d1d]">
              Project Overview &amp; Execution
            </h4>
            <p className="text-xs sm:text-sm text-[#54433c] leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Deliverables & Key Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {item.deliverables && (
              <div className="bg-[#fff8f6] p-5 rounded-xl border border-[#dac2b9]/50 space-y-3">
                <h4 className="text-xs font-semibold tracking-wider uppercase text-[#201a18] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#803d1d]">
                    inventory_2
                  </span>
                  Deliverables Produced
                </h4>
                <ul className="space-y-2 text-xs text-[#54433c]">
                  {item.deliverables.map((del, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#803d1d] text-[16px] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.keyHighlights && (
              <div className="bg-[#fff8f6] p-5 rounded-xl border border-[#dac2b9]/50 space-y-3">
                <h4 className="text-xs font-semibold tracking-wider uppercase text-[#201a18] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#8e4d32]">
                    verified
                  </span>
                  Key Highlights &amp; Craft
                </h4>
                <ul className="space-y-2 text-xs text-[#54433c]">
                  {item.keyHighlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8e4d32] shrink-0 mt-1.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Color Palette & Typography Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Swatches */}
            {item.swatches && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold tracking-wider uppercase text-[#201a18]">
                    Bespoke Color Formulation
                  </h4>
                  {copiedHex && (
                    <span className="text-[11px] text-[#803d1d] font-semibold animate-pulse">
                      Copied {copiedHex}!
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {item.swatches.map((swatch, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCopyColor(swatch.hex)}
                      className="group p-2 rounded-xl bg-[#f8ebe6] border border-[#dac2b9]/40 text-left hover:border-[#803d1d] transition-all cursor-pointer"
                      title={`Click to copy ${swatch.hex}`}
                    >
                      <div
                        className="w-full h-12 rounded-lg shadow-inner mb-2 border border-black/10"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <span className="text-[10px] font-bold text-[#201a18] block truncate">
                        {swatch.name}
                      </span>
                      <span className="text-[10px] text-[#54433c] font-mono group-hover:text-[#803d1d]">
                        {swatch.hex}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Typography Specs */}
            {item.typographyUsed && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold tracking-wider uppercase text-[#201a18]">
                  Typography Systems Employed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {item.typographyUsed.map((font, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-2 rounded-xl bg-[#f8ebe6] border border-[#dac2b9]/50 text-xs font-medium text-[#201a18] flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm text-[#803d1d]">
                        text_fields
                      </span>
                      <span>{font}</span>
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-[#54433c] leading-relaxed">
                  Carefully tracked and scaled to preserve visual equilibrium between editorial serif elegance and functional readability.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#f8ebe6] border-t border-[#dac2b9]/40 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs text-[#54433c]">
            Designed by Creative Director Fhlori Ann Maye V. Luna
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="text-xs uppercase font-medium tracking-wider text-[#54433c] hover:text-[#201a18] px-4 py-2"
            >
              Close Inspector
            </button>
            <button
              onClick={() => onInquireProject(item)}
              className="bg-[#803d1d] text-white hover:bg-[#8e4d32] text-xs font-semibold tracking-wider uppercase px-6 py-2.5 rounded-full shadow-md transition-colors"
            >
              Book an Appointment for this Style
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
