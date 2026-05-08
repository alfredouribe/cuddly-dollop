'use client';
import { useState, useMemo } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Button, Form, InputGroup, ProgressBar } from 'react-bootstrap';
import { BsSearch, BsPlus, BsPencil, BsTrash, BsFilter } from 'react-icons/bs';
import { Deal, DealStage } from '@/types';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import { useLoading } from '@/hooks/useLoading';

interface DealsTableProps {
  data: Deal[];
}

export default function DealsTable({ data }: DealsTableProps) {
  const [filterText, setFilterText] = useState('');
  const [stageFilter, setStageFilter] = useState<DealStage | 'all'>('all');
  const { loading, withLoading } = useLoading();

  const filtered = useMemo(() => {
    let rows = data;
    if (stageFilter !== 'all') rows = rows.filter((d) => d.stage === stageFilter);
    if (filterText) {
      const q = filterText.toLowerCase();
      rows = rows.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.contact.toLowerCase().includes(q) ||
          d.company.toLowerCase().includes(q)
      );
    }
    return rows;
  }, [data, filterText, stageFilter]);

  const totalValue = filtered.reduce((s, d) => s + d.amount, 0);
  const wonValue = filtered.filter((d) => d.stage === 'Won').reduce((s, d) => s + d.amount, 0);

  const simulateAction = async () => {
    await withLoading(() => new Promise((r) => setTimeout(r, 700)));
  };

  const columns: TableColumn<Deal>[] = [
    {
      name: 'Deal Name',
      cell: (row) => (
        <div>
          <div className="fw-semibold" style={{ fontSize: '0.85rem', color: '#111827' }}>{row.name}</div>
          <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{row.company}</div>
        </div>
      ),
      sortable: true,
      sortField: 'name',
      minWidth: '200px',
    },
    {
      name: 'Contact',
      selector: (row) => row.contact,
      sortable: true,
      cell: (row) => <span style={{ fontSize: '0.83rem' }}>{row.contact}</span>,
    },
    {
      name: 'Amount',
      selector: (row) => row.amount,
      sortable: true,
      cell: (row) => (
        <span className="text-money fw-semibold" style={{ color: '#111827' }}>
          ${row.amount.toLocaleString()}
        </span>
      ),
    },
    {
      name: 'Stage',
      cell: (row) => <span className={`badge-stage ${row.stage}`}>{row.stage}</span>,
      sortable: true,
      sortField: 'stage',
    },
    {
      name: 'Probability',
      cell: (row) => (
        <div style={{ width: 100 }}>
          <div className="d-flex justify-content-between mb-1">
            <span style={{ fontSize: '0.75rem', color: '#374151' }}>{row.probability}%</span>
          </div>
          <div className="prob-bar">
            <div
              className="prob-bar-inner"
              style={{
                width: `${row.probability}%`,
                background: row.probability === 100 ? '#10b981' : row.probability === 0 ? '#ef4444' : '#3b82f6',
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: 'Close Date',
      selector: (row) => row.closeDate,
      sortable: true,
      cell: (row) => <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>{row.closeDate}</span>,
    },
    {
      name: 'Owner',
      selector: (row) => row.owner,
      cell: (row) => <span style={{ fontSize: '0.8rem' }}>{row.owner}</span>,
    },
    {
      name: '',
      cell: (row) => (
        <div className="d-flex gap-1">
          <Button size="sm" variant="outline-primary" className="btn-action" onClick={simulateAction} title="Edit">
            <BsPencil />
          </Button>
          <Button size="sm" variant="outline-danger" className="btn-action" onClick={simulateAction} title="Delete">
            <BsTrash />
          </Button>
        </div>
      ),
      ignoreRowClick: true,
      width: '90px',
    },
  ];

  const SubHeader = (
    <div className="d-flex align-items-center gap-2 flex-wrap w-100">
      <InputGroup style={{ maxWidth: 260 }}>
        <InputGroup.Text style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
          <BsSearch style={{ color: '#9ca3af' }} />
        </InputGroup.Text>
        <Form.Control
          placeholder="Search deals…"
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
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value as DealStage | 'all')}
          style={{ border: '1px solid #e5e7eb', background: '#f9fafb', fontSize: '0.875rem' }}
        >
          <option value="all">All Stages</option>
          <option value="Discovery">Discovery</option>
          <option value="Proposal">Proposal</option>
          <option value="Negotiation">Negotiation</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </Form.Select>
      </InputGroup>

      <div className="ms-auto d-flex align-items-center gap-3">
        <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
          Pipeline: <strong className="text-money" style={{ color: '#111827' }}>${totalValue.toLocaleString()}</strong>
          &nbsp;·&nbsp;Won: <strong className="text-money" style={{ color: '#10b981' }}>${wonValue.toLocaleString()}</strong>
        </div>
        <Button variant="primary" size="sm" className="d-flex align-items-center gap-1" onClick={simulateAction}>
          <BsPlus style={{ fontSize: '1.1rem' }} /> New Deal
        </Button>
      </div>
    </div>
  );

  return (
    <div className="crm-card" style={{ position: 'relative' }}>
      <LoadingOverlay show={loading} text="Saving…" />
      <DataTable
        columns={columns}
        data={filtered}
        pagination
        paginationPerPage={10}
        highlightOnHover
        pointerOnHover
        selectableRows
        subHeader
        subHeaderComponent={SubHeader}
        subHeaderAlign={'left' as never}
        noDataComponent={
          <div style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af' }}>
            No deals found.
          </div>
        }
      />
    </div>
  );
}
