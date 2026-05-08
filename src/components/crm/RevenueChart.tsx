'use client';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from 'recharts';
import { revenueData, pipelineData, sourceData } from '@/data/mockData';

const fmt = (v: number) => `$${(v / 1000).toFixed(0)}k`;

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '0.625rem 0.875rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '0.8rem' }}>
        <div style={{ fontWeight: 700, color: '#111827', marginBottom: 4 }}>{label}</div>
        {payload.map((p) => (
          <div key={p.name} style={{ color: p.color, fontWeight: 600 }}>
            {p.name}: <span className="text-money">${p.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function RevenueAreaChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={revenueData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="tgtGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={fmt} tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={45} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: '0.78rem', paddingTop: 8 }} />
        <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#3b82f6" strokeWidth={2.5} fill="url(#revGrad)" dot={false} activeDot={{ r: 5 }} />
        <Area type="monotone" dataKey="target" name="Target" stroke="#10b981" strokeWidth={2} strokeDasharray="5 3" fill="url(#tgtGrad)" dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function PipelineBarChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={pipelineData} layout="vertical" margin={{ top: 0, right: 10, bottom: 0, left: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false} />
        <XAxis type="number" tickFormatter={fmt} tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="stage" tick={{ fontSize: 12, fill: '#374151', fontWeight: 600 }} axisLine={false} tickLine={false} width={90} />
        <Tooltip formatter={(v) => typeof v === 'number' ? `$${v.toLocaleString()}` : v} contentStyle={{ fontSize: '0.8rem', borderRadius: 8, border: '1px solid #e5e7eb' }} />
        <Bar dataKey="value" name="Pipeline Value" radius={[0, 6, 6, 0]}>
          {pipelineData.map((entry, index) => {
            const colors = ['#3b82f6', '#f59e0b', '#8b5cf6', '#10b981', '#ef4444'];
            return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SourcePieChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={sourceData}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={3}
          dataKey="value"
          nameKey="name"
        >
          {sourceData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(v) => typeof v === 'number' ? `${v}%` : v}
          contentStyle={{ fontSize: '0.8rem', borderRadius: 8, border: '1px solid #e5e7eb' }}
        />
        <Legend
          layout="vertical"
          verticalAlign="middle"
          align="right"
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: '0.78rem', lineHeight: '1.8' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function MonthlyBarChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={revenueData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={fmt} tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={45} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: '0.78rem', paddingTop: 8 }} />
        <Bar dataKey="revenue" name="Revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expenses" name="Expenses" fill="#fca5a5" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
