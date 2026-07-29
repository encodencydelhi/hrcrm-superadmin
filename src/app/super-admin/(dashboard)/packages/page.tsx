'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Pencil } from 'lucide-react';
import { DataTable, Column } from '@/components/shared/DataTable';
import api from '@/lib/axios';

const packageColumns: Column<any>[] = [
  {
    key: 'name',
    label: 'PACKAGE NAME',
    width: '16.67%',
    render: (v) => <span className="font-medium">{v}</span>,
  },
  {
    key: 'tier',
    label: 'TIER',
    width: '10%',
    render: (v) => (
      <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-indigo-50 text-indigo-700">
        {v || 'CUSTOM'}
      </span>
    ),
  },
  {
    key: 'maxUsers',
    label: 'MAX USERS',
    width: '10%',
    render: (v) => <span className="text-zinc-500">{v}</span>,
  },
  {
    key: 'pricePerUserMonthlyINR',
    label: 'PER USER / MONTH',
    width: '17%',
    render: (_v, row) => (
      <span className="text-zinc-500">
        ₹{row.pricePerUserMonthlyINR || 0} / ${row.pricePerUserMonthlyUSD || 0}
      </span>
    ),
  },
  {
    key: 'pricePerUserYearlyINR',
    label: 'PER USER / YEAR',
    width: '17%',
    render: (_v, row) => (
      <span className="text-zinc-500">
        ₹{row.pricePerUserYearlyINR || 0} / ${row.pricePerUserYearlyUSD || 0}
      </span>
    ),
  },
  {
    key: 'setupFeeINR',
    label: 'SETUP FEE',
    width: '13%',
    render: (v) => <span className="text-zinc-500">₹{v || 0}</span>,
  },
  {
    key: 'freeAiCredits',
    label: 'FREE AI CREDITS',
    width: '13%',
    render: (v) => <span className="text-zinc-500">{v || 0}</span>,
  },
  {
    key: 'isActive',
    label: 'STATUS',
    align: 'right',
    sortable: false,
    render: (v) => (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${
          v ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
        }`}
      >
        {v ? 'Active' : 'Inactive'}
      </span>
    ),
  },
  {
    key: 'actions',
    label: '',
    width: '48px',
    sortable: false,
    filterable: false,
    render: (_v, row) => (
      <Link
        href={`/super-admin/packages/${row._id}/edit`}
        className="inline-flex text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-md transition-colors"
        title="Edit package"
      >
        <Pencil size={14} />
      </Link>
    ),
  },
];

export default function SuperAdminPackagesPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const res = await api.get('/super-admin/packages');
      setPackages(res.data || res.data?.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-md tracking-tight text-zinc-900 dark:text-zinc-50">Package Management</h1>
          <p className="text-xs text-zinc-500">Manage subscription packages, per-user pricing, setup fees, and AI credits.</p>
        </div>
        <Button asChild className="h-8 text-xs bg-indigo-600 text-white hover:bg-indigo-700">
          <Link href="/super-admin/packages/new"><Plus size={14} className="mr-1" /> Add Package</Link>
        </Button>
      </div>

      <Card className="border-zinc-200 shadow-sm dark:border-zinc-800">
        <CardContent className="p-0">
          <DataTable
            columns={packageColumns}
            data={packages}
            rowKey="_id"
            loading={loading}
            showActions={false}
            enableColumnFilters={false}
            emptyMessage="No packages found. Create one."
          />
        </CardContent>
      </Card>
    </div>
  );
}