'use client';

import React, { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import SuperAdminSidebar from '@/components/layout/SuperAdminSidebar';
import AuthGuard from '@/components/auth/AuthGuard';
import ForceLight from '@/components/theme/ForceLight';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/axios';
import { Menu, Search, Sparkles, Bell, Headset, ChevronDown, LogOut } from 'lucide-react';

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const initials = user ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() || 'SA' : 'SA';

  const handleSignOut = async () => {
    try {
      await api.post('/auth/logout', { portal: 'super-admin' });
    } catch {
      // Best-effort server-side revoke; clear local session regardless.
    }
    logout();
    router.replace('/super-admin/login');
  };

  return (
    <AuthGuard>
      <ForceLight />
      <div className="flex h-screen w-full bg-slate-100 overflow-hidden text-slate-900">

        <Suspense fallback={null}>
          <SuperAdminSidebar />
        </Suspense>

        <main className="flex-1 flex flex-col min-w-0 bg-slate-50">

          <header
            className="h-12 flex items-center justify-between gap-3 px-3 sticky top-0 z-10 shadow-sm"
            style={{ background: 'var(--brand-primary, #0b1638)', borderBottom: '1px solid rgba(245,196,81,0.15)' }}
          >
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <button type="button" className="text-white/60 hover:text-white transition-colors">
                <Menu size={18} />
              </button>
              <div className="relative flex-1 max-w-sm">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Search anything... (Company, Employee, Invoice, Ticket...)"
                  className="w-full h-7 pl-8 pr-12 text-xs rounded-md border text-white placeholder:text-white/40 focus:outline-none focus:ring-1 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.12)' }}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-white/40 border border-white/15 rounded px-1 py-0.5">Ctrl K</span>
              </div>
            </div>

            <div className="flex items-center gap-0.5 shrink-0">
              <button
                type="button"
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium mr-1 border"
                style={{ background: 'rgba(245,196,81,0.12)', color: 'var(--brand-secondary)', borderColor: 'rgba(245,196,81,0.3)' }}
              >
                <Sparkles size={12} /> AI Assistant
              </button>

              <button type="button" className="relative p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-colors">
                <Bell size={16} />
                <span className="absolute top-0.5 right-0.5 h-3 w-3 rounded-full bg-amber-500 text-white text-[7px] font-bold flex items-center justify-center">12</span>
              </button>

              <button type="button" className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-colors">
                <Headset size={16} />
              </button>

              <div className="relative ml-0.5">
                <button
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex items-center gap-1.5 pl-1.5 pr-1 py-1 rounded-md hover:bg-white/10 transition-colors"
                >
                  <div
                    className="h-7 w-7 rounded-full font-medium flex items-center justify-center text-[10px] shrink-0"
                    style={{ background: 'var(--brand-secondary, #f5c451)', color: 'var(--brand-primary, #0b1638)' }}
                  >
                    {initials}
                  </div>
                  {user && (
                    <div className="text-left hidden md:block">
                      <p className="text-[11px] font-medium text-white leading-tight">{user.firstName} {user.lastName}</p>
                      <p className="text-[9px] text-white/50 leading-tight">Super Admin</p>
                    </div>
                  )}
                  <ChevronDown size={12} className="text-white/40" />
                </button>

                {menuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-1.5 w-44 rounded-lg border border-slate-200 bg-white shadow-lg py-1 z-20">
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-auto px-4 py-2.5">
            <div className="w-full h-full">
              {children}
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
