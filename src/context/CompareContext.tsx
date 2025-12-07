'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Tool } from '@/types';

interface CompareContextType {
  compareTools: Tool[];
  addToCompare: (tool: Tool) => void;
  removeFromCompare: (toolId: string) => void;
  clearCompare: () => void;
  isInCompare: (toolId: string) => boolean;
  canAddMore: boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const MAX_COMPARE_TOOLS = 4;

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareTools, setCompareTools] = useState<Tool[]>([]);

  const addToCompare = useCallback((tool: Tool) => {
    setCompareTools((prev) => {
      if (prev.length >= MAX_COMPARE_TOOLS) return prev;
      if (prev.some((t) => t.id === tool.id)) return prev;
      return [...prev, tool];
    });
  }, []);

  const removeFromCompare = useCallback((toolId: string) => {
    setCompareTools((prev) => prev.filter((t) => t.id !== toolId));
  }, []);

  const clearCompare = useCallback(() => {
    setCompareTools([]);
  }, []);

  const isInCompare = useCallback(
    (toolId: string) => compareTools.some((t) => t.id === toolId),
    [compareTools]
  );

  const canAddMore = compareTools.length < MAX_COMPARE_TOOLS;

  return (
    <CompareContext.Provider
      value={{
        compareTools,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        canAddMore,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
