'use client';
import { useMemo } from 'react';
import { Lead, LeadStage } from '@/types';

const STAGES: LeadStage[] = ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Closed'];

const stageColors: Record<LeadStage, string> = {
  New: '#6b7280',
  Contacted: '#3b82f6',
  Qualified: '#8b5cf6',
  Proposal: '#f59e0b',
  Negotiation: '#06b6d4',
  Closed: '#10b981',
};

const priorityColors: Record<string, string> = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#10b981',
};

interface LeadsBoardProps {
  data: Lead[];
}

export default function LeadsBoard({ data }: LeadsBoardProps) {
  const columns = useMemo(
    () =>
      STAGES.map((stage) => ({
        stage,
        items: data.filter((l) => l.stage === stage),
        total: data.filter((l) => l.stage === stage).reduce((s, l) => s + l.value, 0),
      })),
    [data]
  );

  return (
    <div className="kanban-board">
      {columns.map(({ stage, items, total }) => (
        <div key={stage} className="kanban-column">
          <div className="kanban-column-header">
            <span className="kanban-column-title" style={{ color: stageColors[stage] }}>
              {stage}
            </span>
            <span className="kanban-column-count">{items.length}</span>
          </div>

          {total > 0 && (
            <div className="kanban-column-total mb-1">
              ${total.toLocaleString()} total
            </div>
          )}

          {items.map((lead) => (
            <div key={lead.id} className="kanban-card">
              <div className="kanban-card-title">{lead.name}</div>
              <div className="kanban-card-company">{lead.contact} · {lead.company}</div>
              <div className="kanban-card-value">${lead.value.toLocaleString()}</div>
              <div className="kanban-card-footer">
                <span
                  className={`badge-priority badge text-uppercase`}
                  style={{
                    fontSize: '0.65rem',
                    background: priorityColors[lead.priority] + '22',
                    color: priorityColors[lead.priority],
                    padding: '2px 8px',
                    borderRadius: 10,
                    fontWeight: 700,
                  }}
                >
                  {lead.priority}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{lead.probability}% prob.</span>
                  <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{lead.source}</span>
                </div>
              </div>
              <div style={{ marginTop: '0.5rem' }}>
                <div className="prob-bar">
                  <div
                    className="prob-bar-inner"
                    style={{ width: `${lead.probability}%`, background: stageColors[stage] }}
                  />
                </div>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div
              style={{
                border: '2px dashed #e5e7eb',
                borderRadius: 8,
                padding: '1.5rem',
                textAlign: 'center',
                color: '#d1d5db',
                fontSize: '0.78rem',
              }}
            >
              No leads
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
