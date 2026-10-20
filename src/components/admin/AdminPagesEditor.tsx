import React, { useState, useRef } from 'react';
import { StudioMeta, MediaAsset } from '../../types';
import { MASTER_SHOWCASE_IMAGE } from '../../data/studioData';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface AdminPagesEditorProps {
  studioMeta: StudioMeta;
  mediaAssets: MediaAsset[];
  onSaveMeta: (updated: StudioMeta) => void;
}

export const AdminPagesEditor: React.FC<AdminPagesEditorProps> = ({
  studioMeta,
  onSaveMeta,
}) => {
  const [formData, setFormData] = useState<StudioMeta>({ ...studioMeta });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'hero' | 'about' | 'tools' | 'contact'>('hero');
  const [isDraggingHero, setIsDraggingHero] = useState(false);
  const [heroFileName, setHeroFileName] = useState<string | null>(null);
  const heroFileInputRef = useRef<HTMLInputElement>(null);

  const processHeroFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WEBP, or SVG).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setFormData((prev) => ({ ...prev, heroBanner: result }));
        setHeroFileName(`${file.name} (${Math.round(file.size / 1024)} KB)`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleHeroFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processHeroFile(file);
    }
  };

  const handleChange = (field: keyof StudioMeta, val: any) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveMeta(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const applyMasterImage = (field: 'heroBanner' | 'directorBanner' | 'toolsBanner' | 'certificatesBanner' | 'contactBanner') => {
    handleChange(field, MASTER_SHOWCASE_IMAGE);
    if (field === 'heroBanner') {
      setHeroFileName(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#f8ebe6] border border-[#dac2b9]/60 text-[#201a18] shadow-sm">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#803d1d] block mb-1">
            Content Architecture
          </span>
          <h3 className="font-serif-display text-2xl text-[#201a18]">
            Pages &amp; Sections Editor
          </h3>
          <p className="text-xs text-[#54433c] mt-0.5">
            Update headlines, director narratives, and page banners across public views.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <span className="text-xs text-[#137333] font-bold animate-pulse">
              ✓ Saved &amp; Published to Live!
            </span>
          )}
          <button
            onClick={handleSave}
            className="bg-[#803d1d] hover:bg-[#8e4d32] text-white text-xs font-semibold px-6 py-2.5 rounded-xl shadow-md transition-colors cursor-pointer flex items-center gap-1.5 uppercase tracking-wider"
          >
            <span className="material-symbols-outlined text-sm">save</span>
            <span>Save All Pages</span>
          </button>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#dac2b9]/60 pb-3 text-xs">
        {[
          { key: 'hero', label: '1. Hero Showcase' },
          { key: 'about', label: '2. About & Director' },
          { key: 'tools', label: '3. Tools & Certifications' },
          { key: 'contact', label: '4. Contact & Footer' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveSubTab(tab.key as any)}
            className={`px-4 py-2 rounded-xl font-semibold transition-all cursor-pointer uppercase tracking-wider text-[11px] ${
              activeSubTab === tab.key
                ? 'bg-[#803d1d] text-white shadow-xs'
                : 'bg-[#f8ebe6] text-[#54433c] hover:bg-[#f2e6e1]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Editor Body */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* HERO SECTION */}
        {activeSubTab === 'hero' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#fff8f6] border border-[#dac2b9]/60 text-[#201a18] space-y-6 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#803d1d]">
              Hero Section Elements
            </h4>

            <div>
              <label className="text-xs font-semibold text-[#201a18] block mb-1">
                Studio Display Headline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] focus:outline-none focus:border-[#803d1d] transition-colors"
              />
            </div>

            {/* Hero Banner Upload Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-[#201a18]">
                  Hero Banner Image
                </label>
                {formData.heroBanner !== MASTER_SHOWCASE_IMAGE && (
                  <button
                    type="button"
                    onClick={() => applyMasterImage('heroBanner')}
                    className="text-[11px] text-[#803d1d] font-semibold hover:underline cursor-pointer"
                  >
                    Reset to Master Showcase
                  </button>
                )}
              </div>

              {/* Upload Drop Zone & Interactive Selector */}
              <div
                onClick={() => heroFileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDraggingHero(true);
                }}
                onDragLeave={() => setIsDraggingHero(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDraggingHero(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) processHeroFile(file);
                }}
                className={`relative w-full border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                  isDraggingHero
                    ? 'border-[#803d1d] bg-[#ffdbcd]/30 scale-[1.01]'
                    : 'border-[#dac2b9] hover:border-[#803d1d] bg-[#f8ebe6]/70 hover:bg-[#f8ebe6]'
                }`}
              >
                <input
                  ref={heroFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleHeroFileSelect}
                  className="hidden"
                />

                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#fff8f6] border border-[#dac2b9] flex items-center justify-center text-[#803d1d] shadow-xs">
                    <span className="material-symbols-outlined text-2xl">
                      upload_file
                    </span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-semibold text-[#201a18]">
                      Click to upload Hero Banner or drag &amp; drop
                    </p>
                    <p className="text-[11px] text-[#54433c]">
                      PNG, JPG, WEBP, or SVG · High-resolution recommended
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      heroFileInputRef.current?.click();
                    }}
                    className="mt-1 inline-flex items-center gap-1.5 bg-[#803d1d] hover:bg-[#8e4d32] text-white text-[11px] font-semibold px-4 py-2 rounded-xl transition-colors shadow-xs uppercase tracking-wider"
                  >
                    <span className="material-symbols-outlined text-sm">
                      add_photo_alternate
                    </span>
                    <span>Browse Image File</span>
                  </button>
                </div>
              </div>

              {/* Active Hero Image Preview */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-[#54433c]">
                  <span className="font-semibold uppercase tracking-wider text-[#803d1d]">
                    Current Active Hero Banner
                  </span>
                  {heroFileName && (
                    <span className="font-mono text-[#201a18] bg-[#f8ebe6] px-2 py-0.5 rounded border border-[#dac2b9]/60">
                      Uploaded: {heroFileName}
                    </span>
                  )}
                </div>
                <div className="relative w-full aspect-[16/8] max-h-64 bg-[#f8ebe6] rounded-2xl overflow-hidden border border-[#dac2b9] shadow-sm group">
                  <ImageWithFallback
                    src={formData.heroBanner}
                    alt="Hero Preview"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => heroFileInputRef.current?.click()}
                      className="bg-[#fff8f6] text-[#201a18] hover:bg-[#803d1d] hover:text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg transition-all flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">
                        change_circle
                      </span>
                      <span>Replace Hero Image</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ABOUT & DIRECTOR SECTION */}
        {activeSubTab === 'about' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#fff8f6] border border-[#dac2b9]/60 text-[#201a18] space-y-6 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#803d1d]">
              Director's Manifest &amp; About Section
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#201a18] block mb-1">
                  Director Full Name
                </label>
                <input
                  type="text"
                  value={formData.director}
                  onChange={(e) => handleChange('director', e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] focus:outline-none focus:border-[#803d1d] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#201a18] block mb-1">
                  Director Moniker / Short
                </label>
                <input
                  type="text"
                  value={formData.directorShort}
                  onChange={(e) => handleChange('directorShort', e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] focus:outline-none focus:border-[#803d1d] transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-[#201a18]">
                  Meet Fhlori Feature Banner URL
                </label>
                <button
                  type="button"
                  onClick={() => applyMasterImage('directorBanner')}
                  className="text-[11px] text-[#803d1d] font-semibold hover:underline"
                >
                  Use Master Showcase Image
                </button>
              </div>
              <input
                type="url"
                value={formData.directorBanner}
                onChange={(e) => handleChange('directorBanner', e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] focus:outline-none focus:border-[#803d1d] transition-colors"
              />
              <div className="mt-3 relative w-full aspect-[16/7] max-h-56 bg-[#f8ebe6] rounded-xl overflow-hidden border border-[#dac2b9]">
                <ImageWithFallback
                  src={formData.directorBanner}
                  alt="Director Banner Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#201a18] block mb-1">
                Director's Narrative Statement
              </label>
              <textarea
                rows={4}
                value={formData.directorBio}
                onChange={(e) => handleChange('directorBio', e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] focus:outline-none focus:border-[#803d1d] transition-colors"
              />
            </div>
          </div>
        )}

        {/* TOOLS & CERTS */}
        {activeSubTab === 'tools' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#fff8f6] border border-[#dac2b9]/60 text-[#201a18] space-y-6 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#803d1d]">
              Tools &amp; Accreditations Visuals
            </h4>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-[#201a18]">
                  Creative Tools Infographic Banner
                </label>
                <button
                  type="button"
                  onClick={() => applyMasterImage('toolsBanner')}
                  className="text-[11px] text-[#803d1d] font-semibold hover:underline"
                >
                  Use Master Showcase Image
                </button>
              </div>
              <input
                type="url"
                value={formData.toolsBanner}
                onChange={(e) => handleChange('toolsBanner', e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] focus:outline-none focus:border-[#803d1d] transition-colors"
              />
              <div className="mt-3 relative w-full aspect-[16/7] max-h-48 bg-[#f8ebe6] rounded-xl overflow-hidden border border-[#dac2b9]">
                <ImageWithFallback
                  src={formData.toolsBanner}
                  alt="Tools Banner Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-[#201a18]">
                  Official Certificates Showcase Graphic
                </label>
                <button
                  type="button"
                  onClick={() => applyMasterImage('certificatesBanner')}
                  className="text-[11px] text-[#803d1d] font-semibold hover:underline"
                >
                  Use Master Showcase Image
                </button>
              </div>
              <input
                type="url"
                value={formData.certificatesBanner}
                onChange={(e) => handleChange('certificatesBanner', e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] focus:outline-none focus:border-[#803d1d] transition-colors"
              />
              <div className="mt-3 relative w-full aspect-[16/7] max-h-48 bg-[#f8ebe6] rounded-xl overflow-hidden border border-[#dac2b9]">
                <ImageWithFallback
                  src={formData.certificatesBanner}
                  alt="Certs Banner Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* CONTACT & FOOTER */}
        {activeSubTab === 'contact' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#fff8f6] border border-[#dac2b9]/60 text-[#201a18] space-y-6 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#803d1d]">
              Contact Atelier &amp; Coordinates
            </h4>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-[#201a18]">
                  Contact Atelier Banner Graphic
                </label>
                <button
                  type="button"
                  onClick={() => applyMasterImage('contactBanner')}
                  className="text-[11px] text-[#803d1d] font-semibold hover:underline"
                >
                  Use Master Showcase Image
                </button>
              </div>
              <input
                type="url"
                value={formData.contactBanner}
                onChange={(e) => handleChange('contactBanner', e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] focus:outline-none focus:border-[#803d1d] transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#201a18] block mb-1">
                  Studio Inquiries Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] focus:outline-none focus:border-[#803d1d] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#201a18] block mb-1">
                  Turnaround SLA
                </label>
                <input
                  type="text"
                  value={formData.turnaround}
                  onChange={(e) => handleChange('turnaround', e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] focus:outline-none focus:border-[#803d1d] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#201a18] block mb-1">
                  Clientele Scope
                </label>
                <input
                  type="text"
                  value={formData.scope}
                  onChange={(e) => handleChange('scope', e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] focus:outline-none focus:border-[#803d1d] transition-colors"
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
