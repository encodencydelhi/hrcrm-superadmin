"use client";

import React from "react";
import {
  ChevronRight,
  ArrowLeft,
  FileText,
  Building2,
  Calendar,
  AlertTriangle,
  XCircle,
  PenSquare,
  Shield,
  Layers,
  Database,
  ChevronDown,
   Info, Clock, 
  Download,
  User,
  ArrowRight,
} from "lucide-react";

const S = "gap-2 p-2"; // constant spacing unit used across the layout
const GAP = "gap-2";
const PAD = "p-2";
const Breadcrumb = () => (
  <div className="flex items-center gap-2 text-[10px]  px-2 py-2">
    <span className="hover:text-blue-600 text-blue-600 cursor-pointer font-semibold">Home</span>
    <ChevronRight className="w-3 h-3 hover:text-blue-600 text-blue-600" />
    <span className="hover:text-blue-600 text-blue-600 cursor-pointer font-semibold">
      Technical Access Management
    </span>
    <ChevronRight className="w-3 h-3 hover:text-blue-600 text-blue-600" />
    <span className="hover:text-blue-600 text-blue-600 hover:underline cursor-pointer font-semibold">
      Request Details
    </span>
    <ChevronRight className="w-3 h-3 hover:text-blue-600 text-blue-600" />
    <span className="hover:text-blue-600 text-blue-600 hover:underline cursor-pointer font-semibold">
      Access Details
    </span>
    <ChevronRight className="w-3 h-3 hover:text-blue-600 text-blue-600" />
    <span className=" font-semibold">Revoke / Modify Access</span>
  </div>
);

const PageHeader = () => (
  <div className="flex items-start justify-between px-2 py-2">
    <div>
      <h1 className="text-xl font-bold ">Revoke / Modify Access</h1>
      <p className="text-[10px]  mt-1">
        Revoke all access or modify the scope and permissions of the granted access.
      </p>
    </div>
    <button className="flex items-center gap-2 text-[10px] font-medium border border-gray-300 rounded-md px-3 py-2  hover:bg-gray-50 whitespace-nowrap">
      <ArrowLeft className="w-3.5 h-3.5" />
      Back to Active Access
    </button>
  </div>
);

const InfoBar = () => (
     <div className={`grid grid-cols-1 ${GAP} rounded-lg border border-gray-200 bg-white ${PAD} sm:grid-cols-2 lg:grid-cols-5`}>
          {/* Request ID */}
          <div className={`flex items-start ${GAP} border-gray-200 pr-2 sm:border-r lg:border-r`}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold">Request ID</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold ">TAR-2025-028</span>
                <span className="rounded-lg bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-600">
                  Active
                </span>
              </div>
              <span className="text-[10px] ">Requested on 30 May 2025, 11:20 AM</span>
            </div>
          </div>
 
          {/* Company */}
          <div className={`flex flex-col ${GAP} border-gray-200 pr-2 sm:border-r-0 lg:border-r`}>
            <span className="text-[10px] font-semibold">Company</span>
            <div className={`flex items-start ${GAP}`}>
              <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-sm bg-blue-600 text-[10px] font-bold text-white">
                T
              </div>
              <span className="text-sm font-semibold ">TechVision Pvt. Ltd.</span>
            </div>
          </div>
 
          {/* Purpose */}
          <div className="flex flex-col border-gray-200 pr-2 sm:border-r lg:border-r">
            <span className="text-[10px] font-semibold">Purpose</span>
            <span className="text-sm font-semibold ">System Maintenance</span>
            <span className="text-[10px] ">Server optimization</span>
          </div>
 
          {/* Access Type */}
          <div className="flex flex-col gap-1 border-gray-200 pr-2 sm:border-r-0 lg:border-r">
            <span className="text-[10px] font-semibold">Access Type</span>
            <span className="inline-flex w-fit items-center gap-1 rounded-lg bg-purple-50 px-2 py-1 text-[10px] font-medium text-purple-600">
              Time-Bound Access
            </span>
          </div>
 
          {/* Access Duration */}
          <div className={`flex items-start ${GAP} rounded-lg ${PAD}`}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100">
              <Calendar className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex flex-col text-[10px]">
              <span className="font-semibold">Access Duration</span>
              <span className=" font-semibold text-gray-900">30 May 2025, 02:35 PM</span>
              <span className=" text-gray-500">to</span>
              <span className=" font-semibold text-gray-900">
                02 Jun 2025, 06:00 PM <span className="font-normal text-gray-500">(3 Days)</span>
              </span>
            </div>
          </div>
        </div>
);

const TABS = [
  "Access Overview",
  "Access Granted",
  "Credentials & Instructions",
  "Data Access Scope",
  "Terms & Conditions",
  "Activity Log",
  "Active Access",
  "Revoke / Modify Access",
];

const Tabs = () => (
  <div className="flex items-center gap-2 border-b border-gray-200 px-2 mt-2 bg-white rounded-md">
    {TABS.map((tab) => {
      const active = tab === "Revoke / Modify Access";
      return (
        <button
          key={tab}
          className={`text-[10px] whitespace-nowrap px-2 py-2 border-b-2 -mb-px font-semibold ${
            active
              ? "border-blue-600 text-blue-600"
              : "border-transparent  hover:"
          }`}
        >
          {tab}
        </button>
      );
    })}
  </div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div className={`bg-white border border-gray-200 rounded-lg p-2 ${className}`}>
    {children}
  </div>
);

const RevokeAccessSection = () => (
  <Card className="flex flex-col gap-2 h-full">
    <div>
      <h2 className="text-sm font-semibold ">1. Revoke Access</h2>
      <p className="text-[10px]  mt-1">
        Immediately revoke all access and terminate all active sessions.
      </p>
    </div>

    <div className="flex gap-2 bg-red-50 border border-red-200 rounded-md p-2">
      <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
      <p className="text-[10px] text-red-700">
        <span className="font-semibold text-[10px]">Important:</span> Revoking access will
        immediately terminate the access for all users and they will no
        longer be able to access the system.
      </p>
    </div>

    <div className="grid grid-cols-3 gap-2 border border-gray-200 rounded-md p-2">
      <div>
        <p className="text-[10px] ">Current Status</p>
        <span className="inline-block text-[10px] bg-green-100 text-green-700 rounded-full px-2 py-0.5 font-medium mt-1">
          Active
        </span>
      </div>
      <div>
        <p className="text-[10px] ">Active Sessions</p>
        <p className="text-sm font-semibold  mt-1">2</p>
      </div>
      <div>
        <p className="text-[10px] ">Users with Access</p>
        <p className="text-sm font-semibold  mt-1">2</p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-2">
      <div>
        <label className="text-[10px] font-medium ">
          Reason for Revocation <span className="text-red-500">*</span>
        </label>
        <div className="relative mt-2">
          <select className="w-full appearance-none text-[10px] border border-gray-300 rounded-md px-2 py-2 ">
            <option>Select a reason</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
      <div>
        <label className="text-[10px] font-medium ">
          Additional Notes (Optional)
        </label>
        <textarea
          placeholder="Enter additional notes..."
          className="w-full mt-2 text-[10px] border border-gray-300 rounded-md px-2 py-2  h-[74px] resize-none placeholder:text-gray-400"
        />
      </div>
    </div>

    <button className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-[10px] font-medium rounded-md py-2">
      <XCircle className="w-3.5 h-3.5" />
      Revoke Access Immediately
    </button>
    <p className="text-[10px] text-red-500 text-center font-semibold">This action cannot be undone.</p>
  </Card>
);

const ModifyOption: React.FC<{
  title: string;
  desc: string;
  active?: boolean;
}> = ({  title, desc, active }) => (
  <div
    className={`flex flex-col gap-2 p-2 rounded-md border cursor-pointer ${
      active ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200"
    }`}
  >
    <div className="flex gap-2">
      <div
        className={`min-w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
          active ? "border-blue-600" : "border-gray-300"
        }`}
      >
        {active && <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
      </div>
       <div>
      <p className="text-[9px] font-semibold">{title}</p>
      <p className="text-[9px] mt-1">{desc}</p>
    </div>
    </div>
  </div>
);

const ModifyAccessSection = () => (
  <Card className="flex flex-col gap-2">
    <div>
      <h2 className="text-sm font-semibold ">2. Modify Access Scope</h2>
      <p className="text-[10px]  mt-1">
        Update access level, modules, or duration without revoking completely.
      </p>
    </div>

    <div>
      <p className="text-[10px] font-medium  mb-2">Modify What?</p>
      <div className="grid grid-cols-3 gap-2">
        <ModifyOption
          title="Access Duration"
          desc="Extend or reduce the access period"
          active
        />
        <ModifyOption
          title="Modules / Data Scope"
          desc="Add or removes data"
        />
        <ModifyOption
          title="Access Level"
          desc="Change permission level"
        />
      </div>
    </div>

    <div>
      <p className="text-[10px] font-medium  mb-2">Current Duration</p>
      <div className="bg-blue-50 border border-blue-100 rounded-md px-2 py-2 text-[10px] ">
        30 May 2025, 02:35 PM <span className="text-gray-400">to</span> 02 Jun 2025, 06:00 PM{" "}
        <span className="">(3 Days)</span>
      </div>
    </div>

    <div>
      <p className="text-[10px] font-medium  mb-2">
        New Duration <span className="text-red-500">*</span>
      </p>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[10px] ">Start Date & Time</label>
          <div className="relative mt-2">
            <input
              readOnly
              value="30 May 2025, 02:35 PM"
              className="w-full text-[10px] border border-gray-300 rounded-md pl-2 pr-7 py-2 "
            />
            <Calendar className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div>
          <label className="text-[10px] ">End Date & Time</label>
          <div className="relative mt-2">
            <input
              readOnly
              value="05 Jun 2025, 06:00 PM"
              className="w-full text-[10px] border border-gray-300 rounded-md pl-2 pr-7 py-2 "
            />
            <Calendar className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
      <p className="text-[10px] bg-blue-200 rounded-md text-blue-600 text-center mt-2 w-fit p-1 px-2 mx-auto">Total Duration: 6 Days</p>
    </div>

    <div className="grid grid-cols-2 gap-2">
        <div>
           
      <div>
        <label className="text-[10px] font-medium ">
          Reason for Modification <span className="text-red-500">*</span>
        </label>
        <div className="relative mt-2">
          <select className="w-full appearance-none text-[10px] border border-gray-300 rounded-md px-2 py-2 ">
            <option>Select a reason</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

      </div>
           <button className="flex items-center justify-center gap-2 mt-2 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-medium rounded-md py-2 px-4 w-fit">
      <PenSquare className="w-3.5 h-3.5" />
      Update Access
    </button>
        </div>
      <div>
        <label className="text-[10px] font-medium ">
          Additional Notes (Optional)
        </label>
        <textarea
          placeholder="Enter additional notes..."
          className="w-full mt-2 text-[10px] border border-gray-300 rounded-md px-2 py-2  h-[74px] resize-none placeholder:text-gray-400"
        />
      </div>
    </div>


  </Card>
);

const ImpactPreview = () => (
  <Card className="flex flex-col gap-2">
    <div>
      <h3 className="text-[10px] font-semibold">Impact Preview</h3>
      <p className="text-[10px] mt-1">Review the impact of your action.</p>
    </div>
    <div className="flex flex-col gap-2">
      {[
        { label: "Users Affected", value: "2", icon: Info },
        { label: "Active Sessions", value: "2", icon: Clock },
        { label: "Modules Impacted", value: "5", icon: FileText },
      ].map((row) => (
        <div key={row.label} className="flex items-center justify-between text-[10px]">
          <span className="flex items-center gap-1.5">
            <row.icon className="w-3.5 h-3.5 text-indigo-500" />
            {row.label}
          </span>
          <span className="font-semibold">{row.value}</span>
        </div>
      ))}
      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1.5">
          <Database className="w-3.5 h-3.5 text-indigo-500" />
          Data Impacted
        </span>
        <span className="text-[10px] bg-orange-100 text-orange-700 rounded-md px-2 py-0.5 font-medium">
          Medium
        </span>
      </div>
    </div>
    <div className="flex gap-2 bg-amber-50 border border-amber-200 rounded-md p-2">
      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
      <p className="text-[10px] text-amber-700">
        Changes will be applied immediately after confirmation.
      </p>
    </div>
  </Card>
);

const NOTIFY = [
  { name: "Anjali Sharma", role: "HR Manager (Approver)" },
  { name: "Rahul Verma", role: "Sr. Support Engineer" },
  { name: "IT Security Team", role: "security@techvision.com" },
];

const WhoWillBeNotified = () => (
  <Card className="flex flex-col gap-2">
    <div>
      <h3 className="text-[10px] font-semibold ">Who Will Be Notified?</h3>
      <p className="text-[10px]  mt-1">
        The following people will receive email notifications.
      </p>
    </div>
    <div className="flex flex-col gap-2">
      {NOTIFY.map((person) => (
        <div key={person.name} className="flex items-center gap-2">
          <div className="bg-blue-50 rounded-full p-2">
            <User className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div>
            <p className="text-[10px] font-medium ">{person.name}</p>
            <p className="text-[10px] ">{person.role}</p>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

const PolicyReminder = () => (
  <Card className="bg-blue-50 border-blue-100 flex gap-2">
    <Shield className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
    <div>
      <h3 className="text-[10px] font-semibold ">Policy Reminder</h3>
      <p className="text-[10px]  mt-1">
        As per company policy, access should be granted only for the minimum
        time required to complete the task.
      </p>
      <button className="flex items-center gap-2 text-[10px] text-blue-600 font-semibold mt-2">
        View Access Policy
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  </Card>
);

const HISTORY = [
  {
    date: "30 May 2025, 02:35 PM",
    by: "Anjali Sharma",
    type: "Access Granted",
    dot: "bg-green-500",
    text:"text-green-500",
    details: "Initial access granted for 3 days",
    reason: "System maintenance approval",
  },
  {
    date: "30 May 2025, 03:10 PM",
    by: "Anjali Sharma",
    type: "Duration Extended",
    dot: "bg-blue-500",
    text:"text-blue-500",
    details: "Extended by 1 day",
    reason: "Additional maintenance window",
  },
];

const PreviousModifications = () => (
  <Card className="flex flex-col gap-2">
    <div>
      <h3 className="text-sm font-semibold ">Previous Access Modifications</h3>
      <p className="text-[10px]  mt-1">History of changes made to this request.</p>
    </div>
    <div className="">
      <table className="w-full text-[10px]">
        <thead>
          <tr className="text-left text-[10px]  border-b border-gray-200">
            <th className="p-2 font-medium">Date & Time</th>
            <th className="p-2 font-medium">Modified By</th>
            <th className="p-2 font-medium">Change Type</th>
            <th className="p-2 font-medium">Details</th>
            <th className="p-2 font-medium">Reason</th>
          </tr>
        </thead>
        <tbody>
          {HISTORY.map((row) => (
            <tr key={row.date} className="border-b border-gray-100">
              <td className="p-2  whitespace-nowrap">{row.date}</td>
              <td className="p-2  whitespace-nowrap">{row.by}</td>
              <td className="p-2">
                <span className={`flex items-center gap-2 whitespace-nowrap font-semibold ${row.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full font-semibold ${row.dot} `} />
                  {row.type}
                </span>
              </td>
              <td className={` p-2`} >{row.details}</td>
              <td className="p-2 ">{row.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <button className="flex items-center gap-2 text-[10px] text-blue-600 font-semibold mx-auto">
      View Full History
      <ArrowRight className="w-3 h-3" />
    </button>
  </Card>
);

const Footer = () => (
  <div className="flex items-center justify-between px-2 py-2">
    <button className="flex items-center gap-2 text-[10px] font-medium border border-gray-300 rounded-md px-3 py-1.5 hover:bg-gray-50">
      <ArrowLeft className="w-3.5 h-3.5" />
      Back to Active Access
    </button>
    <button className="flex items-center gap-2 text-[10px] font-medium border text-blue-700 border-blue-700 rounded-md px-3 py-2  hover:bg-blue-50">
      <Download className="w-3.5 h-3.5" />
      Download Change Report
    </button>
  </div>
);

const RevokeModifyAccessPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-2">
      <Breadcrumb />
      <PageHeader />
      <InfoBar />
      <Tabs />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 py-2">
        <div className="lg:col-span-1 h-full">
          <RevokeAccessSection />
        </div>
        <div className="lg:col-span-1">
          <ModifyAccessSection />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-2">
          <ImpactPreview />
          <WhoWillBeNotified />
          <PolicyReminder />
        </div>
      </div>
{/* <div className="lg:col-span-2 flex flex-col gap-2"> */}

      <PreviousModifications />
      <Footer />
{/* </div> */}
    </div>
  );
};

export default RevokeModifyAccessPage;