import { ReactNode } from 'react';

interface StatsCardProps {
  value: string | number;
  label: string;
  icon: ReactNode;
  iconBg: string;
  trend?: { value: string; up: boolean };
  bgIcon?: ReactNode;
}

export default function StatsCard({ value, label, icon, iconBg, trend, bgIcon }: StatsCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-card-icon" style={{ background: iconBg }}>
        {icon}
      </div>
      <div className="stat-card-body">
        <div className="stat-card-value">{value}</div>
        <div className="stat-card-label">{label}</div>
        {trend && (
          <div className={`stat-card-trend ${trend.up ? 'up' : 'down'}`}>
            <span>{trend.up ? '▲' : '▼'}</span>
            <span>{trend.value} vs last month</span>
          </div>
        )}
      </div>
      {bgIcon && <div className="stat-card-bg-icon">{bgIcon}</div>}
    </div>
  );
}
