'use client';

import React from 'react';
import Link from 'next/link';
import { X, GitCompare, ArrowRight } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';

export default function CompareBar() {
  const { compareTools, removeFromCompare, clearCompare } = useCompare();

  if (compareTools.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 animate-slide-up">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <GitCompare className="w-4 h-4" />
              <span>Compare ({compareTools.length}/4)</span>
            </div>
            <div className="flex items-center gap-2">
              {compareTools.map((tool) => (
                <div
                  key={tool.id}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-sm"
                >
                  <span className="font-medium text-gray-900 max-w-[120px] truncate">
                    {tool.name}
                  </span>
                  <button
                    onClick={() => removeFromCompare(tool.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear all
            </button>
            <Link
              href="/compare"
              className="btn-primary flex items-center gap-2"
            >
              Compare
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
