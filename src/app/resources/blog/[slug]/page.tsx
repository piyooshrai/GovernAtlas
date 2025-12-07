import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Eye, ArrowLeft, Tag } from 'lucide-react';
import { blogPosts, getBlogPostBySlug } from '@/data/resources';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | GovernAtlas',
    };
  }

  return {
    title: `${post.title} | GovernAtlas Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link
            href="/resources/blog"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <span className="text-sm font-medium text-blue-600 uppercase">
            {post.category.replace('-', ' ')}
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span>By {post.authorName}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.publishedAt}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {post.viewCount.toLocaleString()} views
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg border border-gray-200 p-8 md:p-12">
          <div className="prose prose-gray max-w-none">
            {post.content.split('\n\n').map((paragraph, i) => {
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
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <p key={i} className="font-semibold text-gray-900 mt-4 mb-2">
                    {paragraph.replace(/\*\*/g, '')}
                  </p>
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
              if (paragraph.startsWith('|')) {
                // Simple table handling
                return (
                  <div key={i} className="overflow-x-auto my-6">
                    <p className="text-sm text-gray-500 italic">[Table content - see original article]</p>
                  </div>
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

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-gray-400" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 pb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/resources/blog/${relatedPost.slug}`}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <span className="text-xs font-medium text-blue-600 uppercase">
                  {relatedPost.category.replace('-', ' ')}
                </span>
                <h3 className="font-semibold text-gray-900 mt-2 mb-2 line-clamp-2">
                  {relatedPost.title}
                </h3>
                <p className="text-sm text-gray-500">{relatedPost.publishedAt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Find AI Tools for Your Regulated Industry
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
