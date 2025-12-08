'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Menu, X, GitCompare, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { compareTools } = useCompare();
  const { user, profile, signOut, loading } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
    router.push('/');
    router.refresh();
  };

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User';
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/GovernAtlas.png"
              alt="GovernAtlas"
              width={48}
              height={48}
              className="w-12 h-12"
            />
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

          {/* Auth section */}
          {!loading && (
            <>
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {initials}
                    </div>
                    <span className="hidden sm:block font-medium text-gray-900 max-w-[120px] truncate">
                      {displayName}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-medium text-gray-900 truncate">{displayName}</p>
                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/account"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        <User className="w-4 h-4" />
                        My Account
                      </Link>
                      <Link
                        href="/account/settings"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/auth/signin" className="btn-primary">
                  Sign In
                </Link>
              )}
            </>
          )}

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
            {user && (
              <>
                <div className="border-t border-gray-200 pt-4 mt-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium">
                      {initials}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{displayName}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/account"
                    className="block text-gray-600 hover:text-gray-900 font-medium mb-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="text-red-600 font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
