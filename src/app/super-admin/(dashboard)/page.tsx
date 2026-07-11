'use client';

import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Building2, Users, IndianRupee, TrendingUp, RefreshCw, Ticket,
  AlertTriangle, TrendingDown, CheckCircle2, Sparkles, ChevronRight,
  PlusCircle, CreditCard, FileText, Rocket, Bell, MessageSquarePlus,
  BarChart3, PhoneCall, Megaphone, ChevronDown, Flame, Wind,
  CalendarClock, UserPlus,
} from 'lucide-react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell,
} from 'recharts';

/* All figures on this page are illustrative placeholders matching the approved
   visual design — real data wiring lands with the platform-metrics API phase. */

const STATS = [
  { icon: Building2, accent: '#0b1638', label: 'Total Companies', value: '247', delta: '▲ 18 This Month', deltaColor: '#059669' },
  { icon: Users, accent: '#7c3aed', label: 'Employees Managed', value: '184,562', delta: '▲ 6.4% vs Last Month', deltaColor: '#059669' },
  { icon: IndianRupee, accent: '#059669', label: 'Monthly Revenue (MRR)', value: '₹48.75 Lakh', delta: '▲ 12.5% vs Last Month', deltaColor: '#059669' },
  { icon: TrendingUp, accent: '#d97706', label: 'Annual Recurring (ARR)', value: '₹5.85 Cr', delta: '▲ 14.3% vs Last Year', deltaColor: '#059669' },
  { icon: RefreshCw, accent: '#2563eb', label: 'Renewals Due', value: '21', delta: 'In Next 30 Days', deltaColor: '#64748b' },
  { icon: Ticket, accent: '#dc2626', label: 'Open Tickets', value: '38', delta: '▲ 5 New Today', deltaColor: '#dc2626' },
];

const PORTFOLIO = [
  { label: 'Active Clients', value: 187, color: '#059669' },
  { label: 'Trial Clients', value: 32, color: '#2563eb' },
  { label: 'Inactive Clients', value: 28, color: '#dc2626' },
  { label: 'Enterprise Clients', value: 46, color: '#7c3aed' },
];

const AI_INSIGHTS = [
  { icon: AlertTriangle, color: '#d97706', title: '8 subscriptions are expiring in next 15 days.', sub: 'Potential revenue at risk: ₹18.45 Lakh' },
  { icon: TrendingDown, color: '#7c3aed', title: '3 enterprise clients showing low adoption.', sub: 'Engagement score below 40%' },
  { icon: BarChart3, color: '#2563eb', title: 'Revenue forecast for this month is down by 6%.', sub: 'Compared to last month' },
  { icon: FileText, color: '#059669', title: '12 companies have pending invoices.', sub: 'Total outstanding: ₹24.36 Lakh' },
  { icon: AlertTriangle, color: '#dc2626', title: '2 companies are at high churn risk.', sub: 'Immediate action recommended' },
];

const QUICK_ACTIONS = [
  { icon: PlusCircle, label: 'Add New\nCompany', href: '/super-admin/companies/new' },
  { icon: CreditCard, label: 'Create\nSubscription', href: '/super-admin/subscriptions' },
  { icon: FileText, label: 'Generate\nInvoice', href: '/super-admin/invoices' },
  { icon: Rocket, label: 'Start Free\nTrial', href: '/super-admin/companies/new' },
  { icon: Bell, label: 'Send Renewal\nReminder', href: '/super-admin/subscriptions' },
  { icon: MessageSquarePlus, label: 'Create Support\nTicket', href: '/super-admin/support' },
  { icon: BarChart3, label: 'View\nReports', href: '/super-admin/reports' },
  { icon: PhoneCall, label: 'Request\nCallback', href: '/super-admin/leads' },
  { icon: Megaphone, label: 'System\nAnnouncements', href: '/super-admin/banners' },
];

const REVENUE_TREND = [
  { name: 'Jun', mrr: 32, arr: 24 }, { name: 'Jul', mrr: 35, arr: 27 }, { name: 'Aug', mrr: 37, arr: 30 },
  { name: 'Sep', mrr: 39, arr: 33 }, { name: 'Oct', mrr: 41, arr: 36 }, { name: 'Nov', mrr: 42, arr: 39 },
  { name: 'Dec', mrr: 44, arr: 41 }, { name: 'Jan', mrr: 44, arr: 43 }, { name: 'Feb', mrr: 45, arr: 45 },
  { name: 'Mar', mrr: 46, arr: 46 }, { name: 'Apr', mrr: 47, arr: 47 }, { name: 'May', mrr: 48.75, arr: 48 },
];

const CLIENT_HEALTH = [
  { name: 'Excellent', value: 135, color: '#059669' },
  { name: 'Good', value: 62, color: '#2563eb' },
  { name: 'Warning', value: 28, color: '#d97706' },
  { name: 'Critical', value: 22, color: '#dc2626' },
];

const MODULE_USAGE = [
  { name: 'Attendance', pct: 92 }, { name: 'Leave Management', pct: 85 }, { name: 'Payroll', pct: 78 },
  { name: 'Recruitment', pct: 63 }, { name: 'Performance', pct: 58 }, { name: 'Documents', pct: 55 },
  { name: 'Assets', pct: 43 }, { name: 'Training', pct: 39 }, { name: 'Helpdesk', pct: 36 },
];

const TOP_COMPANIES = [
  { name: 'TechVision Pvt. Ltd.', plan: 'Enterprise', revenue: '₹4.85 Lakh' },
  { name: 'Abc Infotech Ltd.', plan: 'Enterprise', revenue: '₹3.25 Lakh' },
  { name: 'Greenfield Retail', plan: 'Professional', revenue: '₹2.75 Lakh' },
  { name: 'Sunrise Hospital', plan: 'Enterprise', revenue: '₹2.45 Lakh' },
  { name: 'Nova Agencies', plan: 'Professional', revenue: '₹1.95 Lakh' },
];

const IMPLEMENTATION_STAGES = [
  { label: 'Signed', value: 14 }, { label: 'Setup', value: 9 }, { label: 'Employee Import', value: 7 },
  { label: 'Training', value: 5 }, { label: 'Go Live', value: 6 },
];

const SUPPORT_CATEGORIES = [
  { label: 'Payroll', value: 12, pct: 32 }, { label: 'Login & Access', value: 8, pct: 21 },
  { label: 'Attendance', value: 6, pct: 16 }, { label: 'Mobile App', value: 5, pct: 13 }, { label: 'Others', value: 7, pct: 18 },
];

const TICKET_STATUS = [
  { name: 'Open', value: 38, color: '#2563eb' },
  { name: 'In Progress', value: 22, color: '#d97706' },
  { name: 'Resolved', value: 68, color: '#059669' },
  { name: 'Closed', value: 142, color: '#94a3b8' },
];

const EMPLOYEE_INTEL = [
  { icon: Flame, accent: '#dc2626', label: 'Attrition Risk', value: '236', sub: 'High Risk Employees', delta: '▲ 8.2%' },
  { icon: Wind, accent: '#d97706', label: 'Burnout Index', value: '18%', sub: 'Needs Attention', delta: '▲ 3.6%' },
  { icon: CalendarClock, accent: '#2563eb', label: 'Absenteeism Rate', value: '4.7%', sub: 'Average', delta: '▲ 1.2%' },
  { icon: UserPlus, accent: '#059669', label: 'Hiring Trend', value: '1,245', sub: 'New Hires', delta: '▲ 10.4%' },
];

function todayLabel() {
  return new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function SuperAdminOverviewPage() {
  const user = useAuthStore((state) => state.user);
  const firstName = user?.firstName || 'Admin';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-300 pb-6 max-w-[1500px] mx-auto">

      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">{greeting}, {firstName} 👋</h1>
          <p className="text-xs text-slate-500">Crewcam HRMS Control Center</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Managing 247 Organizations &bull; 1,84,562 Employees &bull; 25 Countries</p>
        </div>
        <button type="button" className="flex items-center gap-2 h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-600">
          {todayLabel()} <ChevronDown size={14} />
        </button>
      </div>

      {/* Stat tile row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {STATS.map((s) => (
          <Card key={s.label} className="border-slate-200 shadow-sm rounded-xl">
            <CardContent className="p-3">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center mb-2" style={{ background: `${s.accent}1a`, color: s.accent }}>
                <s.icon size={16} />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-slate-900 leading-none">{s.value}</h3>
              <p className="text-[10px] text-slate-500 mt-1.5">{s.label}</p>
              <p className="text-[9px] font-medium mt-1" style={{ color: s.deltaColor }}>{s.delta}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Portfolio / AI Insights / Quick Actions */}
      <div className="grid grid-cols-12 gap-3">
        <Card className="col-span-12 lg:col-span-5 border-slate-200 shadow-sm rounded-xl overflow-hidden" style={{ background: 'var(--brand-primary)' }}>
          <CardHeader className="px-4 py-3 border-b border-white/10 flex flex-row items-center justify-between">
            <CardTitle className="text-[13px] font-semibold text-white">Client Portfolio Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="relative h-32 rounded-lg overflow-hidden" style={{ background: 'radial-gradient(circle at 30% 40%, rgba(245,196,81,0.15), transparent 60%), radial-gradient(circle at 70% 60%, rgba(245,196,81,0.1), transparent 55%)' }}>
              <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:10px_10px]" />
              {[[20, 35], [45, 55], [65, 30], [80, 60], [30, 70], [55, 20]].map(([x, y], i) => (
                <span key={i} className="absolute h-1.5 w-1.5 rounded-full bg-[var(--brand-secondary)]" style={{ left: `${x}%`, top: `${y}%`, boxShadow: '0 0 6px rgba(245,196,81,0.8)' }} />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {PORTFOLIO.map((p) => (
                <div key={p.label} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ background: p.color }} />
                  <div>
                    <p className="text-sm font-bold text-white leading-none">{p.value}</p>
                    <p className="text-[10px] text-white/50 leading-tight">{p.label}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-white/5 border border-white/10 p-3 text-[11px] text-white/70 flex justify-between">
              <span>India &bull; 162 Companies</span>
              <span>25 Countries Served</span>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-12 lg:col-span-4 border-slate-200 shadow-sm rounded-xl overflow-hidden flex flex-col">
          <CardHeader className="px-4 py-3 border-b border-slate-100 bg-slate-50/60">
            <CardTitle className="text-[13px] font-semibold flex items-center gap-1.5 text-slate-800">
              <Sparkles size={14} style={{ color: 'var(--brand-secondary)' }} /> AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 divide-y divide-slate-100">
            {AI_INSIGHTS.map((ins, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3">
                <ins.icon size={14} className="mt-0.5 shrink-0" style={{ color: ins.color }} />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-medium text-slate-800 leading-tight">{ins.title}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{ins.sub}</p>
                </div>
                <ChevronRight size={14} className="text-slate-300 shrink-0 mt-0.5" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="col-span-12 lg:col-span-3 border-slate-200 shadow-sm rounded-xl">
          <CardHeader className="px-3 py-3 border-b border-slate-100 bg-slate-50/60">
            <CardTitle className="text-[13px] font-semibold text-slate-800">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-2 grid grid-cols-3 gap-1.5">
            {QUICK_ACTIONS.map((qa) => (
              <Link key={qa.label} href={qa.href} className="flex flex-col items-center justify-center gap-1.5 rounded-lg border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors p-2 text-center">
                <div className="h-7 w-7 rounded-md flex items-center justify-center" style={{ background: 'rgba(11,22,56,0.06)', color: 'var(--brand-primary)' }}>
                  <qa.icon size={14} />
                </div>
                <span className="text-[9px] font-medium text-slate-600 leading-tight whitespace-pre-line">{qa.label}</span>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Revenue / Client Health / Module Usage / Top Companies */}
      <div className="grid grid-cols-12 gap-3">
        <Card className="col-span-12 md:col-span-6 lg:col-span-3 border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="px-3 py-2.5 border-b border-slate-100 bg-slate-50/60">
            <CardTitle className="text-[12px] font-semibold text-slate-800">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-1">
            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={REVENUE_TREND} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} interval={1} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 11 }} />
                  <Line type="monotone" dataKey="mrr" name="MRR" stroke="#2563eb" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="arr" name="ARR" stroke="#d97706" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-12 md:col-span-6 lg:col-span-3 border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="px-3 py-2.5 border-b border-slate-100 bg-slate-50/60">
            <CardTitle className="text-[12px] font-semibold text-slate-800">Client Health Distribution</CardTitle>
          </CardHeader>
          <CardContent className="p-3 flex items-center gap-3">
            <div className="h-[130px] w-[130px] relative shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={CLIENT_HEALTH} dataKey="value" innerRadius={38} outerRadius={58} paddingAngle={2}>
                    {CLIENT_HEALTH.map((c) => <Cell key={c.name} fill={c.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-lg font-bold text-slate-900 leading-none">247</p>
                <p className="text-[8px] text-slate-400">Total</p>
              </div>
            </div>
            <div className="space-y-1.5 min-w-0">
              {CLIENT_HEALTH.map((c) => (
                <div key={c.name} className="flex items-center gap-1.5 text-[10px]">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ background: c.color }} />
                  <span className="text-slate-500 truncate">{c.name}</span>
                  <span className="ml-auto font-medium text-slate-800">{c.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-12 md:col-span-6 lg:col-span-3 border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="px-3 py-2.5 border-b border-slate-100 bg-slate-50/60">
            <CardTitle className="text-[12px] font-semibold text-slate-800">Module Usage (All Clients)</CardTitle>
          </CardHeader>
          <CardContent className="p-3 space-y-2">
            {MODULE_USAGE.map((m) => (
              <div key={m.name}>
                <div className="flex justify-between text-[10px] text-slate-500 mb-0.5">
                  <span className="truncate">{m.name}</span>
                  <span className="font-medium text-slate-700">{m.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${m.pct}%`, background: 'var(--brand-primary)' }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="col-span-12 lg:col-span-3 border-slate-200 shadow-sm rounded-xl overflow-hidden flex flex-col">
          <CardHeader className="px-3 py-2.5 border-b border-slate-100 bg-slate-50/60">
            <CardTitle className="text-[12px] font-semibold text-slate-800">Top Companies by Revenue</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 divide-y divide-slate-100">
            {TOP_COMPANIES.map((c) => (
              <div key={c.name} className="flex items-center justify-between px-3 py-2">
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-800 truncate">{c.name}</p>
                  <p className="text-[9px] text-slate-400">{c.plan}</p>
                </div>
                <p className="text-[11px] font-semibold text-slate-800 shrink-0 ml-2">{c.revenue}</p>
              </div>
            ))}
            <div className="p-2 text-center">
              <Link href="/super-admin/companies" className="text-[10px] font-medium" style={{ color: 'var(--brand-primary)' }}>View Full Companies →</Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Implementation / Billing / Support / Employee Intelligence */}
      <div className="grid grid-cols-12 gap-3">
        <Card className="col-span-12 md:col-span-6 lg:col-span-3 border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="px-3 py-2.5 border-b border-slate-100 bg-slate-50/60">
            <CardTitle className="text-[12px] font-semibold text-slate-800">Implementation Tracker</CardTitle>
          </CardHeader>
          <CardContent className="p-3 space-y-3">
            <div className="flex items-center justify-between">
              {IMPLEMENTATION_STAGES.map((s, i) => (
                <React.Fragment key={s.label}>
                  <div className="flex flex-col items-center gap-1">
                    <div className="h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: 'var(--brand-primary)' }}>{s.value}</div>
                    <span className="text-[8px] text-slate-500 text-center leading-tight max-w-[42px]">{s.label}</span>
                  </div>
                  {i < IMPLEMENTATION_STAGES.length - 1 && <div className="h-px flex-1 bg-slate-200 mb-4" />}
                </React.Fragment>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <div>
                <p className="text-sm font-bold text-slate-900">41</p>
                <p className="text-[9px] text-slate-400">Total In Progress</p>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">18</p>
                <p className="text-[9px] text-slate-400">Completed This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-12 md:col-span-6 lg:col-span-3 border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="px-3 py-2.5 border-b border-slate-100 bg-slate-50/60">
            <CardTitle className="text-[12px] font-semibold text-slate-800">Billing Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="p-3 space-y-2.5">
            <BillingRow label="Today's Collections" value="₹6.45 Lakh" />
            <BillingRow label="Pending Payments" value="₹24.36 Lakh" />
            <BillingRow label="Upcoming Renewals" value="21 Companies" />
            <BillingRow label="Auto Invoices Generated" value="46" />
          </CardContent>
        </Card>

        <Card className="col-span-12 md:col-span-6 lg:col-span-3 border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="px-3 py-2.5 border-b border-slate-100 bg-slate-50/60">
            <CardTitle className="text-[12px] font-semibold text-slate-800">Support Center Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-3 space-y-3">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-sm font-bold text-slate-900">38</p>
                <p className="text-[8px] text-slate-400">Open Tickets</p>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">4.6 hrs</p>
                <p className="text-[8px] text-slate-400">Avg. Resolution</p>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">4.6/5</p>
                <p className="text-[8px] text-slate-400">CSAT Score</p>
              </div>
            </div>
            <div className="space-y-1.5">
              {SUPPORT_CATEGORIES.map((c) => (
                <div key={c.label}>
                  <div className="flex justify-between text-[9px] text-slate-500 mb-0.5">
                    <span>{c.label}</span>
                    <span>{c.value} ({c.pct}%)</span>
                  </div>
                  <div className="h-1 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-amber-500" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-12 lg:col-span-3 border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="px-3 py-2.5 border-b border-slate-100 bg-slate-50/60">
            <CardTitle className="text-[12px] font-semibold text-slate-800">Employee Intelligence (Across All Clients)</CardTitle>
          </CardHeader>
          <CardContent className="p-3 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {EMPLOYEE_INTEL.map((e) => (
                <div key={e.label} className="rounded-lg p-2" style={{ background: `${e.accent}0d` }}>
                  <e.icon size={13} style={{ color: e.accent }} />
                  <p className="text-sm font-bold text-slate-900 mt-1 leading-none">{e.value}</p>
                  <p className="text-[8px] text-slate-500 mt-0.5">{e.sub}</p>
                  <p className="text-[8px] font-medium mt-0.5" style={{ color: e.accent }}>{e.delta}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-100 p-2.5">
              <p className="text-[10px] text-slate-600 leading-snug">
                <span className="font-semibold text-slate-800">AI Prediction:</span> Attrition may increase by 6% in next 60 days in IT &amp; Sales departments.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <p className="text-center text-[10px] text-slate-400 pt-2">
        © {new Date().getFullYear()} Crewcam HRMS. All Rights Reserved.
      </p>
    </div>
  );
}

function BillingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[11px] text-slate-500">{label}</span>
      <span className="text-[12px] font-semibold text-slate-800">{value}</span>
    </div>
  );
}
