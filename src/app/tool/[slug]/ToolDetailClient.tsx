'use client';

import React from 'react';
import { GitCompare, ExternalLink } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import { Tool } from '@/types';

interface ToolDetailClientProps {
  tool: Tool;
}

export default function ToolDetailClient({ tool }: ToolDetailClientProps) {
  const { addToCompare, removeFromCompare, isInCompare, canAddMore } = useCompare();
  const inCompare = isInCompare(tool.id);

  const handleCompareToggle = () => {
    if (inCompare) {
      removeFromCompare(tool.id);
    } else if (canAddMore) {
      addToCompare(tool);
    }
  };

  return (
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
  );
}
