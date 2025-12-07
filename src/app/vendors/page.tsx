import { Metadata } from 'next';
import Link from 'next/link';
import {
  Search,
  BarChart3,
  Shield,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  TrendingUp,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'List Your AI Tool | GovernAtlas',
  description: 'Get your AI tool listed on GovernAtlas and reach compliance-focused buyers in regulated industries.',
};

const benefits = [
  {
    icon: <Search className="w-6 h-6" />,
    title: 'Get Discovered',
    description: 'Reach buyers actively searching for compliant AI solutions in healthcare, finance, legal, and government sectors.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Showcase Credentials',
    description: 'Display your certifications, compliance status, and governance practices prominently on your listing.',
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: 'Build Trust',
    description: 'Earn our Verified badge by confirming your certifications, building credibility with enterprise buyers.',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Track Performance',
    description: 'Get insights on views, clicks, and engagement with your listing through our analytics dashboard.',
  },
];

const stats = [
  { value: '10,000+', label: 'Monthly visitors' },
  { value: '500+', label: 'Enterprise buyers' },
  { value: '8', label: 'Industries covered' },
];

const steps = [
  {
    number: '1',
    title: 'Submit your tool',
    description: 'Fill out our submission form with your company and tool information.',
  },
  {
    number: '2',
    title: 'Our team reviews',
    description: 'We verify your information and certifications within 5 business days.',
  },
  {
    number: '3',
    title: 'Go live',
    description: 'Your listing appears in our directory, reaching compliance-focused buyers.',
  },
];

export default function VendorsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              List Your AI Tool on GovernAtlas
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Reach compliance-focused buyers in regulated industries. Get discovered
              by enterprise teams searching for AI tools that meet their governance requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/vendors/submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors"
              >
                Get Listed - Free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/vendors/pricing"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 font-medium transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why List on GovernAtlas?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We connect AI vendors with enterprise buyers who prioritize compliance and governance.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white border-y border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600">Get listed in three simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.number}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Buyers */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Reach the Right Buyers</h2>
              <p className="text-gray-300 mb-6">
                Our audience consists of compliance officers, IT leaders, and procurement
                teams from regulated industries actively evaluating AI tools.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  Fortune 500 healthcare systems
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  Federal and state government agencies
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  Major financial institutions
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  AmLaw 100 law firms
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold">500+</p>
                <p className="text-sm text-gray-400">Enterprise buyers</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-sm text-gray-400">Avg. review score</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold">40%</p>
                <p className="text-sm text-gray-400">Monthly growth</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <Shield className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold">15+</p>
                <p className="text-sm text-gray-400">Certifications tracked</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Submit your tool for free and start reaching compliance-focused buyers today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/vendors/submit"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors text-lg"
            >
              Submit Your Tool
            </Link>
            <Link
              href="/vendors/pricing"
              className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-400 font-medium transition-colors text-lg"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
