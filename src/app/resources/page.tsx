import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  FileText,
  HelpCircle,
  Video,
  ChevronRight,
  Download,
} from 'lucide-react';

const resources = [
  {
    title: 'Buyer\'s Guides',
    description: 'Comprehensive guides to help you evaluate and select AI tools for your industry.',
    icon: BookOpen,
    items: [
      { title: 'Healthcare AI Buyer\'s Guide 2025', type: 'PDF' },
      { title: 'Financial Services AI Compliance Checklist', type: 'PDF' },
      { title: 'Government AI Procurement Guide', type: 'PDF' },
    ],
  },
  {
    title: 'Research Reports',
    description: 'In-depth analysis and market research on AI adoption in regulated industries.',
    icon: FileText,
    items: [
      { title: 'State of AI in Healthcare 2025', type: 'Report' },
      { title: 'AI Compliance Trends in Financial Services', type: 'Report' },
      { title: 'FedRAMP Authorization Landscape', type: 'Report' },
    ],
  },
  {
    title: 'Webinars & Videos',
    description: 'Expert-led sessions on AI governance, compliance, and implementation.',
    icon: Video,
    items: [
      { title: 'Building a Compliant AI Strategy', type: 'Webinar' },
      { title: 'HIPAA Compliance for AI Tools', type: 'Video' },
      { title: 'SOC 2 Certification Explained', type: 'Video' },
    ],
  },
];

const faqs = [
  {
    question: 'How does GovernAtlas verify vendors?',
    answer: 'We verify vendors through a rigorous process that includes certification verification, security assessment review, and validation of company information. Verified vendors display a green checkmark badge.',
  },
  {
    question: 'What is the Governance Score?',
    answer: 'The Governance Score (out of 5) is calculated based on compliance certifications, security practices, user reviews, and vendor transparency. Higher scores indicate better governance practices.',
  },
  {
    question: 'How are reviews moderated?',
    answer: 'All reviews go through our moderation process to ensure authenticity. We verify reviewer identity and check for conflicts of interest. Verified reviews are marked with a badge.',
  },
  {
    question: 'Can vendors pay to improve their listing?',
    answer: 'No. Vendor scores and rankings are based purely on objective criteria and user reviews. Paid features are limited to enhanced profiles and advertising, clearly marked as sponsored.',
  },
];

export default function ResourcesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Resources
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Guides, reports, and educational content to help you navigate AI adoption
            in regulated industries.
          </p>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {resources.map((resource) => (
            <div key={resource.title} className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <resource.icon className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{resource.title}</h2>
              </div>
              <p className="text-gray-600 text-sm mb-6">{resource.description}</p>
              <div className="space-y-3">
                {resource.items.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer group"
                  >
                    <div>
                      <p className="font-medium text-gray-900 text-sm group-hover:text-blue-600">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">{item.type}</p>
                    </div>
                    <Download className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                  </div>
                ))}
              </div>
              <button className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                View all <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Methodology */}
      <div className="bg-white border-y border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Methodology</h2>
            <p className="text-gray-600">
              How we evaluate and score AI tools for regulated industries
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Compliance', value: '30%', desc: 'Certifications & audits' },
              { label: 'Security', value: '25%', desc: 'Data protection practices' },
              { label: 'User Reviews', value: '25%', desc: 'Verified user feedback' },
              { label: 'Transparency', value: '20%', desc: 'Vendor openness & docs' },
            ].map((item) => (
              <div key={item.label} className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-3xl font-bold text-blue-600 mb-1">{item.value}</p>
                <p className="font-medium text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/resources/methodology"
              className="text-blue-600 font-medium hover:text-blue-700"
            >
              Read full methodology →
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6" />
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-gray-600 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <Link href="/contact" className="btn-primary">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
