import { Activity } from '@/types';
import {
  BsTelephone, BsEnvelope, BsPeople, BsTrophy,
  BsSticky, BsCheckCircle,
} from 'react-icons/bs';

const iconMap: Record<string, React.ElementType> = {
  telephone: BsTelephone,
  envelope: BsEnvelope,
  people: BsPeople,
  trophy: BsTrophy,
  sticky: BsSticky,
  'check2-circle': BsCheckCircle,
};

const colorMap: Record<string, string> = {
  success: '#10b981',
  primary: '#3b82f6',
  info: '#06b6d4',
  warning: '#f59e0b',
  secondary: '#6b7280',
};

interface ActivityTimelineProps {
  activities: Activity[];
}

export default function ActivityTimeline({ activities }: ActivityTimelineProps) {
  return (
    <ul className="timeline">
      {activities.map((a) => {
        const Icon = iconMap[a.icon] ?? BsCheckCircle;
        const bg = colorMap[a.color] ?? '#6b7280';
        return (
          <li key={a.id} className="timeline-item">
            <div className="timeline-icon" style={{ background: bg }}>
              <Icon />
            </div>
            <div className="timeline-content">
              <div className="timeline-name">{a.contact}</div>
              <div className="timeline-desc">{a.description}</div>
              <div className="timeline-time">{a.time}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
