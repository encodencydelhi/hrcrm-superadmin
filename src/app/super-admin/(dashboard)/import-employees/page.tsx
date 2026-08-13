'use client';
import React, { useState } from 'react';
import { Home, ChevronRight, Check, CheckCircle2, UserPlus, Cloud, FileText, Download, UploadCloud, Eye, Trash2, ArrowLeft, ArrowRight, HelpCircle, Phone, FileSpreadsheet, AlertCircle, Calendar, Edit2, Users, Save } from 'lucide-react';

// ─── Static data ────────────────────────────────────────────────────────────
const BREADCRUMB = ['Home', 'Companies', 'TechVision Pvt. Ltd.', 'Onboarding', 'Import Employees'];

const STEPS = [
    { num: 1, label: 'Company Created', status: 'Completed' },
    { num: 2, label: 'Invite Admin Users', status: 'Completed' },
    { num: 3, label: 'Import Employees', status: 'In Progress' },
    { num: 4, label: 'Configure Modules', status: 'Pending' },
    { num: 5, label: 'Run Payroll Setup', status: 'Pending' },
    { num: 6, label: 'Go Live', status: 'Pending' },
];

const GUIDELINES = [
    'First row should contain column headers',
    'Email ID must be unique',
    'Phone number with country code',
    'Date format: DD MMM YYYY',
];

const RECENT_IMPORTS = [
    {
        file: 'employees_may_2025.xlsx', type: 'excel',
        total: 125, success: 118, failed: 7,
        by: 'Rohit Mehta', on: 'May 23, 2025 11:45 AM',
        status: 'Completed', statusColor: 'bg-emerald-100 text-emerald-700'
    },
    {
        file: 'employees_apr_2025.csv', type: 'csv',
        total: 98, success: 98, failed: 0,
        by: 'Rohit Mehta', on: 'May 20, 2025 04:20 PM',
        status: 'Completed', statusColor: 'bg-emerald-100 text-emerald-700'
    },
    {
        file: 'employees_mar_2025.xlsx', type: 'excel_error',
        total: 86, success: 72, failed: 14,
        by: 'Rohit Mehta', on: 'May 15, 2025 10:10 AM',
        status: 'Failed', statusColor: 'bg-red-100 text-red-700'
    },
];

const ADDED_EMPLOYEES = [
    { name: 'Rohit Singh', id: 'EMP1000', email: 'rohit.singh@techvision.com', role: 'HR Manager', initials: 'RS', color: 'bg-emerald-100 text-emerald-700' },
    { name: 'Priya Sharma', id: 'EMP1001', email: 'priya.sharma@techvision.com', role: 'HR Executive', initials: 'PS', color: 'bg-emerald-100 text-emerald-700' },
];

// ─── Breadcrumb + heading ───────────────────────────────────────────────────
function PageHeading() {
    return (
        <section className="space-y-3 mb-3">
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
                <h1 className="text-2xl font-bold text-zinc-900 leading-tight">Import Employees</h1>
                <p className="text-[13px] text-zinc-500 mt-0.5">Upload employee data in bulk or add employees manually.</p>
            </div>
        </section>
    );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────
function ProgressBar() {
    return (
        <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-4 mb-3 flex items-center justify-between overflow-x-auto gap-4">
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
export default function ImportEmployeesPage() {
    const [activeMethod, setActiveMethod] = useState<'import' | 'manual' | 'hris' | 'template'>('manual');

    return (
        <div className="space-y-3 pb-3">
            <PageHeading />
            <ProgressBar />

            <div className={`grid grid-cols-1 gap-3 items-start ${activeMethod === 'manual' ? 'xl:grid-cols-[3.8fr_1fr]' : 'xl:grid-cols-[2.6fr_1fr]'}`}>
                <div className="space-y-3 min-w-0">

                    {/* Choose Import Method */}
                    <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-4">
                        <div className="mb-4">
                            <h2 className="text-[14px] font-bold text-zinc-900">Choose Import Method</h2>
                            <p className="text-[12px] text-zinc-500 mt-0.5">Select the method that works best for you</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            <div onClick={() => setActiveMethod('import')} className={`relative border-2 rounded-lg p-3 cursor-pointer transition-colors ${activeMethod === 'import' ? 'border-indigo-600 bg-indigo-50/30' : 'border-zinc-200 hover:border-indigo-300'}`}>
                                {activeMethod === 'import' && (
                                    <div className="absolute top-2 right-2 w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center">
                                        <Check size={10} className="text-white" />
                                    </div>
                                )}
                                <div className="flex gap-2">
                                    <div className="mt-0.5">
                                        <FileSpreadsheet size={18} className={activeMethod === 'import' ? 'text-indigo-600' : 'text-zinc-600'} />
                                    </div>
                                    <div>
                                        <h3 className="text-[12px] font-bold text-zinc-900 mb-1">Import Excel / CSV</h3>
                                        <p className="text-[10.5px] text-zinc-500 leading-snug">Upload employee data in bulk using Excel or CSV file</p>
                                    </div>
                                </div>
                            </div>

                            <div onClick={() => setActiveMethod('manual')} className={`relative border-2 rounded-lg p-3 cursor-pointer transition-colors ${activeMethod === 'manual' ? 'border-indigo-600 bg-indigo-50/30' : 'border-zinc-200 hover:border-indigo-300'}`}>
                                {activeMethod === 'manual' && (
                                    <div className="absolute top-2 right-2 w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center">
                                        <Check size={10} className="text-white" />
                                    </div>
                                )}
                                <div className="flex gap-2">
                                    <div className="mt-0.5">
                                        <UserPlus size={18} className={activeMethod === 'manual' ? 'text-indigo-600' : 'text-zinc-600'} />
                                    </div>
                                    <div>
                                        <h3 className="text-[12px] font-bold text-zinc-900 mb-1">Add Manually</h3>
                                        <p className="text-[10.5px] text-zinc-500 leading-snug">Add employees one by one</p>
                                    </div>
                                </div>
                            </div>

                            <div onClick={() => setActiveMethod('hris')} className={`relative border-2 rounded-lg p-3 cursor-pointer transition-colors ${activeMethod === 'hris' ? 'border-indigo-600 bg-indigo-50/30' : 'border-zinc-200 hover:border-indigo-300'}`}>
                                {activeMethod === 'hris' && (
                                    <div className="absolute top-2 right-2 w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center">
                                        <Check size={10} className="text-white" />
                                    </div>
                                )}
                                <div className="flex gap-2">
                                    <div className="mt-0.5">
                                        <Cloud size={18} className={activeMethod === 'hris' ? 'text-indigo-600' : 'text-zinc-600'} />
                                    </div>
                                    <div>
                                        <h3 className="text-[12px] font-bold text-zinc-900 mb-1">Integrate from HRIS</h3>
                                        <p className="text-[10.5px] text-zinc-500 leading-snug">Sync employees from existing HRIS</p>
                                    </div>
                                </div>
                            </div>

                            <div onClick={() => setActiveMethod('template')} className={`relative border-2 rounded-lg p-3 cursor-pointer transition-colors ${activeMethod === 'template' ? 'border-indigo-600 bg-indigo-50/30' : 'border-zinc-200 hover:border-indigo-300'}`}>
                                {activeMethod === 'template' && (
                                    <div className="absolute top-2 right-2 w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center">
                                        <Check size={10} className="text-white" />
                                    </div>
                                )}
                                <div className="flex gap-2">
                                    <div className="mt-0.5">
                                        <FileText size={18} className={activeMethod === 'template' ? 'text-indigo-600' : 'text-zinc-600'} />
                                    </div>
                                    <div>
                                        <h3 className="text-[12px] font-bold text-zinc-900 mb-1">Use Template</h3>
                                        <p className="text-[10.5px] text-zinc-500 leading-snug">Download template and we'll import for you</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {activeMethod === 'import' ? (
                        <>
                            {/* Upload and Download Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                                {/* Upload */}
                                <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-4 flex flex-col">
                                    <div className="mb-4">
                                        <h2 className="text-[14px] font-bold text-zinc-900">Upload Employee File</h2>
                                        <p className="text-[12px] text-zinc-500 mt-0.5">Download our template, fill in your data and upload the file</p>
                                    </div>

                                    <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 rounded-lg bg-zinc-50/50 p-6">
                                        <UploadCloud size={24} className="text-zinc-400 mb-2" />
                                        <p className="text-[12px] font-medium text-zinc-700 mb-2">Drag & drop your file here</p>
                                        <p className="text-[11px] text-zinc-400 mb-3">or</p>
                                        <button className="rounded-md bg-[#0B1B3D] px-4 py-2 text-[12px] font-bold text-white shadow-sm hover:bg-[#0B1B3D]/90 transition-colors">
                                            Browse File
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-center gap-4 mt-3 text-[11px] text-zinc-500">
                                        <span>Supported formats: .xlsx, .xls, .csv</span>
                                        <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
                                        <span>Max file size: 10MB</span>
                                    </div>
                                </div>

                                {/* Download */}
                                <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-4">
                                    <div className="mb-4">
                                        <h2 className="text-[14px] font-bold text-zinc-900">Download Template</h2>
                                        <p className="text-[12px] text-zinc-500 mt-0.5">Use our template to ensure data accuracy</p>
                                    </div>

                                    <button className="flex items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-2.5 text-[12px] font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors mb-5 w-fit">
                                        <Download size={14} /> Download Template
                                    </button>

                                    <div>
                                        <h3 className="text-[12px] font-bold text-zinc-900 mb-3">Import Guidelines</h3>
                                        <ul className="space-y-2 mb-3">
                                            {GUIDELINES.map((guide, idx) => (
                                                <li key={idx} className="flex items-center gap-2">
                                                    <Check size={14} className="text-emerald-500 shrink-0" />
                                                    <span className="text-[11.5px] text-zinc-600">{guide}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <button className="flex items-center gap-1.5 text-[11.5px] font-bold text-indigo-600 hover:underline">
                                            <Eye size={14} /> View Full Guidelines
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Imports */}
                            <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-4">
                                <h2 className="text-[14px] font-bold text-zinc-900 mb-4">Recent Imports</h2>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-zinc-200">
                                                <th className="pb-2 text-[11px] font-bold text-zinc-900">File Name</th>
                                                <th className="pb-2 text-[11px] font-bold text-zinc-900 text-center">Total Records</th>
                                                <th className="pb-2 text-[11px] font-bold text-zinc-900 text-center">Successful</th>
                                                <th className="pb-2 text-[11px] font-bold text-zinc-900 text-center">Failed</th>
                                                <th className="pb-2 text-[11px] font-bold text-zinc-900">Imported By</th>
                                                <th className="pb-2 text-[11px] font-bold text-zinc-900">Imported On</th>
                                                <th className="pb-2 text-[11px] font-bold text-zinc-900 text-center">Status</th>
                                                <th className="pb-2 text-[11px] font-bold text-zinc-900 text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {RECENT_IMPORTS.map((item, idx) => (
                                                <tr key={idx} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50/50">
                                                    <td className="py-3">
                                                        <div className="flex items-center gap-2">
                                                            {item.type === 'excel' && (
                                                                <div className="w-6 h-6 rounded bg-emerald-100 flex items-center justify-center text-[8px] font-bold text-emerald-700 shrink-0">XLSX</div>
                                                            )}
                                                            {item.type === 'csv' && (
                                                                <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center text-[8px] font-bold text-blue-700 shrink-0">CSV</div>
                                                            )}
                                                            {item.type === 'excel_error' && (
                                                                <div className="w-6 h-6 rounded bg-red-100 flex items-center justify-center text-[8px] font-bold text-red-700 shrink-0">XLSX</div>
                                                            )}
                                                            <span className="text-[12px] font-medium text-zinc-800">{item.file}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 text-[12px] text-zinc-600 text-center">{item.total}</td>
                                                    <td className="py-3 text-[12px] text-zinc-600 text-center">{item.success}</td>
                                                    <td className="py-3 text-[12px] text-zinc-600 text-center">{item.failed}</td>
                                                    <td className="py-3 text-[12px] text-zinc-600">{item.by}</td>
                                                    <td className="py-3 text-[12px] text-zinc-600">{item.on}</td>
                                                    <td className="py-3 text-center">
                                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap ${item.statusColor}`}>
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-3">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <button className="p-1.5 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors">
                                                                <Eye size={14} />
                                                            </button>
                                                            {item.status === 'Failed' ? (
                                                                <button className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            ) : (
                                                                <button className="p-1.5 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors">
                                                                    <Download size={14} />
                                                                </button>
                                                            )}
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
                        </>
                    ) : activeMethod === 'manual' ? (
                        <div className="grid grid-cols-1 xl:grid-cols-[2.5fr_1fr] gap-3 items-start">
                            {/* Manual Entry Form */}
                            <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-[15px] font-bold text-[#1a1f36]">Employee Information</h2>
                                        <p className="text-[12.5px] text-zinc-500 mt-1">Enter employee details.</p>
                                    </div>
                                    <button className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-4 py-2 text-[12.5px] font-bold text-indigo-700 shadow-sm hover:bg-zinc-50 transition-colors">
                                        <Users size={14} /> Bulk Add Multiple Employees
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-x-3 gap-y-3">
                                    <div>
                                        <label className="block text-[11.5px] font-bold text-[#1a1f36] mb-1.5">First Name <span className="text-red-500">*</span></label>
                                        <input type="text" defaultValue="Priya" className="w-full border border-zinc-200 rounded-md px-3 py-1.5 text-[13px] text-zinc-800 focus:outline-none focus:border-indigo-500" />
                                    </div>
                                    <div>
                                        <label className="block text-[11.5px] font-bold text-[#1a1f36] mb-1.5">Last Name <span className="text-red-500">*</span></label>
                                        <input type="text" defaultValue="Sharma" className="w-full border border-zinc-200 rounded-md px-3 py-1.5 text-[13px] text-zinc-800 focus:outline-none focus:border-indigo-500" />
                                    </div>
                                    <div>
                                        <label className="block text-[11.5px] font-bold text-[#1a1f36] mb-1.5">Employee ID <span className="text-red-500">*</span></label>
                                        <input type="text" defaultValue="EMP1001" className="w-full border border-zinc-200 rounded-md px-3 py-1.5 text-[13px] text-zinc-800 focus:outline-none focus:border-indigo-500 mb-1" />
                                        <p className="text-[9.5px] text-zinc-500 font-medium">Unique ID will be auto generated if left blank.</p>
                                    </div>
                                    <div>
                                        <label className="block text-[11.5px] font-bold text-[#1a1f36] mb-1.5">Email Address <span className="text-red-500">*</span></label>
                                        <input type="email" defaultValue="priya.sharma@techvision.com" className="w-full border border-zinc-200 rounded-md px-3 py-1.5 text-[13px] text-zinc-800 focus:outline-none focus:border-indigo-500" />
                                    </div>

                                    <div>
                                        <label className="block text-[11.5px] font-bold text-[#1a1f36] mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
                                        <div className="flex">
                                            <div className="flex items-center justify-between border border-zinc-200 rounded-l-md px-2 py-1.5 w-[75px] bg-zinc-50 shrink-0">
                                                <span className="text-[12.5px] font-medium flex items-center gap-1"><span className="text-[14px]">🇮🇳</span> +91</span>
                                                <ChevronRight size={12} className="text-zinc-400 rotate-90" />
                                            </div>
                                            <input type="text" defaultValue="98765 43211" className="w-full border border-l-0 border-zinc-200 rounded-r-md px-3 py-1.5 text-[13px] text-zinc-800 focus:outline-none focus:border-indigo-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[11.5px] font-bold text-[#1a1f36] mb-1.5">Date of Birth <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <input type="text" defaultValue="12 May 1992" className="w-full border border-zinc-200 rounded-md pl-3 pr-8 py-1.5 text-[13px] text-zinc-800 focus:outline-none focus:border-indigo-500" />
                                            <Calendar size={14} className="absolute right-3 top-[11px] text-zinc-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[11.5px] font-bold text-[#1a1f36] mb-1.5">Gender <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <select className="w-full border border-zinc-200 rounded-md px-3 py-1.5 text-[13px] text-zinc-800 focus:outline-none focus:border-indigo-500 appearance-none bg-white">
                                                <option>Female</option>
                                            </select>
                                            <ChevronRight size={14} className="absolute right-3 top-[11px] text-zinc-400 rotate-90 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[11.5px] font-bold text-[#1a1f36] mb-1.5">Marital Status</label>
                                        <div className="relative">
                                            <select className="w-full border border-zinc-200 rounded-md px-3 py-1.5 text-[13px] text-zinc-800 focus:outline-none focus:border-indigo-500 appearance-none bg-white">
                                                <option>Married</option>
                                            </select>
                                            <ChevronRight size={14} className="absolute right-3 top-[11px] text-zinc-400 rotate-90 pointer-events-none" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11.5px] font-bold text-[#1a1f36] mb-1.5">Department <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <select className="w-full border border-zinc-200 rounded-md px-3 py-1.5 text-[13px] text-zinc-800 focus:outline-none focus:border-indigo-500 appearance-none bg-white">
                                                <option>Human Resources</option>
                                            </select>
                                            <ChevronRight size={14} className="absolute right-3 top-[11px] text-zinc-400 rotate-90 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[11.5px] font-bold text-[#1a1f36] mb-1.5">Designation <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <select className="w-full border border-zinc-200 rounded-md px-3 py-1.5 text-[13px] text-zinc-800 focus:outline-none focus:border-indigo-500 appearance-none bg-white">
                                                <option>HR Executive</option>
                                            </select>
                                            <ChevronRight size={14} className="absolute right-3 top-[11px] text-zinc-400 rotate-90 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[11.5px] font-bold text-[#1a1f36] mb-1.5">Employment Type <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <select className="w-full border border-zinc-200 rounded-md px-3 py-1.5 text-[13px] text-zinc-800 focus:outline-none focus:border-indigo-500 appearance-none bg-white">
                                                <option>Full Time</option>
                                            </select>
                                            <ChevronRight size={14} className="absolute right-3 top-[11px] text-zinc-400 rotate-90 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[11.5px] font-bold text-[#1a1f36] mb-1.5">Date of Joining <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <input type="text" defaultValue="20 May 2025" className="w-full border border-zinc-200 rounded-md pl-3 pr-8 py-1.5 text-[13px] text-zinc-800 focus:outline-none focus:border-indigo-500" />
                                            <Calendar size={14} className="absolute right-3 top-[11px] text-zinc-400" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11.5px] font-bold text-[#1a1f36] mb-1.5">Reporting Manager</label>
                                        <div className="relative">
                                            <select className="w-full border border-zinc-200 rounded-md px-3 py-1.5 text-[13px] text-zinc-800 focus:outline-none focus:border-indigo-500 appearance-none bg-white">
                                                <option>Rohit Mehta</option>
                                            </select>
                                            <ChevronRight size={14} className="absolute right-3 top-[11px] text-zinc-400 rotate-90 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[11.5px] font-bold text-[#1a1f36] mb-1.5">Work Location <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <select className="w-full border border-zinc-200 rounded-md px-3 py-1.5 text-[13px] text-zinc-800 focus:outline-none focus:border-indigo-500 appearance-none bg-white">
                                                <option>Mumbai</option>
                                            </select>
                                            <ChevronRight size={14} className="absolute right-3 top-[11px] text-zinc-400 rotate-90 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[11.5px] font-bold text-[#1a1f36] mb-1.5">Department Head</label>
                                        <div className="relative">
                                            <select className="w-full border border-zinc-200 rounded-md px-3 py-1.5 text-[13px] text-zinc-800 focus:outline-none focus:border-indigo-500 appearance-none bg-white">
                                                <option>Rohit Mehta</option>
                                            </select>
                                            <ChevronRight size={14} className="absolute right-3 top-[11px] text-zinc-400 rotate-90 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[11.5px] font-bold text-[#1a1f36] mb-1.5">Probation Period (Days)</label>
                                        <input type="text" defaultValue="90" className="w-full border border-zinc-200 rounded-md px-3 py-1.5 text-[13px] text-zinc-800 focus:outline-none focus:border-indigo-500" />
                                    </div>
                                </div>

                                {/* Address Section */}
                                <div className="mt-4 mb-2">
                                    <h3 className="text-[14px] font-bold text-[#1a1f36]">Address</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-x-3 gap-y-3 mb-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-[11.5px] font-bold text-[#1a1f36] mb-1.5">Address Line 1 <span className="text-red-500">*</span></label>
                                        <input type="text" defaultValue="301, Business Park, Sector 62" className="w-full border border-zinc-200 rounded-md px-3 py-1.5 text-[13px] text-zinc-800 focus:outline-none focus:border-indigo-500" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-[11.5px] font-bold text-[#1a1f36] mb-1.5">Address Line 2 (Optional)</label>
                                        <input type="text" defaultValue="Near Infocity" className="w-full border border-zinc-200 rounded-md px-3 py-1.5 text-[13px] text-zinc-800 focus:outline-none focus:border-indigo-500" />
                                    </div>

                                    <div>
                                        <label className="block text-[11.5px] font-bold text-[#1a1f36] mb-1.5">Country <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <select className="w-full border border-zinc-200 rounded-md px-3 py-1.5 text-[13px] text-zinc-800 focus:outline-none focus:border-indigo-500 appearance-none bg-white">
                                                <option>India</option>
                                            </select>
                                            <ChevronRight size={14} className="absolute right-3 top-[11px] text-zinc-400 rotate-90 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[11.5px] font-bold text-[#1a1f36] mb-1.5">State <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <select className="w-full border border-zinc-200 rounded-md px-3 py-1.5 text-[13px] text-zinc-800 focus:outline-none focus:border-indigo-500 appearance-none bg-white">
                                                <option>Maharashtra</option>
                                            </select>
                                            <ChevronRight size={14} className="absolute right-3 top-[11px] text-zinc-400 rotate-90 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[11.5px] font-bold text-[#1a1f36] mb-1.5">City <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <select className="w-full border border-zinc-200 rounded-md px-3 py-1.5 text-[13px] text-zinc-800 focus:outline-none focus:border-indigo-500 appearance-none bg-white">
                                                <option>Mumbai</option>
                                            </select>
                                            <ChevronRight size={14} className="absolute right-3 top-[11px] text-zinc-400 rotate-90 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[11.5px] font-bold text-[#1a1f36] mb-1.5">PIN Code <span className="text-red-500">*</span></label>
                                        <input type="text" defaultValue="400062" className="w-full border border-zinc-200 rounded-md px-3 py-1.5 text-[13px] text-zinc-800 focus:outline-none focus:border-indigo-500" />
                                    </div>
                                </div>

                                {/* Form Footer */}
                                <div className="flex items-center justify-between pt-4 border-t border-zinc-100 mt-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 w-3 h-3" />
                                        <span className="text-[13px] font-medium text-zinc-700">Add another employee</span>
                                    </label>

                                    <div className="flex items-center gap-3">
                                        <button className="px-5 py-1.5 text-[13px] font-bold text-zinc-700 hover:bg-zinc-50 rounded-md border border-zinc-200 transition-colors bg-white shadow-sm">
                                            Cancel
                                        </button>
                                        <button className="flex items-center gap-1.5 px-5 py-1.5 text-[13px] font-bold text-zinc-700 hover:bg-zinc-50 rounded-md border border-zinc-200 transition-colors bg-white shadow-sm">
                                            <Save size={14} /> Save & Add Another
                                        </button>
                                        <button className="flex items-center gap-1.5 rounded-md bg-[#0B1B3D] px-6 py-1.5 text-[13px] font-bold text-white shadow-sm hover:bg-[#0B1B3D]/90 transition-colors">
                                            Save Employee <ArrowRight size={14} className="text-yellow-500" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Added Employees Card */}
                            <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-5">
                                <h3 className="text-[14px] font-bold text-[#1a1f36] mb-4">Added Employees (2)</h3>

                                <div className="space-y-3 mb-4">
                                    {ADDED_EMPLOYEES.map((emp) => (
                                        <div key={emp.id} className="p-3 border border-zinc-100 bg-zinc-50/50 rounded-lg flex items-start gap-3 relative group hover:border-zinc-200 transition-colors">
                                            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[12.5px] shrink-0 ${emp.color}`}>
                                                {emp.initials}
                                            </div>
                                            <div className="pr-8">
                                                <h4 className="text-[13px] font-bold text-zinc-900 leading-tight">{emp.name}</h4>
                                                <p className="text-[11.5px] text-zinc-500 mt-0.5">{emp.id}</p>
                                                <p className="text-[11.5px] text-zinc-500">{emp.email}</p>
                                                <p className="text-[11.5px] text-zinc-500 font-medium">{emp.role}</p>
                                            </div>

                                            <div className="absolute top-3 right-3 flex flex-col gap-2">
                                                <button className="text-zinc-400 hover:text-indigo-600 transition-colors">
                                                    <Edit2 size={13} />
                                                </button>
                                                <button className="text-zinc-400 hover:text-red-600 transition-colors">
                                                    <Trash2 size={13} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full flex items-center justify-center gap-1.5 rounded-md border border-zinc-200 bg-white py-2.5 text-[12.5px] font-bold text-indigo-700 shadow-sm hover:bg-zinc-50 transition-colors">
                                    <Users size={14} /> View All Added Employees
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-4 text-center text-[13px] text-zinc-500">
                            Select an import method or add manually.
                        </div>
                    )}

                    {/* Bottom Actions (Only for import page) */}
                    {activeMethod === 'import' && (
                        <div className="flex items-center justify-between mt-4">
                            <button className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-5 py-2.5 text-[12.5px] font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors">
                                <ArrowLeft size={14} /> Back to Previous Step
                            </button>
                            <div className="flex items-center gap-3">
                                <button className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-5 py-2.5 text-[12.5px] font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors">
                                    Skip for Now
                                </button>
                                <button className="flex items-center gap-1.5 rounded-md bg-[#0B1B3D] px-6 py-2.5 text-[12.5px] font-bold text-white shadow-sm hover:bg-[#0B1B3D]/90 transition-colors">
                                    Continue <ArrowRight size={14} color='#10b981' />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Sidebar */}
                <div className="space-y-3 min-w-0 xl:sticky xl:top-4">
                    {/* Onboarding Progress */}
                    <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-4">
                        <h3 className="text-[13px] font-bold text-zinc-900 mb-4">Onboarding Progress</h3>
                        <div className="flex items-center gap-4">
                            <div className="relative shrink-0 w-14 h-14 rounded-full border-[5px] border-zinc-100 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full border-[5px] border-[#0d7561]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 100%, 50% 50%)' }}></div>
                                <span className="text-[13px] font-bold text-zinc-900">50%</span>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-zinc-900 mb-0.5">Step 3 of 6</p>
                                <p className="text-[12px] font-bold text-indigo-700 mb-0.5">Import Employees</p>
                                <p className="text-[10px] text-zinc-500 leading-snug">Upload your employee data to get started.</p>
                            </div>
                        </div>
                    </div>

                    {/* Onboarding Steps */}
                    <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-4">
                        <h3 className="text-[13px] font-bold text-zinc-900 mb-4">Onboarding Steps</h3>
                        <div className="space-y-3">
                            {STEPS.map((step) => (
                                <div key={step.num} className="flex items-center justify-between text-[11.5px]">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${step.status === 'Completed' ? 'bg-[#0d7561] text-white' : step.status === 'In Progress' ? 'bg-[#0B1B3D] text-white text-[9px] font-bold' : 'bg-zinc-100 text-zinc-400 text-[9px] font-bold'}`}>
                                            {step.status === 'Completed' ? <Check size={10} /> : step.num}
                                        </div>
                                        <span className={step.status === 'Completed' || step.status === 'In Progress' ? 'font-bold text-zinc-900' : 'text-zinc-500'}>
                                            {step.label}
                                        </span>
                                    </div>
                                    <span className={`font-medium ${step.status === 'Completed' ? 'text-emerald-600' : step.status === 'In Progress' ? 'text-zinc-900' : 'text-zinc-400'}`}>
                                        {step.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Employee Summary */}
                    <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-4">
                        <h3 className="text-[13px] font-bold text-zinc-900 mb-3">Employee Summary</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-[11.5px]">
                                <div className="flex items-center gap-2 text-zinc-600">
                                    <UserPlus size={14} /> Total Employees
                                </div>
                                <span className="font-bold text-zinc-900">-</span>
                            </div>
                            <div className="flex items-center justify-between text-[11.5px]">
                                <div className="flex items-center gap-2 text-zinc-600">
                                    <UploadCloud size={14} /> Imported
                                </div>
                                <span className="font-bold text-zinc-900">-</span>
                            </div>
                            <div className="flex items-center justify-between text-[11.5px]">
                                <div className="flex items-center gap-2 text-emerald-600">
                                    <CheckCircle2 size={14} /> Valid
                                </div>
                                <span className="font-bold text-zinc-900">-</span>
                            </div>
                            <div className="flex items-center justify-between text-[11.5px]">
                                <div className="flex items-center gap-2 text-red-600">
                                    <AlertCircle size={14} /> Invalid
                                </div>
                                <span className="font-bold text-zinc-900">-</span>
                            </div>
                        </div>
                    </div>

                    {/* Need Help */}
                    <div className="rounded-lg bg-[#0B1B3D] text-white p-4">
                        <div className="flex gap-3 mb-4">
                            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center shrink-0">
                                <Phone size={16} className="text-white" />
                            </div>
                            <div>
                                <h4 className="text-[13px] font-bold mb-1">Need Help?</h4>
                                <p className="text-[11px] text-blue-100 leading-snug">Our implementation team is here to help you import your employee data.</p>
                            </div>
                        </div>
                        <button className="w-full flex items-center justify-center gap-1.5 rounded-md border border-white/20 bg-transparent py-2.5 text-[12px] font-medium text-[#10b981] hover:bg-white/10 transition-colors">
                            <Phone size={14} /> Schedule a Call
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
