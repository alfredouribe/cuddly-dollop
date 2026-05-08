'use client';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import Footer from './Footer';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Auto-collapse on small screens
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 991.98px)');
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setCollapsed(true);
    };
    if (mq.matches) setCollapsed(true);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleToggle = () => {
    if (window.matchMedia('(max-width: 991.98px)').matches) {
      setMobileOpen((v) => !v);
    } else {
      setCollapsed((v) => !v);
    }
  };

  return (
    <div className="admin-wrapper">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onOverlayClick={() => setMobileOpen(false)}
      />
      <div className={`admin-main ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <TopNavbar collapsed={collapsed} onToggle={handleToggle} />
        <main className="admin-content page-enter">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
