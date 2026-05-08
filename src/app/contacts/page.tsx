'use client';
import { Row, Col, Button } from 'react-bootstrap';
import { BsDownload, BsUpload, BsPeople } from 'react-icons/bs';
import AdminLayout from '@/components/layout/AdminLayout';
import PageHeader from '@/components/ui/PageHeader';
import ContactsTable from '@/components/crm/ContactsTable';
import StatsCard from '@/components/ui/StatsCard';
import { contacts } from '@/data/mockData';

const statusCounts = {
  customer: contacts.filter((c) => c.status === 'customer').length,
  active: contacts.filter((c) => c.status === 'active').length,
  prospect: contacts.filter((c) => c.status === 'prospect').length,
  inactive: contacts.filter((c) => c.status === 'inactive' || c.status === 'churned').length,
};

export default function ContactsPage() {
  return (
    <AdminLayout>
      <PageHeader
        title="Contacts"
        subtitle="Manage your customers, prospects, and leads."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contacts' }]}
        actions={
          <>
            <Button variant="outline-secondary" size="sm" className="d-flex align-items-center gap-1">
              <BsUpload /> Import
            </Button>
            <Button variant="outline-secondary" size="sm" className="d-flex align-items-center gap-1">
              <BsDownload /> Export
            </Button>
          </>
        }
      />

      {/* Summary stats */}
      <Row className="g-3 mb-4">
        {[
          { value: contacts.length, label: 'Total Contacts', color: '#dbeafe', textColor: '#1e40af' },
          { value: statusCounts.customer, label: 'Customers', color: '#ede9fe', textColor: '#5b21b6' },
          { value: statusCounts.active, label: 'Active', color: '#d1fae5', textColor: '#065f46' },
          { value: statusCounts.prospect, label: 'Prospects', color: '#fef3c7', textColor: '#92400e' },
        ].map((s) => (
          <Col key={s.label} xs={6} md={3}>
            <div className="crm-card text-center py-3 px-2">
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: s.textColor }}>{s.value}</div>
              <div style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Full DataTable */}
      <ContactsTable data={contacts} />
    </AdminLayout>
  );
}
