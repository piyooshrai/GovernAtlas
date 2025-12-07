'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
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
  GitCompare,
  ChevronRight,
  Shield,
  Clock,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';
import { getToolBySlug, tools } from '@/data/tools';
import { getReviewsByToolId } from '@/data/reviews';
import { useCompare } from '@/context/CompareContext';
import { ToolCard } from '@/components';

export default function ToolDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const tool = getToolBySlug(slug);
  const { addToCompare, removeFromCompare, isInCompare, canAddMore } = useCompare();

  if (!tool) {
    notFound();
  }

  const reviews = getReviewsByToolId(tool.id);
  const inCompare = isInCompare(tool.id);

  // Get related tools (same industry, different tool)
  const relatedTools = tools
    .filter(
      (t) =>
        t.id !== tool.id &&
        t.industries.some((i) => tool.industries.includes(i))
    )
    .slice(0, 3);

  const handleCompareToggle = () => {
    if (inCompare) {
      removeFromCompare(tool.id);
    } else if (canAddMore) {
      addToCompare(tool);
    }
  };

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
            <Link
              href={`/browse?industry=${encodeURIComponent(tool.industries[0])}`}
              className="hover:text-gray-700"
            >
              {tool.industries[0]}
            </Link>
            <ChevronRight className="w-4 h-4" />
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
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {tool.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {tool.size} employees
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Founded {tool.founded}
                </span>
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

              <div className="flex gap-3">
                <button
                  onClick={handleCompareToggle}
                  className={`btn-secondary flex items-center gap-2 ${
                    inCompare ? 'bg-blue-50 border-blue-200 text-blue-700' : ''
                  }`}
                  disabled={!canAddMore && !inCompare}
                >
                  <GitCompare className="w-4 h-4" />
                  {inCompare ? 'Remove from Compare' : 'Add to Compare'}
                </button>
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2"
                >
                  Visit Website
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
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

            {/* Integrations */}
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

            {/* Reviews */}
            <section className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  User Reviews
                </h2>
                <Link
                  href="/review"
                  className="text-blue-600 text-sm font-medium hover:text-blue-700"
                >
                  Write a Review
                </Link>
              </div>

              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900">
                              {review.author}
                            </span>
                            {review.verified && (
                              <span className="text-xs text-green-600 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" /> Verified
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            {review.role} at {review.company}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <h4 className="font-medium text-gray-900 mb-2">
                        {review.title}
                      </h4>
                      <p className="text-gray-700 mb-4">{review.content}</p>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4 text-green-500" /> Pros
                          </p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {review.pros.map((pro, i) => (
                              <li key={i}>+ {pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-1">
                            <ThumbsDown className="w-4 h-4 text-red-500" /> Cons
                          </p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {review.cons.map((con, i) => (
                              <li key={i}>- {con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <p className="text-xs text-gray-400 mt-4">
                        {new Date(review.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No reviews yet. Be the first to review this tool!</p>
                  <Link href="/review" className="btn-primary mt-4 inline-block">
                    Write a Review
                  </Link>
                </div>
              )}
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Certifications */}
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

            {/* Industries */}
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

            {/* Use Cases */}
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

            {/* Deployment */}
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

            {/* Pricing */}
            <section className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Pricing</h3>
              <div className="px-3 py-2 bg-blue-50 text-blue-800 rounded-lg text-sm font-medium">
                {tool.pricing}
              </div>
            </section>

            {/* Support */}
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
