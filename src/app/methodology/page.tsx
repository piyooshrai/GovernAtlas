import { Metadata } from 'next';
import Link from 'next/link';
import {
  Shield,
  Eye,
  Scale,
  Lock,
  ClipboardCheck,
  CheckCircle,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Scoring Methodology | GovernAtlas',
  description: 'Learn how GovernAtlas evaluates AI tools for regulated industries using our comprehensive governance scoring methodology.',
};

const scoreLevels = [
  { min: 90, max: 100, label: 'Excellent', color: 'bg-green-500', description: 'Exceeds industry standards' },
  { min: 75, max: 89, label: 'Good', color: 'bg-teal-500', description: 'Meets industry standards' },
  { min: 60, max: 74, label: 'Moderate', color: 'bg-amber-500', description: 'Basic governance practices' },
  { min: 0, max: 59, label: 'Needs Work', color: 'bg-red-500', description: 'Significant gaps' },
];

const dimensions = [
  {
    name: 'Security',
    weight: '25%',
    icon: <Shield className="w-6 h-6" />,
    color: 'text-blue-600 bg-blue-100',
    description: 'Evaluates the security controls and certifications in place to protect data and systems.',
    factors: [
      'Industry certifications (SOC 2, ISO 27001)',
      'Encryption standards (at rest and in transit)',
      'Access controls and authentication',
      'Penetration testing frequency',
      'Incident response procedures',
      'Security audit history',
    ],
    scoring: 'Points are awarded for each verified certification and documented security practice. SOC 2 Type II earns more points than Type I. Regular third-party audits increase the score.',
    sources: 'Vendor trust pages, SOC 2 reports, public documentation, security certifications',
  },
  {
    name: 'Transparency',
    weight: '25%',
    icon: <Eye className="w-6 h-6" />,
    color: 'text-purple-600 bg-purple-100',
    description: 'Measures how clearly the vendor communicates about their AI systems and practices.',
    factors: [
      'Model documentation (model cards)',
      'Decision explainability features',
      'Training data disclosure',
      'Limitation acknowledgment',
      'Update and changelog practices',
      'Public technical documentation',
    ],
    scoring: 'Points for published model cards, explainability features, clear documentation about capabilities and limitations, and transparent communication about data usage.',
    sources: 'Technical documentation, published papers, product features, public statements',
  },
  {
    name: 'Fairness',
    weight: '20%',
    icon: <Scale className="w-6 h-6" />,
    color: 'text-green-600 bg-green-100',
    description: 'Assesses efforts to ensure AI systems treat all users equitably.',
    factors: [
      'Bias testing procedures',
      'Demographic parity measures',
      'Third-party fairness audits',
      'Remediation procedures',
      'Diverse training data practices',
      'Ongoing monitoring for bias',
    ],
    scoring: 'Points for documented bias testing, third-party audits, published fairness metrics, and active bias mitigation programs.',
    sources: 'Published audits, vendor disclosures, academic partnerships, fairness reports',
  },
  {
    name: 'Privacy',
    weight: '20%',
    icon: <Lock className="w-6 h-6" />,
    color: 'text-amber-600 bg-amber-100',
    description: 'Evaluates data privacy practices and regulatory compliance.',
    factors: [
      'Privacy framework compliance (GDPR, CCPA, HIPAA)',
      'Data minimization practices',
      'Consent mechanisms',
      'Data retention policies',
      'User data rights support',
      'Data processing agreements',
    ],
    scoring: 'Points for verified compliance with privacy regulations, clear privacy policies, documented data handling procedures, and available data processing agreements.',
    sources: 'Privacy policies, compliance certifications, data processing agreements, regulatory filings',
  },
  {
    name: 'Accountability',
    weight: '10%',
    icon: <ClipboardCheck className="w-6 h-6" />,
    color: 'text-red-600 bg-red-100',
    description: 'Measures governance structures and oversight mechanisms.',
    factors: [
      'Audit trails and logging',
      'Human oversight mechanisms',
      'Error correction procedures',
      'Regulatory compliance history',
      'Governance committee/board',
      'Incident reporting processes',
    ],
    scoring: 'Points for documented oversight mechanisms, clean compliance history, available audit logs, and clear accountability structures.',
    sources: 'Product features, regulatory filings, news/press, governance documentation',
  },
];

const faqs = [
  {
    question: 'How can vendors improve their score?',
    answer: 'Vendors can improve their score by obtaining relevant certifications (SOC 2, ISO 27001, HIPAA), publishing clear documentation about their AI systems, conducting and publishing bias audits, implementing robust privacy practices, and establishing clear accountability mechanisms. We recommend starting with the dimension where you score lowest.',
  },
  {
    question: 'How often are scores updated?',
    answer: 'Scores are reviewed quarterly. We also update scores when vendors notify us of new certifications, when we discover significant changes through our monitoring, or when users report inaccuracies. Major changes (like new certifications or security incidents) trigger immediate reviews.',
  },
  {
    question: 'Can vendors dispute their score?',
    answer: 'Yes. Vendors can submit a dispute through their vendor dashboard or by contacting us directly. Disputes should include documentation supporting the requested change. We review all disputes within 10 business days and will update scores if the evidence supports a change.',
  },
  {
    question: 'Is the scoring automated or manual?',
    answer: 'Scoring is a combination of both. We use automated tools to gather publicly available information and verify certifications. Human analysts review the data, assess qualitative factors, and make final scoring decisions. All scores are reviewed by at least two analysts before publication.',
  },
  {
    question: 'What\'s the difference between verified and self-reported data?',
    answer: 'Verified data has been confirmed through official certification bodies, public records, or direct vendor documentation we\'ve reviewed. Self-reported data comes from vendor submissions that we haven\'t independently verified. Verified data carries more weight in scoring calculations.',
  },
  {
    question: 'Do you accept payment for higher scores?',
    answer: 'No. Our scoring is completely independent of any commercial relationship. Paid listings may receive enhanced visibility or features, but they have no impact on governance scores. Our methodology is applied consistently regardless of vendor relationship status.',
  },
];

export default function MethodologyPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Scoring Methodology
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            How we evaluate AI tools for regulated industries
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Governance Scoring Matters</h2>
          <p className="text-gray-600 mb-4">
            Regulated industries face unique challenges when adopting AI tools. Compliance requirements,
            data privacy concerns, and the need for explainability demand a rigorous evaluation process.
            Traditional software reviews don&apos;t capture these critical dimensions.
          </p>
          <p className="text-gray-600 mb-4">
            GovernAtlas provides a standardized framework for evaluating AI governance. Our methodology
            is built on industry standards, regulatory requirements, and best practices from healthcare,
            financial services, legal, and government sectors.
          </p>
          <p className="text-gray-600">
            Every tool in our directory is scored across five dimensions, providing buyers with
            comparable, objective data to inform their procurement decisions.
          </p>
        </div>
      </section>

      {/* Score Overview */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Governance Score Overview</h2>
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <p className="text-gray-600 mb-6">
            Each tool receives a Governance Score from 0 to 100, calculated as a weighted average
            of five dimensions. Here&apos;s how to interpret the scores:
          </p>
          <div className="grid gap-4">
            {scoreLevels.map((level) => (
              <div key={level.label} className="flex items-center gap-4">
                <div className={`w-4 h-4 rounded ${level.color}`} />
                <div className="w-24 font-semibold text-gray-900">
                  {level.min}-{level.max}
                </div>
                <div className="w-32 font-medium text-gray-900">{level.label}</div>
                <div className="text-gray-600">{level.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Five Dimensions */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Five Scoring Dimensions</h2>
        <div className="space-y-8">
          {dimensions.map((dim) => (
            <div key={dim.name} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${dim.color}`}>
                    {dim.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {dim.name} <span className="text-gray-500 font-normal">({dim.weight})</span>
                    </h3>
                    <p className="text-gray-600">{dim.description}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">What We Evaluate</h4>
                  <ul className="space-y-2">
                    {dim.factors.map((factor, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">How It&apos;s Scored</h4>
                    <p className="text-sm text-gray-600">{dim.scoring}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Data Sources</h4>
                    <p className="text-sm text-gray-600">{dim.sources}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Verification Process */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Verification Process</h2>
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 font-bold">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Data Collection</h3>
              <p className="text-sm text-gray-600">
                We gather information from vendor trust pages, certification bodies, public documentation,
                and direct vendor submissions.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 font-bold">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Verification</h3>
              <p className="text-sm text-gray-600">
                Analysts verify certifications with issuing bodies, review documentation, and cross-reference
                multiple sources.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 font-bold">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ongoing Monitoring</h3>
              <p className="text-sm text-gray-600">
                Scores are reviewed quarterly. We monitor for certification changes, security incidents,
                and significant updates.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Verified vs. Self-Reported</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-900">Verified:</span>
                  <span className="text-gray-600"> Confirmed through official sources, carries full weight in scoring</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-900">Self-Reported:</span>
                  <span className="text-gray-600"> Vendor-submitted, pending verification, carries reduced weight</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-gray-600 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-blue-600 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Questions about our methodology?
          </h2>
          <p className="text-blue-100 mb-6">
            We&apos;re happy to discuss our scoring approach with buyers and vendors.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors"
          >
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
