'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/axios';
import { CrewcamLogo } from '@/components/branding/CrewcamLogo';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import loginArt from '@/assets/login.png';
import {
  Loader2, Eye, EyeOff, User, Lock, ArrowRight,
  CalendarCheck, IndianRupee, Users, GraduationCap,
  TrendingUp, ShieldCheck, Building2, Globe,
  Sun, Moon, ChevronDown,
} from 'lucide-react';

const FEATURES = [
  { icon: Users, label: 'Employee Management' },
  { icon: CalendarCheck, label: 'Attendance & Leave' },
  { icon: IndianRupee, label: 'Payroll Management' },
  { icon: TrendingUp, label: 'Performance Analytics' },
  { icon: GraduationCap, label: 'Learning & Development' },
  { icon: ShieldCheck, label: 'Compliance & Policies' },
];

const STATS = [
  { icon: Users, value: '5000+', label: 'Employees' },
  { icon: Building2, value: '200+', label: 'Organizations' },
  { icon: Globe, value: '25+', label: 'Countries' },
  { icon: ShieldCheck, value: '99.9%', label: 'System Uptime' },
];

function SuperAdminLoginInner() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [requires2FA, setRequires2FA] = useState(false);
  const [totpToken, setTotpToken] = useState('');
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (requires2FA) {
        const response = await api.post('/auth/login/2fa', { email, password, token: totpToken, portal: 'super-admin' });
        const { user, token } = response.data;
        setAuth(user, user.tenantId, token);
        router.push('/super-admin');
      } else {
        const response = await api.post('/auth/login', { email, password, portal: 'super-admin' });
        if (response.data.requires2FA) {
          setRequires2FA(true);
          return;
        }
        const { user, token } = response.data;
        setAuth(user, user.tenantId, token);
        router.push('/super-admin');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4">
      {/* ── Animated Background ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <style>{`
          @keyframes drift1 {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33%       { transform: translate(30px, -20px) scale(1.05); }
            66%       { transform: translate(-15px, 20px) scale(0.95); }
          }
          @keyframes drift2 {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33%       { transform: translate(-25px, 20px) scale(1.08); }
            66%       { transform: translate(15px, -15px) scale(0.92); }
          }
          .blob-drift1 { animation: drift1 12s ease-in-out infinite; }
          .blob-drift2 { animation: drift2 15s ease-in-out infinite reverse; }
          .blob-drift3 { animation: drift1 10s ease-in-out infinite reverse; }
        `}</style>

        {/* Background base & gradients */}
        <div className="absolute inset-0 bg-slate-50 dark:bg-zinc-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[var(--brand-primary)]/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[var(--brand-secondary)]/10 via-transparent to-transparent" />

        {/* Soft Animated Blobs */}
        <div className="blob-drift1 absolute -top-24 -left-24 w-[30rem] h-[30rem] rounded-full bg-[var(--brand-primary)]/10 blur-3xl" />
        <div className="blob-drift2 absolute -bottom-20 -right-20 w-[24rem] h-[24rem] rounded-full bg-[var(--brand-secondary)]/15 blur-3xl" />
        <div className="blob-drift3 absolute top-10 right-20 w-[16rem] h-[16rem] rounded-full bg-[var(--brand-primary)]/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20rem] h-[20rem] rounded-full bg-[var(--brand-secondary)]/10 blur-3xl animate-pulse" />
      </div>

      {/* Language / theme toggle */}
      <div className="absolute right-6 top-6 z-20 flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
        <button type="button" className="flex items-center gap-1.5 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
          <Globe size={15} /> English <ChevronDown size={13} />
        </button>
        <span className="h-4 w-px bg-zinc-200 dark:bg-zinc-700" />
        <button
          type="button"
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          className="flex items-center gap-1.5 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
        >
          {mounted && isDark ? <Sun size={15} /> : <Moon size={15} />}
          {mounted && isDark ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div className="relative z-10 w-full max-w-[900px] min-h-[500px] sm:min-h-[540px] bg-white rounded-2xl shadow-[0_15px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col lg:flex-row">
        {/* Background Image inside the Card */}
        <div className="absolute inset-0 hidden lg:block">
          <Image src={loginArt} alt="Crewcam HRMS" fill priority className="object-cover object-top" />
        </div>

        {/* Left: feature cards + stats, overlaid on the image's navy half */}
        <div className="hidden lg:flex absolute bottom-[30px] left-0 w-1/2 flex-col justify-end gap-4 px-6 z-10">
          <div className="grid grid-cols-6 gap-2">
            {FEATURES.map((f) => (
              <div key={f.label} className="flex flex-col items-center justify-center gap-1.5 text-center px-1 py-2 rounded-xl border border-white/10 bg-[#00041a]/30 backdrop-blur-md hover:bg-[#00041a]/50 transition-colors">
                <f.icon size={20} className="text-[#fbbd38]" strokeWidth={1.3} />
                <p className="text-[9px] leading-tight text-slate-200">{f.label}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#00041a]/30 backdrop-blur-md px-4 py-3">
            {STATS.map((s, idx) => (
              <React.Fragment key={s.label}>
                <div className="flex items-center gap-2">
                  <s.icon size={20} className="text-[#fbbd38]" strokeWidth={1.3} />
                  <div className="flex flex-col text-left">
                    <span className="text-[15px] font-normal text-[#fbbd38] tracking-tight leading-none">{s.value}</span>
                    <span className="text-[9px] text-slate-300 mt-1">{s.label}</span>
                  </div>
                </div>
                {idx < STATS.length - 1 && (
                  <div className="h-8 w-px bg-white/10" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right: Login Form, sitting on top of the image's white half */}
        <div className="relative z-10 flex h-full w-full lg:w-1/2 lg:ml-auto items-center justify-center p-6 lg:p-10">
          <div className="w-full max-w-sm sm:max-w-[360px] relative">

            {/* Close button X from the user screenshot */}
            {/* <div className="absolute -top-4 -right-2 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 hover:text-zinc-800 shadow-sm cursor-pointer transition-colors hidden lg:flex">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div> */}

            <div className="flex items-center gap-2 mb-6 lg:hidden text-zinc-900 dark:text-zinc-50">
              <CrewcamLogo size={32} />
              <span className="text-lg font-md tracking-tight">Crewcam HRMS</span>
            </div>

            <div className="rounded-2xl border border-zinc-100 bg-white p-7 shadow-[0_20px_50px_-20px_rgba(11,22,56,0.25)] dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-6 flex flex-col items-center text-center">
                <div className="relative mb-3 flex h-16 w-16 items-center justify-center">
                  <span className="absolute inset-0 rounded-full opacity-40 [background-image:radial-gradient(circle,#0b1638_1px,transparent_1px)] [background-size:6px_6px] dark:opacity-60" />
                  <CrewcamLogo size={44} className="relative" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-[var(--brand-primary)] dark:text-zinc-50">Platform Admin Access</h1>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Restricted to Crewcam platform operators
                </p>
                <div className="mt-3 h-0.5 w-10 rounded-full bg-[var(--brand-secondary)]" />
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Admin Email
                  </Label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@crewcam.app"
                      required
                      autoFocus
                      className="h-11 pl-10 pr-4 text-sm border-zinc-200 bg-white rounded-xl focus-visible:ring-1 focus-visible:ring-[var(--brand-primary)] focus-visible:border-[var(--brand-primary)] transition-colors shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={requires2FA}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      required
                      className="h-11 pl-10 pr-11 text-sm border-zinc-200 bg-white rounded-xl focus-visible:ring-1 focus-visible:ring-[var(--brand-primary)] focus-visible:border-[var(--brand-primary)] transition-colors shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={requires2FA}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {requires2FA && (
                  <div className="space-y-1.5">
                    <Label htmlFor="totpToken" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                      Authentication Code (2FA)
                    </Label>
                    <Input
                      id="totpToken"
                      type="text"
                      placeholder="123456"
                      required
                      autoFocus
                      className="h-11 px-4 border-zinc-200 bg-white rounded-xl focus-visible:ring-1 focus-visible:ring-[var(--brand-primary)] focus-visible:border-[var(--brand-primary)] transition-colors shadow-sm text-center tracking-widest text-lg dark:border-zinc-700 dark:bg-zinc-900"
                      value={totpToken}
                      onChange={(e) => setTotpToken(e.target.value)}
                      maxLength={6}
                    />
                  </div>
                )}

                <div className="flex items-center justify-end">
                  <a href="mailto:support@crewcam.app" className="text-sm font-medium text-[var(--brand-secondary)] hover:opacity-80 transition-opacity">
                    Forgot Password?
                  </a>
                </div>

                {error && (
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg dark:bg-rose-950/40 dark:border-rose-900">
                    <p className="text-sm font-medium text-rose-600 dark:text-rose-400">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-11 text-sm font-semibold bg-[var(--brand-primary)] text-white hover:opacity-90 rounded-xl shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      {requires2FA ? 'Verify & Sign In' : 'Sign In'} <ArrowRight size={15} />
                    </span>
                  )}
                </Button>
              </form>
            </div>

            <p className="mt-5 text-center text-sm text-zinc-500 dark:text-zinc-400">
              Need help?{' '}
              <a href="mailto:support@crewcam.app" className="font-medium text-[var(--brand-secondary)] hover:opacity-80">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuperAdminLoginPage() {
  return <SuperAdminLoginInner />;
}
