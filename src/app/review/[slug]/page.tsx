'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Star,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader2,
  Info
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { tools } from '@/data/tools';
import { Industry } from '@/types';

const useCaseOptions = [
  'Document Processing',
  'Customer Service',
  'Risk Analysis',
  'Compliance Automation',
  'Research & Discovery',
  'Claims Processing',
  'Other',
];

const usageDurationOptions = [
  'Less than 6 months',
  '6-12 months',
  '1-2 years',
  '2+ years',
];

const industryOptions: Industry[] = [
  'Healthcare',
  'Financial Services',
  'Legal',
  'Government',
  'Insurance',
  'Pharmaceutical',
  'Education',
  'Manufacturing',
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function WriteReviewPage({ params }: PageProps) {
  const [slug, setSlug] = useState<string | null>(null);
  const [tool, setTool] = useState<typeof tools[0] | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [pros, setPros] = useState('');
  const [cons, setCons] = useState('');
  const [useCase, setUseCase] = useState('');
  const [usageDuration, setUsageDuration] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [role, setRole] = useState('');
  const [companyIndustry, setCompanyIndustry] = useState('');

  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
      const foundTool = tools.find(t => t.slug === resolvedParams.slug);
      setTool(foundTool || null);
      setLoading(false);
    };
    loadParams();
  }, [params]);

  // Redirect to sign in if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/auth/signin?redirect=/review/${slug}`);
    }
  }, [user, authLoading, router, slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    if (!title.trim()) {
      setError('Please enter a review title');
      return;
    }
    if (!pros.trim()) {
      setError('Please describe what you liked');
      return;
    }
    if (!cons.trim()) {
      setError('Please describe what could be improved');
      return;
    }
    if (!useCase) {
      setError('Please select a use case');
      return;
    }
    if (!usageDuration) {
      setError('Please select how long you have used this tool');
      return;
    }
    if (wouldRecommend === null) {
      setError('Please indicate if you would recommend this tool');
      return;
    }

    setSubmitting(true);

    try {
      // In production, this would save to Supabase
      const reviewData = {
        toolId: tool?.id,
        toolSlug: tool?.slug,
        userId: user?.id,
        userEmail: user?.email,
        rating,
        title: title.trim(),
        pros: pros.trim(),
        cons: cons.trim(),
        useCase,
        usageDuration,
        wouldRecommend,
        role: role.trim() || null,
        companyIndustry: companyIndustry || null,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      console.log('Review submission:', reviewData);

      // Simulate API call (in production, save to Supabase)
      await new Promise(resolve => setTimeout(resolve, 500));

      // Send notification email
      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'review-submitted',
            data: {
              reviewerEmail: user?.email || '',
              reviewerName: role || user?.email?.split('@')[0] || 'Anonymous',
              toolName: tool.name,
              rating,
              title: title.trim(),
              content: `Pros:\n${pros.trim()}\n\nCons:\n${cons.trim()}\n\nUse Case: ${useCase}\nUsage Duration: ${usageDuration}\nWould Recommend: ${wouldRecommend ? 'Yes' : 'No'}`,
            },
          }),
        });
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Don't fail the submission if email fails
      }

      setSubmitted(true);

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push(`/tool/${slug}`);
      }, 3000);
    } catch {
      setError('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tool Not Found</h1>
          <Link href="/browse" className="text-blue-600 hover:underline">
            Browse all tools
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              Thanks for your review! It will be published after moderation.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to tool page...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            href={`/tool/${slug}`}
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to {tool.name}
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Write a Review</h1>
          <p className="text-gray-600 mt-1">
            Share your experience with <span className="font-medium">{tool.name}</span> by {tool.vendor}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {/* Rating */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Overall Rating <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          star <= (hoverRating || rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="ml-2 text-sm text-gray-600">
                      {rating === 1 && 'Poor'}
                      {rating === 2 && 'Fair'}
                      {rating === 3 && 'Good'}
                      {rating === 4 && 'Very Good'}
                      {rating === 5 && 'Excellent'}
                    </span>
                  )}
                </div>
              </div>

              {/* Review Title */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-2">
                  Review Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={100}
                  placeholder="Summarize your experience"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500 text-right">
                  {title.length}/100 characters
                </p>
              </div>

              {/* Pros */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <label htmlFor="pros" className="block text-sm font-medium text-gray-900 mb-2">
                  Pros <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="pros"
                  value={pros}
                  onChange={(e) => setPros(e.target.value)}
                  rows={4}
                  placeholder="What did you like about this tool?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>

              {/* Cons */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <label htmlFor="cons" className="block text-sm font-medium text-gray-900 mb-2">
                  Cons <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="cons"
                  value={cons}
                  onChange={(e) => setCons(e.target.value)}
                  rows={4}
                  placeholder="What could be improved?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>

              {/* Use Case & Duration */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="useCase" className="block text-sm font-medium text-gray-900 mb-2">
                    Use Case <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="useCase"
                    value={useCase}
                    onChange={(e) => setUseCase(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select use case</option>
                    {useCaseOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="usageDuration" className="block text-sm font-medium text-gray-900 mb-2">
                    How long have you used this tool? <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="usageDuration"
                    value={usageDuration}
                    onChange={(e) => setUsageDuration(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select duration</option>
                    {usageDurationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Would Recommend */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Would you recommend this tool? <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="recommend"
                      checked={wouldRecommend === true}
                      onChange={() => setWouldRecommend(true)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="recommend"
                      checked={wouldRecommend === false}
                      onChange={() => setWouldRecommend(false)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">No</span>
                  </label>
                </div>
              </div>

              {/* Optional Fields */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-900 mb-2">
                    Your Role <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g., Compliance Officer, CTO"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="companyIndustry" className="block text-sm font-medium text-gray-900 mb-2">
                    Company Industry <span className="text-gray-400">(optional)</span>
                  </label>
                  <select
                    id="companyIndustry"
                    value={companyIndustry}
                    onChange={(e) => setCompanyIndustry(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select industry</option>
                    {industryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Review'
                )}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Review Guidelines</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Be specific</strong> - Share details about your experience and use case</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Be honest</strong> - Include both positives and areas for improvement</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>No promotional content</strong> - Keep reviews authentic and unbiased</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Focus on governance</strong> - Discuss compliance, security, and transparency aspects</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  All reviews are moderated before publication to ensure quality and authenticity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
