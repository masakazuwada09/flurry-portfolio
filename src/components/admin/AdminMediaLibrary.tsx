import React, { useState, useRef } from 'react';
import { MediaAsset } from '../../types';
import { MASTER_SHOWCASE_IMAGE } from '../../data/studioData';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface AdminMediaLibraryProps {
  mediaAssets: MediaAsset[];
  onAddMedia: (asset: MediaAsset) => void;
  onDeleteMedia: (id: string) => void;
  onApplyMasterToAll: () => void;
  onAssignImageToHero: (url: string) => void;
  onAssignImageToAbout: (url: string) => void;
}

export const AdminMediaLibrary: React.FC<AdminMediaLibraryProps> = ({
  mediaAssets,
  onAddMedia,
  onDeleteMedia,
  onApplyMasterToAll,
  onAssignImageToHero,
  onAssignImageToAbout,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showApplyConfirm, setShowApplyConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        const newAsset: MediaAsset = {
          id: `media-${Date.now().toString(36)}`,
          title: newTitle || file.name.replace(/\.[^/.]+$/, ''),
          url: result,
          uploadedAt: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          size: `${Math.round(file.size / 1024)} KB`,
          type: 'image',
        };
        onAddMedia(newAsset);
        setNewTitle('');
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;

    const newAsset: MediaAsset = {
      id: `media-${Date.now().toString(36)}`,
      title: newTitle || 'Custom Media Asset',
      url: newUrl,
      uploadedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      size: 'Remote URL',
      type: 'image',
    };
    onAddMedia(newAsset);
    setNewTitle('');
    setNewUrl('');
  };

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner Notice for User Request */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#f8ebe6] border border-[#dac2b9]/60 text-[#201a18] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#803d1d] animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#803d1d] font-bold">
              Master Showcase Image Utility
            </span>
          </div>
          <h3 className="font-serif-display text-2xl font-bold text-[#201a18]">
            Align All Studio Images to Master Showcase Visual
          </h3>
          <p className="text-xs text-[#54433c] max-w-xl leading-relaxed">
            Synchronize all website banners and portfolio case studies to use the high-resolution master visual in a single click, or upload and replace individual assets.
          </p>
        </div>

        <button
          onClick={() => setShowApplyConfirm(true)}
          className="bg-[#803d1d] hover:bg-[#8e4d32] text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">auto_fix_high</span>
          <span>Set All Images to Master URL</span>
        </button>
      </div>

      {/* Confirmation Modal */}
      {showApplyConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#fff8f6] border border-[#dac2b9] text-[#201a18] max-w-md w-full p-6 sm:p-8 rounded-2xl shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-[#803d1d]">
              <span className="material-symbols-outlined text-2xl">auto_fix_high</span>
              <h4 className="font-serif-display text-lg font-bold text-[#201a18]">
                Set All Images to Master Showcase?
              </h4>
            </div>
            <p className="text-xs text-[#54433c] leading-relaxed">
              This will update the hero banner, director banner, tools banner, certs banner, and all 14 portfolio case study images to the high-resolution master showcase visual:
              <br />
              <code className="block mt-2 p-2.5 rounded-xl bg-[#f8ebe6] border border-[#dac2b9] text-[10px] text-[#803d1d] font-mono break-all font-semibold">
                {MASTER_SHOWCASE_IMAGE}
              </code>
            </p>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#dac2b9]/60">
              <button
                onClick={() => setShowApplyConfirm(false)}
                className="px-4 py-2 text-xs text-[#54433c] hover:text-[#201a18]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onApplyMasterToAll();
                  setShowApplyConfirm(false);
                }}
                className="bg-[#803d1d] hover:bg-[#8e4d32] text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-xs"
              >
                Yes, Update All Images
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload & Add Media Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Device File Upload */}
        <div className="p-6 rounded-2xl bg-[#fff8f6] border border-[#dac2b9]/60 text-[#201a18] space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#803d1d]">upload_file</span>
            <h4 className="font-serif-display text-base font-semibold uppercase tracking-wider text-[#201a18]">
              Upload from Computer
            </h4>
          </div>
          <p className="text-xs text-[#54433c]">
            Select JPG, PNG, WEBP, or SVG files to store in the Payload media collection.
          </p>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Asset title (optional)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] placeholder:text-[#54433c]/50 focus:outline-none focus:border-[#803d1d]"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="w-full text-xs text-[#54433c] file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#803d1d] file:text-white hover:file:bg-[#8e4d32] cursor-pointer"
            />
          </div>
        </div>

        {/* Remote URL Add */}
        <div className="p-6 rounded-2xl bg-[#fff8f6] border border-[#dac2b9]/60 text-[#201a18] space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#803d1d]">link</span>
            <h4 className="font-serif-display text-base font-semibold uppercase tracking-wider text-[#201a18]">
              Add Remote Image URL
            </h4>
          </div>
          <p className="text-xs text-[#54433c]">
            Hotlink any image URL (e.g. Google Usercontent or CDN link).
          </p>
          <form onSubmit={handleAddUrl} className="space-y-3">
            <input
              type="url"
              required
              placeholder="https://example.com/image.jpg"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] placeholder:text-[#54433c]/50 focus:outline-none focus:border-[#803d1d]"
            />
            <button
              type="submit"
              className="w-full bg-[#f8ebe6] hover:bg-[#f2e6e1] text-[#201a18] border border-[#dac2b9] text-xs font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-sm text-[#803d1d]">add</span>
              <span>Register Media URL</span>
            </button>
          </form>
        </div>
      </div>

      {/* Media Collection Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-[#201a18]">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#803d1d]">
              Payload Media Collection ({mediaAssets.length} Assets)
            </h4>
            <p className="text-xs text-[#54433c]">
              Click any image to copy its URL or assign it directly to website sections.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaAssets.map((asset) => (
            <div
              key={asset.id}
              className="bg-[#f8ebe6] border border-[#dac2b9]/60 hover:border-[#803d1d] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group transition-all"
            >
              <div className="relative w-full aspect-[16/10] bg-[#fdf1ec] overflow-hidden">
                <ImageWithFallback
                  src={asset.url}
                  alt={asset.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 right-2.5 text-[10px] bg-[#fff8f6]/95 backdrop-blur-sm text-[#803d1d] px-2.5 py-0.5 rounded-full font-mono font-semibold border border-[#dac2b9]/50 shadow-xs">
                  {asset.size || 'Image'}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <h5 className="font-semibold text-sm text-[#201a18] truncate">
                    {asset.title}
                  </h5>
                  <span className="text-[10px] text-[#54433c] block mt-0.5 font-medium">
                    Added {asset.uploadedAt}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-[#dac2b9]/50 flex flex-wrap gap-1.5 text-[11px]">
                  <button
                    onClick={() => handleCopyUrl(asset.id, asset.url)}
                    className="px-3 py-1 rounded-lg bg-[#fff8f6] hover:bg-[#f2e6e1] text-[#201a18] border border-[#dac2b9] flex items-center gap-1 transition-colors cursor-pointer font-medium"
                  >
                    <span className="material-symbols-outlined text-xs text-[#803d1d]">
                      {copiedId === asset.id ? 'check' : 'content_copy'}
                    </span>
                    <span>{copiedId === asset.id ? 'Copied!' : 'Copy URL'}</span>
                  </button>

                  <button
                    onClick={() => onAssignImageToHero(asset.url)}
                    title="Set as Hero Banner"
                    className="px-3 py-1 rounded-lg bg-[#fff8f6] hover:bg-[#803d1d] hover:text-white hover:border-[#803d1d] text-[#201a18] border border-[#dac2b9] transition-all cursor-pointer font-medium"
                  >
                    Set as Hero
                  </button>

                  <button
                    onClick={() => onAssignImageToAbout(asset.url)}
                    title="Set as About Banner"
                    className="px-3 py-1 rounded-lg bg-[#fff8f6] hover:bg-[#803d1d] hover:text-white hover:border-[#803d1d] text-[#201a18] border border-[#dac2b9] transition-all cursor-pointer font-medium"
                  >
                    Set as About
                  </button>

                  {mediaAssets.length > 1 && (
                    <button
                      onClick={() => onDeleteMedia(asset.id)}
                      title="Delete asset"
                      className="ml-auto p-1 text-[#54433c] hover:text-[#ba1a1a]"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
