'use client';

import { Globe, CheckCircle2, FileText, Grid3X3 } from 'lucide-react';

interface StatCardsProps {
  verifiedCount?: number;
  totalRecords?: number;
  avgEIS?: number;
}

export function StatCards({ 
  verifiedCount = 0, 
  totalRecords = 0, 
  avgEIS = 0 
}: StatCardsProps) {
  const stats = [
    {
      label: 'Network',
      value: 'Algorand Testnet',
      icon: Globe,
      color: 'text-cyan-400'
    },
    {
      label: 'Verified',
      value: verifiedCount.toString(),
      icon: CheckCircle2,
      color: 'text-cyan-400'
    },
    {
      label: 'Total Records',
      value: totalRecords.toString(),
      icon: FileText,
      color: 'text-cyan-400'
    },
    {
      label: 'Avg EIS',
      value: avgEIS.toFixed(1),
      icon: Grid3X3,
      color: 'text-cyan-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="rounded-lg border border-slate-700 bg-slate-900/50 backdrop-blur-sm p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                <p className="text-white text-xl font-semibold font-mono">{stat.value}</p>
              </div>
              <Icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
