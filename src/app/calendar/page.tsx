'use client';
import { useState } from 'react';
import { Row, Col, Button, Badge } from 'react-bootstrap';
import { BsChevronLeft, BsChevronRight, BsPlus, BsTelephone, BsPeople, BsEnvelope, BsCheckCircle } from 'react-icons/bs';
import AdminLayout from '@/components/layout/AdminLayout';
import PageHeader from '@/components/ui/PageHeader';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

interface CalEvent {
  day: number;
  time: string;
  title: string;
  contact: string;
  type: 'call' | 'meeting' | 'email' | 'task';
  color: string;
}

const events: CalEvent[] = [
  { day: 6,  time: '09:00', title: 'Discovery Call', contact: 'James Anderson', type: 'call', color: '#3b82f6' },
  { day: 6,  time: '14:00', title: 'Proposal Review', contact: 'Robert Chen', type: 'meeting', color: '#8b5cf6' },
  { day: 7,  time: '10:30', title: 'Follow-up Email', contact: 'Sarah Mitchell', type: 'email', color: '#10b981' },
  { day: 8,  time: '11:00', title: 'Demo Session', contact: 'David Williams', type: 'meeting', color: '#8b5cf6' },
  { day: 8,  time: '16:00', title: 'Close Call', contact: 'Kevin Martinez', type: 'call', color: '#3b82f6' },
  { day: 9,  time: '09:30', title: 'Contract Review', contact: 'Thomas Garcia', type: 'task', color: '#f59e0b' },
  { day: 12, time: '10:00', title: 'Quarterly Review', contact: 'All Team', type: 'meeting', color: '#ef4444' },
  { day: 13, time: '14:30', title: 'Cold Outreach', contact: 'New Prospects', type: 'email', color: '#10b981' },
  { day: 15, time: '11:00', title: 'Renewal Discussion', contact: 'Michael Torres', type: 'call', color: '#3b82f6' },
  { day: 19, time: '09:00', title: 'Onboarding Call', contact: 'Natalie Brown', type: 'call', color: '#3b82f6' },
  { day: 20, time: '15:00', title: 'Pipeline Review', contact: 'Sales Team', type: 'meeting', color: '#8b5cf6' },
  { day: 22, time: '10:00', title: 'Proposal Send', contact: 'Emily Davis', type: 'task', color: '#f59e0b' },
  { day: 27, time: '14:00', title: 'Final Negotiation', contact: 'Global Finance', type: 'meeting', color: '#ef4444' },
];

const typeIcon: Record<string, React.ElementType> = {
  call: BsTelephone,
  meeting: BsPeople,
  email: BsEnvelope,
  task: BsCheckCircle,
};

function buildCalendar(year: number, month: number) {
  const first = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function CalendarPage() {
  const today = new Date(2026, 4, 6); // May 6, 2026
  const [current, setCurrent] = useState({ year: today.getFullYear(), month: today.getMonth() });

  const cells = buildCalendar(current.year, current.month);
  const todayDay = today.getMonth() === current.month ? today.getDate() : -1;

  const eventsForDay = (day: number) => events.filter((e) => e.day === day);

  const prev = () => setCurrent(({ year, month }) => month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 });
  const next = () => setCurrent(({ year, month }) => month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 });

  const upcomingEvents = events.filter((e) => e.day >= today.getDate()).slice(0, 6);

  return (
    <AdminLayout>
      <PageHeader
        title="Calendar"
        subtitle="Upcoming meetings, calls, and tasks."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Calendar' }]}
        actions={
          <Button variant="primary" size="sm" className="d-flex align-items-center gap-1">
            <BsPlus style={{ fontSize: '1.1rem' }} /> New Event
          </Button>
        }
      />

      <Row className="g-3">
        {/* Calendar grid */}
        <Col xs={12} lg={8}>
          <div className="crm-card">
            <div className="crm-card-header">
              <div className="d-flex align-items-center gap-3">
                <Button variant="outline-secondary" size="sm" className="btn-action" onClick={prev}><BsChevronLeft /></Button>
                <h6 className="crm-card-title mb-0">{MONTHS[current.month]} {current.year}</h6>
                <Button variant="outline-secondary" size="sm" className="btn-action" onClick={next}><BsChevronRight /></Button>
              </div>
              <Button variant="outline-secondary" size="sm" onClick={() => setCurrent({ year: today.getFullYear(), month: today.getMonth() })} style={{ fontSize: '0.78rem' }}>Today</Button>
            </div>

            <div className="crm-card-body p-0">
              {/* Day headers */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', borderBottom: '1px solid #f3f4f6' }}>
                {DAYS.map((d) => (
                  <div key={d} style={{ textAlign: 'center', padding: '0.5rem', fontSize: '0.72rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{d}</div>
                ))}
              </div>

              {/* Cells */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)' }}>
                {cells.map((day, i) => {
                  const dayEvents = day ? eventsForDay(day) : [];
                  const isToday = day === todayDay;
                  return (
                    <div
                      key={i}
                      style={{
                        minHeight: 80,
                        padding: '0.4rem',
                        borderRight: (i + 1) % 7 !== 0 ? '1px solid #f9fafb' : 'none',
                        borderBottom: '1px solid #f9fafb',
                        background: day ? '#fff' : '#fafafa',
                        cursor: day ? 'pointer' : 'default',
                        position: 'relative',
                      }}
                    >
                      {day && (
                        <>
                          <div style={{ width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: isToday ? 700 : 500, background: isToday ? '#3b82f6' : 'transparent', color: isToday ? '#fff' : '#374151', marginBottom: 2 }}>
                            {day}
                          </div>
                          {dayEvents.slice(0, 2).map((ev, ei) => (
                            <div key={ei} style={{ background: ev.color + '18', color: ev.color, fontSize: '0.65rem', fontWeight: 600, padding: '1px 5px', borderRadius: 3, marginBottom: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', borderLeft: `2px solid ${ev.color}` }}>
                              {ev.time} {ev.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div style={{ fontSize: '0.62rem', color: '#9ca3af', paddingLeft: 2 }}>+{dayEvents.length - 2} more</div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Col>

        {/* Upcoming events */}
        <Col xs={12} lg={4}>
          <div className="crm-card">
            <div className="crm-card-header">
              <h6 className="crm-card-title">Upcoming Events</h6>
              <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{MONTHS[current.month]}</span>
            </div>
            <div className="crm-card-body p-0">
              {upcomingEvents.map((ev, i) => {
                const Icon = typeIcon[ev.type];
                return (
                  <div key={i} className="d-flex align-items-start gap-3 px-4 py-3" style={{ borderBottom: '1px solid #f3f4f6', cursor: 'pointer' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: ev.color + '18', color: ev.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.85rem' }}>
                      <Icon />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="fw-semibold" style={{ fontSize: '0.83rem', color: '#111827' }}>{ev.title}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{ev.contact}</div>
                      <div style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: 1 }}>May {ev.day} · {ev.time}</div>
                    </div>
                    <span style={{ fontSize: '0.65rem', background: ev.color + '18', color: ev.color, padding: '2px 7px', borderRadius: 10, fontWeight: 600, whiteSpace: 'nowrap' }}>{ev.type}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick stats */}
          <div className="crm-card mt-3">
            <div className="crm-card-header">
              <h6 className="crm-card-title">This Month</h6>
            </div>
            <div className="crm-card-body">
              {[
                { label: 'Total Events', value: events.length, color: '#3b82f6' },
                { label: 'Meetings', value: events.filter(e => e.type === 'meeting').length, color: '#8b5cf6' },
                { label: 'Calls', value: events.filter(e => e.type === 'call').length, color: '#10b981' },
                { label: 'Tasks', value: events.filter(e => e.type === 'task').length, color: '#f59e0b' },
              ].map((s) => (
                <div key={s.label} className="d-flex justify-content-between align-items-center py-2" style={{ borderBottom: '1px solid #f9fafb' }}>
                  <span style={{ fontSize: '0.83rem', color: '#374151' }}>{s.label}</span>
                  <span style={{ fontWeight: 700, color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </AdminLayout>
  );
}
