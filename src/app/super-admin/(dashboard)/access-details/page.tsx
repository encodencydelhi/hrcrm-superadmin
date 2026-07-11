"use client";

import React from 'react';
import {
  ChevronRight, ArrowLeft, Download, ArrowRight, FileText,
  Clock, Eye, Edit2, ShieldAlert, Users, CalendarCheck,
  Plane, Wallet, Folder, BarChart, Settings, Info,
  X, Phone, Mail, MoreVertical, Plus, Save, AlertTriangle, Check
} from 'lucide-react';

export default function AccessDetailsPage() {
  return (
    <div className="w-full max-w-[1600px]  mx-auto space-y-2 font-sans text-zinc-900 min-h-screen bg-zinc-50/50">

      {/* Breadcrumbs */}
      <div className="flex items-center text-[10px] text-zinc-500 font-medium">
        <span>Home</span>
        <ChevronRight size={12} className="mx-1" />
        <span>Technical Access Management</span>
        <ChevronRight size={12} className="mx-1" />
        <span>Request Details</span>
        <ChevronRight size={12} className="mx-1" />
        <span className="text-zinc-800">Access Details</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between pb-1">
        <div>
          <h1 className="text-[16px] font-bold text-[#020b22]">Access Details</h1>
          <p className="text-[10px] text-zinc-500">Configure access level, data scope and permissions for the technical team</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-1.5 border border-zinc-300 bg-white text-zinc-700 text-[11px] font-bold px-3 py-1.5 rounded shadow-sm hover:bg-zinc-50 transition-colors">
            <ArrowLeft size={13} /> Back to Request Details
          </button>
          <button className="flex items-center gap-1.5 border border-zinc-300 bg-white text-zinc-700 text-[11px] font-bold px-3 py-1.5 rounded shadow-sm hover:bg-zinc-50 transition-colors">
            <Download size={13} /> Download
          </button>
          <button className="flex items-center gap-1.5 bg-blue-600 text-white text-[11px] font-bold px-4 py-1.5 rounded shadow-sm hover:bg-blue-700 transition-colors">
            Next: Approvals <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Summary Header Card */}
      <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-4 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4">

        <div className="flex items-start gap-3 w-full lg:w-auto">
          <div className="p-2.5 bg-blue-50 rounded-lg border border-blue-100 shrink-0 mt-0.5">
            <FileText size={20} className="text-blue-600" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] text-zinc-500 font-medium">Request ID</span>
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-[15px] font-bold text-zinc-900">TAR-2025-028</h2>
              <span className="text-[9px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-1.5 py-0.5 rounded">Pending</span>
            </div>
            <p className="text-[10px] text-zinc-500 mt-1 flex items-center gap-1">Requested on 30 May 2025, 11:20 AM</p>
          </div>
        </div>

        <div className="hidden lg:block w-px h-10 bg-zinc-200"></div>

        <div className="flex flex-col w-full lg:w-auto">
          <span className="text-[10px] text-zinc-500 font-medium mb-1">Company</span>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">T</div>
            <span className="text-[12px] font-bold text-zinc-900">TechVision Pvt. Ltd.</span>
          </div>
        </div>

        <div className="hidden lg:block w-px h-10 bg-zinc-200"></div>

        <div className="flex flex-col w-full lg:w-auto">
          <span className="text-[10px] text-zinc-500 font-medium mb-1">Requested By (Crewcam)</span>
          <div className="flex items-center gap-2">
            <img src="https://i.pravatar.cc/150?u=rahul" alt="Rahul Verma" className="w-6 h-6 rounded-full border border-zinc-200" />
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-zinc-900">Rahul Verma</span>
              <span className="text-[9px] text-zinc-500">Sr. Support Engineer</span>
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-px h-10 bg-zinc-200"></div>

        <div className="flex flex-col w-full lg:w-auto">
          <span className="text-[10px] text-zinc-500 font-medium mb-1">Purpose</span>
          <span className="text-[12px] font-bold text-zinc-900">System Maintenance</span>
          <span className="text-[10px] text-zinc-500">Server optimization</span>
        </div>

        <div className="hidden lg:block w-px h-10 bg-zinc-200"></div>

        <div className="flex flex-col w-full lg:w-auto">
          <span className="text-[10px] text-zinc-500 font-medium mb-1">Access Type</span>
          <span className="text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded w-fit mb-1">Time-Bound Access</span>
          <span className="text-[9px] text-zinc-500">Duration: 31 May - 02 Jun 2025 (3 Days)</span>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-zinc-200 px-2 mt-3">
        <button className="pb-2 text-[12px] font-semibold text-zinc-500 hover:text-zinc-700 border-b-2 border-transparent">Request Overview</button>
        <button className="pb-2 text-[12px] font-bold text-blue-700 border-b-2 border-blue-700">Access Details</button>
        <button className="pb-2 text-[12px] font-semibold text-zinc-500 hover:text-zinc-700 border-b-2 border-transparent">Data Access Scope</button>
        <button className="pb-2 text-[12px] font-semibold text-zinc-500 hover:text-zinc-700 border-b-2 border-transparent">Approvals</button>
        <button className="pb-2 text-[12px] font-semibold text-zinc-500 hover:text-zinc-700 border-b-2 border-transparent">Activity Log</button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-2 mt-4">

        {/* Left Column: Access Configuration */}
        <div className="col-span-3 bg-white rounded-lg shadow-sm border border-zinc-200 p-3">
          <h2 className="text-[13px] font-bold text-zinc-900">Access Configuration</h2>
          <p className="text-[10px] text-zinc-500 mb-4">Set access level and permissions for Crewcam technical team</p>

          <h3 className="text-[11px] font-bold text-zinc-800 mb-2">Access Level</h3>
          <div className="grid grid-cols-3 gap-2 mb-5">
            <div className="border-2 border-blue-500 bg-blue-50/30 rounded-lg p-2.5 flex flex-col gap-1 cursor-pointer">
              <div className="flex items-center gap-1.5 mb-1">
                <Eye size={14} className="text-emerald-500" />
                <span className="text-[11px] font-bold text-zinc-900">Read Only</span>
              </div>
              <span className="text-[9px] text-zinc-500 leading-tight">View data only, no changes allowed</span>
            </div>

            <div className="border border-zinc-200 rounded-lg p-2.5 flex flex-col gap-1 cursor-pointer hover:border-zinc-300">
              <div className="flex items-center gap-1.5 mb-1">
                <Edit2 size={14} className="text-amber-500" />
                <span className="text-[11px] font-bold text-zinc-900">Read & Limited Access</span>
              </div>
              <span className="text-[9px] text-zinc-500 leading-tight">View and perform limited actions</span>
            </div>

            <div className="border border-zinc-200 rounded-lg p-2.5 flex flex-col gap-1 cursor-pointer hover:border-zinc-300">
              <div className="flex items-center gap-1.5 mb-1">
                <ShieldAlert size={14} className="text-rose-500" />
                <span className="text-[11px] font-bold text-zinc-900">Full Access</span>
              </div>
              <span className="text-[9px] text-zinc-500 leading-tight">View and perform all actions</span>
            </div>
          </div>

          <h3 className="text-[11px] font-bold text-zinc-800 mb-2">Access Permissions</h3>
          <div className="border border-zinc-200 rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200">
                  <th className="py-2 px-3 text-[10px] font-bold text-zinc-700 w-2/5">Module / Feature</th>
                  <th className="py-2 px-1 text-[9px] font-bold text-zinc-700 text-center">View</th>
                  <th className="py-2 px-1 text-[9px] font-bold text-zinc-700 text-center">Create</th>
                  <th className="py-2 px-1 text-[9px] font-bold text-zinc-700 text-center">Edit</th>
                  <th className="py-2 px-1 text-[9px] font-bold text-zinc-700 text-center">Delete</th>
                  <th className="py-2 px-1 text-[9px] font-bold text-zinc-700 text-center">Export</th>
                </tr>
              </thead>
              <tbody className="text-[10px] text-zinc-700">
                {[
                  { name: 'Employee Master', icon: Users, perms: [1, 0, 0, 0, 1] },
                  { name: 'Attendance', icon: CalendarCheck, perms: [1, 0, 0, 0, 1] },
                  { name: 'Leave Management', icon: Plane, perms: [1, 0, 1, 0, 1] },
                  { name: 'Payroll', icon: Wallet, perms: [1, 0, 0, 0, 1] },
                  { name: 'Documents', icon: Folder, perms: [1, 0, 1, 0, 1] },
                  { name: 'Reports & Analytics', icon: BarChart, perms: [1, 0, 0, 0, 1] },
                  { name: 'System Settings', icon: Settings, perms: [1, 0, 0, 0, 0] },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-zinc-100 last:border-0">
                    <td className="py-2.5 px-3 flex items-center gap-2">
                      <row.icon size={12} className="text-blue-600" />
                      <span className="font-medium text-zinc-800">{row.name}</span>
                    </td>
                    {row.perms.map((p, i) => (
                      <td key={i} className="py-2.5 text-center">
                        {p ? (
                          <div className="w-3.5 h-3.5 bg-blue-600 rounded flex items-center justify-center mx-auto">
                            <Check size={10} className="text-white" strokeWidth={3} />
                          </div>
                        ) : (
                          <span className="text-zinc-300">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 bg-blue-50/50 p-2.5 rounded-md border border-blue-100 flex items-start gap-2">
            <Info size={14} className="text-blue-600 shrink-0 mt-0.5" />
            <span className="text-[10px] text-blue-900 font-medium">Note: Permissions can be customized based on the requirement.</span>
          </div>
        </div>

        {/* Middle Column: Access Constraints */}
        <div className="col-span-2 bg-white rounded-lg shadow-sm border border-zinc-200 p-3">
          <h2 className="text-[13px] font-bold text-zinc-900">Access Constraints</h2>
          <p className="text-[10px] text-zinc-500 mb-5">Define boundaries and restrictions for this access</p>

          <div className="space-y-5">
            {/* IP Restriction */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[11px] font-bold text-zinc-800">IP Restriction</h3>
                <div className="w-7 h-4 rounded-full bg-blue-600 relative cursor-pointer">
                  <div className="absolute right-0.5 top-0.5 w-3 h-3 rounded-full bg-white" />
                </div>
              </div>
              <div className="flex items-center flex-wrap gap-2 p-1 border border-zinc-200 rounded-md bg-white mb-1">
                <div className="flex items-center gap-1 bg-zinc-100 px-2 py-1 rounded text-[10px] font-medium text-zinc-800">
                  203.110.245.0/24
                  <button className="text-zinc-400 hover:text-zinc-600"><X size={10} /></button>
                </div>
                <input type="text" placeholder="Add IP address or range" className="flex-1 min-w-[150px] text-[11px] px-2 outline-none" />
              </div>
              <p className="text-[9px] text-zinc-500">Leave empty to allow all IPs</p>
            </div>

            {/* Access Time Window */}
            <div>
              <h3 className="text-[11px] font-bold text-zinc-800 mb-2">Access Time Window</h3>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex-1 flex items-center justify-between border border-zinc-200 rounded-md px-3 py-1.5 bg-white">
                  <span className="text-[11px] text-zinc-800 font-medium">09:00 AM</span>
                  <Clock size={12} className="text-zinc-400" />
                </div>
                <span className="text-[10px] text-zinc-400 font-medium">to</span>
                <div className="flex-1 flex items-center justify-between border border-zinc-200 rounded-md px-3 py-1.5 bg-white">
                  <span className="text-[11px] text-zinc-800 font-medium">06:00 PM</span>
                  <Clock size={12} className="text-zinc-400" />
                </div>
              </div>
              <p className="text-[9px] text-zinc-500">Access allowed only during this time window</p>
            </div>

            {/* Session Timeout */}
            <div>
              <h3 className="text-[11px] font-bold text-zinc-800 mb-2">Session Timeout</h3>
              <select className="w-full border border-zinc-200 rounded-md px-3 py-1.5 text-[11px] font-medium text-zinc-800 outline-none mb-1 appearance-none bg-white">
                <option>30 Minutes</option>
              </select>
              <p className="text-[9px] text-zinc-500">User will be logged out after inactivity</p>
            </div>

            {/* Access Revocation */}
            <div>
              <h3 className="text-[11px] font-bold text-zinc-800 mb-2">Access Revocation</h3>
              <label className="flex items-start gap-2 cursor-pointer mb-3">
                <div className="w-3.5 h-3.5 bg-blue-600 rounded flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={10} className="text-white" strokeWidth={3} />
                </div>
                <span className="text-[11px] font-bold text-zinc-800">Automatically revoke access after duration ends</span>
              </label>

              <div className="bg-blue-50/50 p-3 rounded-md border border-blue-100 flex items-start gap-2">
                <Info size={14} className="text-blue-600 shrink-0 mt-0.5" />
                <p className="text-[10px] text-blue-900 font-medium leading-relaxed">
                  Access will be automatically revoked on <br />
                  <span className="font-bold text-blue-700">02 Jun 2025, 06:00 PM</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Technical Team Access */}
        <div className=" col-span-2 bg-white rounded-lg shadow-sm border border-zinc-200 p-3">
          <h2 className="text-[13px] font-bold text-zinc-900">Technical Team Access</h2>
          <p className="text-[10px] text-zinc-500 mb-4">Crewcam team members who will have access</p>

          <div className="flex flex-col gap-2 mb-4">

            {/* Member 1 (Primary) */}
            <div className="border border-zinc-200 rounded-md p-3 flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <img src="https://i.pravatar.cc/150?u=rahul" alt="Rahul Verma" className="w-8 h-8 rounded-full border border-zinc-200" />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-zinc-900">Rahul Verma</span>
                    <span className="text-[9px] text-zinc-500">Sr. Support Engineer</span>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded">Primary</span>
              </div>
              <div className="flex items-center justify-between text-[9px] text-zinc-500 pl-[42px]">
                <span>rahul.verma@crewcam.com</span>
                <div className="flex items-center gap-2">
                  <button className="text-blue-600 hover:text-blue-800"><Phone size={12} /></button>
                  <button className="text-blue-600 hover:text-blue-800"><Mail size={12} /></button>
                </div>
              </div>
            </div>

            {/* Member 2 */}
            <div className="border border-zinc-200 rounded-md p-3 flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <img src="https://i.pravatar.cc/150?u=amit2" alt="Amit Kumar" className="w-8 h-8 rounded-full border border-zinc-200" />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-zinc-900">Amit Kumar</span>
                    <span className="text-[9px] text-zinc-500">System Engineer</span>
                  </div>
                </div>
                <button className="text-zinc-400 hover:text-zinc-600"><MoreVertical size={14} /></button>
              </div>
              <div className="flex items-center justify-between text-[9px] text-zinc-500 pl-[42px]">
                <span>amit.kumar@crewcam.com</span>
                <div className="flex items-center gap-2">
                  <button className="text-blue-600 hover:text-blue-800"><Phone size={12} /></button>
                  <button className="text-blue-600 hover:text-blue-800"><Mail size={12} /></button>
                </div>
              </div>
            </div>

            {/* Member 3 */}
            <div className="border border-zinc-200 rounded-md p-3 flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <img src="https://i.pravatar.cc/150?u=neha" alt="Neha Singh" className="w-8 h-8 rounded-full border border-zinc-200" />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-zinc-900">Neha Singh</span>
                    <span className="text-[9px] text-zinc-500">Database Specialist</span>
                  </div>
                </div>
                <button className="text-zinc-400 hover:text-zinc-600"><MoreVertical size={14} /></button>
              </div>
              <div className="flex items-center justify-between text-[9px] text-zinc-500 pl-[42px]">
                <span>neha.singh@crewcam.com</span>
                <div className="flex items-center gap-2">
                  <button className="text-blue-600 hover:text-blue-800"><Phone size={12} /></button>
                  <button className="text-blue-600 hover:text-blue-800"><Mail size={12} /></button>
                </div>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-1.5 border border-dashed border-zinc-300 text-blue-600 text-[11px] font-bold py-2 rounded-md hover:bg-blue-50 transition-colors mt-2">
              <Plus size={14} /> Add Team Member
            </button>
          </div>

          <div className="bg-amber-50/50 border border-amber-100 rounded-md p-3 flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <ShieldAlert size={14} className="text-amber-600" />
              <h4 className="text-[11px] font-bold text-amber-900">Important</h4>
            </div>
            <ul className="text-[10px] text-amber-800 space-y-1.5 pl-5 list-disc">
              <li>Access is strictly for the purpose mentioned in the request.</li>
              <li>Do not share or transfer access credentials.</li>
              <li>All activities will be logged and monitored.</li>
              <li>Violation may lead to immediate access revocation.</li>
            </ul>
          </div>
        </div>

      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between mt-2 pt-2 pb-2">
        <button className="flex items-center gap-1.5 text-[12px] font-bold text-rose-600 hover:text-rose-700">
          <div className="w-4 h-4 rounded-full border border-rose-600 flex items-center justify-center">
            <X size={10} strokeWidth={3} />
          </div>
          Cancel Request
        </button>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 border border-zinc-300 bg-white text-zinc-700 text-[12px] font-bold px-4 py-2 rounded shadow-sm hover:bg-zinc-50 transition-colors">
            <Save size={14} /> Save as Draft
          </button>
          <button className="flex items-center gap-1.5 bg-blue-600 text-white text-[12px] font-bold px-5 py-2 rounded shadow-sm hover:bg-blue-700 transition-colors">
            Next: Data Access Scope <ArrowRight size={14} />
          </button>
        </div>
      </div>

    </div>
  );
}
