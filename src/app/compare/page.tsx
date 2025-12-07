'use client';

import React from 'react';
import Link from 'next/link';
import {
  Star,
  X,
  Plus,
  CheckCircle,
  XCircle,
  ChevronRight,
  ExternalLink,
  GitCompare,
} from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import { tools } from '@/data/tools';
import { Tool } from '@/types';

export default function ComparePage() {
  const { compareTools, removeFromCompare, addToCompare, clearCompare, canAddMore } =
    useCompare();

  // Get all unique attributes for comparison
  const allCertifications = Array.from(
    new Set(compareTools.flatMap((t) => t.certifications))
  ).sort();
  const allUseCases = Array.from(
    new Set(compareTools.flatMap((t) => t.useCases))
  ).sort();
  const allDeploymentOptions = Array.from(
    new Set(compareTools.flatMap((t) => t.deploymentOptions))
  ).sort();
  const allFeatures = Array.from(
    new Set(compareTools.flatMap((t) => t.features))
  ).sort();

  const renderCheck = (has: boolean) =>
    has ? (
      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
    ) : (
      <XCircle className="w-5 h-5 text-gray-300 mx-auto" />
    );

  const availableToolsToAdd = tools.filter(
    (t) => !compareTools.some((ct) => ct.id === t.id)
  );

  if (compareTools.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <GitCompare className="w-16 h-16 text-gray-300 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Compare AI Tools
          </h1>
          <p className="text-gray-600 mb-8">
            Add tools to your comparison list to see them side-by-side. You can
            compare up to 4 tools at once.
          </p>
          <Link href="/browse" className="btn-primary">
            Browse Tools
          </Link>
        </div>
      </div>
    );
  }

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
            <span className="text-gray-900">Compare Tools</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Compare Tools</h1>
              <p className="text-sm text-gray-500 mt-1">
                Comparing {compareTools.length} tools
              </p>
            </div>
            <button
              onClick={clearCompare}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear all
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            {/* Tool Headers */}
            <thead>
              <tr>
                <th className="w-48 p-4 text-left bg-gray-100 rounded-tl-lg"></th>
                {compareTools.map((tool) => (
                  <th
                    key={tool.id}
                    className="p-4 bg-white border border-gray-200 min-w-[250px]"
                  >
                    <div className="relative">
                      <button
                        onClick={() => removeFromCompare(tool.id)}
                        className="absolute -top-2 -right-2 p-1 bg-gray-100 rounded-full hover:bg-gray-200"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                      <Link
                        href={`/tool/${tool.slug}`}
                        className="block hover:opacity-80"
                      >
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">{tool.vendor}</p>
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-2xl font-bold text-gray-900">
                            {(tool.score / 20).toFixed(1)}
                          </span>
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {tool.reviews} reviews
                        </p>
                        {tool.verified && (
                          <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded">
                            <CheckCircle className="w-3 h-3" /> Verified
                          </span>
                        )}
                      </Link>
                    </div>
                  </th>
                ))}
                {canAddMore && (
                  <th className="p-4 bg-gray-50 border border-dashed border-gray-300 min-w-[200px]">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-2">Add another tool</p>
                      <select
                        onChange={(e) => {
                          const tool = tools.find((t) => t.id === e.target.value);
                          if (tool) addToCompare(tool);
                          e.target.value = '';
                        }}
                        className="select text-sm"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select a tool...
                        </option>
                        {availableToolsToAdd.map((tool) => (
                          <option key={tool.id} value={tool.id}>
                            {tool.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {/* Basic Info */}
              <tr>
                <td
                  colSpan={compareTools.length + (canAddMore ? 2 : 1)}
                  className="px-4 py-3 bg-gray-100 font-semibold text-gray-900"
                >
                  Basic Information
                </td>
              </tr>
              <tr>
                <td className="p-4 bg-gray-50 font-medium text-gray-700">
                  Location
                </td>
                {compareTools.map((tool) => (
                  <td
                    key={tool.id}
                    className="p-4 bg-white border border-gray-200 text-center text-sm"
                  >
                    {tool.location}
                  </td>
                ))}
                {canAddMore && <td className="p-4 bg-gray-50"></td>}
              </tr>
              <tr>
                <td className="p-4 bg-gray-50 font-medium text-gray-700">
                  Company Size
                </td>
                {compareTools.map((tool) => (
                  <td
                    key={tool.id}
                    className="p-4 bg-white border border-gray-200 text-center text-sm"
                  >
                    {tool.size} employees
                  </td>
                ))}
                {canAddMore && <td className="p-4 bg-gray-50"></td>}
              </tr>
              <tr>
                <td className="p-4 bg-gray-50 font-medium text-gray-700">
                  Founded
                </td>
                {compareTools.map((tool) => (
                  <td
                    key={tool.id}
                    className="p-4 bg-white border border-gray-200 text-center text-sm"
                  >
                    {tool.founded}
                  </td>
                ))}
                {canAddMore && <td className="p-4 bg-gray-50"></td>}
              </tr>
              <tr>
                <td className="p-4 bg-gray-50 font-medium text-gray-700">
                  Pricing
                </td>
                {compareTools.map((tool) => (
                  <td
                    key={tool.id}
                    className="p-4 bg-white border border-gray-200 text-center"
                  >
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-sm rounded">
                      {tool.pricing}
                    </span>
                  </td>
                ))}
                {canAddMore && <td className="p-4 bg-gray-50"></td>}
              </tr>
              <tr>
                <td className="p-4 bg-gray-50 font-medium text-gray-700">
                  Industries
                </td>
                {compareTools.map((tool) => (
                  <td
                    key={tool.id}
                    className="p-4 bg-white border border-gray-200 text-center"
                  >
                    <div className="flex flex-wrap gap-1 justify-center">
                      {tool.industries.map((ind) => (
                        <span
                          key={ind}
                          className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {ind}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
                {canAddMore && <td className="p-4 bg-gray-50"></td>}
              </tr>

              {/* Certifications */}
              <tr>
                <td
                  colSpan={compareTools.length + (canAddMore ? 2 : 1)}
                  className="px-4 py-3 bg-gray-100 font-semibold text-gray-900"
                >
                  Compliance & Certifications
                </td>
              </tr>
              {allCertifications.map((cert) => (
                <tr key={cert}>
                  <td className="p-4 bg-gray-50 font-medium text-gray-700 text-sm">
                    {cert}
                  </td>
                  {compareTools.map((tool) => (
                    <td
                      key={tool.id}
                      className="p-4 bg-white border border-gray-200"
                    >
                      {renderCheck(tool.certifications.includes(cert as any))}
                    </td>
                  ))}
                  {canAddMore && <td className="p-4 bg-gray-50"></td>}
                </tr>
              ))}

              {/* Use Cases */}
              <tr>
                <td
                  colSpan={compareTools.length + (canAddMore ? 2 : 1)}
                  className="px-4 py-3 bg-gray-100 font-semibold text-gray-900"
                >
                  Use Cases
                </td>
              </tr>
              {allUseCases.map((useCase) => (
                <tr key={useCase}>
                  <td className="p-4 bg-gray-50 font-medium text-gray-700 text-sm">
                    {useCase}
                  </td>
                  {compareTools.map((tool) => (
                    <td
                      key={tool.id}
                      className="p-4 bg-white border border-gray-200"
                    >
                      {renderCheck(tool.useCases.includes(useCase as any))}
                    </td>
                  ))}
                  {canAddMore && <td className="p-4 bg-gray-50"></td>}
                </tr>
              ))}

              {/* Deployment Options */}
              <tr>
                <td
                  colSpan={compareTools.length + (canAddMore ? 2 : 1)}
                  className="px-4 py-3 bg-gray-100 font-semibold text-gray-900"
                >
                  Deployment Options
                </td>
              </tr>
              {allDeploymentOptions.map((option) => (
                <tr key={option}>
                  <td className="p-4 bg-gray-50 font-medium text-gray-700 text-sm">
                    {option}
                  </td>
                  {compareTools.map((tool) => (
                    <td
                      key={tool.id}
                      className="p-4 bg-white border border-gray-200"
                    >
                      {renderCheck(tool.deploymentOptions.includes(option as any))}
                    </td>
                  ))}
                  {canAddMore && <td className="p-4 bg-gray-50"></td>}
                </tr>
              ))}

              {/* Features */}
              <tr>
                <td
                  colSpan={compareTools.length + (canAddMore ? 2 : 1)}
                  className="px-4 py-3 bg-gray-100 font-semibold text-gray-900"
                >
                  Features
                </td>
              </tr>
              {allFeatures.slice(0, 10).map((feature) => (
                <tr key={feature}>
                  <td className="p-4 bg-gray-50 font-medium text-gray-700 text-sm">
                    {feature}
                  </td>
                  {compareTools.map((tool) => (
                    <td
                      key={tool.id}
                      className="p-4 bg-white border border-gray-200"
                    >
                      {renderCheck(tool.features.includes(feature))}
                    </td>
                  ))}
                  {canAddMore && <td className="p-4 bg-gray-50"></td>}
                </tr>
              ))}

              {/* Actions */}
              <tr>
                <td className="p-4 bg-gray-50"></td>
                {compareTools.map((tool) => (
                  <td
                    key={tool.id}
                    className="p-4 bg-white border border-gray-200 text-center"
                  >
                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/tool/${tool.slug}`}
                        className="btn-primary text-sm"
                      >
                        View Details
                      </Link>
                      <a
                        href={tool.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-sm flex items-center justify-center gap-1"
                      >
                        Visit Website
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </td>
                ))}
                {canAddMore && <td className="p-4 bg-gray-50"></td>}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
