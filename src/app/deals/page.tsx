'use client';
import { Row, Col, Button } from 'react-bootstrap';
import { BsPlus, BsTrophy, BsXCircle } from 'react-icons/bs';
import AdminLayout from '@/components/layout/AdminLayout';
import PageHeader from '@/components/ui/PageHeader';
import DealsTable from '@/components/crm/DealsTable';
import { deals } from '@/data/mockData';
import { useLoading } from '@/hooks/useLoading';
import LoadingOverlay from '@/components/ui/LoadingOverlay';

const wonDeals = deals.filter((d) => d.stage === 'Won');
const lostDeals = deals.filter((d) => d.stage === 'Lost');
const openDeals = deals.filter((d) => !['Won', 'Lost'].includes(d.stage));
const totalPipeline = openDeals.reduce((s, d) => s + d.amount, 0);
const wonRevenue = wonDeals.reduce((s, d) => s + d.amount, 0);
const winRate = Math.round((wonDeals.length / (wonDeals.length + lostDeals.length)) * 100);

export default function DealsPage() {
  const { loading, withLoading } = useLoading();
  const simulate = () => withLoading(() => new Promise((r) => setTimeout(r, 700)));

  return (
    <AdminLayout>
      <LoadingOverlay show={loading} fullPage />

      <PageHeader
        title="Deals"
        subtitle="Track your sales pipeline and deal progress."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Deals' }]}
        actions={
          <Button variant="primary" size="sm" className="d-flex align-items-center gap-1" onClick={simulate}>
            <BsPlus style={{ fontSize: '1.1rem' }} /> New Deal
          </Button>
        }
      />

      {/* Summary */}
      <Row className="g-3 mb-4">
        {[
          { value: deals.length, label: 'Total Deals', color: '#1e40af', bg: '#dbeafe' },
          { value: `$${(totalPipeline / 1000).toFixed(0)}K`, label: 'Open Pipeline', color: '#92400e', bg: '#fef3c7' },
          { value: `$${(wonRevenue / 1000).toFixed(0)}K`, label: 'Won Revenue', color: '#065f46', bg: '#d1fae5' },
          { value: `${winRate}%`, label: 'Win Rate', color: '#5b21b6', bg: '#ede9fe' },
        ].map((s) => (
          <Col key={s.label} xs={6} md={3}>
            <div className="crm-card text-center py-3" style={{ borderTop: `3px solid ${s.color}` }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Won / Lost highlight */}
      <Row className="g-3 mb-4">
        <Col xs={12} md={6}>
          <div className="crm-card">
            <div className="crm-card-header">
              <h6 className="crm-card-title"><BsTrophy style={{ color: '#10b981' }} /> Won Deals</h6>
              <span className="badge bg-success">{wonDeals.length}</span>
            </div>
            <div className="crm-card-body p-0">
              {wonDeals.map((d) => (
                <div key={d.id} className="d-flex align-items-center justify-content-between px-4 py-2" style={{ borderBottom: '1px solid #f3f4f6', fontSize: '0.83rem' }}>
                  <div>
                    <div className="fw-semibold" style={{ color: '#111827' }}>{d.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{d.contact}</div>
                  </div>
                  <span className="text-money fw-semibold" style={{ color: '#10b981' }}>${d.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="crm-card">
            <div className="crm-card-header">
              <h6 className="crm-card-title"><BsXCircle style={{ color: '#ef4444' }} /> Lost Deals</h6>
              <span className="badge bg-danger">{lostDeals.length}</span>
            </div>
            <div className="crm-card-body p-0">
              {lostDeals.map((d) => (
                <div key={d.id} className="d-flex align-items-center justify-content-between px-4 py-2" style={{ borderBottom: '1px solid #f3f4f6', fontSize: '0.83rem' }}>
                  <div>
                    <div className="fw-semibold" style={{ color: '#111827' }}>{d.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{d.contact}</div>
                  </div>
                  <span className="text-money fw-semibold" style={{ color: '#ef4444' }}>${d.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>

      {/* Main table */}
      <DealsTable data={deals} />
    </AdminLayout>
  );
}
