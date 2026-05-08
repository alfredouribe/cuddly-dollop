'use client';
import { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import {
  BsPeople, BsBriefcase, BsCurrencyDollar, BsGraphUpArrow,
  BsPlus, BsArrowRepeat,
} from 'react-icons/bs';
import AdminLayout from '@/components/layout/AdminLayout';
import PageHeader from '@/components/ui/PageHeader';
import StatsCard from '@/components/ui/StatsCard';
import ActivityTimeline from '@/components/ui/ActivityTimeline';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import { RevenueAreaChart, PipelineBarChart } from '@/components/crm/RevenueChart';
import { deals, activities } from '@/data/mockData';
import { useLoading } from '@/hooks/useLoading';

const statsConfig = [
  {
    value: '1,284',
    label: 'Total Contacts',
    iconBg: '#dbeafe',
    icon: <BsPeople style={{ color: '#1e40af', fontSize: '1.3rem' }} />,
    bgIcon: <BsPeople />,
    trend: { value: '+12%', up: true },
  },
  {
    value: '42',
    label: 'Open Deals',
    iconBg: '#fef3c7',
    icon: <BsBriefcase style={{ color: '#92400e', fontSize: '1.3rem' }} />,
    bgIcon: <BsBriefcase />,
    trend: { value: '+5%', up: true },
  },
  {
    value: '$846K',
    label: 'Revenue MTD',
    iconBg: '#d1fae5',
    icon: <BsCurrencyDollar style={{ color: '#065f46', fontSize: '1.3rem' }} />,
    bgIcon: <BsCurrencyDollar />,
    trend: { value: '+18%', up: true },
  },
  {
    value: '34.2%',
    label: 'Conversion Rate',
    iconBg: '#ede9fe',
    icon: <BsGraphUpArrow style={{ color: '#5b21b6', fontSize: '1.3rem' }} />,
    bgIcon: <BsGraphUpArrow />,
    trend: { value: '-2.1%', up: false },
  },
];

const recentDeals = deals.slice(0, 5);

export default function DashboardPage() {
  const { loading, withLoading } = useLoading();
  const refresh = () => withLoading(() => new Promise<void>((r) => setTimeout(r, 1000)));

  return (
    <AdminLayout>
      <LoadingOverlay show={loading} fullPage text="Refreshing data…" />

      <PageHeader
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening with your CRM."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Dashboard' }]}
        actions={
          <>
            <Button variant="outline-secondary" size="sm" className="d-flex align-items-center gap-1" onClick={refresh}>
              <BsArrowRepeat /> Refresh
            </Button>
            <Button variant="primary" size="sm" className="d-flex align-items-center gap-1">
              <BsPlus style={{ fontSize: '1.1rem' }} /> New Deal
            </Button>
          </>
        }
      />

      {/* Stats Row */}
      <Row className="g-3 mb-4">
        {statsConfig.map((s) => (
          <Col key={s.label} xs={12} sm={6} xl={3}>
            <StatsCard {...s} />
          </Col>
        ))}
      </Row>

      {/* Charts Row */}
      <Row className="g-3 mb-4">
        <Col xs={12} xl={8}>
          <div className="crm-card h-100">
            <div className="crm-card-header">
              <h6 className="crm-card-title">
                <BsGraphUpArrow style={{ color: '#3b82f6' }} /> Revenue vs Target
              </h6>
              <div className="d-flex gap-2">
                {['MTD', 'QTD', 'YTD'].map((t) => (
                  <Button key={t} variant="outline-secondary" size="sm" style={{ fontSize: '0.72rem', padding: '2px 10px' }}>
                    {t}
                  </Button>
                ))}
              </div>
            </div>
            <div className="crm-card-body">
              <RevenueAreaChart />
            </div>
          </div>
        </Col>

        <Col xs={12} xl={4}>
          <div className="crm-card h-100">
            <div className="crm-card-header">
              <h6 className="crm-card-title">
                <BsBriefcase style={{ color: '#f59e0b' }} /> Pipeline by Stage
              </h6>
            </div>
            <div className="crm-card-body">
              <PipelineBarChart />
            </div>
          </div>
        </Col>
      </Row>

      {/* Bottom Row */}
      <Row className="g-3">
        <Col xs={12} lg={7}>
          <div className="crm-card">
            <div className="crm-card-header">
              <h6 className="crm-card-title">
                <BsBriefcase style={{ color: '#10b981' }} /> Recent Deals
              </h6>
              <a href="/deals" style={{ fontSize: '0.8rem', color: '#3b82f6' }}>View all</a>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="table table-hover mb-0" style={{ fontSize: '0.83rem' }}>
                <thead style={{ background: '#f9fafb' }}>
                  <tr>
                    {['Deal', 'Amount', 'Stage', 'Close Date'].map((h) => (
                      <th key={h} style={{ fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#374151', border: 'none', padding: '0.625rem 1rem' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentDeals.map((d) => (
                    <tr key={d.id} style={{ cursor: 'pointer' }}>
                      <td style={{ padding: '0.7rem 1rem', verticalAlign: 'middle' }}>
                        <div className="fw-semibold" style={{ color: '#111827' }}>{d.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{d.contact}</div>
                      </td>
                      <td style={{ verticalAlign: 'middle' }}>
                        <span className="text-money fw-semibold">${d.amount.toLocaleString()}</span>
                      </td>
                      <td style={{ verticalAlign: 'middle' }}>
                        <span className={`badge-stage ${d.stage}`}>{d.stage}</span>
                      </td>
                      <td style={{ verticalAlign: 'middle', color: '#6b7280' }}>{d.closeDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Col>

        <Col xs={12} lg={5}>
          <div className="crm-card">
            <div className="crm-card-header">
              <h6 className="crm-card-title">
                <BsArrowRepeat style={{ color: '#8b5cf6' }} /> Recent Activity
              </h6>
              <a href="#" style={{ fontSize: '0.8rem', color: '#3b82f6' }}>View all</a>
            </div>
            <div className="crm-card-body">
              <ActivityTimeline activities={activities} />
            </div>
          </div>
        </Col>
      </Row>

      {/* Quick Stats row */}
      <Row className="g-3 mt-0">
        {[
          { label: 'Calls This Week', value: '24', color: '#3b82f6' },
          { label: 'Emails Sent', value: '138', color: '#10b981' },
          { label: 'Meetings Booked', value: '11', color: '#f59e0b' },
          { label: 'Tasks Completed', value: '47', color: '#8b5cf6' },
          { label: 'New Leads', value: '18', color: '#ef4444' },
          { label: 'Won This Month', value: '3', color: '#06b6d4' },
        ].map((item) => (
          <Col key={item.label} xs={6} md={4} xl={2}>
            <div className="crm-card text-center py-3 px-2">
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: item.color }}>{item.value}</div>
              <div style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{item.label}</div>
            </div>
          </Col>
        ))}
      </Row>
    </AdminLayout>
  );
}
