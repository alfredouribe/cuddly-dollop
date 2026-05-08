export type ContactStatus = 'active' | 'inactive' | 'prospect' | 'customer' | 'churned';
export type LeadStage = 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed';
export type DealStage = 'Discovery' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
export type LeadSource = 'Website' | 'Referral' | 'LinkedIn' | 'Email' | 'Cold Call' | 'Trade Show' | 'Ad';
export type ActivityType = 'call' | 'email' | 'meeting' | 'note' | 'task' | 'deal';
export type Priority = 'low' | 'medium' | 'high';

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: ContactStatus;
  value: number;
  lastContact: string;
  avatar: string;
  title: string;
  location: string;
  tags: string[];
}

export interface Lead {
  id: number;
  name: string;
  contact: string;
  company: string;
  value: number;
  stage: LeadStage;
  source: LeadSource;
  probability: number;
  createdAt: string;
  owner: string;
  priority: Priority;
}

export interface Deal {
  id: number;
  name: string;
  contact: string;
  company: string;
  amount: number;
  stage: DealStage;
  probability: number;
  closeDate: string;
  owner: string;
  createdAt: string;
}

export interface Activity {
  id: number;
  type: ActivityType;
  contact: string;
  description: string;
  time: string;
  icon: string;
  color: string;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  target: number;
  expenses: number;
}

export interface PipelineStage {
  stage: string;
  count: number;
  value: number;
}
