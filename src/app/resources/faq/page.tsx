import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, HelpCircle, ChevronDown } from 'lucide-react';
import { faqs } from '@/data/resources';

export const metadata: Metadata = {
  title: 'FAQ | GovernAtlas',
  description: 'Frequently asked questions about GovernAtlas, AI tool evaluation, and governance scoring.',
};

const categoryInfo: Record<string, { title: string; description: string }> = {
  about: {
    title: 'About GovernAtlas',
    description: 'General questions about our platform and mission',
  },
  buyers: {
    title: 'For Buyers',
    description: 'Questions about finding, comparing, and reviewing AI tools',
  },
  vendors: {
    title: 'For Vendors',
    description: 'Questions about listing tools and improving scores',
  },
};

export default function FAQPage() {
  const categories = ['about', 'buyers', 'vendors'];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Resources
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <HelpCircle className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
          </div>
          <p className="text-gray-600">
            Find answers to common questions about GovernAtlas, AI tool evaluation, and governance scoring.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <a
              key={category}
              href={`#${category}`}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {categoryInfo[category].title}
            </a>
          ))}
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        {categories.map((category) => {
          const categoryFaqs = faqs.filter((faq) => faq.category === category);
          const info = categoryInfo[category];

          return (
            <div key={category} id={category} className="mb-12 scroll-mt-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{info.title}</h2>
                <p className="text-gray-600">{info.description}</p>
              </div>

              <div className="space-y-4">
                {categoryFaqs.map((faq) => (
                  <details
                    key={faq.id}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden group"
                  >
                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                      <span className="font-medium text-gray-900 pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Still Have Questions */}
      <section className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Can&apos;t find what you&apos;re looking for? We&apos;re happy to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/methodology"
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              View Methodology
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
