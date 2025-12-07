import { Metadata } from 'next';
import Link from 'next/link';
import {
  Shield,
  Target,
  CheckCircle,
  Users,
  Building2,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About GovernAtlas | AI Tools Directory for Regulated Industries',
  description: 'GovernAtlas helps compliance teams find AI tools built for regulated industries. A product of The Algorithm.',
};

const differentiators = [
  {
    title: 'Focus on Regulated Industries',
    description: 'Unlike general AI directories, we focus exclusively on healthcare, financial services, legal, government, insurance, pharmaceutical, education, and manufacturing. Every tool is evaluated through a compliance lens.',
    icon: <Target className="w-6 h-6" />,
  },
  {
    title: 'Governance Scoring Methodology',
    description: 'Our proprietary scoring system evaluates tools across security, transparency, fairness, privacy, and accountability. Get objective, comparable data for your procurement decisions.',
    icon: <Shield className="w-6 h-6" />,
  },
  {
    title: 'Verification Process',
    description: 'We verify certifications with issuing bodies and review documentation directly. Self-reported claims are clearly labeled so you know what\'s been independently confirmed.',
    icon: <CheckCircle className="w-6 h-6" />,
  },
  {
    title: 'Independence',
    description: 'Our scoring is completely independent of commercial relationships. Paid listings may receive enhanced visibility, but scores are never influenced by vendor payments.',
    icon: <Users className="w-6 h-6" />,
  },
];

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About GovernAtlas
          </h1>
          <p className="text-xl text-gray-600">
            Making AI procurement safer for regulated industries
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Regulated industries are adopting AI at an unprecedented pace, but procurement teams
              face a significant challenge: how do you evaluate AI tools when compliance, security,
              and governance are non-negotiable?
            </p>
            <p>
              Traditional software directories don&apos;t capture the dimensions that matter most to
              healthcare systems, banks, law firms, and government agencies. Certifications like
              HIPAA, SOC 2, and FedRAMP aren&apos;t just nice-to-haves—they&apos;re requirements.
            </p>
            <p>
              GovernAtlas was built to solve this problem. We provide a comprehensive directory
              of AI tools specifically for regulated industries, complete with governance scores,
              verified certifications, and the compliance information buyers actually need.
            </p>
          </div>
        </div>
      </section>

      {/* How We're Different */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How We&apos;re Different</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {differentiators.map((item) => (
            <div key={item.title} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Algorithm Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-8 text-white">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-8 h-8 text-blue-400" />
            <h2 className="text-2xl font-bold">A Product of The Algorithm</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>
              GovernAtlas is built and operated by The Algorithm, a Colorado-based IT services
              company providing custom software development, managed IT services, and cloud
              infrastructure solutions since 2015.
            </p>
            <p>
              Our team brings deep experience in regulated industries, having built HIPAA-compliant
              healthcare applications, FedRAMP-ready government solutions, and security-first
              financial services platforms.
            </p>
            <p>
              We built GovernAtlas because we saw our clients struggling to find AI tools that
              met their compliance requirements. Now we&apos;re making that research easier for everyone.
            </p>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h3 className="font-semibold text-white mb-3">The Algorithm Services</h3>
            <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                Custom Software Development
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                Cloud Infrastructure
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                Cybersecurity
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                AI/ML Solutions
              </div>
            </div>
            <a
              href="https://www.the-algo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-blue-400 hover:text-blue-300 font-medium"
            >
              Learn more at the-algo.com <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
              <div className="space-y-2 text-gray-600">
                <p>
                  <span className="font-medium">Email:</span>{' '}
                  <a href="mailto:info@the-algo.com" className="text-blue-600 hover:underline">
                    info@the-algo.com
                  </a>
                </p>
                <p>
                  <span className="font-medium">Location:</span> Colorado, USA
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  href="/contact"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  Contact Form <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/vendors"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  For Vendors <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/methodology"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  Methodology <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
