'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  Users2,
  Landmark,
  Receipt,
  CreditCard,
  PieChart,
  Bot,
  LifeBuoy,
  Wrench,
  Briefcase,
  Plug,
  BarChart3,
  Settings as SettingsIcon,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  FileText,
  KeyRound,
} from 'lucide-react';
import { CrewcamLogo } from '@/components/branding/CrewcamLogo';
import { LEAD_STAGE_GROUPS, stageGroupQuery } from '@/lib/leadStages';

const LEADS_HREF = '/super-admin/leads';

const PLATFORM_STATUS = [
  'System', 'API Services', 'Database', 'Email Service', 'SMS Gateway', 'WhatsApp',
];

type NavChild = { href: string; label: string };
type NavItem = {
  href?: string;
  icon: React.ElementType;
  label: string;
  children?: NavChild[];
};

const NAV_ITEMS: NavItem[] = [
  { href: '/super-admin', icon: LayoutDashboard, label: 'Control Center' },
  { href: '/super-admin/companies', icon: Building2, label: 'Companies' },
  { href: '/super-admin/term-and-conditions', icon: FileText, label: 'Terms & Conditions' },
  { href: '/super-admin/credentials-and-instructions', icon: KeyRound, label: 'Credentials & Instructions' },
  { href: '/super-admin/coming-soon?feature=Workforce', icon: Users2, label: 'Workforce' },
  { href: '/super-admin/setup-fees', icon: Landmark, label: 'Revenue & Finance' },
  { href: '/super-admin/invoices', icon: Receipt, label: 'Billing & Invoices' },
  { href: '/super-admin/subscriptions', icon: CreditCard, label: 'Subscriptions' },
  { href: '/super-admin/analytics', icon: PieChart, label: 'Analytics' },
  { href: '/super-admin/ai-providers', icon: Bot, label: 'AI Insights' },
  { href: '/super-admin/support', icon: LifeBuoy, label: 'Support Center' },
  {
    icon: Wrench, label: 'Implementations',
    children: [
      { href: '/super-admin/implementations', label: 'Implementation Tracker' },
      { href: '/super-admin/deployments', label: 'Deployments' },
      { href: '/super-admin/workspace-provisioning', label: 'Workspace Provisioning' },
    ],
  },
  {
    icon: Briefcase, label: 'Sales CRM',
    children: [
      { href: '/super-admin/crm', label: 'CRM Overview' },
      { href: `${LEADS_HREF}/new`, label: 'Add New Lead' },
      ...LEAD_STAGE_GROUPS.filter((g) => g.key === 'NEW').map((g) => ({ href: `${LEADS_HREF}?stage=${stageGroupQuery(g)}`, label: g.navLabel })),
      { href: `${LEADS_HREF}/follow-ups`, label: 'Follow Ups' },
      ...LEAD_STAGE_GROUPS.filter((g) => g.key !== 'NEW').map((g) => ({ href: `${LEADS_HREF}?stage=${stageGroupQuery(g)}`, label: g.navLabel })),
      { href: LEADS_HREF, label: 'All Leads' },
    ],
  },
  { href: '/super-admin/coming-soon?feature=Integrations', icon: Plug, label: 'Integrations' },
  { href: '/super-admin/reports', icon: BarChart3, label: 'Reports' },
  {
    icon: SettingsIcon, label: 'Settings',
    children: [
      { href: '/super-admin/settings', label: 'General Settings' },
      { href: '/super-admin/audit-logs', label: 'Audit Logs' },
      { href: '/super-admin/automation', label: 'Automation' },
      { href: '/super-admin/features', label: 'Feature Flags' },
    ],
  },
];

export default function SuperAdminSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <>
      <style>{`
        .sa-sidebar-scroll::-webkit-scrollbar { width: 3px; }
        .sa-sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
        .sa-sidebar-scroll::-webkit-scrollbar-thumb { background: rgba(245,196,81,0.25); border-radius: 4px; }
        .sa-sidebar-scroll::-webkit-scrollbar-thumb:hover { background: rgba(245,196,81,0.4); }
        .sa-sidebar-scroll { scrollbar-width: thin; scrollbar-color: rgba(245,196,81,0.25) transparent; overflow-x: hidden; }
      `}</style>
      <aside
        className="w-64 flex-shrink-0 flex flex-col relative z-20"
        style={{ background: 'var(--brand-primary, #0b1638)' }}
      >
        <div className="h-16 flex items-center px-5" style={{ borderBottom: '1px solid rgba(245,196,81,0.15)' }}>
          <div className="flex items-center gap-2.5">
            <CrewcamLogo size={34} className="shrink-0" />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-white tracking-tight">Crewcam <span style={{ color: 'var(--brand-secondary, #f5c451)' }}>HRMS</span></p>
              <p className="text-[8px] text-white/40 uppercase tracking-widest">Insight &bull; Innovation &bull; Impact</p>
            </div>
          </div>
        </div>

        <div className="sa-sidebar-scroll flex-1 overflow-y-auto py-2 px-3">
          <nav className="space-y-px">
            {NAV_ITEMS.map((item) => {
              const active = item.href
                ? (item.href === '/super-admin' ? pathname === '/super-admin' : pathname.startsWith(item.href.split('?')[0]) && !item.href.includes('coming-soon'))
                : (item.children || []).some((c) => pathname.startsWith(c.href.split('?')[0]));
              if (item.children) {
                return (
                  <NavGroup
                    key={item.label}
                    icon={<item.icon size={16} />}
                    label={item.label}
                    sectionActive={active}
                    items={item.children}
                    pathname={pathname}
                    searchParams={searchParams}
                  />
                );
              }
              return (
                <NavItemLink
                  key={item.href}
                  href={item.href!}
                  icon={<item.icon size={16} />}
                  label={item.label}
                  active={active}
                />
              );
            })}
          </nav>
        </div>

        {/* Platform status — illustrative until real uptime/health monitoring is wired up */}
        <div className="p-3 space-y-3" style={{ borderTop: '1px solid rgba(245,196,81,0.15)' }}>
          <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <p className="text-[11px] font-semibold text-white/70">Platform Status</p>
            </div>
            <div className="space-y-1">
              {PLATFORM_STATUS.map((s) => (
                <div key={s} className="flex items-center justify-between">
                  <span className="text-[10px] text-white/50">{s}</span>
                  <span className="flex items-center gap-1 text-[9px] font-medium text-emerald-400">
                    <CheckCircle2 size={9} /> Operational
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <p className="text-[9px] text-white/40 uppercase tracking-wide">Uptime (Last 30 Days)</p>
            <p className="text-xl font-bold" style={{ color: 'var(--brand-secondary, #f5c451)' }}>99.99%</p>
          </div>
        </div>
      </aside>
    </>
  );
}

function NavItemLink({
  href, icon, label, active = false,
}: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-1.5 text-xs font-medium rounded-full transition-colors"
      style={active
        ? { background: 'rgba(245,196,81,0.15)', color: 'var(--brand-secondary, #f5c451)', border: '1px solid rgba(245,196,81,0.25)' }
        : { color: 'rgba(255,255,255,0.6)' }}
    >
      {icon}
      <span className="flex-1 truncate">{label}</span>
    </Link>
  );
}

function NavGroup({
  icon, label, sectionActive, items, pathname, searchParams,
}: {
  icon: React.ReactNode;
  label: string;
  sectionActive: boolean;
  items: { href: string; label: string }[];
  pathname: string;
  searchParams: URLSearchParams;
}) {
  const isChildActive = (href: string) => {
    const [hrefPath, hrefQuery] = href.split('?');
    if (pathname !== hrefPath) return false;
    return (hrefQuery || '') === searchParams.toString();
  };
  const [expanded, setExpanded] = React.useState(sectionActive);

  return (
    <div className="space-y-0.5">
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center justify-between gap-3 px-3 py-1.5 text-xs font-medium rounded-full transition-colors"
        style={sectionActive
          ? { background: 'rgba(245,196,81,0.15)', color: 'var(--brand-secondary, #f5c451)', border: '1px solid rgba(245,196,81,0.25)' }
          : { color: 'rgba(255,255,255,0.6)' }}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span>{label}</span>
        </div>
        {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      </button>
      {expanded && (
        <div className="ml-3 pl-3 space-y-0.5" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
          {items.map((item) => {
            const active = isChildActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-1 text-xs rounded-full transition-colors truncate"
                style={active
                  ? { background: 'rgba(245,196,81,0.15)', color: 'var(--brand-secondary, #f5c451)', fontWeight: 500 }
                  : { color: 'rgba(255,255,255,0.5)' }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
