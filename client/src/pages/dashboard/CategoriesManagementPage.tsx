import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, FolderTree, Tag } from 'lucide-react';
import api from '../../services/api';
import { Category } from '../../types';
import { Header } from '../../components/dashboard/Header';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

export const CategoriesManagementPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#183153');
  const [featured, setFeatured] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get('/categories');
      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (err) {
      console.error('Failed fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setName('');
    setDescription('');
    setColor('#183153');
    setFeatured(false);
    setIsModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setDescription(cat.description);
    setColor(cat.color || '#183153');
    setFeatured(!!cat.featured);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { name, description, color, featured };
      if (editingCategory) {
        await api.put(`/categories/${editingCategory._id}`, payload);
      } else {
        await api.post('/categories', payload);
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed saving category.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this event category?')) return;
    try {
      await api.delete(`/categories/${id}`);
      setCategories((prev) => prev.filter((c) => c._id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed deleting category.');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <Header
        title="Event Categories"
        subtitle="Organize events by portfolio verticals, badges, and thematic colors."
      />

      <div className="px-8 space-y-6">
        <div className="flex justify-between items-center bg-brand-surface p-4 rounded-2xl border border-brand-border shadow-subtle">
          <p className="text-xs text-brand-mutedGray font-semibold">
            {categories.length} Registered Categories
          </p>
          <Button
            variant="primary"
            size="md"
            onClick={openCreateModal}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Category
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-brand-surface rounded-2xl border border-brand-border p-6 shadow-subtle flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: cat.color || '#183153' }}
                  >
                    <FolderTree className="w-5 h-5" />
                  </div>
                  {cat.featured && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-lg text-brand-primary font-heading">{cat.name}</h3>
                <p className="text-xs text-brand-mutedGray leading-relaxed">{cat.description}</p>
              </div>

              <div className="pt-3 border-t border-brand-border flex items-center justify-between text-xs">
                <span className="font-semibold text-brand-darkSlate">
                  {cat.eventCount || 0} Events Assigned
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="p-1.5 text-brand-mutedGray hover:text-brand-secondary hover:bg-brand-hoverBg rounded-lg"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="p-1.5 text-brand-mutedGray hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingCategory ? 'Edit Category' : 'Create Category'}
          maxWidth="md"
        >
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                Category Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Executive Retreats"
                className="w-full px-3 py-2 rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                Theme Color *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-10 h-10 rounded-lg border border-brand-border cursor-pointer p-0.5"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-28 px-2 py-1.5 rounded-lg border border-brand-border text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-darkSlate mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="High-level description of this category..."
                className="w-full p-2.5 rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            <label className="flex items-center gap-2 text-xs font-semibold text-brand-darkSlate cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="rounded text-brand-primary"
              />
              <span>Feature prominently on public home page</span>
            </label>

            <div className="flex justify-end gap-2 pt-2 border-t border-brand-border">
              <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" isLoading={saving}>
                {editingCategory ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
