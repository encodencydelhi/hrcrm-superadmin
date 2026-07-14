"use client";

import React from "react";
import {
    ChevronRight,
    ChevronDown,
    Settings,
    Download,
    Plus,
    Users,
    CheckCircle2,
    CalendarDays,
    UserPlus,
    Wallet,
    Headphones,
    ArrowUp,
    ArrowDown,
    Search,
    Laptop,
    FileText,
    LayoutGrid,
    ArrowRight,
    FileCheck,
    Star,
    HelpCircle,
    ClipboardCheck,
    UserCircle2,
    Calendar,
} from "lucide-react";
import needHelp from "@/assets/need_help.webp"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import Image from "next/image";

const headcountData = [
    { month: "Jun '24", value: 60 },
    { month: "Jul '24", value: 110 },
    { month: "Aug '24", value: 150 },
    { month: "Sep '24", value: 210 },
    { month: "Oct '24", value: 195 },
    { month: "Nov '24", value: 250 },
    { month: "Dec '24", value: 260 },
    { month: "Jan '25", value: 270 },
    { month: "Feb '25", value: 285 },
    { month: "Mar '25", value: 300 },
    { month: "Apr '25", value: 310 },
    { month: "May '25", value: 348 },
];

const deptData = [
    { name: "Engineering", value: 132, pct: "37.9%", color: "#2563eb" },
    { name: "Sales & Marketing", value: 76, pct: "21.8%", color: "#16a34a" },
    { name: "Operations", value: 52, pct: "14.9%", color: "#f59e0b" },
    { name: "Finance", value: 32, pct: "9.2%", color: "#7c3aed" },
    { name: "HR", value: 24, pct: "6.9%", color: "#06b6d4" },
    { name: "Support", value: 20, pct: "5.7%", color: "#ec4899" },
    { name: "Others", value: 12, pct: "3.4%", color: "#60a5fa" },
];

const TABS = [
    { label: "Overview", icon: LayoutGrid, active: true },
    { label: "Employees", icon: Users },
    { label: "Attendance", icon: CalendarDays },
    { label: "Leave", icon: FileCheck },
    { label: "Payroll", icon: Wallet },
    { label: "Performance", icon: Star },
    { label: "Recruitment", icon: Search },
    { label: "Assets", icon: Laptop },
    { label: "Documents", icon: FileText },
    { label: "Helpdesk", icon: Headphones },
];

const STATS = [
    {
        icon: Users,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
        label: "Total Employees",
        value: "348",
        delta: "18 this month",
        deltaColor: "text-green-600",
        up: true,
    },
    {
        icon: CheckCircle2,
        iconBg: "bg-green-50",
        iconColor: "text-green-600",
        label: "Present Today",
        value: "278",
        delta: "79.89%",
        deltaColor: "",
    },
    {
        icon: CalendarDays,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        label: "On Leave",
        value: "32",
        delta: "9.20%",
        deltaColor: "text-orange-500",
    },
    {
        icon: UserPlus,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
        label: "New Joiners (This Month)",
        value: "15",
        delta: "25% from last month",
        deltaColor: "text-green-600",
        up: true,
    },
    {
        icon: Wallet,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600",
        label: "Monthly Payroll",
        value: "₹ 28.75 Lakh",
        delta: "May 2025",
        deltaColor: "",
    },
    {
        icon: Headphones,
        iconBg: "bg-red-50",
        iconColor: "text-red-500",
        label: "Open Tickets",
        value: "8",
        delta: "3 from last week",
        deltaColor: "text-red-500",
        down: true,
    },
];

const ACTIVITIES = [
    {
        icon: UserPlus,
        bg: "bg-green-50",
        color: "text-green-600",
        title: "New employee Rahul Sharma joined",
        sub: "Software Developer",
        time: "2 hours ago",
    },
    {
        icon: ClipboardCheck,
        bg: "bg-blue-50",
        color: "text-blue-600",
        title: "Leave request approved",
        sub: "Anjali Verma - 23 May to 24 May",
        time: "3 hours ago",
    },
    {
        icon: Wallet,
        bg: "bg-amber-50",
        color: "text-amber-600",
        title: "Payroll May 2025 processed",
        sub: "Total Amount: ₹ 28.75 Lakh",
        time: "5 hours ago",
    },
    {
        icon: FileText,
        bg: "bg-purple-50",
        color: "text-purple-600",
        title: "Document uploaded",
        sub: "Policy Handbook - v2.1",
        time: "Yesterday",
    },
    {
        icon: Star,
        bg: "bg-pink-50",
        color: "text-pink-500",
        title: "Performance review completed",
        sub: "Neha Patel - Senior Executive",
        time: "Yesterday",
    },
];

const ATTENDANCE = [
    { label: "Working Days", value: "22", color: "bg-green-500" },
    { label: "Present Days", value: "17.58", color: "bg-blue-500" },
    { label: "Absent Days", value: "3.42", color: "bg-red-500" },
    { label: "Leave Days", value: "1.00", color: "bg-amber-400" },
];
const attendanceDonutData: DonutSegment[] = [
  { label: "Present Days", value: 17.58, color: "#3B82F6" },
  { label: "Absent Days", value: 3.42, color: "#EF4444" },
  { label: "Leave Days", value: 1.0, color: "#FBBF24" },
];

const LEAVE = [
    { label: "Casual Leave", value: "12 (37.5%)", color: "bg-green-500" },
    { label: "Sick Leave", value: "8 (25.0%)", color: "bg-red-500" },
    { label: "Privilege Leave", value: "7 (21.9%)", color: "bg-blue-500" },
    { label: "Other Leave", value: "5 (15.6%)", color: "bg-amber-400" },
];

const PAYROLL = [
    { label: "Net Salary", value: "₹ 21.45 Lakh", color: "bg-green-500" },
    { label: "Deductions", value: "₹ 5.80 Lakh", color: "bg-red-500" },
    { label: "Reimbursements", value: "₹ 1.50 Lakh", color: "bg-amber-400" },
];

const QUICK_ACTIONS = [
    { label: "Add Employee", icon: UserPlus, color: "text-blue-600" },
    { label: "Mark Attendance", icon: CheckCircle2, color: "text-green-600" },
    { label: "Approve Leave", icon: FileCheck, color: "text-purple-600" },
    { label: "Run Payroll", icon: Wallet, color: "text-amber-600" },
    { label: "Upload Document", icon: FileText, color: "" },
    { label: "Create Ticket", icon: Headphones, color: "text-red-500" },
];

const MODULES = [
    { label: "Employee Mgmt.", icon: Users, usage: "95% Usage" },
    { label: "Attendance", icon: CalendarDays, usage: "88% Usage" },
    { label: "Leave Mgmt.", icon: FileCheck, usage: "82% Usage" },
    { label: "Payroll", icon: Wallet, usage: "100% Usage" },
    { label: "Performance", icon: Star, usage: "78% Usage" },
    { label: "Recruitment", icon: Search, usage: "65% Usage" },
    { label: "Assets", icon: Laptop, usage: "72% Usage" },
    { label: "Documents", icon: FileText, usage: "90% Usage" },
    { label: "Helpdesk", icon: Headphones, usage: "80% Usage" },
    { label: "Flapdesk", icon: LayoutGrid, usage: "80% Usage" },
];

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className = "",
}) => (
    <div className={`bg-white border border-gray-200 rounded-lg p-2 ${className}`}>
        {children}
    </div>
);

const Breadcrumb = () => (
    <div className="flex items-center gap-2 text-[10px]  px-2 py-2">
        <span className="text-blue-600 hover:text-blue-600 cursor-pointer">Home</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-blue-600 hover:text-blue-600 cursor-pointer">Companies</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-blue-600 hover:text-blue-600 font-medium hover:underline cursor-pointer">
            TechVision Pvt. Ltd.
        </span>
        <ChevronRight className="w-3 h-3" />
        <span className=" font-medium">Dashboard</span>
    </div>
);

const PageHeader = () => (
    <div className="flex items-start justify-between px-2 py-2 flex-wrap gap-2">
        <div>
            <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold ">TechVision Pvt. Ltd.</h1>
                <span className="text-[10px] bg-green-100 text-green-700 rounded-full px-2 py-0.5 font-medium">
                    Active
                </span>
            </div>
            <p className="text-[10px]  mt-1">
                Company Dashboard - Overview of your organization
            </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
            <button className="flex items-center gap-2 text-[10px] font-medium border border-gray-300 rounded-md px-3 py-2  hover:bg-gray-50">
                <Settings className="w-3.5 h-3.5" />
                Company Settings
            </button>
            <button className="flex items-center gap-2 text-[10px] font-medium border border-gray-300 rounded-md px-3 py-2  hover:bg-gray-50">
                <Download className="w-3.5 h-3.5" />
                Generate Report
            </button>
            <button className="flex items-center gap-2 text-[10px] font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md px-3 py-2">
                <Plus className="w-3.5 h-3.5" />
                Add Module
                <ChevronDown className="w-3.5 h-3.5" />
            </button>
        </div>
    </div>
);

const Tabs = () => (
    <Card className="flex items-center justify-between gap-2 border-b border-gray-200 px-2 overflow-x-auto overflow-y-hidden">
        {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
                <button
                    key={tab.label}
                    className={`flex items-center gap-2 text-[10px] whitespace-nowrap px-2 py-2 border-b-2 -mb-px font-medium ${tab.active
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent hover:"
                        }`}
                >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                </button>
            );
        })}
        <button className="flex items-center gap-2 text-[10px] whitespace-nowrap px-2 py-2 border-b-2 border-transparent  hover: font-medium">
            <LayoutGrid className="w-3.5 h-3.5" />
            More
            <ChevronDown className="w-3.5 h-3.5" />
        </button>
    </Card>
);

const StatsGrid = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 px-0 py-2">
        {STATS.map((s) => {
            const Icon = s.icon;
            return (
                <Card key={s.label} className="flex items-start gap-2">
                    <div className={`${s.iconBg} rounded-full mt-2 p-2 shrink-0`}>
                        <Icon className={`w-4 h-4 ${s.iconColor}`} />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                        <p className="text-[10px] ">{s.label}</p>
                        <p className="text-lg font-semibold ">{s.value}</p>
                        <div className="flex items-center gap-2">
                            {s.up && <ArrowUp className="w-3 h-3 text-green-600" />}
                            {s.down && <ArrowDown className="w-3 h-3 text-red-500" />}
                            <span className={`text-[10px] ${s.deltaColor}`}>{s.delta}</span>
                        </div>
                    </div>
                </Card>
            );
        })}
    </div>
);

const HeadcountTrend = () => (
    <Card className="flex flex-col gap-2 h-full">
        <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold ">Employee Headcount Trend</h3>
            <button className="flex items-center gap-2 text-[10px] border border-gray-300 rounded-md px-2 py-2 ">
                Last 12 Months
                <ChevronDown className="w-3 h-3" />
            </button>
        </div>
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={headcountData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis
                        dataKey="month"
                        tick={{ fontSize: 10, fill: "#000" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 10, fill: "#000" }}
                        axisLine={false}
                        tickLine={false}
                        domain={[0, 400]}
                        ticks={[0, 100, 200, 300, 400]}
                    />
                    <Tooltip contentStyle={{ fontSize: 11 }} />
                    <Line
                        type="linear"
                        dataKey="value"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={{ r: 3, fill: "#2563eb", strokeWidth: 0 }}
                        activeDot={{ r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </Card>
);

const DepartmentDistribution = () => (
    <Card className="flex flex-col gap-2 h-full">
        <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold ">Department Wise Distribution</h3>
            <button className="text-[10px] text-blue-600 font-medium">View All</button>
        </div>
        <div className="flex items-center gap-2 py-2">
            <div className="relative w-[130px] h-[130px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={deptData}
                            dataKey="value"
                            innerRadius={42}
                            outerRadius={64}
                            paddingAngle={1}
                            stroke="none"
                        >
                            {deptData.map((d) => (
                                <Cell key={d.name} fill={d.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-lg font-bold ">348</p>
                    <p className="text-[10px] ">Total</p>
                </div>
            </div>
            <div className="flex flex-col gap-2 flex-1 min-w-0">
                {deptData.map((d) => (
                    <div key={d.name} className="flex items-center justify-between text-[10px]">
                        <span className="flex items-center gap-2 ">
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                            {d.name}
                        </span>
                        <span className=" font-medium">
                            {d.value} ({d.pct})
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </Card>
);

const RecentActivity = () => (
    <Card className="flex flex-col gap-2 h-full">
        <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold ">Recent Activity</h3>
            <button className="text-[10px] text-blue-600 font-medium">View All</button>
        </div>
        <div className="flex flex-col gap-2">
            {ACTIVITIES.map((a) => {
                const Icon = a.icon;
                return (
                    <div key={a.title} className="flex items-start gap-2">
                        <div className={`${a.bg} rounded-md p-2 shrink-0`}>
                            <Icon className={`w-3.5 h-3.5 ${a.color}`} />
                        </div>
                        <div>
                            <p className="text-[10px] font-semibold">{a.title}</p>
                            <p className="text-[10px] ">{a.sub}</p>
                            <p className="text-[10px]  mt-1">{a.time}</p>
                        </div>
                    </div>
                );
            })}
        </div>
        <button className="flex items-center gap-2 text-[10px] text-blue-600 font-medium mt-2">
            View All Activities
            <ArrowRight className="w-3 h-3" />
        </button>
    </Card>
);


interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

interface DonutMiniProps {
  total: number;
  data: DonutSegment[];
}

const DonutMini: React.FC<DonutMiniProps> = ({ total, data }) => {
  return (
    <div className="relative w-[90px] h-[90px] shrink-0">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            innerRadius={36}
            outerRadius={42}
            startAngle={90}
            endAngle={-270}
            stroke="none"
            paddingAngle={1}
            isAnimationActive={false}
          >
            {data.map((segment) => (
              <Cell key={segment.label} fill={segment.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-bold text-gray-900 leading-none">
          {total}
        </span>
        <span className="text-[9px] leading-none mt-0.5">
          Average Attendence
        </span>
      </div>
    </div>
  );
};


interface SummaryCardRow {
  label: string;
  value: string;
  color: string;
}

interface SummaryCardProps {
  title: string;
  filter: string;
  totalLabel?: string;
  totalValue?: React.ReactNode;
  totalSub?: string;
  rows: SummaryCardRow[];
  linkLabel: string;
  donutTotal?: number;
  donutData?: DonutSegment[];
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  filter,
  totalLabel,
  totalValue,
  totalSub,
  rows,
  linkLabel,
  donutTotal,
  donutData,
}) => (
  <Card className="flex flex-col gap-3 h-full p-4">
    {/* Header */}
    <div className="flex items-center justify-between">
      <h3 className="text-xs font-semibold">{title}</h3>

      <button className="flex items-center gap-2 text-[10px] border border-gray-300 rounded-md px-2 py-1.5">
        {filter}
        <ChevronDown className="w-3 h-3" />
      </button>
    </div>

    {/* Body */}
    <div className="flex items-start gap-4">
      {/* Left Section */}
      <div className="w-[90px] shrink-0 flex flex-col items-center text-center">
        {donutTotal !== undefined && donutData && donutData.length > 0 && (
          <DonutMini total={donutTotal} data={donutData} />
        )}

        {totalValue && (
          <div className="mt-2">
            <p className="text-base font-bold leading-none">{totalValue}</p>

            {totalSub && (
              <p className="text-[9px] text-gray-500 mt-1 leading-tight">
                {totalSub}
              </p>
            )}

            {totalLabel && (
              <p className="text-[9px] text-gray-500 mt-1 leading-tight">
                {totalLabel}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col gap-2">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-between text-[10px]"
          >
            <span className="flex items-center gap-2 text-gray-600">
              <span className={`w-2 h-2 rounded-full ${r.color}`} />
              {r.label}
            </span>

            <span className="font-semibold text-gray-900">{r.value}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Footer */}
    <button className="mt-auto flex items-center gap-2 text-[10px] font-medium text-blue-600">
      {linkLabel}
      <ArrowRight className="w-3 h-3" />
    </button>
  </Card>
);
const ModuleUsageStatus: React.FC<{ noMargin?: boolean }> = ({ noMargin }) => (
    <Card className={`flex flex-col gap-1 ${noMargin ? "" : "mx-2"}`}>
        <h3 className="text-xs font-semibold ">Module Usage Status</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-1">
            {MODULES.map((m) => {
                const Icon = m.icon;
                return (
                    <div key={m.label} className="flex flex-col items-center gap-2 text-center p-2">
                        <div className="bg-purple-50 rounded-md p-2">
                            <Icon className="w-4 h-4 text-purple-600" />
                        </div>
                        <p className="text-[8px] font-semibold">{m.label}</p>
                        <span className="text-[10px] bg-green-100 text-green-700 rounded-full px-2 py-0.5 font-medium">
                            Active
                        </span>
                        <p className="text-[8px] font-medium ">{m.usage}</p>
                    </div>
                );
            })}
        </div>
    </Card>
);

const QuickActions = () => (
    <Card className="flex flex-col gap-2">
        <h3 className="text-[10px] font-semibold ">Quick Actions</h3>
        <div className="grid grid-cols-3 gap-2">
            {QUICK_ACTIONS.map((a) => {
                const Icon = a.icon;
                return (
                    <button
                        key={a.label}
                        className="flex flex-row items-center justify-center gap-2 border border-gray-200 rounded-md p-2 hover:bg-gray-50"
                    >
                        <Icon className={`w-3.5 h-3.5 ${a.color}`} />
                        <span className="text-[8px] font-semibold  text-center leading-tight">{a.label}</span>
                    </button>
                );
            })}
        </div>
    </Card>
);

const NeedHelp = () => (
    <div className="bg-blue-200 flex flex-col gap-2 rounded-lg p-2">
        <div className="flex gap-2">
          <Image src={needHelp} width={70} height={70} alt="need help" />

        <div>
        <h3 className="text-[10px] font-semibold text-blue-600">Need Help?</h3>
        <p className="text-[10px] text-blue-900">
            Our implementation team is here to help you set up everything perfectly.
        </p>
        <button className="flex items-center gap-2 bg-white text-blue-600 text-[10px] font-medium rounded-md px-2 py-2 w-fit mt-1">
            <Calendar className="w-3.5 h-3.5" />
            Schedule Setup Call
            <ArrowRight className="w-3 h-3" />
        </button>

        </div>
        </div>
    </div>
);



const CompanyDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-2">
            <Breadcrumb />
            <PageHeader />
            <Tabs />
            <StatsGrid />

            {/* Left content area is 3/4 of the row width, right sidebar is 1/4 — matches the 955px:315px split in the design */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 px-0 py-2">
                <div className="lg:col-span-3 flex flex-col gap-2">
                    {/* Headcount Trend is ~60% width, Department Distribution ~40% */}
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                        <div className="sm:col-span-3">
                            <HeadcountTrend />
                        </div>
                        <div className="sm:col-span-2">
                            <DepartmentDistribution />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <SummaryCard
  title="Attendance Overview"
  filter="This Month"
  totalSub="Average Attendance"
  rows={ATTENDANCE}
  linkLabel=""
  donutTotal={79.89}
  donutData={attendanceDonutData}
/>
                        <SummaryCard
                            title="Leave Overview"
                            filter="This Month"
                            totalValue="32"
                            totalSub="Total Leaves"
                            rows={LEAVE}
                            linkLabel="View Leave Calendar"
                        />
                        <SummaryCard
                            title="Payroll Overview"
                            filter="May 2025"
                            totalValue={<div>₹ 28.75 <span className="text-[10px]">Lakh</span></div>}
                            totalSub="Total Payroll"
                            rows={PAYROLL}
                            linkLabel="View Payroll Report"
                        />
                    </div>

                    <ModuleUsageStatus noMargin />
                </div>

                <div className="lg:col-span-1 flex flex-col gap-2">
                    <RecentActivity />
                    <QuickActions />
                    <NeedHelp />
                </div>
            </div>
        </div>
    );
};

export default CompanyDashboard;