'use client';
import React, { useState } from 'react';
import {
  Home, ChevronRight, Upload, Plus, Search, SlidersHorizontal,
  Pencil, Trash2, ChevronsLeft, ChevronLeft, ChevronRight as ChevronRightIcon, ChevronsRight,
} from 'lucide-react';
import { FormInput } from '@/components/ui/form-input';

// ─── Static data ────────────────────────────────────────────────────────────
const BREADCRUMB = ['Home', 'Settings', 'Industry Management'];

const INDUSTRIES = [
  { id: 1, name: 'Manufacturing', code: 'IND-001', status: 'Active', updatedOn: '16 May 2025, 10:30 AM', updatedBy: 'Vijay Sharma' },
  { id: 2, name: 'Information Technology', code: 'IND-002', status: 'Active', updatedOn: '15 May 2025, 04:45 PM', updatedBy: 'Neha Verma' },
  { id: 3, name: 'Healthcare & Pharmaceuticals', code: 'IND-003', status: 'Active', updatedOn: '14 May 2025, 11:20 AM', updatedBy: 'Amit Kumar' },
  { id: 4, name: 'Retail & E-commerce', code: 'IND-004', status: 'Active', updatedOn: '13 May 2025, 09:15 AM', updatedBy: 'Vijay Sharma' },
  { id: 5, name: 'Construction & Real Estate', code: 'IND-005', status: 'Active', updatedOn: '12 May 2025, 02:10 PM', updatedBy: 'Neha Verma' },
  { id: 6, name: 'Education & Training', code: 'IND-006', status: 'Inactive', updatedOn: '10 May 2025, 03:55 PM', updatedBy: 'Amit Kumar' },
  { id: 7, name: 'Finance & Banking', code: 'IND-007', status: 'Active', updatedOn: '09 May 2025, 01:25 PM', updatedBy: 'Vijay Sharma' },
  { id: 8, name: 'Transportation & Logistics', code: 'IND-008', status: 'Active', updatedOn: '08 May 2025, 10:05 AM', updatedBy: 'Neha Verma' },
  { id: 9, name: 'Hospitality & Tourism', code: 'IND-009', status: 'Active', updatedOn: '07 May 2025, 05:40 PM', updatedBy: 'Amit Kumar' },
  { id: 10, name: 'Media & Entertainment', code: 'IND-010', status: 'Inactive', updatedOn: '06 May 2025, 11:30 AM', updatedBy: 'Vijay Sharma' },
];

const PAGES = [1, 2, 3, 4, 5];

// ─── Breadcrumb + heading ───────────────────────────────────────────────────
function PageHeading() {
  return (
    <section className="flex items-start justify-between gap-3 flex-wrap">
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-[12px] text-zinc-500 flex-wrap">
          {BREADCRUMB.map((crumb, i) => (
            <React.Fragment key={crumb}>
              {i === 0 ? (
                <span className="flex items-center gap-1 text-indigo-600 font-medium hover:underline cursor-pointer">
                  <Home size={12} /> {crumb}
                </span>
              ) : i === BREADCRUMB.length - 1 ? (
                <span className="text-zinc-900 font-semibold">{crumb}</span>
              ) : (
                <span className="text-indigo-600 font-medium hover:underline cursor-pointer">{crumb}</span>
              )}
              {i < BREADCRUMB.length - 1 && <ChevronRight size={12} />}
            </React.Fragment>
          ))}
        </div>
        <h1 className="text-1xl font-bold text-zinc-900 leading-tight">Industry Management</h1>
        <p className="text-[13px] text-zinc-500">Manage all industry types used across the platform</p>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-[12px] font-semibold text-zinc-600 shadow-sm hover:bg-zinc-50 transition-colors">
          <Upload size={14} /> Export
        </button>
        <button className="flex items-center gap-1.5 rounded-lg bg-[#16234A] px-3 py-2 text-[12px] font-semibold text-white shadow-sm hover:bg-[#1c2c5c] transition-colors">
          <Plus size={14} /> Add New Industry
        </button>
      </div>
    </section>
  );
}

// ─── Reusable field shell ───────────────────────────────────────────────────
function Field({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[12px] font-semibold text-zinc-700 mb-1">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      {children}
      {hint && <p className="text-[10.5px] text-zinc-400 mt-1">{hint}</p>}
    </div>
  );
}

const inputClass = 'w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-[12.5px] text-zinc-800 shadow-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-colors placeholder:text-zinc-400';

// ─── Add New Industry form (left) ───────────────────────────────────────────
function AddNewIndustryCard() {
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');

  return (
    <div className="rounded-md border border-zinc-200 bg-white shadow-sm p-3">
      <h3 className="text-[15px] font-semibold text-zinc-900">Add New Industry</h3>
      <p className="text-[12px] text-zinc-400 mt-0.5">Create a new industry type</p>

      <div className="mt-2 space-y-2">
        <Field label="Industry Name" required>
          <FormInput placeholder="Enter industry name" />
        </Field>
        <Field label="Industry Code (Optional)">
          <FormInput placeholder="Enter industry code" />
        </Field>
        <Field label="Description (Optional)">
          <textarea placeholder="Enter description" rows={4} className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-[12.5px] text-zinc-800 shadow-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-colors placeholder:text-zinc-400 resize-none" />
        </Field>

        <div>
          <label className="block text-[12px] font-semibold text-zinc-700 mb-2">
            Status <span className="text-rose-500">*</span>
          </label>
          <div className="flex items-center gap-5">
            {(['Active', 'Inactive'] as const).map((s) => (
              <label key={s} className="flex items-center gap-1.5 cursor-pointer">
                <span
                  className={`grid h-4 w-4 place-items-center rounded-full border-2 ${status === s ? 'border-indigo-600' : 'border-zinc-300'
                    }`}
                  onClick={() => setStatus(s)}
                >
                  {status === s && <span className="h-2 w-2 rounded-full bg-indigo-600" />}
                </span>
                <span className="text-[12px] text-zinc-700" onClick={() => setStatus(s)}>{s}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button className="flex-1 rounded-lg border border-zinc-200 bg-white px-2 py-2 text-[11px] font-semibold text-zinc-600 shadow-sm hover:bg-zinc-50 transition-colors">
            Cancel
          </button>
          <button className="flex-1 rounded-lg bg-[#16234A] px-4 py-2 text-[11px] font-semibold text-white shadow-sm hover:bg-[#1c2c5c] transition-colors">
            Save Industry
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Status pill ─────────────────────────────────────────────────────────────
function StatusPill({ status }: { status: string }) {
  const active = status === 'Active';
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-bold ${active ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'
        }`}
    >
      {status}
    </span>
  );
}

// ─── Industry List (right) ──────────────────────────────────────────────────
function IndustryListCard() {
  return (
    <div className="rounded-md border border-zinc-200 bg-white shadow-sm p-3">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div>
          <h3 className="text-[15px] font-semibold text-zinc-900">Industry List</h3>
          <p className="text-[12px] text-zinc-400 mt-0.5">All industry types in the system</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search industry..."
              className="w-45 rounded-lg border border-zinc-200 bg-white pl-8 pr-3 py-2 text-[12px] text-zinc-800 shadow-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-colors placeholder:text-zinc-400"
            />
          </div>
          <button className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-[12px] font-semibold text-zinc-600 shadow-sm hover:bg-zinc-50 transition-colors">
            <SlidersHorizontal size={13} /> Filter
          </button>
        </div>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full border-collapse min-w-[680px]">
          <thead>
            <tr className="border-b border-zinc-100">
              <th className="text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-wide py-1.5 pr-1 w-8">#</th>
              <th className="text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-wide py-1.5 pr-1">Industry Name</th>
              <th className="text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-wide py-1.5 pr-1">Industry Code</th>
              <th className="text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-wide py-1.5 pr-1">Status</th>
              <th className="text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-wide py-1.5 pr-1">Updated On</th>
              <th className="text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-wide py-1.5 pr-1">Updated By</th>
              <th className="text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-wide py-1.5 pr-1">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {INDUSTRIES.map((row) => (
              <tr key={row.id} className="hover:bg-zinc-50/60 transition-colors">
                <td className="py-1.5 pr-2 text-[11px] text-zinc-500">{row.id}</td>
                <td className="py-1.5 pr-2 text-[11px] font-semibold text-zinc-900 whitespace-nowrap">{row.name}</td>
                <td className="py-1.5 pr-2 text-[11px] text-zinc-500">{row.code}</td>
                <td className="py-1.5 pr-2"><StatusPill status={row.status} /></td>
                <td className="py-1.5 pr-2 text-[11px] text-zinc-500 whitespace-nowrap">{row.updatedOn}</td>
                <td className="py-1.5 pr-2 text-[11px] text-zinc-700 whitespace-nowrap">{row.updatedBy}</td>
                <td className="py-1.5 pr-2">
                  <div className="flex items-center gap-1.5">
                    <button className="grid h-7 w-7 place-items-center rounded-md border border-indigo-100 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
                      <Pencil size={12} />
                    </button>
                    <button className="grid h-7 w-7 place-items-center rounded-md border border-rose-100 bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap mt-4 pt-3 border-t border-zinc-100">
        <p className="text-[12px] text-zinc-500">Showing 1 to 10 of 45 industries</p>
        <div className="flex items-center gap-2">
          <select className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-[12px] font-semibold text-zinc-600 shadow-sm outline-none">
            <option>10 per page</option>
            <option>25 per page</option>
            <option>50 per page</option>
          </select>
          <div className="flex items-center gap-1">
            <button className="grid h-8 w-8 place-items-center rounded-lg border border-zinc-200 bg-white text-zinc-400 hover:bg-zinc-50 transition-colors">
              <ChevronsLeft size={14} />
            </button>
            <button className="grid h-8 w-8 place-items-center rounded-lg border border-zinc-200 bg-white text-zinc-400 hover:bg-zinc-50 transition-colors">
              <ChevronLeft size={14} />
            </button>
            {PAGES.map((p) => (
              <button
                key={p}
                className={`grid h-8 w-8 place-items-center rounded-lg text-[12px] font-semibold transition-colors ${p === 1 ? 'bg-[#16234A] text-white' : 'border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50'
                  }`}
              >
                {p}
              </button>
            ))}
            <button className="grid h-8 w-8 place-items-center rounded-lg border border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50 transition-colors">
              <ChevronRightIcon size={14} />
            </button>
            <button className="grid h-8 w-8 place-items-center rounded-lg border border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50 transition-colors">
              <ChevronsRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function IndustryManagementPage() {
  return (
    <div className="space-y-4 font-sans text-zinc-900">
      <PageHeading />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_2.6fr] gap-4 items-start">
        <AddNewIndustryCard />
        <IndustryListCard />
      </div>

      <footer className="text-center text-[11px] text-zinc-400 py-4 flex items-center justify-center gap-4 flex-wrap">
        <span>© 2025 Crewcam HRMS. All Rights Reserved.</span>
        <span className="text-indigo-600 hover:underline cursor-pointer">Privacy Policy</span>
        <span className="text-indigo-600 hover:underline cursor-pointer">Terms of Service</span>
      </footer>
    </div>
  );
}