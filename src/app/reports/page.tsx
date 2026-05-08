'use client';
import { Row, Col, Button } from 'react-bootstrap';
import { BsDownload, BsBarChartLine, BsPieChart, BsGraphUp, BsArrowRepeat } from 'react-icons/bs';
import AdminLayout from '@/components/layout/AdminLayout';
import PageHeader from '@/components/ui/PageHeader';
import { RevenueAreaChart, PipelineBarChart, SourcePieChart, MonthlyBarChart } from '@/components/crm/RevenueChart';
import { revenueData, deals, leads, contacts } from '@/data/mockData';
import { useLoading } from '@/hooks/useLoading';
import LoadingOverlay from '@/components/ui/LoadingOverlay';

const totalRevenue = revenueData.reduce((s, r) => s + r.revenue, 0);
const totalExpenses = revenueData.reduce((s, r) => s + r.expenses, 0);
const netProfit = totalRevenue - totalExpenses;
const margin = Math.round((netProfit / totalRevenue) * 100);

const performanceData = [
  { name: 'Alex Rivera', deals: 4, revenue: 424000, winRate: 67 },
  { name: 'Maria Santos', deals: 3, revenue: 181000, winRate: 75 },
  { name: 'Jake Thompson', deals: 3, revenue: 122000, winRate: 50 },
];

export default function ReportsPage() {
  const { loading, withLoading } = useLoading();
  const refresh = () => withLoading(() => new Promise((r) => setTimeout(r, 1100)));

  return (
    <AdminLayout>
      <LoadingOverlay show={loading} fullPage text="Generating report…" />

      <PageHeader
        title="Reports & Analytics"
        subtitle="Insights into your CRM performance and revenue."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Reports' }]}
        actions={
          <>
            <Button variant="outline-secondary" size="sm" className="d-flex align-items-center gap-1" onClick={refresh}>
              <BsArrowRepeat /> Refresh
            </Button>
            <Button variant="primary" size="sm" className="d-flex align-items-center gap-1">
              <BsDownload /> Export PDF
            </Button>
          </>
        }
      />

      {/* KPI cards */}
      <Row className="g-3 mb-4">
        {[
          { label: 'Annual Revenue', value: `$${(totalRevenue / 1000).toFixed(0)}K`, color: '#1e40af', sub: 'YTD' },
          { label: 'Total Expenses', value: `$${(totalExpenses / 1000).toFixed(0)}K`, color: '#dc2626', sub: 'YTD' },
          { label: 'Net Profit', value: `$${(netProfit / 1000).toFixed(0)}K`, color: '#065f46', sub: 'YTD' },
          { label: 'Profit Margin', value: `${margin}%`, color: '#5b21b6', sub: 'YTD' },
          { label: 'Total Contacts', value: contacts.length, color: '#0369a1', sub: 'All time' },
          { label: 'Total Leads', value: leads.length, color: '#d97706', sub: 'Active' },
        ].map((s) => (
          <Col key={s.label} xs={6} md={4} xl={2}>
            <div className="crm-card py-3 px-3 text-center">
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</div>
              <div style={{ fontSize: '0.7rem', color: '#d1d5db', marginTop: 2 }}>{s.sub}</div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Revenue + Monthly bar */}
      <Row className="g-3 mb-4">
        <Col xs={12} xl={7}>
          <div className="crm-card h-100">
            <div className="crm-card-header">
              <h6 className="crm-card-title"><BsGraphUp style={{ color: '#3b82f6' }} /> Revenue vs Target (12 months)</h6>
            </div>
            <div className="crm-card-body">
              <RevenueAreaChart />
            </div>
          </div>
        </Col>
        <Col xs={12} xl={5}>
          <div className="crm-card h-100">
            <div className="crm-card-header">
              <h6 className="crm-card-title"><BsBarChartLine style={{ color: '#f59e0b' }} /> Revenue vs Expenses</h6>
            </div>
            <div className="crm-card-body">
              <MonthlyBarChart />
            </div>
          </div>
        </Col>
      </Row>

      {/* Pipeline + Sources */}
      <Row className="g-3 mb-4">
        <Col xs={12} md={6}>
          <div className="crm-card">
            <div className="crm-card-header">
              <h6 className="crm-card-title"><BsBarChartLine style={{ color: '#10b981' }} /> Pipeline by Stage</h6>
            </div>
            <div className="crm-card-body">
              <PipelineBarChart />
            </div>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="crm-card">
            <div className="crm-card-header">
              <h6 className="crm-card-title"><BsPieChart style={{ color: '#8b5cf6' }} /> Leads by Source</h6>
            </div>
            <div className="crm-card-body">
              <SourcePieChart />
            </div>
          </div>
        </Col>
      </Row>

      {/* Sales rep performance */}
      <div className="crm-card">
        <div className="crm-card-header">
          <h6 className="crm-card-title"><BsBarChartLine style={{ color: '#3b82f6' }} /> Sales Rep Performance</h6>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="table table-hover mb-0" style={{ fontSize: '0.85rem' }}>
            <thead style={{ background: '#f9fafb' }}>
              <tr>
                {['Rep', 'Deals Won', 'Revenue', 'Win Rate', 'Performance'].map((h) => (
                  <th key={h} style={{ fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#374151', border: 'none', padding: '0.75rem 1rem' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {performanceData.map((rep) => (
                <tr key={rep.name}>
                  <td style={{ padding: '0.75rem 1rem', verticalAlign: 'middle', fontWeight: 600, color: '#111827' }}>{rep.name}</td>
                  <td style={{ verticalAlign: 'middle' }}>{rep.deals}</td>
                  <td style={{ verticalAlign: 'middle' }}><span className="text-money fw-semibold">${rep.revenue.toLocaleString()}</span></td>
                  <td style={{ verticalAlign: 'middle' }}>
                    <span style={{ fontWeight: 700, color: rep.winRate >= 60 ? '#10b981' : '#f59e0b' }}>{rep.winRate}%</span>
                  </td>
                  <td style={{ verticalAlign: 'middle', width: 160 }}>
                    <div className="prob-bar">
                      <div className="prob-bar-inner" style={{ width: `${rep.winRate}%`, background: rep.winRate >= 60 ? '#10b981' : '#f59e0b' }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
