'use client';
import { Row, Col, Button } from 'react-bootstrap';
import { BsPlus, BsTable, BsKanban } from 'react-icons/bs';
import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import PageHeader from '@/components/ui/PageHeader';
import LeadsBoard from '@/components/crm/LeadsBoard';
import { leads } from '@/data/mockData';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import { useLoading } from '@/hooks/useLoading';

const totalValue = leads.reduce((s, l) => s + l.value, 0);
const highPriority = leads.filter((l) => l.priority === 'high').length;
const avgProbability = Math.round(leads.reduce((s, l) => s + l.probability, 0) / leads.length);

export default function LeadsPage() {
  const [view, setView] = useState<'kanban' | 'table'>('kanban');
  const { loading, withLoading } = useLoading();

  const simulate = () => withLoading(() => new Promise((r) => setTimeout(r, 800)));

  return (
    <AdminLayout>
      <LoadingOverlay show={loading} fullPage text="Loading leads…" />

      <PageHeader
        title="Leads Pipeline"
        subtitle="Track and manage your sales leads through the pipeline."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Leads' }]}
        actions={
          <>
            <div className="d-flex" style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
              <Button
                variant={view === 'kanban' ? 'primary' : 'light'}
                size="sm"
                style={{ borderRadius: 0, border: 'none' }}
                onClick={() => setView('kanban')}
              >
                <BsKanban />
              </Button>
              <Button
                variant={view === 'table' ? 'primary' : 'light'}
                size="sm"
                style={{ borderRadius: 0, border: 'none' }}
                onClick={() => setView('table')}
              >
                <BsTable />
              </Button>
            </div>
            <Button variant="primary" size="sm" className="d-flex align-items-center gap-1" onClick={simulate}>
              <BsPlus style={{ fontSize: '1.1rem' }} /> Add Lead
            </Button>
          </>
        }
      />

      {/* Summary */}
      <Row className="g-3 mb-4">
        {[
          { value: leads.length, label: 'Total Leads', color: '#1e40af' },
          { value: `$${(totalValue / 1000).toFixed(0)}K`, label: 'Pipeline Value', color: '#10b981' },
          { value: highPriority, label: 'High Priority', color: '#dc2626' },
          { value: `${avgProbability}%`, label: 'Avg. Probability', color: '#8b5cf6' },
        ].map((s) => (
          <Col key={s.label} xs={6} md={3}>
            <div className="crm-card text-center py-3">
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Kanban Board */}
      {view === 'kanban' && (
        <div className="crm-card">
          <div className="crm-card-header">
            <h6 className="crm-card-title"><BsKanban style={{ color: '#3b82f6' }} /> Kanban Board</h6>
            <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{leads.length} leads · drag to move (demo)</span>
          </div>
          <div className="crm-card-body" style={{ overflowX: 'auto' }}>
            <LeadsBoard data={leads} />
          </div>
        </div>
      )}

      {/* Table view */}
      {view === 'table' && (
        <div className="crm-card">
          <div className="crm-card-header">
            <h6 className="crm-card-title"><BsTable style={{ color: '#3b82f6' }} /> Leads List</h6>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="table table-hover mb-0" style={{ fontSize: '0.83rem' }}>
              <thead style={{ background: '#f9fafb' }}>
                <tr>
                  {['Lead', 'Contact', 'Stage', 'Value', 'Source', 'Probability', 'Owner', 'Priority'].map((h) => (
                    <th key={h} style={{ fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#374151', border: 'none', padding: '0.625rem 1rem' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id} style={{ cursor: 'pointer' }}>
                    <td style={{ padding: '0.7rem 1rem', verticalAlign: 'middle' }}>
                      <div className="fw-semibold" style={{ color: '#111827' }}>{l.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{l.company}</div>
                    </td>
                    <td style={{ verticalAlign: 'middle' }}>{l.contact}</td>
                    <td style={{ verticalAlign: 'middle' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '2px 8px', borderRadius: 10, background: '#f3f4f6', color: '#374151' }}>{l.stage}</span>
                    </td>
                    <td style={{ verticalAlign: 'middle' }}>
                      <span className="text-money fw-semibold">${l.value.toLocaleString()}</span>
                    </td>
                    <td style={{ verticalAlign: 'middle', color: '#6b7280' }}>{l.source}</td>
                    <td style={{ verticalAlign: 'middle' }}>
                      <div className="prob-bar" style={{ width: 80 }}>
                        <div className="prob-bar-inner" style={{ width: `${l.probability}%` }} />
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: 2 }}>{l.probability}%</div>
                    </td>
                    <td style={{ verticalAlign: 'middle', color: '#374151' }}>{l.owner}</td>
                    <td style={{ verticalAlign: 'middle' }}>
                      <span
                        className="badge-priority badge"
                        style={{ fontSize: '0.65rem', background: l.priority === 'high' ? '#fee2e222' : l.priority === 'medium' ? '#fef3c722' : '#f0fdf422', color: l.priority === 'high' ? '#dc2626' : l.priority === 'medium' ? '#d97706' : '#16a34a', padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}
                      >
                        {l.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
