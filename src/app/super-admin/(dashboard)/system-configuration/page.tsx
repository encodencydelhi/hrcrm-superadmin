"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCompanyWizardStore } from '@/store/companyWizardStore';
import {
  ChevronRight,
  Check,
  Info,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Headphones,
  Users,
  CalendarCheck,
  Plane,
  Wallet,
  BarChart,
  UserPlus,
  GraduationCap,
  Monitor,
  Folder,
  Receipt,
  Smartphone,
  Calendar
} from 'lucide-react';

export default function SystemConfiguration() {
  const router = useRouter();
  const w = useCompanyWizardStore();
  const activeModules = w.selectedModules;
  const preferences = w.notificationPreferences;

  useEffect(() => {
    if (w.maxStepReached < 4) router.replace(STEP_ROUTES[w.maxStepReached] || '/super-admin/step-1');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    w.unlockStep(5);
    router.push('/super-admin/review-confirm');
  };

  const enabledCount = Object.values(activeModules).filter(Boolean).length;
  const totalModules = Object.keys(activeModules).length;

  return (
    <div className="w-full max-w-[1600px]  mx-auto space-y-2 font-sans text-zinc-900 min-h-screen bg-zinc-50/50">

      {/* Breadcrumbs */}
      <div className="flex items-center text-[10px] text-zinc-500 font-medium ">
        <span>Home</span>
        <ChevronRight size={12} className="mx-1" />
        <span>Companies</span>
        <ChevronRight size={12} className="mx-1" />
        <span className="text-zinc-800">Add New Company</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between pb-1">
        <div>
          <h1 className="text-[16px] font-bold text-[#020b22]">Add New Company</h1>
          <p className="text-[10px] text-zinc-500">Configure system preferences and enable modules for the organization</p>
        </div>
      </div>

      {/* Stepper */}
      <StepIndicator current={4} maxStepReached={w.maxStepReached} />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-4 gap-2 mt-2">

        {/* Left Column (Main Form) */}
        <div className="xl:col-span-3 space-y-1">

          <div className="bg-white rounded-lg shadow-sm border border-zinc-200">

            {/* System Configuration */}
            <div className="px-3 py-2 border-b border-zinc-100">
              <h2 className="text-[12px] font-bold text-zinc-900">System Configuration</h2>
              <p className="text-[10px] text-zinc-500 mb-2">Set up default preferences for your organization</p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-zinc-700">Financial Year</label>
                  <div className="relative">
                    <select className="h-8 px-2 w-full border border-zinc-300 rounded-md text-[11px] text-zinc-900 appearance-none focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white">
                      <option>April - March (FY 2025-26)</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-zinc-700">Week Starts On</label>
                  <div className="relative">
                    <select className="h-8 px-2 w-full border border-zinc-300 rounded-md text-[11px] text-zinc-900 appearance-none focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white">
                      <option>Monday</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-zinc-700">Date Format</label>
                  <div className="relative">
                    <select className="h-8 px-2 w-full border border-zinc-300 rounded-md text-[11px] text-zinc-900 appearance-none focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white">
                      <option>DD MMM YYYY</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-zinc-700">Time Format</label>
                  <div className="relative">
                    <select className="h-8 px-2 w-full border border-zinc-300 rounded-md text-[11px] text-zinc-900 appearance-none focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white">
                      <option>12 Hours (01:30 PM)</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-zinc-700">First Day of Month</label>
                  <div className="relative">
                    <select className="h-8 px-2 w-full border border-zinc-300 rounded-md text-[11px] text-zinc-900 appearance-none focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white">
                      <option>1st</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-2">
                <div className="flex flex-col gap-1.5 md:col-span-1">
                  <label className="text-[10px] font-semibold text-zinc-700">Timezone</label>
                  <div className="relative">
                    <select className="h-8 px-2 w-full border border-zinc-300 rounded-md text-[11px] text-zinc-900 appearance-none focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white">
                      <option>(GMT+05:30) Asia/Kolkata</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-1">
                  <label className="text-[10px] font-semibold text-zinc-700">Default Currency</label>
                  <div className="relative">
                    <select className="h-8 px-2 w-full border border-zinc-300 rounded-md text-[11px] text-zinc-900 appearance-none focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white">
                      <option>INR (₹) - Indian Rupee</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-1">
                  <label className="text-[10px] font-semibold text-zinc-700">Number Format</label>
                  <div className="relative">
                    <select className="h-8 px-2 w-full border border-zinc-300 rounded-md text-[11px] text-zinc-900 appearance-none focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white">
                      <option>1,23,456.78</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-1">
                  <label className="text-[10px] font-semibold text-zinc-700">Leave Year Start Month</label>
                  <div className="relative">
                    <select className="h-8 px-2 w-full border border-zinc-300 rounded-md text-[11px] text-zinc-900 appearance-none focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white">
                      <option>April</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Modules Selection */}
            <div className="px-3 py-2 border-b border-zinc-100">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-[12px] font-bold text-zinc-900">Modules Selection</h2>
                  <p className="text-[10px] text-zinc-500">Enable or disable modules for this company</p>
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => w.update({ selectedModules: Object.fromEntries(Object.keys(activeModules).map((k) => [k, true])) })} className="text-[10px] font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">Select All</button>
                  <button type="button" onClick={() => w.update({ selectedModules: Object.fromEntries(Object.keys(activeModules).map((k) => [k, false])) })} className="text-[10px] font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">Deselect All</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                {[
                  { id: 'employee', title: 'Employee Management', desc: 'Manage employees, profiles, documents, and organizational structure.', icon: Users, color: 'text-indigo-500' },
                  { id: 'attendance', title: 'Attendance Management', desc: 'Track attendance, shifts, schedules and real-time insights.', icon: CalendarCheck, color: 'text-teal-600' },
                  { id: 'leave', title: 'Leave Management', desc: 'Manage leave policies, requests and approvals.', icon: Plane, color: 'text-emerald-500' },
                  { id: 'payroll', title: 'Payroll Management', desc: 'Process payroll, salary structures, payslips and taxes.', icon: Wallet, color: 'text-orange-500' },

                  { id: 'performance', title: 'Performance Management', desc: 'Set goals, reviews, feedback and performance cycles.', icon: BarChart, color: 'text-purple-500' },
                  { id: 'recruitment', title: 'Recruitment & Onboarding', desc: 'Manage job openings, applicants and onboarding.', icon: UserPlus, color: 'text-pink-600' },
                  { id: 'training', title: 'Training & Development', desc: 'Plan training programs and track employee learning.', icon: GraduationCap, color: 'text-blue-600' },
                  { id: 'assets', title: 'Assets Management', desc: 'Track company assets and maintenance.', icon: Monitor, color: 'text-teal-500' },

                  { id: 'documents', title: 'Documents Management', desc: 'Centralize and manage important documents.', icon: Folder, color: 'text-amber-500' },
                  { id: 'helpdesk', title: 'Helpdesk & Tickets', desc: 'Raise, track and resolve internal tickets.', icon: Headphones, color: 'text-indigo-600' },
                  { id: 'expense', title: 'Expense Management', desc: 'Manage employee expenses and approvals.', icon: Receipt, color: 'text-slate-400' },
                  { id: 'mobile', title: 'Mobile App Access', desc: 'Enable mobile app access for employees.', icon: Smartphone, color: 'text-sky-500' },
                ].map((mod) => (
                  <div key={mod.id} className={`border ${activeModules[mod.id] ? 'border-zinc-200' : 'border-zinc-100 opacity-60'} rounded-lg p-2.5 flex items-start gap-2.5 bg-white`}>
                    <mod.icon size={18} className={mod.color} />
                    <div className="flex-1 flex flex-col gap-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10.5px] font-bold text-zinc-900">{mod.title}</span>
                        {/* Toggle switch placeholder */}
                        <div className={`w-6 h-3.5 rounded-full relative cursor-pointer ${activeModules[mod.id] ? 'bg-emerald-500' : 'bg-zinc-300'}`}
                          onClick={() => w.toggleModule(mod.id)}>
                          <div className={`absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white transition-all ${activeModules[mod.id] ? 'right-0.5' : 'left-0.5'}`} />
                        </div>
                      </div>
                      <p className="text-[9px] text-zinc-500 leading-snug">{mod.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Preferences */}
            <div className="px-3 py-2">
              <h2 className="text-[12px] font-bold text-zinc-900">Additional Preferences</h2>
              <p className="text-[10px] text-zinc-500 mb-2">Set other preferences for the organization</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10.5px] font-bold text-zinc-800">Enable Biometric Integration</span>
                    <Info size={11} className="text-zinc-400" />
                  </div>
                  <div className={`w-6 h-3.5 rounded-full relative cursor-pointer ${preferences.biometric ? 'bg-emerald-500' : 'bg-zinc-300'}`} onClick={() => w.togglePreference('biometric')}>
                    <div className={`absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white transition-all ${preferences.biometric ? 'right-0.5' : 'left-0.5'}`} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10.5px] font-bold text-zinc-800">Enable Single Sign-On (SSO)</span>
                    <Info size={11} className="text-zinc-400" />
                  </div>
                  <div className={`w-6 h-3.5 rounded-full relative cursor-pointer ${preferences.sso ? 'bg-emerald-500' : 'bg-zinc-300'}`} onClick={() => w.togglePreference('sso')}>
                    <div className={`absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white transition-all ${preferences.sso ? 'right-0.5' : 'left-0.5'}`} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10.5px] font-bold text-zinc-800">Enable SMS Notifications</span>
                    <Info size={11} className="text-zinc-400" />
                  </div>
                  <div className={`w-6 h-3.5 rounded-full relative cursor-pointer ${preferences.sms ? 'bg-emerald-500' : 'bg-zinc-300'}`} onClick={() => w.togglePreference('sms')}>
                    <div className={`absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white transition-all ${preferences.sms ? 'right-0.5' : 'left-0.5'}`} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10.5px] font-bold text-zinc-800">Enable Geo Location Tracking</span>
                    <Info size={11} className="text-zinc-400" />
                  </div>
                  <div className={`w-6 h-3.5 rounded-full relative cursor-pointer ${preferences.geoTracking ? 'bg-emerald-500' : 'bg-zinc-300'}`} onClick={() => w.togglePreference('geoTracking')}>
                    <div className={`absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white transition-all ${preferences.geoTracking ? 'right-0.5' : 'left-0.5'}`} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10.5px] font-bold text-zinc-800">Enable Email Notifications</span>
                    <Info size={11} className="text-zinc-400" />
                  </div>
                  <div className={`w-6 h-3.5 rounded-full relative cursor-pointer ${preferences.email ? 'bg-emerald-500' : 'bg-zinc-300'}`} onClick={() => w.togglePreference('email')}>
                    <div className={`absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white transition-all ${preferences.email ? 'right-0.5' : 'left-0.5'}`} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10.5px] font-bold text-zinc-800">Enable WhatsApp Notifications</span>
                    <Info size={11} className="text-zinc-400" />
                  </div>
                  <div className={`w-6 h-3.5 rounded-full relative cursor-pointer ${preferences.whatsapp ? 'bg-emerald-500' : 'bg-zinc-300'}`} onClick={() => w.togglePreference('whatsapp')}>
                    <div className={`absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white transition-all ${preferences.whatsapp ? 'right-0.5' : 'left-0.5'}`} />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-3 py-2 border-t border-zinc-100 flex items-center justify-between bg-zinc-50 rounded-b-lg">
              <button type="button" onClick={() => router.push('/super-admin/step-3')} className="flex items-center gap-1.5 border border-zinc-300 bg-white text-zinc-700 text-[11px] font-bold px-4 py-1.5 rounded shadow-sm hover:bg-zinc-50 transition-colors">
                <ArrowLeft size={13} /> Back
              </button>
              <button type="submit" className="flex items-center gap-1.5 bg-[#020b22] text-white text-[11px] font-bold px-5 py-1.5 rounded shadow-sm hover:bg-zinc-800 transition-colors">
                Save & Next <ArrowRight size={13} className='text-[#bc9a4f]' />
              </button>
            </div>

          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="xl:col-span-1 space-y-2">

          {/* Onboarding Progress */}
          <div className="bg-[#020b22] text-white rounded-lg p-3 shadow-sm">
            <h3 className="font-bold text-[12px] mb-3">Onboarding Progress</h3>

            <div className="flex items-center gap-3">
              <div className="relative h-[55px] w-[55px] shrink-0">
                <svg viewBox="0 0 36 36" className="w-[55px] h-[55px] transform -rotate-90">
                  <path className="text-zinc-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4.5" />
                  <path className="text-[#16a34a]" strokeDasharray="80, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[11px] font-bold text-white">80%</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-medium text-zinc-400 mb-0.5">Step 4 of 5</span>
                <span className="text-[11px] font-bold text-white mb-0.5">Configuration</span>
                <span className="text-[9px] text-zinc-300 leading-tight">You're almost there! Just one more step to complete.</span>
              </div>
            </div>
          </div>

          {/* Configuration Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-zinc-200 px-3.5 py-3.5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[12px] text-zinc-900">Configuration Summary</h3>
              <button className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors">Edit</button>
            </div>

            <div className="flex flex-col gap-3 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-medium">Company Name</span>
                <span className="font-bold text-zinc-900">{w.name || '—'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-medium">Plan</span>
                <span className="font-bold text-zinc-900">{w.selectedPackage?.name || '—'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-medium">Billing</span>
                <span className="font-bold text-zinc-900">
                  {w.selectedPackage ? `₹ ${w.billingCycle === 'YEARLY' ? w.selectedPackage.pricePerUserYearlyINR : w.selectedPackage.pricePerUserMonthlyINR} / Employee / Month` : '—'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-medium">Employees (Estimated)</span>
                <span className="font-bold text-zinc-900">{w.estimatedEmployees}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-medium">Modules Enabled</span>
                <span className="font-bold text-zinc-900">{enabledCount} / {totalModules}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-medium">Admin User</span>
                <span className="font-bold text-zinc-900">{w.adminFullName || '—'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-medium">Financial Year</span>
                <span className="font-bold text-zinc-900">Apr - Mar</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-medium">Week Starts On</span>
                <span className="font-bold text-zinc-900">{w.weekStartsOn}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-medium">Currency</span>
                <span className="font-bold text-zinc-900">{w.baseCurrency}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-medium">Timezone</span>
                <span className="font-bold text-zinc-900">{w.timezone}</span>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="bg-[#fffbeb] rounded-lg border border-[#fde68a] px-3.5 py-3.5 flex items-start gap-3 shadow-sm">
            <div className="h-6 w-6 rounded-full bg-[#fef3c7] text-[#d97706] flex items-center justify-center shrink-0 border border-[#fde68a]">
              <Info size={14} strokeWidth={3} />
            </div>
            <div>
              <h4 className="font-bold text-[12px] text-[#92400e] mb-1">Note</h4>
              <p className="text-[11px] text-[#b45309] font-medium leading-relaxed">You can change these settings anytime from the company settings after creation.</p>
            </div>
          </div>

          {/* Need Help? */}
          <div className="bg-[#020b22] text-white rounded-lg px-3.5 py-4 shadow-sm">
            <div className="flex items-start gap-3 mb-3.5">
              <div className="h-9 w-9 rounded-full  text-white flex items-center justify-center shrink-0">
                <Calendar size={30} />
              </div>
              <div>
                <h4 className="font-bold text-[13px] mb-1">Need Help?</h4>
                <p className="text-[10px] text-zinc-300 font-medium leading-relaxed">Our implementation team is here to help you set up everything perfectly.</p>
              </div>
            </div>
            <div className='px-11'>
              <button className="w-full flex items-center justify-center gap-1.5 border border-zinc-700 text-[#bc9a4f] whitespace-nowrap text-[11px] font-semibold px-3 py-1.5 rounded-md hover:bg-zinc-800 transition-colors">
                <span className="text-zinc-400">📅</span> Schedule Setup Call <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </form>

    </div>
  );
}

const STEP_ROUTES: Record<number, string> = {
    1: '/super-admin/step-1',
    2: '/super-admin/step-2',
    3: '/super-admin/step-3',
    4: '/super-admin/system-configuration',
    5: '/super-admin/review-confirm',
};

function StepIndicator({ current, maxStepReached }: { current: number; maxStepReached: number }) {
    const steps = [
        { id: 1, title: 'Basic Information', subtitle: 'Enter details' },
        { id: 2, title: 'Subscription & Plan', subtitle: 'Select package' },
        { id: 3, title: 'Admin & Contact', subtitle: 'Primary contact details' },
        { id: 4, title: 'Configuration', subtitle: 'System preferences' },
        { id: 5, title: 'Review & Confirm', subtitle: 'Verify and create' },
    ];

    return (
        <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-3 flex items-center justify-between">
            {steps.map((step, index) => {
                const isCompleted = step.id < current;
                const isActive = step.id === current;
                const isPending = step.id > current;
                const isUnlocked = step.id <= maxStepReached;
                const stepLink = STEP_ROUTES[step.id];

                const content = (
                    <>
                        {isCompleted && (
                            <div className="h-10 w-10 rounded-full bg-emerald-100/80 flex items-center justify-center shrink-0 group-hover:bg-emerald-200 transition-colors">
                                <div className="h-6 w-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                            </div>
                        )}
                        {isActive && (
                            <div className="h-10 w-10 rounded-full bg-[#020b22] text-white flex items-center justify-center shrink-0 font-bold text-[14px] shadow-sm">
                                {step.id}
                            </div>
                        )}
                        {isPending && (
                            <div className={`h-10 w-10 rounded-full border flex items-center justify-center shrink-0 font-bold text-[14px] shadow-sm transition-colors ${isUnlocked ? 'bg-slate-100 border-slate-200 text-[#020b22] group-hover:bg-slate-200' : 'bg-slate-50 border-slate-100 text-slate-300'}`}>
                                {step.id}
                            </div>
                        )}

                        <div className="flex flex-col">
                            <span className={`text-[12px] font-bold transition-colors ${isUnlocked ? 'text-[#020b22] group-hover:text-indigo-600' : 'text-slate-300'}`}>{step.title}</span>
                            <span className="text-[11px] text-slate-500 leading-tight mt-0.5">
                                {isCompleted ? 'Completed' : step.subtitle}
                            </span>
                        </div>
                    </>
                );

                return (
                    <div key={step.id} className={`flex items-center gap-3 ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                        {isUnlocked ? (
                            <Link href={stepLink} className="flex items-center gap-3 group">{content}</Link>
                        ) : (
                            <div className="flex items-center gap-3 cursor-not-allowed">{content}</div>
                        )}
                        {index < steps.length - 1 && (
                            <div className="flex-1 h-px bg-slate-200 mx-4 hidden lg:block"></div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
