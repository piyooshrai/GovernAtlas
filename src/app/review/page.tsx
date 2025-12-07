import { Metadata } from 'next';
import Link from 'next/link';
import { Star, Search, ArrowRight } from 'lucide-react';
import { tools } from '@/data/tools';

export const metadata: Metadata = {
  title: 'Write a Review | GovernAtlas',
  description: 'Share your experience with AI tools for regulated industries. Help others make informed decisions.',
};

export default function ReviewLandingPage() {
  // Get top tools for suggestions
  const topTools = tools.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Star className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Write a Review</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your experience with AI tools and help other compliance teams make informed decisions.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Search prompt */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Select a tool to review
          </h2>
          <p className="text-gray-600 mb-6">
            Browse our directory and select the tool you want to review
          </p>
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            <Search className="w-5 h-5" />
            Browse Tools
          </Link>
        </div>

        {/* Popular tools to review */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Popular tools to review
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {topTools.map((tool) => (
              <Link
                key={tool.id}
                href={`/review/${tool.slug}`}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-500 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600">
                      {tool.name}
                    </h4>
                    <p className="text-sm text-gray-500">{tool.vendor}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
