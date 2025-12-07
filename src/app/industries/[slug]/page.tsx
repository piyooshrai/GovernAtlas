import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Shield,
  TrendingUp,
  Scale,
  Landmark,
  ShieldCheck,
  Pill,
  GraduationCap,
  Factory,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  FileText,
} from 'lucide-react';
import { ToolCard } from '@/components';
import { tools } from '@/data/tools';
import { getIndustryBySlug, getAllIndustrySlugs } from '@/data/industries';

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="w-12 h-12" />,
  TrendingUp: <TrendingUp className="w-12 h-12" />,
  Scale: <Scale className="w-12 h-12" />,
  Landmark: <Landmark className="w-12 h-12" />,
  ShieldCheck: <ShieldCheck className="w-12 h-12" />,
  Pill: <Pill className="w-12 h-12" />,
  GraduationCap: <GraduationCap className="w-12 h-12" />,
  Factory: <Factory className="w-12 h-12" />,
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return { title: 'Industry Not Found | GovernAtlas' };
  }

  return {
    title: `${industry.name} AI Tools | GovernAtlas`,
    description: industry.description,
  };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  const industryTools = tools.filter((t) =>
    t.industries.includes(industry.name as any)
  );
  const featuredTools = industryTools.slice(0, 6);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-start gap-6">
            <div className="p-4 bg-blue-100 text-blue-600 rounded-xl">
              {iconMap[industry.icon] || <Shield className="w-12 h-12" />}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {industry.name} AI Tools
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl">
                {industry.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                AI in {industry.name}
              </h2>
              <p className="text-gray-600">{industry.longDescription}</p>
            </div>

            {/* Common Use Cases */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Common Use Cases
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {industry.useCases.map((useCase, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{useCase}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance Considerations */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Compliance Considerations
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                When selecting AI tools for {industry.name.toLowerCase()}, consider these key compliance factors:
              </p>
              <div className="space-y-3">
                {industry.complianceConsiderations.map((consideration, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{consideration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Regulations */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-400" />
                Key Regulations
              </h3>
              <div className="flex flex-wrap gap-2">
                {industry.regulations.map((reg, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {reg}
                  </span>
                ))}
              </div>
            </div>

            {/* Important Certifications */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-400" />
                Important Certifications
              </h3>
              <div className="flex flex-wrap gap-2">
                {industry.certifications.map((cert, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-blue-600 rounded-lg p-6 text-white">
              <h3 className="font-semibold mb-4">Directory Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-100">Tools in directory</span>
                  <span className="font-bold">{industryTools.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Verified tools</span>
                  <span className="font-bold">
                    {industryTools.filter(t => t.verified).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Avg. governance score</span>
                  <span className="font-bold">
                    {industryTools.length > 0
                      ? Math.round(
                          industryTools.reduce((sum, t) => sum + t.score, 0) /
                            industryTools.length
                        )
                      : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {industry.name} Tools
          </h2>
          <Link
            href={`/browse?industry=${encodeURIComponent(industry.name)}`}
            className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:text-blue-700"
          >
            View all {industryTools.length} tools <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {featuredTools.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-500">
              No tools found for this industry yet.{' '}
              <Link href="/vendors" className="text-blue-600 hover:underline">
                Submit your tool
              </Link>
            </p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-gray-900 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Building an AI tool for {industry.name.toLowerCase()}?
          </h2>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">
            Get listed on GovernAtlas and reach compliance-focused buyers in the{' '}
            {industry.name.toLowerCase()} industry.
          </p>
          <Link
            href="/vendors"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            Get Listed <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
