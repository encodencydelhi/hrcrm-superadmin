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
  Sun, Moon, ChevronDown, Mail, Smartphone, Send
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
  const [step, setStep] = useState<'IDENTIFIER' | 'OTP'>('IDENTIFIER');
  const [identifierType, setIdentifierType] = useState<'EMAIL' | 'MOBILE'>('EMAIL');
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await api.post('/auth/login/send-otp', { identifier, portal: 'super-admin' });
      setMessage(response.data.message || 'OTP sent successfully. Please check your Email or WhatsApp.');
      setStep('OTP');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login/verify-otp', { identifier, otp, portal: 'super-admin' });
      const { user, token } = response.data;
      setAuth(user, user.tenantId, token);
      router.push('/super-admin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <style>{`
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes float-up {
            0% { transform: translateY(110vh) scale(0.5); opacity: 0; }
            20% { opacity: 0.6; }
            80% { opacity: 0.6; }
            100% { transform: translateY(-20vh) scale(1.5); opacity: 0; }
          }
          .animate-bg {
            background-size: 300% 300%;
            animation: gradient-shift 20s ease infinite;
          }
          .particle {
            position: absolute;
            background: radial-gradient(circle, rgba(251, 189, 56, 0.4) 0%, rgba(251, 189, 56, 0) 70%);
            border-radius: 50%;
            animation: float-up infinite linear;
          }
          .dark .particle {
            background: radial-gradient(circle, rgba(251, 189, 56, 0.2) 0%, rgba(251, 189, 56, 0) 70%);
          }
        `}</style>

        {/* Dynamic Panning Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-[#f1f5f9] to-[#fef3c7] dark:from-[#050b1a] dark:via-[#020617] dark:to-[#0f172a] animate-bg" />

        {/* Floating Ambient Particles */}
        <div className="particle" style={{ left: '15%', width: '150px', height: '150px', animationDuration: '18s', animationDelay: '0s' }} />
        <div className="particle" style={{ left: '35%', width: '80px', height: '80px', animationDuration: '14s', animationDelay: '5s' }} />
        <div className="particle" style={{ left: '65%', width: '120px', height: '120px', animationDuration: '22s', animationDelay: '2s' }} />
        <div className="particle" style={{ left: '85%', width: '200px', height: '200px', animationDuration: '25s', animationDelay: '10s' }} />
        <div className="particle" style={{ left: '50%', width: '100px', height: '100px', animationDuration: '16s', animationDelay: '8s' }} />

        {/* Tech Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.25] dark:opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(var(--brand-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* Large Pulsing Orbs in Corners */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#fbbd38] rounded-full mix-blend-multiply dark:mix-blend-screen blur-[120px] opacity-10 dark:opacity-[0.03] animate-pulse" style={{ animationDuration: '7s' }} />
        <div className="absolute -bottom-40 -right-40 w-[800px] h-[800px] bg-[var(--brand-primary)] rounded-full mix-blend-multiply dark:mix-blend-screen blur-[150px] opacity-20 dark:opacity-30 animate-pulse" style={{ animationDuration: '10s' }} />

        {/* Subtle Vignette overlay to pop the center */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.03)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
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

      <div className="relative z-10 w-full max-w-[900px] min-h-[500px] sm:min-h-[540px] bg-white rounded-2xl shadow-[0_15px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col lg:flex-row lg:scale-[0.83] lg:origin-center">
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

              <form onSubmit={step === 'IDENTIFIER' ? handleSendOtp : handleVerifyOtp} className="space-y-4">
                {step === 'IDENTIFIER' ? (
                  <div className="space-y-4">
                    {/* Toggle */}
                    <div className="flex bg-slate-50 dark:bg-zinc-800/50 p-1 rounded-xl border border-slate-100 dark:border-zinc-800">
                      <button
                        type="button"
                        onClick={() => { setIdentifierType('EMAIL'); setIdentifier(''); }}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[13px] font-bold rounded-lg transition-all ${identifierType === 'EMAIL'
                            ? 'bg-white dark:bg-zinc-900 text-[var(--brand-primary)] dark:text-blue-400 shadow-sm'
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300'
                          }`}
                      >
                        <Mail size={16} /> EMAIL
                      </button>
                      <button
                        type="button"
                        onClick={() => { setIdentifierType('MOBILE'); setIdentifier(''); }}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[13px] font-bold rounded-lg transition-all ${identifierType === 'MOBILE'
                            ? 'bg-white dark:bg-zinc-900 text-[var(--brand-primary)] dark:text-blue-400 shadow-sm'
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300'
                          }`}
                      >
                        <Smartphone size={16} /> MOBILE
                      </button>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <Label htmlFor="identifier" className="text-xs font-bold tracking-wider text-slate-700 dark:text-zinc-300 uppercase">
                        {identifierType === 'EMAIL' ? 'EMAIL ADDRESS' : 'MOBILE NUMBER'}
                      </Label>
                      <div className="relative">
                        {identifierType === 'EMAIL' ? (
                          <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        ) : (
                          <Smartphone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        )}
                        <Input
                          id="identifier"
                          type={identifierType === 'EMAIL' ? 'email' : 'tel'}
                          placeholder={identifierType === 'EMAIL' ? 'Enter registered email' : 'Enter registered mobile number'}
                          required
                          autoFocus
                          className="h-12 pl-11 pr-4 text-sm border-slate-200 bg-white rounded-xl focus-visible:ring-1 focus-visible:ring-[var(--brand-primary)] focus-visible:border-[var(--brand-primary)] transition-colors shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
                          value={identifier}
                          onChange={(e) => setIdentifier(e.target.value)}
                          disabled={loading}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <Label htmlFor="otp" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                      Verification Code (OTP)
                    </Label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <Input
                        id="otp"
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        required
                        autoFocus
                        maxLength={6}
                        className="h-11 pl-10 pr-4 text-sm border-zinc-200 bg-white rounded-xl focus-visible:ring-1 focus-visible:ring-[var(--brand-primary)] focus-visible:border-[var(--brand-primary)] transition-colors shadow-sm tracking-widest text-lg dark:border-zinc-700 dark:bg-zinc-900"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>
                )}

                {step === 'OTP' && (
                  <div className="flex items-center justify-between pt-1">
                    <button type="button" onClick={() => setStep('IDENTIFIER')} className="text-[13px] font-medium text-slate-500 hover:text-slate-700 transition-colors">
                      Change {identifierType === 'EMAIL' ? 'Email' : 'Mobile'}
                    </button>
                    <button 
                      type="button" 
                      onClick={handleSendOtp} 
                      disabled={loading}
                      className="text-[13px] font-bold text-[var(--brand-primary)] hover:opacity-80 transition-opacity disabled:opacity-50"
                    >
                      Resend OTP
                    </button>
                  </div>
                )}

                {message && (
                  <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg dark:bg-emerald-950/40 dark:border-emerald-900">
                    <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{message}</p>
                  </div>
                )}

                {error && (
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg dark:bg-rose-950/40 dark:border-rose-900">
                    <p className="text-sm font-medium text-rose-600 dark:text-rose-400">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 text-sm font-bold bg-[var(--brand-primary)] text-white hover:opacity-90 rounded-xl shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    <span className="flex items-center justify-center gap-2 w-full uppercase tracking-wider">
                      {step === 'IDENTIFIER' ? (
                        <>
                          <Send size={16} /> SEND VERIFICATION OTP
                        </>
                      ) : (
                        <>
                          Verify & Sign In <ArrowRight size={16} />
                        </>
                      )}
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
