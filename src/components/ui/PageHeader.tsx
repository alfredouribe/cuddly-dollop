import { ReactNode } from 'react';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: ReactNode;
}

export default function PageHeader({ title, subtitle, breadcrumbs, actions }: PageHeaderProps) {
  return (
    <div className="page-header d-flex align-items-start justify-content-between flex-wrap gap-3">
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className={`breadcrumb-item ${i === breadcrumbs.length - 1 ? 'active' : ''}`}>
                  {crumb.href && i < breadcrumbs.length - 1 ? (
                    <a href={crumb.href}>{crumb.label}</a>
                  ) : (
                    crumb.label
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="page-header-title">{title}</h1>
        {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
      </div>
      {actions && <div className="d-flex gap-2 flex-wrap">{actions}</div>}
    </div>
  );
}
