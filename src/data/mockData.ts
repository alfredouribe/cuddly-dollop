import { Contact, Lead, Deal, Activity, RevenueDataPoint, PipelineStage } from '@/types';

export const contacts: Contact[] = [
  { id: 1, name: 'James Anderson', email: 'james@acmecorp.com', phone: '+1-555-0101', company: 'Acme Corp', status: 'customer', value: 84000, lastContact: '2026-05-01', avatar: 'JA', title: 'VP Engineering', location: 'New York, NY', tags: ['enterprise', 'tech'] },
  { id: 2, name: 'Sarah Mitchell', email: 'sarah@techsolutions.io', phone: '+1-555-0102', company: 'Tech Solutions', status: 'active', value: 32000, lastContact: '2026-04-28', avatar: 'SM', title: 'CEO', location: 'San Francisco, CA', tags: ['startup'] },
  { id: 3, name: 'Robert Chen', email: 'rchen@globalfin.com', phone: '+1-555-0103', company: 'Global Finance', status: 'prospect', value: 120000, lastContact: '2026-04-25', avatar: 'RC', title: 'CFO', location: 'Chicago, IL', tags: ['finance', 'enterprise'] },
  { id: 4, name: 'Emily Davis', email: 'emily@startupco.com', phone: '+1-555-0104', company: 'StartupCo', status: 'active', value: 18000, lastContact: '2026-05-02', avatar: 'ED', title: 'CTO', location: 'Austin, TX', tags: ['startup', 'tech'] },
  { id: 5, name: 'Michael Torres', email: 'mtorres@retailplus.com', phone: '+1-555-0105', company: 'Retail Plus', status: 'customer', value: 56000, lastContact: '2026-04-30', avatar: 'MT', title: 'Head of IT', location: 'Miami, FL', tags: ['retail'] },
  { id: 6, name: 'Jennifer Lee', email: 'jlee@healthtech.io', phone: '+1-555-0106', company: 'HealthTech', status: 'inactive', value: 9000, lastContact: '2026-03-15', avatar: 'JL', title: 'Product Manager', location: 'Boston, MA', tags: ['healthcare'] },
  { id: 7, name: 'David Williams', email: 'dwilliams@mfg.com', phone: '+1-555-0107', company: 'Manufacturing Inc', status: 'prospect', value: 200000, lastContact: '2026-05-03', avatar: 'DW', title: 'COO', location: 'Detroit, MI', tags: ['manufacturing', 'enterprise'] },
  { id: 8, name: 'Lisa Thompson', email: 'lisa@edtech.co', phone: '+1-555-0108', company: 'EdTech Co', status: 'active', value: 24000, lastContact: '2026-04-27', avatar: 'LT', title: 'Director', location: 'Seattle, WA', tags: ['education'] },
  { id: 9, name: 'Kevin Martinez', email: 'kmart@logico.com', phone: '+1-555-0109', company: 'LogiCo', status: 'customer', value: 67000, lastContact: '2026-05-01', avatar: 'KM', title: 'VP Operations', location: 'Dallas, TX', tags: ['logistics'] },
  { id: 10, name: 'Amanda Wilson', email: 'awilson@media.com', phone: '+1-555-0110', company: 'Media Works', status: 'churned', value: 15000, lastContact: '2026-02-10', avatar: 'AW', title: 'CMO', location: 'Los Angeles, CA', tags: ['media'] },
  { id: 11, name: 'Chris Johnson', email: 'cjohnson@cloudbase.io', phone: '+1-555-0111', company: 'CloudBase', status: 'active', value: 45000, lastContact: '2026-04-29', avatar: 'CJ', title: 'CTO', location: 'Denver, CO', tags: ['cloud', 'tech'] },
  { id: 12, name: 'Natalie Brown', email: 'nbrown@ecommerce.com', phone: '+1-555-0112', company: 'eCommerce Hub', status: 'customer', value: 38000, lastContact: '2026-05-04', avatar: 'NB', title: 'Head of Sales', location: 'Phoenix, AZ', tags: ['ecommerce'] },
  { id: 13, name: 'Thomas Garcia', email: 'tgarcia@consulting.com', phone: '+1-555-0113', company: 'Garcia Consulting', status: 'prospect', value: 75000, lastContact: '2026-05-02', avatar: 'TG', title: 'Managing Partner', location: 'Atlanta, GA', tags: ['consulting'] },
  { id: 14, name: 'Rachel Scott', email: 'rscott@nonprofit.org', phone: '+1-555-0114', company: 'Good Cause Org', status: 'active', value: 5000, lastContact: '2026-04-20', avatar: 'RS', title: 'Executive Director', location: 'Portland, OR', tags: ['nonprofit'] },
  { id: 15, name: 'Mark Harris', email: 'mharris@realestate.com', phone: '+1-555-0115', company: 'Prime Realty', status: 'inactive', value: 22000, lastContact: '2026-03-28', avatar: 'MH', title: 'Broker', location: 'Nashville, TN', tags: ['real estate'] },
];

export const leads: Lead[] = [
  { id: 1, name: 'Enterprise CRM Deal', contact: 'David Williams', company: 'Manufacturing Inc', value: 120000, stage: 'Proposal', source: 'Referral', probability: 60, createdAt: '2026-04-01', owner: 'Alex Rivera', priority: 'high' },
  { id: 2, name: 'SaaS Subscription', contact: 'Sarah Mitchell', company: 'Tech Solutions', value: 36000, stage: 'Qualified', source: 'Website', probability: 40, createdAt: '2026-04-10', owner: 'Maria Santos', priority: 'medium' },
  { id: 3, name: 'Analytics Platform', contact: 'Robert Chen', company: 'Global Finance', value: 85000, stage: 'Negotiation', source: 'LinkedIn', probability: 75, createdAt: '2026-03-20', owner: 'Alex Rivera', priority: 'high' },
  { id: 4, name: 'Mobile App Dev', contact: 'Emily Davis', company: 'StartupCo', value: 28000, stage: 'New', source: 'Cold Call', probability: 10, createdAt: '2026-05-01', owner: 'Jake Thompson', priority: 'low' },
  { id: 5, name: 'Cloud Migration', contact: 'Chris Johnson', company: 'CloudBase', value: 55000, stage: 'Contacted', source: 'Trade Show', probability: 25, createdAt: '2026-04-15', owner: 'Maria Santos', priority: 'medium' },
  { id: 6, name: 'Security Audit', contact: 'Kevin Martinez', company: 'LogiCo', value: 18000, stage: 'Qualified', source: 'Email', probability: 45, createdAt: '2026-04-22', owner: 'Jake Thompson', priority: 'medium' },
  { id: 7, name: 'Data Warehouse', contact: 'Thomas Garcia', company: 'Garcia Consulting', value: 95000, stage: 'Proposal', source: 'Referral', probability: 55, createdAt: '2026-03-15', owner: 'Alex Rivera', priority: 'high' },
  { id: 8, name: 'HR Software', contact: 'Lisa Thompson', company: 'EdTech Co', value: 22000, stage: 'New', source: 'Ad', probability: 15, createdAt: '2026-05-03', owner: 'Maria Santos', priority: 'low' },
  { id: 9, name: 'Inventory System', contact: 'Michael Torres', company: 'Retail Plus', value: 42000, stage: 'Negotiation', source: 'Referral', probability: 70, createdAt: '2026-04-05', owner: 'Jake Thompson', priority: 'high' },
  { id: 10, name: 'Customer Portal', contact: 'Natalie Brown', company: 'eCommerce Hub', value: 31000, stage: 'Contacted', source: 'Website', probability: 30, createdAt: '2026-04-18', owner: 'Alex Rivera', priority: 'medium' },
  { id: 11, name: 'AI Chatbot', contact: 'James Anderson', company: 'Acme Corp', value: 65000, stage: 'Qualified', source: 'LinkedIn', probability: 50, createdAt: '2026-04-12', owner: 'Maria Santos', priority: 'high' },
  { id: 12, name: 'Training Program', contact: 'Rachel Scott', company: 'Good Cause Org', value: 8000, stage: 'Closed', source: 'Email', probability: 95, createdAt: '2026-03-10', owner: 'Jake Thompson', priority: 'low' },
];

export const deals: Deal[] = [
  { id: 1, name: 'Acme Enterprise License', contact: 'James Anderson', company: 'Acme Corp', amount: 84000, stage: 'Negotiation', probability: 80, closeDate: '2026-06-30', owner: 'Alex Rivera', createdAt: '2026-02-01' },
  { id: 2, name: 'Global Finance Analytics', contact: 'Robert Chen', company: 'Global Finance', amount: 120000, stage: 'Proposal', probability: 60, closeDate: '2026-07-15', owner: 'Alex Rivera', createdAt: '2026-02-15' },
  { id: 3, name: 'LogiCo Inventory Suite', contact: 'Kevin Martinez', company: 'LogiCo', amount: 67000, stage: 'Won', probability: 100, closeDate: '2026-04-30', owner: 'Jake Thompson', createdAt: '2026-01-20' },
  { id: 4, name: 'Retail Plus E-Commerce', contact: 'Michael Torres', company: 'Retail Plus', amount: 56000, stage: 'Won', probability: 100, closeDate: '2026-04-15', owner: 'Maria Santos', createdAt: '2026-01-10' },
  { id: 5, name: 'Tech Solutions SaaS', contact: 'Sarah Mitchell', company: 'Tech Solutions', amount: 32000, stage: 'Discovery', probability: 20, closeDate: '2026-08-01', owner: 'Jake Thompson', createdAt: '2026-03-05' },
  { id: 6, name: 'CloudBase Migration', contact: 'Chris Johnson', company: 'CloudBase', amount: 45000, stage: 'Proposal', probability: 55, closeDate: '2026-07-30', owner: 'Maria Santos', createdAt: '2026-03-01' },
  { id: 7, name: 'Garcia Data Warehouse', contact: 'Thomas Garcia', company: 'Garcia Consulting', amount: 95000, stage: 'Negotiation', probability: 75, closeDate: '2026-06-15', owner: 'Alex Rivera', createdAt: '2026-02-20' },
  { id: 8, name: 'Media Works CMS', contact: 'Amanda Wilson', company: 'Media Works', amount: 15000, stage: 'Lost', probability: 0, closeDate: '2026-03-31', owner: 'Jake Thompson', createdAt: '2026-01-15' },
  { id: 9, name: 'eCommerce Hub Platform', contact: 'Natalie Brown', company: 'eCommerce Hub', amount: 38000, stage: 'Discovery', probability: 25, closeDate: '2026-09-01', owner: 'Maria Santos', createdAt: '2026-03-25' },
  { id: 10, name: 'Manufacturing ERP', contact: 'David Williams', company: 'Manufacturing Inc', amount: 200000, stage: 'Proposal', probability: 45, closeDate: '2026-10-01', owner: 'Alex Rivera', createdAt: '2026-04-01' },
];

export const activities: Activity[] = [
  { id: 1, type: 'call', contact: 'James Anderson', description: 'Discovery call — discussed enterprise needs', time: '10 minutes ago', icon: 'telephone', color: 'success' },
  { id: 2, type: 'email', contact: 'Robert Chen', description: 'Sent revised proposal for Analytics Platform', time: '45 minutes ago', icon: 'envelope', color: 'primary' },
  { id: 3, type: 'meeting', contact: 'David Williams', description: 'Onsite demo at Manufacturing Inc HQ', time: '2 hours ago', icon: 'people', color: 'info' },
  { id: 4, type: 'deal', contact: 'Kevin Martinez', description: 'Closed deal: LogiCo Inventory Suite $67,000', time: '4 hours ago', icon: 'trophy', color: 'warning' },
  { id: 5, type: 'note', contact: 'Sarah Mitchell', description: 'Added follow-up note about budget timeline', time: 'Yesterday, 3:20 PM', icon: 'sticky', color: 'secondary' },
  { id: 6, type: 'task', contact: 'Thomas Garcia', description: 'Scheduled product demo for Garcia Consulting', time: 'Yesterday, 11:00 AM', icon: 'check2-circle', color: 'primary' },
  { id: 7, type: 'email', contact: 'Chris Johnson', description: 'Responded to CloudBase migration questions', time: '2 days ago', icon: 'envelope', color: 'primary' },
  { id: 8, type: 'call', contact: 'Emily Davis', description: 'Initial outreach call with StartupCo', time: '2 days ago', icon: 'telephone', color: 'success' },
];

export const revenueData: RevenueDataPoint[] = [
  { month: 'Jan', revenue: 42000, target: 40000, expenses: 18000 },
  { month: 'Feb', revenue: 55000, target: 45000, expenses: 21000 },
  { month: 'Mar', revenue: 48000, target: 50000, expenses: 19500 },
  { month: 'Apr', revenue: 63000, target: 55000, expenses: 24000 },
  { month: 'May', revenue: 71000, target: 60000, expenses: 26000 },
  { month: 'Jun', revenue: 58000, target: 65000, expenses: 22500 },
  { month: 'Jul', revenue: 79000, target: 70000, expenses: 28000 },
  { month: 'Aug', revenue: 85000, target: 75000, expenses: 31000 },
  { month: 'Sep', revenue: 92000, target: 80000, expenses: 33000 },
  { month: 'Oct', revenue: 88000, target: 85000, expenses: 30000 },
  { month: 'Nov', revenue: 105000, target: 90000, expenses: 38000 },
  { month: 'Dec', revenue: 118000, target: 95000, expenses: 42000 },
];

export const pipelineData: PipelineStage[] = [
  { stage: 'Discovery', count: 3, value: 248000 },
  { stage: 'Proposal', count: 4, value: 421000 },
  { stage: 'Negotiation', count: 3, value: 299000 },
  { stage: 'Won', count: 2, value: 123000 },
  { stage: 'Lost', count: 1, value: 15000 },
];

export const sourceData = [
  { name: 'Website', value: 32, color: '#3b82f6' },
  { name: 'Referral', value: 28, color: '#10b981' },
  { name: 'LinkedIn', value: 18, color: '#0077b5' },
  { name: 'Cold Call', value: 10, color: '#f59e0b' },
  { name: 'Trade Show', value: 7, color: '#8b5cf6' },
  { name: 'Email', value: 5, color: '#ef4444' },
];
