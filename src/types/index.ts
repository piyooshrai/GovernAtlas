export interface Tool {
  id: string;
  name: string;
  slug: string;
  vendor: string;
  tagline: string;
  description: string;
  industries: Industry[];
  useCases: UseCase[];
  score: number;
  reviews: number;
  verified: boolean;
  location: string;
  size: string;
  certifications: Certification[];
  pricing: PricingTier;
  founded: number;
  website: string;
  features: string[];
  integrations: string[];
  deploymentOptions: DeploymentOption[];
  supportOptions: string[];
  lastUpdated: string;
}

export type Industry =
  | 'Healthcare'
  | 'Financial Services'
  | 'Legal'
  | 'Government'
  | 'Insurance'
  | 'Pharmaceutical'
  | 'Energy'
  | 'Education';

export type UseCase =
  | 'Document Processing'
  | 'Customer Service'
  | 'Risk Analysis'
  | 'Compliance Automation'
  | 'Research & Discovery'
  | 'Claims Processing'
  | 'Contract Analysis'
  | 'Fraud Detection'
  | 'Clinical Documentation'
  | 'Regulatory Reporting';

export type Certification =
  | 'SOC 2'
  | 'SOC 2 Type II'
  | 'HIPAA'
  | 'HITRUST'
  | 'ISO 27001'
  | 'FedRAMP'
  | 'StateRAMP'
  | 'PCI DSS'
  | 'GDPR'
  | 'CCPA'
  | 'FDA 21 CFR Part 11';

export type PricingTier = 'Free' | 'Freemium' | 'Subscription' | 'Enterprise' | 'Contact Sales';

export type DeploymentOption = 'Cloud' | 'On-Premise' | 'Hybrid' | 'Private Cloud';

export interface Review {
  id: string;
  toolId: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  title: string;
  content: string;
  pros: string[];
  cons: string[];
  date: string;
  verified: boolean;
}

export interface FilterState {
  search: string;
  industries: Industry[];
  useCases: UseCase[];
  certifications: Certification[];
  verified: boolean;
  minScore: number;
  pricing: PricingTier[];
  deploymentOptions: DeploymentOption[];
}

export interface CompareState {
  tools: Tool[];
  maxTools: number;
}
