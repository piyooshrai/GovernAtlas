import { Industry } from '@/types';

export interface IndustryData {
  name: Industry;
  slug: string;
  description: string;
  longDescription: string;
  icon: string;
  regulations: string[];
  certifications: string[];
  useCases: string[];
  complianceConsiderations: string[];
}

export const industriesData: IndustryData[] = [
  {
    name: 'Healthcare',
    slug: 'healthcare',
    description: 'AI tools for clinical documentation, diagnostics, and healthcare operations',
    longDescription: 'The healthcare industry is rapidly adopting AI for clinical documentation, diagnostic imaging, patient engagement, and operational efficiency. With stringent regulations around patient data and clinical decision-making, healthcare organizations require AI tools that meet rigorous compliance standards while improving care delivery.',
    icon: 'Shield',
    regulations: ['HIPAA', 'HITECH Act', '21st Century Cures Act', 'FDA AI/ML Guidance', 'State Privacy Laws'],
    certifications: ['HIPAA', 'HITRUST', 'SOC 2 Type II', 'FDA 21 CFR Part 11'],
    useCases: [
      'Clinical documentation and ambient AI scribes',
      'Medical imaging and diagnostic AI',
      'Patient engagement and communication',
      'Revenue cycle and coding automation',
      'Population health management',
      'Care coordination and workflow optimization',
      'Drug discovery and clinical trials',
      'Predictive analytics for patient outcomes',
    ],
    complianceConsiderations: [
      'HIPAA Business Associate Agreements (BAAs) must be in place',
      'PHI must be encrypted at rest and in transit',
      'Clinical AI may require FDA clearance depending on intended use',
      'Human oversight required for clinical decision support',
      'Audit trails for all access to patient data',
    ],
  },
  {
    name: 'Financial Services',
    slug: 'financial-services',
    description: 'AI solutions for banking, wealth management, and compliance',
    longDescription: 'Financial services organizations leverage AI for fraud detection, risk assessment, customer service, and regulatory compliance. With strict oversight from federal regulators and the need to protect sensitive financial data, these institutions require AI tools that can demonstrate security, explainability, and fair lending practices.',
    icon: 'TrendingUp',
    regulations: ['SOX', 'GLBA', 'Dodd-Frank', 'BSA/AML', 'ECOA', 'FCRA', 'State Banking Regulations'],
    certifications: ['SOC 2 Type II', 'ISO 27001', 'PCI DSS', 'GDPR', 'CCPA'],
    useCases: [
      'Fraud detection and prevention',
      'Know Your Customer (KYC) automation',
      'Anti-money laundering (AML) monitoring',
      'Credit risk assessment and underwriting',
      'Customer service and chatbots',
      'Wealth management and robo-advisors',
      'Regulatory reporting automation',
      'Document processing and extraction',
    ],
    complianceConsiderations: [
      'Model risk management per SR 11-7 guidance',
      'Fair lending requirements and bias testing',
      'Explainability for credit decisions',
      'Data retention and audit trail requirements',
      'Third-party risk management programs',
    ],
  },
  {
    name: 'Legal',
    slug: 'legal',
    description: 'AI-powered legal research, contract analysis, and case management',
    longDescription: 'Law firms and legal departments are adopting AI to accelerate research, automate contract review, and improve matter management. With client confidentiality requirements and ethical obligations, legal organizations need AI tools that maintain privilege, ensure accuracy, and meet professional responsibility standards.',
    icon: 'Scale',
    regulations: ['ABA Model Rules', 'State Bar Ethics Rules', 'Client Confidentiality Requirements', 'Data Protection Laws'],
    certifications: ['SOC 2 Type II', 'ISO 27001', 'GDPR', 'CCPA'],
    useCases: [
      'Legal research and case law analysis',
      'Contract review and clause extraction',
      'Due diligence automation',
      'E-discovery and document review',
      'Matter management and workflow',
      'Legal drafting assistance',
      'Billing and time tracking',
      'Regulatory compliance monitoring',
    ],
    complianceConsiderations: [
      'Attorney-client privilege must be maintained',
      'Conflicts checking before data processing',
      'Data residency for international matters',
      'Ethical obligations for AI-assisted work product',
      'Professional liability considerations',
    ],
  },
  {
    name: 'Government',
    slug: 'government',
    description: 'FedRAMP authorized AI tools for citizen services and operations',
    longDescription: 'Federal, state, and local government agencies are deploying AI to improve citizen services, enhance national security, and increase operational efficiency. With rigorous security requirements and public accountability standards, government buyers require AI tools that meet FedRAMP, StateRAMP, and other government-specific certifications.',
    icon: 'Landmark',
    regulations: ['FedRAMP', 'FISMA', 'NIST Frameworks', 'Executive Orders on AI', 'StateRAMP', 'CJIS'],
    certifications: ['FedRAMP', 'FedRAMP Authorized', 'StateRAMP', 'SOC 2 Type II', 'ISO 27001'],
    useCases: [
      'Citizen services and chatbots',
      'Document processing and forms automation',
      'Fraud detection in benefits programs',
      'Defense and intelligence applications',
      'Public safety and law enforcement',
      'Infrastructure monitoring',
      'Regulatory compliance and reporting',
      'Grant management and administration',
    ],
    complianceConsiderations: [
      'FedRAMP authorization required for federal cloud services',
      'FISMA compliance for information security',
      'Section 508 accessibility requirements',
      'Procurement regulations (FAR/DFAR)',
      'Public records and FOIA considerations',
    ],
  },
  {
    name: 'Insurance',
    slug: 'insurance',
    description: 'AI tools for claims processing, underwriting, and fraud detection',
    longDescription: 'Insurance companies are leveraging AI across the value chain, from underwriting and pricing to claims processing and fraud detection. With state insurance regulations and fair practice requirements, insurers need AI tools that can demonstrate accuracy, fairness, and regulatory compliance.',
    icon: 'ShieldCheck',
    regulations: ['State Insurance Regulations', 'NAIC Model Acts', 'Fair Credit Reporting Act', 'State Data Privacy Laws'],
    certifications: ['SOC 2 Type II', 'ISO 27001', 'HIPAA', 'PCI DSS'],
    useCases: [
      'Automated underwriting',
      'Claims processing and adjudication',
      'Fraud detection and investigation',
      'Customer service and self-service',
      'Property damage assessment',
      'Risk modeling and pricing',
      'Document extraction and processing',
      'Policyholder engagement',
    ],
    complianceConsiderations: [
      'State insurance commissioner approval for rating algorithms',
      'Fair pricing and non-discrimination requirements',
      'Explanation of adverse underwriting decisions',
      'Claims handling timeframe regulations',
      'Data breach notification requirements',
    ],
  },
  {
    name: 'Pharmaceutical',
    slug: 'pharmaceutical',
    description: 'AI solutions for drug discovery and regulatory compliance',
    longDescription: 'Pharmaceutical and life sciences companies are using AI to accelerate drug discovery, optimize clinical trials, and ensure regulatory compliance. With FDA oversight and patient safety requirements, these organizations need AI tools that meet GxP standards and can withstand regulatory scrutiny.',
    icon: 'Pill',
    regulations: ['FDA 21 CFR Part 11', 'GxP Requirements', 'ICH Guidelines', 'HIPAA', 'EU Clinical Trials Regulation'],
    certifications: ['FDA 21 CFR Part 11', 'SOC 2 Type II', 'ISO 27001', 'HIPAA', 'GDPR'],
    useCases: [
      'Drug discovery and target identification',
      'Clinical trial optimization',
      'Pharmacovigilance and safety monitoring',
      'Regulatory submission automation',
      'Manufacturing quality control',
      'Supply chain optimization',
      'Medical affairs and scientific communication',
      'Real-world evidence analysis',
    ],
    complianceConsiderations: [
      'GxP validation requirements for regulated systems',
      '21 CFR Part 11 electronic records compliance',
      'Computer system validation (CSV)',
      'Data integrity (ALCOA+ principles)',
      'Audit trail and access control requirements',
    ],
  },
  {
    name: 'Education',
    slug: 'education',
    description: 'FERPA-compliant AI tools for learning and administration',
    longDescription: 'Educational institutions from K-12 to higher education are adopting AI for personalized learning, administrative efficiency, and student success. With FERPA requirements and the need to protect student data, schools and universities need AI tools that meet educational privacy standards.',
    icon: 'GraduationCap',
    regulations: ['FERPA', 'COPPA', 'State Student Privacy Laws', 'IDEA', 'Section 504'],
    certifications: ['SOC 2 Type II', 'ISO 27001', 'GDPR', 'Student Data Privacy Consortium'],
    useCases: [
      'Personalized learning platforms',
      'Automated grading and assessment',
      'Student success and early warning systems',
      'Administrative automation',
      'Research assistance',
      'Accessibility and accommodation tools',
      'Enrollment and admissions',
      'Academic integrity monitoring',
    ],
    complianceConsiderations: [
      'FERPA consent requirements for student data',
      'COPPA compliance for K-12 services',
      'Parental rights and access',
      'Accessibility requirements (Section 508)',
      'State student privacy laws and contracts',
    ],
  },
  {
    name: 'Manufacturing',
    slug: 'manufacturing',
    description: 'AI tools for quality control, predictive maintenance, and optimization',
    longDescription: 'Manufacturing companies are deploying AI for predictive maintenance, quality control, supply chain optimization, and operational efficiency. With industry-specific standards and the need for reliable systems, manufacturers need AI tools that can integrate with OT systems and meet quality management requirements.',
    icon: 'Factory',
    regulations: ['ISO 9001', 'ITAR', 'OSHA', 'EPA Regulations', 'Industry-Specific Standards'],
    certifications: ['SOC 2 Type II', 'ISO 27001', 'ISO 9001'],
    useCases: [
      'Predictive maintenance',
      'Quality control and defect detection',
      'Supply chain optimization',
      'Production planning and scheduling',
      'Energy optimization',
      'Safety monitoring',
      'Inventory management',
      'Process optimization',
    ],
    complianceConsiderations: [
      'Integration with existing OT/ICS systems',
      'ITAR compliance for defense manufacturing',
      'Quality management system integration',
      'Safety system requirements',
      'Data security for proprietary processes',
    ],
  },
];

export const getIndustryBySlug = (slug: string): IndustryData | undefined => {
  return industriesData.find(industry => industry.slug === slug);
};

export const getAllIndustrySlugs = (): string[] => {
  return industriesData.map(industry => industry.slug);
};
