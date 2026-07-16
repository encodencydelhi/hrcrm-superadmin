"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ChevronRight,
    Check,
    Info,
    ChevronDown,
    FileText,
    ArrowRight,
    ArrowLeft,
    Headphones,
    Edit,
    Upload,
    FileBadge2,
    FileBadge,
    CreditCard,
    Files
} from 'lucide-react';
import { useCompanyWizardStore } from '@/store/companyWizardStore';
import api from '@/lib/axios';

type DocKey = 'incorporationCertUrl' | 'gstCertUrl' | 'panCardUrl' | 'otherDocumentUrl';

function DocumentCard({ icon: Icon, title, url, onUpload, uploading }: { icon: React.ElementType; title: string; url: string; onUpload: (file: File) => void; uploading: boolean }) {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <div
            onClick={() => inputRef.current?.click()}
            className="border border-zinc-200 rounded-md p-2 flex flex-col items-center justify-center text-center gap-1.5 hover:border-indigo-300 transition-colors cursor-pointer group"
        >
            <input
                ref={inputRef}
                type="file"
                accept="application/pdf,image/*"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onUpload(file);
                }}
            />
            <div className="flex items-center gap-1.5">
                <Icon size={20} className={url ? 'text-emerald-500' : 'text-zinc-500'} />
                <h3 className="text-[10px] font-bold text-zinc-800">{title}</h3>
            </div>
            {url ? (
                <span className="text-[9px] font-semibold text-emerald-600">Uploaded — click to replace</span>
            ) : (
                <span className="text-[9px] font-semibold text-indigo-600 group-hover:text-indigo-700">{uploading ? 'Uploading…' : 'Upload File'}</span>
            )}
            <span className="text-[8px] text-zinc-400">PDF, JPG (Max. 5MB)</span>
        </div>
    );
}

export default function AddNewCompany() {
    const router = useRouter();
    const w = useCompanyWizardStore();
    const [uploadingDoc, setUploadingDoc] = useState<DocKey | null>(null);

    useEffect(() => {
        if (w.maxStepReached < 3) router.replace(STEP_ROUTES[w.maxStepReached] || '/super-admin/step-1');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const uploadDocument = async (key: DocKey, file: File) => {
        const data = new FormData();
        data.append('file', file);
        setUploadingDoc(key);
        try {
            const res = await api.post('/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } });
            w.update({ [key]: res.data.url } as any);
        } catch (err) {
            console.error('Document upload failed', err);
            alert('Failed to upload document. Max size 5MB.');
        } finally {
            setUploadingDoc(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        w.unlockStep(4);
        router.push('/super-admin/system-configuration');
    };

    return (
        <div className="w-full max-w-[1600px] px-2 py-1 mx-auto space-y-2 font-sans text-zinc-900 min-h-screen bg-zinc-50/50">

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
                    <p className="text-[10px] text-zinc-500">Add primary admin contact and company communication details</p>
                </div>
            </div>

            {/* Stepper */}
            <StepIndicator current={3} maxStepReached={w.maxStepReached} />

            <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-4 gap-2 mt-2">

                {/* Left Column (Main Form) */}
                <div className="xl:col-span-3 space-y-2">
                    <div className="bg-white rounded-lg shadow-sm border border-zinc-200">

                        <div className="px-3 py-1.5 border-b border-zinc-100">
                            <h2 className="text-[12px] font-bold text-zinc-900">Primary Admin Contact</h2>
                            <p className="text-[10px] text-zinc-500 mb-3">Add the main point of contact for this organization</p>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-semibold text-zinc-700">Full Name <span className="text-red-500">*</span></label>
                                    <input type="text" required value={w.adminFullName} onChange={(e) => w.update({ adminFullName: e.target.value })} placeholder="Enter admin full name" className="h-8 px-2 border border-zinc-300 rounded-md text-[11px] text-zinc-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-full" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-semibold text-zinc-700">Designation <span className="text-red-500">*</span></label>
                                    <input type="text" required value={w.adminDesignation} onChange={(e) => w.update({ adminDesignation: e.target.value })} placeholder="e.g. HR Manager" className="h-8 px-2 border border-zinc-300 rounded-md text-[11px] text-zinc-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-full" />
                                </div>
                                <div className="flex flex-col gap-1 md:col-span-1">
                                    <label className="text-[10px] font-semibold text-zinc-700">Email Address <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input type="email" required value={w.adminEmail} onChange={(e) => w.update({ adminEmail: e.target.value })} placeholder="admin@company.com" className="h-8 pl-2 pr-6 border border-zinc-300 rounded-md text-[11px] text-zinc-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-full" />
                                        {w.adminEmail && <Check size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-500" strokeWidth={3} />}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-semibold text-zinc-700">Phone Number <span className="text-red-500">*</span></label>
                                    <div className="flex h-8 border border-zinc-300 rounded-md overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                                        <div className="flex items-center gap-1 px-2 bg-zinc-50 border-r border-zinc-300">
                                            <div className="w-3.5 h-2.5 bg-gradient-to-b from-orange-500 via-white to-green-600 rounded-[1px]"></div>
                                            <span className="text-[10px] font-medium">+91</span>
                                            <ChevronDown size={10} className="text-zinc-500" />
                                        </div>
                                        <input type="text" required value={w.adminPhone} onChange={(e) => w.update({ adminPhone: e.target.value })} placeholder="Enter phone number" className="flex-1 px-2 text-[11px] text-zinc-900 focus:outline-none" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-semibold text-zinc-700">Alternate Email <span className="text-zinc-400 font-normal">(Optional)</span></label>
                                    <input type="email" value={w.alternateEmail} onChange={(e) => w.update({ alternateEmail: e.target.value })} placeholder="Enter alternate email" className="h-8 px-2 border border-zinc-300 rounded-md text-[11px] text-zinc-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-full" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-semibold text-zinc-700">Alternate Phone <span className="text-zinc-400 font-normal">(Optional)</span></label>
                                    <div className="flex h-8 border border-zinc-300 rounded-md overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                                        <div className="flex items-center gap-1 px-2 bg-zinc-50 border-r border-zinc-300">
                                            <div className="w-3.5 h-2.5 bg-gradient-to-b from-orange-500 via-white to-green-600 rounded-[1px]"></div>
                                            <span className="text-[10px] font-medium">+91</span>
                                            <ChevronDown size={10} className="text-zinc-500" />
                                        </div>
                                        <input type="text" value={w.alternatePhone} onChange={(e) => w.update({ alternatePhone: e.target.value })} placeholder="Enter alternate phone" className="flex-1 px-2 text-[11px] text-zinc-900 focus:outline-none" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-semibold text-zinc-700">WhatsApp Number <span className="text-zinc-400 font-normal">(Optional)</span></label>
                                    <div className="flex h-8 border border-zinc-300 rounded-md overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                                        <div className="flex items-center gap-1 px-2 bg-zinc-50 border-r border-zinc-300">
                                            <div className="w-3.5 h-2.5 bg-gradient-to-b from-orange-500 via-white to-green-600 rounded-[1px]"></div>
                                            <span className="text-[10px] font-medium">+91</span>
                                            <ChevronDown size={10} className="text-zinc-500" />
                                        </div>
                                        <input type="text" value={w.whatsappNumber} onChange={(e) => w.update({ whatsappNumber: e.target.value })} placeholder="Enter WhatsApp number" className="flex-1 px-2 text-[11px] text-zinc-900 focus:outline-none" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-semibold text-zinc-700">Preferred Language</label>
                                    <div className="relative">
                                        <select value={w.preferredLanguage} onChange={(e) => w.update({ preferredLanguage: e.target.value })} className="h-8 px-2 w-full border border-zinc-300 rounded-md text-[11px] text-zinc-900 appearance-none focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white">
                                            <option>English</option>
                                        </select>
                                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 flex items-start gap-2 bg-indigo-50/70 p-2 rounded-md border border-indigo-100">
                                <Info size={13} className="text-indigo-600 mt-[1px] shrink-0" />
                                <p className="text-[10px] text-indigo-900 font-medium leading-snug">Credentials will be sent to this email address. The admin will have full access to manage company settings and users.</p>
                            </div>
                        </div>

                        <div className="px-3 py-1.5 border-b border-zinc-100">
                            <h2 className="text-[12px] font-bold text-zinc-900">Company Communication Details</h2>
                            <p className="text-[10px] text-zinc-500 mb-3">Add official communication and operational details</p>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-semibold text-zinc-700">Official Email <span className="text-red-500">*</span></label>
                                    <input type="email" required value={w.email} onChange={(e) => w.update({ email: e.target.value })} placeholder="info@company.com" className="h-8 px-2 border border-zinc-300 rounded-md text-[11px] text-zinc-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-full" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-semibold text-zinc-700">Official Phone <span className="text-red-500">*</span></label>
                                    <div className="flex h-8 border border-zinc-300 rounded-md overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                                        <div className="flex items-center gap-1 px-2 bg-zinc-50 border-r border-zinc-300">
                                            <div className="w-3.5 h-2.5 bg-gradient-to-b from-orange-500 via-white to-green-600 rounded-[1px]"></div>
                                            <span className="text-[10px] font-medium">+91</span>
                                            <ChevronDown size={10} className="text-zinc-500" />
                                        </div>
                                        <input type="text" required value={w.phone} onChange={(e) => w.update({ phone: e.target.value })} placeholder="Enter official phone" className="flex-1 px-2 text-[11px] text-zinc-900 focus:outline-none" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-semibold text-zinc-700">Support Email</label>
                                    <input type="email" value={w.supportEmail} onChange={(e) => w.update({ supportEmail: e.target.value })} placeholder="support@company.com" className="h-8 px-2 border border-zinc-300 rounded-md text-[11px] text-zinc-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-full" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-semibold text-zinc-700">Support Phone</label>
                                    <div className="flex h-8 border border-zinc-300 rounded-md overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                                        <div className="flex items-center gap-1 px-2 bg-zinc-50 border-r border-zinc-300">
                                            <div className="w-3.5 h-2.5 bg-gradient-to-b from-orange-500 via-white to-green-600 rounded-[1px]"></div>
                                            <span className="text-[10px] font-medium">+91</span>
                                            <ChevronDown size={10} className="text-zinc-500" />
                                        </div>
                                        <input type="text" value={w.supportPhone} onChange={(e) => w.update({ supportPhone: e.target.value })} placeholder="Enter support phone" className="flex-1 px-2 text-[11px] text-zinc-900 focus:outline-none" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-2">
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-semibold text-zinc-700">Company Website</label>
                                    <input type="url" value={w.website} onChange={(e) => w.update({ website: e.target.value })} placeholder="https://example.com" className="h-8 px-2 border border-zinc-300 rounded-md text-[11px] text-zinc-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-full" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-semibold text-zinc-700">LinkedIn Profile <span className="text-zinc-400 font-normal">(Optional)</span></label>
                                    <input type="url" value={w.linkedInUrl} onChange={(e) => w.update({ linkedInUrl: e.target.value })} placeholder="https://linkedin.com/company/..." className="h-8 px-2 border border-zinc-300 rounded-md text-[11px] text-zinc-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-full" />
                                </div>
                                <div className="flex flex-col gap-1 md:col-span-2">
                                    <label className="text-[10px] font-semibold text-zinc-700">Company Description <span className="text-zinc-400 font-normal">(Optional)</span></label>
                                    <div className="relative">
                                        <textarea
                                            value={w.description}
                                            onChange={(e) => w.update({ description: e.target.value.slice(0, 300) })}
                                            maxLength={300}
                                            placeholder="Briefly describe the company..."
                                            className="h-14 px-2 py-1.5 border border-zinc-300 rounded-md text-[10px] text-zinc-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-full leading-snug"
                                        />
                                        <span className="absolute bottom-3 right-2  text-[9px] text-zinc-400 bg-white px-1">{w.description.length}/300</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-3 py-1.5">
                            <h2 className="text-[12px] font-bold text-zinc-900">Documents (Optional)</h2>
                            <p className="text-[10px] text-zinc-500 mb-3">Upload any relevant documents for verification and reference</p>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                                <DocumentCard icon={FileBadge} title="Incorporation" url={w.incorporationCertUrl} uploading={uploadingDoc === 'incorporationCertUrl'} onUpload={(f) => uploadDocument('incorporationCertUrl', f)} />
                                <DocumentCard icon={FileText} title="GST Certificate" url={w.gstCertUrl} uploading={uploadingDoc === 'gstCertUrl'} onUpload={(f) => uploadDocument('gstCertUrl', f)} />
                                <DocumentCard icon={CreditCard} title="PAN Card" url={w.panCardUrl} uploading={uploadingDoc === 'panCardUrl'} onUpload={(f) => uploadDocument('panCardUrl', f)} />
                                <DocumentCard icon={Files} title="Other Document" url={w.otherDocumentUrl} uploading={uploadingDoc === 'otherDocumentUrl'} onUpload={(f) => uploadDocument('otherDocumentUrl', f)} />
                            </div>
                        </div>

                        <div className="px-2 py-1.5 border-t border-zinc-100 flex items-center justify-between bg-zinc-50 rounded-b-lg">
                            <button type="button" onClick={() => router.push('/super-admin/step-2')} className="flex items-center gap-1.5 border border-zinc-300 bg-white text-zinc-700 text-[11px] font-bold px-3 py-1.5 rounded shadow-sm hover:bg-zinc-50 transition-colors">
                                <ArrowLeft size={13} /> Back
                            </button>
                            <button type="submit" className="flex items-center gap-1.5 bg-[#020b22] text-white text-[11px] font-bold px-4 py-1.5 rounded shadow-sm hover:bg-zinc-800 transition-colors">
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
                                    <path className="text-[#16a34a]" strokeDasharray="60, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-[11px] font-bold text-white">60%</span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] font-medium text-zinc-400 mb-0.5">Step 3 of 5</span>
                                <span className="text-[11px] font-bold text-white mb-0.5">Admin & Contact Details</span>
                                <span className="text-[9px] text-zinc-300 leading-tight">You're doing great! Just a few steps to go.</span>
                            </div>
                        </div>
                    </div>

                    {/* Setup Summary */}
                    <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-3">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-[11px] text-zinc-900">Setup Summary</h3>
                            <button className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors">Edit</button>
                        </div>

                        <div className="flex flex-col gap-2 text-[10px]">
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-900 font-bold">Company Name</span>
                                <span className="font-bold text-zinc-900">{w.name || '—'}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-900 font-bold">Corporate ID</span>
                                <span className="font-bold text-zinc-900">{w.corporateId || '—'}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-900 font-bold">Industry</span>
                                <span className="font-bold text-zinc-900">{w.industry || '—'}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-900 font-bold">Company Size</span>
                                <span className="font-bold text-zinc-900">{w.companySize || '—'}</span>
                            </div>
                            <div className="flex items-center justify-between mt-1 pt-2 border-t border-zinc-100">
                                <span className="text-zinc-900 font-bold">Selected Plan</span>
                                <div className="flex flex-col items-end">
                                    <span className="font-bold text-zinc-900">{w.selectedPackage?.name || '—'}</span>
                                    {w.selectedPackage && (
                                        <span className="bg-indigo-50 text-indigo-700 text-[8px] font-bold px-1.5 py-0.5 rounded border border-indigo-100 mt-0.5">
                                            ₹ {w.billingCycle === 'YEARLY' ? w.selectedPackage.pricePerUserYearlyINR : w.selectedPackage.pricePerUserMonthlyINR} / Emp / Mo
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-900 font-bold">Billing Cycle</span>
                                <span className="font-bold text-zinc-900">{w.billingCycle === 'YEARLY' ? 'Yearly' : 'Monthly'}</span>
                            </div>
                            <div className="flex items-center justify-between mt-1 pt-2 border-t border-zinc-100">
                                <span className="text-zinc-900 font-bold">Add-on Modules</span>
                                <span className="font-bold text-zinc-900">{w.addonModules.length ? `${w.addonModules.length} Selected` : 'None'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Note */}
                    <div className="bg-[#fffbeb] rounded-lg border border-[#fde68a] p-3 flex items-start gap-2 shadow-sm">
                        <div className="h-5 w-5 rounded-full bg-[#fef3c7] text-[#d97706] flex items-center justify-center shrink-0 border border-[#fde68a]">
                            <Info size={12} strokeWidth={3} />
                        </div>
                        <div>
                            <h4 className="font-bold text-[11px] text-[#92400e] mb-0.5">Note</h4>
                            <p className="text-[10px] text-[#b45309] font-medium leading-snug">You can edit all the details before final confirmation in the next step.</p>
                        </div>
                    </div>

                    {/* Need Help? */}
                    <div className="bg-[#020b22] text-white rounded-lg p-3 shadow-sm">
                        <div className="flex items-start gap-3 mb-3">
                            <div className="h-8 w-8 rounded-full bg-zinc-800 text-white flex items-center justify-center shrink-0">
                                <Headphones size={28} />
                            </div>
                            <div>
                                <h4 className="font-bold text-[12px] mb-0.5">Need Help?</h4>
                                <p className="text-[9px] text-zinc-300 font-medium leading-snug">Our customer success team is here to help you set up your company.</p>
                            </div>
                        </div>
                        <div className='px-11'>
                            <button className="w-full flex items-center justify-center gap-1.5 border border-zinc-700 text-[#bc9a4f] text-[12px] font-bold px-3 py-1 rounded-md hover:bg-zinc-800 transition-colors">
                                Contact Support <ArrowRight size={12} />
                            </button>
                        </div>
                    </div>

                </div>
            </form>

            {/* <div className="pt-3 pb-2 mt-2 flex items-center justify-between text-[9px] text-zinc-500 font-medium">
        <span>© 2025 Crewcam HRMS. All Rights Reserved.</span>
        <div className="flex items-center gap-3">
          <a href="#" className="hover:text-zinc-800 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-zinc-800 transition-colors">Terms of Service</a>
        </div>
      </div> */}

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
