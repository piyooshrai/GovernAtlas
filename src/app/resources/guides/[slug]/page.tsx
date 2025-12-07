import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Download, Building2, CheckSquare } from 'lucide-react';
import { guides, getGuideBySlug } from '@/data/resources';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return {
      title: 'Guide Not Found | GovernAtlas',
    };
  }

  return {
    title: `${guide.title} | GovernAtlas Guides`,
    description: guide.description,
  };
}

const categoryLabels: Record<string, string> = {
  procurement: 'Procurement',
  compliance: 'Compliance',
  implementation: 'Implementation',
};

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  // Get related guides (same category, excluding current)
  const relatedGuides = guides
    .filter((g) => g.category === guide.category && g.id !== guide.id)
    .slice(0, 2);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link
            href="/resources/guides"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Guides
          </Link>

          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs font-medium">
              {categoryLabels[guide.category] || guide.category}
            </span>
            {guide.industry && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                <Building2 className="w-3 h-3 inline mr-1" />
                {guide.industry}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {guide.title}
          </h1>

          <p className="text-lg text-gray-600 mb-4">
            {guide.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              {guide.downloadCount.toLocaleString()} downloads
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg border border-gray-200 p-8 md:p-12">
          <div className="prose prose-gray max-w-none">
            {guide.content.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('# ')) {
                return (
                  <h1 key={i} className="text-3xl font-bold text-gray-900 mb-6">
                    {paragraph.replace('# ', '')}
                  </h1>
                );
              }
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={i} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.includes('- [ ]')) {
                // Checklist items
                const items = paragraph.split('\n').filter(line => line.trim());
                return (
                  <div key={i} className="my-4 space-y-2">
                    {items.map((item, j) => (
                      <div key={j} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <CheckSquare className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">
                          {item.replace('- [ ]', '').trim()}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              }
              if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
                const items = paragraph.split('\n');
                const isOrdered = paragraph.startsWith('1. ');
                const ListTag = isOrdered ? 'ol' : 'ul';
                return (
                  <ListTag key={i} className={`${isOrdered ? 'list-decimal' : 'list-disc'} pl-6 my-4 space-y-2`}>
                    {items.map((item, j) => (
                      <li key={j} className="text-gray-600">
                        {item.replace(/^\d+\.\s*|\-\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1')}
                      </li>
                    ))}
                  </ListTag>
                );
              }
              return (
                <p key={i} className="text-gray-600 mb-4 leading-relaxed">
                  {paragraph.split(/\*\*(.*?)\*\*/).map((part, j) =>
                    j % 2 === 0 ? part : <strong key={j} className="font-semibold text-gray-900">{part}</strong>
                  )}
                </p>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related Guides */}
      {relatedGuides.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 pb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Related Guides</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedGuides.map((relatedGuide) => (
              <Link
                key={relatedGuide.id}
                href={`/resources/guides/${relatedGuide.slug}`}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs font-medium">
                  {categoryLabels[relatedGuide.category] || relatedGuide.category}
                </span>
                <h3 className="font-semibold text-gray-900 mt-3 mb-2">
                  {relatedGuide.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {relatedGuide.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Find AI Tools?
          </h2>
          <p className="text-gray-600 mb-6">
            Browse our directory of governance-scored AI tools built for compliance.
          </p>
          <Link
            href="/browse"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            Browse AI Tools
          </Link>
        </div>
      </section>
    </div>
  );
}
