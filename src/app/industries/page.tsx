import React from 'react';
import Link from 'next/link';
import {
  Building2,
  Shield,
  TrendingUp,
  Users,
  Briefcase,
  Heart,
  Scale,
  Zap,
  GraduationCap,
  ChevronRight,
} from 'lucide-react';
import { tools, industries } from '@/data/tools';
import { ToolCard } from '@/components';

const industryData: Record<
  string,
  {
    icon: React.ReactNode;
    description: string;
    color: string;
    bgColor: string;
  }
> = {
  Healthcare: {
    icon: <Heart className="w-8 h-8" />,
    description:
      'AI tools for clinical documentation, diagnostics, patient engagement, and healthcare operations with HIPAA and HITRUST compliance.',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  'Financial Services': {
    icon: <TrendingUp className="w-8 h-8" />,
    description:
      'AI solutions for banking, wealth management, trading, and financial compliance with SOC 2 and PCI DSS certifications.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  Legal: {
    icon: <Scale className="w-8 h-8" />,
    description:
      'AI-powered legal research, contract analysis, e-discovery, and case management tools for law firms and legal departments.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  Government: {
    icon: <Building2 className="w-8 h-8" />,
    description:
      'FedRAMP and StateRAMP authorized AI tools for citizen services, benefits administration, and government operations.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  Insurance: {
    icon: <Shield className="w-8 h-8" />,
    description:
      'AI tools for claims processing, underwriting, fraud detection, and policy administration for insurance carriers.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  Pharmaceutical: {
    icon: <Briefcase className="w-8 h-8" />,
    description:
      'AI solutions for drug discovery, clinical trials, regulatory submissions, and pharmacovigilance with FDA compliance.',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
  },
  Energy: {
    icon: <Zap className="w-8 h-8" />,
    description:
      'AI tools for grid optimization, predictive maintenance, energy trading, and NERC compliance for utilities.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
  Education: {
    icon: <GraduationCap className="w-8 h-8" />,
    description:
      'FERPA-compliant AI tools for personalized learning, student success, administrative automation, and educational analytics.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
};

export default function IndustriesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AI Tools by Industry
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore AI solutions designed for your industry&apos;s unique regulatory
            requirements and compliance standards.
          </p>
        </div>
      </div>

      {/* Industries Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {industries.map((industry) => {
            const industryTools = tools.filter((t) =>
              t.industries.includes(industry as any)
            );
            const topTools = industryTools
              .sort((a, b) => b.score - a.score)
              .slice(0, 3);
            const data = industryData[industry] || {
              icon: <Building2 className="w-8 h-8" />,
              description: `AI tools for ${industry}`,
              color: 'text-gray-600',
              bgColor: 'bg-gray-50',
            };

            return (
              <div
                key={industry}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${data.bgColor} ${data.color}`}>
                      {data.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold text-gray-900">
                          {industry}
                        </h2>
                        <span className="text-sm text-gray-500">
                          {industryTools.length} tools
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{data.description}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50">
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Top rated tools:
                  </p>
                  <div className="space-y-2">
                    {topTools.map((tool) => (
                      <Link
                        key={tool.id}
                        href={`/tool/${tool.slug}`}
                        className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-sm transition-shadow"
                      >
                        <div>
                          <p className="font-medium text-gray-900">{tool.name}</p>
                          <p className="text-xs text-gray-500">{tool.vendor}</p>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <span className="font-semibold">
                            {(tool.score / 20).toFixed(1)}
                          </span>
                          <span className="text-yellow-500">★</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={`/browse?industry=${encodeURIComponent(industry)}`}
                    className="mt-4 flex items-center justify-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    View all {industry} tools
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Don&apos;t see your industry?
          </h2>
          <p className="text-gray-600 mb-6">
            We&apos;re constantly adding new tools and industries. Let us know what
            you&apos;re looking for.
          </p>
          <Link href="/contact" className="btn-primary">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
