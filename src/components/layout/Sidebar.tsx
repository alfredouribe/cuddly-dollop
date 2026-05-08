'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BsSpeedometer2, BsPeople, BsFunnel, BsBriefcase,
  BsBarChartLine, BsCalendar3, BsGear, BsQuestionCircle,
  BsBoxArrowRight, BsGraphUp, BsEnvelope, BsBell,
} from 'react-icons/bs';

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onOverlayClick: () => void;
}

const navItems = [
  {
    section: 'Main',
    items: [
      { href: '/', label: 'Dashboard', icon: BsSpeedometer2 },
    ],
  },
  {
    section: 'CRM',
    items: [
      { href: '/contacts', label: 'Contacts', icon: BsPeople, badge: '15' },
      { href: '/leads', label: 'Leads', icon: BsFunnel, badge: '12' },
      { href: '/deals', label: 'Deals', icon: BsBriefcase, badge: '10' },
      { href: '/calendar', label: 'Calendar', icon: BsCalendar3 },
    ],
  },
  {
    section: 'Analytics',
    items: [
      { href: '/reports', label: 'Reports', icon: BsBarChartLine },
      { href: '/reports#revenue', label: 'Revenue', icon: BsGraphUp },
    ],
  },
  {
    section: 'Tools',
    items: [
      { href: '#', label: 'Email Campaigns', icon: BsEnvelope },
      { href: '#', label: 'Notifications', icon: BsBell, badge: '3' },
    ],
  },
];

export default function Sidebar({ collapsed, mobileOpen, onOverlayClick }: SidebarProps) {
  const pathname = usePathname();

  const sidebarClass = [
    'admin-sidebar',
    collapsed ? 'sidebar-collapsed' : '',
    mobileOpen ? 'mobile-open' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <div className={`sidebar-overlay ${mobileOpen ? 'visible' : ''}`} onClick={onOverlayClick} />
      <aside className={sidebarClass}>
        {/* Brand */}
        <Link href="/" className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <BsBriefcase />
          </div>
          <span className="sidebar-brand-text">CRM<span>Pro</span></span>
        </Link>

        {/* User panel */}
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">AU</div>
          <div style={{ minWidth: 0 }}>
            <div className="sidebar-user-name">Alfredo Uribe</div>
            <div className="sidebar-user-role">Sales Manager</div>
          </div>
          <div className="sidebar-user-status" title="Online" />
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((group) => (
            <div key={group.section}>
              <div className="sidebar-section-label">{group.section}</div>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = item.href !== '#' && (
                  item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
                );
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                  >
                    <Icon className="nav-icon" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`sidebar-nav-badge badge ${isActive ? 'bg-primary' : 'bg-secondary'}`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <Link href="#" className="sidebar-footer-btn">
            <BsGear style={{ fontSize: '0.9rem' }} />
            <span>Settings</span>
          </Link>
          <Link href="#" className="sidebar-footer-btn">
            <BsQuestionCircle style={{ fontSize: '0.9rem' }} />
            <span>Help</span>
          </Link>
          <button className="sidebar-footer-btn" style={{ background: 'none', border: '1px solid rgba(255,255,255,0.08)' }}>
            <BsBoxArrowRight style={{ fontSize: '0.9rem' }} />
          </button>
        </div>
      </aside>
    </>
  );
}
