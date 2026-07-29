import React, { useState, useCallback } from 'react';
import {
  Eye, Edit2, ShieldAlert, Users, CalendarCheck,
  Plane, Wallet, Folder, BarChart, Settings, Info,
  X, Phone, Mail, MoreVertical, Plus, Check, Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

// ─── Types ──────────────────────────────────────────────────────────────────

type AccessLevel = 'read-only' | 'read-limited' | 'full-access';

interface PermissionRow {
  name: string;
  icon: React.ElementType;
  perms: [boolean, boolean, boolean, boolean, boolean]; // view, create, edit, delete, export
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  isPrimary?: boolean;
}

// ─── Data ───────────────────────────────────────────────────────────────────

const ACCESS_LEVELS: { key: AccessLevel; label: string; description: string; icon: React.ElementType; iconColor: string }[] = [
  { key: 'read-only', label: 'Read Only', description: 'View data only, no changes allowed', icon: Eye, iconColor: 'text-emerald-500' },
  { key: 'read-limited', label: 'Read & Limited Access', description: 'View and perform limited actions', icon: Edit2, iconColor: 'text-amber-500' },
  { key: 'full-access', label: 'Full Access', description: 'View and perform all actions', icon: ShieldAlert, iconColor: 'text-rose-500' },
];

const INITIAL_PERMISSIONS: PermissionRow[] = [
  { name: 'Employee Master', icon: Users, perms: [true, false, false, false, true] },
  { name: 'Attendance', icon: CalendarCheck, perms: [true, false, false, false, true] },
  { name: 'Leave Management', icon: Plane, perms: [true, false, true, false, true] },
  { name: 'Payroll', icon: Wallet, perms: [true, false, false, false, true] },
  { name: 'Documents', icon: Folder, perms: [true, false, true, false, true] },
  { name: 'Reports & Analytics', icon: BarChart, perms: [true, false, false, false, true] },
  { name: 'System Settings', icon: Settings, perms: [true, false, false, false, false] },
];

const PERMISSION_COLUMNS = ['View', 'Create', 'Edit', 'Delete', 'Export'];

const SESSION_TIMEOUT_OPTIONS = [
  { label: '15 Minutes', value: '15' },
  { label: '30 Minutes', value: '30' },
  { label: '45 Minutes', value: '45' },
  { label: '60 Minutes', value: '60' },
];

const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  { id: '1', name: 'Rahul Verma', role: 'Sr. Support Engineer', email: 'rahul.verma@crewcam.com', avatar: 'https://i.pravatar.cc/150?u=rahul', isPrimary: true },
  { id: '2', name: 'Amit Kumar', role: 'System Engineer', email: 'amit.kumar@crewcam.com', avatar: 'https://i.pravatar.cc/150?u=amit2' },
  { id: '3', name: 'Neha Singh', role: 'Database Specialist', email: 'neha.singh@crewcam.com', avatar: 'https://i.pravatar.cc/150?u=neha' },
];

// ─── Component ──────────────────────────────────────────────────────────────

export default function AccessDetailsTab() {
  // Access level state
  const [accessLevel, setAccessLevel] = useState<AccessLevel>('read-only');

  // Permissions state
  const [permissions, setPermissions] = useState<PermissionRow[]>(INITIAL_PERMISSIONS);

  // IP restriction state
  const [ipRestrictionEnabled, setIpRestrictionEnabled] = useState(true);
  const [ipTags, setIpTags] = useState<string[]>(['203.110.245.0/24']);
  const [ipInput, setIpInput] = useState('');

  // Time window state
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');

  // Session timeout state
  const [sessionTimeout, setSessionTimeout] = useState('30');

  // Auto revoke state
  const [autoRevoke, setAutoRevoke] = useState(true);

  // Team members state
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(INITIAL_TEAM_MEMBERS);

  // ── Handlers ────────────────────────────────────────────────────────────

  const handlePermissionToggle = useCallback((rowIndex: number, colIndex: number) => {
    setPermissions(prev => prev.map((row, rIdx) => {
      if (rIdx !== rowIndex) return row;
      const newPerms = [...row.perms] as PermissionRow['perms'];
      newPerms[colIndex] = !newPerms[colIndex];
      return { ...row, perms: newPerms };
    }));
  }, []);

  const handleAddIp = useCallback(() => {
    const trimmed = ipInput.trim();
    if (trimmed && !ipTags.includes(trimmed)) {
      setIpTags(prev => [...prev, trimmed]);
      setIpInput('');
    }
  }, [ipInput, ipTags]);

  const handleRemoveIp = useCallback((ip: string) => {
    setIpTags(prev => prev.filter(tag => tag !== ip));
  }, []);

  const handleIpKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIp();
    }
  }, [handleAddIp]);

  const handleRemoveMember = useCallback((memberId: string) => {
    setTeamMembers(prev => prev.filter(m => m.id !== memberId));
  }, []);

  const handleAddMember = useCallback(() => {
    const newId = String(Date.now());
    setTeamMembers(prev => [...prev, {
      id: newId,
      name: 'New Member',
      role: 'Team Member',
      email: 'new.member@crewcam.com',
      avatar: `https://i.pravatar.cc/150?u=${newId}`,
    }]);
  }, []);

  // ── Helper to format 24h value to 12h display ──────────────────────────

  const formatTime12h = (time24: string) => {
    const [h, m] = time24.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const hours12 = h % 12 || 12;
    return `${String(hours12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`;
  };

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-2 mt-2">

      {/* ── Left Column: Access Configuration ────────────────────────── */}
      <Card className="col-span-3 rounded-lg shadow-sm border-zinc-200">
        <CardHeader className="p-3 pb-0 space-y-0">
          <CardTitle className="text-[13px] font-bold text-zinc-900">Access Configuration</CardTitle>
          <CardDescription className="text-[10px] text-zinc-500 mb-4">
            Set access level and permissions for Crewcam technical team
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-4">
          <h3 className="text-[11px] font-bold text-zinc-800 mb-2">Access Level</h3>
          <div className="grid grid-cols-3 gap-2 mb-5">
            {ACCESS_LEVELS.map(({ key, label, description, icon: Icon, iconColor }) => (
              <button
                key={key}
                type="button"
                onClick={() => setAccessLevel(key)}
                className={cn(
                  'rounded-lg p-2.5 flex flex-col gap-1 cursor-pointer text-left transition-colors',
                  accessLevel === key
                    ? 'border-2 border-blue-500 bg-blue-50/30'
                    : 'border border-zinc-200 hover:border-zinc-300'
                )}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon size={14} className={iconColor} />
                  <span className="text-[11px] font-bold text-zinc-900">{label}</span>
                </div>
                <span className="text-[9px] text-zinc-500 leading-tight">{description}</span>
              </button>
            ))}
          </div>

          <h3 className="text-[11px] font-bold text-zinc-800 mb-2">Access Permissions</h3>
          <div className="border border-zinc-200 rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200">
                  <th className="py-2 px-3 text-[10px] font-bold text-zinc-700 w-2/5">Module / Feature</th>
                  {PERMISSION_COLUMNS.map(col => (
                    <th key={col} className="py-2 px-1 text-[9px] font-bold text-zinc-700 text-center">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-[10px] text-zinc-700">
                {permissions.map((row, rowIdx) => (
                  <tr key={row.name} className="border-b border-zinc-100 last:border-0">
                    <td className="py-2.5 px-3 flex items-center gap-2">
                      <row.icon size={12} className="text-blue-600" />
                      <span className="font-medium text-zinc-800">{row.name}</span>
                    </td>
                    {row.perms.map((enabled, colIdx) => (
                      <td key={colIdx} className="py-2.5 text-center">
                        <button
                          type="button"
                          onClick={() => handlePermissionToggle(rowIdx, colIdx)}
                          className="mx-auto block"
                          aria-label={`Toggle ${PERMISSION_COLUMNS[colIdx]} for ${row.name}`}
                        >
                     {enabled ? (
  <div className="w-3.5 h-3.5 bg-blue-600 rounded flex items-center justify-center">
    <Check size={10} className="text-white" strokeWidth={3} />
  </div>
) : (
  <div className="w-3.5 h-3.5 rounded border border-zinc-300 bg-white" />
)}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 bg-blue-50/50 p-2.5 rounded-md border border-blue-100 flex items-start gap-2">
            <Info size={14} className="text-blue-600 shrink-0 mt-0.5" />
            <span className="text-[10px] text-blue-900 font-medium">Note: Permissions can be customized based on the requirement.</span>
          </div>
        </CardContent>
      </Card>

      {/* ── Middle Column: Access Constraints ────────────────────────── */}
      <Card className="col-span-2 rounded-lg shadow-sm border-zinc-200">
        <CardHeader className="p-3 pb-0 space-y-0">
          <CardTitle className="text-[13px] font-bold text-zinc-900">Access Constraints</CardTitle>
          <CardDescription className="text-[10px] text-zinc-500 mb-5">
            Define boundaries and restrictions for this access
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-5">
          <div className="space-y-5">
            {/* IP Restriction */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-[11px] font-bold text-zinc-800">IP Restriction</Label>
                <button
                  type="button"
                  onClick={() => setIpRestrictionEnabled(prev => !prev)}
                  className={cn(
                    'w-7 h-4 rounded-full relative cursor-pointer transition-colors',
                    ipRestrictionEnabled ? 'bg-blue-600' : 'bg-zinc-300'
                  )}
                  aria-label="Toggle IP restriction"
                >
                  <div className={cn(
                    'absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all',
                    ipRestrictionEnabled ? 'right-0.5' : 'left-0.5'
                  )} />
                </button>
              </div>
              {ipRestrictionEnabled && (
                <>
                  <div className="flex items-center flex-wrap gap-2 p-1 border border-zinc-200 rounded-md bg-white mb-1">
                    {ipTags.map(ip => (
                      <div key={ip} className="flex items-center gap-1 bg-zinc-100 px-2 py-1 rounded text-[10px] font-medium text-zinc-800">
                        {ip}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-auto w-auto p-0 text-zinc-400 hover:text-zinc-600 hover:bg-transparent"
                          onClick={() => handleRemoveIp(ip)}
                          aria-label={`Remove IP ${ip}`}
                        >
                          <X size={10} />
                        </Button>
                      </div>
                    ))}
                    <Input
                      type="text"
                      placeholder="Add IP address or range"
                      value={ipInput}
                      onChange={(e) => setIpInput(e.target.value)}
                      onKeyDown={handleIpKeyDown}
                      onBlur={handleAddIp}
                      className="flex-1 min-w-[150px] h-auto text-[11px] px-2 py-0 border-0 shadow-none focus-visible:ring-0"
                    />
                  </div>
                  <p className="text-[9px] text-zinc-500">Leave empty to allow all IPs</p>
                </>
              )}
            </div>

            {/* Access Time Window */}
            <div>
              <Label className="text-[11px] font-bold text-zinc-800 mb-2">Access Time Window</Label>
              <div className="flex items-center gap-2 mb-1 mt-2">
                <div className="flex-1 relative">
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full h-auto border-zinc-200 rounded-md px-3 py-1.5 text-[11px] font-medium text-zinc-800 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    style={{ colorScheme: 'light' }}
                  />
                  <Clock size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                </div>
                <span className="text-[10px] text-zinc-400 font-medium">to</span>
                <div className="flex-1 relative">
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full h-auto border-zinc-200 rounded-md px-3 py-1.5 text-[11px] font-medium text-zinc-800 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    style={{ colorScheme: 'light' }}
                  />
                  <Clock size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                </div>
              </div>
              <p className="text-[9px] text-zinc-500">Access allowed only during this time window</p>
            </div>

            {/* Session Timeout */}
            <div>
              <Label htmlFor="session-timeout" className="text-[11px] font-bold text-zinc-800 mb-2">Session Timeout</Label>
              <select
                id="session-timeout"
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="w-full border border-zinc-200 rounded-md px-3 py-1.5 text-[11px] font-medium text-zinc-800 outline-none mb-1 appearance-none bg-white mt-2"
              >
                {SESSION_TIMEOUT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <p className="text-[9px] text-zinc-500">User will be logged out after inactivity</p>
            </div>

            {/* Access Revocation */}
            <div>
              <Label className="text-[11px] font-bold text-zinc-800 mb-2">Access Revocation</Label>
              <label className="flex items-start gap-2 cursor-pointer mb-3 mt-2">
                <button
                  type="button"
                  onClick={() => setAutoRevoke(prev => !prev)}
                  className={cn(
                    'w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-colors',
                    autoRevoke ? 'bg-blue-600' : 'bg-zinc-300'
                  )}
                  aria-label="Toggle auto revoke"
                >
                  {autoRevoke && <Check size={10} className="text-white" strokeWidth={3} />}
                </button>
                <span className="text-[11px] font-bold text-zinc-800">Automatically revoke access after duration ends</span>
              </label>

              {autoRevoke && (
                <div className="bg-blue-50/50 p-3 rounded-md border border-blue-100 flex items-start gap-2">
                  <Info size={14} className="text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-blue-900 font-medium leading-relaxed">
                    Access will be automatically revoked on <br />
                    <span className="font-bold text-blue-700">02 Jun 2025, 06:00 PM</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Right Column: Technical Team Access ──────────────────────── */}
      <Card className="col-span-2 rounded-lg shadow-sm border-zinc-200">
        <CardHeader className="p-3 pb-0 space-y-0">
          <CardTitle className="text-[13px] font-bold text-zinc-900">Technical Team Access</CardTitle>
          <CardDescription className="text-[10px] text-zinc-500 mb-4">
            Crewcam team members who will have access
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-4">
          <div className="flex flex-col gap-2 mb-4">
            {teamMembers.map(member => (
              <div key={member.id} className="border border-zinc-200 rounded-md p-3 flex flex-col gap-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full border border-zinc-200" />
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-zinc-900">{member.name}</span>
                      <span className="text-[9px] text-zinc-500">{member.role}</span>
                    </div>
                  </div>
                  {member.isPrimary ? (
                    <span className="text-[9px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded">Primary</span>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-auto w-auto p-0 text-zinc-400 hover:text-zinc-600 hover:bg-transparent"
                      onClick={() => handleRemoveMember(member.id)}
                      aria-label={`More options for ${member.name}`}
                    >
                      <MoreVertical size={14} />
                    </Button>
                  )}
                </div>
                <div className="flex items-center justify-between text-[9px] text-zinc-500 pl-[42px]">
                  <span>{member.email}</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-auto w-auto p-0 text-blue-600 hover:text-blue-800 hover:bg-transparent"
                      aria-label={`Call ${member.name}`}
                    >
                      <Phone size={12} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-auto w-auto p-0 text-blue-600 hover:text-blue-800 hover:bg-transparent"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail size={12} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              onClick={handleAddMember}
              className="w-full flex items-center justify-center gap-1.5 border-dashed border-zinc-300 text-blue-600 text-[11px] font-bold py-2 rounded-md hover:bg-blue-50 transition-colors mt-2"
            >
              <Plus size={14} /> Add Team Member
            </Button>
          </div>

          <div className="bg-amber-50/50 border border-amber-100 rounded-md p-3 flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <ShieldAlert size={14} className="text-amber-600" />
              <h4 className="text-[11px] font-bold text-amber-900">Important</h4>
            </div>
            <ul className="text-[10px] text-amber-800 space-y-1.5 pl-5 list-disc">
              <li>Access is strictly for the purpose mentioned in the request.</li>
              <li>Do not share or transfer access credentials.</li>
              <li>All activities will be logged and monitored.</li>
              <li>Violation may lead to immediate access revocation.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
