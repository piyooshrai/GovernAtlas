'use client';

import React from 'react';
import { Filter, X } from 'lucide-react';
import { industries, useCases, certifications, pricingTiers, deploymentOptions } from '@/data/tools';
import { Industry, UseCase, Certification, PricingTier, DeploymentOption } from '@/types';

interface FilterState {
  industries: Industry[];
  useCases: UseCase[];
  certifications: Certification[];
  verified: boolean;
  minScore: number;
  pricing: PricingTier[];
  deploymentOptions: DeploymentOption[];
}

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

export default function FilterSidebar({
  filters,
  onFiltersChange,
  onClearFilters,
}: FilterSidebarProps) {
  const hasActiveFilters =
    filters.industries.length > 0 ||
    filters.useCases.length > 0 ||
    filters.certifications.length > 0 ||
    filters.verified ||
    filters.minScore > 0 ||
    filters.pricing.length > 0 ||
    filters.deploymentOptions.length > 0;

  const toggleArrayFilter = <T extends string>(
    key: keyof FilterState,
    value: T
  ) => {
    const currentArray = filters[key] as T[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((v) => v !== value)
      : [...currentArray, value];
    onFiltersChange({ ...filters, [key]: newArray });
  };

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filters
          </h3>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              Clear <X className="w-3 h-3" />
            </button>
          )}
        </div>

        <div className="space-y-6">
          {/* Industry Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Industry
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {industries.map((industry) => (
                <label
                  key={industry}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.industries.includes(industry as Industry)}
                    onChange={() => toggleArrayFilter('industries', industry as Industry)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    {industry}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Use Case Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Use Case
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {useCases.map((useCase) => (
                <label
                  key={useCase}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.useCases.includes(useCase as UseCase)}
                    onChange={() => toggleArrayFilter('useCases', useCase as UseCase)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    {useCase}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Certifications Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Certifications
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {certifications.map((cert) => (
                <label
                  key={cert}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.certifications.includes(cert as Certification)}
                    onChange={() => toggleArrayFilter('certifications', cert as Certification)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    {cert}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Min Score Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Minimum Score
            </label>
            <select
              value={filters.minScore}
              onChange={(e) =>
                onFiltersChange({ ...filters, minScore: Number(e.target.value) })
              }
              className="select text-sm"
            >
              <option value={0}>Any</option>
              <option value={80}>80+ (4.0 stars)</option>
              <option value={85}>85+ (4.25 stars)</option>
              <option value={90}>90+ (4.5 stars)</option>
            </select>
          </div>

          {/* Pricing Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Pricing
            </label>
            <div className="space-y-2">
              {pricingTiers.map((pricing) => (
                <label
                  key={pricing}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.pricing.includes(pricing as PricingTier)}
                    onChange={() => toggleArrayFilter('pricing', pricing as PricingTier)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    {pricing}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Deployment Options Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Deployment
            </label>
            <div className="space-y-2">
              {deploymentOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.deploymentOptions.includes(option as DeploymentOption)}
                    onChange={() =>
                      toggleArrayFilter('deploymentOptions', option as DeploymentOption)
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Verified Only Toggle */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.verified}
                onChange={(e) =>
                  onFiltersChange({ ...filters, verified: e.target.checked })
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Verified vendors only
              </span>
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
}
