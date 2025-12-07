import { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen,
  FileText,
  HelpCircle,
  BookMarked,
  ArrowRight,
  Clock,
  Eye,
} from 'lucide-react';
import { blogPosts, guides, faqs } from '@/data/resources';

export const metadata: Metadata = {
  title: 'Resources | GovernAtlas',
  description: 'Guides, blog posts, FAQs, and glossary for AI procurement in regulated industries.',
};

export default function ResourcesPage() {
  const featuredPosts = blogPosts.slice(0, 3);
  const featuredGuides = guides.slice(0, 3);
  const featuredFaqs = faqs.slice(0, 5);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Resources</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Guides, insights, and tools for AI procurement in regulated industries
          </p>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-6">
          <Link
            href="/resources/guides"
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <BookOpen className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Guides</h3>
            <p className="text-sm text-gray-600">
              Downloadable procurement checklists and compliance guides
            </p>
          </Link>
          <Link
            href="/resources/blog"
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <FileText className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Blog</h3>
            <p className="text-sm text-gray-600">
              Industry insights and compliance trends
            </p>
          </Link>
          <Link
            href="/resources/faq"
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <HelpCircle className="w-8 h-8 text-amber-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">FAQ</h3>
            <p className="text-sm text-gray-600">
              Answers to common questions about GovernAtlas
            </p>
          </Link>
          <Link
            href="/resources/glossary"
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <BookMarked className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Glossary</h3>
            <p className="text-sm text-gray-600">
              Definitions of compliance and AI terms
            </p>
          </Link>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
          <Link
            href="/resources/blog"
            className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:text-blue-700"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/resources/blog/${post.slug}`}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <span className="text-xs font-medium text-blue-600 uppercase">
                  {post.category.replace('-', ' ')}
                </span>
                <h3 className="font-semibold text-gray-900 mt-2 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.publishedAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {post.viewCount.toLocaleString()} views
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Guides */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Popular Guides</h2>
          <Link
            href="/resources/guides"
            className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:text-blue-700"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredGuides.map((guide) => (
            <Link
              key={guide.id}
              href={`/resources/guides/${guide.slug}`}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-medium text-gray-500 uppercase">
                  {guide.category}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{guide.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {guide.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <Link
            href="/resources/faq"
            className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:text-blue-700"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
          {featuredFaqs.map((faq) => (
            <div key={faq.id} className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-sm text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-blue-600 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Need help finding the right AI tool?
          </h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Browse our directory of verified AI tools built for regulated industries.
          </p>
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors"
          >
            Browse Tools <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
