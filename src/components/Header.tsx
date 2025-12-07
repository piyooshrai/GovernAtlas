'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Menu, X, GitCompare } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { compareTools } = useCompare();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-7 h-7 text-blue-600" />
            <span className="font-bold text-gray-900 text-xl">GovernAtlas</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/browse"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Browse Tools
            </Link>
            <Link
              href="/industries"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Industries
            </Link>
            <Link
              href="/resources"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Resources
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3 text-sm">
          {compareTools.length > 0 && (
            <Link
              href="/compare"
              className="hidden sm:flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 font-medium transition-colors"
            >
              <GitCompare className="w-4 h-4" />
              Compare ({compareTools.length})
            </Link>
          )}
          <Link
            href="/review"
            className="text-gray-600 hover:text-gray-900 hidden sm:block font-medium"
          >
            Write a Review
          </Link>
          <Link
            href="/vendors"
            className="text-gray-600 hover:text-gray-900 hidden sm:block font-medium"
          >
            For Vendors
          </Link>
          <Link href="/signin" className="btn-primary">
            Sign In
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="flex flex-col px-4 py-4 gap-4">
            <Link
              href="/browse"
              className="text-gray-600 hover:text-gray-900 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse Tools
            </Link>
            <Link
              href="/industries"
              className="text-gray-600 hover:text-gray-900 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Industries
            </Link>
            <Link
              href="/resources"
              className="text-gray-600 hover:text-gray-900 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </Link>
            {compareTools.length > 0 && (
              <Link
                href="/compare"
                className="flex items-center gap-2 text-blue-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <GitCompare className="w-4 h-4" />
                Compare ({compareTools.length})
              </Link>
            )}
            <Link
              href="/review"
              className="text-gray-600 hover:text-gray-900 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Write a Review
            </Link>
            <Link
              href="/vendors"
              className="text-gray-600 hover:text-gray-900 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              For Vendors
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
