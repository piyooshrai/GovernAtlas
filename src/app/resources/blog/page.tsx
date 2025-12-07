import { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Eye, ArrowLeft } from 'lucide-react';
import { blogPosts } from '@/data/resources';

export const metadata: Metadata = {
  title: 'Blog | GovernAtlas',
  description: 'Industry insights and compliance trends for AI in regulated industries.',
};

export default function BlogPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog</h1>
          <p className="text-gray-600">
            Industry insights and compliance trends for AI in regulated industries
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/resources/blog/${post.slug}`}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <span className="text-xs font-medium text-blue-600 uppercase">
                  {post.category.replace('-', ' ')}
                </span>
                <h2 className="font-semibold text-gray-900 mt-2 mb-2 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
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
    </div>
  );
}
