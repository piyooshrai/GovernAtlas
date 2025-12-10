import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Star,
  MapPin,
  Users,
  CheckCircle,
  ExternalLink,
  Calendar,
  Building2,
  Globe,
  ChevronRight,
  Shield,
  Clock,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';
import { getToolBySlug, getRelatedTools } from '@/lib/supabase/tools';
import { ToolCard } from '@/components';
import { Metadata } from 'next';
import ToolDetailClient from './ToolDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Tool Not Found | GovernAtlas',
    };
  }

  return {
    title: `${tool.name} | GovernAtlas`,
    description: tool.tagline || tool.description,
    openGraph: {
      title: `${tool.name} | GovernAtlas`,
      description: tool.tagline || tool.description,
    },
  };
}

export default async function ToolDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const relatedTools = await getRelatedTools(tool.id, tool.industries, 3);
  const scoreDisplay = (tool.score / 20).toFixed(1);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/browse" className="hover:text-gray-700">
              Browse
            </Link>
            <ChevronRight className="w-4 h-4" />
            {tool.industries[0] && (
              <>
                <Link
                  href={`/browse?industry=${encodeURIComponent(tool.industries[0])}`}
                  className="hover:text-gray-700"
                >
                  {tool.industries[0]}
                </Link>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
            <span className="text-gray-900">{tool.name}</span>
          </nav>
        </div>
      </div>

      {/* Tool Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
                {tool.verified && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-sm font-medium rounded">
                    <CheckCircle className="w-4 h-4" /> Verified
                  </span>
                )}
              </div>
              <p className="text-lg text-gray-600 mb-4">by {tool.vendor}</p>
              <p className="text-gray-700 mb-6 max-w-3xl">{tool.tagline}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                {tool.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {tool.location}
                  </span>
                )}
                {tool.size && (
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {tool.size} employees
                  </span>
                )}
                {tool.founded > 0 && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Founded {tool.founded}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Updated {new Date(tool.lastUpdated).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-4">
              <div className="text-center bg-gray-50 rounded-lg p-4 min-w-[160px]">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-4xl font-bold text-gray-900">
                    {scoreDisplay}
                  </span>
                  <Star className="w-7 h-7 fill-yellow-400 text-yellow-400" />
                </div>
                <p className="text-sm text-gray-500">
                  Based on {tool.reviews} reviews
                </p>
              </div>

              <ToolDetailClient tool={tool} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <section className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">{tool.description}</p>
            </section>

            {/* Features */}
            {tool.features.length > 0 && (
              <section className="card p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Key Features
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {tool.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Integrations */}
            {tool.integrations.length > 0 && (
              <section className="card p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Integrations
                </h2>
                <div className="flex flex-wrap gap-2">
                  {tool.integrations.map((integration) => (
                    <span
                      key={integration}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm"
                    >
                      {integration}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Reviews Section */}
            <section className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  User Reviews
                </h2>
                <Link
                  href={`/review/${slug}`}
                  className="text-blue-600 text-sm font-medium hover:text-blue-700"
                >
                  Write a Review
                </Link>
              </div>

              <div className="text-center py-8 text-gray-500">
                <p>No reviews yet. Be the first to review this tool!</p>
                <Link href={`/review/${slug}`} className="btn-primary mt-4 inline-block">
                  Write a Review
                </Link>
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Certifications */}
            {tool.certifications.length > 0 && (
              <section className="card p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Compliance & Certifications
                </h3>
                <div className="space-y-2">
                  {tool.certifications.map((cert) => (
                    <div
                      key={cert}
                      className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-800 rounded-lg text-sm"
                    >
                      <CheckCircle className="w-4 h-4" />
                      {cert}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Industries */}
            {tool.industries.length > 0 && (
              <section className="card p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  Industries
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tool.industries.map((industry) => (
                    <Link
                      key={industry}
                      href={`/browse?industry=${encodeURIComponent(industry)}`}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm hover:bg-blue-100"
                    >
                      {industry}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Use Cases */}
            {tool.useCases.length > 0 && (
              <section className="card p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Use Cases</h3>
                <div className="flex flex-wrap gap-2">
                  {tool.useCases.map((useCase) => (
                    <Link
                      key={useCase}
                      href={`/browse?useCase=${encodeURIComponent(useCase)}`}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                    >
                      {useCase}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Deployment */}
            {tool.deploymentOptions.length > 0 && (
              <section className="card p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  Deployment Options
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tool.deploymentOptions.map((option) => (
                    <span
                      key={option}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm"
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Pricing */}
            <section className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Pricing</h3>
              <div className="px-3 py-2 bg-blue-50 text-blue-800 rounded-lg text-sm font-medium">
                {tool.pricing}
              </div>
            </section>

            {/* Support */}
            {tool.supportOptions.length > 0 && (
              <section className="card p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Support Options</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {tool.supportOptions.map((option) => (
                    <li key={option} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {option}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Related Tools
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTools.map((relatedTool) => (
                <ToolCard key={relatedTool.id} tool={relatedTool} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
