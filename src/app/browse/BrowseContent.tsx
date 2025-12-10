'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, X, ChevronDown, Grid3X3, List, SlidersHorizontal } from 'lucide-react';
import { ToolCard, SearchBar, FilterSidebar } from '@/components';
import { Tool, Industry, UseCase, Certification, PricingTier, DeploymentOption } from '@/types';

interface BrowseContentProps {
  initialTools: Tool[];
  availableIndustries: string[];
  availableUseCases: string[];
  availableCertifications: string[];
}

interface FilterState {
  industries: Industry[];
  useCases: UseCase[];
  certifications: Certification[];
  verified: boolean;
  minScore: number;
  pricing: PricingTier[];
  deploymentOptions: DeploymentOption[];
}

const defaultFilters: FilterState = {
  industries: [],
  useCases: [],
  certifications: [],
  verified: false,
  minScore: 0,
  pricing: [],
  deploymentOptions: [],
};

type SortOption = 'relevance' | 'score' | 'reviews' | 'newest' | 'name';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'score', label: 'Highest Score' },
  { value: 'reviews', label: 'Most Reviews' },
  { value: 'newest', label: 'Recently Updated' },
  { value: 'name', label: 'Name (A-Z)' },
];

export default function BrowseContent({
  initialTools,
  availableIndustries,
  availableUseCases,
  availableCertifications,
}: BrowseContentProps) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Initialize filters from URL params
  useEffect(() => {
    const q = searchParams.get('q');
    const industry = searchParams.get('industry');
    const useCase = searchParams.get('useCase');
    const certification = searchParams.get('certification');
    const sort = searchParams.get('sort') as SortOption;

    if (q) setSearchQuery(q);
    if (sort && sortOptions.some((s) => s.value === sort)) setSortBy(sort);

    const newFilters = { ...defaultFilters };
    if (industry && availableIndustries.includes(industry)) {
      newFilters.industries = [industry as Industry];
    }
    if (useCase && availableUseCases.includes(useCase)) {
      newFilters.useCases = [useCase as UseCase];
    }
    if (certification && availableCertifications.includes(certification)) {
      newFilters.certifications = [certification as Certification];
    }
    setFilters(newFilters);
  }, [searchParams, availableIndustries, availableUseCases, availableCertifications]);

  // Filter and sort tools
  const filteredTools = useMemo(() => {
    let result = [...initialTools];

    // Apply search query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (tool) =>
          tool.name.toLowerCase().includes(lowerQuery) ||
          tool.vendor.toLowerCase().includes(lowerQuery) ||
          tool.tagline.toLowerCase().includes(lowerQuery) ||
          tool.description.toLowerCase().includes(lowerQuery) ||
          tool.industries.some((i) => i.toLowerCase().includes(lowerQuery)) ||
          tool.useCases.some((u) => u.toLowerCase().includes(lowerQuery)) ||
          tool.certifications.some((c) => c.toLowerCase().includes(lowerQuery))
      );
    }

    // Apply filters
    if (filters.industries.length > 0) {
      result = result.filter((tool) =>
        tool.industries.some((i) => filters.industries.includes(i))
      );
    }

    if (filters.useCases.length > 0) {
      result = result.filter((tool) =>
        tool.useCases.some((u) => filters.useCases.includes(u))
      );
    }

    if (filters.certifications.length > 0) {
      result = result.filter((tool) =>
        tool.certifications.some((c) => filters.certifications.includes(c))
      );
    }

    if (filters.verified) {
      result = result.filter((tool) => tool.verified);
    }

    if (filters.minScore > 0) {
      result = result.filter((tool) => tool.score >= filters.minScore);
    }

    if (filters.pricing.length > 0) {
      result = result.filter((tool) => filters.pricing.includes(tool.pricing));
    }

    if (filters.deploymentOptions.length > 0) {
      result = result.filter((tool) =>
        tool.deploymentOptions.some((d) => filters.deploymentOptions.includes(d))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'score':
        result.sort((a, b) => b.score - a.score);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        );
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Relevance: prioritize verified and high scores
        result.sort((a, b) => {
          if (a.verified !== b.verified) return a.verified ? -1 : 1;
          return b.score - a.score;
        });
    }

    return result;
  }, [searchQuery, filters, sortBy, initialTools]);

  const clearFilters = () => {
    setFilters(defaultFilters);
    setSearchQuery('');
  };

  const hasActiveFilters =
    filters.industries.length > 0 ||
    filters.useCases.length > 0 ||
    filters.certifications.length > 0 ||
    filters.verified ||
    filters.minScore > 0 ||
    filters.pricing.length > 0 ||
    filters.deploymentOptions.length > 0 ||
    searchQuery;

  const activeFilterCount =
    filters.industries.length +
    filters.useCases.length +
    filters.certifications.length +
    (filters.verified ? 1 : 0) +
    (filters.minScore > 0 ? 1 : 0) +
    filters.pricing.length +
    filters.deploymentOptions.length;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Browse AI Tools</h1>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="w-full md:w-96">
              <SearchBar
                initialValue={searchQuery}
                onSearch={setSearchQuery}
                placeholder="Search tools..."
              />
            </div>
            <div className="flex items-center gap-4">
              {/* Mobile filter button */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="select text-sm pr-10 appearance-none"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* View mode toggle */}
              <div className="hidden sm:flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${
                    viewMode === 'grid'
                      ? 'bg-white shadow-sm text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${
                    viewMode === 'list'
                      ? 'bg-white shadow-sm text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
              industries={availableIndustries as Industry[]}
              useCases={availableUseCases as UseCase[]}
              certifications={availableCertifications as Certification[]}
            />
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Results header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                {filteredTools.length} tools found
                {searchQuery && (
                  <span>
                    {' '}
                    for &quot;<span className="font-medium">{searchQuery}</span>&quot;
                  </span>
                )}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  Clear all filters <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Active filters tags */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                    Search: {searchQuery}
                    <button
                      onClick={() => setSearchQuery('')}
                      className="hover:text-blue-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.industries.map((industry) => (
                  <span
                    key={industry}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                  >
                    {industry}
                    <button
                      onClick={() =>
                        setFilters({
                          ...filters,
                          industries: filters.industries.filter((i) => i !== industry),
                        })
                      }
                      className="hover:text-blue-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {filters.useCases.map((useCase) => (
                  <span
                    key={useCase}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                  >
                    {useCase}
                    <button
                      onClick={() =>
                        setFilters({
                          ...filters,
                          useCases: filters.useCases.filter((u) => u !== useCase),
                        })
                      }
                      className="hover:text-blue-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {filters.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                  >
                    {cert}
                    <button
                      onClick={() =>
                        setFilters({
                          ...filters,
                          certifications: filters.certifications.filter(
                            (c) => c !== cert
                          ),
                        })
                      }
                      className="hover:text-blue-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {filters.verified && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                    Verified only
                    <button
                      onClick={() => setFilters({ ...filters, verified: false })}
                      className="hover:text-blue-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.minScore > 0 && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                    Score: {filters.minScore}+
                    <button
                      onClick={() => setFilters({ ...filters, minScore: 0 })}
                      className="hover:text-blue-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Results grid */}
            {filteredTools.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid md:grid-cols-2 gap-4'
                    : 'space-y-4'
                }
              >
                {filteredTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    variant={viewMode === 'list' ? 'default' : 'default'}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Filter className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No tools found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search or filters to find what you&apos;re looking
                  for.
                </p>
                <button onClick={clearFilters} className="btn-primary">
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Filters</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <FilterSidebar
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={clearFilters}
                industries={availableIndustries as Industry[]}
                useCases={availableUseCases as UseCase[]}
                certifications={availableCertifications as Certification[]}
              />
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="btn-primary w-full"
              >
                Show {filteredTools.length} results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
