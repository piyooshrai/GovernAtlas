export interface Tool {
  id: string;
  name: string;
  slug: string;
  vendor: string;
  vendorLegalName?: string;
  tagline: string;
  description: string;
  industries: Industry[];
  useCases: UseCase[];
  score: number;
  // Governance score breakdown (optional for backward compatibility)
  securityScore?: number;
  transparencyScore?: number;
  fairnessScore?: number;
  privacyScore?: number;
  accountabilityScore?: number;
  reviews: number;
  verified: boolean;
  location: string;
  size: string;
  certifications: Certification[];
  pricing: PricingTier;
  pricingModel?: PricingModel;
  startingPrice?: string;
  freeTier?: boolean;
  freeTrial?: boolean;
  founded: number;
  website: string;
  trustPageUrl?: string;
  privacyPolicyUrl?: string;
  features: string[];
  integrations: string[];
  deploymentOptions: DeploymentOption[];
  supportOptions: string[];
  dataResidency?: string[];
  languagesSupported?: string[];
  apiAvailable?: boolean;
  featured?: boolean;
  lastUpdated: string;
}

export type Industry =
  | 'Healthcare'
  | 'Financial Services'
  | 'Legal'
  | 'Government'
  | 'Insurance'
  | 'Pharmaceutical'
  | 'Education'
  | 'Manufacturing'
  | 'Energy'; // Keep Energy for backward compatibility

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
  | 'Regulatory Reporting'
  | 'Drug Discovery'
  | 'Diagnostics & Imaging'
  | 'Predictive Maintenance'
  | 'Quality Control'
  | 'Legal Research'
  | 'Underwriting';

export type Certification =
  | 'SOC 2'
  | 'SOC 2 Type II'
  | 'HIPAA'
  | 'HITRUST'
  | 'ISO 27001'
  | 'ISO 27701'
  | 'FedRAMP'
  | 'FedRAMP Ready'
  | 'FedRAMP In Process'
  | 'FedRAMP Authorized'
  | 'StateRAMP'
  | 'PCI DSS'
  | 'GDPR'
  | 'CCPA'
  | 'FDA 21 CFR Part 11'
  | 'HIPAA BAA';

export type PricingTier = 'Free' | 'Freemium' | 'Subscription' | 'Enterprise' | 'Contact Sales';

export type PricingModel = 'per_user' | 'per_transaction' | 'flat_rate' | 'usage_based' | 'contact_sales';

export type DeploymentOption = 'Cloud' | 'SaaS' | 'On-Premise' | 'Hybrid' | 'Private Cloud' | 'VPC' | 'Air-gapped';

export type CompanySize = '1-50' | '51-200' | '201-500' | '501-1000' | '1000+';

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
  helpfulCount?: number;
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
  companySize?: string[];
}

export interface CompareState {
  tools: Tool[];
  maxTools: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  authorName: string;
  category: 'compliance' | 'guides' | 'industry-insights' | 'product-updates';
  tags: string[];
  publishedAt: string;
  viewCount: number;
}

export interface Guide {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: 'procurement' | 'compliance' | 'security' | 'industry';
  industry?: Industry;
  downloadCount: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'about' | 'buyers' | 'vendors';
}

export interface GlossaryTerm {
  term: string;
  slug: string;
  definition: string;
  category: 'certifications' | 'privacy' | 'security' | 'deployment' | 'ai';
  relatedTerms?: string[];
}

export interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  subject: 'general' | 'partnership' | 'press' | 'issue' | 'other';
  message: string;
}

export interface VendorSubmission {
  // Company info
  companyName: string;
  companyWebsite: string;
  companyDescription?: string;
  companyLocation: string;
  companySize: string;
  companyFounded: number;
  // Contact info
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  contactRole?: string;
  // Tool info
  toolName: string;
  toolTagline?: string;
  toolDescription: string;
  toolWebsite?: string;
  toolPricing: PricingTier;
  // Arrays
  industries: Industry[];
  useCases: UseCase[];
  certifications: Certification[];
  features: string[];
  integrations: string[];
  deploymentOptions: DeploymentOption[];
  // Trust URLs
  trustPageUrl?: string;
  privacyPolicyUrl?: string;
}

export interface IndustryInfo {
  name: Industry;
  slug: string;
  description: string;
  icon: string;
  toolCount: number;
  regulations: string[];
  certifications: Certification[];
  useCases: string[];
}
