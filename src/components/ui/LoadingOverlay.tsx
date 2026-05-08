'use client';

interface LoadingOverlayProps {
  show: boolean;
  fullPage?: boolean;
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function LoadingOverlay({
  show,
  fullPage = false,
  text = 'Loading…',
  size = 'md',
}: LoadingOverlayProps) {
  if (!show) return null;
  return (
    <div className={`loading-overlay ${fullPage ? 'full-page' : ''}`}>
      <div className={`spinner-ring ${size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : ''}`} />
      {text && <span className="loading-overlay-text">{text}</span>}
    </div>
  );
}

/* Inline spinner — use inside buttons or small areas */
export function Spinner({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) {
  return <div className={`spinner-ring ${size}`} style={{ display: 'inline-block' }} />;
}
