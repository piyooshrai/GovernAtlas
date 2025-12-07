import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Download, FileText, Building2 } from 'lucide-react';
import { guides } from '@/data/resources';

export const metadata: Metadata = {
  title: 'Guides | GovernAtlas',
  description: 'Practical guides for AI procurement and compliance in regulated industries.',
};

const categoryLabels: Record<string, string> = {
  procurement: 'Procurement',
  compliance: 'Compliance',
  implementation: 'Implementation',
};

const industryColors: Record<string, string> = {
  Healthcare: 'text-red-600 bg-red-50',
  'Financial Services': 'text-green-600 bg-green-50',
  Government: 'text-blue-600 bg-blue-50',
};

export default function GuidesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Resources
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Guides</h1>
          <p className="text-gray-600">
            Practical guides for AI procurement and compliance in regulated industries
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Link
              key={guide.id}
              href={`/resources/guides/${guide.slug}`}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="p-6 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs font-medium">
                    {categoryLabels[guide.category] || guide.category}
                  </span>
                  {guide.industry && (
                    <span className={`px-2 py-1 rounded text-xs font-medium ${industryColors[guide.industry] || 'text-gray-600 bg-gray-100'}`}>
                      <Building2 className="w-3 h-3 inline mr-1" />
                      {guide.industry}
                    </span>
                  )}
                </div>
                <h2 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {guide.title}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {guide.description}
                </p>
              </div>
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-gray-500">
                    <Download className="w-4 h-4" />
                    {guide.downloadCount.toLocaleString()} downloads
                  </span>
                  <span className="text-blue-600 font-medium flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    Read Guide
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need a Custom Guide?
          </h2>
          <p className="text-gray-600 mb-6">
            We can create custom procurement checklists and compliance guides for your organization.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
