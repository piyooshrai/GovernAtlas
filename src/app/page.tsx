import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  Shield,
  Star,
  Users,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';
import { SearchBar, ToolCard } from '@/components';
import { tools, industries } from '@/data/tools';

const industryIcons: Record<string, React.ReactNode> = {
  Healthcare: <Shield className="w-8 h-8" />,
  'Financial Services': <TrendingUp className="w-8 h-8" />,
  Legal: <Building2 className="w-8 h-8" />,
  Government: <Building2 className="w-8 h-8" />,
  Insurance: <Shield className="w-8 h-8" />,
  Pharmaceutical: <Building2 className="w-8 h-8" />,
  Energy: <TrendingUp className="w-8 h-8" />,
  Education: <Users className="w-8 h-8" />,
};

const stats = [
  { label: 'AI Tools Listed', value: '150+' },
  { label: 'Verified Vendors', value: '85+' },
  { label: 'User Reviews', value: '2,500+' },
  { label: 'Industries Covered', value: '8' },
];

const trustedBy = [
  'Kaiser Permanente',
  'JPMorgan Chase',
  'Deloitte',
  'Anthem',
  'HCA Healthcare',
  'State Farm',
];

export default function HomePage() {
  // Get top-rated tools for the featured section
  const topTools = [...tools].sort((a, b) => b.score - a.score).slice(0, 6);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4" />
            Trusted by 500+ compliance teams
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">
            Find AI tools built for{' '}
            <span className="text-blue-600">regulated industries</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Browse 150+ verified AI tools with governance scores, compliance
            certifications, and real user reviews from healthcare, finance, legal,
            and government sectors.
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
              href="/browse?useCase=Document+Processing"
              className="text-blue-600 hover:underline"
            >
              Document Processing
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
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
          {industries.map((industry) => {
            const industryTools = tools.filter((t) =>
              t.industries.includes(industry as any)
            );
            return (
              <Link
                key={industry}
                href={`/browse?industry=${encodeURIComponent(industry)}`}
                className="p-6 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all group"
              >
                <div className="text-gray-400 group-hover:text-blue-600 transition-colors mb-3">
                  {industryIcons[industry] || <Building2 className="w-8 h-8" />}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {industry}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {industryTools.length} tools
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Top Rated Tools */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Top Rated Tools</h2>
            <p className="text-sm text-gray-500 mt-1">
              Highest governance scores from verified users
            </p>
          </div>
          <Link
            href="/browse?sort=score"
            className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:text-blue-700"
          >
            View all <ArrowRight className="w-4 h-4" />
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
              How GovernAtlas Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We help compliance teams find the right AI tools with confidence
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Search & Filter
              </h3>
              <p className="text-sm text-gray-600">
                Browse tools by industry, use case, or compliance certification.
                Filter by governance score and deployment options.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Compare & Evaluate
              </h3>
              <p className="text-sm text-gray-600">
                Compare up to 4 tools side-by-side. Review certifications,
                features, and real user feedback from your industry.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Connect & Implement
              </h3>
              <p className="text-sm text-gray-600">
                Request demos directly from vendors. Access implementation guides
                and connect with verified partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Added */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Recently Added</h2>
            <p className="text-sm text-gray-500 mt-1">
              New tools added to the marketplace
            </p>
          </div>
          <Link
            href="/browse?sort=newest"
            className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:text-blue-700"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.slice(0, 3).map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 mb-6">
            Trusted by compliance teams at leading organizations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {trustedBy.map((name) => (
              <span
                key={name}
                className="text-lg font-semibold text-gray-300 hover:text-gray-400 transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to find the right AI tool?
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Join 500+ compliance teams using GovernAtlas to discover and evaluate
            AI tools for regulated industries.
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
