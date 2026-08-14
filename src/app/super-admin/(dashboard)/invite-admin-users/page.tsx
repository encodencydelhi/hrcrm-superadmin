'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { Home, ChevronRight, Check, CheckCircle2, Search, XCircle, Building2, User, Users, FileText, Settings, Briefcase, Calendar, ShieldCheck, Mail, MessageCircle, MessageSquare, RefreshCw, Send, Eye, Trash2, MoreVertical, ArrowLeft, ArrowRight, PlayCircle, HelpCircle, Phone, Globe, Info, Clock, CheckCircle } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import api from '@/lib/axios';

// ─── Static data ────────────────────────────────────────────────────────────

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

// ─── Breadcrumb + heading ───────────────────────────────────────────────────
function PageHeading({ companyName }: { companyName: string }) {
    const breadcrumb = ['Home', 'Companies', companyName, 'Onboarding', 'Invite Admin Users'];

    return (
        <section className="space-y-3 mb-4">
            <div className="flex items-center gap-1.5 text-[12px] text-zinc-500 flex-wrap">
                {breadcrumb.map((crumb, i) => (
                    <React.Fragment key={crumb}>
                        {i === 0 ? (
                            <span className="flex items-center gap-1 text-indigo-600 font-medium hover:underline cursor-pointer">
                                <Home size={12} /> {crumb}
                            </span>
                        ) : i === breadcrumb.length - 1 ? (
                            <span className="text-zinc-900 font-semibold">{crumb}</span>
                        ) : (
                            <span className="text-indigo-600 font-medium hover:underline cursor-pointer">{crumb}</span>
                        )}
                        {i < breadcrumb.length - 1 && <ChevronRight size={12} />}
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
function InviteAdminUsersContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const companyId = searchParams.get('companyId');

    const [tenant, setTenant] = useState<any>(null);
    const [roles, setRoles] = useState<any[]>([]);
    const [admins, setAdmins] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editData, setEditData] = useState<any>({});

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        designation: '',
        phone: '',
        roleId: '',
        sendEmail: true,
        customMessage: ''
    });

    const fetchAdmins = () => {
        if (!companyId) return;
        api.get(`/super-admin/tenants/${companyId}/admins`).then(res => setAdmins(res.data)).catch(console.error);
    };

    useEffect(() => {
        if (!companyId) {
            setLoading(false);
            return;
        }
        Promise.all([
            api.get(`/super-admin/tenants/${companyId}`),
            api.get(`/super-admin/tenants/${companyId}/roles`),
            api.get(`/super-admin/tenants/${companyId}/admins`)
        ])
            .then(([tenantRes, rolesRes, adminsRes]) => {
                setTenant(tenantRes.data);
                setRoles(rolesRes.data.filter((r: any) => r.isActive === true));
                setAdmins(adminsRes.data);
                if (rolesRes.data.length > 0) {
                    setFormData(prev => ({ ...prev, roleId: rolesRes.data[0]._id }));
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [companyId]);

    const companyName = tenant?.name || 'TechVision Pvt. Ltd.';

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async () => {
        if (!formData.firstName || !formData.email || !formData.roleId) {
            alert('Please fill all required fields');
            return;
        }

        const nameParts = formData.firstName.trim().split(' ');
        const fName = nameParts[0];
        const lName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ' ';

        setSubmitting(true);
        try {
            await api.post(`/super-admin/tenants/${companyId}/admins/invite`, {
                ...formData,
                firstName: fName,
                lastName: lName
            });
            setFormData({
                firstName: '', lastName: '', email: '', designation: '', phone: '', roleId: roles[0]?._id || '', sendEmail: true, customMessage: ''
            });
            fetchAdmins();
        } catch (error: any) {
            console.error(error);
            alert(error.response?.data?.message || 'Failed to invite admin');
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditAdmin = (admin: any) => {
        setEditingId(admin._id);
        setFormData({
            firstName: `${admin.firstName || ''} ${admin.lastName || ''}`.trim(),
            lastName: '',
            email: admin.email || '',
            designation: admin.designation || '',
            phone: admin.mobileNumber || '',
            roleId: admin.roleId?._id || admin.roleId || roles[0]?._id,
            sendEmail: false,
            customMessage: ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSaveAdmin = async () => {
        if (!editingId) return;
        if (!formData.firstName || !formData.email || !formData.roleId) {
            alert('Please fill all required fields');
            return;
        }

        const nameParts = formData.firstName.trim().split(' ');
        const fName = nameParts[0];
        const lName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ' ';

        setSubmitting(true);
        try {
            await api.put(`/super-admin/tenants/${companyId}/admins/${editingId}`, {
                ...formData,
                firstName: fName,
                lastName: lName
            });
            setEditingId(null);
            setFormData({
                firstName: '', lastName: '', email: '', designation: '', phone: '', roleId: roles[0]?._id || '', sendEmail: true, customMessage: ''
            });
            fetchAdmins();
        } catch (error: any) {
            alert(error.response?.data?.message || 'Failed to update admin');
        } finally {
            setSubmitting(false);
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setFormData({
            firstName: '', lastName: '', email: '', designation: '', phone: '', roleId: roles[0]?._id || '', sendEmail: true, customMessage: ''
        });
    };

    const handleDeleteAdmin = async (adminId: string) => {
        if (!confirm('Are you sure you want to delete this admin?')) return;
        try {
            await api.delete(`/super-admin/tenants/${companyId}/admins/${adminId}`);
            fetchAdmins();
        } catch (error: any) {
            alert(error.response?.data?.message || 'Failed to delete admin');
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-sm font-medium">Loading details...</div>;
    }

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentAdmins = admins.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(admins.length / rowsPerPage) || 1;

    const formatDate = (dateStr: string) => {
        return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(dateStr));
    };

    return (
        <div className="space-y-3 pb-3">
            <PageHeading companyName={companyName} />
            <ProgressBar />

            <div className="grid grid-cols-1 xl:grid-cols-[2.6fr_1fr] gap-3 items-start">
                <div className="space-y-3 min-w-0">

                    {/* Administrator Details */}
                    <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-4">
                        <div className="mb-4">
                            <h2 className="text-[14px] font-bold text-zinc-900">{editingId ? 'Edit Administrator Details' : 'Administrator Details'}</h2>
                            <p className="text-[12px] text-zinc-500 mt-0.5">{editingId ? 'Modify administrator information' : 'Enter administrator information and send invitation'}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className="block text-[11px] font-bold text-zinc-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full border border-zinc-200 rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-zinc-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full border border-zinc-200 rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-zinc-700 mb-1">Designation <span className="text-red-500">*</span></label>
                                <input type="text" name="designation" value={formData.designation} onChange={handleInputChange} className="w-full border border-zinc-200 rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-zinc-700 mb-1">Phone Number</label>
                                <div className="flex">
                                    <div className="flex items-center justify-between border border-zinc-200 rounded-l-md px-2 py-2 w-20 bg-zinc-50 shrink-0">
                                        <span className="text-[12px] font-medium flex items-center gap-1"><span className="text-[14px]">🇮🇳</span> +91</span>
                                        <ChevronRight size={12} className="text-zinc-400 rotate-90" />
                                    </div>
                                    <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full border border-l-0 border-zinc-200 rounded-r-md px-3 py-2 text-[12px] focus:outline-none focus:border-indigo-500" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-zinc-700 mb-1">Department</label>
                                <select className="w-full border border-zinc-200 rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-indigo-500 appearance-none bg-white">
                                    <option>Human Resources</option>
                                    <option>IT</option>
                                    <option>Finance</option>
                                    <option>Marketing</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-zinc-700 mb-1">Admin Role <span className="text-red-500">*</span></label>
                                <select name="roleId" value={formData.roleId} onChange={handleInputChange} className="w-full border border-zinc-200 rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-indigo-500 appearance-none bg-white">
                                    {roles.map(r => <option key={r._id} value={r._id}>{r.name}</option>)}
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
                                            <input type="checkbox" name="sendEmail" checked={formData.sendEmail} onChange={handleInputChange} className="rounded text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5 border-zinc-300" />
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
                                            name="customMessage"
                                            value={formData.customMessage}
                                            onChange={handleInputChange}
                                            placeholder={`Hi ${formData.firstName || 'User'},\nYou have been invited to join ${companyName} as a Company Administrator on Crewcam HRMS.\nPlease use the invitation link to activate your account.`}
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
                            {editingId ? (
                                <>
                                    <button onClick={cancelEdit} className="flex items-center justify-center gap-1.5 rounded-md border border-zinc-200 bg-white px-5 py-2.5 text-[12.5px] font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors">
                                        Cancel Edit
                                    </button>
                                    <button onClick={handleSaveAdmin} disabled={submitting} className="flex items-center justify-center gap-1.5 rounded-md bg-[#0B1B3D] px-6 py-2.5 text-[12.5px] font-bold text-white shadow-sm hover:bg-[#0B1B3D]/90 transition-colors disabled:opacity-50">
                                        {submitting ? 'Updating...' : 'Update Administrator'} <Check size={14} className="ml-1" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => setFormData({ firstName: '', lastName: '', email: '', designation: '', phone: '', roleId: roles[0]?._id || '', sendEmail: true, customMessage: '' })} className="flex items-center justify-center gap-1.5 rounded-md border border-zinc-200 bg-white px-5 py-2.5 text-[12.5px] font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors">
                                        <span className="text-[14px]">+</span> Add Another Admin
                                    </button>
                                    <button onClick={handleSubmit} disabled={submitting} className="flex items-center justify-center gap-1.5 rounded-md bg-[#0B1B3D] px-6 py-2.5 text-[12.5px] font-bold text-white shadow-sm hover:bg-[#0B1B3D]/90 transition-colors disabled:opacity-50">
                                        {submitting ? 'Sending...' : 'Send Invitation'} <Send size={14} className="ml-1" />
                                    </button>
                                </>
                            )}
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
                                        <th className="pb-2 text-[11px] font-bold text-zinc-900 text-center">Admin Name</th>
                                        <th className="pb-2 text-[11px] font-bold text-zinc-900 text-center">Email</th>
                                        <th className="pb-2 text-[11px] font-bold text-zinc-900 text-center">Role</th>
                                        <th className="pb-2 text-[11px] font-bold text-zinc-900 text-center">Designation</th>
                                        <th className="pb-2 text-[11px] font-bold text-zinc-900 text-center">Status</th>
                                        <th className="pb-2 text-[11px] font-bold text-zinc-900 text-center">Sent On</th>
                                        <th className="pb-2 text-[11px] font-bold text-zinc-900 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentAdmins.map((admin, idx) => (
                                        <tr key={admin._id || idx} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50/50">
                                            <td className="py-3 text-center">
                                                <p className="text-[12px] font-bold text-zinc-900 capitalize whitespace-nowrap">{admin.firstName} {admin.lastName}</p>
                                            </td>
                                            <td className="py-3 text-[12px] text-zinc-600 text-center">
                                                {admin.email}
                                            </td>
                                            <td className="py-3 text-center">
                                                <span className="px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap bg-blue-100 text-blue-700">
                                                    {admin.roleId?.name || 'Admin'}
                                                </span>
                                            </td>
                                            <td className="py-3 text-[12px] text-zinc-600 text-center">
                                                {admin.designation || '-'}
                                            </td>
                                            <td className="py-3 text-center">
                                                <span className="px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap bg-emerald-100 text-emerald-700">
                                                    {admin.isActive ? 'Active' : 'Pending'}
                                                </span>
                                            </td>
                                            <td className="py-3 text-center">
                                                <p className="text-[11.5px] font-medium text-zinc-800">{formatDate(admin.createdAt)}</p>
                                            </td>
                                            <td className="py-3">
                                                <div className="flex items-center justify-center gap-1">
                                                    <button onClick={() => handleEditAdmin(admin)} className="p-1.5 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors" title="Edit">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                                    </button>
                                                    <button onClick={() => handleDeleteAdmin(admin._id)} className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500">
                            <div>
                                Showing {admins.length === 0 ? 0 : indexOfFirstRow + 1} to {Math.min(indexOfLastRow, admins.length)} of {admins.length} results
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Rows per page:</span>
                                <select
                                    className="border border-zinc-200 rounded px-1 py-0.5 outline-none bg-white"
                                    value={rowsPerPage}
                                    onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                </select>
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    className="ml-2 px-2 py-1 border border-zinc-200 rounded hover:bg-zinc-50 disabled:opacity-50"
                                >
                                    Prev
                                </button>
                                <button
                                    disabled={currentPage >= totalPages}
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    className="px-2 py-1 border border-zinc-200 rounded hover:bg-zinc-50 disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex items-center justify-between mt-4">
                        <button className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-5 py-2.5 text-[12.5px] font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors">
                            <ArrowLeft size={14} /> Back
                        </button>
                        <div className="flex items-center gap-3">
                            <button onClick={() => router.push(`/super-admin/import-employees?companyId=${companyId}`)} className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-5 py-2.5 text-[12.5px] font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors">
                                Skip for Now
                            </button>
                            <button onClick={() => router.push(`/super-admin/import-employees?companyId=${companyId}`)} className="flex items-center gap-1.5 rounded-md bg-[#0B1B3D] px-6 py-2.5 text-[12.5px] font-bold text-white shadow-sm hover:bg-[#0B1B3D]/90 transition-colors">
                                Continue to Next Step <ArrowRight size={14} />
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
                            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                                <svg className="h-14 w-14 -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="42" fill="none" stroke="#F4F4F5" strokeWidth="12" />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="42"
                                        fill="none"
                                        stroke="#10b981"
                                        strokeWidth="12"
                                        strokeDasharray={2 * Math.PI * 42}
                                        strokeDashoffset={2 * Math.PI * 42 * (1 - 0.33)}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <span className="absolute text-[13px] font-bold text-[#0B1B3D]">33%</span>
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
                                <span className="font-medium text-zinc-900">{companyName}</span>
                            </div>
                            <div className="flex items-center justify-between text-[11.5px]">
                                <div className="flex items-center gap-2 text-zinc-600">
                                    <Globe size={14} /> Company ID
                                </div>
                                <span className="font-bold text-zinc-900">{tenant?.corporateId || '-'}</span>
                            </div>
                            <div className="flex items-center justify-between text-[11.5px]">
                                <div className="flex items-center gap-2 text-zinc-600">
                                    <div className="w-3.5 h-3.5 rounded-full border-2 border-indigo-500 shrink-0 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                                    </div>
                                    Plan
                                </div>
                                <span className="font-medium text-zinc-900">{tenant?.planName || '-'}</span>
                            </div>
                            <div className="flex items-center justify-between text-[11.5px]">
                                <div className="flex items-center gap-2 text-zinc-600">
                                    <Users size={14} /> Employees (Estimated)
                                </div>
                                <span className="font-medium text-zinc-900">{tenant?.estimatedEmployees || '-'}</span>
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
                                <span className="font-bold text-zinc-900">{admins.length}</span>
                            </div>
                            <div className="flex items-center justify-between text-[11.5px]">
                                <div className="flex items-center gap-2 text-zinc-600">
                                    <Mail size={14} /> Sent
                                </div>
                                <span className="font-bold text-zinc-900">{admins.length}</span>
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

export default function InviteAdminUsersPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
            <InviteAdminUsersContent />
        </Suspense>
    );
}
