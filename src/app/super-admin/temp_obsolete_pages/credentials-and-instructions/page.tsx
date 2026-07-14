'use client';
import React, { useState } from 'react';
import { Home, ChevronRight, ArrowLeft, Calendar, Eye, EyeOff, Copy, MoreVertical, CheckCircle2, XCircle, Wifi, KeyRound, BookOpen, ShieldAlert, Ticket, MessageCircle, Info, ShieldCheck } from 'lucide-react';

// ─── Static data ────────────────────────────────────────────────────────────
const BREADCRUMB = ['Home', 'Technical Access Management', 'Request Details', 'Access Details', 'Credentials & Instructions'];
const TABS = ['Access Overview', 'Access Granted', 'Credentials & Instructions', 'Data Access Scope', 'Terms & Conditions', 'Activity Log', 'Session Timeout', 'Notifications'];

interface Credential {
    system: string;
    host: string;
    username: string;
    access: 'Read / Write' | 'Read Only';
    mfa: boolean;
}

const CREDENTIALS: Credential[] = [
    { system: 'Production Server', host: 'prod.techvision.com', username: 'techv_admin_01', access: 'Read / Write', mfa: true },
    { system: 'Staging Server', host: 'staging.techvision.com', username: 'techv_admin_01', access: 'Read Only', mfa: true },
    { system: 'Database Server', host: 'db.techvision.com', username: 'techv_db_read', access: 'Read Only', mfa: true },
    { system: 'Backup Server', host: 'backup.techvision.com', username: 'techv_backup', access: 'Read / Write', mfa: true },
    { system: 'Monitoring Console', host: 'monitor.techvision.com', username: 'techv_monitor', access: 'Read Only', mfa: false },
];

const SETUP_STEPS = [
    'Connect to the VPN using company VPN client.',
    'Use the above credentials to login to the respective systems.',
    'Complete MFA verification (Authenticator app / SMS) if prompted.',
    'Access only the approved resources and perform the authorized tasks.',
    'Do not share credentials or use for any other purpose.',
    'Logout from all systems after completing your work.',
];

const IMPORTANT_NOTES = [
    'Access is time-bound and will expire automatically.',
    'All activities are monitored and logged.',
    'Any unauthorized access or data breach will be reported.',
];

const ACCESS_GUIDES = [
    { label: 'VPN Connection Guide', icon: Wifi, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'MFA Setup Guide', icon: KeyRound, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'System Access Guide', icon: BookOpen, color: 'text-pink-600', bg: 'bg-pink-50' },
    { label: 'Security Best Practices', icon: ShieldAlert, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const CREDENTIALS_SUMMARY = [
    { label: 'Total Systems', value: 5, color: 'text-indigo-600' },
    { label: 'MFA Enabled', value: 4, color: 'text-emerald-600' },
    { label: 'MFA Disabled', value: 1, color: 'text-red-500' },
    { label: 'Read / Write Access', value: 2, color: 'text-blue-600' },
    { label: 'Read Only Access', value: 3, color: 'text-zinc-700' },
];

// ─── Breadcrumb + heading ───────────────────────────────────────────────────
function PageHeading() {
    return (
        <section className="space-y-3">
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

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 leading-tight">Credentials &amp; Instructions</h1>
                    <p className="text-[13px] text-zinc-500 mt-0.5">Secure credentials and setup instructions for the systems and modules you can access.</p>
                </div>

                <div className="shrink-0">
                    <button className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1 text-[12px] font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors">
                        <ArrowLeft size={14} /> Back to Active Access
                    </button>
                </div>
            </div>
        </section>
    );
}

// ─── Request info bar ───────────────────────────────────────────────────────
function RequestInfoBar() {
    const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
        <div className="min-w-0">
            <p className="text-[10.5px] font-semibold text-zinc-400 uppercase tracking-wide">{label}</p>
            {children}
        </div>
    );

    return (
        <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-1">
            <div className="flex items-start divide-x divide-zinc-200">
                <div className="flex items-center gap-0.5 pr-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-indigo-50 text-indigo-600 px-2">
                        <FileTextIcon />
                    </span>
                    <Field label="Request ID">
                        <p className="flex items-center gap-2 text-[12px] font-semibold text-zinc-900 whitespace-nowrap">
                            TAR-2025-028
                            <span className="rounded-full bg-emerald-100 px-4 py-0.5 text-[9.5px] font-bold text-emerald-700">Active</span>
                        </p>
                        <p className="text-[10.5px] text-zinc-400 whitespace-nowrap">Requested on 30 May 2025, 11:20 AM</p>
                    </Field>
                </div>

                <div className="px-4">
                    <Field label="Company">
                        <p className="flex items-center gap-1.5 text-[12px] font-semibold text-zinc-900 whitespace-nowrap">
                            <span className="grid h-5 w-5 place-items-center rounded bg-blue-600 text-[10px] font-bold text-white">T</span>
                            TechVision Pvt. Ltd.
                        </p>
                    </Field>
                </div>

                <div className="px-4">
                    <Field label="Purpose">
                        <p className="text-[12px] font-semibold text-zinc-900 whitespace-nowrap">System Maintenance</p>
                        <p className="text-[10.5px] text-zinc-400 whitespace-nowrap">Server optimization</p>
                    </Field>
                </div>

                <div className="px-4">
                    <Field label="Access Type">
                        <span className="inline-block mt-0.5 rounded-full bg-purple-100 px-2 py-1 text-[10.5px] font-bold text-purple-700 whitespace-nowrap">Time-Bound Access</span>
                    </Field>
                </div>

                <div className="flex items-center gap-2 pl-6">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                        <Calendar size={17} />
                    </span>
                    <Field label="Access Duration">
                        <p className="text-[12px] font-semibold text-zinc-900 whitespace-nowrap">30 May 2025, 02:35 PM</p>
                        <p className="text-[10px] text-zinc-400 whitespace-nowrap">to</p>
                        <p className="text-[12px] font-semibold text-zinc-900 whitespace-nowrap">
                            02 Jun 2025, 06:00 PM <span className="text-[10.5px] font-normal text-zinc-400">(3 Days)</span>
                        </p>
                    </Field>
                </div>
            </div>
        </div>
    );
}

// small inline icon component (avoids importing FileText twice with different names)
function FileTextIcon() {
    return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <path d="M14 2v6h6" />
        </svg>
    );
}

// ─── Tabs ───────────────────────────────────────────────────────────────────
function Tabs({ active }: { active: string }) {
    return (
        <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm px-2">
            <div className="flex items-center gap-1">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        className={`shrink-0 whitespace-nowrap border-b-2 px-1 py-3 text-[11px] font-semibold transition-colors ${tab === active ? 'border-indigo-700 text-indigo-700' : 'border-transparent text-zinc-500 hover:text-zinc-700'}`}>
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
}

// ─── Credentials table ──────────────────────────────────────────────────────
function CredentialsTable() {
    const [visible, setVisible] = useState<Record<number, boolean>>({});
    const toggle = (i: number) => setVisible((prev) => ({ ...prev, [i]: !prev[i] }));

    return (
        <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-3 space-y-3">
            <div>
                <h2 className="text-[14px] font-bold text-zinc-900">System Credentials</h2>
                <p className="text-[12px] text-zinc-500 mt-0.5">Use the following credentials to access the authorized systems. Do not share these credentials.</p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-[10.5px] font-semibold text-zinc-400 uppercase tracking-wide">
                            <th className="pb-2 pr-4">System / Environment</th>
                            <th className="pb-2 pr-4">Username</th>
                            <th className="pb-2 pr-4">Password</th>
                            <th className="pb-2 pr-4">Access Level</th>
                            <th className="pb-2 pr-4">MFA</th>
                            <th className="pb-2">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                        {CREDENTIALS.map((cred, i) => (
                            <tr key={cred.system} className="text-[12.5px]">
                                <td className="py-3 pr-4">
                                    <p className="font-bold text-zinc-900">{cred.system}</p>
                                    <p className="text-[11px] text-indigo-500">{cred.host}</p>
                                </td>
                                <td className="py-3 pr-4 text-zinc-700 font-medium whitespace-nowrap">{cred.username}</td>
                                <td className="py-3 pr-4">
                                    <div className="flex items-center gap-2 whitespace-nowrap">
                                        <span className="text-zinc-500 font-mono">{visible[i] ? 'P@ssw0rd!23' : '••••••••'}</span>
                                        <button onClick={() => toggle(i)} className="text-zinc-400 hover:text-zinc-600">
                                            {visible[i] ? <EyeOff size={14} /> : <Eye size={14} />}
                                        </button>
                                        <button className="flex items-center gap-1 text-indigo-600 font-semibold hover:underline">
                                            <Copy size={12} /> Copy
                                        </button>
                                    </div>
                                </td>
                                <td className="py-3 pr-4">
                                    <span className={`rounded-full px-2.5 py-1 text-[10.5px] font-bold whitespace-nowrap ${cred.access === 'Read / Write' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                                        }`}>
                                        {cred.access}
                                    </span>
                                </td>
                                <td className="py-3 pr-4">
                                    <span className={`flex items-center gap-1 text-[11.5px] font-semibold whitespace-nowrap ${cred.mfa ? 'text-emerald-600' : 'text-zinc-400'}`}>
                                        {cred.mfa ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                                        {cred.mfa ? 'Enabled' : 'Disabled'}
                                    </span>
                                </td>
                                <td className="py-3">
                                    <button className="text-zinc-400 hover:text-zinc-600">
                                        <MoreVertical size={15} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-start gap-2 rounded-lg bg-zinc-50 border border-zinc-200 p-2">
                <Info size={14} className="mt-0.5 shrink-0 text-zinc-400" />
                <p className="text-[11.5px] text-zinc-500">
                    Passwords are masked for security. Click the eye icon to view or copy button.
                </p>
            </div>
        </div>
    );
}

// ─── Setup instructions + important notes ───────────────────────────────────
function SetupInstructions() {
    return (
        <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-3">
            <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6">
                <div className="space-y-2">
                    <h2 className="text-[14px] font-bold text-zinc-900">Setup Instructions</h2>
                    <p className="text-[12px] text-zinc-500 -mt-1.5">Follow these steps to access the systems securely.</p>
                    <ol className="space-y-2 pt-1">
                        {SETUP_STEPS.map((step, i) => (
                            <li key={step} className="flex items-start gap-2.5">
                                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-indigo-600 text-[10px] font-bold text-white mt-0.5">
                                    {i + 1}
                                </span>
                                <p className="text-[12.5px] text-zinc-700 leading-relaxed">{step}</p>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="space-y-3">
                    <div className="rounded-lg border border-zinc-200 p-3">
                        <p className="text-[12.5px] font-bold text-zinc-900 mb-2">Important Notes</p>
                        <ul className="space-y-1.5">
                            {IMPORTANT_NOTES.map((note) => (
                                <li key={note} className="flex items-start gap-2 text-[12px] text-zinc-600">
                                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                                    {note}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-indigo-50 border border-indigo-100 p-3">
                        <ShieldCheck size={16} className="shrink-0 text-indigo-600" />
                        <p className="text-[12px] font-semibold text-indigo-700">Keep your credentials secure at all times.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Access instructions (right rail) ───────────────────────────────────────
function AccessInstructionsCard() {
    return (
        <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-2 space-y-1">
            <p className="text-[13px] font-bold text-zinc-900 mb-1.5 px-1">Access Instructions</p>
            {ACCESS_GUIDES.map((guide) => (
                <button key={guide.label} className="flex w-full items-center gap-2 rounded-lg px-1.5 py-0.5 hover:bg-zinc-50 transition-colors text-left">
                    <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${guide.bg} ${guide.color}`}>
                        <guide.icon size={14} />
                    </span>
                    <span className="flex-1 text-[12px] font-semibold text-zinc-800">{guide.label}</span>
                    <ChevronRight size={14} className="text-zinc-300" />
                </button>
            ))}
            <button className="w-full text-center pt-2 text-[12px] font-semibold text-indigo-600 hover:underline">
                View All Guides →
            </button>
        </div>
    );
}

// ─── Credentials summary (right rail) ───────────────────────────────────────
function CredentialsSummaryCard() {
    return (
        <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-2 space-y-2">
            <p className="text-[13px] font-bold text-zinc-900 px-1">Credentials Summary</p>
            {CREDENTIALS_SUMMARY.map((row) => (
                <div key={row.label} className="flex items-center justify-between text-[12px] px-1">
                    <span className="text-zinc-600">{row.label}</span>
                    <span className={`font-bold ${row.color}`}>{row.value}</span>
                </div>
            ))}
        </div>
    );
}

// ─── Need help card (right rail) ────────────────────────────────────────────
function NeedHelpCard() {
    return (
        <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-2 space-y-2">
            <p className="text-[13px] font-bold text-zinc-900 px-1">Need Help?</p>
            <p className="text-[11.5px] text-zinc-500 leading-snug px-1">Contact support if you face any issues accessing the systems.</p>
            <button className="flex w-full items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-2 text-[12px] font-semibold text-indigo-600 hover:bg-zinc-50 transition-colors">
                <Ticket size={14} /> Create Support Ticket
            </button>
            <button className="flex w-full items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-2 text-[12px] font-semibold text-indigo-600 hover:bg-zinc-50 transition-colors">
                <MessageCircle size={14} /> Chat with Support
            </button>
        </div>
    );
}

// ─── Footer actions ─────────────────────────────────────────────────────────
function FooterActions() {
    return (
        <div className="flex items-center justify-between gap-2 flex-wrap">
            <button className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-4 py-2.5 text-[12px] font-semibold text-zinc-600 shadow-sm hover:bg-zinc-50 transition-colors">
                <ArrowLeft size={14} /> Back to Active Access
            </button>
            <button className="flex items-center gap-1.5 rounded-md bg-indigo-700 px-4 py-2.5 text-[12px] font-semibold text-white shadow-sm hover:bg-indigo-800 transition-colors">
                <CheckCircle2 size={14} /> I&apos;ve Saved My Credentials
            </button>
        </div>
    );
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function CredentialsInstructionsPage() {
    return (
        <div className="space-y-2">
            <PageHeading />
            <RequestInfoBar />
            <Tabs active="Credentials & Instructions" />

            <div className="grid grid-cols-1 xl:grid-cols-[2.6fr_1fr] gap-4 items-start">
                <div className="min-w-0 space-y-2">
                    <CredentialsTable />
                    <SetupInstructions />
                </div>
                <div className="space-y-2 min-w-0 xl:sticky xl:top-4">
                    <AccessInstructionsCard />
                    <CredentialsSummaryCard />
                    <NeedHelpCard />
                </div>
            </div>

            <FooterActions />

            <footer className="text-center text-[11px] text-zinc-400 py-3 flex items-center justify-center gap-4 flex-wrap">
                <span>© 2025 Crewcam HRMS. All Rights Reserved.</span>
                <span className="text-indigo-600 hover:underline cursor-pointer">Privacy Policy</span>
                <span className="text-indigo-600 hover:underline cursor-pointer">Terms of Service</span>
            </footer>
        </div>
    );
}