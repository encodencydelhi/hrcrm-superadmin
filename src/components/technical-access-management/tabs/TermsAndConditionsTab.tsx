'use client';

import React, { useState } from 'react';
import {
  CheckCircle2, XCircle, ShieldCheck, Search, Info, Clock,
  ArrowLeft, Save, Send
} from 'lucide-react';

const TERMS = [
  {
    title: 'Authorized Access Only',
    body: 'Crewcam technical team will only access the HRMS system for the purpose mentioned in this request. Any access beyond the approved scope requires fresh written approval from the company HR.',
  },
  {
    title: 'Confidentiality',
    body: 'All company data accessed will be kept strictly confidential. Crewcam will not share, copy, or disclose any data to third parties under any circumstances.',
  },
  {
    title: 'Data Protection',
    body: 'Crewcam will comply with all applicable data protection laws and company policies. Sensitive personal data (PAN, Bank, Salary, etc.) will be accessed only if required.',
  },
  {
    title: 'Activity Monitoring',
    body: 'All activities performed during the access period will be logged and monitored. The company reserves the right to review all logs and reports.',
  },
  {
    title: 'No Data Modification',
    body: 'Crewcam technical team will not modify, delete, or alter any company data unless explicitly authorized by the company HR in writing.',
  },
  {
    title: 'Access Duration',
    body: 'Access is time-bound as mentioned. Crewcam will ensure access is revoked immediately after the purpose is completed or upon expiration.',
  },
  {
    title: 'Compliance',
    body: 'Crewcam will follow all security guidelines, system usage policies, and compliance requirements of the company.',
  },
  {
    title: 'Liability',
    body: 'In case of any violation of these terms, the company has the right to revoke access immediately and take appropriate legal action.',
  },
];

const NEXT_STEPS = [
  { title: 'After Acceptance', body: 'Credentials will be shared securely with Crewcam team.', icon: CheckCircle2, color: 'text-emerald-500' },
  { title: 'Access Activation', body: 'Crewcam team will start the maintenance activity.', icon: ShieldCheck, color: 'text-indigo-500' },
  { title: 'Monitoring', body: 'All activities will be monitored and logged.', icon: Search, color: 'text-blue-500' },
  { title: 'Access Revocation', body: 'Access will be automatically revoked after completion.', icon: XCircle, color: 'text-red-500' },
];

function TermsContent() {
  return (
    <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-3 space-y-1">
      <div>
        <h2 className="text-[14px] font-bold text-zinc-900">Terms &amp; Conditions for Technical Access</h2>
        <p className="text-[12px] text-zinc-500 mt-0.5">Please review the following terms carefully.</p>
      </div>

      <ol className="space-y-2">
        {TERMS.map((term, i) => (
          <li key={term.title} className="flex gap-3">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-indigo-50 text-[11px] font-bold text-indigo-700">
              {i + 1}
            </span>
            <div>
              <p className="text-[12.5px] font-bold text-zinc-900">{term.title}</p>
              <p className="text-[12px] text-zinc-500 leading-relaxed mt-0.5">{term.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="flex items-start gap-2 rounded-lg bg-zinc-50 border border-zinc-200 p-2">
        <Info size={14} className="mt-0.5 shrink-0 text-zinc-400" />
        <p className="text-[11.5px] text-zinc-500">
          By accepting these terms, you acknowledge that you have the authority to grant access on behalf of the company.
        </p>
      </div>
    </div>
  );
}

function AcceptanceStatusCard({ accepted, onAccept, onDecline }: { accepted: boolean; onAccept: () => void; onDecline: () => void }) {
  return (
    <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-3 space-y-2">
      <p className="text-[13px] font-bold text-zinc-900">Acceptance Status</p>

      <div className="flex items-start gap-2.5 rounded-lg bg-emerald-50 p-2">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-600">
          <ShieldCheck size={15} />
        </span>
        <div>
          <p className="text-[12px] font-bold text-emerald-700">{accepted ? 'Accepted' : 'Pending Acceptance'}</p>
          <p className="text-[11px] text-zinc-500 leading-snug mt-0.5">
            {accepted ? 'This request has been accepted.' : 'This request is awaiting company HR acceptance.'}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] pt-1">
        <div>
          <p className="text-[10.5px] font-semibold text-zinc-400">To be accepted by</p>
          <p className="flex items-center gap-1.5 mt-1 font-semibold text-zinc-800">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-pink-200 text-[9px] font-bold text-pink-800">AS</span>
            Anjali Sharma
          </p>
          <p className="text-[10px] text-zinc-400 ml-6.5">HR Manager</p>
        </div>
        <div className="text-right">
          <p className="text-[10.5px] font-semibold text-zinc-400">Acceptance deadline</p>
          <p className="flex items-center gap-1 justify-end mt-1 font-semibold text-zinc-800">
            <Clock size={12} /> 30 May 2025, 01:00 PM
          </p>
          <p className="text-[10px] font-semibold text-red-500">(In 45 minutes)</p>
        </div>
      </div>

      <button
        onClick={onAccept}
        className="flex w-full items-center justify-center gap-1.5 rounded-md bg-indigo-700 py-2.5 text-[12.5px] font-semibold text-white shadow-sm hover:bg-indigo-800 transition-colors"
      >
        <CheckCircle2 size={15} /> Accept Terms &amp; Conditions
      </button>
      <button
        onClick={onDecline}
        className="flex w-full items-center justify-center gap-1.5 rounded-md border border-red-200 bg-white py-2.5 text-[12.5px] font-semibold text-red-600 hover:bg-red-50 transition-colors"
      >
        <XCircle size={15} /> Decline Request
      </button>
    </div>
  );
}

function WhatsNextCard() {
  return (
    <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-2">
      <p className="text-[13px] font-bold text-zinc-900 mb-3">What Happens Next?</p>
      <ul className="space-y-1">
        {NEXT_STEPS.map((step) => (
          <li key={step.title} className="flex items-start gap-2">
            <step.icon size={15} className={`mt-0.5 shrink-0 ${step.color}`} />
            <div>
              <p className="text-[12px] font-bold text-zinc-800">{step.title}</p>
              <p className="text-[11px] text-zinc-500 leading-snug">{step.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterActions() {
  return (
    <div className="flex items-center justify-between gap-2 flex-wrap">
      <button className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-4 py-2.5 text-[12px] font-semibold text-zinc-600 shadow-sm hover:bg-zinc-50 transition-colors">
        <ArrowLeft size={14} /> Back to Data Access Scope
      </button>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-4 py-2.5 text-[12px] font-semibold text-zinc-600 shadow-sm hover:bg-zinc-50 transition-colors">
          <Save size={14} /> Save as PDF
        </button>
        <button className="flex items-center gap-1.5 rounded-md bg-indigo-700 px-4 py-2.5 text-[12px] font-semibold text-white shadow-sm hover:bg-indigo-800 transition-colors">
          <Send size={14} /> Submit for Acceptance
        </button>
      </div>
    </div>
  );
}

export default function TermsAndConditionsTab() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="space-y-2 mt-2">
      <div className="grid grid-cols-1 xl:grid-cols-[2.6fr_1fr] gap-4 items-start">
        <div className="min-w-0">
          <TermsContent />
        </div>
        <div className="space-y-2 min-w-0 xl:sticky xl:top-4">
          <AcceptanceStatusCard
            accepted={accepted}
            onAccept={() => setAccepted(true)}
            onDecline={() => setAccepted(false)}
          />
          <WhatsNextCard />
        </div>
      </div>
      <FooterActions />
    </div>
  );
}
