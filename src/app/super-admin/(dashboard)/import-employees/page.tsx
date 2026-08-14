'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Home, ChevronRight, Check, CheckCircle2, UserPlus, Cloud, FileText, Download, UploadCloud, Eye, Trash2, ArrowLeft, ArrowRight, Phone, FileSpreadsheet, AlertCircle, XCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/lib/axios';
import Papa from 'papaparse';

// ─── Static data ────────────────────────────────────────────────────────────
const STEPS = [
    { num: 1, label: 'Company Created', status: 'Completed' },
    { num: 2, label: 'Invite Admin Users', status: 'Completed' },
    { num: 3, label: 'Import Employees', status: 'In Progress' },
    { num: 4, label: 'Configure Modules', status: 'Pending' },
    { num: 5, label: 'Run Payroll Setup', status: 'Pending' },
    { num: 6, label: 'Go Live', status: 'Pending' },
];

const GUIDELINES = [
    'First row should contain column headers (First Name, Last Name, Email, Phone, Designation)',
    'Email ID must be unique',
    'Phone number should ideally be numeric',
    'Date format: DD MMM YYYY (if applicable)',
];

// Removed static RECENT_IMPORTS array in favor of dynamic state

// ─── Breadcrumb + heading ───────────────────────────────────────────────────
function PageHeading({ companyName }: { companyName: string }) {
    const BREADCRUMB = ['Home', 'Companies', companyName || 'Company', 'Onboarding', 'Import Employees'];
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
    const router = useRouter();
    const searchParams = useSearchParams();
    const companyId = searchParams?.get('companyId');

    const [tenant, setTenant] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [file, setFile] = useState<File | null>(null);
    const [parsedData, setParsedData] = useState<any[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [recentImports, setRecentImports] = useState<any[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!companyId) {
            setLoading(false);
            return;
        }
        api.get(`/super-admin/tenants/${companyId}`)
            .then(res => {
                setTenant(res.data);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [companyId]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (!selected) return;
        setFile(selected);

        Papa.parse(selected, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                // Map the data to a standard format based on header names (case-insensitive fallback could be added)
                const mapped = results.data.map((row: any) => ({
                    firstName: row['First Name'] || row.firstName || '',
                    lastName: row['Last Name'] || row.lastName || '',
                    email: row['Email'] || row.email || '',
                    phone: row['Phone'] || row.phone || '',
                    designation: row['Designation'] || row.designation || ''
                }));
                setParsedData(mapped);
            },
            error: (error) => {
                console.error('Error parsing CSV:', error);
                alert('Error parsing the file.');
            }
        });
    };

    const handleDownloadTemplate = () => {
        const headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Designation'];
        const csvContent = headers.join(',') + '\n' + 'John,Doe,john@example.com,1234567890,Software Engineer\n';
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.setAttribute('download', 'employee_template.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const handleSaveEmployees = async () => {
        if (!companyId) return alert('Company ID is missing.');
        if (parsedData.length === 0) return alert('No valid data to import.');

        setIsUploading(true);
        try {
            const res = await api.post(`/super-admin/tenants/${companyId}/employees/bulk`, {
                employees: parsedData
            });
            alert(`Import successful: ${res.data.successful} imported, ${res.data.failed} failed.`);

            const newImport = {
                file: file?.name || 'Unknown',
                type: file?.name.endsWith('.csv') ? 'csv' : 'excel',
                total: parsedData.length,
                success: res.data.successful,
                failed: res.data.failed,
                by: 'Admin User',
                on: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }),
                status: res.data.failed > 0 ? (res.data.successful > 0 ? 'Partial' : 'Failed') : 'Completed',
                statusColor: res.data.failed > 0 ? (res.data.successful > 0 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700') : 'bg-emerald-100 text-emerald-700'
            };

            setRecentImports(prev => [newImport, ...prev]);
            setParsedData([]);
            setFile(null);

        } catch (error: any) {
            console.error(error);
            alert(error.response?.data?.message || 'Error during bulk import');
        } finally {
            setIsUploading(false);
        }
    };

    const validCount = parsedData.filter(d => d.email && d.firstName).length;
    const invalidCount = parsedData.length - validCount;

    if (loading) {
        return <div className="p-8 text-center text-sm font-medium">Loading details...</div>;
    }

    return (
        <div className="space-y-3 pb-3">
            <PageHeading companyName={tenant?.name || 'TechVision Pvt. Ltd.'} />
            <ProgressBar />

            <div className="grid grid-cols-1 xl:grid-cols-[2.6fr_1fr] gap-3 items-start">
                <div className="space-y-3 min-w-0">

                    {/* Upload and Download Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                        {/* Upload */}
                        <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-4 flex flex-col">
                            <div className="mb-4">
                                <h2 className="text-[14px] font-bold text-zinc-900">Upload Employee File</h2>
                                <p className="text-[12px] text-zinc-500 mt-0.5">Download our template, fill in your data and upload the file</p>
                            </div>

                            <input type="file" accept=".csv" className="hidden" ref={fileInputRef} onChange={handleFileChange} />

                            <div
                                className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 rounded-lg bg-zinc-50/50 p-6 cursor-pointer hover:bg-zinc-100 transition-colors"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <UploadCloud size={24} className="text-zinc-400 mb-2" />
                                <p className="text-[12px] font-medium text-zinc-700 mb-2">
                                    {file ? file.name : "Drag & drop your file here"}
                                </p>
                                <p className="text-[11px] text-zinc-400 mb-3">or</p>
                                <button className="rounded-md bg-[#0B1B3D] px-4 py-2 text-[12px] font-bold text-white shadow-sm hover:bg-[#0B1B3D]/90 transition-colors pointer-events-none">
                                    Browse File
                                </button>
                            </div>

                            <div className="flex items-center justify-center gap-4 mt-3 text-[11px] text-zinc-500">
                                <span>Supported formats: .csv</span>
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

                            <button onClick={handleDownloadTemplate} className="flex items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-2.5 text-[12px] font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors mb-5 w-fit">
                                <Download size={14} /> Download Template
                            </button>

                            <div>
                                <h3 className="text-[12px] font-bold text-zinc-900 mb-3">Import Guidelines</h3>
                                <ul className="space-y-2 mb-3">
                                    {GUIDELINES.map((guide, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                                            <span className="text-[11.5px] text-zinc-600 leading-snug">{guide}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Preview Table */}
                    {parsedData.length > 0 && (
                        <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-4">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-[14px] font-bold text-zinc-900">Data Preview</h2>
                                    <p className="text-[12px] text-zinc-500 mt-0.5">Review the data before importing</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => { setFile(null); setParsedData([]); }} className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Clear">
                                        <XCircle size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto max-h-[400px] border border-zinc-100 rounded">
                                <table className="w-full text-left border-collapse min-w-[600px]">
                                    <thead className="sticky top-0 bg-zinc-50 shadow-sm">
                                        <tr className="border-b border-zinc-200">
                                            <th className="p-3 text-[11px] font-bold text-zinc-900">First Name</th>
                                            <th className="p-3 text-[11px] font-bold text-zinc-900">Last Name</th>
                                            <th className="p-3 text-[11px] font-bold text-zinc-900">Email</th>
                                            <th className="p-3 text-[11px] font-bold text-zinc-900">Phone</th>
                                            <th className="p-3 text-[11px] font-bold text-zinc-900">Designation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {parsedData.map((item, idx) => (
                                            <tr key={idx} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50/50">
                                                <td className="p-3 text-[12px] text-zinc-800">{item.firstName || <span className="text-red-500 italic">Missing</span>}</td>
                                                <td className="p-3 text-[12px] text-zinc-600">{item.lastName || '-'}</td>
                                                <td className="p-3 text-[12px] text-zinc-800">{item.email || <span className="text-red-500 italic">Missing</span>}</td>
                                                <td className="p-3 text-[12px] text-zinc-600">{item.phone || '-'}</td>
                                                <td className="p-3 text-[12px] text-zinc-600">{item.designation || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-4 flex items-center justify-end">
                                <button
                                    onClick={handleSaveEmployees}
                                    disabled={isUploading || parsedData.length === 0}
                                    className="flex items-center gap-1.5 rounded-md bg-[#0B1B3D] px-6 py-2.5 text-[12.5px] font-bold text-white shadow-sm hover:bg-[#0B1B3D]/90 transition-colors disabled:opacity-50"
                                >
                                    {isUploading ? 'Importing...' : `Import ${parsedData.length} Employees`}
                                </button>
                            </div>
                        </div>
                    )}

                    {!parsedData.length && recentImports.length > 0 && (
                        <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-4 mt-3">
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
                                        {recentImports.map((item, idx) => (
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
                                Showing 1 to {recentImports.length} of {recentImports.length} results
                            </div>
                        </div>
                    )}

                    {/* Bottom Actions */}
                    <div className="flex items-center justify-between mt-4">
                        <button onClick={() => router.push(`/super-admin/invite-admin-users?companyId=${companyId}`)} className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-5 py-2.5 text-[12.5px] font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors">
                            <ArrowLeft size={14} /> Back to Previous Step
                        </button>
                        <div className="flex items-center gap-3">
                            <button onClick={() => router.push(`/super-admin/configure-modules?companyId=${companyId}`)} className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-5 py-2.5 text-[12.5px] font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors">
                                Skip for Now
                            </button>
                            <button onClick={() => router.push(`/super-admin/configure-modules?companyId=${companyId}`)} className="flex items-center gap-1.5 rounded-md bg-[#0B1B3D] px-6 py-2.5 text-[12.5px] font-bold text-white shadow-sm hover:bg-[#0B1B3D]/90 transition-colors">
                                Continue <ArrowRight size={14} color='#10b981' />
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
                                    <UserPlus size={14} /> Total Detected
                                </div>
                                <span className="font-bold text-zinc-900">{parsedData.length || '-'}</span>
                            </div>
                            <div className="flex items-center justify-between text-[11.5px]">
                                <div className="flex items-center gap-2 text-emerald-600">
                                    <CheckCircle2 size={14} /> Valid Rows
                                </div>
                                <span className="font-bold text-zinc-900">{parsedData.length ? validCount : '-'}</span>
                            </div>
                            <div className="flex items-center justify-between text-[11.5px]">
                                <div className="flex items-center gap-2 text-red-600">
                                    <AlertCircle size={14} /> Invalid Rows
                                </div>
                                <span className="font-bold text-zinc-900">{parsedData.length ? invalidCount : '-'}</span>
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
