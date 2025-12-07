import { BlogPost, Guide, FAQ, GlossaryTerm } from '@/types';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'rise-of-ai-governance',
    title: 'The Rise of AI Governance in Regulated Industries',
    excerpt: 'As AI adoption accelerates in healthcare, finance, and government, organizations are recognizing the critical importance of AI governance frameworks.',
    content: `As AI adoption accelerates in healthcare, finance, and government, organizations are recognizing the critical importance of AI governance frameworks. This shift represents a fundamental change in how regulated industries approach technology adoption.

## The Governance Imperative

For decades, regulated industries have operated under strict compliance frameworks. HIPAA for healthcare, SOX for financial services, FedRAMP for government—these regulations established clear expectations for data handling, security, and accountability. But AI introduces new challenges that traditional frameworks weren't designed to address.

### Key Challenges

**Explainability**: When an AI system denies a loan application or recommends a treatment, stakeholders need to understand why. Black-box models create compliance risks and erode trust.

**Bias**: AI systems can perpetuate or amplify existing biases, leading to discriminatory outcomes that violate fair lending laws or create disparate impacts in healthcare delivery.

**Data Privacy**: AI models often require vast amounts of training data, raising questions about consent, data minimization, and cross-border transfers.

**Accountability**: When an AI system makes an error, who is responsible? The vendor? The implementation team? The organization using it?

## Building a Governance Framework

Organizations adopting AI in regulated industries should consider five key dimensions:

1. **Security**: Ensure the AI system meets industry security standards and has appropriate certifications
2. **Transparency**: Demand clear documentation about model behavior, limitations, and training data
3. **Fairness**: Require bias testing and ongoing monitoring for discriminatory outcomes
4. **Privacy**: Verify compliance with applicable privacy regulations and data handling practices
5. **Accountability**: Establish clear ownership and audit trails for AI-driven decisions

## Looking Ahead

As AI capabilities grow, so will regulatory expectations. Organizations that build robust governance frameworks now will be better positioned to adopt new AI capabilities while maintaining compliance. Those that don't may find themselves facing regulatory scrutiny, reputational damage, or worse.

The key is to start early, involve stakeholders across the organization, and choose vendors that share your commitment to responsible AI.`,
    authorName: 'GovernAtlas Team',
    category: 'industry-insights',
    tags: ['AI Governance', 'Compliance', 'Regulated Industries'],
    publishedAt: '2024-12-01',
    viewCount: 1542,
  },
  {
    id: '2',
    slug: 'questions-to-ask-ai-vendors',
    title: '5 Questions to Ask Every AI Vendor About Data Privacy',
    excerpt: 'Before signing a contract with an AI vendor, make sure you can answer these critical data privacy questions.',
    content: `Before signing a contract with an AI vendor, make sure you can answer these critical data privacy questions. The answers could save you from compliance violations, security breaches, and reputational damage.

## 1. Where Is My Data Stored and Processed?

Data residency matters, especially for organizations subject to GDPR, CCPA, or industry-specific regulations. You need to know:

- Which data centers will store your data?
- Will data ever be transferred across borders?
- Can you specify data residency requirements?

## 2. How Is My Data Used for Model Training?

Many AI vendors use customer data to improve their models. This raises important questions:

- Will our data be used to train models that serve other customers?
- Can we opt out of data being used for training?
- How is training data anonymized or de-identified?

## 3. What Happens to My Data When the Contract Ends?

Data portability and deletion are crucial considerations:

- Can we export all our data in a standard format?
- How long does data deletion take?
- How is deletion verified and documented?

## 4. Who Has Access to My Data?

Understanding access controls is essential:

- Which vendor employees can access customer data?
- Are access logs maintained and available for audit?
- What background checks are performed on personnel with data access?

## 5. What Security Certifications Do You Hold?

Certifications provide third-party validation of security practices:

- SOC 2 Type II for security controls
- ISO 27001 for information security management
- HIPAA BAA availability for healthcare data
- FedRAMP for federal government use

## Getting the Answers

Don't accept vague responses to these questions. Request documentation:

- Privacy policy and data processing agreement
- Security certifications and audit reports
- Data flow diagrams
- Incident response procedures

If a vendor can't provide clear answers, consider it a red flag. The right vendor will embrace these questions as an opportunity to demonstrate their commitment to data privacy.`,
    authorName: 'GovernAtlas Team',
    category: 'guides',
    tags: ['Data Privacy', 'Vendor Evaluation', 'Security'],
    publishedAt: '2024-11-28',
    viewCount: 2341,
  },
  {
    id: '3',
    slug: 'fedramp-vs-stateramp',
    title: 'FedRAMP vs StateRAMP: What\'s the Difference?',
    excerpt: 'Understanding the differences between federal and state cloud security frameworks for AI tool procurement.',
    content: `Understanding the differences between federal and state cloud security frameworks is crucial for government organizations evaluating AI tools. Here's what you need to know about FedRAMP and StateRAMP.

## What Is FedRAMP?

The Federal Risk and Authorization Management Program (FedRAMP) is a government-wide program that provides a standardized approach to security assessment, authorization, and continuous monitoring for cloud products and services used by federal agencies.

### FedRAMP Authorization Levels

- **Low**: For systems where loss would have limited adverse effect
- **Moderate**: For systems where loss would have serious adverse effect
- **High**: For systems where loss would have severe or catastrophic effect

### The FedRAMP Process

1. Preparation and documentation
2. Security assessment by a Third-Party Assessment Organization (3PAO)
3. Authorization by a federal agency or the Joint Authorization Board (JAB)
4. Continuous monitoring and annual assessments

## What Is StateRAMP?

StateRAMP provides a similar framework specifically designed for state and local government agencies. It was created because many state agencies wanted FedRAMP-like security assurance but couldn't require full FedRAMP authorization.

### StateRAMP Authorization Levels

- **Category 1**: Low impact systems
- **Category 2**: Moderate impact systems
- **Category 3**: High impact systems

### Key Differences

| Aspect | FedRAMP | StateRAMP |
|--------|---------|-----------|
| Scope | Federal agencies | State and local government |
| Cost | Higher (typically $500K-1M+) | Lower (typically $150K-300K) |
| Timeline | 12-18+ months | 6-12 months |
| Reciprocity | Accepted by all federal agencies | Growing adoption by states |

## Which Should You Require?

**Choose FedRAMP if:**
- You're a federal agency
- You need the highest level of security assurance
- You want the broadest reciprocity

**Choose StateRAMP if:**
- You're a state or local government
- FedRAMP costs are prohibitive
- Your data classification doesn't require FedRAMP

## Looking at Both

Many vendors are now pursuing both authorizations to serve the full government market. When evaluating AI tools, check for:

- Current authorization status (not just "in process")
- Authorization level matching your data classification
- Continuous monitoring status
- Recent assessment dates`,
    authorName: 'GovernAtlas Team',
    category: 'compliance',
    tags: ['FedRAMP', 'StateRAMP', 'Government', 'Cloud Security'],
    publishedAt: '2024-11-25',
    viewCount: 1876,
  },
  {
    id: '4',
    slug: 'soc2-type-ii-matters',
    title: 'Why SOC 2 Type II Matters for AI Tools',
    excerpt: 'SOC 2 Type II is often considered the gold standard for security compliance. Here\'s why it matters for AI tool evaluation.',
    content: `SOC 2 Type II is often considered the gold standard for security compliance. Here's why it matters for AI tool evaluation and what to look for in a vendor's SOC 2 report.

## Understanding SOC 2

SOC 2 (Service Organization Control 2) is an auditing procedure developed by the American Institute of CPAs (AICPA). It evaluates how well a service organization manages data based on five Trust Service Criteria:

1. **Security**: Protection against unauthorized access
2. **Availability**: Systems are available for operation as committed
3. **Processing Integrity**: System processing is complete, accurate, and authorized
4. **Confidentiality**: Information designated as confidential is protected
5. **Privacy**: Personal information is collected, used, and retained appropriately

## Type I vs Type II

### SOC 2 Type I
- Point-in-time assessment
- Evaluates design of controls at a specific date
- Faster and less expensive to obtain
- Limited assurance about ongoing operations

### SOC 2 Type II
- Evaluates controls over a period (typically 6-12 months)
- Tests operating effectiveness of controls
- Provides stronger assurance
- Industry gold standard for security compliance

## Why Type II Matters for AI Tools

AI tools often process sensitive data and make consequential decisions. A SOC 2 Type II report provides assurance that:

- Security controls are not just designed but actually work
- The vendor maintains security practices over time
- Independent auditors have verified the controls
- There's a mechanism for ongoing accountability

## What to Look For

When reviewing a vendor's SOC 2 Type II report:

1. **Scope**: Does it cover the specific service you're using?
2. **Trust Criteria**: Are all relevant criteria included?
3. **Exceptions**: Are there any qualified opinions or exceptions?
4. **Audit Period**: Is it recent (within the last year)?
5. **Subservice Organizations**: Are critical vendors also covered?

## Red Flags

- Only having Type I (fine for startups, concerning for established vendors)
- Qualified opinion or significant exceptions
- Narrow scope that excludes critical components
- Old reports (more than 12 months)
- Unwillingness to share the report under NDA

SOC 2 Type II isn't the only security certification that matters, but it's a strong indicator that a vendor takes security seriously and has the processes to prove it.`,
    authorName: 'GovernAtlas Team',
    category: 'compliance',
    tags: ['SOC 2', 'Security', 'Compliance', 'Vendor Evaluation'],
    publishedAt: '2024-11-20',
    viewCount: 2104,
  },
  {
    id: '5',
    slug: '2025-ai-compliance-trends',
    title: '2025 AI Compliance Trends to Watch',
    excerpt: 'From EU AI Act implementation to new FDA guidance, here are the regulatory trends that will shape AI adoption in 2025.',
    content: `From EU AI Act implementation to new FDA guidance, here are the regulatory trends that will shape AI adoption in 2025.

## 1. EU AI Act Implementation

The EU AI Act, passed in 2024, will see its first enforcement deadlines in 2025. Key provisions include:

- **Prohibited practices** become enforceable (e.g., social scoring, certain biometric systems)
- **High-risk AI requirements** take effect (transparency, human oversight, accuracy)
- **General-purpose AI obligations** begin for foundation model providers

Organizations using AI in the EU or serving EU citizens should prepare for compliance requirements.

## 2. Expanded FDA AI/ML Guidance

The FDA continues to refine its approach to AI in healthcare:

- New guidance on continuous learning systems
- Updates to predetermined change control plans
- Increased focus on real-world performance monitoring
- Enhanced requirements for algorithmic bias detection

Healthcare AI vendors should expect more detailed premarket submission requirements.

## 3. State Privacy Laws Proliferation

With CCPA/CPRA as a model, more states are enacting comprehensive privacy laws:

- Several states have laws taking effect in 2025
- Many include specific provisions for automated decision-making
- Opt-out rights for profiling and targeted advertising

Organizations need a national privacy strategy, not just state-by-state compliance.

## 4. Financial Services AI Regulation

Banking regulators are increasing scrutiny of AI use:

- Updated model risk management guidance (SR 11-7)
- New fair lending requirements for AI underwriting
- Enhanced third-party risk management for AI vendors
- Consumer protection focus on AI-driven decisions

Financial institutions should review their AI governance frameworks.

## 5. Healthcare AI Transparency

Beyond FDA requirements, healthcare is seeing new transparency demands:

- CMS reimbursement considerations for AI
- Health equity audits for clinical AI
- Physician disclosure requirements
- Patient consent and transparency

Healthcare organizations should prepare for increased documentation requirements.

## Preparing for 2025

To get ahead of these trends:

1. **Audit your AI inventory**: Know what AI systems you use and their risk profiles
2. **Review vendor contracts**: Ensure vendors can support compliance requirements
3. **Build governance frameworks**: Document decision-making processes and accountability
4. **Invest in transparency**: Create explainability capabilities for high-risk AI
5. **Monitor developments**: Stay current on regulatory guidance and enforcement

The organizations that prepare now will have a competitive advantage as regulations tighten.`,
    authorName: 'GovernAtlas Team',
    category: 'industry-insights',
    tags: ['Regulation', 'Compliance', '2025 Trends', 'AI Governance'],
    publishedAt: '2024-11-15',
    viewCount: 3215,
  },
];

export const guides: Guide[] = [
  {
    id: '1',
    slug: 'healthcare-ai-procurement-checklist',
    title: 'AI Procurement Checklist for Healthcare Organizations',
    description: 'A comprehensive 20-point checklist for evaluating AI vendors, including HIPAA considerations and questions to ask.',
    content: `# AI Procurement Checklist for Healthcare Organizations

This checklist will help healthcare organizations systematically evaluate AI vendors for compliance, security, and operational fit.

## Security & Compliance (8 points)

- [ ] Verify HIPAA Business Associate Agreement (BAA) availability
- [ ] Confirm SOC 2 Type II certification (request report under NDA)
- [ ] Check HITRUST CSF certification if applicable
- [ ] Verify encryption standards (AES-256 at rest, TLS 1.2+ in transit)
- [ ] Review access control and authentication mechanisms
- [ ] Confirm audit logging and retention capabilities
- [ ] Verify incident response and breach notification procedures
- [ ] Check vulnerability management and penetration testing frequency

## Data Privacy (4 points)

- [ ] Understand data residency options (US-only if required)
- [ ] Review data retention and deletion policies
- [ ] Confirm whether PHI is used for model training
- [ ] Verify de-identification standards if aggregate data is used

## Clinical Integration (4 points)

- [ ] Verify EHR integration capabilities (Epic, Cerner, etc.)
- [ ] Review clinical workflow integration approach
- [ ] Understand FDA clearance status if applicable
- [ ] Confirm clinical validation studies and accuracy metrics

## Vendor Viability (4 points)

- [ ] Research company history, funding, and financial stability
- [ ] Review customer references in healthcare
- [ ] Understand support model and SLAs
- [ ] Review implementation timeline and resource requirements

## Questions to Ask

### About Security
1. Can you provide your most recent SOC 2 Type II report?
2. How do you handle security incidents involving PHI?
3. What is your patch management timeline for critical vulnerabilities?

### About Data
1. Will our data ever leave the United States?
2. Is our data used to train models that serve other customers?
3. How is data segregated between customers?

### About Clinical Use
1. What clinical validation has been performed?
2. How do you monitor for model drift in production?
3. What is your approach to algorithmic bias testing?`,
    category: 'procurement',
    industry: 'Healthcare',
    downloadCount: 1523,
  },
  {
    id: '2',
    slug: 'understanding-fedramp',
    title: 'Understanding FedRAMP for AI Tools',
    description: 'A guide to FedRAMP authorization levels, the authorization process, and why it matters for government AI procurement.',
    content: `# Understanding FedRAMP for AI Tools

## What is FedRAMP?

The Federal Risk and Authorization Management Program (FedRAMP) is a government-wide program that provides a standardized approach to security assessment, authorization, and continuous monitoring for cloud products and services.

## Why FedRAMP Matters

For federal agencies, using FedRAMP-authorized cloud services is typically mandatory. For AI tools processing government data, FedRAMP provides assurance that:

- Security controls meet federal standards
- An independent third-party has verified the controls
- Continuous monitoring is in place
- There's a process for addressing security issues

## Authorization Levels

### FedRAMP Low
- 125 controls based on NIST 800-53
- For systems where loss would have limited adverse effect
- Suitable for non-sensitive, public-facing applications

### FedRAMP Moderate
- 325 controls based on NIST 800-53
- For systems where loss would have serious adverse effect
- Most common authorization level
- Suitable for most federal workloads

### FedRAMP High
- 421 controls based on NIST 800-53
- For systems where loss would have severe or catastrophic effect
- Required for sensitive federal systems
- More rigorous assessment and monitoring

## The Authorization Process

1. **Preparation**: Vendor documents their system and security controls
2. **Assessment**: Third-Party Assessment Organization (3PAO) evaluates controls
3. **Authorization**: Agency or JAB reviews and grants authorization
4. **Continuous Monitoring**: Ongoing security assessment and reporting

## Checking Authorization Status

1. Visit the FedRAMP Marketplace at marketplace.fedramp.gov
2. Search for the vendor or product name
3. Review authorization status, level, and authorizing agency
4. Note the authorization date and any conditions`,
    category: 'compliance',
    downloadCount: 892,
  },
  {
    id: '3',
    slug: 'soc2-buyers-guide',
    title: 'SOC 2 Compliance: What Buyers Need to Know',
    description: 'Understanding SOC 2 Type I vs Type II, what\'s covered, and red flags to watch for in vendor evaluations.',
    content: `# SOC 2 Compliance: What Buyers Need to Know

## What is SOC 2?

SOC 2 is an auditing procedure developed by the AICPA that evaluates a service organization's controls related to security, availability, processing integrity, confidentiality, and privacy.

## Type I vs Type II

### SOC 2 Type I
- Evaluates control design at a specific point in time
- Answers: "Are appropriate controls in place?"
- Faster to obtain (typically 2-3 months)
- Less assurance about ongoing operations

### SOC 2 Type II
- Evaluates control effectiveness over a period (6-12 months)
- Answers: "Are controls working as intended?"
- Takes longer (12+ months for initial report)
- Provides stronger security assurance

## Trust Service Criteria

### Security (Common Criteria)
- Protection against unauthorized access
- Network and application security
- Logical and physical access controls

### Availability
- System uptime and reliability
- Disaster recovery capabilities
- Performance monitoring

### Processing Integrity
- Complete and accurate processing
- Error handling and correction
- Quality assurance procedures

### Confidentiality
- Protection of confidential information
- Encryption and access restrictions
- Data classification and handling

### Privacy
- Personal information handling
- Consent and disclosure
- Retention and disposal

## Reading a SOC 2 Report

### Key Sections
1. **Auditor's Opinion**: Overall assessment and any qualifications
2. **Management Assertion**: Vendor's claims about their controls
3. **System Description**: How the service operates
4. **Controls and Tests**: Specific controls and test results
5. **Complementary User Entity Controls**: Your responsibilities

### Red Flags
- Qualified opinion or exceptions
- Narrow scope excluding critical components
- Report older than 12 months
- Missing Trust Service Criteria relevant to your use case`,
    category: 'compliance',
    downloadCount: 1247,
  },
];

export const faqs: FAQ[] = [
  // About GovernAtlas
  {
    id: '1',
    question: 'What is GovernAtlas?',
    answer: 'GovernAtlas is an AI tools directory specifically designed for regulated industries. We help compliance teams, IT leaders, and procurement professionals find AI tools that meet their governance requirements by providing governance scores, verified certifications, and detailed compliance information.',
    category: 'about',
  },
  {
    id: '2',
    question: 'How is GovernAtlas different from other software directories?',
    answer: 'Unlike general software directories, GovernAtlas focuses exclusively on regulated industries (healthcare, finance, legal, government, etc.) and evaluates tools through a governance lens. We provide governance scores across five dimensions (security, transparency, fairness, privacy, accountability) and verify compliance certifications.',
    category: 'about',
  },
  {
    id: '3',
    question: 'Is GovernAtlas free to use?',
    answer: 'Yes, browsing and comparing AI tools on GovernAtlas is completely free for buyers. Vendors can list their tools for free with basic features, or upgrade to paid plans for enhanced visibility and features.',
    category: 'about',
  },
  {
    id: '4',
    question: 'Who owns GovernAtlas?',
    answer: 'GovernAtlas is a product of The Algorithm, a Colorado-based IT services company. The Algorithm provides custom software development, managed IT services, and cloud infrastructure solutions.',
    category: 'about',
  },
  {
    id: '5',
    question: 'How can I contact GovernAtlas?',
    answer: 'You can reach us through our contact form at /contact or email us directly at info@the-algo.com. We typically respond within 2 business days.',
    category: 'about',
  },
  // For Buyers
  {
    id: '6',
    question: 'How are governance scores calculated?',
    answer: 'Governance scores are calculated based on five dimensions: Security (25%), Transparency (25%), Fairness (20%), Privacy (20%), and Accountability (10%). Each dimension is scored based on verified certifications, documented practices, and publicly available information. See our Methodology page for full details.',
    category: 'buyers',
  },
  {
    id: '7',
    question: 'Can I trust the certification information?',
    answer: 'We verify certifications through official sources and vendor documentation. Verified certifications are marked with a verified badge. Self-reported certifications that we haven\'t independently verified are clearly labeled. We recommend requesting certification documentation directly from vendors before making procurement decisions.',
    category: 'buyers',
  },
  {
    id: '8',
    question: 'How do I compare multiple tools?',
    answer: 'Use our Compare feature to evaluate up to 4 tools side-by-side. Click the "Add to Compare" button on any tool card, then view your comparison at /compare. You can compare governance scores, certifications, deployment options, and more.',
    category: 'buyers',
  },
  {
    id: '9',
    question: 'Can I save tools for later review?',
    answer: 'Yes, create a free account to save tools to your dashboard. You can access your saved tools anytime and organize them for your evaluation process.',
    category: 'buyers',
  },
  {
    id: '10',
    question: 'How do I write a review?',
    answer: 'Create a free account and navigate to any tool page. Click "Write a Review" and share your experience. We verify reviews and may contact you to confirm your experience before publishing.',
    category: 'buyers',
  },
  {
    id: '11',
    question: 'Are the reviews verified?',
    answer: 'We moderate all reviews and may verify reviewer identity and experience with the tool. Verified reviews from confirmed users are marked with a verified badge. We remove fake, spam, or inappropriate reviews.',
    category: 'buyers',
  },
  {
    id: '12',
    question: 'How often is tool information updated?',
    answer: 'We review and update tool information quarterly. Vendors can update their listings at any time. Major changes like new certifications or security incidents trigger immediate reviews.',
    category: 'buyers',
  },
  {
    id: '13',
    question: 'Can I request a tool be added?',
    answer: 'Yes! If you can\'t find a tool you\'re evaluating, let us know through our contact form. We\'ll research and add it if it meets our criteria for regulated industries.',
    category: 'buyers',
  },
  // For Vendors
  {
    id: '14',
    question: 'How do I list my AI tool?',
    answer: 'Visit /vendors/submit to complete our submission form. You\'ll provide company information, tool details, certifications, and contact information. Our team reviews submissions within 5 business days.',
    category: 'vendors',
  },
  {
    id: '15',
    question: 'Is it free to list my tool?',
    answer: 'Yes, basic listings are free. You can upgrade to Pro ($299/month) or Enterprise plans for enhanced visibility, analytics, and features. See /vendors/pricing for details.',
    category: 'vendors',
  },
  {
    id: '16',
    question: 'How do I get the Verified badge?',
    answer: 'The Verified badge is available to Pro and Enterprise customers. We verify your certifications with issuing bodies and review your documentation. Once verified, the badge appears on your listing.',
    category: 'vendors',
  },
  {
    id: '17',
    question: 'Can I respond to reviews?',
    answer: 'Yes, Pro and Enterprise vendors can respond to reviews through their vendor dashboard. Responding to reviews shows potential customers you\'re engaged and care about feedback.',
    category: 'vendors',
  },
  {
    id: '18',
    question: 'How can I improve my governance score?',
    answer: 'Governance scores are based on certifications, documentation, and practices. To improve: obtain relevant certifications (SOC 2, ISO 27001), publish transparency documentation (model cards, trust pages), and document your governance practices.',
    category: 'vendors',
  },
  {
    id: '19',
    question: 'Can I dispute my governance score?',
    answer: 'Yes, vendors can submit a dispute through their dashboard or contact us directly. Provide documentation supporting your requested changes. We review disputes within 10 business days.',
    category: 'vendors',
  },
  {
    id: '20',
    question: 'Do you accept payment for higher scores?',
    answer: 'No. Governance scores are completely independent of commercial relationships. Paid listings may receive enhanced visibility or features, but scores are never influenced by vendor payments.',
    category: 'vendors',
  },
];

export const glossaryTerms: GlossaryTerm[] = [
  // Certifications
  {
    term: 'SOC 2',
    slug: 'soc-2',
    definition: 'Service Organization Control 2 is an auditing procedure developed by the AICPA that evaluates how well a service provider manages data based on five Trust Service Criteria: security, availability, processing integrity, confidentiality, and privacy.',
    category: 'certifications',
    relatedTerms: ['SOC 2 Type II', 'AICPA', 'Trust Service Criteria'],
  },
  {
    term: 'SOC 2 Type II',
    slug: 'soc-2-type-ii',
    definition: 'A SOC 2 audit that evaluates the operating effectiveness of controls over a period of time (typically 6-12 months), as opposed to Type I which only evaluates control design at a point in time.',
    category: 'certifications',
    relatedTerms: ['SOC 2', 'SOC 2 Type I'],
  },
  {
    term: 'ISO 27001',
    slug: 'iso-27001',
    definition: 'An international standard for information security management systems (ISMS). Organizations certified to ISO 27001 have implemented a systematic approach to managing sensitive information.',
    category: 'certifications',
    relatedTerms: ['ISO 27701', 'ISMS'],
  },
  {
    term: 'HIPAA',
    slug: 'hipaa',
    definition: 'The Health Insurance Portability and Accountability Act sets standards for protecting sensitive patient health information (PHI). HIPAA compliance is mandatory for covered entities and their business associates.',
    category: 'certifications',
    relatedTerms: ['PHI', 'HIPAA BAA', 'HITRUST'],
  },
  {
    term: 'HITRUST',
    slug: 'hitrust',
    definition: 'The HITRUST CSF (Common Security Framework) is a certifiable framework that harmonizes requirements from various regulations and standards, commonly used in healthcare to demonstrate comprehensive security practices.',
    category: 'certifications',
    relatedTerms: ['HIPAA', 'CSF'],
  },
  {
    term: 'FedRAMP',
    slug: 'fedramp',
    definition: 'The Federal Risk and Authorization Management Program is a US government-wide program that provides a standardized approach to security assessment, authorization, and continuous monitoring for cloud products and services used by federal agencies.',
    category: 'certifications',
    relatedTerms: ['StateRAMP', 'ATO', 'JAB'],
  },
  {
    term: 'StateRAMP',
    slug: 'stateramp',
    definition: 'A security authorization program for cloud service providers serving state and local government agencies. Similar to FedRAMP but with requirements tailored for non-federal government use.',
    category: 'certifications',
    relatedTerms: ['FedRAMP'],
  },
  {
    term: 'PCI DSS',
    slug: 'pci-dss',
    definition: 'The Payment Card Industry Data Security Standard is a set of security standards designed to ensure that all companies that accept, process, store, or transmit credit card information maintain a secure environment.',
    category: 'certifications',
    relatedTerms: ['PCI', 'Credit Card Security'],
  },
  {
    term: 'GDPR',
    slug: 'gdpr',
    definition: 'The General Data Protection Regulation is a comprehensive data privacy law that applies to organizations operating in the European Union or processing data of EU residents.',
    category: 'privacy',
    relatedTerms: ['CCPA', 'Data Privacy', 'DPA'],
  },
  {
    term: 'CCPA',
    slug: 'ccpa',
    definition: 'The California Consumer Privacy Act gives California residents rights over their personal information, including the right to know what data is collected, delete it, and opt out of its sale.',
    category: 'privacy',
    relatedTerms: ['GDPR', 'CPRA', 'Privacy Rights'],
  },
  // Privacy Terms
  {
    term: 'BAA',
    slug: 'baa',
    definition: 'A Business Associate Agreement is a contract between a HIPAA covered entity and a business associate that establishes permitted uses and disclosures of PHI and security safeguards.',
    category: 'privacy',
    relatedTerms: ['HIPAA', 'PHI', 'Covered Entity'],
  },
  {
    term: 'DPA',
    slug: 'dpa',
    definition: 'A Data Processing Agreement is a legally binding contract between a data controller and data processor, required under GDPR when personal data processing is outsourced.',
    category: 'privacy',
    relatedTerms: ['GDPR', 'Data Controller', 'Data Processor'],
  },
  {
    term: 'PHI',
    slug: 'phi',
    definition: 'Protected Health Information is individually identifiable health information held or transmitted by a covered entity or business associate, including demographic data, medical records, and payment information.',
    category: 'privacy',
    relatedTerms: ['HIPAA', 'ePHI', 'Covered Entity'],
  },
  {
    term: 'PII',
    slug: 'pii',
    definition: 'Personally Identifiable Information is any data that could potentially identify a specific individual, such as name, address, social security number, or biometric data.',
    category: 'privacy',
    relatedTerms: ['PHI', 'Personal Data'],
  },
  // AI Terms
  {
    term: 'Model Card',
    slug: 'model-card',
    definition: 'Documentation that provides information about an ML model, including its intended use, performance characteristics, limitations, and ethical considerations. Model cards promote transparency and responsible AI development.',
    category: 'ai',
    relatedTerms: ['Explainability', 'AI Transparency'],
  },
  {
    term: 'Explainability',
    slug: 'explainability',
    definition: 'The degree to which an AI system\'s decisions can be understood by humans. Explainable AI (XAI) helps users understand how and why a model made a particular prediction or decision.',
    category: 'ai',
    relatedTerms: ['Model Card', 'Black Box', 'Interpretability'],
  },
  {
    term: 'Bias Testing',
    slug: 'bias-testing',
    definition: 'The process of evaluating an AI system for unfair bias across different demographic groups. Bias testing helps identify and mitigate discriminatory outcomes in AI decision-making.',
    category: 'ai',
    relatedTerms: ['Fairness', 'Demographic Parity', 'Red Teaming'],
  },
  {
    term: 'Red Teaming',
    slug: 'red-teaming',
    definition: 'An adversarial testing approach where a team attempts to find vulnerabilities, biases, or harmful outputs in an AI system. Red teaming helps identify risks before deployment.',
    category: 'ai',
    relatedTerms: ['Bias Testing', 'Adversarial Testing'],
  },
  // Deployment Terms
  {
    term: 'SaaS',
    slug: 'saas',
    definition: 'Software as a Service is a cloud-based delivery model where software is hosted by a provider and accessed by customers over the internet, typically via subscription.',
    category: 'deployment',
    relatedTerms: ['Cloud', 'On-Premise', 'PaaS'],
  },
  {
    term: 'On-Premise',
    slug: 'on-premise',
    definition: 'Deployment model where software is installed and runs on computers at the customer\'s physical location, giving organizations complete control over their infrastructure and data.',
    category: 'deployment',
    relatedTerms: ['SaaS', 'Hybrid', 'Self-Hosted'],
  },
  {
    term: 'VPC',
    slug: 'vpc',
    definition: 'A Virtual Private Cloud is an isolated cloud environment dedicated to a single organization. VPCs provide enhanced security and control while maintaining cloud scalability.',
    category: 'deployment',
    relatedTerms: ['Private Cloud', 'Cloud', 'Network Isolation'],
  },
  {
    term: 'Air-gapped',
    slug: 'air-gapped',
    definition: 'A deployment where the system is completely isolated from external networks, including the internet. Air-gapped deployments are used for highly sensitive applications requiring maximum security.',
    category: 'deployment',
    relatedTerms: ['On-Premise', 'Network Isolation'],
  },
];

export const getBlogPostBySlug = (slug: string) => blogPosts.find(p => p.slug === slug);
export const getGuideBySlug = (slug: string) => guides.find(g => g.slug === slug);
export const getGlossaryTermBySlug = (slug: string) => glossaryTerms.find(t => t.slug === slug);
