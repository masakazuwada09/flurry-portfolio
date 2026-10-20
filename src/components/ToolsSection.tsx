import React, { useState } from 'react';
import { STUDIO_META, TOOLS_MASTERY } from '../data/studioData';
import { ToolMastery } from '../types';
import { ImageWithFallback } from './common/ImageWithFallback';

interface ToolsSectionProps {
  toolsBanner?: string;
}

export const ToolsSection: React.FC<ToolsSectionProps> = ({
  toolsBanner = STUDIO_META.toolsBanner,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const [activeTool, setActiveTool] = useState<ToolMastery | null>(TOOLS_MASTERY[0]);

  const filteredTools = TOOLS_MASTERY.filter((tool) => {
    if (selectedCategory === 'all') return true;
    return tool.category === selectedCategory || tool.category === 'all';
  });

  return (
    <section id="tools" className="w-full py-16 lg:py-24 bg-[#fdf1ec] border-y border-[#dac2b9]/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & Interactive Progress Stack */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[12px] font-semibold uppercase text-[#803d1d] tracking-[0.2em] block mb-2">
                Technical Competence
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#201a18]">
                Creative Tools &amp; Software Mastery
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#54433c] leading-relaxed">
              Proficient across the complete industry standard spectrum—from mathematical vector precision and desktop publishing to raster retouching, freehand digital illustration, and cinematic motion pacing.
            </p>

            {/* Filter Pills for Tools */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { id: 'all', label: 'All Tools' },
                { id: 'vector', label: 'Vector & Identity' },
                { id: 'raster', label: 'Retouching & Art' },
                { id: 'editorial', label: 'Editorial Print' },
                { id: 'motion', label: 'Video Pacing' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full transition-colors cursor-pointer ${
                    selectedCategory === tab.id
                      ? 'bg-[#803d1d] text-white shadow-sm'
                      : 'bg-[#fff8f6] text-[#54433c] hover:bg-[#f8ebe6]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Interactive Mastery Meters */}
            <div className="space-y-4 pt-2">
              {filteredTools.map((tool, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveTool(tool)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    activeTool?.name === tool.name
                      ? 'bg-[#fff8f6] border-[#803d1d] shadow-sm'
                      : 'bg-[#fff8f6]/60 border-[#dac2b9]/40 hover:bg-[#fff8f6]'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1 text-xs font-semibold uppercase text-[#201a18]">
                    <span className="truncate pr-2">{tool.name}</span>
                    <span className="text-[#803d1d] font-mono shrink-0">
                      {tool.proficiency}%
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-[#ece0db] overflow-hidden mb-1.5">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${tool.proficiency}%`,
                        backgroundColor: tool.color,
                      }}
                    />
                  </div>

                  <p className="text-[11px] text-[#54433c] leading-snug">
                    {tool.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Toolkit Infographic */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-lg bg-[#fff8f6] border border-[#dac2b9]/60">
              <ImageWithFallback
                alt="Flurrygraphy Design Tools - Canva, Adobe Photoshop, Illustrator, InDesign, CorelDraw, Procreate, Filmora, CapCut"
                className="w-full h-auto object-cover"
                src={toolsBanner}
                loading="lazy"
              />
            </div>

            {/* Tool Detail Card */}
            {activeTool && (
              <div className="bg-[#fff8f6] p-6 rounded-2xl border border-[#dac2b9]/50 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#f8ebe6] text-[#803d1d] text-[10px] font-bold tracking-wider uppercase">
                      {activeTool.tag}
                    </span>
                    <span className="text-xs font-semibold uppercase text-[#201a18]">
                      Selected Tool Workflow
                    </span>
                  </div>
                  <h4 className="font-serif-display text-lg text-[#201a18]">
                    {activeTool.name}
                  </h4>
                  <p className="text-xs text-[#54433c]">
                    Deliverables generated are 100% verified for commercial printing and high-res digital use.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="w-3 h-3 rounded-full bg-emerald-600 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                    Commercial License Ready
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
