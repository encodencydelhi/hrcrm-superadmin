'use client';
import React from 'react';
import { Home, ChevronRight, Check, CheckCircle2, Search, XCircle, Building2, User, Users, FileText, Settings, Briefcase, Calendar, ShieldCheck, Mail, MessageCircle, MessageSquare, RefreshCw, Send, Eye, Trash2, MoreVertical, ArrowLeft, ArrowRight, PlayCircle, HelpCircle, Phone, Globe, Info, Clock, CheckCircle } from 'lucide-react';

// ─── Static data ────────────────────────────────────────────────────────────
const BREADCRUMB = ['Home', 'Companies', 'TechVision Pvt. Ltd.', 'Onboarding', 'Invite Admin Users'];

const STEPS = [
    { num: 1, label: 'Company Created', status: 'Completed' },
    { num: 2, label: 'Invite Admin Users', status: 'In Progress' },
    { num: 3, label: 'Import Employees', status: 'Pending' },
    { num: 4, label: 'Configure Modules', status: 'Pending' },
    { num: 5, label: 'Run Payroll Setup', status: 'Pending' },
    { num: 6, label: 'Go Live', status: 'Pending' },
];

const PERMISSIONS = [
    'Employee Management',
    'Attendance Management',
    'Leave Management',
    'Payroll Management',
    'Recruitment & Onboarding',
    'Performance Management',
    'Reports & Analytics',
    'Documents Management',
    'Company Settings',
    'All Modules Access',
];

const ADMINS = [
    {
        name: 'Rohit Mehta', role: 'HR Manager', email: 'rohit.mehta@techvision.com',
        adminRole: 'Company Admin', roleColor: 'bg-blue-100 text-blue-700',
        via: ['email'], status: 'Pending', statusColor: 'bg-amber-100 text-amber-700',
        sentOn: 'May 23, 2025 11:45 AM', expiresOn: 'May 25, 2025 11:45 AM'
    },
    {
        name: 'Priya Sharma', role: 'HR Executive', email: 'priya.sharma@techvision.com',
        adminRole: 'HR Admin', roleColor: 'bg-purple-100 text-purple-700',
        via: ['email', 'whatsapp'], status: 'Accepted', statusColor: 'bg-emerald-100 text-emerald-700',
        sentOn: 'May 22, 2025 04:20 PM', expiresOn: '-'
    },
    {
        name: 'Amit Verma', role: 'Payroll Specialist', email: 'amit.verma@techvision.com',
        adminRole: 'Payroll Admin', roleColor: 'bg-orange-100 text-orange-700',
        via: ['email'], status: 'Expired', statusColor: 'bg-red-100 text-red-700',
        sentOn: 'May 20, 2025 10:10 AM', expiresOn: 'May 22, 2025 10:10 AM'
    },
];

// ─── Breadcrumb + heading ───────────────────────────────────────────────────
function PageHeading() {
    return (
        <section className="space-y-3 mb-4">
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

            <div>
                <h1 className="text-2xl font-bold text-zinc-900 leading-tight">Invite Admin Users</h1>
                <p className="text-[13px] text-zinc-500 mt-0.5">Add administrators who will help manage your company on Crewcam HRMS.</p>
            </div>
        </section>
    );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────
function ProgressBar() {
    return (
        <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-4 mb-4 flex items-center justify-between overflow-x-auto gap-4">
            {STEPS.map((step, idx) => (
                <React.Fragment key={step.num}>
                    <div className="flex items-center gap-2 shrink-0">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full text-[13px] font-bold shrink-0 ${step.status === 'Completed' ? 'bg-emerald-500 text-white' : step.status === 'In Progress' ? 'bg-[#0B1B3D] text-white' : 'bg-zinc-100 text-zinc-400'}`}>
                            {step.status === 'Completed' ? <Check size={16} /> : step.num}
                        </div>
                        <div className="flex flex-col">
                            <span className={`text-[12px] font-bold ${step.status === 'Completed' || step.status === 'In Progress' ? 'text-zinc-900' : 'text-zinc-400'}`}>{step.label}</span>
                            <span className="text-[10px] text-zinc-400">{step.status}</span>
                        </div>
                    </div>
                    {idx < STEPS.length - 1 && (
                        <div className="flex-1 min-w-[20px] h-[1px] bg-zinc-200"></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}

// ─── Main Content ─────────────────────────────────────────────────────────
export default function InviteAdminUsersPage() {
    return (
        <div className="space-y-3 pb-3">
            <PageHeading />
            <ProgressBar />

            <div className="grid grid-cols-1 xl:grid-cols-[2.6fr_1fr] gap-3 items-start">
                <div className="space-y-3 min-w-0">

                    {/* Administrator Details */}
                    <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-4">
                        <div className="mb-4">
                            <h2 className="text-[14px] font-bold text-zinc-900">Administrator Details</h2>
                            <p className="text-[12px] text-zinc-500 mt-0.5">Enter administrator information and send invitation</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className="block text-[11px] font-bold text-zinc-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                                <input type="text" defaultValue="Rohit Mehta" className="w-full border border-zinc-200 rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-zinc-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                                <input type="email" defaultValue="rohit.mehta@techvision.com" className="w-full border border-zinc-200 rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-zinc-700 mb-1">Designation <span className="text-red-500">*</span></label>
                                <input type="text" defaultValue="HR Manager" className="w-full border border-zinc-200 rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-zinc-700 mb-1">Phone Number</label>
                                <div className="flex">
                                    <div className="flex items-center justify-between border border-zinc-200 rounded-l-md px-2 py-2 w-20 bg-zinc-50 shrink-0">
                                        <span className="text-[12px] font-medium flex items-center gap-1"><span className="text-[14px]">🇮🇳</span> +91</span>
                                        <ChevronRight size={12} className="text-zinc-400 rotate-90" />
                                    </div>
                                    <input type="text" defaultValue="98765 43210" className="w-full border border-l-0 border-zinc-200 rounded-r-md px-3 py-2 text-[12px] focus:outline-none focus:border-indigo-500" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-zinc-700 mb-1">Department</label>
                                <select className="w-full border border-zinc-200 rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-indigo-500 appearance-none bg-white">
                                    <option>Human Resources</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-zinc-700 mb-1">Admin Role <span className="text-red-500">*</span></label>
                                <select className="w-full border border-zinc-200 rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-indigo-500 appearance-none bg-white">
                                    <option>Company Admin</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-zinc-700 mb-1">Preferred Language</label>
                                <select className="w-full border border-zinc-200 rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-indigo-500 appearance-none bg-white">
                                    <option>English</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <div className="mb-4">
                                    <label className="block text-[11px] font-bold text-zinc-700 mb-2">Send Invitation Via</label>
                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center gap-1.5 cursor-pointer">
                                            <input type="checkbox" defaultChecked className="rounded text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5 border-zinc-300" />
                                            <span className="text-[12px] font-medium text-zinc-700">Email</span>
                                        </label>
                                        <label className="flex items-center gap-1.5 cursor-pointer">
                                            <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5 border-zinc-300" />
                                            <span className="text-[12px] font-medium text-zinc-700 flex items-center gap-1">WhatsApp <MessageCircle size={14} className="text-emerald-500" /></span>
                                        </label>
                                        <label className="flex items-center gap-1.5 cursor-pointer">
                                            <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5 border-zinc-300" />
                                            <span className="text-[12px] font-medium text-zinc-700 flex items-center gap-1">SMS <MessageSquare size={14} className="text-blue-500" /></span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold text-zinc-700 mb-1">Personal Message (Optional)</label>
                                    <div className="relative">
                                        <textarea
                                            rows={4}
                                            defaultValue={"Hi Rohit,\nYou have been invited to join TechVision Pvt. Ltd. as a Company Administrator on Crewcam HRMS.\nPlease use the invitation link to activate your account."}
                                            className="w-full border border-zinc-200 rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-indigo-500 resize-none text-zinc-700"
                                        />
                                        <div className="absolute bottom-2 right-2 text-[10px] text-zinc-400">162/500</div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <button className="flex items-center gap-1.5 text-[11.5px] font-medium text-indigo-600 hover:underline">
                                        <RefreshCw size={12} /> Use Default Message
                                    </button>
                                </div>
                            </div>

                            <div className="rounded-md bg-slate-50 border border-slate-100 p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-[12.5px] font-bold text-zinc-900">Permission Preview</h3>
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">Full Access</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mb-4">
                                    {PERMISSIONS.map(perm => (
                                        <div key={perm} className="flex items-center gap-1.5">
                                            <Check size={14} className="text-emerald-500 shrink-0" />
                                            <span className="text-[11.5px] text-zinc-600">{perm}</span>
                                        </div>
                                    ))}
                                </div>
                                <button className="flex items-center justify-center gap-1.5 w-full rounded-md border border-zinc-200 bg-white py-2 text-[12px] font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors">
                                    <Eye size={14} /> View All Permissions
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 mt-4 border-t border-zinc-100 pt-4">
                            <button className="flex items-center justify-center gap-1.5 rounded-md border border-zinc-200 bg-white px-5 py-2.5 text-[12.5px] font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors">
                                <span className="text-[14px]">+</span> Add Another Admin
                            </button>
                            <button className="flex items-center justify-center gap-1.5 rounded-md bg-[#0B1B3D] px-6 py-2.5 text-[12.5px] font-bold text-white shadow-sm hover:bg-[#0B1B3D]/90 transition-colors">
                                Send Invitation <Send size={14} className="ml-1" />
                            </button>
                        </div>
                    </div>

                    {/* Invited Administrators */}
                    <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-4">
                        <div className="mb-4">
                            <h2 className="text-[14px] font-bold text-zinc-900">Invited Administrators</h2>
                            <p className="text-[12px] text-zinc-500 mt-0.5">Track and manage all invited administrators</p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-zinc-200">
                                        <th className="pb-2 text-[11px] font-bold text-zinc-900">Admin</th>
                                        <th className="pb-2 text-[11px] font-bold text-zinc-900">Email</th>
                                        <th className="pb-2 text-[11px] font-bold text-zinc-900">Role</th>
                                        <th className="pb-2 text-[11px] font-bold text-zinc-900">Invitation Via</th>
                                        <th className="pb-2 text-[11px] font-bold text-zinc-900">Status</th>
                                        <th className="pb-2 text-[11px] font-bold text-zinc-900">Sent On</th>
                                        <th className="pb-2 text-[11px] font-bold text-zinc-900">Expires On</th>
                                        <th className="pb-2 text-[11px] font-bold text-zinc-900 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ADMINS.map((admin, idx) => (
                                        <tr key={idx} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50/50">
                                            <td className="py-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[12px] shrink-0">
                                                        {admin.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <p className="text-[12px] font-bold text-zinc-900">{admin.name}</p>
                                                        <p className="text-[11px] text-zinc-500">{admin.role}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 text-[12px] text-zinc-600">{admin.email}</td>
                                            <td className="py-3">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap ${admin.roleColor}`}>
                                                    {admin.adminRole}
                                                </span>
                                            </td>
                                            <td className="py-3">
                                                <div className="flex items-center gap-1.5">
                                                    {admin.via.includes('email') && <Mail size={13} className="text-zinc-500" />}
                                                    {admin.via.includes('whatsapp') && <MessageCircle size={13} className="text-emerald-500" />}
                                                </div>
                                            </td>
                                            <td className="py-3">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap ${admin.statusColor}`}>
                                                    {admin.status}
                                                </span>
                                            </td>
                                            <td className="py-3">
                                                <p className="text-[11.5px] font-medium text-zinc-800">{admin.sentOn.split(' ')[0]} {admin.sentOn.split(' ')[1]}, {admin.sentOn.split(' ')[2]}</p>
                                                <p className="text-[10px] text-zinc-500">{admin.sentOn.split(' ')[3]} {admin.sentOn.split(' ')[4]}</p>
                                            </td>
                                            <td className="py-3">
                                                {admin.expiresOn !== '-' ? (
                                                    <>
                                                        <p className="text-[11.5px] font-medium text-zinc-800">{admin.expiresOn.split(' ')[0]} {admin.expiresOn.split(' ')[1]}, {admin.expiresOn.split(' ')[2]}</p>
                                                        <p className="text-[10px] text-zinc-500">{admin.expiresOn.split(' ')[3]} {admin.expiresOn.split(' ')[4]}</p>
                                                    </>
                                                ) : (
                                                    <span className="text-[12px] text-zinc-400">-</span>
                                                )}
                                            </td>
                                            <td className="py-3">
                                                <div className="flex items-center justify-end gap-1">
                                                    {admin.status !== 'Accepted' ? (
                                                        <button className="p-1.5 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors">
                                                            <Send size={14} />
                                                        </button>
                                                    ) : (
                                                        <button className="p-1.5 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors">
                                                            <Eye size={14} />
                                                        </button>
                                                    )}
                                                    {admin.status !== 'Accepted' && (
                                                        <button className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                                                            <Trash2 size={14} />
                                                        </button>
                                                    )}
                                                    <button className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded transition-colors">
                                                        <MoreVertical size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-3 text-[11px] text-zinc-500">
                            Showing 1 to 3 of 3 results
                        </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex items-center justify-between mt-4">
                        <button className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-5 py-2.5 text-[12.5px] font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors">
                            <ArrowLeft size={14} /> Back
                        </button>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-5 py-2.5 text-[12.5px] font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors">
                                Skip for Now
                            </button>
                            <button className="flex items-center gap-1.5 rounded-md bg-[#0B1B3D] px-6 py-2.5 text-[12.5px] font-bold text-white shadow-sm hover:bg-[#0B1B3D]/90 transition-colors">
                                Continue <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>

                </div>

                {/* Right Sidebar */}
                <div className="space-y-3 min-w-0 xl:sticky xl:top-4">

                    {/* Onboarding Progress */}
                    <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-4">
                        <h3 className="text-[13px] font-bold text-zinc-900 mb-4">Onboarding Progress</h3>
                        <div className="flex items-center gap-4">
                            <div className="relative shrink-0 w-14 h-14 rounded-full border-[3px] border-zinc-100 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full border-[3px] border-[#0B1B3D]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 67%)' }}></div>
                                <span className="text-[13px] font-bold text-zinc-900">33%</span>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-zinc-900 mb-0.5">Step 2 of 6</p>
                                <p className="text-[12px] font-bold text-indigo-700 mb-0.5">Invite Admin Users</p>
                                <p className="text-[10px] text-zinc-500 leading-snug">Add your team members who will manage this company.</p>
                            </div>
                        </div>
                    </div>

                    {/* Company Summary */}
                    <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-4">
                        <h3 className="text-[13px] font-bold text-zinc-900 mb-3">Company Summary</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-[11.5px]">
                                <div className="flex items-center gap-2 text-zinc-600">
                                    <Building2 size={14} /> Company Name
                                </div>
                                <span className="font-medium text-zinc-900">TechVision Pvt. Ltd.</span>
                            </div>
                            <div className="flex items-center justify-between text-[11.5px]">
                                <div className="flex items-center gap-2 text-zinc-600">
                                    <Globe size={14} /> Company ID
                                </div>
                                <span className="font-bold text-zinc-900">TECHVISION_001</span>
                            </div>
                            <div className="flex items-center justify-between text-[11.5px]">
                                <div className="flex items-center gap-2 text-zinc-600">
                                    <div className="w-3.5 h-3.5 rounded-full border-2 border-indigo-500 shrink-0 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                                    </div>
                                    Plan
                                </div>
                                <span className="font-medium text-zinc-900">Professional</span>
                            </div>
                            <div className="flex items-center justify-between text-[11.5px]">
                                <div className="flex items-center gap-2 text-zinc-600">
                                    <Users size={14} /> Employees (Estimated)
                                </div>
                                <span className="font-medium text-zinc-900">100</span>
                            </div>
                            <div className="flex items-center justify-between text-[11.5px]">
                                <div className="flex items-center gap-2 text-zinc-600">
                                    <User size={14} /> Primary Admin
                                </div>
                                <span className="font-medium text-zinc-900">Rohit Mehta</span>
                            </div>
                            <div className="flex items-center justify-between text-[11.5px]">
                                <div className="flex items-center gap-2 text-zinc-600">
                                    <Settings size={14} /> Modules Enabled
                                </div>
                                <span className="font-medium text-zinc-900">10 / 12</span>
                            </div>
                        </div>
                    </div>

                    {/* Invitation Summary */}
                    <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-4">
                        <h3 className="text-[13px] font-bold text-zinc-900 mb-3">Invitation Summary</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-[11.5px]">
                                <div className="flex items-center gap-2 text-zinc-600">
                                    <Users size={14} /> Total Admins
                                </div>
                                <span className="font-bold text-zinc-900">3</span>
                            </div>
                            <div className="flex items-center justify-between text-[11.5px]">
                                <div className="flex items-center gap-2 text-zinc-600">
                                    <Mail size={14} /> Sent
                                </div>
                                <span className="font-bold text-zinc-900">3</span>
                            </div>
                            <div className="flex items-center justify-between text-[11.5px]">
                                <div className="flex items-center gap-2 text-emerald-600">
                                    <CheckCircle size={14} /> Accepted
                                </div>
                                <span className="font-bold text-zinc-900">1</span>
                            </div>
                            <div className="flex items-center justify-between text-[11.5px]">
                                <div className="flex items-center gap-2 text-amber-600">
                                    <Clock size={14} /> Pending
                                </div>
                                <span className="font-bold text-zinc-900">1</span>
                            </div>
                            <div className="flex items-center justify-between text-[11.5px]">
                                <div className="flex items-center gap-2 text-red-600">
                                    <XCircle size={14} /> Expired
                                </div>
                                <span className="font-bold text-zinc-900">1</span>
                            </div>
                        </div>
                    </div>

                    {/* Important Note */}
                    <div className="rounded-sm bg-amber-50 border border-amber-100 p-3">
                        <div className="flex gap-2">
                            <Info size={14} className="text-amber-600 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-[12px] font-bold text-amber-900 mb-1">Important Note</h4>
                                <p className="text-[10.5px] text-amber-800 leading-snug">Invitations are valid for 48 hours. Expired invitations can be resent anytime.</p>
                            </div>
                        </div>
                    </div>

                    {/* Need Help */}
                    <div className="rounded-lg bg-[#0B1B3D] text-white p-4">
                        <div className="flex gap-3 mb-4">
                            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center shrink-0">
                                <HelpCircle size={18} className="text-white" />
                            </div>
                            <div>
                                <h4 className="text-[13px] font-bold mb-1">Need Help?</h4>
                                <p className="text-[11px] text-blue-100 leading-snug">Our customer success team is here to help you set up your company.</p>
                            </div>
                        </div>
                        <button className="w-full flex items-center justify-center gap-1.5 rounded-md border border-white/20 bg-transparent py-2.5 text-[12px] font-medium text-white hover:bg-white/10 transition-colors">
                            Contact Support <ArrowRight size={14} className="ml-1" />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
