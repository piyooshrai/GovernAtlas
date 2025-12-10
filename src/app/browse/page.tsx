import { Suspense } from 'react';
import { Metadata } from 'next';
import BrowseContent from './BrowseContent';
import { getTools, getFilterOptions } from '@/lib/supabase/tools';

export const metadata: Metadata = {
  title: 'Browse AI Tools | GovernAtlas',
  description: 'Search and filter AI tools for regulated industries. Compare governance scores, certifications, and features across 75+ verified tools.',
  openGraph: {
    title: 'Browse AI Tools | GovernAtlas',
    description: 'Search and filter AI tools for regulated industries. Compare governance scores, certifications, and features.',
  },
};

function BrowseLoading() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="w-full md:w-96 h-10 bg-gray-200 rounded animate-pulse" />
            <div className="flex items-center gap-4">
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="hidden lg:block w-64">
            <div className="h-96 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex-1">
            <div className="grid md:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-48 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function BrowsePageContent() {
  // Fetch data from Supabase
  const [tools, filterOptions] = await Promise.all([
    getTools(),
    getFilterOptions(),
  ]);

  return (
    <BrowseContent
      initialTools={tools}
      availableIndustries={filterOptions.industries}
      availableUseCases={filterOptions.useCases}
      availableCertifications={filterOptions.certifications}
    />
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={<BrowseLoading />}>
      <BrowsePageContent />
    </Suspense>
  );
}
