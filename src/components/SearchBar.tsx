'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { tools } from '@/data/tools';
import { Tool } from '@/types';

interface SearchBarProps {
  variant?: 'default' | 'hero';
  placeholder?: string;
  initialValue?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({
  variant = 'default',
  placeholder = 'Search tools, vendors, or certifications...',
  initialValue = '',
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<Tool[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (query.length >= 2) {
      const lowerQuery = query.toLowerCase();
      const filtered = tools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(lowerQuery) ||
          tool.vendor.toLowerCase().includes(lowerQuery) ||
          tool.tagline.toLowerCase().includes(lowerQuery)
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setSelectedIndex(-1);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string = query) => {
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      router.push(`/browse?q=${encodeURIComponent(searchQuery)}`);
    }
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        router.push(`/tool/${suggestions[selectedIndex].slug}`);
        setShowSuggestions(false);
      } else {
        handleSearch();
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (tool: Tool) => {
    router.push(`/tool/${tool.slug}`);
    setShowSuggestions(false);
    setQuery('');
  };

  const clearQuery = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  if (variant === 'hero') {
    return (
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="bg-white border border-gray-300 rounded-xl shadow-sm flex items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => query.length >= 2 && setShowSuggestions(true)}
              placeholder={placeholder}
              className="w-full py-4 pl-12 pr-4 rounded-l-xl focus:outline-none text-gray-900"
            />
          </div>
          {query && (
            <button
              onClick={clearQuery}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => handleSearch()}
            className="px-6 py-4 bg-blue-600 text-white rounded-r-xl hover:bg-blue-700 font-medium transition-colors"
          >
            Search
          </button>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
          >
            {suggestions.map((tool, index) => (
              <button
                key={tool.id}
                onClick={() => handleSuggestionClick(tool)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between ${
                  index === selectedIndex ? 'bg-gray-50' : ''
                }`}
              >
                <div>
                  <p className="font-medium text-gray-900">{tool.name}</p>
                  <p className="text-sm text-gray-500">{tool.vendor}</p>
                </div>
                <span className="text-sm text-gray-400">
                  {tool.industries[0]}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && setShowSuggestions(true)}
          placeholder={placeholder}
          className="input pl-10 pr-10"
        />
        {query && (
          <button
            onClick={clearQuery}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
        >
          {suggestions.map((tool, index) => (
            <button
              key={tool.id}
              onClick={() => handleSuggestionClick(tool)}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between text-sm ${
                index === selectedIndex ? 'bg-gray-50' : ''
              }`}
            >
              <div>
                <p className="font-medium text-gray-900">{tool.name}</p>
                <p className="text-xs text-gray-500">{tool.vendor}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
