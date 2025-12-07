'use client';

import React from 'react';
import Link from 'next/link';
import {
  Star,
  MapPin,
  Users,
  CheckCircle,
  Plus,
  Check,
  GitCompare,
} from 'lucide-react';
import { Tool } from '@/types';
import { useCompare } from '@/context/CompareContext';

interface ToolCardProps {
  tool: Tool;
  variant?: 'default' | 'compact';
}

export default function ToolCard({ tool, variant = 'default' }: ToolCardProps) {
  const { addToCompare, removeFromCompare, isInCompare, canAddMore } = useCompare();
  const inCompare = isInCompare(tool.id);

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(tool.id);
    } else if (canAddMore) {
      addToCompare(tool);
    }
  };

  const scoreDisplay = (tool.score / 20).toFixed(1);

  if (variant === 'compact') {
    return (
      <Link href={`/tool/${tool.slug}`}>
        <div className="card-hover p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900 truncate">{tool.name}</h3>
                {tool.verified && (
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                )}
              </div>
              <p className="text-sm text-gray-600">{tool.vendor}</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-gray-900">{scoreDisplay}</span>
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/tool/${tool.slug}`}>
      <div className="card-hover p-5 group">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                {tool.name}
              </h3>
              {tool.verified && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded flex-shrink-0">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">{tool.vendor}</p>
          </div>
          <div className="text-right flex-shrink-0 ml-4">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-2xl font-bold text-gray-900">{scoreDisplay}</span>
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </div>
            <p className="text-xs text-gray-500">{tool.reviews} reviews</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{tool.tagline}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tool.certifications.slice(0, 4).map((cert) => (
            <span
              key={cert}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-medium"
            >
              {cert}
            </span>
          ))}
          {tool.certifications.length > 4 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
              +{tool.certifications.length - 4} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {tool.location}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {tool.size} employees
            </span>
          </div>
          <button
            onClick={handleCompareToggle}
            className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
              inCompare
                ? 'bg-blue-100 text-blue-700'
                : canAddMore
                ? 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                : 'text-gray-300 cursor-not-allowed'
            }`}
            disabled={!canAddMore && !inCompare}
            title={inCompare ? 'Remove from compare' : canAddMore ? 'Add to compare' : 'Compare list full'}
          >
            {inCompare ? (
              <>
                <Check className="w-3 h-3" />
                <span>Added</span>
              </>
            ) : (
              <>
                <GitCompare className="w-3 h-3" />
                <span>Compare</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
