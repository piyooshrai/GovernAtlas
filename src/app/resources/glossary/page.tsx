import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Search } from 'lucide-react';
import { glossaryTerms } from '@/data/resources';

export const metadata: Metadata = {
  title: 'Glossary | GovernAtlas',
  description: 'Definitions of key terms in AI governance, compliance certifications, and regulated industry procurement.',
};

const categoryInfo: Record<string, { title: string; color: string; bgColor: string }> = {
  certifications: { title: 'Certifications', color: 'text-blue-600', bgColor: 'bg-blue-50' },
  privacy: { title: 'Privacy', color: 'text-purple-600', bgColor: 'bg-purple-50' },
  ai: { title: 'AI & ML', color: 'text-green-600', bgColor: 'bg-green-50' },
  deployment: { title: 'Deployment', color: 'text-orange-600', bgColor: 'bg-orange-50' },
};

export default function GlossaryPage() {
  // Group terms by first letter
  const termsByLetter = glossaryTerms.reduce((acc, term) => {
    const letter = term.term[0].toUpperCase();
    if (!acc[letter]) {
      acc[letter] = [];
    }
    acc[letter].push(term);
    return acc;
  }, {} as Record<string, typeof glossaryTerms>);

  // Sort letters
  const sortedLetters = Object.keys(termsByLetter).sort();

  // Get all unique categories
  const categories = Array.from(new Set(glossaryTerms.map((t) => t.category)));

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
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Glossary</h1>
          </div>
          <p className="text-gray-600">
            Definitions of key terms in AI governance, compliance certifications, and regulated industry procurement.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-500 py-1">Filter by category:</span>
          {categories.map((category) => {
            const info = categoryInfo[category] || { title: category, color: 'text-gray-600', bgColor: 'bg-gray-100' };
            return (
              <a
                key={category}
                href={`#${category}`}
                className={`px-3 py-1 rounded-full text-sm font-medium ${info.bgColor} ${info.color} hover:opacity-80 transition-opacity`}
              >
                {info.title}
              </a>
            );
          })}
        </div>
      </section>

      {/* Alphabet Navigation */}
      <section className="max-w-4xl mx-auto px-4 pb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex flex-wrap gap-2">
            {sortedLetters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 text-gray-700 font-medium hover:bg-blue-100 hover:text-blue-600 transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Terms by Letter */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        {sortedLetters.map((letter) => (
          <div key={letter} id={`letter-${letter}`} className="mb-8 scroll-mt-8">
            <div className="sticky top-0 bg-gray-50 py-2 z-10">
              <h2 className="text-2xl font-bold text-gray-900">{letter}</h2>
            </div>

            <div className="space-y-4 mt-4">
              {termsByLetter[letter]
                .sort((a, b) => a.term.localeCompare(b.term))
                .map((term) => {
                  const info = categoryInfo[term.category] || {
                    title: term.category,
                    color: 'text-gray-600',
                    bgColor: 'bg-gray-100'
                  };

                  return (
                    <div
                      key={term.slug}
                      id={term.category}
                      className="bg-white rounded-lg border border-gray-200 p-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {term.term}
                            </h3>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${info.bgColor} ${info.color}`}>
                              {info.title}
                            </span>
                          </div>
                          <p className="text-gray-600 leading-relaxed">
                            {term.definition}
                          </p>
                          {term.relatedTerms && term.relatedTerms.length > 0 && (
                            <div className="mt-4">
                              <span className="text-sm text-gray-500">Related: </span>
                              <span className="text-sm">
                                {term.relatedTerms.map((related, i) => {
                                  const relatedTerm = glossaryTerms.find(
                                    (t) => t.term.toLowerCase() === related.toLowerCase()
                                  );
                                  return (
                                    <span key={related}>
                                      {relatedTerm ? (
                                        <a
                                          href={`#letter-${related[0].toUpperCase()}`}
                                          className="text-blue-600 hover:underline"
                                        >
                                          {related}
                                        </a>
                                      ) : (
                                        <span className="text-gray-600">{related}</span>
                                      )}
                                      {i < term.relatedTerms!.length - 1 && ', '}
                                    </span>
                                  );
                                })}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Missing a Term?
          </h2>
          <p className="text-gray-600 mb-6">
            Let us know if there&apos;s a term you&apos;d like us to add to the glossary.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            Suggest a Term
          </Link>
        </div>
      </section>
    </div>
  );
}
