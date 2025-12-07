import { Metadata } from 'next';
import Link from 'next/link';
import {
  Building2,
  Shield,
  TrendingUp,
  Scale,
  Landmark,
  ShieldCheck,
  Pill,
  GraduationCap,
  Factory,
  ChevronRight,
} from 'lucide-react';
import { tools } from '@/data/tools';
import { industriesData } from '@/data/industries';

export const metadata: Metadata = {
  title: 'Browse by Industry | GovernAtlas',
  description: 'Explore AI tools designed for regulated industries including healthcare, financial services, legal, government, and more.',
};

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="w-8 h-8" />,
  TrendingUp: <TrendingUp className="w-8 h-8" />,
  Scale: <Scale className="w-8 h-8" />,
  Landmark: <Landmark className="w-8 h-8" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8" />,
  Pill: <Pill className="w-8 h-8" />,
  GraduationCap: <GraduationCap className="w-8 h-8" />,
  Factory: <Factory className="w-8 h-8" />,
};

const colorMap: Record<string, { color: string; bgColor: string }> = {
  Healthcare: { color: 'text-red-600', bgColor: 'bg-red-50' },
  'Financial Services': { color: 'text-green-600', bgColor: 'bg-green-50' },
  Legal: { color: 'text-purple-600', bgColor: 'bg-purple-50' },
  Government: { color: 'text-blue-600', bgColor: 'bg-blue-50' },
  Insurance: { color: 'text-orange-600', bgColor: 'bg-orange-50' },
  Pharmaceutical: { color: 'text-teal-600', bgColor: 'bg-teal-50' },
  Education: { color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
  Manufacturing: { color: 'text-gray-600', bgColor: 'bg-gray-100' },
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
          {industriesData.map((industry) => {
            const industryTools = tools.filter((t) =>
              t.industries.includes(industry.name as any)
            );
            const topTools = [...industryTools]
              .sort((a, b) => b.score - a.score)
              .slice(0, 3);
            const colors = colorMap[industry.name] || {
              color: 'text-gray-600',
              bgColor: 'bg-gray-50',
            };

            return (
              <div
                key={industry.slug}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/industries/${industry.slug}`} className="block p-6 border-b border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${colors.bgColor} ${colors.color}`}>
                      {iconMap[industry.icon] || <Building2 className="w-8 h-8" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold text-gray-900">
                          {industry.name}
                        </h2>
                        <span className="text-sm text-gray-500">
                          {industryTools.length} tools
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{industry.description}</p>
                    </div>
                  </div>
                </Link>

                <div className="p-4 bg-gray-50">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {industry.certifications.slice(0, 4).map((cert, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-600"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>

                  {topTools.length > 0 && (
                    <>
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
                              <span className="font-semibold text-gray-900">
                                {tool.score}
                              </span>
                              <span className="text-xs text-gray-500">/100</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}

                  <Link
                    href={`/industries/${industry.slug}`}
                    className="mt-4 flex items-center justify-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    View all {industry.name} tools
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
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
