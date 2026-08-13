"use client";
import React, { useState, useRef, useEffect } from "react";
import {
    Copy, ShieldCheck, Info, ChevronRight, Ticket, MessageCircle,
    ArrowLeft, CheckCircle2, Eye, EyeOff, MoreVertical, XCircle,
    Wifi, KeyRound, BookOpen, ShieldAlert, RotateCcw, ShieldOff, FileSearch,
} from "lucide-react";
import TableCard, { TableCardColumn } from "@/components/table/TableCard";

interface Credential {
    system: string;
    host: string;
    username: string;
    access: "Read / Write" | "Read Only";
    mfa: boolean;
}

const CREDENTIALS: Credential[] = [
    { system: "Production Server", host: "prod.techvision.com", username: "techv_admin_01", access: "Read / Write", mfa: true },
    { system: "Staging Server", host: "staging.techvision.com", username: "techv_admin_01", access: "Read Only", mfa: true },
    { system: "Database Server", host: "db.techvision.com", username: "techv_db_read", access: "Read Only", mfa: true },
    { system: "Backup Server", host: "backup.techvision.com", username: "techv_backup", access: "Read / Write", mfa: true },
    { system: "Monitoring Console", host: "monitor.techvision.com", username: "techv_monitor", access: "Read Only", mfa: false },
];

// ---- Row action menu ----
function RowActionsMenu({ cred }: { cred: Credential }) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const actions = [
        { label: "Copy Username", icon: Copy, onClick: () => navigator.clipboard.writeText(cred.username) },
        { label: "Reset Password", icon: RotateCcw, onClick: () => console.log("reset password", cred.system) },
        { label: "View Details", icon: FileSearch, onClick: () => console.log("view details", cred.system) },
        { label: "Revoke Access", icon: ShieldOff, danger: true, onClick: () => console.log("revoke access", cred.system) },
    ];

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen((v) => !v)}
                className="text-zinc-400 hover:text-zinc-600 p-1 rounded hover:bg-zinc-100 transition-colors"
            >
                <MoreVertical size={15} />
            </button>

            {open && (
                <div className="absolute right-0 top-7 z-10 w-44 rounded-md border border-zinc-200 bg-white shadow-lg py-1">
                    {actions.map((action) => (
                        <button
                            key={action.label}
                            onClick={() => {
                                action.onClick();
                                setOpen(false);
                            }}
                            className={`flex w-full items-center gap-2 px-3 py-1.5 text-[11.5px] font-medium hover:bg-zinc-50 transition-colors ${
                                action.danger ? "text-red-600" : "text-zinc-700"
                            }`}
                        >
                            <action.icon size={13} />
                            {action.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

const SETUP_STEPS = [
    "Connect to the VPN using company VPN client.",
    "Use the above credentials to login to the respective systems.",
    "Complete MFA verification (Authenticator app / SMS) if prompted.",
    "Access only the approved resources and perform the authorized tasks.",
    "Do not share credentials or use for any other purpose.",
    "Logout from all systems after completing your work.",
];

const IMPORTANT_NOTES = [
    "Access is time-bound and will expire automatically.",
    "All activities are monitored and logged.",
    "Any unauthorized access or data breach will be reported.",
];

const ACCESS_GUIDES = [
    { label: "VPN Connection Guide", icon: Wifi, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "MFA Setup Guide", icon: KeyRound, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "System Access Guide", icon: BookOpen, color: "text-pink-600", bg: "bg-pink-50" },
    { label: "Security Best Practices", icon: ShieldAlert, color: "text-amber-600", bg: "bg-amber-50" },
];

const CREDENTIALS_SUMMARY = [
    { label: "Total Systems", value: 5, color: "text-indigo-600" },
    { label: "MFA Enabled", value: 4, color: "text-emerald-600" },
    { label: "MFA Disabled", value: 1, color: "text-red-500" },
    { label: "Read / Write Access", value: 2, color: "text-blue-600" },
    { label: "Read Only Access", value: 3, color: "text-zinc-700" },
];

function CredentialsTable() {
    const [visible, setVisible] = useState<Record<number, boolean>>({});
    const toggle = (i: number) => setVisible((prev) => ({ ...prev, [i]: !prev[i] }));

    const columns: TableCardColumn<Credential>[] = [
        {
            key: "system",
            header: "System / Environment",
            headerClassName: "pr-4",
            cellClassName: "pr-4",
            render: (cred) => (
                <>
                    <p className="font-bold text-zinc-900 text-[12.5px]">{cred.system}</p>
                    <p className="text-[11px] text-indigo-500">{cred.host}</p>
                </>
            ),
        },
        {
            key: "username",
            header: "Username",
            cellClassName: "pr-4 text-zinc-700 font-medium whitespace-nowrap text-[12.5px]",
            render: (cred) => cred.username,
        },
        {
            key: "password",
            header: "Password",
            cellClassName: "pr-4",
            render: (cred) => {
                const i = CREDENTIALS.indexOf(cred);
                return (
                    <div className="flex items-center gap-2 whitespace-nowrap text-[12.5px]">
                        <span className="text-zinc-500 font-mono">
                            {visible[i] ? "P@ssw0rd!23" : "••••••••"}
                        </span>
                        <button onClick={() => toggle(i)} className="text-zinc-400 hover:text-zinc-600">
                            {visible[i] ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                        <button className="flex items-center gap-1 text-indigo-600 font-semibold hover:underline">
                            <Copy size={12} /> Copy
                        </button>
                    </div>
                );
            },
        },
        {
            key: "access",
            header: "Access Level",
            cellClassName: "pr-4",
            render: (cred) => (
                <span
                    className={`rounded-full px-2.5 py-1 text-[10.5px] font-bold whitespace-nowrap ${
                        cred.access === "Read / Write"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-blue-100 text-blue-700"
                    }`}
                >
                    {cred.access}
                </span>
            ),
        },
        {
            key: "mfa",
            header: "MFA",
            cellClassName: "pr-4",
            render: (cred) => (
                <span
                    className={`flex items-center gap-1 text-[11.5px] font-semibold whitespace-nowrap ${
                        cred.mfa ? "text-emerald-600" : "text-zinc-400"
                    }`}
                >
                    {cred.mfa ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                    {cred.mfa ? "Enabled" : "Disabled"}
                </span>
            ),
        },
        {
            key: "action",
            header: "Action",
            render: (cred) => <RowActionsMenu cred={cred} />,
        },
    ];

    return (
        <TableCard
            title="System Credentials"
            description="Use the following credentials to access the authorized systems. Do not share these credentials."
            columns={columns}
            data={CREDENTIALS}
            keyExtractor={(cred) => cred.system}
            note={
                <>
                    <Info size={14} className="mt-0.5 shrink-0 text-zinc-400" />
                    <p className="text-[11.5px] text-zinc-500">
                        Passwords are masked for security. Click the eye icon to view or copy button.
                    </p>
                </>
            }
        />
    );
}

function SetupInstructions() {
    return (
        <div className="rounded-lg border border-zinc-200/80 bg-white shadow-sm p-3">
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

function AccessInstructionsCard() {
    return (
        <div className="rounded-lg border border-zinc-200/80 bg-white shadow-sm p-2 space-y-1">
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

function CredentialsSummaryCard() {
    return (
        <div className="rounded-lg border border-zinc-200/80 bg-white shadow-sm p-2 space-y-2">
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

function NeedHelpCard() {
    return (
        <div className="rounded-lg border border-zinc-200/80 bg-white shadow-sm p-2 space-y-2">
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

function FooterActions() {
    return (
        <div className="flex items-center justify-between gap-2 flex-wrap pt-4">
            <button className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-4 py-2.5 text-[12px] font-semibold text-zinc-600 shadow-sm hover:bg-zinc-50 transition-colors">
                <ArrowLeft size={14} /> Back to Active Access
            </button>
            <button className="flex items-center gap-1.5 rounded-md bg-indigo-700 px-4 py-2.5 text-[12px] font-semibold text-white shadow-sm hover:bg-indigo-800 transition-colors">
                <CheckCircle2 size={14} /> I&apos;ve Saved My Credentials
            </button>
        </div>
    );
}

export default function CredentialsAndInstructionsTab() {
    return (
        <div className="mt-2 space-y-2">
            <div className="grid grid-cols-1 xl:grid-cols-[2.6fr_1fr] gap-2 items-start">
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
        </div>
    );
}