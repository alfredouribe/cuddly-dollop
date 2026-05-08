'use client';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import {
  BsList, BsSearch, BsBell, BsQuestionCircle,
  BsGear, BsPerson, BsBoxArrowRight, BsEnvelope,
  BsChevronDown,
} from 'react-icons/bs';

interface TopNavbarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const notifications = [
  { id: 1, text: 'James Anderson scheduled a call', time: '5m ago', color: '#3b82f6' },
  { id: 2, text: 'New lead from website form', time: '1h ago', color: '#10b981' },
  { id: 3, text: 'Deal "Acme Enterprise" updated', time: '2h ago', color: '#f59e0b' },
  { id: 4, text: 'Q2 pipeline report ready', time: 'Yesterday', color: '#8b5cf6' },
];

export default function TopNavbar({ collapsed, onToggle }: TopNavbarProps) {
  const [searchVal, setSearchVal] = useState('');

  const navClass = ['admin-topnav', collapsed ? 'sidebar-collapsed' : ''].filter(Boolean).join(' ');

  return (
    <header className={navClass}>
      {/* Hamburger */}
      <button className="topnav-toggle" onClick={onToggle} aria-label="Toggle sidebar">
        <BsList />
      </button>

      {/* Search */}
      <div className="topnav-search">
        <BsSearch className="topnav-search-icon" />
        <input
          type="text"
          placeholder="Search contacts, deals, leads…"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </div>

      <div className="topnav-actions">
        {/* Notifications */}
        <Dropdown align="end">
          <Dropdown.Toggle as="button" className="topnav-icon-btn" id="notif-dropdown">
            <BsBell />
            <span className="topnav-badge">4</span>
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ minWidth: 300, padding: 0, borderRadius: 10, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
            <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>Notifications</span>
              <span style={{ fontSize: '0.75rem', color: '#3b82f6', cursor: 'pointer' }}>Mark all read</span>
            </div>
            {notifications.map((n) => (
              <div key={n.id} style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #f9fafb', display: 'flex', gap: '0.75rem', alignItems: 'flex-start', cursor: 'pointer' }} className="hover-lift">
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.color, marginTop: 5, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#374151', fontWeight: 500 }}>{n.text}</div>
                  <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>{n.time}</div>
                </div>
              </div>
            ))}
            <div style={{ padding: '0.625rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: '#3b82f6', cursor: 'pointer' }}>View all notifications</span>
            </div>
          </Dropdown.Menu>
        </Dropdown>

        {/* Messages */}
        <button className="topnav-icon-btn">
          <BsEnvelope />
          <span className="topnav-badge" style={{ background: '#10b981' }}>2</span>
        </button>

        {/* Help */}
        <button className="topnav-icon-btn">
          <BsQuestionCircle />
        </button>

        <div className="topnav-divider" />

        {/* User menu */}
        <Dropdown align="end">
          <Dropdown.Toggle as="div" className="topnav-user" id="user-dropdown" style={{ cursor: 'pointer' }}>
            <div className="topnav-user-avatar">AU</div>
            <div className="d-none d-md-block">
              <div className="topnav-user-name">Alfredo Uribe</div>
              <div className="topnav-user-role">Sales Manager</div>
            </div>
            <BsChevronDown style={{ fontSize: '0.65rem', color: '#9ca3af', marginLeft: 2 }} />
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ minWidth: 200, borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', padding: '0.5rem' }}>
            <div style={{ padding: '0.75rem 1rem 0.5rem', borderBottom: '1px solid #f3f4f6', marginBottom: '0.25rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#111827' }}>Alfredo Uribe</div>
              <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>a.uribe@ca.taly.st</div>
            </div>
            <Dropdown.Item style={{ borderRadius: 6, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BsPerson /> My Profile
            </Dropdown.Item>
            <Dropdown.Item style={{ borderRadius: 6, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BsGear /> Settings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item style={{ borderRadius: 6, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444' }}>
              <BsBoxArrowRight /> Sign Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
}
