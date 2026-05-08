'use client';
import { useState, useMemo, useCallback } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Button, Form, InputGroup, Modal, Badge } from 'react-bootstrap';
import { BsSearch, BsPlus, BsPencil, BsTrash, BsTelephone, BsEnvelope, BsFilter } from 'react-icons/bs';
import { Contact, ContactStatus } from '@/types';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import { useLoading } from '@/hooks/useLoading';

const avatarColors = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#ec4899'];

interface ContactsTableProps {
  data: Contact[];
}

export default function ContactsTable({ data }: ContactsTableProps) {
  const [filterText, setFilterText] = useState('');
  const [statusFilter, setStatusFilter] = useState<ContactStatus | 'all'>('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const { loading, withLoading } = useLoading();

  const filtered = useMemo(() => {
    let rows = data;
    if (statusFilter !== 'all') rows = rows.filter((c) => c.status === statusFilter);
    if (filterText) {
      const q = filterText.toLowerCase();
      rows = rows.filter((c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q)
      );
    }
    return rows;
  }, [data, filterText, statusFilter]);

  const handleView = useCallback((row: Contact) => {
    setSelectedContact(row);
    setShowModal(true);
  }, []);

  const simulateAction = useCallback(async () => {
    await withLoading(() => new Promise((r) => setTimeout(r, 900)));
  }, [withLoading]);

  const columns: TableColumn<Contact>[] = [
    {
      name: 'Contact',
      cell: (row) => (
        <div className="d-flex align-items-center gap-2">
          <div
            className="avatar-circle"
            style={{ background: avatarColors[row.id % avatarColors.length] }}
          >
            {row.avatar}
          </div>
          <div>
            <div className="fw-semibold" style={{ fontSize: '0.85rem', color: '#111827' }}>{row.name}</div>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{row.title}</div>
          </div>
        </div>
      ),
      sortable: true,
      sortField: 'name',
      minWidth: '200px',
    },
    {
      name: 'Company',
      selector: (row) => row.company,
      sortable: true,
      cell: (row) => <span className="fw-semibold" style={{ fontSize: '0.83rem' }}>{row.company}</span>,
    },
    {
      name: 'Email / Phone',
      cell: (row) => (
        <div>
          <div style={{ fontSize: '0.78rem', color: '#374151' }}>
            <BsEnvelope style={{ marginRight: 4, color: '#9ca3af' }} />{row.email}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#374151' }}>
            <BsTelephone style={{ marginRight: 4, color: '#9ca3af' }} />{row.phone}
          </div>
        </div>
      ),
      minWidth: '220px',
    },
    {
      name: 'Status',
      cell: (row) => <span className={`badge-status ${row.status}`}>{row.status}</span>,
      sortable: true,
      sortField: 'status',
    },
    {
      name: 'Value',
      selector: (row) => row.value,
      sortable: true,
      cell: (row) => (
        <span className="text-money fw-semibold" style={{ color: '#111827' }}>
          ${row.value.toLocaleString()}
        </span>
      ),
    },
    {
      name: 'Last Contact',
      selector: (row) => row.lastContact,
      sortable: true,
      cell: (row) => <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>{row.lastContact}</span>,
    },
    {
      name: 'Tags',
      cell: (row) => (
        <div className="d-flex gap-1 flex-wrap">
          {row.tags.map((t) => (
            <span key={t} style={{ fontSize: '0.65rem', background: '#f3f4f6', color: '#374151', padding: '1px 6px', borderRadius: 10, fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      ),
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="d-flex gap-1">
          <Button size="sm" variant="outline-primary" className="btn-action" onClick={() => handleView(row)} title="View">
            <BsPencil />
          </Button>
          <Button size="sm" variant="outline-danger" className="btn-action" onClick={simulateAction} title="Delete">
            <BsTrash />
          </Button>
        </div>
      ),
      ignoreRowClick: true,
      width: '100px',
    },
  ];

  const SubHeader = (
    <div className="d-flex align-items-center gap-2 flex-wrap w-100">
      <InputGroup style={{ maxWidth: 280 }}>
        <InputGroup.Text style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
          <BsSearch style={{ color: '#9ca3af' }} />
        </InputGroup.Text>
        <Form.Control
          placeholder="Search contacts…"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          style={{ border: '1px solid #e5e7eb', background: '#f9fafb', fontSize: '0.875rem' }}
        />
      </InputGroup>

      <InputGroup style={{ maxWidth: 160 }}>
        <InputGroup.Text style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
          <BsFilter style={{ color: '#9ca3af' }} />
        </InputGroup.Text>
        <Form.Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as ContactStatus | 'all')}
          style={{ border: '1px solid #e5e7eb', background: '#f9fafb', fontSize: '0.875rem' }}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="prospect">Prospect</option>
          <option value="customer">Customer</option>
          <option value="churned">Churned</option>
        </Form.Select>
      </InputGroup>

      <Button variant="primary" size="sm" className="ms-auto d-flex align-items-center gap-1" onClick={simulateAction}>
        <BsPlus style={{ fontSize: '1.1rem' }} /> Add Contact
      </Button>
    </div>
  );

  return (
    <div className="crm-card" style={{ position: 'relative' }}>
      <LoadingOverlay show={loading} text="Processing…" />
      <DataTable
        columns={columns}
        data={filtered}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 50]}
        sortIcon={<span style={{ marginLeft: 4, fontSize: '0.7rem' }}>↕</span>}
        highlightOnHover
        pointerOnHover
        selectableRows
        subHeader
        subHeaderComponent={SubHeader}
        subHeaderAlign={'left' as never}
        noDataComponent={
          <div style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af' }}>
            No contacts match your filters.
          </div>
        }
      />

      {/* Contact Detail Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton style={{ borderBottom: '1px solid #f3f4f6' }}>
          <Modal.Title style={{ fontSize: '1rem', fontWeight: 700 }}>Contact Details</Modal.Title>
        </Modal.Header>
        {selectedContact && (
          <Modal.Body>
            <div className="d-flex align-items-center gap-3 mb-4">
              <div
                className="avatar-circle"
                style={{
                  width: 64, height: 64, fontSize: '1.1rem',
                  background: avatarColors[selectedContact.id % avatarColors.length],
                }}
              >
                {selectedContact.avatar}
              </div>
              <div>
                <h5 className="mb-0 fw-bold">{selectedContact.name}</h5>
                <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>{selectedContact.title} · {selectedContact.company}</div>
                <span className={`badge-status ${selectedContact.status}`} style={{ marginTop: 6 }}>{selectedContact.status}</span>
              </div>
            </div>
            <div className="row g-3">
              {[
                ['Email', selectedContact.email],
                ['Phone', selectedContact.phone],
                ['Location', selectedContact.location],
                ['Value', `$${selectedContact.value.toLocaleString()}`],
                ['Last Contact', selectedContact.lastContact],
                ['Tags', selectedContact.tags.join(', ')],
              ].map(([label, val]) => (
                <div className="col-md-6" key={label}>
                  <div style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: '0.875rem', color: '#111827', fontWeight: 500 }}>{val}</div>
                </div>
              ))}
            </div>
          </Modal.Body>
        )}
        <Modal.Footer style={{ borderTop: '1px solid #f3f4f6' }}>
          <Button variant="outline-secondary" size="sm" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" size="sm" onClick={() => setShowModal(false)}>Edit Contact</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
