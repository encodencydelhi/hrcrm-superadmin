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
  CalendarCheck, Wallet, Users, GraduationCap,
  TrendingUp, ShieldCheck, Building2, Globe,
  Sun, Moon, ChevronDown,
} from 'lucide-react';

const FEATURES = [
  { icon: Users, label: 'Employee Management' },
  { icon: CalendarCheck, label: 'Attendance & Leave' },
  { icon: Wallet, label: 'Payroll Management' },
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
    <div className="relative h-screen w-full overflow-hidden bg-white dark:bg-zinc-950">
      <div className="absolute inset-x-0 top-[0px] bottom-[0px]">
        <Image src={loginArt} alt="Crewcam HRMS" fill priority className="object-cover object-top" />
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

      {/* Left: feature cards + stats, overlaid on the image's navy half */}
      <div className="hidden lg:flex absolute top-[20px] bottom-[20px] left-0 w-1/2 flex-col justify-end gap-5 p-10 xl:p-12 z-10">
        <div className="grid grid-cols-3 gap-x-3 gap-y-5 sm:grid-cols-6">
          {FEATURES.map((f) => (
            <div key={f.label} className="flex flex-col items-center gap-2 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--brand-secondary)]/50 bg-white/5 text-[var(--brand-secondary)]">
                <f.icon size={18} />
              </span>
              <p className="text-[11px] leading-tight text-slate-200">{f.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-3 rounded-xl border border-[var(--brand-secondary)]/25 bg-[var(--brand-primary)]/70 backdrop-blur-sm p-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <s.icon size={18} className="shrink-0 text-[var(--brand-secondary)]" />
              <div>
                <p className="text-base font-bold text-white leading-none">{s.value}</p>
                <p className="mt-0.5 text-[10px] text-slate-300 leading-none">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Login Form, sitting on top of the image's white half */}
      <div className="relative z-10 flex h-full w-full items-center justify-center lg:justify-end px-6 lg:pr-16 xl:pr-28">
        <div className="w-full max-w-[380px] py-6">

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
  );
}

export default function SuperAdminLoginPage() {
  return <SuperAdminLoginInner />;
}
