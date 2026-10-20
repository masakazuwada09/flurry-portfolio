import React, { useState } from 'react';
import { PortfolioItem } from '../../types';
import { MASTER_SHOWCASE_IMAGE } from '../../data/studioData';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface AdminPortfolioManagerProps {
  items: PortfolioItem[];
  onUpdateItem: (item: PortfolioItem) => void;
  onAddItem: (item: PortfolioItem) => void;
  onDeleteItem: (id: string) => void;
  onSetAllPortfolioToMaster: () => void;
}

export const AdminPortfolioManager: React.FC<AdminPortfolioManagerProps> = ({
  items,
  onUpdateItem,
  onAddItem,
  onDeleteItem,
  onSetAllPortfolioToMaster,
}) => {
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // New item form state
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newCategory, setNewCategory] = useState<'branding' | 'print' | 'social' | 'art' | 'multimedia'>('branding');
  const [newImageUrl, setNewImageUrl] = useState(MASTER_SHOWCASE_IMAGE);
  const [newDescription, setNewDescription] = useState('');
  const [newClient, setNewClient] = useState('');

  const filteredItems = items.filter((it) => {
    const matchCat = categoryFilter === 'all' || it.category === categoryFilter;
    const matchQuery =
      search === '' ||
      it.title.toLowerCase().includes(search.toLowerCase()) ||
      it.caseNumber.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQuery;
  });

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      onUpdateItem(editingItem);
      setEditingItem(null);
    }
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const caseNum = `Case ${String(items.length + 1).padStart(2, '0')}`;
    const newItem: PortfolioItem = {
      id: `case-${Date.now().toString(36)}`,
      caseNumber: caseNum,
      title: newTitle,
      subtitle: newSubtitle || 'Custom Atelier Commission',
      category: newCategory,
      categoryLabel: newCategory.toUpperCase(),
      badgeColorClass: 'text-[#803d1d] bg-[#f8ebe6]',
      description: newDescription || 'Bespoke design delivery crafted with fine-art precision.',
      imageUrl: newImageUrl,
      colSpanDesktop: 'lg:col-span-6',
      client: newClient || 'Private Atelier Client',
      timeline: '2 Weeks Delivery',
      deliverables: ['Custom Scalable Vector Marks', 'Brand Guidelines Book'],
    };

    onAddItem(newItem);
    setShowAddModal(false);
    setNewTitle('');
    setNewSubtitle('');
    setNewDescription('');
    setNewClient('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Align */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#f8ebe6] border border-[#dac2b9]/60 text-[#201a18] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#803d1d] block mb-1">
            Curated Archive Manager
          </span>
          <h3 className="font-serif-display text-2xl text-[#201a18]">
            Portfolio Works Collection ({items.length} Cases)
          </h3>
          <p className="text-xs text-[#54433c] mt-0.5">
            Update project metadata, replace artwork visuals, or create new client case studies.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onSetAllPortfolioToMaster}
            title="Set all portfolio images to master showcase"
            className="px-4 py-2.5 rounded-xl bg-[#f2e6e1] hover:bg-[#ece0db] text-[#803d1d] text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-[#dac2b9]/60 uppercase tracking-wider shadow-xs"
          >
            <span className="material-symbols-outlined text-sm">photo_library</span>
            <span>Set All Cases to Master Image</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#803d1d] hover:bg-[#8e4d32] text-white text-xs font-semibold px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer uppercase tracking-wider shadow-md"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            <span>New Case Study</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {['all', 'branding', 'print', 'social', 'art', 'multimedia'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl capitalize font-semibold transition-all cursor-pointer whitespace-nowrap text-[11px] uppercase tracking-wider ${
                categoryFilter === cat
                  ? 'bg-[#803d1d] text-white shadow-xs'
                  : 'bg-[#f8ebe6] text-[#54433c] hover:bg-[#f2e6e1]'
              }`}
            >
              {cat === 'all' ? 'All Works' : cat}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Filter by title or case number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 text-xs bg-[#fff8f6] border border-[#dac2b9] rounded-xl text-[#201a18] placeholder:text-[#54433c]/60 focus:outline-none focus:border-[#803d1d] w-full sm:w-64 transition-colors"
        />
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#f8ebe6] border border-[#dac2b9]/60 rounded-2xl overflow-hidden text-[#201a18] flex flex-col justify-between group hover:border-[#803d1d] transition-all shadow-sm"
          >
            <div className="relative aspect-[16/10] bg-[#fdf1ec] overflow-hidden">
              <ImageWithFallback
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2.5 left-2.5 bg-[#fff8f6]/95 backdrop-blur-sm text-[10px] text-[#803d1d] font-bold px-2.5 py-0.5 rounded-full shadow-xs border border-[#dac2b9]/60">
                {item.caseNumber}
              </span>
              <span className="absolute top-2.5 right-2.5 bg-[#803d1d] text-[10px] text-white px-2.5 py-0.5 rounded-full uppercase font-semibold shadow-xs">
                {item.category}
              </span>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-serif-display font-semibold text-base text-[#201a18] line-clamp-1 group-hover:text-[#803d1d] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-[#54433c] line-clamp-2 mt-1">
                  {item.subtitle}
                </p>
                {item.client && (
                  <span className="text-[10px] text-[#803d1d] font-semibold block mt-1.5">
                    Client: {item.client}
                  </span>
                )}
              </div>

              <div className="pt-3 border-t border-[#dac2b9]/50 flex items-center justify-between text-xs">
                <button
                  onClick={() => setEditingItem(item)}
                  className="bg-[#fff8f6] hover:bg-[#f2e6e1] text-[#201a18] px-3 py-1.5 rounded-lg border border-[#dac2b9] flex items-center gap-1 cursor-pointer transition-colors font-medium"
                >
                  <span className="material-symbols-outlined text-xs text-[#803d1d]">edit</span>
                  <span>Edit Details</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      onUpdateItem({ ...item, imageUrl: MASTER_SHOWCASE_IMAGE });
                    }}
                    title="Set this image to Master Showcase"
                    className="p-1.5 text-[#54433c] hover:text-[#803d1d] hover:bg-[#fff8f6] rounded-md transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">auto_fix_normal</span>
                  </button>
                  <button
                    onClick={() => onDeleteItem(item.id)}
                    title="Delete case"
                    className="p-1.5 text-[#54433c] hover:text-[#ba1a1a] hover:bg-[#fff8f6] rounded-md transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Item Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#fff8f6] border border-[#dac2b9] text-[#201a18] max-w-xl w-full p-6 sm:p-8 rounded-2xl shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#dac2b9]/60 pb-3">
              <h4 className="font-serif-display text-lg font-bold text-[#201a18]">
                Edit {editingItem.caseNumber}: {editingItem.title}
              </h4>
              <button
                onClick={() => setEditingItem(null)}
                className="w-8 h-8 rounded-full bg-[#f8ebe6] text-[#201a18] flex items-center justify-center hover:bg-[#f2e6e1]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="text-[#201a18] font-semibold block mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] focus:outline-none focus:border-[#803d1d]"
                />
              </div>

              <div>
                <label className="text-[#201a18] font-semibold block mb-1">Subtitle / Sub-headline</label>
                <input
                  type="text"
                  value={editingItem.subtitle}
                  onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] focus:outline-none focus:border-[#803d1d]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#201a18] font-semibold block mb-1">Category</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        category: e.target.value as any,
                        categoryLabel: e.target.value.toUpperCase(),
                      })
                    }
                    className="w-full px-3 py-2 bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] focus:outline-none focus:border-[#803d1d]"
                  >
                    <option value="branding">branding</option>
                    <option value="print">print</option>
                    <option value="social">social</option>
                    <option value="art">art</option>
                    <option value="multimedia">multimedia</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#201a18] font-semibold block mb-1">Client Name</label>
                  <input
                    type="text"
                    value={editingItem.client || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, client: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] focus:outline-none focus:border-[#803d1d]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[#201a18] font-semibold">Artwork Image URL</label>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingItem({ ...editingItem, imageUrl: MASTER_SHOWCASE_IMAGE })
                    }
                    className="text-[11px] text-[#803d1d] font-semibold hover:underline"
                  >
                    Set to Master Showcase
                  </button>
                </div>
                <input
                  type="url"
                  required
                  value={editingItem.imageUrl}
                  onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] focus:outline-none focus:border-[#803d1d]"
                />
                <div className="mt-2 h-24 bg-[#f8ebe6] rounded-xl overflow-hidden border border-[#dac2b9]">
                  <ImageWithFallback
                    src={editingItem.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#201a18] font-semibold block mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] focus:outline-none focus:border-[#803d1d]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#dac2b9]/60">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-xs text-[#54433c] hover:text-[#201a18]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#803d1d] hover:bg-[#8e4d32] text-white text-xs font-semibold px-6 py-2 rounded-xl shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Case Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#fff8f6] border border-[#dac2b9] text-[#201a18] max-w-lg w-full p-6 sm:p-8 rounded-2xl shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#dac2b9]/60 pb-3">
              <h4 className="font-serif-display text-lg font-bold text-[#201a18]">
                Add New Case Study
              </h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-[#f8ebe6] text-[#201a18] flex items-center justify-center hover:bg-[#f2e6e1]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNew} className="space-y-3 text-xs">
              <div>
                <label className="text-[#201a18] font-semibold block mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Lumina Botanicals Packaging"
                  className="w-full px-3 py-2 bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] focus:outline-none focus:border-[#803d1d]"
                />
              </div>
              <div>
                <label className="text-[#201a18] font-semibold block mb-1">Subtitle</label>
                <input
                  type="text"
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  placeholder="e.g. Botanical Skincare Suite"
                  className="w-full px-3 py-2 bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] focus:outline-none focus:border-[#803d1d]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#201a18] font-semibold block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] focus:outline-none focus:border-[#803d1d]"
                  >
                    <option value="branding">branding</option>
                    <option value="print">print</option>
                    <option value="social">social</option>
                    <option value="art">art</option>
                    <option value="multimedia">multimedia</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#201a18] font-semibold block mb-1">Client</label>
                  <input
                    type="text"
                    value={newClient}
                    onChange={(e) => setNewClient(e.target.value)}
                    placeholder="e.g. Lumina Labs"
                    className="w-full px-3 py-2 bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] focus:outline-none focus:border-[#803d1d]"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[#201a18] font-semibold">Image URL</label>
                  <button
                    type="button"
                    onClick={() => setNewImageUrl(MASTER_SHOWCASE_IMAGE)}
                    className="text-[11px] text-[#803d1d] font-semibold hover:underline"
                  >
                    Set to Master Showcase
                  </button>
                </div>
                <input
                  type="url"
                  required
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] focus:outline-none focus:border-[#803d1d]"
                />
              </div>
              <div>
                <label className="text-[#201a18] font-semibold block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Overview of the design challenge and craft delivery..."
                  className="w-full px-3 py-2 bg-[#f8ebe6] border border-[#dac2b9] rounded-xl text-[#201a18] focus:outline-none focus:border-[#803d1d]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-[#dac2b9]/60">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs text-[#54433c] hover:text-[#201a18]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#803d1d] hover:bg-[#8e4d32] text-white text-xs font-semibold px-6 py-2 rounded-xl shadow-xs"
                >
                  Publish Case Study
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
