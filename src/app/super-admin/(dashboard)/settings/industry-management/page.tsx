'use client';

import React, { useState, useEffect } from 'react';
import { SettingsSplitLayout } from '@/components/layout/SettingsSplitLayout';
import { Edit2, Trash2 } from 'lucide-react';
import api from '@/lib/axios';
import { format } from 'date-fns';

interface Industry {
  _id: string;
  name: string;
  code: string;
  description: string;
  isActive: boolean;
  updatedAt: string;
  createdBy?: { firstName: string, lastName: string };
  updatedBy?: { firstName: string, lastName: string };
}

export default function IndustryManagementPage() {
  const [data, setData] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    isActive: true
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/super-admin/industries');
      setData(res.data.data);
    } catch (error) {
      console.error('Failed to fetch industries', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (item: Industry) => {
    setEditingId(item._id);
    setFormData({
      name: item.name,
      code: item.code || '',
      description: item.description || '',
      isActive: item.isActive
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this industry?')) return;
    try {
      await api.delete(`/super-admin/industries/${id}`);
      fetchData();
    } catch (error) {
      console.error('Failed to delete industry', error);
      alert('Failed to delete industry.');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: '', code: '', description: '', isActive: true });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/super-admin/industries/${editingId}`, formData);
      } else {
        await api.post('/super-admin/industries', formData);
      }
      handleCancel();
      fetchData();
    } catch (error) {
      console.error('Failed to save industry', error);
      alert('Failed to save industry.');
    }
  };

  const filteredData = data.filter(i =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (i.code && i.code.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const formContent = (
    <form onSubmit={handleSave} className="flex flex-col h-full gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold text-zinc-700">Industry Name <span className="text-red-500">*</span></label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter industry name"
          className="h-8 w-full rounded-lg border border-zinc-200 bg-white px-3 text-[13px] text-zinc-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold text-zinc-700">Industry Code (Optional)</label>
        <input
          type="text"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          placeholder="Enter industry code"
          className="h-8 w-full rounded-lg border border-zinc-200 bg-white px-3 text-[13px] text-zinc-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold text-zinc-700">Description (Optional)</label>
        <textarea
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter description"
          className="w-full rounded-lg border border-zinc-200 bg-white p-2 text-[13px] text-zinc-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-semibold text-zinc-700">Status <span className="text-red-500">*</span></label>
        <div className="flex items-center gap-4 text-[13px] text-zinc-700">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="status"
              checked={formData.isActive}
              onChange={() => setFormData({ ...formData, isActive: true })}
              className="accent-indigo-600 w-4 h-4"
            />
            Active
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="status"
              checked={!formData.isActive}
              onChange={() => setFormData({ ...formData, isActive: false })}
              className="accent-indigo-600 w-4 h-4"
            />
            Inactive
          </label>
        </div>
      </div>

      <div className="mt-auto pt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleCancel}
          className="rounded-md border border-zinc-200 bg-white px-4 py-2 text-[12.5px] font-semibold text-zinc-600 shadow-sm hover:bg-zinc-50 transition-colors flex-1"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-[#0f172a] px-4 py-2 text-[12.5px] font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors flex-1 whitespace-nowrap"
        >
          {editingId ? 'Update Industry' : 'Save Industry'}
        </button>
      </div>
    </form>
  );

  const listContent = (
    <div className="flex flex-col h-full">
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-100">
              <th className="py-1.5 px-3 text-[11.5px] font-bold text-zinc-900 whitespace-nowrap">#</th>
              <th className="py-1.5 px-3 text-[11.5px] font-bold text-zinc-900 whitespace-nowrap">Industry Name</th>
              <th className="py-1.5 px-3 text-[11.5px] font-bold text-zinc-900 whitespace-nowrap">Industry Code</th>
              <th className="py-1.5 px-3 text-[11.5px] font-bold text-zinc-900 whitespace-nowrap">Status</th>
              <th className="py-1.5 px-3 text-[11.5px] font-bold text-zinc-900 whitespace-nowrap">Updated On</th>
              <th className="py-1.5 px-3 text-[11.5px] font-bold text-zinc-900 whitespace-nowrap">Updated By</th>
              <th className="py-1.5 px-3 text-[11.5px] font-bold text-zinc-900 whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-[12px] text-zinc-700">
            {loading ? (
              <tr><td colSpan={8} className="py-8 text-center text-zinc-500">Loading...</td></tr>
            ) : filteredData.length === 0 ? (
              <tr><td colSpan={8} className="py-8 text-center text-zinc-500">No industries found.</td></tr>
            ) : (
              paginatedData.map((item, idx) => (
                <tr key={item._id} className="border-b border-zinc-50 hover:bg-zinc-50/50 transition-colors">
                  <td className="py-1.5 px-3 whitespace-nowrap">{startIndex + idx + 1}</td>
                  <td className="py-1.5 px-3 font-medium whitespace-nowrap">{item.name}</td>
                  <td className="py-1.5 px-3 whitespace-nowrap">{item.code || '-'}</td>
                  <td className="py-1.5 px-3 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${item.isActive ? 'bg-emerald-100/50 text-emerald-700' : 'bg-rose-100/50 text-rose-700'}`}>
                      {item.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-1.5 px-3 whitespace-nowrap">{format(new Date(item.updatedAt), 'dd MMM yyyy, hh:mm a')}</td>
                  <td className="py-1.5 px-3 whitespace-nowrap">{item.updatedBy ? `${item.updatedBy.firstName} ${item.updatedBy.lastName}` : '-'}</td>
                  <td className="py-1.5 px-3 whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleEdit(item)} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"><Edit2 size={14} /></button>
                      <button onClick={() => handleDelete(item._id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4">
        <div className="text-[12px] text-zinc-500">
          Showing {filteredData.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} industries
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <select
              value={itemsPerPage}
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="h-7 rounded-md border border-zinc-200 bg-white px-2 text-[12px] text-zinc-700 outline-none cursor-pointer"
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(1)} disabled={currentPage === 1}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >&laquo;</button>
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >&lsaquo;</button>

            <button className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0f172a] text-white text-[12px] font-medium">
              {currentPage}
            </button>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages || totalPages === 0}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >&rsaquo;</button>
            <button
              onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages || totalPages === 0}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >&raquo;</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SettingsSplitLayout
      pageTitle="Industry Management"
      pageSubtitle="Manage all industry types used across the platform"
      breadcrumbSteps={['Home', 'Settings', 'Industry Management']}
      formTitle={editingId ? "Edit Industry" : "Add New Industry"}
      formSubtitle={editingId ? "Update existing industry details" : "Create a new industry type"}
      listTitle="Industry List"
      listSubtitle="All industry types in the system"
      searchTerm={searchTerm}
      onSearchChange={handleSearch}
      onExport={() => alert('Export functionality to be implemented.')}
      onAddNew={handleCancel}
    >
      {[formContent, listContent]}
    </SettingsSplitLayout>
  );
}





