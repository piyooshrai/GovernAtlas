import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Shield className="w-6 h-6 text-blue-500" />
          <span className="font-bold text-white text-lg">GovernAtlas</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="font-medium text-white mb-4">For Buyers</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/browse" className="hover:text-white transition-colors">
                  Browse Tools
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-white transition-colors">
                  Industries
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-white transition-colors">
                  Compare Tools
                </Link>
              </li>
              <li>
                <Link href="/review" className="hover:text-white transition-colors">
                  Write a Review
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-white mb-4">For Vendors</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/vendors" className="hover:text-white transition-colors">
                  Get Listed
                </Link>
              </li>
              <li>
                <Link href="/vendors/verify" className="hover:text-white transition-colors">
                  Get Verified
                </Link>
              </li>
              <li>
                <Link href="/vendors/advertise" className="hover:text-white transition-colors">
                  Advertise
                </Link>
              </li>
              <li>
                <Link href="/vendors/analytics" className="hover:text-white transition-colors">
                  Analytics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/resources/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/resources/methodology" className="hover:text-white transition-colors">
                  Methodology
                </Link>
              </li>
              <li>
                <Link href="/resources/guides" className="hover:text-white transition-colors">
                  Buyer&apos;s Guides
                </Link>
              </li>
              <li>
                <Link href="/resources/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-white mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} GovernAtlas. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
