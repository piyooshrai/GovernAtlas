import Link from 'next/link';
import {
  ArrowRight,
  Shield,
  TrendingUp,
  Scale,
  Landmark,
  ShieldCheck,
  Pill,
  GraduationCap,
  Factory,
} from 'lucide-react';
import { SearchBar, ToolCard } from '@/components';
import { getTopRatedTools, getIndustriesWithCounts, getStats } from '@/lib/supabase/tools';

const industryIcons: Record<string, React.ReactNode> = {
  'Healthcare': <Shield className="w-8 h-8" />,
  'Financial Services': <TrendingUp className="w-8 h-8" />,
  'Legal': <Scale className="w-8 h-8" />,
  'Government': <Landmark className="w-8 h-8" />,
  'Insurance': <ShieldCheck className="w-8 h-8" />,
  'Pharmaceutical': <Pill className="w-8 h-8" />,
  'Education': <GraduationCap className="w-8 h-8" />,
  'Manufacturing': <Factory className="w-8 h-8" />,
};

export default async function HomePage() {
  // Fetch data from Supabase
  const [topTools, industries, stats] = await Promise.all([
    getTopRatedTools(6),
    getIndustriesWithCounts(),
    getStats(),
  ]);

  const statsDisplay = [
    { label: 'AI Tools', value: `${stats.toolCount}+` },
    { label: 'Industries', value: String(stats.industryCount) },
    { label: 'Certifications Tracked', value: `${stats.certificationCount}+` },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">
            Find AI tools built for{' '}
            <span className="text-blue-600">regulated industries</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Browse {stats.toolCount}+ verified AI tools with governance scores, compliance
            certifications, and real deployment data.
          </p>

          <SearchBar variant="hero" placeholder="Search tools, vendors, or certifications..." />

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-500">
            <span>Popular:</span>
            <Link
              href="/browse?industry=Healthcare"
              className="text-blue-600 hover:underline"
            >
              Healthcare AI
            </Link>
            <Link
              href="/browse?certification=HIPAA"
              className="text-blue-600 hover:underline"
            >
              HIPAA Compliant
            </Link>
            <Link
              href="/browse?certification=FedRAMP"
              className="text-blue-600 hover:underline"
            >
              FedRAMP Authorized
            </Link>
            <Link
              href="/browse?certification=SOC+2"
              className="text-blue-600 hover:underline"
            >
              SOC 2 Certified
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-3 gap-8">
            {statsDisplay.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-blue-100 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Industry */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Browse by Industry</h2>
          <Link
            href="/industries"
            className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:text-blue-700"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="p-6 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <div className="text-gray-400 group-hover:text-blue-600 transition-colors mb-3">
                {industryIcons[industry.name] || <Shield className="w-8 h-8" />}
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {industry.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {industry.toolCount} tools
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Rated Tools */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Top Rated Tools</h2>
            <p className="text-sm text-gray-500 mt-1">
              Highest governance scores from verified tools
            </p>
          </div>
          <Link
            href="/browse"
            className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:text-blue-700"
          >
            View all tools <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white border-y border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find, compare, and choose AI tools with confidence
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Browse</h3>
              <p className="text-sm text-gray-600">
                Search by industry, use case, or certification. Filter by governance score and deployment options.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Compare</h3>
              <p className="text-sm text-gray-600">
                Evaluate tools side-by-side. Review certifications, features, and real user feedback.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Decide</h3>
              <p className="text-sm text-gray-600">
                Choose with confidence using verified data. Connect directly with vendors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Trusted by compliance teams researching AI solutions
          </p>
          <p className="text-xs text-gray-500">
            Fortune 500 companies, government agencies, and healthcare systems
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to find the right AI tool?
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Browse our directory of verified AI tools built for regulated industries.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/browse"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors"
            >
              Browse Tools
            </Link>
            <Link
              href="/vendors"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 font-medium transition-colors"
            >
              List Your Tool
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
